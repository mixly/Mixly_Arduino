from microbit import *


def distance_mm(tpin=pin16, epin=pin15):
    spi.init(baudrate=125000, sclk=pin13, mosi=tpin, miso=epin)
    pre = 0
    post = 0
    k = -1
    length = 500
    resp = bytearray(length)
    resp[0] = 0xFF
    spi.write_readinto(resp, resp)
    # find first non zero value
    try:
        i, value = next((ind, v) for ind, v in enumerate(resp) if v)
    except StopIteration:
        i = -1
    if i > 0:
        pre = bin(value).count("1")
        # find first non full high value afterwards
        try:
            k, value = next(
                (ind, v)
                for ind, v in enumerate(resp[i : length - 2])
                if resp[i + ind + 1] == 0
            )
            post = bin(value).count("1") if k else 0
            k = k + i
        except StopIteration:
            i = -1
    dist = -1 if i < 0 else round((pre + (k - i) * 8.0 + post) * 8 * 0.172)
    return dist


def distance_cm(t_pin=pin16, e_pin=pin15):
    return distance_mm(tpin=t_pin, epin=e_pin) / 10.0
