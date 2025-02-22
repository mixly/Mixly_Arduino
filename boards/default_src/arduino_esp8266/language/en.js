import * as Blockly from 'blockly/core';
import * as Mixly from 'mixly';
import TEMPLATE from '../template/board-config-message.html';

const { XML } = Mixly;
const { En } = Blockly.Lang;

En.ESP8266_CONFIG_TEMPLATE = TEMPLATE;

En.ESP8266_CONFIG_INTRODUCE = 'For more information, please visit';

En.ESP8266_CONFIG_MESSAGE_XTAL = XML.render(En.ESP8266_CONFIG_TEMPLATE, {
    title: 'CPU Frequency',
    moreInfo: En.ESP8266_CONFIG_INTRODUCE,
    href: 'https://arduino-esp8266.readthedocs.io/en/latest/ideoptions.html#cpu-frequency',
    name: 'CPU Frequency'
});

En.ESP8266_CONFIG_MESSAGE_VT = XML.render(En.ESP8266_CONFIG_TEMPLATE, {
    title: 'VTable location',
    moreInfo: En.ESP8266_CONFIG_INTRODUCE,
    href: 'https://arduino-esp8266.readthedocs.io/en/latest/ideoptions.html#vtable-location',
    name: 'VTable'
});

En.ESP8266_CONFIG_MESSAGE_EXCEPTION = XML.render(En.ESP8266_CONFIG_TEMPLATE, {
    title: 'C++ Exceptions',
    moreInfo: En.ESP8266_CONFIG_INTRODUCE,
    href: 'https://arduino-esp8266.readthedocs.io/en/latest/ideoptions.html#c-exceptions',
    name: 'C++ Exceptions'
});

En.ESP8266_CONFIG_MESSAGE_STACKSMASH = XML.render(En.ESP8266_CONFIG_TEMPLATE, {
    title: 'Stack Protection',
    moreInfo: En.ESP8266_CONFIG_INTRODUCE,
    href: 'https://arduino-esp8266.readthedocs.io/en/latest/ideoptions.html#stack-protection',
    name: 'Stack Protection'
});

En.ESP8266_CONFIG_MESSAGE_SSL = XML.render(En.ESP8266_CONFIG_TEMPLATE, {
    title: 'SSL支持',
    moreInfo: En.ESP8266_CONFIG_INTRODUCE,
    href: 'https://arduino-esp8266.readthedocs.io/en/latest/ideoptions.html#ssl-support',
    name: 'SSL Support'
});

En.ESP8266_CONFIG_MESSAGE_MMU = XML.render(En.ESP8266_CONFIG_TEMPLATE, {
    title: 'Memory Management Unit',
    moreInfo: En.ESP8266_CONFIG_INTRODUCE,
    href: 'https://arduino-esp8266.readthedocs.io/en/latest/ideoptions.html#mmu-memory-management-unit',
    name: 'MMU'
});

En.ESP8266_CONFIG_MESSAGE_NON32XFER = XML.render(En.ESP8266_CONFIG_TEMPLATE, {
    title: 'Non-32-Bit Access',
    moreInfo: En.ESP8266_CONFIG_INTRODUCE,
    href: 'https://arduino-esp8266.readthedocs.io/en/latest/ideoptions.html#non-32-bit-access',
    name: 'Non-32-Bit Access'
});

En.ESP8266_CONFIG_MESSAGE_RESET_METHOD = XML.render(En.ESP8266_CONFIG_TEMPLATE, {
    title: 'Reset Method',
    moreInfo: En.ESP8266_CONFIG_INTRODUCE,
    href: 'https://arduino-esp8266.readthedocs.io/en/latest/ideoptions.html#reset-method',
    name: 'Reset Method'
});

En.ESP8266_CONFIG_MESSAGE_CRYSTAL_FREQ = XML.render(En.ESP8266_CONFIG_TEMPLATE, {
    title: 'Crystal Frequency',
    moreInfo: En.ESP8266_CONFIG_INTRODUCE,
    href: 'https://arduino-esp8266.readthedocs.io/en/latest/ideoptions.html#crystal-frequency',
    name: 'Crystal Frequency'
});

En.ESP8266_CONFIG_MESSAGE_FLASH_FREQ = XML.render(En.ESP8266_CONFIG_TEMPLATE, {
    title: 'Flash Frequency',
    moreInfo: En.ESP8266_CONFIG_INTRODUCE,
    href: '#',
    name: 'None'
});

En.ESP8266_CONFIG_MESSAGE_FLASH_MODE = XML.render(En.ESP8266_CONFIG_TEMPLATE, {
    title: 'Flash Mode',
    moreInfo: En.ESP8266_CONFIG_INTRODUCE,
    href: 'https://arduino-esp8266.readthedocs.io/en/latest/ideoptions.html#flash-mode',
    name: 'Flash Mode'
});

En.ESP8266_CONFIG_MESSAGE_EESZ = XML.render(En.ESP8266_CONFIG_TEMPLATE, {
    title: 'Flash Size',
    moreInfo: En.ESP8266_CONFIG_INTRODUCE,
    href: 'https://arduino-esp8266.readthedocs.io/en/latest/ideoptions.html#flash-size',
    name: 'Flash Size'
});

En.ESP8266_CONFIG_MESSAGE_LED = XML.render(En.ESP8266_CONFIG_TEMPLATE, {
    title: 'Builtin Led',
    moreInfo: En.ESP8266_CONFIG_INTRODUCE,
    href: '#',
    name: 'None'
});

En.ESP8266_CONFIG_MESSAGE_SDK = XML.render(En.ESP8266_CONFIG_TEMPLATE, {
    title: 'NONOS SDK Version',
    moreInfo: En.ESP8266_CONFIG_INTRODUCE,
    href: 'https://arduino-esp8266.readthedocs.io/en/latest/ideoptions.html#nonos-sdk-version',
    name: 'NONOS SDK Version'
});

En.ESP8266_CONFIG_MESSAGE_IP = XML.render(En.ESP8266_CONFIG_TEMPLATE, {
    title: 'lwIP Variant',
    moreInfo: En.ESP8266_CONFIG_INTRODUCE,
    href: 'https://arduino-esp8266.readthedocs.io/en/latest/ideoptions.html#lwip-variant',
    name: 'lwIP Variant'
});

En.ESP8266_CONFIG_MESSAGE_DBG = XML.render(En.ESP8266_CONFIG_TEMPLATE, {
    title: 'Debug port',
    moreInfo: En.ESP8266_CONFIG_INTRODUCE,
    href: 'https://arduino-esp8266.readthedocs.io/en/latest/ideoptions.html#debug-port',
    name: 'Debug port'
});

En.ESP8266_CONFIG_MESSAGE_WIPE = XML.render(En.ESP8266_CONFIG_TEMPLATE, {
    title: 'Erase Flash',
    moreInfo: En.ESP8266_CONFIG_INTRODUCE,
    href: 'https://arduino-esp8266.readthedocs.io/en/latest/ideoptions.html#erase-flash',
    name: 'Erase Flash'
});

En.ESP8266_CONFIG_MESSAGE_BAUD = XML.render(En.ESP8266_CONFIG_TEMPLATE, {
    title: 'Upload Speed',
    moreInfo: En.ESP8266_CONFIG_INTRODUCE,
    href: '#',
    name: 'None'
});

En.BOARD_FS = 'Board FS';

export default En;