import time, board


def Sonar(trig1, echo1):

    trig = board.pin(trig1, board.GPIO.OUT)
    echo = board.pin(echo1, board.GPIO.IN)
    time.sleep_ms(10)
    trig.value(1)
    time.sleep_us(10)
    trig.value(0)
    n1 = time.ticks_us()
    while echo.value() == 0:
        n2 = time.ticks_us()
        if time.ticks_diff(n2, n1) > 200000:
            # raise ValueError("[MixNo]:Sensor read error")
            break
        pass
    t1 = time.ticks_us()
    while echo.value() == 1:
        n3 = time.ticks_us()
        if time.ticks_diff(n3, t1) > 200000:
            # raise ValueError("[MixNo]:Sensor read error")
            break
        pass
    t2 = time.ticks_us()
    time.sleep_ms(10)
    return round(time.ticks_diff(t2, t1) / 10000 * 340 / 2, 2)
