/** 
 * Arduino Library for GD5800 MP3 Module
 * 
 * Copyright (C) 2014 James Sleeman, <http://sparks.gogo.co.nz/GD5800/index.html>
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a 
 * copy of this software and associated documentation files (the "Software"), 
 * to deal in the Software without restriction, including without limitation 
 * the rights to use, copy, modify, merge, publish, distribute, sublicense, 
 * and/or sell copies of the Software, and to permit persons to whom the 
 * Software is furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in 
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN 
 * THE SOFTWARE.
 * 
 * @author James Sleeman, http://sparks.gogo.co.nz/
 * @license MIT License
 * @file
 */

// Please note, the Arduino IDE is a bit retarded, if the below define has an
// underscore other than _h, it goes mental.  Wish it wouldn't  mess
// wif ma files!
#ifndef GD5800Serial_h
#define GD5800Serial_h

#include <SoftwareSerial.h>

#define MP3_EQ_NORMAL     0
#define MP3_EQ_POP        1
#define MP3_EQ_ROCK       2
#define MP3_EQ_JAZZ       3
#define MP3_EQ_CLASSIC    4
#define MP3_EQ_BASS       5


// Looping options, ALL, FOLDER, ONE and ONE_STOP are the 
// only ones that appear to do much interesting
//  ALL plays all the tracks in a repeating loop
//  FOLDER plays all the tracks in the same folder in a repeating loop
//  ONE plays the same track repeating
//  ONE_STOP does not loop, plays the track and stops
//  RAM seems to play one track and someties disables the ability to 
//  move to next/previous track, really weird.

#define MP3_LOOP_ALL      0
#define MP3_LOOP_FOLDER   1
#define MP3_LOOP_ONE      2
#define MP3_LOOP_RAM      3

#define MP3_STATUS_STOPPED 0
#define MP3_STATUS_PLAYING 1
#define MP3_STATUS_PAUSED  2
#define MP3_STATUS_FF  3
#define MP3_STATUS_FR  4
// The response from a status query we get is  for some reason
// a bit... iffy, most of the time it is reliable, but sometimes
// instead of a playing (1) response, we get a paused (2) response
// even though it is playing.  Stopped responses seem reliable.
// So to work around this when getStatus() is called we actually
// request the status this many times and only if one of them is STOPPED
// or they are all in agreement that it is playing or paused then
// we return that status.  If some of them differ, we do another set 
// of tests etc...
#define MP3_STATUS_CHECKS_IN_AGREEMENT 4

#define MP3_DEBUG 0

class GD5800_Serial : public SoftwareSerial
{
  
  public: 

    /** Create GD5800 object.
     * 
     * Example, create global instance:
     * 
     *     GD5800_Serial mp3(8,9);
     * 
     * For a 5v Arduino:
     * -----------------
     *  * TX on GD5800 connects to D8 on the Arduino
     *  * RX on GD5800 connects to one end of a 1k resistor,
     *      other end of resistor connects to D9 on the Arduino
     * 
     * For a 3v3 Arduino:
     * -----------------
     *  * TX on GD5800 connects to D8 on the Arduino
     *  * RX on GD5800 connects to D9 on the Arduino
     * 
     * Of course, power and ground are also required, VCC on GD5800 is 5v tolerant (but RX isn't totally, hence the resistor above).
     * 
     * And then you can use in your setup():
     * 
     *     mp3.begin(9600)
     *     mp3.reset();
     *
     * and all the other commands :-)
     */
    
    GD5800_Serial(short rxPin, short txPin) : SoftwareSerial(rxPin,txPin) { };
    
    /** Start playing the current file.
     */
    
    void play();
    
    /** Restart the current (possibly paused) track from the 
     *  beginning.
     *  
     *  Note that this is not an actual command the GD5800 knows
     *  what we do is mute, advance to the next track, pause,
     *  unmute, and go back to the previous track (which will
     *  cause it to start playing.
     * 
     *  That said, it appears to work just fine.
     * 
     */
    void restart();
    
    /** Pause the current file.  To unpause, use play(),
     *  to unpause and go back to beginning of track use restart()
     */
    void pause();
    
    /** Play the next file.
     */
    void next();
    
    /** Play the previous file.
     */
    void prev();
    
    /** fast Reverse. 
     */
     void fastReverse();
    
    /** fastForward
     */
    void fastForward();

    
    void playFileByIndexNumber(unsigned int fileNumber);        
    
   
    
    /** Increase the volume by 1 (volume ranges 0 to 30). */
    
    void volumeUp();
    
    /** Decrease the volume by 1 (volume ranges 0 to 30). */
    
    void volumeDn();
    
    /** Set the volume to a specific level (0 to 30). 
     * 
     * @param volumeFrom0To30 Level of volume to set from 0 to 30
     */
    
    void setVolume(byte volumeFrom0To30);
    
