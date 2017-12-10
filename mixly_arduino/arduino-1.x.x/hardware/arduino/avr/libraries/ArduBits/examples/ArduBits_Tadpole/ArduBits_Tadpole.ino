#include "ArduBits.h"

Tadpole Tadpole;

void setup()
{
  Tadpole.Car_Init();
}

void loop()
{
  Tadpole.Car_Forward(255);
}
