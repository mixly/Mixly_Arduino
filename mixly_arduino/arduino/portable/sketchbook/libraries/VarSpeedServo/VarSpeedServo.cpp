/*
 Servo.cpp - Interrupt driven Servo library for Arduino using 16 bit timers- Version 2
 Copyright (c) 2009 Michael Margolis.  All right reserved.

 This library is free software; you can redistribute it and/or
 modify it under the terms of the GNU Lesser General Public
 License as published by the Free Software Foundation; either
 version 2.1 of the License, or (at your option) any later version.

 This library is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 Lesser General Public License for more details.

 You should have received a copy of the GNU Lesser General Public
 License along with this library; if not, write to the Free Software
 Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
 */

/*
  Function slowmove and supporting code added 2010 by Korman. Above limitations apply
  to all added code, except for the official maintainer of the Servo library. If he,
  and only he deems the enhancement a good idea to add to the official Servo library,
  he may add it without the requirement to name the author of the parts original to
  this version of the library.
*/

/*
  Updated 2013 by Philip van Allen (pva),
  -- updated for Arduino 1.0 +
  -- consolidated slowmove into the write command (while keeping slowmove() for compatibility
     with Korman's version)
  -- added wait parameter to allow write command to block until move is complete
  -- added sequence playing ability to asynchronously move the servo through a series of positions, must be called in a loop

  A servo is activated by creating an instance of the Servo class passing the desired pin to the attach() method.
  The servos are pulsed in the background using the value most recently written using the write() method

  Note that analogWrite of PWM on pins associated with the timer are disabled when the first servo is attached.
  Timers are seized as needed in groups of 12 servos - 24 servos use two timers, 48 servos will use four.
  The sequence used to seize timers is defined in timers.h

  The methods are:

   VarSpeedServo - Class for manipulating servo motors connected to Arduino pins.

   attach(pin )  - Attaches a servo motor to an i/o pin.
   attach(pin, min, max  ) - Attaches to a pin setting min and max values in microseconds
   default min is 544, max is 2400

   write(value)     - Sets the servo angle in degrees.  (invalid angle that is valid as pulse in microseconds is treated as microseconds)
   write(value, speed) - speed varies the speed of the move to new position 0=full speed, 1-255 slower to faster
   write(value, speed, wait) - wait is a boolean that, if true, causes the function call to block until move is complete

   writeMicroseconds() - Sets the servo pulse width in microseconds
   read()      - Gets the last written servo pulse width as an angle between 0 and 180.
   readMicroseconds()  - Gets the last written servo pulse width in microseconds. (was read_us() in first release)
   attached()  - Returns true if there is a servo attached.
   detach()    - Stops an attached servos from pulsing its i/o pin.

   slowmove(value, speed) - The same as write(value, speed), retained for compatibility with Korman's version

   stop() - stops the servo at the current position

   sequencePlay(sequence, sequencePositions); // play a looping sequence starting at position 0
   sequencePlay(sequence, sequencePositions, loop, startPosition); // play sequence with number of positions, loop if true, start at position
   sequenceStop(); // stop sequence at current position

 */

#include <avr/interrupt.h>
#include <Arduino.h> // updated from WProgram.h to Arduino.h for Arduino 1.0+, pva

#include "VarSpeedServo.h"

#define usToTicks(_us)    (( clockCyclesPerMicrosecond()* _us) / 8)     // converts microseconds to tick (assumes prescale of 8)  // 12 Aug 2009
#define ticksToUs(_ticks) (( (unsigned)_ticks * 8)/ clockCyclesPerMicrosecond() ) // converts from ticks back to microseconds


#define TRIM_DURATION       2                               // compensation ticks to trim adjust for digitalWrite delays // 12 August 2009

//#define NBR_TIMERS        (MAX_SERVOS / SERVOS_PER_TIMER)

static servo_t servos[MAX_SERVOS];                          // static array of servo structures
static volatile int8_t Channel[_Nbr_16timers ];             // counter for the servo being pulsed for each timer (or -1 if refresh interval)

uint8_t ServoCount = 0;                                     // the total number of attached servos

// sequence vars

servoSequencePoint initSeq[] = {{0,100},{45,100}};

//sequence_t sequences[MAX_SEQUENCE];

