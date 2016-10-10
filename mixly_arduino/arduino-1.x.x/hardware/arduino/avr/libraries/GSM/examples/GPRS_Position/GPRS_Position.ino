/*
 GPRS_Position

 A simple Sketch that shows the Longitude  and Latitude
 using a GSM shield.

 Circuit: 
 GSM shield attached

 Notes: 
 You have to change the apn, login and password.
 If your SIM has PIN you have to set 
 
 created 3 Apr. 2015
 by Arduino.org team (http://arduino.org)
 */

// Library include
#include <GSM.h>
// SIM and Network constant
#define PINNUMBER  ""         // if present, insert Your PIN here
#define apn "internet.wind"   // change the apn
//#define apn "ibox.tim.it"
//#define apn "unico.tim.it"
//#define apn "wap.tim"
#define login ""              // insert your login
#define password ""           // isnert your password

// initialize the library instance
GSM gsmAccess;            // GSM access: include a 'true' parameter for debug enabled
GPRS gprsAccess;          // GPRS access
GSMClient client;         // Client service for TCP connection
GSM2 gprsPosition;        // GPRS Posistioning system



void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  
  // start GSM shield
 
  Serial.println(" ");
  Serial.print("Connecting GSM network...");
  if (gsmAccess.begin(PINNUMBER) != GSM_READY)
  {
    Serial.println("Error !");
    while (true);
  }
  Serial.println("Ok !");
  Serial.println("Setting APN...");
  gprsAccess.attachGPRS(apn, login, password);
  Serial.print("APN :");
  Serial.println(apn);
  Serial.print("Login :");
  Serial.println(login);
  Serial.print("Password :");
  Serial.println(password);
}

void loop() {
  // put your main code here, to run repeatedly:
  
  Serial.print("Position: ");
  Serial.println(gprsPosition.getPosition());

}
