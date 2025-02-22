const pins = {};

pins.arduino_esp8266 = {
    description: "esp8266_Arduino",
    digital: [["0", "0"], ["2", "2"], ["4", "4"], ["5", "5"], ["12", "12"], ["13", "13"], ["14", "14"], ["15", "15"], ["16", "16"], ["A0", "A0"]],
    analog: [["A0", "A0"]],
    pwm: [["0", "0"], ["2", "2"], ["4", "4"], ["5", "5"], ["12", "12"], ["13", "13"], ["14", "14"], ["15", "15"], ["A0", "A0"]],
    interrupt: [["0", "0"], ["2", "2"], ["4", "4"], ["5", "5"], ["12", "12"], ["13", "13"], ["14", "14"], ["15", "15"], ["A0", "A0"]],
    SDA: [["4", "4"]],
    SCL: [["5", "5"]],
    MOSI: [["13", "13"]],
    MISO: [["12", "12"]],
    SCK: [["14", "14"]],
    serial_select: [["Serial", "Serial"], ["SoftwareSerial", "mySerial"], ["SoftwareSerial1", "mySerial1"], ["SoftwareSerial2", "mySerial2"], ["SoftwareSerial3", "mySerial3"]],
    serial: 9600
};

pins["ESPectro Core"] =
pins['Arduino ESP8266 Generic'] =
pins["Generic_ESP8266"] =
pins["ESP8266_Modules"] =
pins["Generic ESP8266 Module"] =
pins["Generic ESP8285 Module"] =
pins["Adafruit HUZZAH ESP8266"] =
pins["NodeMCU 0.9 (ESP-12 Module)"] =
pins["NodeMCU 1.0 (ESP-12E Module)"] =
pins["Olimex MOD-WIFI-ESP8266(-DEV)"] =
pins["SparkFun ESP8266 Thing"] =
pins["SweetPea ESP-210"] =
pins["ESPDuino"] =
pins["Adafruit Feather HUZZAH ESP8266"] =
pins["Invent One"] =
pins["XinaBox CW01"] =
pins["ESPresso Lite 1.0"] =
pins["ESPresso Lite 2.0"] =
pins["Phoenix 1.0"] =
pins["Phoenix 2.0"] =
pins["NodeMCU 0.9"] =
pins["NodeMCU 1.0"] =
pins["Olimex MOD-WIFI-ESP8266"] =
pins["SparkFun ESP8266 Thing Dev"] =
pins["LOLIN"] =
pins["WeMos D1 R1"] =
pins["ESPino"] =
pins["ThaiEasyElec's ESPino"] =
pins["Arduino ESP8266"] =
pins["WifInfo"] =
pins["esp8266_Arduino"] =
pins["4D Systems gen4 IoD Range"] =
pins["Digistump Oak"] =
pins["WiFiduino"] =
pins["Amperka WiFi Slot"] =
pins["Seeed Wio Link"] =
pins.arduino_esp8266;

export default pins;