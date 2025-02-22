"""
UART Communication

MicroPython library for the UART_COM（Board to board communication）
=======================================================
#Preliminary composition           				20220903

dahanzimin From the Mixly Team 
"""
_sdata=None

def send(uart,data,repeat=True):
	global _sdata	
	if data != _sdata:
		uart.write((str(data)+'\n'))
		if not repeat:
			_sdata=data
            
def recv(uart):
	data = uart.readline()
	if data:
		data_str = data.strip()
		try:
			data_str=data_str.decode()
			return eval(data_str)
		except:
			return data_str
