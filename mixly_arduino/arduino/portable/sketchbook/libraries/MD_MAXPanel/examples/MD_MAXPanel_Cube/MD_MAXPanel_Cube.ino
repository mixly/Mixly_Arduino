// Program to exercise the MD_MAXPanel library
//
// Displays a rotating 3D cube, shamelessly adapted from the 
// Microview library example "MicroViewCube.ino"
//
// Libraries used
// ==============
// MD_MAX72XX available from https://github.com/MajicDesigns/MD_MAX72XX
//

#include <MD_MAXPanel.h>
#include <SPI.h>

// Define the number of devices we have in the chain and the hardware interface
// NOTE: These pin numbers will probably not work with your hardware and may
// need to be adapted
const MD_MAX72XX::moduleType_t HARDWARE_TYPE = MD_MAX72XX::FC16_HW;
const uint8_t X_DEVICES = 4;
const uint8_t Y_DEVICES = 5;

const uint8_t CLK_PIN = 13;   // or SCK
const uint8_t DATA_PIN = 11;  // or MOSI
const uint8_t CS_PIN = 10;    // or SS

// SPI hardware interface
MD_MAXPanel mp = MD_MAXPanel(HARDWARE_TYPE, CS_PIN, X_DEVICES, Y_DEVICES);
// Arbitrary pins
// MD_MAXPanel mx = MD_MAXPanel(HARDWARE_TYPE, DATA_PIN, CLK_PIN, CS_PIN, X_DEVICES, Y_DEVICES);

// We may wait a bit between updates of the display
const uint16_t ROTATION_DELAY = 0; // in milliseconds

float d = 3;
float px[] = { -d,  d,  d, -d, -d,  d,  d, -d };
float py[] = { -d, -d,  d,  d, -d, -d,  d,  d };
float pz[] = { -d, -d, -d, -d,  d,  d,  d,  d };

float p2x[] = {0,0,0,0,0,0,0,0};
float p2y[] = {0,0,0,0,0,0,0,0};

float r[] = {0,0,0};

void setup()
{
  mp.begin();
  mp.clear();
}

void loop()
{
  drawCube();
  delay(ROTATION_DELAY);
}

void drawCube()
{
  const uint16_t SHAPE_SIZE = 40 * (min(mp.getXMax(), mp.getYMax()) / 3);
  const uint16_t SCREEN_WIDTH = mp.getXMax();
  const uint16_t SCREEN_HEIGHT = mp.getYMax();
  
  r[0]=r[0]+PI/180.0; // Add a degree
  r[1]=r[1]+PI/180.0; // Add a degree
  r[2]=r[2]+PI/180.0; // Add a degree
  if (r[0] >= 360.0*PI/180.0) r[0] = 0;
  if (r[1] >= 360.0*PI/180.0) r[1] = 0;
  if (r[2] >= 360.0*PI/180.0) r[2] = 0;

  for (uint8_t i = 0; i < 8; i++)
  {
    float px2 = px[i];
    float py2 = cos(r[0])*py[i] - sin(r[0])*pz[i];
    float pz2 = sin(r[0])*py[i] + cos(r[0])*pz[i];

    float px3 = cos(r[1])*px2 + sin(r[1])*pz2;
    float py3 = py2;
    float pz3 = -sin(r[1])*px2 + cos(r[1])*pz2;

    float ax = cos(r[2])*px3 - sin(r[2])*py3;
    float ay = sin(r[2])*px3 + cos(r[2])*py3;
    float az = pz3-150;
    
    p2x[i] = SCREEN_WIDTH/2+ax*SHAPE_SIZE/az;
    p2y[i] = SCREEN_HEIGHT/2+ay*SHAPE_SIZE/az;
  }

  mp.clear();
  mp.update(false);
  for (uint8_t i = 0; i < 3; i++) 
  {
    mp.drawLine(p2x[i],p2y[i],p2x[i+1],p2y[i+1]);
    mp.drawLine(p2x[i+4],p2y[i+4],p2x[i+5],p2y[i+5]);
    mp.drawLine(p2x[i],p2y[i],p2x[i+4],p2y[i+4]);
  }    
  mp.drawLine(p2x[3],p2y[3],p2x[0],p2y[0]);
  mp.drawLine(p2x[7],p2y[7],p2x[4],p2y[4]);
  mp.drawLine(p2x[3],p2y[3],p2x[7],p2y[7]);
  mp.update(true);
}
