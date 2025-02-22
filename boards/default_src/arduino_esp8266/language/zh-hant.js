import * as Blockly from 'blockly/core';
import * as Mixly from 'mixly';
import TEMPLATE from '../template/board-config-message.html';

const { XML } = Mixly;
const { ZhHant } = Blockly.Lang;

ZhHant.ESP8266_CONFIG_TEMPLATE = TEMPLATE;

ZhHant.ESP8266_CONFIG_INTRODUCE = '詳細介紹請參攷';

ZhHant.ESP8266_CONFIG_MESSAGE_XTAL = XML.render(ZhHant.ESP8266_CONFIG_TEMPLATE, {
    title: 'CPU時鐘頻率',
    moreInfo: ZhHant.ESP8266_CONFIG_INTRODUCE,
    href: 'https://arduino-esp8266.readthedocs.io/en/latest/ideoptions.html#cpu-frequency',
    name: 'CPU Frequency'
});

ZhHant.ESP8266_CONFIG_MESSAGE_VT = XML.render(ZhHant.ESP8266_CONFIG_TEMPLATE, {
    title: 'VTable location',
    moreInfo: ZhHant.ESP8266_CONFIG_INTRODUCE,
    href: 'https://arduino-esp8266.readthedocs.io/en/latest/ideoptions.html#vtable-location',
    name: 'VTable'
});

ZhHant.ESP8266_CONFIG_MESSAGE_EXCEPTION = XML.render(ZhHant.ESP8266_CONFIG_TEMPLATE, {
    title: 'C++异常',
    moreInfo: ZhHant.ESP8266_CONFIG_INTRODUCE,
    href: 'https://arduino-esp8266.readthedocs.io/en/latest/ideoptions.html#c-exceptions',
    name: 'C++ Exceptions'
});

ZhHant.ESP8266_CONFIG_MESSAGE_STACKSMASH = XML.render(ZhHant.ESP8266_CONFIG_TEMPLATE, {
    title: '堆棧保護',
    moreInfo: ZhHant.ESP8266_CONFIG_INTRODUCE,
    href: 'https://arduino-esp8266.readthedocs.io/en/latest/ideoptions.html#stack-protection',
    name: 'Stack Protection'
});

ZhHant.ESP8266_CONFIG_MESSAGE_SSL = XML.render(ZhHant.ESP8266_CONFIG_TEMPLATE, {
    title: 'SSL支持',
    moreInfo: ZhHant.ESP8266_CONFIG_INTRODUCE,
    href: 'https://arduino-esp8266.readthedocs.io/en/latest/ideoptions.html#ssl-support',
    name: 'SSL Support'
});

ZhHant.ESP8266_CONFIG_MESSAGE_MMU = XML.render(ZhHant.ESP8266_CONFIG_TEMPLATE, {
    title: '記憶體管理單元',
    moreInfo: ZhHant.ESP8266_CONFIG_INTRODUCE,
    href: 'https://arduino-esp8266.readthedocs.io/en/latest/ideoptions.html#mmu-memory-management-unit',
    name: 'MMU'
});

ZhHant.ESP8266_CONFIG_MESSAGE_NON32XFER = XML.render(ZhHant.ESP8266_CONFIG_TEMPLATE, {
    title: '非32比特訪問',
    moreInfo: ZhHant.ESP8266_CONFIG_INTRODUCE,
    href: 'https://arduino-esp8266.readthedocs.io/en/latest/ideoptions.html#non-32-bit-access',
    name: 'Non-32-Bit Access'
});

ZhHant.ESP8266_CONFIG_MESSAGE_RESET_METHOD = XML.render(ZhHant.ESP8266_CONFIG_TEMPLATE, {
    title: '復位管道',
    moreInfo: ZhHant.ESP8266_CONFIG_INTRODUCE,
    href: 'https://arduino-esp8266.readthedocs.io/en/latest/ideoptions.html#reset-method',
    name: 'Reset Method'
});

