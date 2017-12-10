#include "ArduBits_Brainwave.h"

Brainwave  wave_2(2,3);

void setup()
{
 wave_2.begin(57600);
 Serial.begin(9600); 
}

void loop()
{

    Serial.print(wave_2.get_poorQuality());
    Serial.print("\n");

}
