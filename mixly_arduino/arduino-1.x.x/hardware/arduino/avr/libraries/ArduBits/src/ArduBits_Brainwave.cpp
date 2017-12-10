#include "ArduBits_Brainwave.h"
#include <arduino.h>
#include <stdio.h>

Brainwave::Brainwave(uint8_t tx_pin,uint8_t rx_pin):SetSerial(tx_pin,rx_pin)
{

}
void Brainwave::begin(unsigned long baud)
{
    SetSerial::begin(baud);  
}

byte Brainwave:: ReadOneByte()
{
  int ByteRead;
  while(!SetSerial::available());
  ByteRead = SetSerial::read();
  return ByteRead;
}

void Brainwave::get_wave(byte abread )
{
 if(ReadOneByte() == 170)
  {
      if(ReadOneByte() == 170)
      {
           payloadLength = ReadOneByte();
           if(payloadLength > 169)                      //Payload length can not be greater than 169
           return;

           generatedChecksum = 0;        
           for(int i = 0; i < payloadLength; i++)
           {  
               payloadData[i] = ReadOneByte();            //Read payload into memory
               generatedChecksum += payloadData[i];
           }   

           checksum = ReadOneByte();                      //Read checksum byte from stream      
           generatedChecksum = 255 - generatedChecksum;   //Take one's compliment of generated checksum

           if(checksum == generatedChecksum) 
          {    
               poorQuality = 200;
               attention = 0;
               meditation = 0;

               for(int i = 0; i < payloadLength; i++) 
              {    
                   switch (payloadData[i]) 
                   {
                         case 2:
                          i++;            
                          poorQuality = payloadData[i];
                          bigPacket = true;            
                          break;
                          case 4:
                          i++;
                          attention = payloadData[i];                        
                          break;
                          case 5:
                          i++;
                          meditation = payloadData[i];
                          break;
                          case 0x80:
                          i = i + 3;
                          break;
                          case 0x83:
                          i = i + 25;      
                          break;
                          default:
                          break;
                   } // switch         
              } 
          }
      }
  }
}

uint8_t  Brainwave::get_meditation(void)
{
 bigPacket = false;
 while(!bigPacket)
  {
    get_wave(ReadOneByte());
  } 
  return meditation;

  
}

uint8_t  Brainwave::get_attention(void)
{
  bigPacket = false;
  while(!bigPacket)
  {
    get_wave(ReadOneByte());
  } 
  return attention;
}

uint8_t  Brainwave::get_poorQuality(void)
{
  bigPacket = false;
  while(!bigPacket)
  {
    get_wave(ReadOneByte());
  } 
  return poorQuality;
}


