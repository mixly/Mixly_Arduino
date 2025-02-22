import utime,gc
from machine import RTC
import usocket as socket
import ustruct as struct

# NTP_DELTA (date(2000, 1, 1) - date(1900, 1, 1)).days * 24*60*60
NTP_DELTA=3155673600

def time(host="pool.ntp.org", utc=28800):
    NTP_QUERY = bytearray(48)
    NTP_QUERY[0] = 0x1B
    addr = socket.getaddrinfo(host, 123)[0][-1]
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        s.settimeout(1)
        res = s.sendto(NTP_QUERY, addr)
        msg = s.recv(48)
    finally:
        del addr
        s.close()
    gc.collect()
    val = struct.unpack("!I", msg[40:44])[0]
    return utime.gmtime(val - NTP_DELTA + utc)

# There's currently no timezone support in MicroPython, and the RTC is set in UTC time.
def settime(times):
    if isinstance(times, str): 
        try:
            val = eval(times)
            if len(val) >= 6:
                times=(val[0], val[1], val[2], val[3], val[4], val[5], 0) 
            else:
                raise ValueError("Clock information format error")
        except:
            raise ValueError("Clock information format error, use ',' to separate at least 6 numerical values")
    if type(times) in (tuple, list):
        if 6 <= len(times) <= 8:
            RTC().datetime((times[0], times[1], times[2], 0, times[3], times[4], times[5], 0))
        else:
            raise ValueError("Settime needs a tuple of length 6~8")
