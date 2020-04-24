#ifndef MD_MAXPANEL_h
#define MD_MAXPANEL_h

#include <Arduino.h>
#include <MD_MAX72xx.h>

/**
 * \file
 * \brief Main header file for the MD_MAXPanel library
 */

/**
\mainpage Arduino LED Matrix Panel Library
The MD_MAXPanel Library
-----------------------
This library implements functions that allows cascaded MAX72xx LED modules 
(64 individual LEDs)to be used for LED matrix panels, allowing the programmer 
to use the LED matrix as an pixel addressable display device, as shown in the 
photo below.

![MD_MAXPanel Display Panel] (MAXPanel_Display.jpg "MD_MAXPanel Display Panel")

The MAX7219/MAX7221 are compact, serial input/output display drivers that
interface microprocessors to 7-segment numeric LED displays of up to 8 digits,
bar-graph displays, or 64 individual LEDs.

A 4-wire serial interface (SPI) allows the devices to be cascaded, with
communications passed through the first device in the chain to all others.
Individual elements may be addressed and updated without rewriting the entire 
display.

In order for this library to work, the MD_MAX72xx library must be installed and 
the correct LED module type selected. The individual LED modules must also be
arranged in a zig-zag fashion, as shown in the figure below. The number of modules
per row and the number of rows may vary, but the arrangement of the modules must 
follow the example.

![MD_MAXPanel Module Arrangement] (MAXPanel_Diagram.jpg "MD_MAXPanel Module Arrangement")

The wiring for the modules can be simplified as the only signal that needs to be truly 
cascaded is the MD_MAX72xx IC Data Out to the next IC Data In. The rest can be wired in 
parallel, as shown in the photo.

![MD_MAXPanel Module Wiring] (MAXPanel_Wiring.jpg "MD_MAXPanel Module Wiring")

Topics
------
- \subpage pageSoftware
- \subpage pageRevisionHistory
- \subpage pageCopyright
- \subpage pageDonation

\page pageDonation Support the Library
If you like and use this library please consider making a small donation using [PayPal](https://paypal.me/MajicDesigns/4USD)

\page pageCopyright Copyright
Copyright (C) 2018 Marco Colli. All rights reserved.

This library is free software; you can redistribute it and/or
modify it under the terms of the GNU Lesser General Public
License as published by the Free Software Foundation; either
version 2.1 of the License, or (at your option) any later version.

This library is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public
License along with this library; if not, write to the Free Software
Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110-1301 USA

\page pageRevisionHistory Revision History
Nov 2018 version 1.2.3
- Corrected default parameters for WEMOS compiler 

Oct 2018 version 1.2.2
- Corrected some documentation mistakes

Oct 2018 version 1.2.1
- Updated library.properties and READ.MD files

Sep 2018 version 1.2.0
- Fixed reported WEMOS D1 compiler issues
- Added polygon Fill functions contributed by AndreasPercher

Jul 2018 version 1.1.1
- Finalized preferred orientation for examples

Jul 2018 version 1.1.0
- Renamed textRotation_t to rotation_t
- Allow rotation of display (eg, landscape to portrait)
- Restored missing bricks example

Jun 2018 version 1.0.1
- Extracted common elements of examples in .h file

Jun 2018 version 1.0.0
- First Release

\page pageSoftware Software Library
The Library
-----------
The library implements functions that allow the MAX72xx matrix modules 
to be used cascaded and built up into LED matrix panels. This allows the 
programmer to control the individual panel LEDs using cartesian coordinates.
The library provides support for standard graphics elements (such as lines,
triangles, rectangles, circles) and text.

The origin for the coordinate system is always in the lowest left hand corner.
- X coordinate increase to the right.
- Y coordinate increase to upwards.

In trigonometric terms, the display is located in the first quadrant.

The library is relies on the related MD_MAX72xx library to provide the
device control elements.
*/

/**
 * Core object for the MD_MAXPanel library
 */
