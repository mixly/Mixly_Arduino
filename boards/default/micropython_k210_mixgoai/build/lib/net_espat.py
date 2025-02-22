import network, time, board
from machine import UART
import time


def wifi_init(RX_Pin, TX_Pin):
    board.register(TX_Pin, board.FPIOA.UART2_TX)
    board.register(RX_Pin, board.FPIOA.UART2_RX)

    uart = UART(UART.UART2, 115200, timeout=1000, read_buf_len=1024 * 16)
    T1 = time.ticks_ms()
    while True:
        tmp = uart.read()
        if tmp:
            if tmp.endswith("OK\r\n"):
                break
        else:
            uart.write("AT+RST\r\n")
            time.sleep_ms(20)
        if time.ticks_diff(time.ticks_ms(), T1) > 2000:
            raise AttributeError("ESP-AT not connected or needs to be reset")
    try:
        nic = network.ESP8285(uart)
        time.sleep(1)
        print("ESP-AT OK")
        return nic
    except Exception:
        raise AttributeError("ESP-AT Connection Failed")


def wifi_deal_ap_info(info):
    res = []
    for ap_str in info:
        ap_str = ap_str.split(",")
        info_one = []
        for node in ap_str:
            if node.startswith('"'):
                info_one.append(node[1:-1])
            else:
                info_one.append(int(node))
        res.append(info_one)
    return res


def scans(nic):
    ap_info = nic.scan()
    ap_info = wifi_deal_ap_info(ap_info)
    ap_info.sort(key=lambda x: x[2], reverse=True)
    return ap_info
