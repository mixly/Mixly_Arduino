import serial
from time import sleep
import sys
import threading

class s4a_start(object):
    def __init__(self,port):
        self.ser = serial.Serial(port,38400,8,'N',1)
        self.pin_outputs = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1] # dev id : 4 ~ 13
        self.pin_inputs = [0,0,0,0,0,0,0,0,0,0,0] # analog 0 ~ 5
        self.count = 0
        self.system_run = True
        self.th = threading.Thread(target = self.main_loop , args=())
        self.th.start()

    def main_loop(self):
        while(self.system_run):
            sleep(0.001)
            data = self.ser.read(2)
            if data[0] & 0b10000000:
                dev_id, dev_val = self.pack_to_data(data)
                self.pin_inputs[dev_id] = dev_val
            else:
                data = self.ser.read()
            self.count += 1
            if( self.count >= 64):
                self.count = 0
                for i in range(4,14):
                    data = self.data_to_pack( i , self.pin_outputs[i] )
                    self.ser.write(data)

    def pack_to_data(self,data):
        dev_id = (data[0] & 0b01111000) >> 3
        dev_val = ((data[0] & 0b00000111 ) << 7) | (data[1] & 0b01111111)
        return (dev_id, dev_val)

    def data_to_pack(self,dev_id,dev_val):
        data = [0,0]
        data[0] = 0b10000000 | ((dev_id & 0b00001111) << 3) | ( ( dev_val >> 7 ) & 0b00000111 )
        data[1] = ( 0b0001111111 & dev_val ) 
        return bytes([data[0],data[1]])

    def start(self):
        self.th = threading.Thread(target = self.main_loop , args=())
        self.th.start()

    def shutdown(self):
        self.system_run = False

    def set_dev(self,dev_id,dev_val):
        if((dev_val >= 0) and (dev_val < 1024)):
            self.pin_outputs[dev_id] = int(dev_val)

    def up(self):
        self.set_dev(5,255)
        self.set_dev(6,255)
        self.set_dev(7,0)
        self.set_dev(8,0)
        
    def stop(self):
        self.set_dev(5,0)
        self.set_dev(6,0)
        self.set_dev(7,0)
        self.set_dev(8,0)
    
    def turn_left(self):
        self.set_dev(5,255)
        self.set_dev(6,255)
        self.set_dev(7,0)
        self.set_dev(8,1)
    
    def turn_right(self):
        self.set_dev(5,255)
        self.set_dev(6,255)
        self.set_dev(7,1)
        self.set_dev(8,0)
    
    def down(self):
        self.set_dev(5,255)
        self.set_dev(6,255)
        self.set_dev(7,1)
        self.set_dev(8,1)

    def digital_write(self, pin, val):
    	if pin in (10,11,12,13):
    		if val in (0,1):
    			self.set_dev(pin, val)

    def analog_write(self, pin, val):
    	if pin in (5,6,9):
    		if val in range(0,256):
    			self.set_dev(pin, val)

    def digital_read(self, pin):
    	if pin in (2,3):
    		return self.pin_inputs[pin + 4]//1023

    def analog_read(self, pin):
    	if pin in (0,1,2,3,4,5):
    		return self.pin_inputs[pin]
    
if __name__=="__main__":
    s4a = s4a_slave('com4')
    s4a.start()
    while(True):
        cmd = input().split()
        print(cmd)
        s4a.set_dev(int(cmd[0]),int(cmd[1]))
        print(s4a.pin_inputs)
