#include <Wire.h>
#include <MAX44009.h>

MAX44009 light;
 
void setup() 
{
	Serial.begin(9600);
	Wire.begin();
	
	delay(500);
	
	if(light.begin())
  	{
    		Serial.println("Could not find a valid MAX44009 sensor, check wiring!");
		while(1);
	}
}
 
void loop() 
{
	Serial.print("Light (lux):    ");
	Serial.println(light.get_lux());
	delay(1000);
}
