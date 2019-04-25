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
 Name:		NtpClientAvr.ino
 Created:	20/08/2016
 Author:	gmag11@gmail.com
 Editor:	http://www.visualmicro.com
*/

#include <TimeLib.h>
#include <NtpClientLib.h>
#include <SPI.h>
#include <EthernetUdp.h>
#include <Ethernet.h>
#include <Dns.h>
#include <Dhcp.h>

#define SHOW_TIME_PERIOD 5000

// Enter a MAC address for your controller below.
// Newer Ethernet shields have a MAC address printed on a sticker on the shield
byte mac[] = {
    0x00, 0xAA, 0xBB, 0xCC, 0xDE, 0x02
};

EthernetClient client;

void setup () {
    Serial.begin (115200);
    if (Ethernet.begin (mac) == 0) {
        Serial.println ("Failed to configure Ethernet using DHCP");
        // no point in carrying on, so do nothing forevermore:
        for (;;)
            ;
    }
    NTP.onNTPSyncEvent ([](NTPSyncEvent_t error) {
        if (error) {
            Serial.print ("Time Sync error: ");
            if (error == noResponse)
                Serial.println ("NTP server not reachable");
            else if (error == invalidAddress)
                Serial.println ("Invalid NTP server address");
        } else {
            Serial.print ("Got NTP time: ");
            Serial.println (NTP.getTimeDateString (NTP.getLastNTPSync ()));
        }
    });
    NTP.setInterval (63);
    NTP.setNTPTimeout (1000);
    NTP.begin ("pool.ntp.org", 1, true);
}

void loop () {
    static int i = 0;
    static int last = 0;

    if ((millis () - last) > SHOW_TIME_PERIOD) {
        //Serial.println(millis() - last);
        last = millis ();
        Serial.print (i); Serial.print (" ");
        Serial.print (NTP.getTimeDateString ()); Serial.print (". ");
        Serial.print (NTP.isSummerTime () ? "Summer Time. " : "Winter Time. ");
        Serial.print ("Uptime: ");
        Serial.print (NTP.getUptimeString ()); Serial.print (" since ");
        Serial.println (NTP.getTimeDateString (NTP.getFirstSync ()).c_str ());

        i++;
    }
    delay (0);
    Ethernet.maintain (); // Check DHCP for renewal
}
