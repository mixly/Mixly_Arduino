import * as Blockly from 'blockly/core';
import * as Mixly from 'mixly';
import TEMPLATE from '../template/board-config-message.html';

const { XML } = Mixly;
const { ZhHans } = Blockly.Lang;

ZhHans.ESP8266_CONFIG_TEMPLATE = TEMPLATE;

ZhHans.ESP8266_CONFIG_INTRODUCE = '详细介绍请参考';

ZhHans.ESP8266_CONFIG_MESSAGE_XTAL = XML.render(ZhHans.ESP8266_CONFIG_TEMPLATE, {
    title: 'CPU时钟频率',
    moreInfo: ZhHans.ESP8266_CONFIG_INTRODUCE,
    href: 'https://arduino-esp8266.readthedocs.io/en/latest/ideoptions.html#cpu-frequency',
    name: 'CPU Frequency'
});

ZhHans.ESP8266_CONFIG_MESSAGE_VT = XML.render(ZhHans.ESP8266_CONFIG_TEMPLATE, {
    title: 'VTable location',
    moreInfo: ZhHans.ESP8266_CONFIG_INTRODUCE,
    href: 'https://arduino-esp8266.readthedocs.io/en/latest/ideoptions.html#vtable-location',
    name: 'VTable'
});

ZhHans.ESP8266_CONFIG_MESSAGE_EXCEPTION = XML.render(ZhHans.ESP8266_CONFIG_TEMPLATE, {
    title: 'C++异常',
    moreInfo: ZhHans.ESP8266_CONFIG_INTRODUCE,
    href: 'https://arduino-esp8266.readthedocs.io/en/latest/ideoptions.html#c-exceptions',
    name: 'C++ Exceptions'
});

ZhHans.ESP8266_CONFIG_MESSAGE_STACKSMASH = XML.render(ZhHans.ESP8266_CONFIG_TEMPLATE, {
    title: '堆栈保护',
    moreInfo: ZhHans.ESP8266_CONFIG_INTRODUCE,
    href: 'https://arduino-esp8266.readthedocs.io/en/latest/ideoptions.html#stack-protection',
    name: 'Stack Protection'
});

ZhHans.ESP8266_CONFIG_MESSAGE_SSL = XML.render(ZhHans.ESP8266_CONFIG_TEMPLATE, {
    title: 'SSL支持',
    moreInfo: ZhHans.ESP8266_CONFIG_INTRODUCE,
    href: 'https://arduino-esp8266.readthedocs.io/en/latest/ideoptions.html#ssl-support',
    name: 'SSL Support'
});

ZhHans.ESP8266_CONFIG_MESSAGE_MMU = XML.render(ZhHans.ESP8266_CONFIG_TEMPLATE, {
    title: '内存管理单元',
    moreInfo: ZhHans.ESP8266_CONFIG_INTRODUCE,
    href: 'https://arduino-esp8266.readthedocs.io/en/latest/ideoptions.html#mmu-memory-management-unit',
    name: 'MMU'
});

ZhHans.ESP8266_CONFIG_MESSAGE_NON32XFER = XML.render(ZhHans.ESP8266_CONFIG_TEMPLATE, {
    title: '非32位访问',
    moreInfo: ZhHans.ESP8266_CONFIG_INTRODUCE,
    href: 'https://arduino-esp8266.readthedocs.io/en/latest/ideoptions.html#non-32-bit-access',
    name: 'Non-32-Bit Access'
});

ZhHans.ESP8266_CONFIG_MESSAGE_RESET_METHOD = XML.render(ZhHans.ESP8266_CONFIG_TEMPLATE, {
    title: '复位方式',
    moreInfo: ZhHans.ESP8266_CONFIG_INTRODUCE,
    href: 'https://arduino-esp8266.readthedocs.io/en/latest/ideoptions.html#reset-method',
    name: 'Reset Method'
});

