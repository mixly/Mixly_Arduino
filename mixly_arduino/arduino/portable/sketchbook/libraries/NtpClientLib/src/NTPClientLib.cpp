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
//
//
//

#include "NtpClientLib.h"

#define DBG_PORT Serial

#ifdef DEBUG_NTPCLIENT
#define DEBUGLOG(...) DBG_PORT.printf(__VA_ARGS__)
#else
#define DEBUGLOG(...)
#endif

NTPClient::NTPClient () {
}

bool NTPClient::setNtpServerName (String ntpServerName) {
    uint8_t strLen = ntpServerName.length ();
    if (strLen > SERVER_NAME_LENGTH || strLen <= 0) {
        return false;
    }

    ntpServerName.toCharArray (_ntpServerName, SERVER_NAME_LENGTH);
    DEBUGLOG ("NTP server set to %s\n", _ntpServerName);
    return true;
}

bool NTPClient::setNtpServerName (char* ntpServerName) {
    char *name = ntpServerName;
    if (!name) {
        return false;
    }
    if (!strlen (name)) {
        return false;
    }
    DEBUGLOG ("NTP server set to %s\n", name);
    memset (_ntpServerName, 0, SERVER_NAME_LENGTH);
    strcpy (_ntpServerName, name);
    return true;
}

String NTPClient::getNtpServerName () {
    return String (_ntpServerName);
}

char* NTPClient::getNtpServerNamePtr () {
    return _ntpServerName;
}

bool NTPClient::setDSTZone (uint8_t dstZone) {
    if (dstZone < DST_ZONE_COUNT) {
        _dstZone = dstZone;
        return true;
    }
    return false;
}

uint8_t NTPClient::getDSTZone () {
    return _dstZone;
}

bool NTPClient::setTimeZone (int8_t timeZone, int8_t minutes) {
    if ((timeZone >= -12) && (timeZone <= 14) && (minutes >= -59) && (minutes <= 59)) {
        // Do the maths to change current time, but only if we are not yet sync'ed,
        // we don't want to trigger the UDP query with the now() below
        if (_lastSyncd > 0) {
            int8_t timeDiff = timeZone - _timeZone;
            int8_t minDiff = minutes - _minutesOffset;
            setTime (now () + timeDiff * SECS_PER_HOUR + minDiff * SECS_PER_MIN);
        }
        _timeZone = timeZone;
        _minutesOffset = minutes;
        DEBUGLOG ("NTP time zone set to: %d\r\n", timeZone);
        return true;
    }
    return false;
}

#if NETWORK_TYPE == NETWORK_W5100 || NETWORK_TYPE == NETWORK_WIFI101
boolean sendNTPpacket (IPAddress address, UDP *udp) {
    uint8_t ntpPacketBuffer[NTP_PACKET_SIZE]; //Buffer to store request message

                                           // set all bytes in the buffer to 0
    memset (ntpPacketBuffer, 0, NTP_PACKET_SIZE);
    // Initialize values needed to form NTP request
    // (see URL above for details on the packets)
    ntpPacketBuffer[0] = 0b11100011;   // LI, Version, Mode
    ntpPacketBuffer[1] = 0;     // Stratum, or type of clock
    ntpPacketBuffer[2] = 6;     // Polling Interval
    ntpPacketBuffer[3] = 0xEC;  // Peer Clock Precision
                                // 8 bytes of zero for Root Delay & Root Dispersion
    ntpPacketBuffer[12] = 49;
    ntpPacketBuffer[13] = 0x4E;
    ntpPacketBuffer[14] = 49;
    ntpPacketBuffer[15] = 52;
    // all NTP fields have been given values, now
    // you can send a packet requesting a timestamp:
    udp->beginPacket (address, DEFAULT_NTP_PORT); //NTP requests are to port 123
    udp->write (ntpPacketBuffer, NTP_PACKET_SIZE);
    udp->endPacket ();
    return true;
}

