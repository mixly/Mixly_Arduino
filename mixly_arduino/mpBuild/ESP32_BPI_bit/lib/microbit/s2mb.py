"""
 Copyright (c) 2017-2018 Alan Yorinks All rights reserved.

 This program is free software; you can redistribute it and/or
 modify it under the terms of the GNU AFFERO GENERAL PUBLIC LICENSE
 Version 3 as published by the Free Software Foundation; either
 or (at your option) any later version.
 This library is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 General Public License for more details.

 You should have received a copy of the GNU AFFERO GENERAL PUBLIC LICENSE
 along with this library; if not, write to the Free Software
 Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA

 Last modified 5 April 2018
"""

from microbit import *

# This is a script used to control a micro:bit from s2m

# This loop continuously polls the sensors and then prints a reply string.
# It also continuously calls readline to check for commands.
# A command is specified as comma delimited string with the command
# as the first element followed by its parameters.

# Commands:
#   d - display the specified image
#   s - scroll the specified text
#   p - control a pixel for the specified row, column and intensity
#   c - clear the display (no parameters)
#   a - analog write for the specified pin and value (range 0-1023)
#   t - digital write for the specified pin and value (0 or 1)
#   v - get version string

import sys
uart = sys.stdin

def logging(func):
    import sys
    def _deco():
        try:
            func()
        except Exception as e:
            with open("run.log", "a") as f:
                sys.print_exception(e, f)
    return _deco

