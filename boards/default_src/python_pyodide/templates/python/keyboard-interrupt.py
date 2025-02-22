import signal
def signal_handler(signal, frame):
    raise ValueError("程序中断")
signal.signal(signal.SIGINT, signal_handler)

