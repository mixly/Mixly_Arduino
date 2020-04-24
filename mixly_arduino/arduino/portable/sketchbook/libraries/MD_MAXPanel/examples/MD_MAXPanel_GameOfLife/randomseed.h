#pragma once
// Random seed creation --------------------------
// Adapted from http://www.utopiamechanicus.com/article/arduino-better-random-numbers/

const uint8_t RANDOM_SEED_PORT = A3;    // port read for random seed

uint16_t bitOut(uint8_t port)
{
  static bool firstTime = true;
  uint32_t prev = 0;
  uint32_t bit1 = 0, bit0 = 0;
  uint32_t x = 0, limit = 99;

  if (firstTime)
  {
    firstTime = false;
    prev = analogRead(port);
  }

  while (limit--)
  {
    x = analogRead(port);
    bit1 = (prev != x ? 1 : 0);
    prev = x;
    x = analogRead(port);
    bit0 = (prev != x ? 1 : 0);
    prev = x;
    if (bit1 != bit0)
      break;
  }

  return(bit1);
}

uint32_t seedOut(uint16_t noOfBits, uint8_t port)
{
  // return value with 'noOfBits' random bits set
  uint32_t seed = 0;

  for (int i = 0; i<noOfBits; ++i)
    seed = (seed << 1) | bitOut(port);
  
  return(seed);
}
//------------------------------------------------------------------------------