// convenience macros
#define SERVO_INDEX_TO_TIMER(_servo_nbr) ((timer16_Sequence_t)(_servo_nbr / SERVOS_PER_TIMER)) // returns the timer controlling this servo
#define SERVO_INDEX_TO_CHANNEL(_servo_nbr) (_servo_nbr % SERVOS_PER_TIMER)       // returns the index of the servo on this timer
#define SERVO_INDEX(_timer,_channel)  ((_timer*SERVOS_PER_TIMER) + _channel)     // macro to access servo index by timer and channel
#define SERVO(_timer,_channel)  (servos[SERVO_INDEX(_timer,_channel)])            // macro to access servo class by timer and channel

#define SERVO_MIN() (MIN_PULSE_WIDTH - this->min * 4)  // minimum value in uS for this servo
#define SERVO_MAX() (MAX_PULSE_WIDTH - this->max * 4)  // maximum value in uS for this servo

/************ static functions common to all instances ***********************/

static inline void handle_interrupts(timer16_Sequence_t timer, volatile uint16_t *TCNTn, volatile uint16_t* OCRnA)
{
  if( Channel[timer] < 0 )
    *TCNTn = 0; // channel set to -1 indicated that refresh interval completed so reset the timer
  else{
    if( SERVO_INDEX(timer,Channel[timer]) < ServoCount && SERVO(timer,Channel[timer]).Pin.isActive == true )
      digitalWrite( SERVO(timer,Channel[timer]).Pin.nbr,LOW); // pulse this channel low if activated
  }

  Channel[timer]++;    // increment to the next channel
  if( SERVO_INDEX(timer,Channel[timer]) < ServoCount && Channel[timer] < SERVOS_PER_TIMER) {

	// Extension for slowmove
	if (SERVO(timer,Channel[timer]).speed) {
		// Increment ticks by speed until we reach the target.
		// When the target is reached, speed is set to 0 to disable that code.
		if (SERVO(timer,Channel[timer]).target > SERVO(timer,Channel[timer]).ticks) {
			SERVO(timer,Channel[timer]).ticks += SERVO(timer,Channel[timer]).speed;
			if (SERVO(timer,Channel[timer]).target <= SERVO(timer,Channel[timer]).ticks) {
				SERVO(timer,Channel[timer]).ticks = SERVO(timer,Channel[timer]).target;
				SERVO(timer,Channel[timer]).speed = 0;
			}
		}
		else {
			SERVO(timer,Channel[timer]).ticks -= SERVO(timer,Channel[timer]).speed;
			if (SERVO(timer,Channel[timer]).target >= SERVO(timer,Channel[timer]).ticks) {
				SERVO(timer,Channel[timer]).ticks = SERVO(timer,Channel[timer]).target;
				SERVO(timer,Channel[timer]).speed = 0;
			}
		}
	}
	// End of Extension for slowmove

	// Todo

    *OCRnA = *TCNTn + SERVO(timer,Channel[timer]).ticks;
    if(SERVO(timer,Channel[timer]).Pin.isActive == true)     // check if activated
      digitalWrite( SERVO(timer,Channel[timer]).Pin.nbr,HIGH); // its an active channel so pulse it high
  }
  else {
    // finished all channels so wait for the refresh period to expire before starting over
    if( (unsigned)*TCNTn <  (usToTicks(REFRESH_INTERVAL) + 4) )  // allow a few ticks to ensure the next OCR1A not missed
      *OCRnA = (unsigned int)usToTicks(REFRESH_INTERVAL);
    else
      *OCRnA = *TCNTn + 4;  // at least REFRESH_INTERVAL has elapsed
    Channel[timer] = -1; // this will get incremented at the end of the refresh period to start again at the first channel
  }
}

#ifndef WIRING // Wiring pre-defines signal handlers so don't define any if compiling for the Wiring platform
// Interrupt handlers for Arduino
#if defined(_useTimer1)
SIGNAL (TIMER1_COMPA_vect)
{
  handle_interrupts(_timer1, &TCNT1, &OCR1A);
}
#endif

#if defined(_useTimer3)
SIGNAL (TIMER3_COMPA_vect)
{
  handle_interrupts(_timer3, &TCNT3, &OCR3A);
}
#endif

#if defined(_useTimer4)
SIGNAL (TIMER4_COMPA_vect)
{
  handle_interrupts(_timer4, &TCNT4, &OCR4A);
}
#endif

