/**
 * @file TCA9548A.h
 * @brief The header file of the Arduino library for the I²C Multiplexer TCA9548A.
 * @author Jonas Merkle [JJM] <a href="mailto:jonas.merkle@tam-onestone.net">jonas.merkle@tam-onestone.net</a>
 * @author Dominik Authaler <a href="mailto:dominik.authaler@team-onestone.net">dominik.authaler@team-onestone.net</a>
 * @author 
 * This library is maintained by <a href="https://team-onestone.net">Team Onestone</a>.
 * E-Mail: <a href="mailto:info@team-onestone.net">info@team-onestone.net</a>
 * @version 1.0.2
 * @date 30 October 2019
 * @copyright This project is released under the GNU General Public License v3.0
 */

#ifndef TCA9548A_h
#define TCA9548A_h

// includes
#include <inttypes.h>
#include <Arduino.h>
#include <Wire.h>

// defines
#define _TCA9548A_STD_ADDRESS 0x70 	///< The standard i2c address of the TCA9548A.
#define _TCA9548A_LIB_VERSION 102	///< The version number of the library.

/**
 * @class TCA9548A
 * @brief The main class of the Arduino library for the I²C Multiplexer TCA9548A.
 */
class TCA9548A {
// Begin PUBLIC ------------------------------------------------------------------
    public:

        // constructors
        TCA9548A();                     // Main construcor of the TCA9548A class.
        TCA9548A(uint8_t address);      // Constructor of the TCA9548A class with non standard i2c address.
        ~TCA9548A();                    // Main destructor  of the TCA9548A class.

        // init function
        void init();                    // Initialize the TCA9548A Multiplexer.

        // functions
        void disable();                 // Disable the TCA9548A Multiplexer.
        void set_port(uint8_t port);    // Select the port on which the TCA9548A Multiplexer will operate.
        uint8_t get_port();             // Get the current port on which the TCA9548A Multiplexer operates.
        uint16_t get_version();         // Get the version of the library.

// End PUBLIC --------------------------------------------------------------------

// Begin PRIVATE -----------------------------------------------------------------        
    private:

        // variables
        uint8_t _addressTCA9548A;
        uint8_t _portTCA9548A;

// End PRIVATE -------------------------------------------------------------------
};

#endif