ZhHant.ESP8266_CONFIG_MESSAGE_CRYSTAL_FREQ = XML.render(ZhHant.ESP8266_CONFIG_TEMPLATE, {
    title: '晶振頻率',
    moreInfo: ZhHant.ESP8266_CONFIG_INTRODUCE,
    href: 'https://arduino-esp8266.readthedocs.io/en/latest/ideoptions.html#crystal-frequency',
    name: 'Crystal Frequency'
});

ZhHant.ESP8266_CONFIG_MESSAGE_FLASH_FREQ = XML.render(ZhHant.ESP8266_CONFIG_TEMPLATE, {
    title: '閃存頻率',
    moreInfo: ZhHant.ESP8266_CONFIG_INTRODUCE,
    href: '#',
    name: '無'
});

ZhHant.ESP8266_CONFIG_MESSAGE_FLASH_MODE = XML.render(ZhHant.ESP8266_CONFIG_TEMPLATE, {
    title: '燒錄管道',
    moreInfo: ZhHant.ESP8266_CONFIG_INTRODUCE,
    href: 'https://arduino-esp8266.readthedocs.io/en/latest/ideoptions.html#flash-mode',
    name: 'Flash Mode'
});

ZhHant.ESP8266_CONFIG_MESSAGE_EESZ = XML.render(ZhHant.ESP8266_CONFIG_TEMPLATE, {
    title: '閃存大小',
    moreInfo: ZhHant.ESP8266_CONFIG_INTRODUCE,
    href: 'https://arduino-esp8266.readthedocs.io/en/latest/ideoptions.html#flash-size',
    name: 'Flash Size'
});

ZhHant.ESP8266_CONFIG_MESSAGE_LED = XML.render(ZhHant.ESP8266_CONFIG_TEMPLATE, {
    title: '內寘LED',
    moreInfo: ZhHant.ESP8266_CONFIG_INTRODUCE,
    href: '#',
    name: '無'
});

ZhHant.ESP8266_CONFIG_MESSAGE_SDK = XML.render(ZhHant.ESP8266_CONFIG_TEMPLATE, {
    title: 'NonOS SDK版本',
    moreInfo: ZhHant.ESP8266_CONFIG_INTRODUCE,
    href: 'https://arduino-esp8266.readthedocs.io/en/latest/ideoptions.html#nonos-sdk-version',
    name: 'NONOS SDK Version'
});

ZhHant.ESP8266_CONFIG_MESSAGE_IP = XML.render(ZhHant.ESP8266_CONFIG_TEMPLATE, {
    title: 'lwIP變體',
    moreInfo: ZhHant.ESP8266_CONFIG_INTRODUCE,
    href: 'https://arduino-esp8266.readthedocs.io/en/latest/ideoptions.html#lwip-variant',
    name: 'lwIP Variant'
});

ZhHant.ESP8266_CONFIG_MESSAGE_DBG = XML.render(ZhHant.ESP8266_CONFIG_TEMPLATE, {
    title: '調試埠',
    moreInfo: ZhHant.ESP8266_CONFIG_INTRODUCE,
    href: 'https://arduino-esp8266.readthedocs.io/en/latest/ideoptions.html#debug-port',
    name: 'Debug port'
});

ZhHant.ESP8266_CONFIG_MESSAGE_WIPE = XML.render(ZhHant.ESP8266_CONFIG_TEMPLATE, {
    title: '擦除Flash',
    moreInfo: ZhHant.ESP8266_CONFIG_INTRODUCE,
    href: 'https://arduino-esp8266.readthedocs.io/en/latest/ideoptions.html#erase-flash',
    name: 'Erase Flash'
});

ZhHant.ESP8266_CONFIG_MESSAGE_BAUD = XML.render(ZhHant.ESP8266_CONFIG_TEMPLATE, {
    title: '上傳速度',
    moreInfo: ZhHant.ESP8266_CONFIG_INTRODUCE,
    href: '#',
    name: '無'
});

ZhHant.BOARD_FS = '闆卡文件管理';

export default ZhHant;