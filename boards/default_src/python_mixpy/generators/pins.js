export const pins_digital = function (_, generator) {
    var code = this.getFieldValue('PIN');
    return [code, generator.ORDER_ATOMIC];
}

export const pins_digital_write = pins_digital;
export const pins_digital_read = pins_digital;
export const pins_analog_write = pins_digital;
export const pins_analog_read = pins_digital;