class MD_MAXPanel
{
public:
  /**
  * Rotation enumerated type specification.
  *
  * Used to define rotation orientation (eg, text or display). 
  * For text the normal rotation is the standard Latin language left to right 
  * orientation. Rotation is specified anchored to the first character of the 
  * string - 0 points >, 90 ^, 180 < and 270 v.
  * For the display rotation 0 and 180 and are identical and 90 and 270 are identical.
  * The rotation will shift the display between landscape and portrait mode.
  */
  enum rotation_t
  {
    ROT_0,    ///< Rotation 0 degrees
    ROT_90,   ///< Rotation 90 degrees
    ROT_180,  ///< Rotation 180 degrees
    ROT_270,  ///< Rotation 270 degrees
  };
  
  /**
   * Class Constructor - arbitrary digital interface.
   *
   * Instantiate a new instance of the class. The parameters passed are used to
   * connect the software to the hardware. Multiple instances may co-exist
   * but they should not share the same hardware CS pin (SPI interface).
   *
   * \param mod      the hardware module being used, one of the MD_MAX72XX::moduleType_t values
   * \param dataPin  output on the Arduino where data gets shifted out.
   * \param clkPin   output for the clock signal.
   * \param csPin    output for selecting the device.
   * \param xDevices number of LED matrix modules for the width of the panel.
   * \param yDevices number of LED matrix modules for the height of the panel.
   */
  MD_MAXPanel(MD_MAX72XX::moduleType_t mod, uint8_t dataPin, uint8_t clkPin, uint8_t csPin, uint8_t xDevices, uint8_t yDevices);

  /**
   * Class Constructor - SPI hardware interface.
   *
   * Instantiate a new instance of the class. The parameters passed are used to
   * connect the software to the hardware. Multiple instances may co-exist
   * but they should not share the same hardware CS pin (SPI interface).
   * The dataPin and the clockPin are defined by the Arduino hardware definition
   * (SPI MOSI and SCK signals).
   *
   * \param mod      the hardware module being used, one of the MD_MAX72XX::moduleType_t values
   * \param csPin    output for selecting the device.
   * \param xDevices number of LED matrix modules for the width of the panel.
   * \param yDevices number of LED matrix modules for the height of the panel.
   */
  MD_MAXPanel(MD_MAX72XX::moduleType_t mod, uint8_t csPin, uint8_t xDevices, uint8_t yDevices);

  /**
  * Class Constructor - Existing MD_MAX72XX object.
  *
  * Instantiate a new instance of the class. The parameters passed are used to
  * connect the software to the hardware. The MD_MAX72X object has been created 
  * outside this object and it is up to the programmer to ensure that the correct
  * parameters are used when this object is created.
  *
  * \param D        pointer to the existing MD_MAX72XX object.
  * \param xDevices number of LED matrix modules for the width of the panel.
  * \param yDevices number of LED matrix modules for the height of the panel.
  */
  MD_MAXPanel(MD_MAX72XX *D, uint8_t xDevices, uint8_t yDevices);

  /**
   * Initialize the object.
   *
   * Initialize the object data. This needs to be called during setup() to initialize 
   * new data for the class that cannot be done during the object creation.
   */
  void begin(void);

  /**
   * Class Destructor.
   *
   * Released allocated memory and does the necessary to clean up once the object is
   * no longer required.
   */
  ~MD_MAXPanel();

  //--------------------------------------------------------------
  /** \name Methods for object management.
   * @{
   */

  /**
  * Clear all the display data on all the display devices.
  *
  * \return No return value.
  */
  void clear(void) { _D->clear(0, _xDevices*_yDevices); };

  /**
  * Clear the specified display area.
  *
  * Clear the rectangular area specified by the coordinates by setting the pixels
  * to the state specified (default is off).
  *
  * \param x1 the upper left x coordinate of the window
  * \param y1 the upper left y coordinate of the window
  * \param x2 the lower right x coordinate of the window
  * \param y2 the upper lower right y coordinate of the window
  * \param state true - switch pixels on; false - switch pixels off. If omitted, default to false.
  * \return No return value.
  */
  void clear(uint16_t x1, uint16_t y1, uint16_t x2, uint16_t y2, bool state = false) { for (uint8_t i=x1; i<=x2; i++) drawVLine(i, y1, y2, state); };

