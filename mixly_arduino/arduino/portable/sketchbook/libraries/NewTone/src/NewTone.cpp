#include "NewTone.h"

void NewTone(int tonePin, int frequency, int duration)
{
    float period = 1000000.0 /frequency;
    float pulse = period / 2.0;
    for (int i=1; i<=((duration * 1000.0)/period);i=i+1)
    {
        pinMode(tonePin, OUTPUT);
        digitalWrite(tonePin,HIGH);
        delayMicroseconds(pulse);
        pinMode(tonePin, OUTPUT);
        digitalWrite(tonePin,LOW);
        delayMicroseconds(pulse);
    }
}
void NewNoTone(uint8_t tonePin)
{
    digitalWrite(tonePin,LOW);
}
