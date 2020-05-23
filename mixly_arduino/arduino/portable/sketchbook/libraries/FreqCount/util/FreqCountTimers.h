/* FreqCount Library, for measuring frequencies
 * http://www.pjrc.com/teensy/td_libs_FreqCount.html
 * Copyright (c) 2014 PJRC.COM, LLC - Paul Stoffregen <paul@pjrc.com>
 *
 * Version 1.1
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

#ifndef FreqCount_timers_h_
#define FreqCount_timers_h_

// Arduino Mega
#if defined(__AVR_ATmega1280__) || defined(__AVR_ATmega2560__)
  // #define COUNTER_USE_TIMER1 // T1 is not connected
  // #define COUNTER_USE_TIMER3 // T3 is not connected
  // #define COUNTER_USE_TIMER4 // T4 is not connected
  #define COUNTER_USE_TIMER5    // T5 is pin 47
  #define TIMER_USE_TIMER2

// Teensy 3.0 & 3.1 & LC
#elif defined(__MK20DX128__) || defined(__MK20DX256__) || defined(__MKL26Z64__) || defined(__MK64FX512__) || defined(__MK66FX1M0__)
  #define COUNTER_USE_LPTMR     // LPTMR is pin 13  (has LED connected)
  #define TIMER_USE_INTERVALTIMER

// Teensy 2.0
#elif defined(__AVR_ATmega32U4__)
  #define COUNTER_USE_TIMER1    // T1 is pin 11  (has LED connected)
  #define TIMER_USE_TIMER4H

// Teensy++ 1.0 & 2.0
#elif defined(__AVR_AT90USB646__) || defined(__AVR_AT90USB1286__)
  #define COUNTER_USE_TIMER1    // T1 is pin 6   (has LED connected)
  //#define COUNTER_USE_TIMER3  // T3 is pin 13
  #define TIMER_USE_TIMER2

// Sanguino
#elif defined(__AVR_ATmega644P__) || defined(__AVR_ATmega644__)
  #define COUNTER_USE_TIMER1    // T1 is pin 1
  #define TIMER_USE_TIMER2

// Arduino Duemilanove, Diecimila, LilyPad, Mini, Fio, etc
#elif defined(__AVR_ATmega328P__) || defined(__AVR_ATmega168__)
  #define COUNTER_USE_TIMER1    // T1 is pin 5
  #define TIMER_USE_TIMER2

#else
  #error "Unknown chip, please edit me with timer+counter definitions"

#endif


/**********************************************/
/*   Counter Hardware Abstraction             */
/**********************************************/

#if defined(COUNTER_USE_LPTMR) // 16 bit LPTMR on Freescale Kinetis

static inline void counter_init(void)
{
	SIM_SCGC5 |= SIM_SCGC5_LPTIMER;
	LPTMR0_CSR = 0;
	LPTMR0_PSR = 0b00000100; // bypass prescaler/filter
	LPTMR0_CMR = 0xFFFF;
	LPTMR0_CSR = 0b00100110; // counter, input=alt2, free running mode
	CORE_PIN13_CONFIG = PORT_PCR_MUX(3);
}

static inline void counter_start(void)
{
	LPTMR0_CSR = 0b00100111; // enable 
}

static inline void counter_shutdown(void)
{
	LPTMR0_CSR = 0;
}

static inline uint16_t counter_read(void)
{
	LPTMR0_CNR = 0; // writing cause sync with hardware
	return LPTMR0_CNR;
}

static inline uint8_t counter_overflow(void)
{
	return (LPTMR0_CSR & 0x80) ? 1 : 0;
}

static inline void counter_overflow_reset(void)
{
	LPTMR0_CSR = 0b10100111;
}




#elif defined(COUNTER_USE_TIMER1) // 16 bit Timer 1 on Atmel AVR

static uint8_t saveTCCR1A, saveTCCR1B;

static inline void counter_init(void)
{
	saveTCCR1A = TCCR1A;
	saveTCCR1B = TCCR1B;
	TCCR1B = 0;
	TCCR1A = 0;
	TCNT1 = 0;
	TIFR1 = (1<<TOV1);
	TIMSK1 = 0;
}

static inline void counter_start(void)
{
	TCCR1B = (1<<CS12) | (1<<CS11) | (1<<CS10);
}

static inline void counter_shutdown(void)
{
	TCCR1B = 0;
	TCCR1A = saveTCCR1A;
	TCCR1B = saveTCCR1B;
}

static inline uint16_t counter_read(void)
{
	return TCNT1;
}

static inline uint8_t counter_overflow(void)
{
	return TIFR1 & (1<<TOV1);
}

