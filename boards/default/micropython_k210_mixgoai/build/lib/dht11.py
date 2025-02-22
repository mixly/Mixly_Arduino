import time, board


def read_data(pin_name):
    data = []
    j = 0
    time.sleep_ms(1200)
    N1 = board.pin(pin_name, board.GPIO.OUT)
    N1.value(0)
    time.sleep_ms(20)
    N1.value(1)
    time.sleep_us(30)
    N1 = board.pin(pin_name, board.GPIO.IN)
    T1 = time.ticks_us()
    while N1.value() == 0:
        continue
    while N1.value() == 1:
        T2 = time.ticks_us()
        if time.ticks_diff(T2, T1) > 200000:
            # raise ValueError("[MixNo]:Sensor read error")
            break
        continue
    while j < 40:
        k = 0
        while N1.value() == 0:
            continue
        while N1.value() == 1:
            k += 1
            if k > 100:
                break
        if k < 15:
            data.append(0)
        else:
            data.append(1)
        j = j + 1
    del N1
    humidity_bit = data[0:8]
    humidity_point_bit = data[8:16]
    temperature_bit = data[16:24]
    temperature_point_bit = data[24:32]
    check_bit = data[32:40]
    humidity = 0
    humidity_point = 0
    temperature = 0.0
    temperature_point = 0
    check = 0
    for i in range(8):
        humidity += humidity_bit[i] * 2 ** (7 - i)
        humidity_point += humidity_point_bit[i] * 2 ** (7 - i)
        temperature += temperature_bit[i] * 2 ** (7 - i)
        temperature_point += temperature_point_bit[i] * 2 ** (7 - i)
        check += check_bit[i] * 2 ** (7 - i)
    tmp = humidity + humidity_point + temperature + temperature_point
    # print(humidity_point,temperature_point)
    if check == tmp:
        # print('temperature is',temperature,'-wet is',humidity,'%')
        return (temperature + temperature_point / 10, humidity)
    else:
        # print('Error:',humidity,humidity_point,temperature,temperature_point,check)
        return (None, None)