#if defined(_useTimer5)
SIGNAL (TIMER5_COMPA_vect)
{
  handle_interrupts(_timer5, &TCNT5, &OCR5A);
}
#endif

#elif defined WIRING
// Interrupt handlers for Wiring
#if defined(_useTimer1)
void Timer1Service()
{
  handle_interrupts(_timer1, &TCNT1, &OCR1A);
}
#endif
#if defined(_useTimer3)
void Timer3Service()
{
  handle_interrupts(_timer3, &TCNT3, &OCR3A);
}
#endif
#endif


static void initISR(timer16_Sequence_t timer)
{
#if defined (_useTimer1)
  if(timer == _timer1) {
    TCCR1A = 0;             // normal counting mode
    TCCR1B = _BV(CS11);     // set prescaler of 8
    TCNT1 = 0;              // clear the timer count
#if defined(__AVR_ATmega8__)|| defined(__AVR_ATmega128__)
    TIFR |= _BV(OCF1A);      // clear any pending interrupts;
    TIMSK |=  _BV(OCIE1A) ;  // enable the output compare interrupt
#else
    // here if not ATmega8 or ATmega128
    TIFR1 |= _BV(OCF1A);     // clear any pending interrupts;
    TIMSK1 |=  _BV(OCIE1A) ; // enable the output compare interrupt
#endif
#if defined(WIRING)
    timerAttach(TIMER1OUTCOMPAREA_INT, Timer1Service);
#endif
  }
#endif

#if defined (_useTimer3)
  if(timer == _timer3) {
    TCCR3A = 0;             // normal counting mode
    TCCR3B = _BV(CS31);     // set prescaler of 8
    TCNT3 = 0;              // clear the timer count
#if defined(__AVR_ATmega128__)
    TIFR |= _BV(OCF3A);     // clear any pending interrupts;
	ETIMSK |= _BV(OCIE3A);  // enable the output compare interrupt
#else
    TIFR3 = _BV(OCF3A);     // clear any pending interrupts;
    TIMSK3 =  _BV(OCIE3A) ; // enable the output compare interrupt
#endif
#if defined(WIRING)
    timerAttach(TIMER3OUTCOMPAREA_INT, Timer3Service);  // for Wiring platform only
#endif
  }
#endif

#if defined (_useTimer4)
  if(timer == _timer4) {
    TCCR4A = 0;             // normal counting mode
    TCCR4B = _BV(CS41);     // set prescaler of 8
    TCNT4 = 0;              // clear the timer count
    TIFR4 = _BV(OCF4A);     // clear any pending interrupts;
    TIMSK4 =  _BV(OCIE4A) ; // enable the output compare interrupt
  }
#endif

#if defined (_useTimer5)
  if(timer == _timer5) {
    TCCR5A = 0;             // normal counting mode
    TCCR5B = _BV(CS51);     // set prescaler of 8
    TCNT5 = 0;              // clear the timer count
    TIFR5 = _BV(OCF5A);     // clear any pending interrupts;
    TIMSK5 =  _BV(OCIE5A) ; // enable the output compare interrupt
  }
#endif
}

static void finISR(timer16_Sequence_t timer)
{
    //disable use of the given timer
#if defined WIRING   // Wiring
  if(timer == _timer1) {
    #if defined(__AVR_ATmega1281__)||defined(__AVR_ATmega2561__)
    TIMSK1 &=  ~_BV(OCIE1A) ;  // disable timer 1 output compare interrupt
    #else
    TIMSK &=  ~_BV(OCIE1A) ;  // disable timer 1 output compare interrupt
    #endif
    timerDetach(TIMER1OUTCOMPAREA_INT);
  }
  else if(timer == _timer3) {
    #if defined(__AVR_ATmega1281__)||defined(__AVR_ATmega2561__)
    TIMSK3 &= ~_BV(OCIE3A);    // disable the timer3 output compare A interrupt
    #else
    ETIMSK &= ~_BV(OCIE3A);    // disable the timer3 output compare A interrupt
    #endif
    timerDetach(TIMER3OUTCOMPAREA_INT);
  }
#else
    //For arduino - in future: call here to a currently undefined function to reset the timer
#endif
}

static boolean isTimerActive(timer16_Sequence_t timer)
{
  // returns true if any servo is active on this timer
  for(uint8_t channel=0; channel < SERVOS_PER_TIMER; channel++) {
    if(SERVO(timer,channel).Pin.isActive == true)
      return true;
  }
  return false;
}


