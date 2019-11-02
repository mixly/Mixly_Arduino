from time import time, sleep_ms

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

def unit_test():
    print('The unit test code is as follows')
    print('\n\
        button_a = Button(35)\n\
        while True:\n\
            print(\'button_a was_pressed \', button_a.was_pressed())\n\
            print(\'button_a is_pressed \', button_a.is_pressed())\n\
            print(\'button_a get_presses \', button_a.get_presses())\n\
        ')
    try:
        button_a = Button(35)
        while True:
            sleep_ms(100)
            print('button_a was_pressed ', button_a.was_pressed())
            print('button_a is_pressed ', button_a.is_pressed())
            print('button_a get_presses ', button_a.get_presses())
    finally:
        button_a.close()

if __name__ == '__main__':
    unit_test()