static inline void counter_overflow_reset(void)
{
	TIFR1 = (1<<TOV1);
}



#elif defined(COUNTER_USE_TIMER3) // 16 bit Timer 3 on Atmel AVR

static uint8_t saveTCCR3A, saveTCCR3B;

static inline void counter_init(void)
{
	saveTCCR3A = TCCR3A;
	saveTCCR3B = TCCR3B;
	TCCR3B = 0;
	TCCR3A = 0;
	TCNT3 = 0;
	TIFR3 = (1<<TOV3);
	TIMSK3 = 0;
}

static inline void counter_start(void)
{
	TCCR3B = (1<<CS32) | (1<<CS31) | (1<<CS30);
}

static inline void counter_shutdown(void)
{
	TCCR3B = 0;
	TCCR3A = saveTCCR3A;
	TCCR3B = saveTCCR3B;
}

static inline uint16_t counter_read(void)
{
	return TCNT3;
}

static inline uint8_t counter_overflow(void)
{
	return TIFR3 & (1<<TOV3);
}

static inline void counter_overflow_reset(void)
{
	TIFR3 = (1<<TOV3);
}


#elif defined(COUNTER_USE_TIMER4) // 16 bit Timer 4 on Atmel AVR

static uint8_t saveTCCR4A, saveTCCR4B;

static inline void counter_init(void)
{
	saveTCCR4A = TCCR4A;
	saveTCCR4B = TCCR4B;
	TCCR4B = 0;
	TCCR4A = 0;
	TCNT4 = 0;
	TIFR4 = (1<<TOV4);
	TIMSK4 = 0;
}

static inline void counter_start(void)
{
	TCCR4B = (1<<CS42) | (1<<CS41) | (1<<CS40);
}

static inline void counter_shutdown(void)
{
	TCCR4B = 0;
	TCCR4A = saveTCCR4A;
	TCCR4B = saveTCCR4B;
}

static inline uint16_t counter_read(void)
{
	return TCNT4;
}

static inline uint8_t counter_overflow(void)
{
	return TIFR4 & (1<<TOV4);
}

static inline void counter_overflow_reset(void)
{
	TIFR4 = (1<<TOV4);
}


#elif defined(COUNTER_USE_TIMER5) // 16 bit Timer 5 on Atmel AVR

static uint8_t saveTCCR5A, saveTCCR5B;

static inline void counter_init(void)
{
	saveTCCR5A = TCCR5A;
	saveTCCR5B = TCCR5B;
	TCCR5B = 0;
	TCCR5A = 0;
	TCNT5 = 0;
	TIFR5 = (1<<TOV5);
	TIMSK5 = 0;
}

static inline void counter_start(void)
{
	TCCR5B = (1<<CS52) | (1<<CS51) | (1<<CS50);
}

static inline void counter_shutdown(void)
{
	TCCR5B = 0;
	TCCR5A = saveTCCR5A;
	TCCR5B = saveTCCR5B;
}

static inline uint16_t counter_read(void)
{
	return TCNT5;
}

static inline uint8_t counter_overflow(void)
{
	return TIFR5 & (1<<TOV5);
}

static inline void counter_overflow_reset(void)
{
	TIFR5 = (1<<TOV5);
}


#endif // COUNTER_USE_***




/**********************************************/
/*   Timer Hardware Abstraction               */
/**********************************************/

#if defined(TIMER_USE_INTERVALTIMER) // Teensyduino IntervalTimer

static IntervalTimer itimer;
static void timer_interrupt(void);

static inline uint16_t timer_init(uint16_t msec)
{
	return msec;
}

static inline void timer_start(void)
{
	// IntervalTimer is capable of longer intervals, but
	// LPTMR can overflow.  Limiting to 1 ms allows counting
	// up to 65.535 MHz... LPTMR on Teensy 3.1 can do 65 MHz!
	itimer.begin(timer_interrupt, 1000);
}

static inline void timer_shutdown(void)
{
	itimer.end();
}

#define TIMER_ISR_VECTOR timer_interrupt
#ifdef ISR
#undef ISR
#endif
#define ISR(name) void name (void)




#elif defined(TIMER_USE_TIMER2) // 8 bit Timer 2 on Atmel AVR

