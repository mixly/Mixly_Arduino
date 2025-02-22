export const chaoshengbo = function (_, generator) {
    var dropdown_pin1 = this.getFieldValue('PIN1');
    var dropdown_pin2 = this.getFieldValue('PIN2');
    generator.setups_['setup_output_' + dropdown_pin1] = 'pinMode(' + dropdown_pin1 + ', OUTPUT);';
    generator.setups_['setup_output_' + dropdown_pin2] = 'pinMode(' + dropdown_pin2 + ', INPUT);';
    var funcName = 'checkdistance_' + dropdown_pin1 + '_' + dropdown_pin2;
    var code = 'float' + ' ' + funcName + '() {\n'
        + '  digitalWrite(' + dropdown_pin1 + ', LOW);\n' + '  delayMicroseconds(2);\n'
        + '  digitalWrite(' + dropdown_pin1 + ', HIGH);\n' + '  delayMicroseconds(10);\n'
        + '  digitalWrite(' + dropdown_pin1 + ', LOW);\n'
        + '  float distance = pulseIn(' + dropdown_pin2 + ', HIGH) / 58.00;\n'
        + '  delay(10);\n' + '  return distance;\n'
        + '}\n';
    generator.definitions_[funcName] = code;
    return [funcName + '()', generator.ORDER_ATOMIC];
}

export const DHT = function (_, generator) {
    var sensor_type = this.getFieldValue('TYPE');
    var dropdown_pin = this.getFieldValue('PIN');
    var what = this.getFieldValue('WHAT');
    generator.definitions_['include_DHT'] = '#include <DHT.h>';
    //generator.definitions_['define_dht_pin' + dropdown_pin] = '#define DHTPIN'+dropdown_pin +' ' + dropdown_pin ;
    //generator.definitions_['define_dht_type' + dropdown_pin] = '#define DHTTYPE'+dropdown_pin +' '+ sensor_type ;
    generator.definitions_['var_declare_dht' + dropdown_pin] = 'DHT dht' + dropdown_pin + '(' + dropdown_pin + ', ' + sensor_type + ');'
    generator.setups_['DHT_SETUP' + dropdown_pin] = ' dht' + dropdown_pin + '.begin();';
    var code;
    if (what == "temperature")
        code = 'dht' + dropdown_pin + '.readTemperature()'
    else
        code = 'dht' + dropdown_pin + '.readHumidity()'
    return [code, generator.ORDER_ATOMIC];
}

//ESP32片内霍尔传感器值
export const ESP32_hallRead = function (_, generator) {
    var code = 'hallRead()';
    return [code, generator.ORDER_ATOMIC];
}

//ESP32片内温度传感器值
export const ESP32_temprature = function (_, generator) {
    generator.definitions_['wendu'] = 'extern "C"\n{\nuint8_t temprature_sens_read();\n}\nuint8_t temprature_sens_read();\n';
    var code = '(temprature_sens_read() - 32) / 1.8';
    return [code, generator.ORDER_ATOMIC];
}

export const sensor_light = function (_, generator) {
    return ['analogRead(LIGHT)', generator.ORDER_ATOMIC];
}

export const sensor_sound = function (_, generator) {
    return ['analogRead(SOUND)', generator.ORDER_ATOMIC];
}

export const ESP_TCS34725_Get_RGB = function (_, generator) {
    generator.definitions_['include_Adafruit_TCS34725'] = '#include <Adafruit_TCS34725.h>';
    generator.definitions_['var_declare_TCS34725'] = 'Adafruit_TCS34725 tcs34725 = Adafruit_TCS34725(TCS34725_INTEGRATIONTIME_24MS, TCS34725_GAIN_1X);\n';
    generator.definitions_['function_TCS34725_getRGB'] = 'uint16_t getRGB(char _type) {\n'
        + '  uint16_t _red, _green, _blue, _c;\n'
        + '  tcs34725.getRawData(&_red, &_green, &_blue, &_c);\n'
        + '  switch (_type) {\n'
        + '    case \'r\':\n'
        + '      return _red;\n'
        + '    case \'g\':\n'
        + '      return _green;\n'
        + '    case \'b\':\n'
        + '      return _blue;\n'
        + '    default:\n'
        + '      return _c;\n'
        + '  }\n'
        + '}\n';
    generator.setups_['setup_Adafruit_TCS34725'] = 'tcs34725.begin(0x29);';
    const RGB = this.getFieldValue('TCS34725_COLOR');
    return ['getRGB(\'' + RGB + '\')', generator.ORDER_ATOMIC];
}