ZhHans.ESP8266_CONFIG_MESSAGE_CRYSTAL_FREQ = XML.render(ZhHans.ESP8266_CONFIG_TEMPLATE, {
    title: '晶振频率',
    moreInfo: ZhHans.ESP8266_CONFIG_INTRODUCE,
    href: 'https://arduino-esp8266.readthedocs.io/en/latest/ideoptions.html#crystal-frequency',
    name: 'Crystal Frequency'
});

ZhHans.ESP8266_CONFIG_MESSAGE_FLASH_FREQ = XML.render(ZhHans.ESP8266_CONFIG_TEMPLATE, {
    title: '闪存频率',
    moreInfo: ZhHans.ESP8266_CONFIG_INTRODUCE,
    href: '#',
    name: '无'
});

ZhHans.ESP8266_CONFIG_MESSAGE_FLASH_MODE = XML.render(ZhHans.ESP8266_CONFIG_TEMPLATE, {
    title: '烧录方式',
    moreInfo: ZhHans.ESP8266_CONFIG_INTRODUCE,
    href: 'https://arduino-esp8266.readthedocs.io/en/latest/ideoptions.html#flash-mode',
    name: 'Flash Mode'
});

ZhHans.ESP8266_CONFIG_MESSAGE_EESZ = XML.render(ZhHans.ESP8266_CONFIG_TEMPLATE, {
    title: '闪存大小',
    moreInfo: ZhHans.ESP8266_CONFIG_INTRODUCE,
    href: 'https://arduino-esp8266.readthedocs.io/en/latest/ideoptions.html#flash-size',
    name: 'Flash Size'
});

ZhHans.ESP8266_CONFIG_MESSAGE_LED = XML.render(ZhHans.ESP8266_CONFIG_TEMPLATE, {
    title: '内置LED',
    moreInfo: ZhHans.ESP8266_CONFIG_INTRODUCE,
    href: '#',
    name: '无'
});

ZhHans.ESP8266_CONFIG_MESSAGE_SDK = XML.render(ZhHans.ESP8266_CONFIG_TEMPLATE, {
    title: 'NonOS SDK版本',
    moreInfo: ZhHans.ESP8266_CONFIG_INTRODUCE,
    href: 'https://arduino-esp8266.readthedocs.io/en/latest/ideoptions.html#nonos-sdk-version',
    name: 'NONOS SDK Version'
});

ZhHans.ESP8266_CONFIG_MESSAGE_IP = XML.render(ZhHans.ESP8266_CONFIG_TEMPLATE, {
    title: 'lwIP变体',
    moreInfo: ZhHans.ESP8266_CONFIG_INTRODUCE,
    href: 'https://arduino-esp8266.readthedocs.io/en/latest/ideoptions.html#lwip-variant',
    name: 'lwIP Variant'
});

ZhHans.ESP8266_CONFIG_MESSAGE_DBG = XML.render(ZhHans.ESP8266_CONFIG_TEMPLATE, {
    title: '调试端口',
    moreInfo: ZhHans.ESP8266_CONFIG_INTRODUCE,
    href: 'https://arduino-esp8266.readthedocs.io/en/latest/ideoptions.html#debug-port',
    name: 'Debug port'
});

ZhHans.ESP8266_CONFIG_MESSAGE_WIPE = XML.render(ZhHans.ESP8266_CONFIG_TEMPLATE, {
    title: '擦除Flash',
    moreInfo: ZhHans.ESP8266_CONFIG_INTRODUCE,
    href: 'https://arduino-esp8266.readthedocs.io/en/latest/ideoptions.html#erase-flash',
    name: 'Erase Flash'
});

ZhHans.ESP8266_CONFIG_MESSAGE_BAUD = XML.render(ZhHans.ESP8266_CONFIG_TEMPLATE, {
    title: '上传速度',
    moreInfo: ZhHans.ESP8266_CONFIG_INTRODUCE,
    href: '#',
    name: '无'
});

ZhHans.BOARD_FS = '板卡文件管理';

export default ZhHans;