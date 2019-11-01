from time import sleep_ms


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

def unit_test():
    print("\n\
    ")
    from display import Display
    display = Display()
    from machine import Pin, I2C
    from mpu9250 import MPU9250
    from time import sleep
    i2c = I2C(scl=Pin(22), sda=Pin(21), freq=200000)
    sensor = MPU9250(i2c)
    print('MPU9250 whoami: ' + hex(sensor.whoami))
    gs = Direction(sensor)
    t = 0
    while True:
        res = gs.get_direction()
        if res != None:
            print(res)
            t = 1+t
            print(t)


if __name__ == '__main__':
    unit_test()