  /**
  * Get a pointer to the instantiated graphics object.
  *
  * Provides a pointer to the MD_MAX72XX object to allow access to
  * the display graphics functions.
  *
  * \return Pointer to the MD_MAX72xx object used by the library.
  */
  MD_MAX72XX *getGraphicObject(void) { return(_D); }

  /**
   * Gets the maximum X coordinate.
   * 
   * Depends on the rotation status of the display.
   *
   * \return uint8_t the maximum X coordinate.
   */
  uint16_t getXMax(void);

  /**
   * Gets the maximum Y coordinate.
   *
   * Depends on the rotation status of the display.
   *
   * \return uint16_t representing the number of columns.
   */
  uint16_t getYMax(void);

  /**
   * Get the rotation status of the display
   * 
   * \return rotation_t value for the current rotation (ROT_0 or ROT_90)
   */
  rotation_t getRotation(void) { return(_rotatedDisplay ? ROT_90 : ROT_0); }

  /**
  * Set rotation status of the display
  *
  * Set the display to be rotated or not. ROT_90 and ROT_270 rotate the display
  * by 90 degrees in the same direction. ROT_O and ROT_180 are an unrotated display.
  * The default is ROT_O (unrotated).
  * 
  * \param r rotation_t value for the current rotation (ROT_0 or ROT_90);
  * \return No return value
  */
  void setRotation(rotation_t r) { _rotatedDisplay = (r == ROT_90) || (r == ROT_270); }

  /**
  * Turn auto display updates on or off.
  *
  * Turn auto updates on and off, as required. When auto updates are turned OFF the
  * display will not update after each operation. Display updates can be forced at any
  * time using using a call to update() with no parameters.
  *
  * \param state  true to enable update, false to suspend updates.
  * \return No return value.
  */
  void update(bool state) { _updateEnabled = state; _D->control(MD_MAX72XX::UPDATE, state ? MD_MAX72XX::ON : MD_MAX72XX::OFF); };

  /**
  * Force a display update.
  *
  * Force a display update of any changes since the last update. This overrides the
  * current setting for display updates.
  *
  * \return No return value.
  */
  void update() { _D->update(); };

  /**
  * Set the display intensity.
  *
  * Set the intensity (brightness) of the display.
  *
  * \param intensity the intensity to set the display (0-15).
  * \return No return value.
  */
  void setIntensity(uint8_t intensity) { _D->control(MD_MAX72XX::INTENSITY, intensity); }

  /** @} */

  //--------------------------------------------------------------
  /** \name Methods for drawing graphics.
   * @{
   */

  /**
  * Draw a horizontal line between two points on the display
  *
  * Draw a horizontal line between the specified points. The LED will be turned on or
  * off depending on the value supplied. The column number will be dereferenced
  * into the device and column within the device, allowing the LEDs to be treated
  * as a continuous pixel field.
  *
  * \param y     y coordinate for the line [0..getYMax()].
  * \param x1    starting x coordinate for the point [0..getXMax()].
  * \param x2    ending x coordinate for the point [0..getXMax()].
  * \param state true - switch on; false - switch off. If omitted, default to true.
  * \return false if any point is drawn outside the display, true otherwise.
  */
  bool drawHLine(uint16_t y, uint16_t x1, uint16_t x2, bool state = true);

