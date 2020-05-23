/**
 * @file TCA9548A_Soft.cpp
 * @brief The source file of the Arduino library for the I²C Multiplexer TCA9548A_Soft.
 * @author Jonas Merkle [JJM] <a href="mailto:jonas.merkle@tam-onestone.net">jonas.merkle@tam-onestone.net</a>
 * @author Dominik Authaler <a href="mailto:dominik.authaler@team-onestone.net">dominik.authaler@team-onestone.net</a>
 * @author
 * This library is maintained by <a href="https://team-onestone.net">Team Onestone</a>.
 * E-Mail: <a href="mailto:info@team-onestone.net">info@team-onestone.net</a>
 * @version 1.0.2
 * @date 30 October 2019
 * @copyright This project is released under the GNU General Public License v3.0
 */

/**
 * @mainpage Arduino library for the I²C Multiplexer TCA9548A_Soft
 *
 * @section intro_sec Introduction
 *
 * ...
 *
 * @section dependencies Dependencies
 *
 * This library depends on the <a href="https://www.arduino.cc/en/Reference/Wire">
 * Wire Library</a> being present on your system. Please make sure you have
 * installed the latest version before using this library.
 *
 * @section author Author
 *
 * Written by:
 * - Jonas Merkle [JJM] <a href="mailto:jonas.merkle@tam-onestone.net">jonas.merkle@tam-onestone.net</a>
 * - Dominik Authaler <a href="mailto:dominik.authaler@team-onestone.net">dominik.authaler@team-onestone.net</a> 
 * 
 * This library is maintained by <a href="https://team-onestone.net">Team Onestone</a>.
 * E-Mail: <a href="mailto:info@team-onestone.net">info@team-onestone.net</a>
 *
 * @section license License
 *
 * This project is released under the GNU General Public License v3.0
 * 
*/

/////////////
// include //
/////////////
#include "TCA9548A_Soft.h"
#include <SoftwareWire.h>
/////////////
// defines //
/////////////

//////////////////
// constructors //
//////////////////

/**
 * @brief Main construcor of the TCA9548A_Soft class.
 */
TCA9548A_Soft::TCA9548A_Soft() {
}

///////////////////
// init function //
///////////////////

/**
 * @brief Initialize the TCA9548A_Soft Multiplexer.
 */
void TCA9548A_Soft::init(uint8_t address, SoftwareWire *theWire) {
    _wire = theWire;
    _addressTCA9548A_Soft = address;
    _portTCA9548A_Soft = 255;
    _wire->begin();
}

///////////////
// functions //
///////////////

/**
 * @brief Disable the TCA9548A_Soft Multiplexer.
 */
void TCA9548A_Soft::disable() {
    _portTCA9548A_Soft = 255;

    // disable all ports
    _wire->beginTransmission(_addressTCA9548A_Soft);
    _wire->write(0);
    _wire->endTransmission();
}

/**
 * @brief Select the port on which the TCA9548A_Soft Multiplexer will operate.
 * 
 * @param port  the port on which the TCA9548A_Soft Multiplexer will operate.
 */
void TCA9548A_Soft::set_port(uint8_t port) {
    // check if selected port is valid
    if (port > 7) return;
    _portTCA9548A_Soft = port;

    // select port
    _wire->beginTransmission(_addressTCA9548A_Soft);
    _wire->write(1 << _portTCA9548A_Soft);
    _wire->endTransmission();
}

/**
 * @brief Get the current port on which the TCA9548A_Soft Multiplexer operates.
 * 
 * @return the current selected port on which the TCA9548A_Soft Multiplexer operates.
 */
uint8_t TCA9548A_Soft::get_port() {
    return _portTCA9548A_Soft;
}

/**
 * @brief Get the version of the library.
 * 
 * @return the current version of the library.
 */
uint16_t TCA9548A_Soft::get_version() {
    return _TCA9548A_Soft_LIB_VERSION;
}