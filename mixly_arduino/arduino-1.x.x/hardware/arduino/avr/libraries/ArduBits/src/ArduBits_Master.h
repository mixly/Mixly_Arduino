#ifndef _ArduBits_Master_h_
#define ArduBits_Master_h_
#include "Arduino.h"
#include "ArduBits_SetSerial.h"
//#include <inttypes.h>
//#include <stddef.h>


class BTMaster : public SetSerial
{
public:

  BTMaster(uint8_t tx_pin,uint8_t rx_pin);
  
  void begin(unsigned long baud);
  void Serial_begin(unsigned long baud);
  
  void Master_set(String BTSet);
  void Serial_Master_set(String BTSet);
  
  void Master_TX_Data(String TX_Schar="stem", int16_t RX_Snum=0);
  void Serial_Master_TX_Data(String TX_Schar="stem", int16_t RX_Snum=0);
  
  String   Master_RX_Schar(void);
  String   Serial_Master_RX_Schar(void);
  
  int16_t  Master_RX_Snum(void);
  int16_t  Serial_Master_RX_Snum(void);
  
private:

  void Master_RX_Data(void);
  void Serial_Master_RX_Data(void);

  String   _Master_RX_Schar,_TX_Schar="stem";
  int16_t  _Master_RX_Snum,_RX_Snum=0;
  unsigned long BT_baud;
     
};
#endif