  /**
   * Draw an arbitrary line between two points on the display
   *
   * Draw a line between the specified points using Bresenham's algorithm.
   * The LED will be turned on or off depending on the value supplied. The 
   * column number will be dereferenced into the device and column within 
   * the device, allowing the LEDs to be treated as a continuous pixel field.
   *
   * \param x1    starting x coordinate for the point [0..getXMax()].
   * \param y1    starting y coordinate for the point [0..getYMax()].
   * \param x2    ending x coordinate for the point [0..getXMax()].
   * \param y2    ending y coordinate for the point [0..getYMax()].
   * \param state true - switch on; false - switch off. If omitted, default to true.
   * \return false if any point is drawn outside the display, true otherwise.
   */
  bool drawLine(uint16_t x1, uint16_t y1, uint16_t x2, uint16_t y2, bool state = true);

  /**
  * Draw a vertical line between two points on the display
  *
  * Draw a horizontal line between the specified points. The LED will be turned on or
  * off depending on the value supplied. The column number will be dereferenced
  * into the device and column within the device, allowing the LEDs to be treated
  * as a continuous pixel field.
  *
  * \param x     x coordinate for the line [0..getXMax()].
  * \param y1    starting y coordinate for the point [0..getYMax()].
  * \param y2    ending y coordinate for the point [0..getYMax()].
  * \param state true - switch on; false - switch off. If omitted, default to true.
  * \return false if any point is drawn outside the display, true otherwise.
  */
  bool drawVLine(uint16_t x, uint16_t y1, uint16_t y2, bool state = true);
  
  /**
  * Draw a rectangle given two diagonal vertices
  *
  * Draw a rectangle given the points across the diagonal. The LED will be turned on or
  * off depending on the value supplied. The coordinates will be dereferenced
  * into the device and column within the device, allowing the LEDs to be treated
  * as a continuous pixel field.
  *
  * \param x1    starting x coordinate for the point [0..getXMax()].
  * \param y1    starting y coordinate for the point [0..getYMax()].
  * \param x2    ending x coordinate for the point [0..getXMax()].
  * \param y2    ending y coordinate for the point [0..getYMax()].
  * \param state true - switch on; false - switch off. If omitted, default to true.
  * \return false if any point is drawn outside the display, true otherwise.
  */
  bool drawRectangle(uint16_t x1, uint16_t y1, uint16_t x2, uint16_t y2, bool state = true);

  /**
  * Draw a filled rectangle given two diagonal vertices
  *
  * Draw a filled rectangle given the points across the diagonal. The LEDs inside 
  * and on the border will be turned on or off depending on the value supplied. 
  * The coordinates will be dereferenced into the device and column within the 
  * device, allowing the LEDs to be treated as a continuous pixel field.
  *
  * \param x1    starting x coordinate for the point [0..getXMax()].
  * \param y1    starting y coordinate for the point [0..getYMax()].
  * \param x2    ending x coordinate for the point [0..getXMax()].
  * \param y2    ending y coordinate for the point [0..getYMax()].
  * \param state true - switch on; false - switch off. If omitted, default to true.
  * \return false if any point is drawn outside the display, true otherwise.
  */
  bool drawFillRectangle(uint16_t x1, uint16_t y1, uint16_t x2, uint16_t y2, bool state = true);

  /**
  * Draw a triangle given 3 vertices
  *
  * Draw a triangle given the all the corner points. The LED will be turned on or
  * off depending on the value supplied. The coordinates will be dereferenced
  * into the device and column within the device, allowing the LEDs to be treated
  * as a continuous pixel field.
  *
  * \param x1    first x coordinate for the point [0..getXMax()].
  * \param y1    first y coordinate for the point [0..getYMax()].
  * \param x2    second x coordinate for the point [0..getXMax()].
  * \param y2    second y coordinate for the point [0..getYMax()].
  * \param x3    third x coordinate for the point [0..getXMax()].
  * \param y3    third y coordinate for the point [0..getYMax()].
  * \param state true - switch on; false - switch off. If omitted, default to true.
  * \return false if any point is drawn outside the display, true otherwise.
  */
  bool drawTriangle(uint16_t x1, uint16_t y1, uint16_t x2, uint16_t y2, uint16_t x3, uint16_t y3, bool state = true);

