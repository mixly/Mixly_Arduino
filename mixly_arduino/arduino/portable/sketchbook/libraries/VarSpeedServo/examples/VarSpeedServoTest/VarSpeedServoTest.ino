#include <VarSpeedServo.h> 

// create servo object to control a servo 
VarSpeedServo myservo1;
VarSpeedServo myservo2;
 
void setup() {

  // initialize serial:
 //Serial.begin(9600);
  
  myservo1.attach(9);
  myservo2.attach(8);
} 
 
void loop() {
  
  int LEF = 0;
  int RIG = 180;
  
  int SPEED1 = 160;
  int SPEED2 = 100;
  
  for(int i = 0; i < 4; i++) {

    myservo1.write(LEF, SPEED1);     
    myservo2.write(LEF, SPEED2);    
    myservo1.wait();
    myservo2.wait();
      
    myservo1.write(RIG, SPEED1);     
    myservo1.wait();
    
    myservo1.write(LEF, SPEED1); 
    myservo2.write(RIG, SPEED2);  
    myservo1.wait();
    myservo2.wait();    
          
    myservo1.write(RIG, SPEED1);     
    myservo1.wait();
    
  }
  
  ///*
  delay(3000);  
  myservo1.detach();
  myservo2.detach();
//  */
}