/****************** end of static functions ******************************/

VarSpeedServo::VarSpeedServo()
{
  if( ServoCount < MAX_SERVOS) {
    this->servoIndex = ServoCount++;                    // assign a servo index to this instance
	  servos[this->servoIndex].ticks = usToTicks(DEFAULT_PULSE_WIDTH);   // store default values  - 12 Aug 2009
    this->curSeqPosition = 0;
    this->curSequence = initSeq;
  }
  else
    this->servoIndex = INVALID_SERVO ;  // too many servos
}

uint8_t VarSpeedServo::attach(int pin)
{
  return this->attach(pin, MIN_PULSE_WIDTH, MAX_PULSE_WIDTH);
}

uint8_t VarSpeedServo::attach(int pin, int min, int max)
{
  if(this->servoIndex < MAX_SERVOS ) {
    pinMode( pin, OUTPUT) ;                                   // set servo pin to output
    servos[this->servoIndex].Pin.nbr = pin;
    // todo min/max check: abs(min - MIN_PULSE_WIDTH) /4 < 128
    this->min  = (MIN_PULSE_WIDTH - min)/4; //resolution of min/max is 4 uS
    this->max  = (MAX_PULSE_WIDTH - max)/4;
    // initialize the timer if it has not already been initialized
    timer16_Sequence_t timer = SERVO_INDEX_TO_TIMER(servoIndex);
    if(isTimerActive(timer) == false)
      initISR(timer);
    servos[this->servoIndex].Pin.isActive = true;  // this must be set after the check for isTimerActive
  }
  return this->servoIndex ;
}

void VarSpeedServo::detach()
{
  servos[this->servoIndex].Pin.isActive = false;
  timer16_Sequence_t timer = SERVO_INDEX_TO_TIMER(servoIndex);
  if(isTimerActive(timer) == false) {
    finISR(timer);
  }
}

void VarSpeedServo::write(int value)
{

  byte channel = this->servoIndex;
  servos[channel].value = value;

  if(value < MIN_PULSE_WIDTH)
  {  // treat values less than 544 as angles in degrees (valid values in microseconds are handled as microseconds)
    // updated to use constrain() instead of if(), pva
    value = constrain(value, 0, 180);
    value = map(value, 0, 180, SERVO_MIN(),  SERVO_MAX());
  }
  this->writeMicroseconds(value);
}

void VarSpeedServo::writeMicroseconds(int value)
{
  // calculate and store the values for the given channel
  byte channel = this->servoIndex;
  servos[channel].value = value;

  if( (channel >= 0) && (channel < MAX_SERVOS) )   // ensure channel is valid
  {
    if( value < SERVO_MIN() )          // ensure pulse width is valid
      value = SERVO_MIN();
    else if( value > SERVO_MAX() )
      value = SERVO_MAX();

  	value -= TRIM_DURATION;
    value = usToTicks(value);  // convert to ticks after compensating for interrupt overhead - 12 Aug 2009

    uint8_t oldSREG = SREG;
    cli();
    servos[channel].ticks = value;
    SREG = oldSREG;

	// Extension for slowmove
	// Disable slowmove logic.
	servos[channel].speed = 0;
	// End of Extension for slowmove
  }
}

// Extension for slowmove
/*
  write(value, speed) - Just like write but at reduced speed.

  value - Target position for the servo. Identical use as value of the function write.
  speed - Speed at which to move the servo.
          speed=0 - Full speed, identical to write
          speed=1 - Minimum speed
          speed=255 - Maximum speed
*/
void VarSpeedServo::write(int value, uint8_t speed) {
	// This fuction is a copy of write and writeMicroseconds but value will be saved
	// in target instead of in ticks in the servo structure and speed will be save
	// there too.

  byte channel = this->servoIndex;
  servos[channel].value = value;

	if (speed) {

		if (value < MIN_PULSE_WIDTH) {
			// treat values less than 544 as angles in degrees (valid values in microseconds are handled as microseconds)
			// updated to use constrain instead of if, pva
			value = constrain(value, 0, 180);
			value = map(value, 0, 180, SERVO_MIN(),  SERVO_MAX());
		}

		// calculate and store the values for the given channel
		if( (channel >= 0) && (channel < MAX_SERVOS) ) {   // ensure channel is valid
			// updated to use constrain instead of if, pva
			value = constrain(value, SERVO_MIN(), SERVO_MAX());

			value = value - TRIM_DURATION;
			value = usToTicks(value);  // convert to ticks after compensating for interrupt overhead - 12 Aug 2009

			// Set speed and direction
			uint8_t oldSREG = SREG;
			cli();
			servos[channel].target = value;
			servos[channel].speed = speed;
			SREG = oldSREG;
		}
	}
	else {
		write (value);
	}
}

