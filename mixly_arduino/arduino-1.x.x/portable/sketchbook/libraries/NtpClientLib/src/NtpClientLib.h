/*
Copyright 2016 German Martin (gmag11@gmail.com). All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are
permitted provided that the following conditions are met :

1. Redistributions of source code must retain the above copyright notice, this list of
conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice, this list
of conditions and the following disclaimer in the documentation and / or other materials
provided with the distribution.

THIS SOFTWARE IS PROVIDED BY <COPYRIGHT HOLDER> ''AS IS'' AND ANY EXPRESS OR IMPLIED
WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.IN NO EVENT SHALL <COPYRIGHT HOLDER> OR
CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
CONSEQUENTIAL DAMAGES(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT(INCLUDING
NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

The views and conclusions contained in the software and documentation are those of the
authors and should not be interpreted as representing official policies, either expressed
or implied, of German Martin
*/
/*
 Name:		NtpClientLib
 Created:	17/08/2016
 Author:	Germán Martín (gmag11@gmail.com)
 Maintainer:Germán Martín (gmag11@gmail.com)
 Editor:	http://www.visualmicro.com

 Library to get system sync from a NTP server
*/

#ifndef _NtpClientLib_h
#define _NtpClientLib_h

//#define DEBUG_NTPCLIENT //Uncomment this to enable debug messages over serial port

#ifdef ESP8266
//extern "C" {
//#include "user_interface.h"
//#include "sntp.h"
//}
#include <functional>
using namespace std;
using namespace placeholders;
#endif

#include <TimeLib.h>

#if defined(ARDUINO) && ARDUINO >= 100
#include "Arduino.h"
#else
#include "WProgram.h"
#endif

#define NETWORK_W5100           (1) // Arduino Ethernet Shield
#define NETWORK_ENC28J60        (2) // Alternate Ethernet Shield
#define NETWORK_WIFI101			(3) // WiFi Shield 101 or MKR1000
#define NETWORK_ESP8266			(100) // ESP8266 boards, not for Arduino using AT firmware
#define NETWORK_ESP32           (101) // ESP32 boards

#define DEFAULT_NTP_SERVER "pool.ntp.org" // Default international NTP server. I recommend you to select a closer server to get better accuracy
#define DEFAULT_NTP_PORT 123 // Default local udp port. Select a different one if neccesary (usually not needed)
#define NTP_TIMEOUT 1500 // Response timeout for NTP requests
#define DEFAULT_NTP_INTERVAL 1800 // Default sync interval 30 minutes 
#define DEFAULT_NTP_SHORTINTERVAL 15 // Sync interval when sync has not been achieved. 15 seconds
#define DEFAULT_NTP_TIMEZONE 0 // Select your local time offset. 0 if UTC time has to be used

const int NTP_PACKET_SIZE = 48; // NTP time is in the first 48 bytes of message

#ifdef ARDUINO_ARCH_ESP8266
#define NETWORK_TYPE NETWORK_ESP8266
#elif defined ARDUINO_ARCH_SAMD || defined ARDUINO_ARCH_ARC32
#define NETWORK_TYPE NETWORK_WIFI101 // SET YOUR NETWORK INTERFACE
#elif defined ARDUINO_ARCH_AVR
#define NETWORK_TYPE NETWORK_W5100
#elif defined ARDUINO_ARCH_ESP32 || defined ESP32
#define NETWORK_TYPE NETWORK_ESP32
#endif

#if NETWORK_TYPE == NETWORK_W5100
//#include <SPI.h>
#include <EthernetUdp.h>
#include <Ethernet.h>
//#include <Dns.h>
//#include <Dhcp.h>
#elif NETWORK_TYPE == NETWORK_WIFI101
#include <WiFiClient.h>
#include <WiFiUdp.h>
#include <WiFi101.h>
#elif NETWORK_TYPE == NETWORK_ESP8266
#include <ESP8266WiFi.h>
#include <WiFiUdp.h>
#include <Udp.h>
#elif NETWORK_TYPE == NETWORK_ESP32
#include <WiFi.h>
#include <WiFiUdp.h>
#include <Udp.h>
#else
#error "Incorrect platform. Only ARDUINO and ESP8266 MCUs are valid."
#endif // NETWORK_TYPE

typedef enum {
    timeSyncd, // Time successfully got from NTP server
    noResponse, // No response from server
    invalidAddress // Address not reachable
} NTPSyncEvent_t;

#if defined ARDUINO_ARCH_ESP8266 || defined ARDUINO_ARCH_ESP32
#include <functional>
typedef std::function<void (NTPSyncEvent_t)> onSyncEvent_t;
#else
typedef void (*onSyncEvent_t)(NTPSyncEvent_t);
#endif

class NTPClient {
public:
    /**
    * Construct NTP client.
    */
    NTPClient ();

