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

// ensure this library description is only included once
#ifndef Stepper2_h
#define Stepper2_h

// library interface description
class Stepper2 {
  public:
    Stepper2(int motorPin[4]);        // constructors
    void setSpeed(int rpm);           // speed setter method
    void setDirection(int direction); // direction setter method
    void step(int numberOfSteps);     // step method
    void turn();                      // turn method
    void turn(int turnsCount);        // turn method to given amount of turns
    void stop();                      // stop method
    int version();                    // version method

  private:
    void writeStep(int outArray[4]);  // write step pin matrix to output
    int direction;                    // direction of rotation
    unsigned long step_duration;      // target step duration, in ms, based on speed
    int step_number;                  // which step the motor is on
    int pin_matrix[4];                // pin matrix array
    unsigned long last_step_time;     // time stamp in us of when the last step was taken
};

#endif
