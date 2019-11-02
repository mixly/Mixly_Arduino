class Compass:
    RAD_TO_DEG = 57.295779513082320876798154814105

    def __init__(self, sensor):
        self.sensor = sensor

    def get_x(self):
        return self.sensor.magnetic[0]

    def get_y(self):
        return self.sensor.magnetic[1]

    def get_z(self):
        return self.sensor.magnetic[2]

    def get_field_strength(self):
        return self.sensor.magnetic

    def heading(self):
        from math import atan2
        xyz = self.sensor.magnetic
        return int(((atan2(xyz[1], xyz[0]) * Compass.RAD_TO_DEG) + 180) % 360)

    def calibrate(self):
        if self.is_calibrate() is False:
            print('The calibration need to shaking in the air (e.g. 8 or 0) and waiting for a moment')
            self.sensor.ak8963.calibrate()
            with open("compass_cfg.py", "w") as f:
                f.write('\n_offset = ' + str(self.sensor.ak8963._offset) + '\n_scale = ' + str(self.sensor.ak8963._offset))
        else:
            print('The calibration configuration already exists. If you need to recalibrate, enter os.remove("compass_cfg.py") in repl and restart')
            try:
                import compass_cfg
                self.sensor.ak8963._offset = compass_cfg._offset
                self.sensor.ak8963._scale = compass_cfg._scale
            except Exception as e:
                print('compass_cfg error! delete it, please.')

    def is_calibrate(self):
        try:
            import compass_cfg
            return True
        except Exception as e:
            return False
        
def unit_test():
    print("\n\
        from microbit import *\n\
        from machine import Pin, I2C\n\
        from mpu9250 import MPU9250\n\
        from time import sleep\n\
        i2c = I2C(scl=Pin(22), sda=Pin(21), freq=200000)\n\
        sensor = MPU9250(i2c)\n\
        print('MPU9250 whoami: ' + hex(sensor.whoami))\n\
        compass = Compass(sensor)\n\
        while True:\n\
            sleep(0.1)\n\
            needle = ((15 - compass.heading()) // 30) % 12\n\
            display.show(Image.ALL_CLOCKS[needle])\n\
    ")
    from display import Display, Image
    display = Display()
    from machine import Pin, I2C
    from mpu9250 import MPU9250
    from time import sleep
    i2c = I2C(scl=Pin(22), sda=Pin(21), freq=200000)
    sensor = MPU9250(i2c)
    print('MPU9250 whoami: ' + hex(sensor.whoami))

    compass = Compass(sensor)
    compass.calibrate()
    while True:
        sleep(0.1)
        needle = ((15 - compass.heading()) // 30) % 12
        display.show(Image.ALL_CLOCKS[needle])


if __name__ == '__main__':
    unit_test()