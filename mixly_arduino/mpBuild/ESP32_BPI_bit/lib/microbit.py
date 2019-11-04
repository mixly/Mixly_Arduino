from time import time, sleep_ms
from utime import sleep_ms as sleep
from machine import Pin, ADC, DAC
from neopixel import NeoPixel

def PixelPower(bool):
    Pin(2, Pin.OUT).value(bool)

class Pixel(NeoPixel):

    def __init__(self):
        self.Min, self.Max, self.Sum = 0, 5, 25
        NeoPixel.__init__(self, Pin(4), self.Sum, 3, 1)

    def LoadXY(self, X, Y, RGB, isSoftWare = True):
        if self.Min <= X and X < self.Max and self.Min <= Y and Y < self.Max:
            if isSoftWare: # SoftWare coordinate system
                self[int(Y) + ((self.Max - 1) - int(X)) * self.Max] = RGB # left and top is (0, 0)
            else: # Hardware coordinate system
                self[(int(X)) + int(Y) * self.Max] = RGB # right and top is (0, 0)
        else:
            pass
        # print('Pixel Load Over Limit')

    def LoadPos(self, Pos, RGB):
        if self.Min <= Pos and Pos < self.Sum:
            self[Pos] = RGB
        else:
            pass
        # print('Pixel Load Over Limit')

    def Show(self):
        self.write()


class Accelerometer:

    def __init__(self, sensor):
        self.sensor = sensor
        self.old, self.new, self.eliminate = [0]*3, [0]*3, 2

    def get_x(self):
        return self.sensor.acceleration[0] * 5

    def get_y(self):
        return self.sensor.acceleration[1] * 5

    def get_z(self):
        return self.sensor.acceleration[2] * 5

    def get_values(self):
        self.old = self.new
        self.new = self.sensor.acceleration
        return self.new

    def get_state(self):
        tmp = [0]*3
        for i in range(3):
            tmp[i] = self.new[i] - self.old[i]
            tmp[i] = 0 if abs(tmp[i]) < self.eliminate else tmp[i]
        return tmp


class Direction(Accelerometer):
    idle, ing, end, = 0, 1, 2

    def __init__(self, sensor):
        Accelerometer.__init__(self, sensor)
        self.r_state, self.l_state, self.f_state, self.b_state, = Direction.idle, Direction.idle, Direction.idle, Direction.idle

    def get_direction(self, delay=30):
        sleep_ms(delay)
        super().get_values()
        tem = super().get_state()
        x_state, y_state, z_state = tem[0], tem[1], tem[2]
        result = []
        if self.r_state == Direction.idle and x_state > 0 and self.new[0] > 2.5:
            self.r_count = 0
            self.r_state = Direction.ing

        if self.r_state == Direction.ing:
            # print('Direction.ing')
            self.r_count += 1
            if self.r_count > 10:
                self.r_state = Direction.idle
            elif x_state < 0 and self.old[0] > 2.5:
                self.r_state = Direction.end

        if self.r_state == Direction.end:
            # print('Direction.end')
            self.r_count += 1
            if self.r_count > 20:
                self.r_state = Direction.idle
            elif x_state > 0 and self.old[0] < -2.5:
                result.append('right')
                self.r_state = Direction.idle

        if self.l_state == Direction.idle and x_state < 0 and self.new[0] < -2.5:
            self.l_count = 0
            self.l_state = Direction.ing

        if self.l_state == Direction.ing:
            # print('Direction.ing')
            self.l_count += 1
            if self.l_count > 10:
                self.l_state = Direction.idle
            elif x_state > 0 and self.old[0] < -2.5:
                self.l_state = Direction.end

        if self.l_state == Direction.end:
            # print('Direction.end')
            self.l_count += 1
            if self.l_count > 20:
                self.l_state = Direction.idle
            elif x_state < 0 and self.old[0] > 2.5:
                result.append('left')
                self.l_state = Direction.idle

        if self.f_state == Direction.idle and y_state > 0 and self.new[1] > 2.5:
            self.f_count = 0
            self.f_state = Direction.ing

        if self.f_state == Direction.ing:
            # print('Direction.ing')
            self.f_count += 1
            if self.f_count > 10:
                self.f_state = Direction.idle
            elif y_state < 0 and self.old[1] > 2.5:
                self.f_state = Direction.end

        if self.f_state == Direction.end:
            # print('Direction.end')
            self.f_count += 1
            if self.f_count > 20:
                self.f_state = Direction.idle
            elif y_state > 0 and self.old[1] < -2.5:
                result.append('forward')
                self.f_state = Direction.idle

        if self.b_state == Direction.idle and y_state < 0 and self.new[1] < -2.5:
            self.b_count = 0
            self.b_state = Direction.ing

        if self.b_state == Direction.ing:
            # print('Direction.ing')
            self.b_count += 1
            if self.b_count > 10:
                self.b_state = Direction.idle
            elif y_state > 0 and self.old[1] < -2.5:
                self.b_state = Direction.end

        if self.b_state == Direction.end:
            # print('Direction.end')
            self.b_count += 1
            if self.b_count > 20:
                self.b_state = Direction.idle
            elif y_state < 0 and self.old[1] > 2.5:
                result.append('backwards')
                self.b_state = Direction.idle

        return None if len(result) != 1 else result[0]

    def was_gesture(self, gesture="shake"):
        print("was_gesture will be supported in the future.")

    def is_gesture(self, gesture="shake"):
        print("is_gesture will be supported in the future.")

    def get_gestures(self):
        print("get_gestures will be supported in the future.")

    def current_gesture(self):
        print("current_gesture will be supported in the future.")

