#pragma once

#include <MD_MAXPanel.h>

// A class to encapsulate the score display
class cScore
{
private:
  MD_MAXPanel *_mp;   // the MAXPanel object for drawing the score
  uint16_t _score;    // the score
  uint16_t _x, _y;    // coordinate of top left for display
  uint8_t _width;     // number of digits wide
  uint16_t _limit;    // maximum value allowed

public:
  void begin(MD_MAXPanel *mp, uint16_t x, uint16_t y, uint16_t maxScore) { _mp = mp;  _x = x, _y = y; limit(maxScore); reset(); }
  void reset(void)       { erase(); _score = 0; draw(); }
  void set(uint16_t s)   { if (s <= _limit) { erase(); _score = s; draw(); } }
  void increment(uint16_t inc = 1) { if (_score + inc <= _limit) { erase(); _score += inc; draw(); } }
  void decrement(uint16_t dec = 1) { if (_score >= dec) { erase(); _score -= dec; draw(); } }
  uint16_t score(void)   { return(_score); }
  void erase(void)       { draw(false); }
  uint16_t width(void)   { return(_width); }

  void limit(uint16_t m)
  {
    erase();    // width may change, so delete with the curret parameters

    _limit = m;
    // work out how many digits this is
    _width = 0;
    do
    {
      _width++;
      m /= 10;
    } while (m != 0);
  }

  void draw(bool state = true)
  {
    char sz[_width + 1];
    uint16_t s = _score;

    // PRINT("\n-- SCORE: ", _score);
    sz[_width] = '\0';
    for (int i = _width - 1; i >= 0; --i)
    {
      sz[i] = (s % 10) + '0';
      s /= 10;
    }

    _mp->drawText(_x, _y, sz, MD_MAXPanel::ROT_0, state);
  }
};
