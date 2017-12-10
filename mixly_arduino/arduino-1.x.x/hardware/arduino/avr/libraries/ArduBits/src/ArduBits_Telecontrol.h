#ifndef _ArduBits_Telecontrol_h_
#define _ArduBits_Telecontrol_h_
#include "Arduino.h"




class Telecontrol
{
public:

  void Init(void);

  
  bool W_Xal(void);
  bool S_Xal(void);
  bool A_Xal(void);
  bool D_Xal(void);
  bool T_Xal(void);

  uint8_t W_Num(void);
  uint8_t S_Num(void);
  uint8_t A_Num(void);
  uint8_t D_Num(void);
  uint8_t T_Num(void);
  
private:
  bool ww=0,ss=0,aa=0,dd=0,tt=0;
  uint8_t wz=0,sz=0,az=0,dz=0,tz=0;
  
	void rocker(void);
};
#endif