  /**
  * Draw a filled triangle given 3 vertices
  *
  * Draw a filled triangle given the all the corner points. The LED for 
  * the border and fill will be turned on or off depending on the value 
  * supplied. The coordinates will be dereferenced into the device and 
  * column within the device, allowing the LEDs to be treated as a 
  * continuous pixel field.
  *
  * \param x1    first x coordinate for the point [0..getXMax()].
  * \param y1    first y coordinate for the point [0..getYMax()].
  * \param x2    second x coordinate for the point [0..getXMax()].
  * \param y2    second y coordinate for the point [0..getYMax()].
  * \param x3    third x coordinate for the point [0..getXMax()].
  * \param y3    third y coordinate for the point [0..getYMax()].
  * \param state true - switch on; false - switch off. If omitted, default to true.
  * \return false if any point is drawn outside the display, true otherwise.
  */
  bool drawFillTriangle(uint16_t x1, uint16_t y1, uint16_t x2, uint16_t y2, uint16_t x3, uint16_t y3, bool state = true);
    
  /**
  * Draw a quadrilateral given 4 vertices
  *
  * Draw a quadrilateral given the all the corner points. The LED will be turned on or
  * off depending on the value supplied. The coordinates will be dereferenced
  * into the device and column within the device, allowing the LEDs to be treated
  * as a continuous pixel field.
  *
  * \param x1    first x coordinate for the point [0..getXMax()].
  * \param y1    first y coordinate for the point [0..getYMax()].
  * \param x2    second x coordinate for the point [0..getXMax()].
  * \param y2    second y coordinate for the point [0..getYMax()].
  * \param x3    third x coordinate for the point [0..getXMax()].
  * \param y3    third y coordinate for the point [0..getYMax()].
  * \param x4    fourth x coordinate for the point [0..getXMax()].
  * \param y4    fourth y coordinate for the point [0..getYMax()].
  * \param state true - switch on; false - switch off. If omitted, default to true.
  * \return false if any point is drawn outside the display, true otherwise.
  */
  bool drawQuadrilateral(uint16_t x1, uint16_t y1, uint16_t x2, uint16_t y2, uint16_t x3, uint16_t y3, uint16_t x4, uint16_t y4, bool state = true);

  /**
   * Draw a circle given center and radius
   *
   * Draw a circle given center and radius. The LEDs will be turned 
   * on or off depending on the value supplied. The coordinates will 
   * be dereferenced into the device and column within the device, 
   * allowing the LEDs to be treated as a continuous pixel field.
   *
   * \param xc    x coordinate for the center point [0..getXMax()].
   * \param yc    y coordinate for the center point [0..getYMax()].
   * \param r     radius of the circle.
   * \param state true - switch on; false - switch off. If omitted, default to true.
   * \return false if any point is drawn outside the display, true otherwise.
   */
  bool drawCircle(uint16_t xc, uint16_t yc, uint16_t r, bool state = true);

  /**
  * Draw a filled circle given center and radius
  *
  * Draw a circle given center and radius. The LEDs for the border
  * and fill will be turned on or off depending on the value supplied.
  * The coordinates will be dereferenced into the device and column
  * within the device, allowing the LEDs to be treated as a continuous
  * pixel field.
  *
  * \param xc    x coordinate for the center point [0..getXMax()].
  * \param yc    y coordinate for the center point [0..getYMax()].
  * \param r     radius of the circle.
  * \param state true - switch on; false - switch off. If omitted, default to true.
  * \return false if any point is drawn outside the display, true otherwise.
  */
  bool drawFillCircle(uint16_t xc, uint16_t yc, uint16_t r, bool state = true);

  /**
   * Get the status of a single LED, addressed as a pixel.
   *
   * The method will get the status of a specific LED element based on its
   * coordinate position. The column number is dereferenced into the device
   * and column within the device, allowing the LEDs to be treated as a
   * planar pixel field.
   *
   * \param x   x coordinate [0..getXMax()].
   * \param y   y coordinate [0..getYMax()].
   * \return true if LED is on, false if off or parameter errors.
   */
  bool getPoint(uint16_t x, uint16_t y);

