/**
 * @file TCA9548A_Soft.h
 * @brief The header file of the Arduino library for the I²C Multiplexer TCA9548A_Soft.
 * @author Jonas Merkle [JJM] <a href="mailto:jonas.merkle@tam-onestone.net">jonas.merkle@tam-onestone.net</a>
 * @author Dominik Authaler <a href="mailto:dominik.authaler@team-onestone.net">dominik.authaler@team-onestone.net</a>
 * @author 
 * This library is maintained by <a href="https://team-onestone.net">Team Onestone</a>.
 * E-Mail: <a href="mailto:info@team-onestone.net">info@team-onestone.net</a>
 * @version 1.0.2
 * @date 30 October 2019
 * @copyright This project is released under the GNU General Public License v3.0
 */

#ifndef TCA9548A_Soft_h
#define TCA9548A_Soft_h

// includes
#include <inttypes.h>
#include <Arduino.h>
#include <SoftwareWire.h>

// defines
#define _TCA9548A_Soft_STD_ADDRESS 0x70 	///< The standard i2c address of the TCA9548A_Soft.
#define _TCA9548A_Soft_LIB_VERSION 102	///< The version number of the library.

/**
 * @class TCA9548A_Soft
 * @brief The main class of the Arduino library for the I²C Multiplexer TCA9548A_Soft.
 */
class TCA9548A_Soft {
// Begin PUBLIC ------------------------------------------------------------------
    public:

        // constructors
        TCA9548A_Soft();                     // Main construcor of the TCA9548A_Soft class.

        // init function
        void init(uint8_t address, SoftwareWire *theWire);                    // Initialize the TCA9548A_Soft Multiplexer.

        // functions
        void disable();                 // Disable the TCA9548A_Soft Multiplexer.
        void set_port(uint8_t port);    // Select the port on which the TCA9548A_Soft Multiplexer will operate.
        uint8_t get_port();             // Get the current port on which the TCA9548A_Soft Multiplexer operates.
        uint16_t get_version();         // Get the version of the library.

// End PUBLIC --------------------------------------------------------------------

// Begin PRIVATE -----------------------------------------------------------------        
    private:
        SoftwareWire *_wire;
        // variables
        uint8_t _addressTCA9548A_Soft;
        uint8_t _portTCA9548A_Soft;

// End PRIVATE -------------------------------------------------------------------
};

#endif