# a list of current digital pin modes
@logging
def loop():
    digital_outputs = [False, False, False]
    while True:
        data = uart.readline()
        sleep(8)
        if data:
            cmd = str(data, 'utf-8').rstrip()
            if not len(cmd):
                continue
            # noinspection PyUnresolvedReferences
            cmd_list = cmd.split(",")
            # get command id

            try:
                cmd_id = cmd_list[0]
            except IndexError:
                cmd_id = 'z'
                continue

            # display image command
            if cmd_id == 'd':
                image_dict = {"HAPPY": Image.HAPPY,
                              "SAD": Image.SAD,
                              "ANGRY": Image.ANGRY,
                              "SMILE": Image.SMILE,
                              "CONFUSED": Image.CONFUSED,
                              "ASLEEP": Image.ASLEEP,
                              "SURPRISED": Image.SURPRISED,
                              "SILLY": Image.SILLY,
                              "FABULOUS": Image.FABULOUS,
                              "MEH": Image.MEH,
                              "YES": Image.YES,
                              "NO": Image.NO,
                              "RABBIT": Image.RABBIT,
                              "COW": Image.COW,
                              "ROLLERSKATE": Image.ROLLERSKATE,
                              "HOUSE": Image.HOUSE,
                              "SNAKE": Image.SNAKE,
                              "HEART": Image.HEART,
                              "DIAMOND": Image.DIAMOND,
                              "DIAMOND_SMALL": Image.DIAMOND_SMALL,
                              "SQUARE": Image.SQUARE,
                              "SQUARE_SMALL": Image.SQUARE_SMALL,
                              "TRIANGLE": Image.TRIANGLE,
                              "TARGET": Image.TARGET,
                              "STICKFIGURE": Image.STICKFIGURE,
                              "ARROW_N": Image.ARROW_N,
                              "ARROW_NE": Image.ARROW_NE,
                              "ARROW_E": Image.ARROW_E,
                              "ARROW_SE": Image.ARROW_SE,
                              "ARROW_S": Image.ARROW_S,
                              "ARROW_SW": Image.ARROW_SW,
                              "ARROW_W": Image.ARROW_W,
                              "ARROW_NW": Image.ARROW_NW}

                # get image key
                try:
                    image_key = cmd_list[1]
                except IndexError:
                    continue
                try:
                    r_value = int(cmd_list[2])
                except ValueError:
                    continue
                except IndexError:
                    continue

                if r_value < 0:
                    r_value = 0
                if r_value > 255:
                    r_value = 255
                try:
                    g_value = int(cmd_list[3])
                except ValueError:
                    continue
                except IndexError:
                    continue
            
                if g_value < 0:
                    g_value = 0
                if g_value > 255:
                    g_value = 255
                try:
                    b_value = int(cmd_list[4])
                except ValueError:
                    continue
                except IndexError:
                    continue

                if b_value < 0:
                    b_value = 0
                if b_value > 255:
                    b_value = 255

                #if image_key in image_dict:
                display.show(image_dict.get(image_key),[r_value,g_value,b_value])

            # scroll text command
            elif cmd_id == 's':
                try:
                    r_value = int(cmd_list[2])
                except ValueError:
                    continue
                except IndexError:
                    continue

                if r_value < 0:
                    r_value = 0
                if r_value > 255:
                    r_value = 255

                try:
                    g_value = int(cmd_list[3])
                except ValueError:
                    continue
                except IndexError:
                    continue

                if g_value < 0:
                    g_value = 0
                if g_value > 255:
                    g_value = 255

                try:
                    b_value = int(cmd_list[4])
                except ValueError:
                    continue
                except IndexError:
                    continue
                
                if b_value < 0:
                    b_value = 0
                if b_value > 255:
                    b_value = 255

                display.scroll(str(cmd_list[1]),[r_value,g_value,b_value])


            # write pixel command
            elif cmd_id == 'p':
                # get row, column and intensity value
                # make sure values are within valid range
                # print(cmd)
                try:
                    x = int(cmd_list[1])
                except ValueError:
                    continue
                except IndexError:
                    continue

                if x < 0:
                    x = 0
                if x > 4:
                    x = 4

                try:
                    y = int(cmd_list[2])
                except ValueError:
                    continue
                except IndexError:
                    continue

                if y < 0:
                    y = 0
                if y > 4:
                    y = 4
                try:
                    r_value = int(cmd_list[3])
                except ValueError:
                    continue
                except IndexError:
                    continue

                if r_value < 0:
                    r_value = 0
                if r_value > 255:
                    r_value = 255
                
                try:
                    g_value = int(cmd_list[4])
                except ValueError:
                    continue
                except IndexError:
                    continue

                if g_value < 0:
                    g_value = 0
                if g_value > 255:
                    g_value = 255

                try:
                    b_value = int(cmd_list[5])
                except ValueError:
                    continue
                except IndexError:
                    continue

                if b_value < 0:
                    b_value = 0
                if b_value > 255:
                    b_value = 255

                #display.set_pixel(x, y, value)
                from pixel import Pixel
                View = Pixel()
                View.LoadXY(x, y, [r_value,g_value,b_value])
                View.Show()

            # clear display command
            elif cmd_id == 'c':
                display.clear()

            # analog write command
            # if values are out of range, command is ignored
            elif cmd_id == 'a':
                # check pin and value ranges
                try:
                    pin = int(cmd_list[1])
                    value = int(cmd_list[2])
                    digital_outputs[pin] = True
                except IndexError:
                    continue
                except ValueError:
                    continue

                if 0 <= pin <= 2:
                    if not 0 <= value <= 1023:
                        value = 256
                    if pin == 0:
                        pin0.write_analog(value)
                    elif pin == 1:
                        pin1.write_analog(value)
                    elif pin == 2:
                        pin2.write_analog(value)

            # digital write command
            elif cmd_id == 't':
                # check pin and value ranges
                # if values are out of range, command is ignored
                try:
                    pin = int(cmd_list[1])
                    value = int(cmd_list[2])
                    digital_outputs[pin] = True
                except IndexError:
                    continue
                except ValueError:
                    continue

                if 0 <= pin <= 2:
                    if 0 <= value <= 1:
                        if pin == 0:
                            pin0.write_digital(value)
                        elif pin == 1:
                            pin1.write_digital(value)
                        elif pin == 2:
                            pin2.write_digital(value)
                    else:
                        pass

            elif cmd == 'g':
                # This string will contain the sensor values and will
                # be "printed" to the serial port.
                # Fields are comma delimited
                sensor_string = ""

                # accelerometer
                sensor_string += str(int(accelerometer.get_x()*20)) + ','
                sensor_string += str(int(accelerometer.get_y()*20)) + ','
                sensor_string += str(int(accelerometer.get_z()*20)) + ','

                # buttons
                sensor_string += str(button_a.is_pressed()) + ','

                sensor_string += str(button_b.is_pressed()) + ','

                # get digital input pin values
                if not digital_outputs[0]:
                    sensor_string += str(pin0.read_digital()) + ','
                else:
                    sensor_string += '0' + ','
                #
                if not digital_outputs[1]:
                    sensor_string += str(pin1.read_digital()) + ','
                else:
                    sensor_string += '0' + ','
                #
                if not digital_outputs[2]:
                    sensor_string += str(pin2.read_digital()) + ','
                else:
                    sensor_string += '0' + ','

                # get analog input pin values
                if not digital_outputs[0]:
                    sensor_string += '0' + ','
                else:
                    sensor_string += '0' + ','

                if not digital_outputs[1]:
                    sensor_string += str(pin1.read_analog()) + ','
                else:
                    sensor_string += '0' + ','

                if not digital_outputs[2]:
                    sensor_string += str(pin2.read_analog())+','
                else:
                    sensor_string += '0' + ','
                ###temperature
                sensor_string += str(temperature()) +',' 
                #L R light
                import light
                R = light.Intensity(39)
                L = light.Intensity(36)
                sensor_string += str(int(L.read()))+',' 
                sensor_string += str(int(R.read())) 

                print(sensor_string)
                sleep(10)


            elif cmd == 'v':
                print('s2mb.py Version 1.10 14 April 2018')
            else:
                continue
        sleep(8)

while True:
    loop()