    /**
    * Starts time synchronization.
    * @param[in] NTP server name as String.
    * @param[in] Time offset from UTC.
    * @param[in] true if this time zone has dayligth saving.
    * @param[in] Minutes offset added to hourly offset (optional).
    * @param[in] UDP connection instance (optional).
    * @param[out] true if everything went ok.
    */
#if NETWORK_TYPE == NETWORK_W5100
    bool begin (String ntpServerName = DEFAULT_NTP_SERVER, int8_t timeOffset = DEFAULT_NTP_TIMEZONE, bool daylight = false, int8_t minutes = 0, EthernetUDP* udp_conn = NULL);
#elif NETWORK_TYPE == NETWORK_ESP8266 || NETWORK_TYPE == NETWORK_WIFI101 || NETWORK_TYPE == NETWORK_ESP32
    bool begin (String ntpServerName = DEFAULT_NTP_SERVER, int8_t timeOffset = DEFAULT_NTP_TIMEZONE, bool daylight = false, int8_t minutes = 0, WiFiUDP* udp_conn = NULL);
#endif

    /**
    * Sets NTP server name.
    * @param[in] New NTP server name.
    * @param[out] True if everything went ok.
    */
    bool setNtpServerName (String ntpServerName);
    bool setNtpServerName (char* ntpServerName);

    /**
    * Sets NTP server name. DEPRECATED, only for compatibility with older versions
    * @param[in] New NTP server name.
    * @param[in] Server index (0-2).
    * @param[out] True if everything went ok.
    */
    bool setNtpServerName (String ntpServerName, int idx) {
        if (idx < 0 || idx > 2)
            return false;
        return setNtpServerName (ntpServerName);
    }

    /**
    * Gets NTP server name
    * @param[out] NTP server name.
    */
    String getNtpServerName ();
    char* getNtpServerNamePtr ();

    /**
    * Gets NTP server name. DEPRECATED, only for compatibility with older versions
    * @param[in] Server index (0-2).
    * @param[out] NTP server name.
    */
    String getNtpServerName (int idx) {
        if (idx < 0 || idx > 2)
            return "";
        return getNtpServerName ();
    }

    /**
    * Starts a NTP time request to server. Returns a time in UNIX time format. Normally only called from library.
    * Kept in public section to allow direct NTP request.
    * @param[out] Time in UNIX time format.
    */
    time_t getTime ();

    /**
    * Sets timezone.
    * @param[in] New time offset in hours (-11 <= timeZone <= +13).
    * @param[out] True if everything went ok.
    */
    bool setTimeZone (int8_t timeZone, int8_t minutes = 0);

    /**
    * Gets timezone.
    * @param[out] Time offset in hours (plus or minus).
    */
    int8_t getTimeZone ();

    /**
    * Gets minutes fraction of timezone.
    * @param[out] Minutes offset (plus or minus) added to hourly offset.
    */
    int8_t getTimeZoneMinutes ();

    /**
    * Stops time synchronization.
    * @param[out] True if everything went ok.
    */
    bool stop ();

    /**
    * Changes sync period.
    * @param[in] New interval in seconds.
    * @param[out] True if everything went ok.
    */
    bool setInterval (int interval);

    /**
    * Changes sync period in sync'd and not sync'd status.
    * @param[in] New interval while time is not first adjusted yet, in seconds.
    * @param[in] New interval for normal operation, in seconds.
    * @param[out] True if everything went ok.
    */
    bool setInterval (int shortInterval, int longInterval);

    /**
    * Gets sync period.
    * @param[out] Interval for normal operation, in seconds.
    */
    int getInterval ();

    /**
    * Changes sync period not sync'd status.
    * @param[out] Interval while time is not first adjusted yet, in seconds.
    */
    int	getShortInterval ();

    /**
    * Gets sync period.
    * @param[out] Interval for normal operation in seconds.
    */
    int	getLongInterval () { return getInterval (); }

    /**
    * Set daylight time saving option.
    * @param[in] true is daylight time savings apply.
    */
    void setDayLight (bool daylight);

    /**
    * Get daylight time saving option.
    * @param[out] true is daylight time savings apply.
    */
    bool getDayLight ();

    /**
    * Convert current time to a String.
    * @param[out] String constructed from current time.
    * TODO: Add internationalization support
    */
    String getTimeStr () { return getTimeStr (now ()); }

    /**
    * Convert a time in UNIX format to a String representing time.
    * @param[out] String constructed from current time.
    * @param[in] time_t object to convert to extract time.
    * TODO: Add internationalization support
    */
    String getTimeStr (time_t moment);

    /**
    * Convert current date to a String.
    * @param[out] String constructed from current date.
    * TODO: Add internationalization support
    */
    String getDateStr () { return getDateStr (now ()); }