class Button:

    def __init__(self, pin_id):
        from machine import Pin
        self.pin = Pin(pin_id, Pin.IN)
        self.irq = self.pin.irq(trigger=Pin.IRQ_FALLING, handler=self.__irq_sc)
        self.presses = 0

    def __irq_sc(self, p):
        # print(self, p)
        self.presses += 1

    def close(self):
       self.irq.trigger(0) 

    def reset(self):
       self.presses = 0

    def get_presses(self):
        return self.presses

    def is_pressed(self):
        return self.pin.value() == 0

    def was_pressed(self):
        return self.presses != 0

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

PixelPower(True)

CharData = {
    '!': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    '"': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
    '#': [0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0],
    '$': [0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    '%': [1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1],
    '&': [0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    "'": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    '(': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    '@': [0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0],
    ')': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    '*': [0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0],
    '+': [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    ',': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    '-': [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    '.': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    '/': [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    '0': [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0],
    '1': [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0],
    '2': [0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1, 1],
    '3': [0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0],
    '4': [0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0],
    '5': [1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1],
    '6': [0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0],
    '7': [1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1],
    '8': [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    '9': [0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0],
    ':': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0],
    ';': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    '<': [0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    '=': [0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0],
    '>': [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    '?': [0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    'A': [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1],
    'B': [0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1],
    'C': [0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0],
    'D': [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1],
    'E': [0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1],
    'F': [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 1, 1],
    'G': [0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0],
    'H': [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1],
    'I': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1],
    'J': [1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0],
    'K': [0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1],
    'L': [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
    'M': [1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1],
    'N': [1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1],
    'O': [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0],
    'P': [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 1, 1],
    'Q': [0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0],
    'R': [0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 1, 1],
    'S': [0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1],
    'T': [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    'U': [0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0],
    'V': [1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0],
    'W': [1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1],
    'X': [0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1, 1],
    'Y': [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
    'Z': [0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1, 1],
    '[': [0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    "\\": [0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
    ']': [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    '^': [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    '_': [0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    '`': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    'a': [0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0],
    'b': [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1],
    'c': [0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0],
    'd': [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0],
    'e': [0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0],
    'f': [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0],
    'g': [0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0],
    'h': [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1],
    'i': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0],
    'j': [0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    'k': [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1],
    'l': [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    'm': [0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1],
    'n': [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1],
    'o': [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0],
    'p': [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 1],
    'q': [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0],
    'r': [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1],
    's': [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
    't': [0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    'u': [0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0],
    'v': [0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0],
    'w': [0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1],
    'x': [0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1],
    'y': [0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1],
    'z': [0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1],
    '{': [0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    '|': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    '}': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1],
    '~': [0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    ' ': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
}

black = [0, 0, 0]
Red = [2, 0, 0]
Orange = [2, 1, 0]
Yellow = [2, 2, 0]
Green = [0, 2, 0]
Blue = [0, 0, 2]
Indigo = [0, 2, 2]
Purple = [2, 0, 2]

Zero = [black] * 5


class Image:
    def __init__(self, str):
        self.tem = [0] * 25
        self.seq = [20, 15, 10, 5, 0, 21, 16, 11, 6, 1, 22, 17,
                    12, 7, 2, 23, 18, 13, 8, 3, 24, 19, 14, 9, 4]
        self.num = 0
        it = iter(self.seq)
        for val in str:
            if val != ':':
                self.tem[next(it)] = int(val)

    def __iter__(self):
        self.num = 0
        return self  # 实例本身就是迭代对象，故返回自己

    def __next__(self):
        value = self.tem[self.num]
        self.num += 1
        return value  # 返回下一个值

    def copy(self):
        print("copy will be supported in the future.")

    def invert(self):
        for i in range(self.tem):
            self.tem[i] = 0 if self.tem[i] != 0 else 1
        return self

    HEART = [0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1,
             1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0]
    HEART_SMALL = [0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0,
                   0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0]
    HAPPY = [0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,
             0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0]
    SMILE = [0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,
             0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0]
    SAD = [0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0,
           0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1]
    CONFUSED = [0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0,
                0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1]
    ANGRY = [1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0,
             0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1]
    ASLEEP = [0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0,
              0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0]
    SURPRISED = [0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0,
                 0, 1, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0]
    SILLY = [1, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0,
             1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0]
    FABULOUS = [1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1,
                0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0]
    MEH = [0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0,
           0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0]
    YES = [0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0,
           0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0]
    NO = [1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0,
          1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1]
    CLOCK12 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
               1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    CLOCK11 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
               0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0]
    CLOCK10 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
               0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0]
    CLOCK9 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0]
    CLOCK8 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0]
    CLOCK7 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0]
    CLOCK6 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
              0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    CLOCK5 = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0,
              0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    CLOCK4 = [0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0,
              0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    CLOCK3 = [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0,
              0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    CLOCK2 = [0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0,
              0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    CLOCK1 = [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
              0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ARROW_N = [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1,
               1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0]
    ARROW_NE = [1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1,
                0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1]
    ARROW_E = [0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1,
               0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0]
    ARROW_SE = [0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0,
                0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0]
    ARROW_S = [0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1,
               1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0]
    ARROW_SW = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0,
                0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1]
    ARROW_W = [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1,
               0, 1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0]
    ARROW_NW = [0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1,
                0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0]
    ALL_CLOCKS = [CLOCK12, CLOCK1, CLOCK2, CLOCK3, CLOCK4, CLOCK5,
                  CLOCK6, CLOCK7, CLOCK8, CLOCK9, CLOCK10, CLOCK11]
    ALL_ARROWS = [ARROW_N, ARROW_NE, ARROW_E,
                  ARROW_SE, ARROW_S, ARROW_SW, ARROW_W, ARROW_NW]

import _thread
class Display:
    lock = _thread.allocate_lock()
    def __init__(self):
        self.alive = False
        self.Led = Pixel()
        self.tem = [[0, 0, 0]] * 25  # 显示缓存区m=
    def stop(self):
        self.alive = False
        if Display.lock.acquire():
            # print("stop")
            Display.lock.release()
    def scroll(self, val, color=Red, delay=150):
        self.stop()
        self.alive = True
        if Display.lock.acquire():
            # print("start")
            _thread.start_new_thread(self._scroll,([val,color,delay]))
            Display.lock.release()
    def Disrupt_Col(color):
        a = color[-1]
        while True:
            if color_num != 1:
                import random
                random.shuffle(color)
                if a != color[0]:
                    break


    def _scroll(self, val, color=Red, delay=150):
        pixel_col = [[0, 0, 0]] * 25  # 显示缓存区m=
        val = str(val) + ' '
        color_num = 1
        if color != Red:
            if isinstance(color[0], list):
                color_num = len(color)
        # self.Disrupt_Col(color) #打乱颜色顺序
        col_cnt = 0
        it = iter(color)
        for val1 in val:
            val2 = CharData[val1]

            if color_num == 1:
                now_col = color
            else:
                if col_cnt < color_num:
                    now_col = next(it)  # 确定当前字符的颜色
                else:
                    col_cnt = 0
                    it = iter(color)
                    now_col = next(it)
                col_cnt += 1

            for i in range(25):  # 为字符的像素点添加颜色
                if val2[i] == 1:
                    pixel_col[i] = now_col
                else:
                    pixel_col[i] = [0, 0, 0]
            if Display.lock.acquire():
                for i in range(6):  # 开始滚动显示
                    if self.alive == False:
                        Display.lock.release()
                        self.clear()
                        _thread.exit()
                    else:
                        for t in range(4):
                            self.tem[20 - (t * 5):20 - (t * 5) + 5] = self.tem[20 -
                                                                               ((t + 1) * 5):20 - ((t + 1) * 5) + 5]
                        # 数据向前移动5位
                        if i == 5:
                            self.tem[0:5] = Zero[0:5]  # 每个字符之间间隔一行
                        else:
                            self.tem[0:5] = pixel_col[20 - (i * 5):20 - (i * 5) + 5]
                        for r in range(25):
                            self.Led.LoadPos(r, self.tem[r])  # 亮度为0
                        self.Led.Show()
                        sleep_ms(delay)
                Display.lock.release()
        _thread.exit()

    def clear(self):
        self.stop()
        self.Led.fill((0, 0, 0))
        self.Led.Show()


    def __show(self, it, color):
        it = iter(it)
        for r in range(25):
            col = next(it)
            self.Led.LoadPos(r, color if col else black)
        self.Led.Show()


    def show(self, images, wait=True, color=Red, *, loop=False, delay=500, clear=False):
        if isinstance(images, str):
            images = CharData[images]
        if isinstance(images, list) and (isinstance(images[0], Image) or isinstance(images[0], list)):
            for i in images:
                self.__show(i, color)
                sleep_ms(delay)
            try:
                while loop:
                    for i in images:
                        self.__show(i, color)
                        sleep_ms(delay)
            except Exception as e:
                self.Led.fill((0, 0, 0))
                self.Led.Show()

        else:
            it = iter(images)
            self.__show(it, color)
            try:
                while loop:
                    self.__show(it, color)
            except Exception as e:
                self.Led.fill((0, 0, 0))
                self.Led.Show()


    def get_pixel(self, x=0, y=0):
        print("get_pixel will be supported in the future.")


    def set_pixel(self, x=0, y=0, value=9):
        print("set_pixel will be supported in the future.")


    def on(self):
        self.clear()


    def off(self):
        self.clear()


    def is_on(self):
        return self.Led != None

class Intensity():
    dither = 10

    def __init__(self, pin):
        self.old, self.new, self.eliminate = 0, 0, 100

        from machine import ADC, Pin
        self.adc = ADC(Pin(pin, Pin.IN))
        self.adc.atten(ADC.ATTN_11DB)  # 0-3.9V

    def read(self):
        self.old = self.new
        self.new = self.adc.read() / 4.095
        return int(self.new)

    # result > 0 to state up, < 0 to state down.
    def get_state(self):
        # print(self.new, self.old)
        tmp = self.new - self.old
        return 0 if abs(tmp) < self.eliminate else tmp

    def calibrate(self):
        self.eliminate = 2 + self.read() / Intensity.dither


class Gesture(object):
    idle, ing, end, = 0, 1, 2

    def __init__(self, PinLeft=36, PinRight=39, dither=10):
        Intensity.dither = dither
        self.l, self.r = Intensity(PinLeft), Intensity(PinRight)
        self.l_state, self.r_state = Gesture.idle, Gesture.idle
        self.update=0 

    def get_brightness(self):
        self.r.read()
        self.l.read()

    def get_gesture(self, delay=25):
        sleep_ms(delay)
        self.get_brightness()
        l_state, r_state = self.l.get_state(), self.r.get_state()
        
        result = []

        if self.l_state == Gesture.idle and r_state > 0 and self.r.new-self.l.new > self.l.eliminate:
            self.l_count = 0
            self.l_state = Gesture.ing

        if self.r_state == Gesture.idle and l_state > 0 and self.l.new-self.r.new > self.r.eliminate:
            self.r_count = 0
            self.r_state = Gesture.ing

        if self.l_state == Gesture.ing:
            # print(self.l.eliminate)
            self.l_count += 1
            if self.l_count > 20:
                self.l_state = Gesture.idle
            elif l_state > 0 and self.r.new-self.l.new < self.l.eliminate:
                self.l_state = Gesture.end

        if self.l_state == Gesture.end:
            self.l_state = Gesture.idle
            result.append('left')

        if self.r_state == Gesture.ing:
            # print(self.r.eliminate)
            self.r_count += 1
            if self.r_count > 20:
                self.r_state = Gesture.idle
            elif r_state > 0 and self.l.new-self.r.new < self.r.eliminate:
                self.r_state = Gesture.end

        if self.r_state == Gesture.end:
            self.r_state = Gesture.idle
            result.append('right')

        if l_state == 0 and r_state == 0 and self.l_state == Gesture.idle and self.r_state == Gesture.idle:
            self.update += 1
            if self.update > 20:
                self.update = 0  
                self.l.calibrate()
                self.r.calibrate()

        return None if len(result) != 1 else result[0]

DADADADUM = ['r4:2', 'g', 'g', 'g', 'eb:8', 'r:2', 'f', 'f', 'f', 'd:8']

PUNCHLINE = ['c4:3', 'g3:1', 'f#', 'g', 'g#:3', 'g', 'r', 'b', 'c4']

PYTHON = [
    'd5:1', 'b4', 'r', 'b', 'b', 'a#', 'b', 'g5', 'r', 'd', 'd', 'r', 'b4',
    'c5', 'r', 'c', 'c', 'r', 'd', 'e:5', 'c:1', 'a4', 'r', 'a', 'a', 'g#',
    'a', 'f#5', 'r', 'e', 'e', 'r', 'c', 'b4', 'r', 'b', 'b', 'r', 'c5', 'd:5',
    'd:1', 'b4', 'r', 'b', 'b', 'a#', 'b', 'b5', 'r', 'g', 'g', 'r', 'd', 'c#',
    'r', 'a', 'a', 'r', 'a', 'a:5', 'g:1', 'f#:2', 'a:1', 'a', 'g#', 'a',
    'e:2', 'a:1', 'a', 'g#', 'a', 'd', 'r', 'c#', 'd', 'r', 'c#', 'd:2', 'r:3'
]

BADDY = ['c3:3', 'r', 'd:2', 'd#', 'r', 'c', 'r', 'f#:8']

BA_DING = ['b5:1', 'e6:3']

WAWAWAWAA = ['e3:3', 'r:1', 'd#:3', 'r:1', 'd:4', 'r:1', 'c#:8']

JUMP_UP = ['c5:1', 'd', 'e', 'f', 'g']

JUMP_DOWN = ['g5:1', 'f', 'e', 'd', 'c']

POWER_UP = ['g4:1', 'c5', 'e4', 'g5:2', 'e5:1', 'g5:3']

POWER_DOWN = ['g5:1', 'd#', 'c', 'g4:2', 'b:1', 'c5:3']

normal_tone = {
    'A1': 55, 'B1': 62, 'C1': 33, 'D1': 37, 'E1': 41, 'F1': 44, 'G1': 49,

    'A2': 110, 'B2': 123, 'C2': 65, 'D2': 73, 'E2': 82, 'F2': 87, 'G2': 98,

    'A3': 220, 'B3': 247, 'C3': 131, 'D3': 147, 'E3': 165, 'F3': 175, 'G3': 196,

    'A4': 440, 'B4': 494, 'C4': 262, 'D4': 294, 'E4': 330, 'F4': 349, 'G4': 392,

    'A5': 880, 'B5': 988, 'C5': 523, 'D5': 587, 'E5': 659, 'F5': 698, 'G5': 784,

    'A6': 1760, 'B6': 1976, 'C6': 1047, 'D6': 1175, 'E6': 1319, 'F6': 1397, 'G6': 1568,

    'A7': 3520, 'B7': 3951, 'C7': 2093, 'D7': 2349, 'E7': 2637, 'F7': 2794, 'G7': 3135,

    'A8': 7040, 'B8': 7902, 'C8': 4186, 'D8': 4699, 'E8': 5274, 'F8': 5588, 'G8': 6271,

    'A9': 14080, 'B9': 15804
}

rising_tone = {
    'A1': 58, 'C1': 35, 'D1': 39, 'F1': 46, 'G1': 52,

    'A2': 117, 'C2': 69, 'D2': 78, 'F2': 93, 'G2': 104,

    'A3': 233, 'C3': 139, 'D3': 156, 'F3': 185, 'G3': 208,

    'A4': 466, 'C4': 277, 'D4': 311, 'F4': 370, 'G4': 415,

    'A5': 932, 'C5': 554, 'D5': 622, 'F5': 740, 'G5': 831,

    'A6': 1865, 'C6': 1109, 'D6': 1245, 'F6': 1480, 'G6': 1661,

    'A7': 3729, 'C7': 2217, 'D7': 2489, 'F7': 2960, 'G7': 3322,

    'A8': 7459, 'C8': 4435, 'D8': 4978, 'F8': 5920, 'G8': 6645,

    'A9': 14917
}

falling_tone = {
    'B1': 58, 'D1': 35, 'E1': 39, 'G1': 46, 'A1': 52,

    'B2': 117, 'D2': 69, 'E2': 78, 'G2': 93, 'A2': 104,

    'B3': 233, 'D3': 139, 'E3': 156, 'G3': 185, 'A3': 208,

    'B4': 466, 'D4': 277, 'E4': 311, 'G4': 370, 'A4': 415,

    'B5': 932, 'D5': 554, 'E5': 622, 'G5': 740, 'A5': 831,

    'B6': 1865, 'D6': 1109, 'E6': 1245, 'G6': 1480, 'A6': 1661,

    'B7': 3729, 'D7': 2217, 'E7': 2489, 'G7': 2960, 'A7': 3322,

    'B8': 7459, 'D8': 4435, 'E8': 4978, 'G8': 5920, 'A8': 6645,

    'B9': 14917
}

Letter = 'ABCDEFG#R'

import _thread

class MIDI():

    lock = _thread.allocate_lock()

    def set_tempo(self, ticks=4, bpm=120):
        self.ticks = ticks
        self.bpm = bpm
        self.beat = 60000 / self.bpm / self.ticks

    def set_octave(self, octave=4):
        self.octave = octave

    def set_duration(self, duration=4):
        self.duration = duration

    def reset(self):
        self.set_duration()
        self.set_octave()
        self.set_tempo()

    def stop(self):
        self.play(['r'])

    def __init__(self):
        self.reset()
        self.alive = False

    def parse(self, tone, dict):
        # print(tone)
        time = self.beat * self.duration
        pos = tone.find(':')
        if pos != -1:
            time = self.beat * int(tone[(pos + 1):])
            tone = tone[:pos]
        # print(tone)
        freq, tone_size = 1, len(tone)
        if 'R' in tone:
            freq = 1
        elif tone_size == 1:
            freq = dict[tone[0] + str(self.octave)]
        elif tone_size == 2:
            freq = dict[tone]
            self.set_octave(tone[1:])
        # print(int(freq), int(time))
        return int(freq), int(time)

    def midi(self, tone):
        # print(tone)
        pos = tone.find('#')
        if pos != -1:
            return self.parse(tone.replace('#', ''), rising_tone)
        pos = tone.find('B')
        if pos != -1 and pos != 0:
            return self.parse(tone.replace('B', ''), falling_tone)
        return self.parse(tone, normal_tone)

    def set_default(self, tone):
        pos = tone.find(':')
        if pos != -1:
            self.set_duration(int(tone[(pos + 1):]))
            tone = tone[:pos]

    def play(self, tune, wait=False, loop=False, pin=25, duration=None):
        from machine import Pin, PWM
        from utime import sleep_ms

        try:
            pwm = PWM(Pin(pin))
            if duration is None:
                self.set_default(tune[0])
            else:
                self.set_duration(duration)
            for tone in tune:
                tone = tone.upper()  # all to upper
                if tone[0] not in Letter:
                    continue
                midi = self.midi(tone)
                pwm.freq(midi[0])  # set frequency
                pwm.duty(midi[1])  # set duty cycle
                sleep_ms(midi[1])
        finally:
            pwm.deinit()

        if loop:
            while True:
                self.play(tune)

    def pitch(self, freq, tim, pin=25):
        from machine import Pin, PWM
        from utime import sleep_ms

        try:
            pwm = PWM(Pin(pin))
            pwm.freq(freq)  # set frequency
            pwm.duty(tim)  # set duty cycle
            sleep_ms(tim)
        finally:
            pwm.deinit()

class Pins():

    def __init__(self, pin):
        self.pin = pin
        self.adc = None

    def write_digital(self, v):
        Pin(self.pin, Pin.OUT).value(v)

    def read_digital(self):
        return Pin(self.pin, Pin.IN).value()

    def read_analog(self, ATTN = ADC.ATTN_0DB):
        if self.pin not in range(32,40):
            # print("This pin feature is not supported")
            return None
        if self.adc is None:
            self.adc = ADC(Pin(self.pin, Pin.IN))
            self.adc.atten(ATTN)  
        return self.adc.read()

    def write_analog(self, value):
        if self.pin not in [25,26]:
            # print("This pin feature is not supported")
            return None
        DAC(Pin(self.pin)).write(value)

    def is_touched(self):
        return self.read_analog() > 3071

Tp = 273.15
T = Tp + 25 # Normal Temperature Parameters
_T = 1 / T
B = 3950

class Temperature:

    def __init__(self, adc):
        self.adc = adc

    def temperature(self):
        adc_val = self.adc.read()
        Vout = adc_val * 3.9 / 4095.0
        if 0 < Vout and Vout < 3.3: # -26.9 and 160.5
            Rt = ((3.3 / Vout) - 1) * 0.51  # Sampling Resistance is 5.1K ohm
            import math
            T1 = 1 / (_T + math.log(Rt) / B) - Tp
            return round(T1, 1)
        print('ADC Value Error!')
        return None

display = Display()