#include "ArduBits.h"

DHT  dht(A0);

void setup() {
Serial.begin(9600);
Serial.println("DHTxx test!");
}

void loop() {
    int h = dht.readHumidity(); //get Humidity 
    int t = dht.readTemperature(); //get Temperature

        Serial.print("Humidity: ");
        Serial.print(h);
        Serial.print(" %\t");
        Serial.print("Temperature: ");
        Serial.print(t);
        Serial.println(" *C");
        
}