/*        1ms       2ms       4ms       8ms
16 MHz    128x125   256x125   256x250   1024x125
12 MHz    64x188    128x188   256x188	1024x94	    //Not exact ms values: 2% error
8 MHz     64x125    128x125   256x125   256x250
4 MHz     32x125    64x125    128x125   256x125
2 MHz     8x250     32x125    64x125    128x125
1 MHz     8x125     8x250     32x125    64x125
*/
#if F_CPU == 16000000L
  #define TIMER2_OCR2A_1MS_VAL	124					// div 125
  #define TIMER2_TCCR2B_1MS_VAL	            (1<<CS22) | (1<<CS20)	// div 128
  #define TIMER2_OCR2A_2MS_VAL	124					// div 125
  #define TIMER2_TCCR2B_2MS_VAL	(1<<CS22) | (1<<CS21)			// div 256
  #define TIMER2_OCR2A_4MS_VAL	249					// div 250
  #define TIMER2_TCCR2B_4MS_VAL	(1<<CS22) | (1<<CS21)			// div 256
  #define TIMER2_OCR2A_8MS_VAL	124					// div 125
  #define TIMER2_TCCR2B_8MS_VAL	(1<<CS22) | (1<<CS21) | (1<<CS20)	// div 1024
#elif F_CPU == 12000000L
  #define TIMER2_OCR2A_1MS_VAL	187					// div 188
  #define TIMER2_TCCR2B_1MS_VAL (1<<CS22)				// div 64
  #define TIMER2_OCR2A_2MS_VAL	187					// div 125
  #define TIMER2_TCCR2B_2MS_VAL (1<<CS22) |             (1<<CS20)	// div 128
  #define TIMER2_OCR2A_4MS_VAL	187					// div 250
  #define TIMER2_TCCR2B_4MS_VAL	(1<<CS22) | (1<<CS21)			// div 256
  #define TIMER2_OCR2A_8MS_VAL	93					// div 125
  #define TIMER2_TCCR2B_8MS_VAL	(1<<CS22) | (1<<CS21) | (1<<CS20)	// div 1024
#elif F_CPU == 8000000L
  #define TIMER2_OCR2A_1MS_VAL  124					// div 125
  #define TIMER2_TCCR2B_1MS_VAL (1<<CS22)				// div 64
  #define TIMER2_OCR2A_2MS_VAL  124					// div 125
  #define TIMER2_TCCR2B_2MS_VAL (1<<CS22) |             (1<<CS20)	// div 128
  #define TIMER2_OCR2A_4MS_VAL  124					// div 125
  #define TIMER2_TCCR2B_4MS_VAL (1<<CS22) | (1<<CS21)			// div 256
  #define TIMER2_OCR2A_8MS_VAL  249					// div 250
  #define TIMER2_TCCR2B_8MS_VAL (1<<CS22) | (1<<CS21)			// div 256
#elif F_CPU == 4000000L
  #define TIMER2_OCR2A_1MS_VAL  124					// div 125
  #define TIMER2_TCCR2B_1MS_VAL             (1<<CS21) | (1<<CS20)	// div 32
  #define TIMER2_OCR2A_2MS_VAL  124					// div 125
  #define TIMER2_TCCR2B_2MS_VAL (1<<CS22)				// div 64
  #define TIMER2_OCR2A_4MS_VAL  124					// div 125
  #define TIMER2_TCCR2B_4MS_VAL (1<<CS22) |             (1<<CS20)	// div 128
  #define TIMER2_OCR2A_8MS_VAL  124					// div 125
  #define TIMER2_TCCR2B_8MS_VAL (1<<CS22) | (1<<CS21)			// div 256
#elif F_CPU == 2000000L
  #define TIMER2_OCR2A_1MS_VAL  249					// div 250
  #define TIMER2_TCCR2B_1MS_VAL             (1<<CS21)			// div 8
  #define TIMER2_OCR2A_2MS_VAL  124					// div 125
  #define TIMER2_TCCR2B_2MS_VAL             (1<<CS21) | (1<<CS20)	// div 32
  #define TIMER2_OCR2A_4MS_VAL  124					// div 125
  #define TIMER2_TCCR2B_4MS_VAL (1<<CS22)				// div 64
  #define TIMER2_OCR2A_8MS_VAL  124					// div 125
  #define TIMER2_TCCR2B_8MS_VAL (1<<CS22) | (1<<CS21)			// div 128
#elif F_CPU == 1000000L
  #define TIMER2_OCR2A_1MS_VAL  124					// div 125
  #define TIMER2_TCCR2B_1MS_VAL             (1<<CS21)			// div 8
  #define TIMER2_OCR2A_2MS_VAL	249					// div 250
  #define TIMER2_TCCR2B_2MS_VAL	            (1<<CS21)			// div 8
  #define TIMER2_OCR2A_4MS_VAL	124					// div 125
  #define TIMER2_TCCR2B_4MS_VAL	            (1<<CS21) | (1<<CS20)	// div 32
  #define TIMER2_OCR2A_8MS_VAL	124					// div 125
  #define TIMER2_TCCR2B_8MS_VAL	(1<<CS22)				// div 64
