const pins = {};

pins.arduino_standard = {
    description: "standard",
    digital: [["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"], ["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"]],
    analog: [["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"], ["A6", "A6"], ["A7", "A7"]],
    pwm: [["3", "3"], ["5", "5"], ["6", "6"], ["9", "9"], ["10", "10"], ["11", "11"]],
    interrupt: [["2", "2"], ["3", "3"]],
    SDA: [["A4", "A4"]],
    SCL: [["A5", "A5"]],
    MOSI: [["11", "11"]],
    MISO: [["12", "12"]],
    SCK: [["13", "13"]],
    serial_select: [["Serial", "Serial"], ["SoftwareSerial", "mySerial"], ["SoftwareSerial1", "mySerial1"], ["SoftwareSerial2", "mySerial2"], ["SoftwareSerial3", "mySerial3"]],
    serial: 9600
};

pins.arduino_mega = {
    description: "Mega",
    digital: [["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"], ["14", "14"], ["15", "15"], ["16", "16"], ["17", "17"], ["18", "18"], ["19", "19"], ["20", "20"], ["21", "21"], ["22", "22"], ["23", "23"], ["24", "24"], ["25", "25"], ["26", "26"], ["27", "27"], ["28", "28"], ["29", "29"], ["30", "30"], ["31", "31"], ["32", "32"], ["33", "33"], ["34", "34"], ["35", "35"], ["36", "36"], ["37", "37"], ["38", "38"], ["39", "39"], ["40", "40"], ["41", "41"], ["42", "42"], ["43", "43"], ["44", "44"], ["45", "45"], ["46", "46"], ["47", "47"], ["48", "48"], ["49", "49"], ["50", "50"], ["51", "51"], ["52", "52"], ["53", "53"], ["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"], ["A6", "A6"], ["A7", "A7"], ["A8", "A8"], ["A9", "A9"], ["A10", "A10"], ["A11", "A11"], ["A12", "A12"], ["A13", "A13"], ["A14", "A14"], ["A15", "A15"]],
    analog: [["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"], ["A6", "A6"], ["A7", "A7"], ["A8", "A8"], ["A9", "A9"], ["A10", "A10"], ["A11", "A11"], ["A12", "A12"], ["A13", "A13"], ["A14", "A14"], ["A15", "A15"]],
    pwm: [["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"]],
    interrupt: [["2", "2"], ["3", "3"], ["18", "18"], ["19", "19"], ["20", "20"], ["21", "21"]],
    SDA: [["20", "20"]],
    SCL: [["21", "21"]],
    MOSI: [["51", "51"]],
    MISO: [["50", "50"]],
    SCK: [["52", "52"]],
    SS: [["53", "53"]],
    serial_select: [["Serial", "Serial"], ["Serial1", "Serial1"], ["Serial2", "Serial2"], ["Serial3", "Serial3"], ["SoftwareSerial", "mySerial"], ["SoftwareSerial1", "mySerial1"], ["SoftwareSerial2", "mySerial2"], ["SoftwareSerial3", "mySerial3"]],
    serial: 9600
};

pins.arduino_eightanaloginputs = {
    description: "eightanaloginputs",
    digital: [["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"], ["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"], ["A6", "A6"], ["A7", "A7"]],
    analog: [["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"], ["A6", "A6"], ["A7", "A7"]],
    pwm: [["3", "3"], ["5", "5"], ["6", "6"], ["9", "9"], ["10", "10"], ["11", "11"]],
    interrupt: [["2", "2"], ["3", "3"]],
    SDA: [["A4", "A4"]],
    SCL: [["A5", "A5"]],
    MOSI: [["11", "11"]],
    MISO: [["12", "12"]],
    SCK: [["13", "13"]],
    serial_select: [["Serial", "Serial"], ["SoftwareSerial", "mySerial"], ["SoftwareSerial1", "mySerial1"], ["SoftwareSerial2", "mySerial2"], ["SoftwareSerial3", "mySerial3"]],
    serial: 9600
};

pins.arduino_ethernet = {
    description: "ethernet",
    digital: [["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"], ["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"]],
    analog: [["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"]],
    pwm: [["3", "3"], ["5", "5"], ["6", "6"], ["9", "9"], ["10", "10"], ["11", "11"]],
    interrupt: [["2", "2"], ["3", "3"]], //本无
    MOSI: [["11", "11"]],
    MISO: [["12", "12"]],
    SCK: [["13", "13"]],
    serial_select: [["Serial", "Serial"], ["SoftwareSerial", "mySerial"], ["SoftwareSerial1", "mySerial1"], ["SoftwareSerial2", "mySerial2"], ["SoftwareSerial3", "mySerial3"]],
    serial: 9600
};