  /**
   * Set the status of a single LED, addressed as a pixel.
   *
   * The method will set the value of a specific LED element based on its
   * coordinate position. The LED will be turned on or off depending on the
   * value supplied. The column number is dereferenced into the device and
   * column within the device, allowing the LEDs to be treated as a
   * planar pixel field.
   *
   * \param x     x coordinate [0..getXMax()].
   * \param y     y coordinate [0..getYMax()].
   * \param state true - switch on; false - switch off. If omitted, default to true.
   * \return false if parameter errors, true otherwise.
   */
  bool setPoint(uint16_t x, uint16_t y, bool state = true);

  /** @} */

  //--------------------------------------------------------------
  /** \name Methods for Fonts and text.
  * @{
  */
  /**
  * Set the display font.
  *
  * Set the display font to a user defined font table. This can be created using the
  * MD_MAX72xx font builder (refer to documentation for the tool and the MD_MAX72xx library).
  * Passing nullptr resets to the library default font.
  *
  * \param fontDef  Pointer to the font definition to be used.
  * \return No return value.
  */
  void setFont(MD_MAX72XX::fontType_t *fontDef) { _D->setFont(fontDef); }
  
  /**
  * Set the spacing between characters.
  *
  * Set number of pixel columns between each character in a displayed text.
  *
  * \param spacing  the spacing between characters.
  * \return No return value.
  */
  void setCharSpacing(uint8_t spacing) { _charSpacing = spacing; }

  /**
  * Get the spacing between characters.
  *
  * Get number of pixel columns between each character in a displayed text.
  *
  * \return the spacing between characters.
  */
  uint8_t getCharSpacing(void) { return(_charSpacing); }

  /**
  * Get the length of a text string in pixels.
  *
  * Get the length of a string in pixels. The text is a nul terminated characters array.
  * The returned length will include all inter-character Set number of pixel columns between each character in a displayed text.
  *
  * \param psz  the text string as a nul terminated character array.
  * \return the length in pixels.
  */
  uint16_t getTextWidth(const char *psz);

  /**
  * Get the height of the current font in pixels.
  *
  * Get the specified of height of the current font in pixels. All the characters of the
  * font will fit with this height.
  *
  * \return the height in pixels.
  */
  uint16_t getFontHeight(void) { return(_D->getFontHeight()); }

  /**
  * Draw text on the display.
  *
  * Get the specified of height of the current font in pixels. All the characters of the
  * font will fit with this height.
  *
  * \param x   the x coordinate for the top left corner of the first character.
  * \param y   the Y coordinate for the top left corner of the first character.
  * \param psz the text to be displayed as a nul terminated character array.
  * \param rot the required rotation orientation for the text as described in textRotation_t. Default is ROT_0.
  * \param state true - switch on; false - switch off. If omitted, default to true.
  * \return the length of the text in pixels.
  */
  uint16_t drawText(uint16_t x, uint16_t y, const char *psz, rotation_t rot = ROT_0, bool state = true);

  /** @} */

private:
  // Device buffer data
  uint8_t _xDevices;    // number of devices in the width of the panel
  uint8_t _yDevices;    // number of devices in the height of the panel

  MD_MAX72XX *_D;       // hardware driver
  bool _killOnDestruct; // true if we have allocated the MD_MAX72XX object

  bool _updateEnabled;  // true if display updates are suspended
  uint8_t _charSpacing; // number of pixel columns between characters
  bool _rotatedDisplay; // true if the display is rotated

  bool drawCirclePoints(uint16_t xc, uint16_t yc, uint16_t x, uint16_t y, bool state);
  bool drawCircleLines(uint16_t xc, uint16_t yc, uint16_t x, uint16_t y, bool state);
  uint16_t Y2Row(uint16_t x, uint16_t y);   // Convert y coord to linear coord
  uint16_t X2Col(uint16_t x, uint16_t y);   // Convert x coord to linear coord
};

#endif