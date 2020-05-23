VarSpeedServo.h
===============

The VarSpeedServo.h Arduino library allows the use of up to 8 servos moving asynchronously (because it uses interrupts). In addition, you can set the speed of a move, optionally wait (block) until the servo move is complete, and create sequences of moves that run asynchronously.

This code is an adaptation of the standard Arduino Servo.h library, which was first adapted by Korman and posted on the [Arduino forum](http://forum.arduino.cc/index.php?topic=61586.0) to add the speed capability. Philip van Allen updated it for Arduino 1.0 + and added the ability to to wait for the move to complete.

* Supports up to 8 servos
* Allows simultaneous, asynchronous movement of all servos
* The speed of a move can be set
* The write() function initiates a move and can optionally wait for completion of the move before returning
* A servo can be sent a sequence of moves (where each move has a position and speed)

Sample Code - one servo moving, wait for first movement to finish, then execute another movement
----------------------------

```

#include <VarSpeedServo.h> 
 
VarSpeedServo myservo;    // create servo object to control a servo 
 
void setup() {
  myservo.attach(9);  // attaches the servo on pin 9 to the servo object 
} 
 
void loop() {
  myservo.write(180, 30, true);        // move to 180 degrees, use a speed of 30, wait until move is complete
  myservo.write(0, 30, true);        // move to 0 degrees, use a speed of 30, wait until move is complete
}
```


Sample Code - two servo moving in the same time with different speed, wait for both to finish and do another move
----------------------------

```
#include <VarSpeedServo.h> 

// create servo objects
VarSpeedServo myservo1;
VarSpeedServo myservo2;
 
void setup() {
  myservo1.attach(9);
  myservo2.attach(8);
} 
 
void loop() {
  
  int LEF = 0;
  int RIG = 180;
  
  int SPEED1 = 160;
  int SPEED2 = 100;
  
  myservo1.write(LEF, SPEED1);     
  myservo2.write(LEF, SPEED2);
  myservo1.wait(); // wait for servo 1 to finish
  myservo2.wait();  // wait for servo 2 to finish
    
  myservo1.write(RIG, SPEED1);     
  myservo1.wait(); // wait for S1
  
  myservo1.write(LEF, SPEED1); 
  myservo2.write(RIG, SPEED2);  
  myservo1.wait();
  myservo2.wait();    
        
  myservo1.write(RIG, SPEED1);     
  myservo1.wait();
      
  delay(1000);
  
}

```


Additional examples are included in the distribution and are available in the Arduino Examples section.

Class methods
================

A servo is activated by creating an instance of the Servo class passing the desired pin to the attach() method. The servos are pulsed in the background using the value most recently written using the write() method
 
VarSpeedServo - Class for manipulating servo motors connected to Arduino pins. Methods:

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
	wait(); // wait for movement to finish
	isMoving()  // return true if servo is still moving

Installation
=============

* Download the .zip file from the releases section of GitHub
* In Arduino, select SKETCH>IMPORT LIBRARY...>ADD LIBRARY... and find the .zip file
* This will install the library in your My Documents (Windows) or Documents (Mac) folder under Arduino/libraries
* You can also unzip the file, and install it in the above libraries folder manually
* See [arduino.cc/en/Guide/Libraries](http://arduino.cc/en/Guide/Libraries) for more info on libraries
