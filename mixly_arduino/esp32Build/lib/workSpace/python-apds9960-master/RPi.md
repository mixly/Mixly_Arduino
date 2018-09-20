# APDS-9960 on Raspberry Pi

## Wiring

The APDS-9960 can be connected to the I²C bus of the RPi using the P01 header:

| Board Pin | Function     |  RPi Pin | RPi Function   |
|-----------|--------------|----------|----------------|
| VL        | IR LED Power _(optional)_ |  n.c.    | _(not connected)_
| GND       | Ground       |  P01-9   | GND
| VCC       | +3.3V        |  P01-1   | 3.3V PWR
| SDA       | Data         |  P01-3   | I2C1 SDA
| SCL       | Clock        |  P01-5   | I2C1 SCL
| INT       | Interrupt    |  P01-7   | GPIO 4 _(optional)_


## I²C

You need to have enabled loading of the I²C kernel module. You might use `raspi-config` to enable I²C:
- run `raspi-config`
- select `5 Interfacing Options`
- enable `P5 I2C`

The APDS-9960 supports a I²C clock up to 400KHz (default is 100KHz). To speed up detection performance you should increase the clock rate be using the following option in `/boot/config.txt`:

```
dtparam=i2c_arm=on,i2c_baudrate=400000
```

A reboot is required to apply the change.


## Verify

To verify your setup use the `i2cdetect` command. The APDS-9960 chip is hard coded at the address 0x39:

```shell
# i2cdetect -y 1                                                    
     0  1  2  3  4  5  6  7  8  9  a  b  c  d  e  f                             
00:          -- -- -- -- -- -- -- -- -- -- -- -- --                             
10: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --                             
20: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --                             
30: -- -- -- -- -- -- -- -- -- 39 -- -- -- -- -- --                             
40: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --                             
50: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --                             
60: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --                             
70: -- -- -- -- -- -- -- --                                                     
```
