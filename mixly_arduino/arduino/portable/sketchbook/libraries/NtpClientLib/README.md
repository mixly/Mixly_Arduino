# NtpClientLib

## Introduction
There are some NTP client examples around. You can see some examples, like [this](https://www.arduino.cc/en/Tutorial/UdpNTPClient).

In a device like ESP8266 or any Internet connected Arduino having NTP synchronization is well convenient. Using that example you can add NTP client to your projects but I was looking for a quicker way to add it, using something like NTPClient class.

So I decided to do my own NTP client library to sync ESP8266 time via WiFi using Arduino IDE. It can also be used on any ethernet or WiFi connected Arduino, although as I do not have any WiFi enabled Arduino code is not tested. Testers are welcome.

This library support both Arduino MKR1000, ESP8266 and ESP32.

## Description
This is a NTP library to be able to get time from NTP server with my connected microcontrollers. Support for regular **Arduino** with **ethernet** shield, **ESP8266**, **ESP32** and Arduino **MKR1000** is available. Please test it and inform via GitHub.

Using the library is fairly easy. A NTP singleton object is created inside library. You may use default values by using `NTP.begin()` without parameters. After that, synchronization is done regularly without user intervention. Some parameters can be adjusted: server, sync frequency, time offset.

You don't need anything more. Time update is managed inside library so, after `NTP.begin()` no more calls to library are needed.

Update frequency is higher (every 15 seconds as default) until 1st successful sync is achieved. Since then, your own (or default 1800 seconds) adjusted period applies. There is a way to adjust both short and long sync period if needed.

In current version source code is the same for all platforms. There has been some interface changes during last update. Although I've tried to keep backwards compatibility you may find some discrepancies. Let me know so that I can correct it.

This library includes an uptime log too. It counts number of seconds since sketch is started. It can be checked calling `NTP.getUptime()` or `NTP.getUptimeString()` for a human readable string.

Every time that local time is adjusted a `ntpEvent` is thrown. You can attach a function to it using `NTP.onNTPSyncEvent()`. Indeed, this event is thrown just before time is sent to [Time] Library. Because of that, you should try not to make time consuming tasks inside event handler. Although it is taken into account inside library, it would add some offset to calculated time. My recommendation is to use a flag and process it inside `loop()`function.

Called function format must be like `void eventHandler(NTPSyncEvent_t event)`.

ESP8266 example uses a simple function to turn a flag on, so actual event handling code is run inside main loop.

## Examples

Please check examples folder into repository source code.

## Performance
Don't expect atomic-clock-like precision. This library does not take network delay into account neither uses all NTP mechanisms available to improve accuracy. It is in the range of 1 to 2 seconds. Enough for most projects.

I have the plan to add full network delay compensation. Due to limited Time Library precision of 1 second, it probably will not affect overall accuracy.

## Dependencies
This library makes use of [Time](https://github.com/PaulStoffregen/Time.git) library. You need to add it to use NTPClientLib

