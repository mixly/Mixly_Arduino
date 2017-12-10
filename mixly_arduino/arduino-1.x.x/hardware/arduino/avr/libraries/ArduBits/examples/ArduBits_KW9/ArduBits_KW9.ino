#include "ArduBits.h"

TX433MHZ  TX433MHZ_12(12,13);

void setup()
{

}

void loop()
{
  TX433MHZ_12.txa();    //A型号 超外差发射
  delay(2000);
  TX433MHZ_12.txb();    //B型号 超外差发射
  delay(2000);
}
