Max72xxPanel
============

An Arduino library for controlling a canvas of sets of 8x8 LEDs driven by MAX7219 or MAX7221 controllers. [Kits][hardware] sold for below 10 USD.

This is a plugin for Adafruit's core graphics library GFX, providing basic graphics primitives (points, lines, circles, characters, etc.). So besides this library, you need to download and install [Adafruit_GFX][gfx-download], *dated Jul 5th, 2013 or more recent*. 

Written by Mark Ruys, <mark@paracas.nl>, 2013.


Installation
------------

Place the [Max72xxPanel][download] and [Adafruit_GFX][gfx-download] library folders in your `<arduinosketchfolder>/libraries/` folder. You may need to create the `libraries` subfolder if its your first library. Restart the Arduino IDE. 


Features
--------
- Double buffering to prevent screen flicker. Check out our example for usage.
- Support for multiple matrix displays, positioned in an arbitrary rectangular layout. You can define both the order as the rotation of each display.
- Uses the [SPI library][spi] to address the display(s) connected in cascade.
- Low memory footprint.
- Fast, no use of NOOP's.

Usage
-----

Read [overview][gfx-docs] for instructions how to use Adafruit_GFX. Check out our [examples][examples] to get some inspiration. Note that to update your displays, you need to explicitely call write().

At YouTube, you'll find a [ticker tape][tickertape] and [snake] demo.


[download]: https://github.com/markruys/arduino-Max72xxPanel/archive/master.zip "Download Max72xxPanel library"
[gfx-download]: https://github.com/adafruit/Adafruit-GFX-Library "Download Adafruit GFX Graphics Library"
[gfx-docs]: http://learn.adafruit.com/adafruit-gfx-graphics-library/overview "Documentation Adafruit GFX Graphics Library"
[examples]: https://github.com/markruys/arduino-Max72xxPanel/tree/master/examples "Show Max72xxPanel examples"
[hardware]: https://www.google.com/search?q=MAX7219+Red+Dot+Matrix+Module "For kits, google MAX7219 Red Dot Matrix Module"
[spi]: http://arduino.cc/en/Reference/SPI "SPI library"
[tickertape]: http://www.youtube.com/watch?v=a8T7ZFeaf1A "Max72xxPanel Arduino library demo (ticker tape)"
[snake]: http://www.youtube.com/watch?v=FbJJyuCwohs "Max72xxPanel Arduino library demo (snake)"