void VarSpeedServo::write(int value, uint8_t speed, bool wait) {
  write(value, speed);

  if (wait) { // block until the servo is at its new position
    if (value < MIN_PULSE_WIDTH) {
      while (read() != value) {
        delay(5);
      }
    } else {
      while (readMicroseconds() != value) {
        delay(5);
      }
    }
  }
}

void VarSpeedServo::stop() {
  write(read());
}

void VarSpeedServo::slowmove(int value, uint8_t speed) {
  // legacy function to support original version of VarSpeedServo
  write(value, speed);
}

// End of Extension for slowmove


int VarSpeedServo::read() // return the value as degrees
{
  return  map( this->readMicroseconds()+1, SERVO_MIN(), SERVO_MAX(), 0, 180);
}

int VarSpeedServo::readMicroseconds()
{
  unsigned int pulsewidth;
  if( this->servoIndex != INVALID_SERVO )
    pulsewidth = ticksToUs(servos[this->servoIndex].ticks)  + TRIM_DURATION ;   // 12 aug 2009
  else
    pulsewidth  = 0;

  return pulsewidth;
}

bool VarSpeedServo::attached()
{
  return servos[this->servoIndex].Pin.isActive ;
}

uint8_t VarSpeedServo::sequencePlay(servoSequencePoint sequenceIn[], uint8_t numPositions, bool loop, uint8_t startPos) {
  uint8_t oldSeqPosition = this->curSeqPosition;

  if( this->curSequence != sequenceIn) {
    //Serial.println("newSeq");
    this->curSequence = sequenceIn;
    this->curSeqPosition = startPos;
    oldSeqPosition = 255;
  }

  if (read() == sequenceIn[this->curSeqPosition].position && this->curSeqPosition != CURRENT_SEQUENCE_STOP) {
    this->curSeqPosition++;

    if (this->curSeqPosition >= numPositions) { // at the end of the loop
      if (loop) { // reset to the beginning of the loop
        this->curSeqPosition = 0;
      } else { // stop the loop
        this->curSeqPosition = CURRENT_SEQUENCE_STOP;
      }
    }
  }

  if (this->curSeqPosition != oldSeqPosition && this->curSeqPosition != CURRENT_SEQUENCE_STOP) {
    // CURRENT_SEQUENCE_STOP position means the animation has ended, and should no longer be played
    // otherwise move to the next position
    write(sequenceIn[this->curSeqPosition].position, sequenceIn[this->curSeqPosition].speed);
    //Serial.println(this->seqCurPosition);
  }

  return this->curSeqPosition;
}

uint8_t VarSpeedServo::sequencePlay(servoSequencePoint sequenceIn[], uint8_t numPositions) {
  return sequencePlay(sequenceIn, numPositions, true, 0);
}

void VarSpeedServo::sequenceStop() {
  write(read());
  this->curSeqPosition = CURRENT_SEQUENCE_STOP;
}

// to be used only with "write(value, speed)"
void VarSpeedServo::wait() {
  byte channel = this->servoIndex;
  int value = servos[channel].value;

  // wait until is done
  if (value < MIN_PULSE_WIDTH) {
    while (read() != value) {
      delay(5);
    }
  } else {
    while (readMicroseconds() != value) {
      delay(5);
    }
  }
}

bool VarSpeedServo::isMoving() {
  byte channel = this->servoIndex;
  int value = servos[channel].value;

  if (value < MIN_PULSE_WIDTH) {
    if (read() != value) {
      return true;
    }
  } else {
    if (readMicroseconds() != value) {
      return true;
    }
  }
  return false;
}

/*
	To do
int VarSpeedServo::targetPosition() {
	byte channel = this->servoIndex;
	return map( servos[channel].target+1, SERVO_MIN(), SERVO_MAX(), 0, 180);
}

int VarSpeedServo::targetPositionMicroseconds() {
	byte channel = this->servoIndex;
	return servos[channel].target;
}

*/
