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
 Name:		NTPDSTTest.ino
 Created:	13/03/2018
 Author:	xose.perez@gmail.com
 Editor:	http://www.platformio.org
*/

#include <TimeLib.h>
#include <NtpClientLib.h>
#include <assert.h>

void test(bool expected) {

    char buffer[32];
    snprintf(
        buffer, sizeof(buffer),
        "Testing %04d/%02d/%02d %02d:%02d:%02d - ",
        year(), month(), day(), hour(), minute(), second()
    );
    Serial.print(buffer);
    Serial.println(NTP.isSummerTime() == expected ? "OK" : "FAIL");

}

void setup () {

    Serial.begin(115200);
    while (!Serial);

    NTP.setDayLight(true);

    // EU Test
    NTP.setDSTZone(DST_ZONE_EU);
    NTP.setTimeZone(1, 0);
    Serial.println();
    Serial.println("Europe DST");
    Serial.println("------------------------");
    setTime(0,0,0,15,02,2018); test(false);
    setTime(0,0,0,15,04,2018); test(true);
    setTime(0,0,0,01,03,2018); test(false);
    setTime(0,0,0,30,03,2018); test(true);
    setTime(1,0,0,25,03,2018); test(false);
    setTime(3,0,0,25,03,2018); test(true);
    setTime(0,0,0,01,10,2018); test(true);
    setTime(0,0,0,30,10,2018); test(false);
    setTime(1,0,0,28,10,2018); test(true);
    setTime(3,0,0,28,10,2018); test(false);

    // USA Test
    NTP.setDSTZone(DST_ZONE_USA);
    NTP.setTimeZone(-6, 0);
    Serial.println();
    Serial.println("USA DST");
    Serial.println("------------------------");
    setTime(0,0,0,15,02,2018); test(false);
    setTime(0,0,0,15,04,2018); test(true);
    setTime(0,0,0,01,03,2018); test(false);
    setTime(0,0,0,30,03,2018); test(true);
    setTime(1,0,0,11,03,2018); test(false);
    setTime(3,0,0,11,03,2018); test(true);
    setTime(0,0,0,01,11,2018); test(true);
    setTime(0,0,0,30,11,2018); test(false);
    setTime(1,0,0,04,11,2018); test(true);
    setTime(3,0,0,04,11,2018); test(false);
}

void loop () {}
