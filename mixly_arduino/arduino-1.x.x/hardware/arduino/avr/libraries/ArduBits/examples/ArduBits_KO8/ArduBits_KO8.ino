
#include "ArduBits.h"

TM1650 tm_4display(2,3);
volatile int item;

void setup()
{
item = 0;
  tm_4display.init();
}

void loop()
{
 // tm_4display.displayString("abcd");
  item = item + 1;
  tm_4display.displayString(item);

}
