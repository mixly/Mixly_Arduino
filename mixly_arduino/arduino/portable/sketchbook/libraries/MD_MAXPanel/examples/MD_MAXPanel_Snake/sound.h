#pragma once

// A class to encapsulate primitive sound effects
class cSound
{
private:
  const uint16_t EOD = 0; // End Of Data marker 
  uint8_t _pinBeep;       // the pin to use for beeping

  // Sound data - frequency followed by duration in pairs. 
  // Data ends in End Of Data marker EOD.
  const uint16_t soundSplash[1] PROGMEM = { EOD };
  const uint16_t soundHit[3]    PROGMEM = { 1000, 50, EOD };
  const uint16_t soundBounce[3] PROGMEM = { 500, 50, EOD };
  const uint16_t soundPoint[3]  PROGMEM = { 150, 150, EOD };
  const uint16_t soundStart[7]  PROGMEM = { 250, 100, 500, 100, 1000, 100, EOD };
  const uint16_t soundOver[7]   PROGMEM = { 1000, 100, 500, 100, 250, 100, EOD };

  void playSound(const uint16_t *table)
    // Play sound table data. Data table must end in EOD marker.
  {
    uint8_t idx = 0;

    //PRINTS("\nTone Data ");
    while (table[idx] != EOD)
    {
      uint16_t t = table[idx++];
      uint16_t d = table[idx++];

      //PRINTXY("-", t, d);
      tone(_pinBeep, t);
      delay(d);
    }
    //PRINTS("-EOD");
    noTone(_pinBeep); // be quiet now!
  }

public:
  void begin(uint8_t pinBeep) { _pinBeep = pinBeep; }  
  void splash(void) { playSound(soundSplash); }
  void start(void)  { playSound(soundStart); }
  void hit(void)    { playSound(soundHit); }
  void bounce(void) { playSound(soundBounce); }
  void point(void)  { playSound(soundPoint); }
  void over(void)   { playSound(soundOver); }
};

