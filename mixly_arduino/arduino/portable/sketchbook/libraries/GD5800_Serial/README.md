GD5800_Serial
=======================

Simple to use Arduino library to interface to GD5800 (GD5800-28P, GD5800-16P) Mp3 Player Modules

For complete documentation about the GD5800 Mp3 Player Module, see: 
   http://sparks.gogo.co.nz/GD5800/index.html
   
For a library methods reference see:
   http://sparks.gogo.co.nz/GD5800/doxygen/class_j_q6500___serial.html

For Linux Upload and Windows Upload Repair Tool (GD5800-16) see:
   https://github.com/NikolaiRadke/GD5800-rescue-tool

Download, Install and Example
-----------------------------

* Download: http://sparks.gogo.co.nz/GD5800_Serial.zip
* Open the Arduino IDE (1.0.5)
* Select the menu item Sketch > Import Library > Add Library
* Choose to install the GD5800_Serial.zip file you downloaded
* Now you can choose File > Examples > GD5800_Serial > HelloWorld
  
Connecting To Your Arduino
--------------------------

<img src="http://sparks.gogo.co.nz/assets/_site_/images/GD5800/kq6500-16p.jpeg" align="right" title="GD5800-16p" alt="Pinout image of GD5800-16p MP3 Player Module For Arduino"/>
<img src="http://sparks.gogo.co.nz/assets/_site_/images/GD5800/GD5800-28.jpeg" align="right" title="GD5800-28p" alt="Pinout image of GD5800-28p MP3 Player Module For Arduino"/>

There are two varients of the GD5800 module as shown.

To use this library with a *5v Arduino*, connect as follows.

| GD5800 Module | Arduino |
| ------------- | ------- |
| RX            | through a 1K Resistor then to pin 9 |
| TX            | pin 8   |
| GND (any of)  | GND     |
| VCC (any of)  | VCC     |

To use this library with a *3v3 Arduino*, connect as follows...

| GD5800 Module | Arduino |
| ------------- | ------- |
| RX            | pin 9   |
| TX            | pin 8   |
| GND (any of)  | GND     |
| VCC (any of)  | VCC     |

You can use pins other than 9 and 8 if you wish, simply set them in your code.

Power Demands
--------------------------

If using the on-board speaker driver, then naturally the power
demands are significant, and your USB power may not be sufficient
at more 1/3rd level of volume or so, the symptom is the audo 
breaking up and potentially resetting when volume increases.

You should use either an external power source, an external amp, or a lower
volume if you experience this problem.

Usage
--------------------------

Open the HelloWorld example.
