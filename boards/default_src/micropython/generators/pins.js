export const pins_digital = function (_, generator) {
    var code = this.getFieldValue('PIN');
    return [code, generator.ORDER_ATOMIC];
}

export const pins_button = pins_digital;
export const pins_digital_pin = pins_digital;
export const pins_analog_pin = pins_digital;
export const pins_analog = pins_digital;
export const pins_pwm_pin = pins_digital;
export const pins_pwm = pins_digital;
export const pins_dac_pin = pins_digital;
export const pins_dac = pins_digital;
export const pins_touch_pin = pins_digital;
export const pins_touch = pins_digital;
export const espnow_channel = pins_digital;
export const pins_interrupt = pins_digital;
export const pins_serial = pins_digital;
export const pins_builtinimg = pins_digital;
export const pins_imglist = pins_digital;
export const pins_playlist = pins_digital;
export const pins_axis = pins_digital;
export const pins_exlcdh = pins_digital;
export const pins_exlcdv = pins_digital;
export const pins_brightness = pins_digital;
export const pins_tone_notes = pins_digital;
export const pins_radio_power = pins_digital;
export const pins_radio_datarate = pins_digital;
export const pins_one_more = pins_digital;
export const pins_digital_dot = pins_digital;