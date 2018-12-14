from machine import Pin
import time
class Sonar:
 def __init__(self,trig,echo):
  self.trig=Pin(trig,Pin.OUT)
  self.echo=Pin(echo,Pin.IN)
 def checkdist(self):
  self.trig.value(0)
  self.echo.value(0)
  self.trig.value(1)
  time.sleep_us(10)
  self.trig.value(0)
  while(self.echo.value()==0):
   pass
  t1=time.ticks_us()
  while(self.echo.value()==1):
   pass
  t2=time.ticks_us()
  return round(time.ticks_diff(t2,t1)/10000*340/2,2)