#else
#error "Clock must be 16, 12, 8, 4, 2 or 1 MHz"
#endif

static uint8_t saveTCCR2A, saveTCCR2B;
static uint8_t startTCCR2B;

static inline uint16_t timer_init(uint16_t msec)
{
	uint16_t gate_len;

	saveTCCR2A = TCCR2A;
	saveTCCR2B = TCCR2B;
	TCCR2B = 0;
	TCCR2A = (1<<WGM21);
	if ((msec & 7) == 0) {
		gate_len = msec >> 3;
		OCR2A = TIMER2_OCR2A_8MS_VAL;
		startTCCR2B = TIMER2_TCCR2B_8MS_VAL;
	} else if ((msec & 3) == 0) {
		gate_len = msec >> 2;
		OCR2A = TIMER2_OCR2A_4MS_VAL;
		startTCCR2B = TIMER2_TCCR2B_4MS_VAL;
	} else if ((msec & 1) == 0) {
		gate_len = msec >> 1;
		OCR2A = TIMER2_OCR2A_2MS_VAL;
		startTCCR2B = TIMER2_TCCR2B_2MS_VAL;
	} else {
		gate_len = msec;
		OCR2A = TIMER2_OCR2A_1MS_VAL;
		startTCCR2B = TIMER2_TCCR2B_1MS_VAL;
	}
	TIFR2 = (1<<OCF2A);
	TCNT2 = 0;
	return gate_len;
}

static inline void timer_start(void)
{
	GTCCR = (1<<PSRASY);
	TCCR2B = startTCCR2B;
	TIMSK2 = (1<<OCIE2A);
}

static inline void timer_shutdown(void)
{
	TCCR2B = 0;
	TIMSK2 = 0;
	TCCR2A = saveTCCR2A;
	TCCR2B = saveTCCR2B;
}

#define TIMER_ISR_VECTOR TIMER2_COMPA_vect

/*
There is a typical latency from the timer interrupt until the first
actual line of code executes.  Here is a typical compiler output of
approximately 34 cycles.  When starting, this same delay is used to
begin counting, so the first reading will not have 34 cycles of
extra measurement.  Because each measurement period gates instantly
after the previous, this approximate correction only affects the
first measurement.  If you do not define TIMER_LATENCY_CYCLES, this
extra delay is skipped (saving a tiny bit of code space), and the
only downside is a slight inaccuracy in the first measurement.
2  00000326 <__vector_13>:
2       326:       1f 92           push    r1
2       328:       0f 92           push    r0
1       32a:       0f b6           in      r0, 0x3f        ; 63
2       32c:       0f 92           push    r0
1       32e:       11 24           eor     r1, r1
2       330:       ef 92           push    r14
2       332:       ff 92           push    r15
2       334:       0f 93           push    r16
2       336:       1f 93           push    r17
2       338:       2f 93           push    r18
2       33a:       3f 93           push    r19
2       33c:       4f 93           push    r20
2       33e:       5f 93           push    r21
2       340:       8f 93           push    r24
2       342:       9f 93           push    r25
2       344:       af 93           push    r26
2       346:       bf 93           push    r27
*/
#define TIMER_LATENCY_CYCLES 34



#elif defined(TIMER_USE_TIMER4H)  // 10 bit "high speed" Timer 4 on Atmel AVR

#define TIMER4H_OCR4C_VAL   124		// always div 125
#if F_CPU == 16000000L
  #define TIMER4H_TCCR4B_1MS_VAL  (1<<CS43)					// div 128
  #define TIMER4H_TCCR4B_2MS_VAL  (1<<CS43) |                         (1<<CS40)	// div 256
  #define TIMER4H_TCCR4B_4MS_VAL  (1<<CS43) |             (1<<CS41)		// div 512
  #define TIMER4H_TCCR4B_8MS_VAL  (1<<CS43) |             (1<<CS41) | (1<<CS40)	// div 1024
#elif F_CPU == 8000000L
  #define TIMER4H_TCCR4B_1MS_VAL              (1<<CS42) | (1<<CS41) | (1<<CS40)	// div 64
  #define TIMER4H_TCCR4B_2MS_VAL  (1<<CS43)					// div 128
  #define TIMER4H_TCCR4B_4MS_VAL  (1<<CS43) |                         (1<<CS40)	// div 256
  #define TIMER4H_TCCR4B_8MS_VAL  (1<<CS43) |             (1<<CS41)		// div 512
