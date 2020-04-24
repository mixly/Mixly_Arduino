// Coordinates for the top left corner of the board cells on the display and size (square)
typedef struct
{
  uint16_t	x, y;
  uint8_t size;
} boardCoord_t;

// Switch status
typedef struct
{
  uint8_t   pin;
  bool      lastState;
  uint32_t  lastCheckTime;
} swState_t;