time_t NTPClient::getTime () {
    IPAddress timeServerIP; //NTP server IP address
    uint8_t ntpPacketBuffer[NTP_PACKET_SIZE]; //Buffer to store response message


    DEBUGLOG ("Starting UDP\n");
    udp->begin (DEFAULT_NTP_PORT);
    //DEBUGLOG ("UDP port: %d\n",udp->localPort());
    while (udp->parsePacket () > 0); // discard any previously received packets
#if NETWORK_TYPE == NETWORK_W5100
    DNSClient dns;
    dns.begin (Ethernet.dnsServerIP ());
    int8_t dnsResult = dns.getHostByName (getNtpServerName ().c_str (), timeServerIP);
    if (dnsResult <= 0) {
        if (onSyncEvent)
            onSyncEvent (invalidAddress);
        return 0; // return 0 if unable to get the time
    }
#else
    WiFi.hostByName (getNtpServerName ().c_str (), timeServerIP);
#endif
    DEBUGLOG ("NTP Server IP: %s\r\n", timeServerIP.toString ().c_str ());
    sendNTPpacket (timeServerIP, udp);
    uint32_t beginWait = millis ();
    while (millis () - beginWait < ntpTimeout) {
        int size = udp->parsePacket ();
        if (size >= NTP_PACKET_SIZE) {
            DEBUGLOG ("-- Receive NTP Response\n");
            udp->read (ntpPacketBuffer, NTP_PACKET_SIZE);  // read packet into the buffer
            time_t timeValue = decodeNtpMessage (ntpPacketBuffer);
            if (timeValue != 0) {
                setSyncInterval (getLongInterval ());
                if (!_firstSync) {
                    //    if (timeStatus () == timeSet)
                    _firstSync = timeValue;
                }
                //getFirstSync (); // Set firstSync value if not set before
                DEBUGLOG ("Sync frequency set low\n");
                udp->stop ();
                setLastNTPSync (timeValue);
                DEBUGLOG ("Successful NTP sync at %s\n", getTimeDateString (getLastNTPSync ()).c_str ());

                if (onSyncEvent)
                    onSyncEvent (timeSyncd);
                return timeValue;
            } else {
                DEBUGLOG ("-- No valid NTP data :-(\n");
                udp->stop ();
                setSyncInterval (getShortInterval ()); // Retry connection more often
                if (onSyncEvent)
                    onSyncEvent (noResponse);
                return 0; // return 0 if unable to get the time
            }
        }
#ifdef ARDUINO_ARCH_ESP8266
        ESP.wdtFeed ();
        yield ();
#endif
    }
    DEBUGLOG ("-- No NTP Response :-(\n");
    udp->stop ();
    if (timeStatus () != timeSet) {
        setSyncInterval (getShortInterval ()); // Retry connection more often if sync is needed and we get no response
    }
    if (onSyncEvent)
        onSyncEvent (noResponse);
    return 0; // return 0 if unable to get the time
}
#elif NETWORK_TYPE == NETWORK_ESP8266 || NETWORK_TYPE == NETWORK_ESP32
void NTPClient::s_dnsFound (const char *name, const ip_addr_t *ipaddr, void *callback_arg) {
    reinterpret_cast<NTPClient*>(callback_arg)->dnsFound (ipaddr);
}

#if NETWORK_TYPE == NETWORK_ESP8266
IPAddress getIPClass (const ip_addr_t *ipaddr) {

    if (!ipaddr) {
        DEBUGLOG ("%s - IP address not found\n", __FUNCTION__);
        return IPAddress (0, 0, 0, 0);
    }

    IPAddress ip;
#ifdef ESP8266
    ip = IPAddress (ipaddr->addr);
#elif defined ESP32
    ip = IPAddress (ipaddr->u_addr.ip4.addr);
#endif
    DEBUGLOG ("%s - IPAddress: %s\n", __FUNCTION__, ip.toString ().c_str ());
    return ip;
}