#elif F_CPU == 4000000L
  #define TIMER4H_TCCR4B_1MS_VAL              (1<<CS42) | (1<<CS41)		// div 32
  #define TIMER4H_TCCR4B_2MS_VAL              (1<<CS42) | (1<<CS41) | (1<<CS40)	// div 64
  #define TIMER4H_TCCR4B_4MS_VAL  (1<<CS43)					// div 128
  #define TIMER4H_TCCR4B_8MS_VAL  (1<<CS43) |                         (1<<CS40)	// div 256
#elif F_CPU == 2000000L
  #define TIMER4H_TCCR4B_1MS_VAL              (1<<CS42) |             (1<<CS40)	// div 16
  #define TIMER4H_TCCR4B_2MS_VAL              (1<<CS42) | (1<<CS41)		// div 32
  #define TIMER4H_TCCR4B_4MS_VAL              (1<<CS42) | (1<<CS41) | (1<<CS40)	// div 64
  #define TIMER4H_TCCR4B_8MS_VAL  (1<<CS43)					// div 128
#elif F_CPU == 1000000L
  #define TIMER4H_TCCR4B_1MS_VAL              (1<<CS42)				// div 8
  #define TIMER4H_TCCR4B_2MS_VAL              (1<<CS42) |             (1<<CS40)	// div 16
  #define TIMER4H_TCCR4B_4MS_VAL              (1<<CS42) | (1<<CS41)		// div 32
  #define TIMER4H_TCCR4B_8MS_VAL              (1<<CS42) | (1<<CS41) | (1<<CS40)	// div 64
#else
#error "Clock must be 16, 8, 4, 2 or 1 MHz"
#endif

static uint8_t saveTCCR4A, saveTCCR4B, saveTCCR4C, saveTCCR4D, saveTCCR4E, saveOCR4C;
static uint8_t startTCCR4B;

// input is the number of milliseconds required
// output is the number of interrupts needed for that number of milliseconds
static inline uint16_t timer_init(uint16_t msec)
{
	uint16_t gate_len;

	saveTCCR4A = TCCR4A;
	saveTCCR4B = TCCR4B;
	saveTCCR4C = TCCR4C;
	saveTCCR4D = TCCR4D;
	saveTCCR4E = TCCR4E;
	saveOCR4C = OCR4C;
	TCCR4B = 0;
	TCCR4A = 0;
	TCCR4C = 0;
	TCCR4D = 0;
	TCCR4E = 0;
	OCR4C = TIMER4H_OCR4C_VAL;
	if ((msec & 7) == 0) {
		gate_len = msec >> 3;
		startTCCR4B = TIMER4H_TCCR4B_8MS_VAL | (1<<PSR4);
	} else if ((msec & 3) == 0) {
		gate_len = msec >> 2;
		startTCCR4B = TIMER4H_TCCR4B_4MS_VAL | (1<<PSR4);
	} else if ((msec & 1) == 0) {
		gate_len = msec >> 1;
		startTCCR4B = TIMER4H_TCCR4B_2MS_VAL | (1<<PSR4);
	} else {
		gate_len = msec;
		startTCCR4B = TIMER4H_TCCR4B_1MS_VAL | (1<<PSR4);
	}
	TIFR4 = (1<<TOV4);
	TCNT4 = 0;
	return gate_len;
}

static inline void timer_start(void)
{
	TCCR4B = startTCCR4B;
	TIMSK4 = (1<<TOIE4);
}

static inline void timer_shutdown(void)
{
	TCCR4B = 0;
	TIMSK4 = 0;
	OCR4C = saveOCR4C;
	TCCR4A = saveTCCR4A;
	TCCR4C = saveTCCR4C;
	TCCR4D = saveTCCR4D;
	TCCR4E = saveTCCR4E;
	TCCR4B = saveTCCR4B;
}

#define TIMER_ISR_VECTOR TIMER4_OVF_vect
#define TIMER_LATENCY_CYCLES 34


#endif // TIMER_USE_***




static inline void timer_isr_latency_delay(void)
{
#ifdef TIMER_LATENCY_CYCLES
#ifdef __AVR__
	uint8_t cycles_times_3 = TIMER_LATENCY_CYCLES / 3;
	asm volatile(
		"L_%=_loop:"
		"subi   %0, 1"		"\n\t"
		"brne   L_%=_loop"	"\n\t"
		: "+d" (cycles_times_3)
		: "0" (cycles_times_3)
	);
#endif
#endif
}


/**********************************************/
/*   Board Specific Interrupts (to hog)       */
/**********************************************/

static inline void disable_other_interrupts(void)
{
}
static inline void restore_other_interrupts(void)
{
}



#endif