    /** Set the equalizer to one of 6 preset modes.
     * 
     * @param equalizerMode One of the following, 
     * 
     *  *  MP3_EQ_NORMAL
     *  *  MP3_EQ_POP        
     *  *  MP3_EQ_ROCK       
     *  *  MP3_EQ_JAZZ       
     *  *  MP3_EQ_CLASSIC    
     *  *  MP3_EQ_BASS       
     * 
     */
    
    void setEqualizer(byte equalizerMode); // EQ_NORMAL to EQ_BASS
    
    /** Set the looping mode.
     * 
     * @param loopMode One of the following,
     * 
     *  *  MP3_LOOP_ALL       - Loop through all files.
     *  *  MP3_LOOP_FOLDER    - Loop through all files in the same folder (SD Card only)
     *  *  MP3_LOOP_ONE       - Loop one file.
     *  *  MP3_LOOP_RAM       - Loop one file (uncertain how it is different to the previous!)
     *  *  MP3_LOOP_NONE      - No loop, just play one file and then stop. (aka MP3_LOOP_ONE_STOP)
     */
    
    void setLoopMode(byte loopMode);
 
    
    // Status querying commands
    /** Get the status from the device.
     * 
     * CAUTION!  This is somewhat unreliable for the following reasons...
     * 
     *  1. When playing from the on board memory (MP3_SRC_BUILTIN), STOPPED sems
     *     to never be returned, only PLAYING and PAUSED
     *  2. Sometimes PAUSED is returned when it is PLAYING, to try and catch this
     *     getStatus() actually queries the module several times to ensure that
     *     it is really sure about what it tells us.
     *
     * @return One of MP3_STATUS_PAUSED, MP3_STATUS_PLAYING and MP3_STATUS_STOPPED
     */
    
    byte getStatus();
    
    /** Get the current volume level.
     * 
     * @return Value between 0 and 30
     */
    
    byte getVolume();
    
    /** Get the equalizer mode.
     * 
     * @return One of the following, 
     * 
     *  *  MP3_EQ_NORMAL
     *  *  MP3_EQ_POP        
     *  *  MP3_EQ_ROCK       
     *  *  MP3_EQ_JAZZ       
     *  *  MP3_EQ_CLASSIC    
     *  *  MP3_EQ_BASS      
     */
    
    byte getEqualizer();
    
    /** Get loop mode.
     * 
     * @return One of the following,
     * 
     *  *  MP3_LOOP_ALL       - Loop through all files.
     *  *  MP3_LOOP_FOLDER    - Loop through all files in the same folder (SD Card only)
     *  *  MP3_LOOP_ONE       - Loop one file.
     *  *  MP3_LOOP_RAM       - Loop one file (uncertain how it is different to the previous!)
     *  *  MP3_LOOP_NONE      - No loop, just play one file and then stop. (aka MP3_LOOP_ONE_STOP)
     */
    
    byte getLoopMode();
    
    /** Count the number of files on the specified media.
     * 
     * @param source One of MP3_SRC_BUILTIN and MP3_SRC_SDCARD
     * @return Number of files present on that media.
     * 
     */
    
    unsigned int   countFiles();    
      
    /** For the currently playing (or paused, or file that would be played 
     *  next if stopped) file, return the file's (FAT table) index number.
     * 
     *  This number can be used with playFileByIndexNumber();
     * 
     *  @param source One of MP3_SRC_BUILTIN and MP3_SRC_SDCARD
     *  @return Number of file.
     */
    
    unsigned int   currentFileIndexNumber();
    
  protected:
    
    /** Send a command to the GD5800 module, 
     * @param command        Byte value of to send as from the datasheet.
     * @param arg1           First (if any) argument byte
     * @param arg2           Second (if any) argument byte
     * @param responseBuffer Buffer to store a single line of response, if NULL, no response is read.
     * @param buffLength     Length of response buffer including NULL terminator.
     */
    
    void sendCommand(byte command, byte arg1, byte arg2, char *responseBuffer, unsigned int bufferLength);

    // Just some different versions of that for ease of use
    void sendCommand(byte command);    
    void sendCommand(byte command, byte arg1);    
    void sendCommand(byte command, byte arg1, byte arg2);
    
    /** Send a command to the GD5800 module, and get a response.
     * 
     * For the query commands, the GD5800 generally sends an integer response
     * (over the UART as 4 hexadecimal digits).
     * 
     * @param command        Byte value of to send as from the datasheet.
     * @return Response from module.
     */
    
    unsigned int sendCommandWithUnsignedIntResponse(byte command);

    // This seems not that useful since there only seems to be a version 1 anway :/

    size_t readBytesUntilAndIncluding(char terminator, char *buffer, size_t length, byte maxOneLineOnly = 0);
    
    int    waitUntilAvailable(unsigned long maxWaitTime = 1000);
    
};

#endif