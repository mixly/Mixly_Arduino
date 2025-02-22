from microbit import *
import math

_VOLTAGE_POWER = 5
_RS = 10
_B = 3950
_T1 = 273.15 + 25
_R1 = 100


def read(pin, r1, b, rs):
    r1 = r1 / 1000
    rs = rs / 1000

    # print("rs:" + str(rs))

    _analogValue = pin.read_analog()
    _voltageValue = (_analogValue / 1545) * _VOLTAGE_POWER

    # print("voltageValue:" + str(_voltageValue))

    _rt = ((_VOLTAGE_POWER - _voltageValue) * rs) / _voltageValue

    # print("rt:" + str(_rt))

    _tempValue = ((_T1 * b) / (b + _T1 * math.log(_rt / r1))) - 273.15

    return _tempValue
