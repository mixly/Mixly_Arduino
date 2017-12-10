
#include "ArduBits.h"

RGB RGB_2(2); 

void setup() 
{
  RGB_2.begin(); 
}

void loop() 
{
    RGB_2.setPixelColor(0,RGB_2.Color(0,150,0)); // Moderately bright green color.
    RGB_2.show(); 
}
