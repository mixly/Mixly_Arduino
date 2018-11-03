import random
import matrix
import mpu9250
import machine
import mixgo
import time


x = random.randint(0, 15)
y = random.randint(0, 7)
matrix.display.set_pixel(int(x), int(y), 1)
while True:
    if mixgo.mpu.get_x() < 0:
        x = max(x - 1, 0)
    else:
        x = min(x + 1, 15)
    if mixgo.mpu.get_y() < 0:
        y = max(y - 1, 0)
    else:
        y = min(y + 1, 7)
    print(x,end ="")
    print(',',end ="")
    print(y)
    matrix.display.clear()
    matrix.display.set_pixel(int(x), int(y), 1)
    time.sleep_ms(1000)
