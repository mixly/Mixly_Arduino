"""
MxiGo AI to MxiGo CE  COM

MicroPython library for the MxiGo AI
=======================================================
20211213
mixly 
"""

data_a = None


def uart_tx(uart, data, repeat=True):
    global data_a
    data_b = data
    if data_b != data_a:
        uart.write((str(data) + "\n"))
        # print(data)
        if not repeat:
            data_a = data_b


def uart_rx(uart):
    data = uart.readline()
    if data:
        data_str = data.strip()
        try:
            data_str = data_str.decode()
            return eval(data_str)
        except:
            return data_str
