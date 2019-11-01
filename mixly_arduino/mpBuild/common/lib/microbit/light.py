from time import sleep_ms


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


def unit_test():
    print('\n\
        g = Gesture()\n\
        count = 0\n\
        while True:\n\
            res = g.get_gesture()\n\
            if res != None:\n\
                print(res)\n\
                count = 1+count\n\
                print(count)\n\
    ')
    g = Gesture()
    count = 0
    while True:
        res = g.get_gesture()
        if res != None:
            print(res)
            count = 1 + count
            print(count)


if __name__ == '__main__':
    unit_test()
