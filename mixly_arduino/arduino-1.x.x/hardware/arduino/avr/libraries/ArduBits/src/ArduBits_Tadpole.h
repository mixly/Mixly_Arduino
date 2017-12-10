#ifndef _ArduBits_Tadpole_h_
#define _ArduBits_Tadpole_h_
#include "Arduino.h"




class Tadpole
{
public:

  void Car_Init(void);

  void Car_Forward(uint8_t Speed);
  void Car_Back(uint8_t Speed);
  void Car_Left(uint8_t Speed);
  void Car_Single_Left(uint8_t Speed);
  void Car_Right(uint8_t Speed);
  void Car_Single_Right(uint8_t Speed);
  void Car_Stop(uint8_t Speed);
  
  void Car_Voice_One(void);
  void Car_Voice_Two(void);
  void Car_Voice_Three(void);

private:

	
};
#endif
