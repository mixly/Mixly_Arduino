// DS1302_RAM_Demo (C)2010 Henning Karlsen
// web: http://www.henningkarlsen.com/electronics
//
// A quick demo of how to use my DS1302-library to 
// read and write to the internal RAM of the DS1302.
// Both burst (all 31 bytes at once) and single byte
// reads and write is demonstrated.
// All output is sent to the serial-port at 9600 baud.
//
// I assume you know how to connect the DS1302.
// DS1302:  CE pin    -> Arduino Digital 2
//          I/O pin   -> Arduino Digital 3
//          SCLK pin  -> Arduino Digital 4

#include <DS1302.h>

DS1302_RAM ramBuffer;
DS1302 rtc(2, 3, 4); 

void setup()
{
  Serial.begin(9600);
}

void bufferDump(char st[])
{
  Serial.write(st);
  Serial.println("");
  for (int i=0; i<31; i++)
  {
    Serial.print("0x");
    Serial.print(ramBuffer.cell[i], HEX);
    Serial.print(" ");
  }
  Serial.println("");
  Serial.println("--------------------------------------------------------");
}

void comment(char st[])
{
  Serial.println("");
  Serial.print("---> ");
  Serial.write(st);
  Serial.println("");
  Serial.println("");
}

void loop()
{
  Serial.println("");
  bufferDump("Initial buffer");

  comment("Filling buffer with data...");
  for (int i=0; i<31; i++)
    ramBuffer.cell[i]=i;

  comment("Writing buffer to RAM...");
  rtc.writeBuffer(ramBuffer);
  bufferDump("Buffer written to RAM...");
  
  comment("Clearing buffer...");
  for (int i=0; i<31; i++)
    ramBuffer.cell[i]=0;
  bufferDump("Cleared buffer...");
  
  comment("Setting byte 15 (0x0F) to value 160 (0xA0)...");
  rtc.poke(15,160);
  
  comment("Reading buffer from RAM...");
  ramBuffer=rtc.readBuffer();
  bufferDump("Buffer read from RAM...");

  int temp;
  comment("Reading address 18 (0x12). This should return 18, 0x12.");
  temp = rtc.peek(18);
  Serial.print("Return value: ");
  Serial.print(temp, DEC);
  Serial.print(", 0x");
  Serial.println(temp, HEX);


  Serial.println("");
  Serial.println("");
  Serial.println("***** End of demo *****");
 
  while (1){};
}
