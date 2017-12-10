#ifndef _ArduBits_Slave_h_
#define ArduBits_Slave_h_
#include "Arduino.h"
#include "ArduBits_SetSerial.h"
//#include <inttypes.h>
//#include <stddef.h>


class BTSlave : public SetSerial
{
public:

  BTSlave(uint8_t tx_pin,uint8_t rx_pin);
  
  void begin(unsigned long baud);
  void Serial_begin(unsigned long baud);
  
  void Slave_set(String BTSet);
  void Serial_Slave_set(String BTSet);

  void Slave_TX_Data(String TX_Schar="stem", int16_t RX_Snum=0);
  void Serial_Slave_TX_Data(String TX_Schar="stem", int16_t RX_Snum=0);
  
  String   Slave_RX_Schar(void);
  String   Serial_Slave_RX_Schar(void);
  
  int16_t  Slave_RX_Snum(void);
  int16_t  Serial_Slave_RX_Snum(void);

  bool      NA_Data(void);
  bool      NB_Data(void);
  bool      NC_Data(void);
  bool      ND_Data(void);
  bool      NE_Data(void);
  bool      NF_Data(void);
  
  bool      Serial_NA_Data(void);
  bool      Serial_NB_Data(void);
  bool      Serial_NC_Data(void);
  bool      Serial_ND_Data(void);
  bool      Serial_NE_Data(void);
  bool      Serial_NF_Data(void);
   
private:

  void Slave_RX_Data(void);
  void Serial_Slave_RX_Data(void);

  String   _Slave_RX_Schar,_TX_Schar="stem";
  int16_t  _Slave_RX_Snum,_RX_Snum=0;
  unsigned long BT_baud;
  bool     NA=0,NB=0,NC=0,ND=0,NE=0,NF=0; 
  
   	
};
#endif
