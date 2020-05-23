# LEDbar Arduino library
A High level library for use with the Sure Electronics DE-DP011 40 segment LED bar, or any other 74HC164 based LED bar. This library makes it easy to interface this LED bar into your project. Make sure to check out [the examples](https://github.com/MCUdude/LEDbar/tree/master/examples) for getting the most out of this library! 
<br/>
<img src="http://i.imgur.com/fAAerl4.jpg" width="400"> <img src="http://i.imgur.com/htIPYlU.jpg" width="400">

## Supported microcontrollers
Any Arduino compatible microcontroller with at least 2 IO pins! This library does not depend on hardware spesific code.

## How to install
This library can be installed in two ways, ether by using the manual mode or by using the Arduino library editor.

### Manual installation
Click on the "Clone or download" button in the upper right corner, and then "Download ZIP". Exctract the ZIP file, and move the extracted folder to the location "~/Documents/Arduino/libraries". Create the "libraries" folder if it doesn't exist. Open Arduino IDE, and a new library called "LEDbar" will show up under the "examples" menu.

### Library manager installation
The library is also available through Arduino's library manager. <br/> 
To open the library manager, in the IDE click on `Sketch` -> `Include Library` -> `Manage Libraries` <br/>
Then search for <b>LEDbar</b>.

## About the LED bar
This LED bar was previously maufactured and sold by [Sure Electronics](http://store3.sure-electronics.com), and the user manual can be [downloaded here](https://github.com/MCUdude/LEDbar/raw/master/DE-DP011_Users_guide.pdf). The LED bar got 40 LEDs that's controlled by five [74HC164 serial-in parallel-out shift registers](http://www.nxp.com/documents/data_sheet/74HC_HCT164.pdf). The board also got a dim input, that can be pulsed in order to dim the LEDs.
<br/>
As the user manual states; the clock frequency can be no more than 10 MHz, and no more than 4 LED bars should be daisy chained to precent signaling issues.
<br/>

## Minimal setup
Here's a minimal setup that will get you up and running. Note that this setup includes the BUSY pin.
<br/> <br/>
<img src="http://i.imgur.com/e9aMiJV.png" width="430">   <img src="http://i.imgur.com/hEBoSiW.jpg" width="430">



## Reference

### Constructor
This library has two constructors, on with and one without the DIM pin. Using the DIM pin isn't mandatory, but it's recommended, because the LED bar will flash and blink while the bits are clocked out.
``` c++
// Constructor with dim pin
LEDbar(uint8_t clk, uint8_t data, uint8_t dim);
// Constructor without dim pin
LEDbar(uint8_t clk, uint8_t data);
```

### Methods
``` c++
// Pass the number of LEDs
void begin(uint8_t numberOfLEDs);

// Clear the LED bar
void clear();

// Turn on all LEDs
void all();

// Adjust the brightness (0 - 255)
void brightness(uint8_t level);

// Set n dots from position x 
void setDots(uint8_t position, uint8_t dots);

// Turn on n leds from start position. Use negative numbers to start from the other end
void setLevel(int8_t level);

// Set a repeating pattern, 8 bit standard
void setPattern(uint64_t pattern, uint8_t length = 8);
```