pins.arduino_gemma = {
    description: "gemma",
    digital: [["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"]],
    analog: [["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"]],
    pwm: [["0", "0"], ["1", "1"]],
    interrupt: [["2", "2"], ["3", "3"]], //本无
    MOSI: [["11", "11"]],
    MISO: [["12", "12"]],
    SCK: [["13", "13"]],
    serial_select: [["Serial", "Serial"], ["SoftwareSerial", "mySerial"], ["SoftwareSerial1", "mySerial1"], ["SoftwareSerial2", "mySerial2"], ["SoftwareSerial3", "mySerial3"]],
    serial: 9600
};

pins.arduino_leonardo = {
    description: "leonardo, micro, yun",
    digital: [["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"], ["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"], ["A6", "A6"], ["A7", "A7"], ["A8", "A8"], ["A9", "A9"], ["A10", "A10"], ["A11", "A11"]],
    analog: [["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"], ["A6", "A6"], ["A7", "A7"], ["A8", "A8"], ["A9", "A9"], ["A10", "A10"], ["A11", "A11"]],
    pwm: [["3", "3"], ["5", "5"], ["6", "6"], ["9", "9"], ["10", "10"], ["11", "11"], ["13", "13"]],
    interrupt: [["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["7", "7"]],
    SDA: [["2", "2"]],
    SCL: [["3", "3"]],
    MOSI: [["11", "11"]],
    MISO: [["12", "12"]],
    SCK: [["13", "13"]],
    serial_select: [["Serial", "Serial"], ["Serial1", "Serial1"], ["SoftwareSerial", "mySerial"], ["SoftwareSerial1", "mySerial1"], ["SoftwareSerial2", "mySerial2"], ["SoftwareSerial3", "mySerial3"]],
    serial: 9600
};

pins.arduino_robot = {
    description: "robot",
    digital: [["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"], ["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"], ["A6", "A6"], ["A7", "A7"], ["A8", "A8"], ["A9", "A9"], ["A10", "A10"], ["A11", "A11"]],
    analog: [["A0", "A0"], ["A1", "A1"], ["A2", "A2"], ["A3", "A3"], ["A4", "A4"], ["A5", "A5"], ["A6", "A6"], ["A7", "A7"], ["A8", "A8"], ["A9", "A9"], ["A10", "A10"], ["A11", "A11"]],
    pwm: [["3", "3"], ["6", "6"], ["9", "9"], ["10", "10"], ["11", "11"], ["13", "13"]],
    interrupt: [["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["7", "7"]],
    MOSI: [["11", "11"]],
    MISO: [["12", "12"]],
    SCK: [["13", "13"]],
    serial_select: [["Serial", "Serial"], ["Serial1", "Serial1"], ["SoftwareSerial", "mySerial"], ["SoftwareSerial1", "mySerial1"], ["SoftwareSerial2", "mySerial2"], ["SoftwareSerial3", "mySerial3"]],
    serial: 9600
};

pins["Arduino Leonardo"] =
pins["Arduino Leonardo ETH"] =
pins["Arduino/Genuino Micro"] =
pins["Arduino Esplora"] =
pins["LilyPad Arduino USB"] =
pins["Arduino Yun"] =
pins["Arduino Yun Mini"] =
pins["Arduino Yún"] =
pins["Arduino Yún Mini"] =
pins.arduino_leonardo;

pins["Arduino Robot Control"] =
pins["Arduino Robot Motor"] =
pins.arduino_robot;

pins["Arduino Mega or Mega 2560"] =
pins["Arduino/Genuino Mega or Mega 2560"] =
pins["Arduino/Genuino Mega or Mega 1280"] =
pins["Arduino Mega ADK"] =
pins["Arduino Mega w/ ATmega2560"] =
pins["Arduino Mega w/ ATmega1280"] =
pins.arduino_mega;

pins["Arduino Ethernet"] =
pins.arduino_ethernet;

pins["Arduino Gemma"] =
pins.arduino_gemma;

pins["Arduino Uno WiFi"] =
pins["Arduino/Genuino Uno"] =
pins["Arduino Duemilanove or Diecimila"] =
pins["LilyPad Arduino"] =
pins["Arduino NG or older"] =
pins.arduino_standard;

pins["Arduino Mini w/ ATmega168"] =
pins["Arduino Nano"] =
pins["Arduino Mini"] =
pins["Arduino Fio"] =
pins["Arduino BT"] =
pins["Arduino Pro or Pro Mini"] =
pins["Arduino Mini w/ ATmega328P"] =
pins["Arduino Nano w/ ATmega168"] =
pins["Arduino Nano w/ ATmega328P"] =
pins["Arduino Nano w/ ATmega328P (old bootloader)"] =
pins["Arduino Pro or Pro Mini"] =
pins["Arduino Pro or Pro Mini (5V, 16 MHz) w/ ATmega328P"] =
pins["Arduino Pro or Pro Mini (3.3V, 8 MHz) w/ ATmega328P"] =
pins["Arduino Pro or Pro Mini (5V, 16 MHz) w/ ATmega168"] =
pins["Arduino Pro or Pro Mini (3.3V, 8 MHz) w/ ATmega168"] =
pins.arduino_eightanaloginputs;

export default pins;