void NTPClient::dnsFound (const ip_addr_t *ipaddr) {
    //IPAddress ip;

    dnsStatus = DNS_SOLVED;
    responseTimer2.detach ();
    ntpServerIPAddress = getIPClass (ipaddr);
    DEBUGLOG ("%s - %s\n", __FUNCTION__, ntpServerIPAddress.toString ().c_str ());
    if (ipaddr != NULL && ntpServerIPAddress != (uint32_t)(0)) {
       time_t newTime = getTime();
       DEBUGLOG ("%s - Get time\n", __FUNCTION__);
       if (newTime) setTime(newTime);
    }
}

void  NTPClient::processDNSTimeout () {
    status = unsyncd;
    dnsStatus = DNS_IDLE;
    //timer1_disable ();
    responseTimer2.detach ();
    DEBUGLOG ("%s - DNS response Timeout\n", __FUNCTION__);
    if (onSyncEvent)
        onSyncEvent (invalidAddress);
}

void ICACHE_RAM_ATTR NTPClient::s_processDNSTimeout (void* arg) {
    reinterpret_cast<NTPClient*>(arg)->processDNSTimeout ();
}
#endif

time_t NTPClient::getTime () {
    //IPAddress ntpServerIPAddress; //NTP server IP address

#if NETWORK_TYPE == NETWORK_ESP8266
    err_t error = ERR_OK;
    uint16_t dnsTimeout = 5000;
    ip_addr_t ipaddress;
                            //char ntpPacketBuffer[NTP_PACKET_SIZE]; //Buffer to store response message
    DEBUGLOG ("%s\n", __FUNCTION__);
    //timeServerIP = IPAddress (ipaddress.addr); // ip address format conversion test
    //ipaddress.addr = (uint32_t)timeServerIP;
    if (dnsStatus == DNS_IDLE)
    {
        DEBUGLOG ("%s - Resolving DNS of %s\n", __FUNCTION__, getNtpServerName ().c_str ());
        error = dns_gethostbyname (getNtpServerName ().c_str (), &ipaddress, (dns_found_callback)&s_dnsFound, this);
        DEBUGLOG ("%s - DNS result: %d\n", __FUNCTION__, (int)error);
        if (error == ERR_INPROGRESS) {
            dnsStatus = DNS_REQUESTED;
            DEBUGLOG ("%s - DNS Resolution in progress\n", __FUNCTION__);
            responseTimer2.once_ms (dnsTimeout, &NTPClient::s_processDNSTimeout, static_cast<void*>(this));
            return 0;
        } else if (error == ERR_OK) {
            dnsStatus = DNS_SOLVED;
            ntpServerIPAddress = getIPClass (&ipaddress);
        } else {
            DEBUGLOG ("%s - DNS Resolution error\n", __FUNCTION__);
            return 0;
        }
    }
    DEBUGLOG ("%s - DNS name IP solved: %s\n", __FUNCTION__, ntpServerIPAddress.toString ().c_str ());
    if (error == ERR_OK && dnsStatus == DNS_SOLVED) {
        dnsStatus = DNS_IDLE;
#elif NETWORK_TYPE == NETWORK_ESP32
    int error = WiFi.hostByName (getNtpServerName ().c_str (), ntpServerIPAddress);
    if (error) {
#endif
        DEBUGLOG ("%s - Starting UDP. IP: %s\n", __FUNCTION__, ntpServerIPAddress.toString ().c_str ());
        if (ntpServerIPAddress == INADDR_NONE) {
            DEBUGLOG ("%s - IP address unset. Aborting.\n", __FUNCTION__);
            //DEBUGLOG ("%s - DNS Status: %d\n", __FUNCTION__, dnsStatus);
            return 0;
        }
        if (udp->connect (ntpServerIPAddress, DEFAULT_NTP_PORT)) {
            udp->onPacket (std::bind (&NTPClient::processPacket, this, _1));
            DEBUGLOG ("%s - Sending UDP packet\n", __FUNCTION__);
            if (sendNTPpacket (udp)) {
                DEBUGLOG ("%s - NTP request sent\n", __FUNCTION__);
                status = ntpRequested;
                responseTimer.once_ms (ntpTimeout, &NTPClient::s_processRequestTimeout, static_cast<void*>(this));
                /*timer1_attachInterrupt (s_processRequestTimeout);
                timer1_enable (TIM_DIV256, TIM_EDGE, TIM_SINGLE);
                timer1_write ((uint32_t)(312.5*ntpTimeout));*/
                if (onSyncEvent)
                    onSyncEvent (requestSent);
                return 0;
            } else {
                DEBUGLOG ("%s - NTP request error\n", __FUNCTION__);
                if (onSyncEvent)
                    onSyncEvent (errorSending);
                return 0;
            }
        } else {
            if (onSyncEvent)
                onSyncEvent (noResponse);
            return 0; // return 0 if unable to get the time
        }
    } else {
        DEBUGLOG ("%s - HostByName error %d\n", __FUNCTION__, (int)error);
        if (onSyncEvent)
            onSyncEvent (invalidAddress);
        return 0; // return 0 if unable to get the time
    }

}

void dumpNTPPacket (byte *data, size_t length) {
    //byte *data = packet.data ();
    //size_t length = packet.length ();

    for (size_t i = 0; i < length; i++) {
        DEBUGLOG ("%02X ", data[i]);
        if ((i + 1) % 16 == 0) {
            DEBUGLOG ("\n");
        } else if ((i + 1) % 4 == 0) {
            DEBUGLOG ("| ");
        }
    }
}

boolean NTPClient::sendNTPpacket (AsyncUDP *udp) {
    AsyncUDPMessage ntpPacket = AsyncUDPMessage ();

    uint8_t ntpPacketBuffer[NTP_PACKET_SIZE]; //Buffer to store request message
                                              // set all bytes in the buffer to 0
    memset (ntpPacketBuffer, 0, NTP_PACKET_SIZE);
    // Initialize values needed to form NTP request
    // (see URL above for details on the packets)
    ntpPacketBuffer[0] = 0b11100011;   // LI, Version, Mode
    ntpPacketBuffer[1] = 0;     // Stratum, or type of clock
    ntpPacketBuffer[2] = 6;     // Polling Interval
    ntpPacketBuffer[3] = 0xEC;  // Peer Clock Precision
                                // 8 bytes of zero for Root Delay & Root Dispersion
    ntpPacketBuffer[12] = 49;
    ntpPacketBuffer[13] = 0x4E;
    ntpPacketBuffer[14] = 49;
    ntpPacketBuffer[15] = 52;
    // all NTP fields have been given values, now
    // you can send a packet requesting a timestamp:
    ntpPacket.write (ntpPacketBuffer, NTP_PACKET_SIZE);
    if (udp->send (ntpPacket)) {
        DEBUGLOG ("\n");
        dumpNTPPacket (ntpPacket.data (), ntpPacket.length ());
        DEBUGLOG ("\nUDP packet sent\n");
        return true;
    } else {
        return false;
    }
}

void NTPClient::processPacket (AsyncUDPPacket& packet) {
    uint8_t *ntpPacketBuffer;
    int size;

    if (status == ntpRequested) {
        size = packet.length ();
        if (size >= NTP_PACKET_SIZE) {
            //timer1_disable ();
            responseTimer.detach ();
            ntpPacketBuffer = packet.data ();
            time_t timeValue = decodeNtpMessage (ntpPacketBuffer);
            setTime (timeValue);
            status = syncd;
            setSyncInterval (getLongInterval ());
            if (!_firstSync) {
                //    if (timeStatus () == timeSet)
                _firstSync = timeValue;
            }
            setLastNTPSync (timeValue);
            DEBUGLOG ("Sync frequency set low\n");
            DEBUGLOG ("Successful NTP sync at %s\n", getTimeDateString (getLastNTPSync ()).c_str ());

            if (onSyncEvent)
                onSyncEvent (timeSyncd);
        } else {
            DEBUGLOG ("Response Error\n");
            status = unsyncd;
            if (onSyncEvent)
                onSyncEvent (responseError);
        }

    } else {
        DEBUGLOG ("Unrequested response\n");
    }

    DEBUGLOG ("UDP packet received\n");
    DEBUGLOG ("UDP Packet Type: %s, From: %s:%d, To: %s:%d, Length: %u, Data:\n\n",
        packet.isBroadcast () ? "Broadcast" : packet.isMulticast () ? "Multicast" : "Unicast",
        packet.remoteIP ().toString ().c_str (),
        packet.remotePort (),
        packet.localIP ().toString ().c_str (),
        packet.localPort (),
        packet.length ());
    //reply to the client
    dumpNTPPacket (packet.data (), packet.length ());
    DEBUGLOG ("\n");
}

void ICACHE_RAM_ATTR NTPClient::processRequestTimeout () {
    status = unsyncd;
    //timer1_disable ();
    responseTimer.detach ();
    DEBUGLOG ("NTP response Timeout\n");
    if (onSyncEvent)
        onSyncEvent (noResponse);
}

void ICACHE_RAM_ATTR NTPClient::s_processRequestTimeout (void* arg) {
    NTPClient* self = reinterpret_cast<NTPClient*>(arg);
    self->processRequestTimeout ();
}
#endif

int8_t NTPClient::getTimeZone () {
    return _timeZone;
}

int8_t NTPClient::getTimeZoneMinutes () {
    return _minutesOffset;
}

/*void NTPClient::setLastNTPSync(time_t moment) {
    _lastSyncd = moment;
}*/

time_t NTPClient::s_getTime () {
    return NTP.getTime ();
}

#if NETWORK_TYPE == NETWORK_W5100
bool NTPClient::begin (String ntpServerName, int8_t timeZone, bool daylight, int8_t minutes, EthernetUDP* udp_conn) {
#elif NETWORK_TYPE == NETWORK_WIFI101
bool NTPClient::begin (String ntpServerName, int8_t timeZone, bool daylight, int8_t minutes, WiFiUDP* udp_conn) {
#elif NETWORK_TYPE == NETWORK_ESP8266 || NETWORK_TYPE == NETWORK_ESP32
bool NTPClient::begin (String ntpServerName, int8_t timeZone, bool daylight, int8_t minutes, AsyncUDP* udp_conn) {
#endif
    if (!setNtpServerName (ntpServerName)) {
        DEBUGLOG ("Time sync not started\r\n");
        return false;
    }
    if (!setTimeZone (timeZone, minutes)) {
        DEBUGLOG ("Time sync not started\r\n");
        return false;
    }
    if (udp_conn) {
        udp = udp_conn;
    } else if (!udp) { // Check if upd connection was already created
#if NETWORK_TYPE == NETWORK_W5100
        udp = new EthernetUDP ();
#elif NETWORK_TYPE == NETWORK_WIFI101
        udp = new WiFiUDP ();
#else
        udp = new AsyncUDP ();
#endif
    }

    //_timeZone = timeZone;
    setDayLight (daylight);
    _lastSyncd = 0;

    if (_shortInterval == 0 && _longInterval == 0) {
        if (!setInterval (DEFAULT_NTP_SHORTINTERVAL, DEFAULT_NTP_INTERVAL)) {
            DEBUGLOG ("Time sync not started\r\n");
            return false;
        }
    }
    DEBUGLOG ("Time sync started\r\n");

    setSyncInterval (getShortInterval ());
    setSyncProvider (s_getTime);

    return true;
}

NTPClient::~NTPClient () {
    stop ();
}

bool NTPClient::stop () {
    setSyncProvider (NULL);
    // Free up connection resources
    if (udp) {
#if NETWORK_TYPE == NETWORK_ESP8266 || NETWORK_TYPE == NETWORK_ESP32
        udp->close ();
#else
        udp->stop ();
#endif
        delete (udp);
        udp = 0;
    }
    DEBUGLOG ("Time sync disabled\n");

    return true;
}

bool NTPClient::setInterval (int interval) {
    if (interval >= 10) {
        if (_longInterval != interval) {
            _longInterval = interval;
            DEBUGLOG ("Sync interval set to %d\n", interval);
            if (timeStatus () == timeSet)
                setSyncInterval (interval);
        }
        return true;
    } else
        return false;
}

bool NTPClient::setInterval (int shortInterval, int longInterval) {
    if (shortInterval >= 10 && longInterval >= 10) {
        _shortInterval = shortInterval;
        _longInterval = longInterval;
        if (timeStatus () != timeSet) {
            setSyncInterval (shortInterval);
        } else {
            setSyncInterval (longInterval);
        }
        DEBUGLOG ("Short sync interval set to %d\n", shortInterval);
        DEBUGLOG ("Long sync interval set to %d\n", longInterval);
        return true;
    } else
        return false;
}

int NTPClient::getInterval () {
    return _longInterval;
}

int NTPClient::getShortInterval () {
    return _shortInterval;
}

void NTPClient::setDayLight (bool daylight) {

    // Do the maths to change current time, but only if we are not yet sync'ed,
    // we don't want to trigger the UDP query with the now() below
    if (_lastSyncd > 0) {
        if ((_daylight != daylight) && isSummerTimePeriod (now ())) {
            if (daylight) {
                setTime (now () + SECS_PER_HOUR);
            } else {
                setTime (now () - SECS_PER_HOUR);
            }
        }
    }

    _daylight = daylight;
    DEBUGLOG ("--Set daylight saving %s\n", daylight ? "ON" : "OFF");

}

bool NTPClient::getDayLight () {
    return _daylight;
}

String NTPClient::getTimeStr (time_t moment) {
    char timeStr[10];
    sprintf (timeStr, "%02d:%02d:%02d", hour (moment), minute (moment), second (moment));
    return timeStr;
}
String NTPClient::getHourMinuteStr (time_t moment) {
    char timeStr[6];
    if( second (moment)%2)
        sprintf (timeStr, "%02d:%02d", hour (moment), minute (moment));
    else
        sprintf (timeStr, "%02d %02d", hour (moment), minute (moment));
    return timeStr;
}
int NTPClient::getTimeHour24 (time_t moment) {
    return hour (moment);
}
int NTPClient::getTimeHour12 (time_t moment) {
 return hour (moment)%12;
}
int NTPClient::getTimeMinute (time_t moment) {
    return minute (moment);
}
int NTPClient::getTimeSecond (time_t moment) {
    return second (moment);
}
String NTPClient::getDateStr (time_t moment) {
    char dateStr[12];
    sprintf (dateStr, "%4d/%02d/%02d/",year (moment),month (moment),  day (moment) );
    return dateStr;
}
int NTPClient::getDateYear (time_t moment) {
    return year (moment) ;
}
int NTPClient::getDateMonth (time_t moment) {
    return month (moment);
}
int NTPClient::getDateDay (time_t moment) {
    return day (moment);
}



String NTPClient::getTimeDateString (time_t moment) {
    return getTimeStr (moment) + " " + getDateStr (moment);
}

time_t NTPClient::getLastNTPSync () {
    return _lastSyncd;
}

void NTPClient::onNTPSyncEvent (onSyncEvent_t handler) {
    onSyncEvent = handler;
}

time_t NTPClient::getUptime () {
    _uptime = _uptime + (millis () - _uptime);
    return _uptime / 1000;
}

String NTPClient::getUptimeString () {
    uint16_t days;
    uint8_t hours;
    uint8_t minutes;
    uint8_t seconds;

    time_t uptime = getUptime ();

    seconds = uptime % SECS_PER_MIN;
    uptime -= seconds;
    minutes = (uptime % SECS_PER_HOUR) / SECS_PER_MIN;
    uptime -= minutes * SECS_PER_MIN;
    hours = (uptime % SECS_PER_DAY) / SECS_PER_HOUR;
    uptime -= hours * SECS_PER_HOUR;
    days = uptime / SECS_PER_DAY;

    char uptimeStr[20];
    sprintf (uptimeStr, "%4u days %02d:%02d:%02d", days, hours, minutes, seconds);

    return uptimeStr;
}

time_t NTPClient::getLastBootTime () {
    if (timeStatus () == timeSet) {
        return (now () - getUptime ());
    }
    return 0;
}

time_t NTPClient::getFirstSync () {
    /*if (!_firstSync) {
        if (timeStatus () == timeSet) {
            _firstSync = now () - getUptime ();
        }
    }*/
    return _firstSync;
}

bool NTPClient::summertime (int year, byte month, byte day, byte hour, byte weekday, byte tzHours)
// input parameters: "normal time" for year, month, day, hour, weekday and tzHours (0=UTC, 1=MEZ)
{
    if (DST_ZONE_EU == _dstZone) {
        if ((month < 3) || (month > 10)) return false; // keine Sommerzeit in Jan, Feb, Nov, Dez
        if ((month > 3) && (month < 10)) return true; // Sommerzeit in Apr, Mai, Jun, Jul, Aug, Sep
        if ((month == 3 && ((hour + 24 * day) >= (1 + tzHours + 24 * (31 - (5 * year / 4 + 4) % 7)))) || ((month == 10 && (hour + 24 * day) < (1 + tzHours + 24 * (31 - (5 * year / 4 + 1) % 7)))))
            return true;
        else
            return false;
    }

    if (DST_ZONE_USA == _dstZone) {

        // always false for Jan, Feb and Dec
        if ((month < 3) || (month > 11)) return false;

        // always true from Apr to Oct
        if ((month > 3) && (month < 11)) return true;

        // first sunday of current month
        uint8_t first_sunday = (7 + day - weekday) % 7 + 1;

        // Starts at 2:00 am on the second sunday of Mar
        if (3 == month) {
            if (day < 7 + first_sunday) return false;
            if (day > 7 + first_sunday) return true;
            return (hour > 2);
        }

        // Ends a 2:00 am on the first sunday of Nov
        // We are only getting here if its Nov
        if (day < first_sunday) return true;
        if (day > first_sunday) return false;
        return (hour < 2);

    }

    return false;

}

boolean NTPClient::isSummerTimePeriod (time_t moment) {
    return summertime (year (), month (), day (), hour (), weekday (), getTimeZone ());
}

void NTPClient::setLastNTPSync (time_t moment) {
    _lastSyncd = moment;
}

uint16_t NTPClient::getNTPTimeout () {
    return ntpTimeout;
}

boolean NTPClient::setNTPTimeout (uint16_t milliseconds) {

    if (milliseconds >= MIN_NTP_TIMEOUT) {
        ntpTimeout = milliseconds;
        DEBUGLOG ("Set NTP timeout to %u ms\n", milliseconds);
        return true;
    }
    DEBUGLOG ("NTP timeout should be higher than %u ms. You've tried to set %u ms\n", MIN_NTP_TIMEOUT, milliseconds);
    return false;

}

time_t NTPClient::decodeNtpMessage (uint8_t *messageBuffer) {
    unsigned long secsSince1900;
    // convert four bytes starting at location 40 to a long integer
    secsSince1900 = (unsigned long)messageBuffer[40] << 24;
    secsSince1900 |= (unsigned long)messageBuffer[41] << 16;
    secsSince1900 |= (unsigned long)messageBuffer[42] << 8;
    secsSince1900 |= (unsigned long)messageBuffer[43];

    DEBUGLOG ("Secs: %lu \n", secsSince1900);

    if (secsSince1900 == 0) {
        DEBUGLOG ("--Timestamp is Zero\n");
        return 0;
    }
#define SEVENTY_YEARS 2208988800UL
    time_t timeTemp = secsSince1900 - SEVENTY_YEARS + _timeZone * SECS_PER_HOUR + _minutesOffset * SECS_PER_MIN;

    if (_daylight) {
        if (summertime (year (timeTemp), month (timeTemp), day (timeTemp), hour (timeTemp), weekday (timeTemp), _timeZone)) {
            timeTemp += SECS_PER_HOUR;
            DEBUGLOG ("Summer Time\n");
        } else {
            DEBUGLOG ("Winter Time\n");
        }
    } else {
        DEBUGLOG ("No daylight\n");
    }
    return timeTemp;
}

NTPClient NTP;