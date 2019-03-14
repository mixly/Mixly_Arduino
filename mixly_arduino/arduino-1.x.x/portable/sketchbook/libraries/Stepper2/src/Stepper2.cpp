/*
 * Stepper2.h - BYJ48 stepper motor library for Wiring/Arduino - Version 0.0.1
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with this library; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
 *
 * The circuits can be found at
 *
 * https://github.com/udivankin/Stepper2
 */

#include "Arduino.h"
#include "Stepper2.h"

const int microsInSecond = 1000L * 1000L;
const int microsInMinute = 60L * microsInSecond;

// Maximum steps per second
const int maxHz = 1000;

// Approx steps count to make a full turn
const int stepsPerFullTurn = 4096;

// Number of steps to make a rev of internal motor
const int numberOfSteps = 64;

// Step matrix
int stepMatrix[8][4] = {
  { LOW, LOW, LOW, HIGH },
  { LOW, LOW, HIGH, HIGH },
  { LOW, LOW, HIGH, LOW },
  { LOW, HIGH, HIGH, LOW },
  { LOW, HIGH, LOW, LOW },
  { HIGH, HIGH, LOW, LOW },
  { HIGH, LOW, LOW, LOW },
  { HIGH, LOW, LOW, HIGH },
};

// Output levels to stop the motor
int allLows[4] = { LOW, LOW, LOW, LOW };

/*
 *  Constructor for four-pin version
 *  Sets which wires should control the motor.
 */
Stepper2::Stepper2(int motorPin[4])
{
  this->step_number = 0;    // which step the motor is on
  this->last_step_time = 0; // time stamp in us of the last step taken

  // setup the pins on the microcontroller:
  for (int i = 0; i < 4; i++) {
    this->pin_matrix[i] = motorPin[i];
    pinMode(motorPin[i], OUTPUT);
  }
}

/*
 * Sets the speed in revs per minute
 */
void Stepper2::setSpeed(int rpm)
{
  int duration = microsInMinute / stepsPerFullTurn / rpm;
  int minDuration = microsInSecond / maxHz;
  this->step_duration = duration > minDuration ? duration : minDuration;
}

/*
 * Sets the speed in revs per minute
 */
void Stepper2::setDirection(int direction)
{
  this->direction = direction;
}

/*
 * Write pin state to output
 */
void Stepper2::writeStep(int outArray[4]){
  for (int i = 0; i < 4; i++) {
    digitalWrite(this->pin_matrix[i], outArray[i]);
  }
}

/*
 * Moves the motor stepsToMove steps.
 */
void Stepper2::step(int stepsToMove)
{
  int stepsLeft = abs(stepsToMove);  // how many steps to take

  // Adjust stepsToMove accrodign to direction
  if (this->direction == 1) {
     stepsToMove = -stepsToMove;
  }

  // decrement the number of steps, moving one step each time
  while (stepsLeft > 0) {
    unsigned long now = micros();
    // move only if the appropriate delay has passed
    if (now - this->last_step_time >= this->step_duration) {
      // get the timeStamp of when you stepped
      this->last_step_time = now;
      // increment or decrement the step number,
      // depending on direction
      if (this->direction == 1) {
        this->step_number++;
        if (this->step_number == numberOfSteps) {
          this->step_number = 0;
        }
      } else {
        if (this->step_number == 0) {
          this->step_number = numberOfSteps;
        }
        this->step_number--;
      }
      // decrement the steps left
      stepsLeft--;
      // step the motor to step number 0..8 according to step matrix
      writeStep(stepMatrix[this->step_number % 8]);
    }
  }
}

/*
 * Stops the motor (otherwize it will draw between 100 and 200ma when stopped)
 */
void Stepper2::stop()
{
  writeStep(allLows);
}

/*
 * Make one full turn
 */
void Stepper2::turn()
{
  for (int i = 0; i < (stepsPerFullTurn / numberOfSteps); i++) {
    step(numberOfSteps);
    // Reset WDT timer, other way to do it on nodeMCU is;
    // ESP.wdtDisable();
    // ESP.wdtEnable(WDTO_8S);
    delay(1);
  }
}

/*
 * Make given amount of full turns
 */
void Stepper2::turn(int turnsCount)
{
  for (int i = 0; i < turnsCount; i++) {
    turn();
  }
}

/*
 *  version() returns the version of the library:
 */
int Stepper2::version(void)
{
  return 1;
}
