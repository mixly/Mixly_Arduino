/** 

 */

 
 #include "GD5800_Serial.h"



 void  GD5800_Serial::play()
 {
  this->sendCommand(0x01);
}

void  GD5800_Serial::restart()
{
  byte oldVolume = this->getVolume();  
  this->setVolume(0);
  this->next();
  this->pause();
  this->setVolume(oldVolume);
  this->prev();
}

void  GD5800_Serial::pause()
{
  this->sendCommand(0x02);
}

void  GD5800_Serial::next()
{
  this->sendCommand(0x03);
}

void  GD5800_Serial::prev()
{
  this->sendCommand(0x04);
}
void  GD5800_Serial::fastReverse()
{
  this->sendCommand(0x0B);
}

void  GD5800_Serial::fastForward()
{
  this->sendCommand(0x0A);
}

void  GD5800_Serial::playFileByIndexNumber(unsigned int fileNumber)
{  
  this->sendCommand(0x41, (fileNumber>>8) & 0xFF, fileNumber & (byte)0xFF);
}


void  GD5800_Serial::volumeUp()
{
  this->sendCommand(0x05);
}

void  GD5800_Serial::volumeDn()
{
  this->sendCommand(0x06);
}

void  GD5800_Serial::setVolume(byte volumeFrom0To30)
{
  this->sendCommand(0x31, volumeFrom0To30);
}

void  GD5800_Serial::setEqualizer(byte equalizerMode)
{
  this->sendCommand(0x32, equalizerMode);
}

void  GD5800_Serial::setLoopMode(byte loopMode)
{
  this->sendCommand(0x33, loopMode);
}




byte  GD5800_Serial::getStatus()    
{
  byte statTotal = 0;
  byte stat       = 0;
  do
  {
    statTotal = 0;
    for(byte x = 0; x < MP3_STATUS_CHECKS_IN_AGREEMENT; x++)
    {
      stat = this->sendCommandWithUnsignedIntResponse(0x42);      
          if(stat == 0) return 0; // STOP is fairly reliable
          statTotal += stat;
        }

        } while (statTotal != 1 * MP3_STATUS_CHECKS_IN_AGREEMENT && statTotal != 2 * MP3_STATUS_CHECKS_IN_AGREEMENT);

        return statTotal / MP3_STATUS_CHECKS_IN_AGREEMENT;      
      }

      byte  GD5800_Serial::getVolume()    { return this->sendCommandWithUnsignedIntResponse(0x11); }
      byte  GD5800_Serial::getEqualizer() { return this->sendCommandWithUnsignedIntResponse(0x44); }
      byte  GD5800_Serial::getLoopMode()  { return this->sendCommandWithUnsignedIntResponse(0x13); }
    
      unsigned int  GD5800_Serial::countFiles()   
      {
       
          return this->sendCommandWithUnsignedIntResponse(0x16); 
      }

      unsigned int  GD5800_Serial::currentFileIndexNumber()
      {
        
          return this->sendCommandWithUnsignedIntResponse(0x1A);         
    }
    
 
    
    // Used for the status commands, they mostly return an 8 to 16 bit integer 
    // and take no arguments
    unsigned int GD5800_Serial::sendCommandWithUnsignedIntResponse(byte command)
    {      
      char buffer[5];
      this->sendCommand(command, 0, 0, buffer, sizeof(buffer));
      return (unsigned int) strtoul(buffer, NULL, 16);
    }
    
    void  GD5800_Serial::sendCommand(byte command)
    {
      this->sendCommand(command, 0, 0, 0, 0);
    }
    
    void  GD5800_Serial::sendCommand(byte command, byte arg1)
    {
     this->sendCommand(command, arg1, 0, 0, 0);
   }

   void  GD5800_Serial::sendCommand(byte command, byte arg1, byte arg2)
   {
     this->sendCommand(command, arg1, arg2, 0, 0);
   }    

   void  GD5800_Serial::sendCommand(byte command, byte arg1, byte arg2, char *responseBuffer, unsigned int bufferLength)
   {


      // Command structure
      // [7E][number bytes following including command and terminator][command byte][?arg1][?arg2][EF]
      
      // Most commands do not have arguments
      byte args = 0;
      
      // These ones do
      switch(command)
      {        
        case 0x41: args = 2; break;//指定曲目
        case 0x31: args = 1; break;//指定音量
        case 0x32: args = 1; break;//指定EQ        
        case 0x09: args = 1; break;//指定设备
        case 0x33: args = 1; break;//循环播放
        default :args=1;break;
      }
      
      #if MP3_DEBUG
      char buf[4];       
      Serial.println();
      Serial.print("7E ");      
      itoa(2+args, buf, 16); Serial.print(buf); Serial.print(" "); memset(buf, 0, sizeof(buf));
      itoa(command, buf, 16); Serial.print(buf); Serial.print(" "); memset(buf, 0, sizeof(buf));
      if(args>=1) itoa(arg1, buf, 16); Serial.print(buf); Serial.print(" "); memset(buf, 0, sizeof(buf));
      if(args>=2) itoa(arg2, buf, 16); Serial.print(buf); Serial.print(" "); memset(buf, 0, sizeof(buf));
      Serial.print("EF");      
      #endif
      
      // The device appears to send some sort of status information (namely "STOP" when it stops playing)
      // just discard this right before we send the command
      while(this->waitUntilAvailable(10)) this->read();
      
      this->write((byte)0x7E);
      this->write(2+args);
      this->write(command);
      if(args>=1) this->write(arg1);
      if(args==2) this->write(arg2);
      this->write((byte)0xEF);
      
      
      unsigned int i = 0;
      char         j = 0;
      if(responseBuffer && bufferLength) 
      {
        memset(responseBuffer, 0, bufferLength);
      }
      
      // Allow some time for the device to process what we did and 
      // respond, up to 1 second, but typically only a few ms.
      this->waitUntilAvailable(1000);

      
      #if MP3_DEBUG
      Serial.print(" ==> [");
      #endif
      
      while(this->waitUntilAvailable(150))
      {
        j = (char)this->read();
        
        #if MP3_DEBUG
        Serial.print(j);
        #endif
        if(responseBuffer && (i<(bufferLength-1)))
        {
         responseBuffer[i++] = j;
       }
     }

     #if MP3_DEBUG      
     Serial.print("]");
     Serial.println();
     #endif

   }


// as readBytes with terminator character
// terminates if length characters have been read, timeout, or if the terminator character  detected
// returns the number of characters placed in the buffer (0 means no valid data found)

size_t GD5800_Serial::readBytesUntilAndIncluding(char terminator, char *buffer, size_t length, byte maxOneLineOnly)
{
  if (length < 1) return 0;
  size_t index = 0;
  while (index < length) {
    int c = timedRead();
    if (c < 0) break;    
    *buffer++ = (char)c;
    index++;
    if(c == terminator) break;
    if(maxOneLineOnly && ( c == '\n') ) break;
  }
  return index; // return number of characters, not including null terminator
}


// Waits until data becomes available, or a timeout occurs
int GD5800_Serial::waitUntilAvailable(unsigned long maxWaitTime)
{
  unsigned long startTime;
  int c = 0;
  startTime = millis();
  do {
    c = this->available();
    if (c) break;
    } while(millis() - startTime < maxWaitTime);

    return c;
  }
