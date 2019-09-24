#include<NewTone.h>
#define Buzzer_PIN 9
void setup() {
  pinMode(Buzzer_PIN, OUTPUT);
}

void loop() {
  NewTone(Buzzer_PIN, NOTE_C4, 500);
  
}