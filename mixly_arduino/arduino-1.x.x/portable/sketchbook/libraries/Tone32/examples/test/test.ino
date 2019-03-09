#include<Tone32.h>
#define Buzzer_PIN 16
#define Buzzer_Chanel 0
void setup() {
}

void loop() {
  tone(Buzzer_PIN, NOTE_C4, 500, Buzzer_Chanel);
  noTone(Buzzer_PIN, Buzzer_Chanel);
  tone(Buzzer_PIN, NOTE_D4, 500, Buzzer_Chanel);
  noTone(Buzzer_PIN, Buzzer_Chanel);
  tone(Buzzer_PIN, NOTE_E4, 500, Buzzer_Chanel);
  noTone(Buzzer_PIN, Buzzer_Chanel);
  tone(Buzzer_PIN, NOTE_F4, 500, Buzzer_Chanel);
  noTone(Buzzer_PIN, Buzzer_Chanel);
  tone(Buzzer_PIN, NOTE_G4, 500, Buzzer_Chanel);
  noTone(Buzzer_PIN, Buzzer_Chanel);
  tone(Buzzer_PIN, NOTE_A4, 500, Buzzer_Chanel);
  noTone(Buzzer_PIN, Buzzer_Chanel);
  tone(Buzzer_PIN, NOTE_B4, 500, Buzzer_Chanel);
  noTone(Buzzer_PIN, Buzzer_Chanel);
}