    /**
    * Convert a time in UNIX format to a String representing its date.
    * @param[out] String constructed from current date.
    * @param[in] time_t object to convert to extract date.
    * TODO: Add internationalization support
    */
    String getDateStr (time_t moment);

    /**
    * Convert current time and date to a String.
    * @param[out] String constructed from current time.
    * TODO: Add internationalization support
    */
    String getTimeDateString () { return getTimeDateString (now ()); }

    /**
    * Convert current time and date to a String.
    * @param[in] time_t object to convert to String.
    * @param[out] String constructed from current time.
    * TODO: Add internationalization support
    */
    String getTimeDateString (time_t moment);

    /**
    * Gets last successful sync time in UNIX format.
    * @param[out] Last successful sync time. 0 equals never.
    */
    time_t getLastNTPSync ();

    /**
    * Get uptime in human readable String format.
    * @param[out] Uptime.
    */
    String getUptimeString ();

    /**
    * Get uptime in UNIX format, time since MCU was last rebooted.
    * @param[out] Uptime. 0 equals never.
    */
    time_t getUptime ();

    /**
    * Get first boot time in UNIX format, time when MCU was last rebooted.
    * @param[out] Uptime. 0 equals never.
    */
    time_t getLastBootTime ();

    /**
    * Get first successful synchronization time after boot.
    * @param[out] First sync time.
    */
    time_t getFirstSync ();

    /**
    * Set a callback that triggers after a sync trial.
    * @param[in] function with void(NTPSyncEvent_t) or std::function<void(NTPSyncEvent_t)> (only for ESP8266)
    *				NTPSyncEvent_t equals 0 is there is no error
    */
    void onNTPSyncEvent (onSyncEvent_t handler);

    /**
    * True if current time is inside DST period (aka. summer time). False otherwise of if NTP object has DST
    * calculation disabled
    * @param[out] True = summertime enabled and time in summertime period
    *			  False = sumertime disabled or time ouside summertime period
    */
    boolean isSummerTime () {
        if (_daylight)
            return isSummerTimePeriod (now ());
        else
            return false;
    }

    /**
    * True if given time is inside DST period (aka. summer time). False otherwise.
    * @param[in] time to make the calculation with
    * @param[out] True = time in summertime period
    *			  False = time ouside summertime period
    */
    boolean isSummerTimePeriod (time_t moment);

protected:

#if NETWORK_TYPE == NETWORK_W5100
    EthernetUDP *udp;
#elif NETWORK_TYPE == NETWORK_ESP8266 || NETWORK_TYPE == NETWORK_WIFI101 || NETWORK_TYPE == NETWORK_ESP32
    WiFiUDP *udp;
#endif
    bool _daylight;             ///< Does this time zone have daylight saving?
    int8_t _timeZone = 0;       ///< Keep track of set time zone offset
    int8_t _minutesOffset = 0;   ///< Minutes offset for time zones with decimal numbers
    char* _ntpServerName;       ///< Name of NTP server on Internet or LAN
    int _shortInterval;         ///< Interval to set periodic time sync until first synchronization.
    int _longInterval;          ///< Interval to set periodic time sync
    time_t _lastSyncd = 0;      ///< Stored time of last successful sync
    time_t _firstSync = 0;      ///< Stored time of first successful sync after boot
    unsigned long _uptime = 0;  ///< Time since boot
    onSyncEvent_t onSyncEvent;  ///< Event handler callback

    /**
    * Function that gets time from NTP server and convert it to Unix time format
    * @param[out] Time form NTP in Unix Time Format.
    */
    static time_t s_getTime ();

    /**
    * Calculates the daylight saving for a given date.
    * @param[in] Year.
    * @param[in] Month.
    * @param[in] Day.
    * @param[in] Hour.
    * @param[in] Time zone offset.
    * @param[out] true if date and time are inside summertime period.
    */
    bool summertime (int year, byte month, byte day, byte hour, byte tzHours);

    /**
    * Helper function to add leading 0 to hour, minutes or seconds if < 10.
    * @param[in] Digit to evaluate the need of leading 0.
    * @param[out] Result digit with leading 0 if needed.
    */
    //String printDigits(int digits);


public:
    /**
    * Decode NTP response contained in buffer.
    * @param[in] Pointer to message buffer.
    * @param[out] Decoded time from message, 0 if error ocurred.
    */
    time_t decodeNtpMessage (char *messageBuffer);

    /**
    * Set last successful synchronization time.
    * @param[out] Last sync time.
    */
    void setLastNTPSync (time_t moment);

private:
    /**
    * Sends NTP request packet to given IP address.
    * @param[in] NTP server's IP address.
    * @param[out] True if everything went ok.
    */
    //bool sendNTPpacket(IPAddress &address);
//#endif
};

extern NTPClient NTP;

#endif // _NtpClientLib_h
