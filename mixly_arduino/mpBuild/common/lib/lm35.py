import machine

def get_LM35_temperature(val):
	my_lm35 = machine.ADC(machine.Pin(val))
	my_lm35.atten(machine.ADC.ATTN_11DB)

	return (my_lm35.read() / 4096) * 5000 / 10.24