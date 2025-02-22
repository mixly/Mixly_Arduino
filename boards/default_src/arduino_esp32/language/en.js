import * as Mixly from 'mixly';
import TEMPLATE from '../template/board-config-message.html';

const En = {};
const { XML } = Mixly;

En.ESP32_CONFIG_TEMPLATE = TEMPLATE;

En.ESP32_CONFIG_INTRODUCE = 'For more information, please visit';

En.ESP32_CONFIG_MESSAGE_PSRAM = XML.render(En.ESP32_CONFIG_TEMPLATE, {
    title: 'PSRAM',
    message: 'The PSRAM is an internal or external extended RAM present on some boards, modules or SoC.',
    moreInfo: En.ESP32_CONFIG_INTRODUCE,
    href: 'https://docs.espressif.com/projects/arduino-esp32/en/latest/guides/tools_menu.html#psram',
    name: 'PSRAM'
});

En.ESP32_CONFIG_MESSAGE_PARTITION_SCHEME = XML.render(En.ESP32_CONFIG_TEMPLATE, {
    title: 'Partition Scheme',
    message: 'This option is used to select the partition model according to the flash size and the resources needed, like storage area and OTA (Over The Air updates). Be careful selecting the right partition according to the flash size. If you select the wrong partition, the system will crash.',
    moreInfo: En.ESP32_CONFIG_INTRODUCE,
    href: 'https://docs.espressif.com/projects/arduino-esp32/en/latest/guides/tools_menu.html#partition-scheme',
    name: 'Partition Scheme'
});

En.ESP32_CONFIG_MESSAGE_CPU_FREQUENCY = XML.render(En.ESP32_CONFIG_TEMPLATE, {
    title: 'CPU Frequency',
    message: 'On this option, you can select the CPU clock frequency. This option is critical and must be selected according to the high-frequency crystal present on the board and the radio usage (Wi-Fi and Bluetooth). In some applications, reducing the CPU clock frequency is recommended in order to reduce power consumption. If you don’t know why you should change this frequency, leave the default option.',
    moreInfo: En.ESP32_CONFIG_INTRODUCE,
    href: 'https://docs.espressif.com/projects/arduino-esp32/en/latest/guides/tools_menu.html#cpu-frequency',
    name: 'CPU Frequency'
});

En.ESP32_CONFIG_MESSAGE_FLASH_MODE = XML.render(En.ESP32_CONFIG_TEMPLATE, {
    title: 'Flash Mode',
    message: 'This option is used to select the SPI communication mode with the flash memory. Depending on the application, this mode can be changed in order to increase the flash communication speed.',
    moreInfo: En.ESP32_CONFIG_INTRODUCE,
    href: 'https://docs.espressif.com/projects/arduino-esp32/en/latest/guides/tools_menu.html#flash-mode',
    name: 'Flash Mode'
});

En.ESP32_CONFIG_MESSAGE_FLASH_FREQUENCY = XML.render(En.ESP32_CONFIG_TEMPLATE, {
    title: 'Flash Frequency',
    message: 'Use this function to select the flash memory frequency. The frequency will be dependent on the memory model.',
    moreInfo: En.ESP32_CONFIG_INTRODUCE,
    href: 'https://docs.espressif.com/projects/arduino-esp32/en/latest/guides/tools_menu.html#partition-scheme',
    name: 'Flash Frequency'
});

En.ESP32_CONFIG_MESSAGE_FLASH_SIZE = XML.render(En.ESP32_CONFIG_TEMPLATE, {
    title: 'Flash Size',
    message: 'This option is used to select the flash size. The flash size should be selected according to the flash model used on your board. If you choose the wrong size, you may have issues when selecting the partition scheme.',
    moreInfo: En.ESP32_CONFIG_INTRODUCE,
    href: 'https://docs.espressif.com/projects/arduino-esp32/en/latest/guides/tools_menu.html#flash-size',
    name: 'Flash Size'
});

En.ESP32_CONFIG_MESSAGE_UPLOAD_SPEED = XML.render(En.ESP32_CONFIG_TEMPLATE, {
    title: 'Upload Speed',
    message: 'To select the flashing speed, change the Upload Speed. This value will be used for flashing the code to the device. If you have issues while flashing the device at high speed, try to decrease this value. This could be due to the external serial-to-USB chip limitations.',
    moreInfo: En.ESP32_CONFIG_INTRODUCE,
    href: 'https://docs.espressif.com/projects/arduino-esp32/en/latest/guides/tools_menu.html#upload-speed',
    name: 'Upload Speed'
});

En.ESP32_CONFIG_MESSAGE_ARDUINO_RUNS_ON = XML.render(En.ESP32_CONFIG_TEMPLATE, {
    title: 'Arduino Runs On',
    message: 'This function is used to select the core that runs the Arduino core. This is only valid if the target SoC has 2 cores. When you have some heavy task running, you might want to run this task on a different core than the Arduino tasks. For this reason, you have this configuration to select the right core.',
    moreInfo: En.ESP32_CONFIG_INTRODUCE,
    href: 'https://docs.espressif.com/projects/arduino-esp32/en/latest/guides/tools_menu.html#arduino-runs-on',
    name: 'Arduino Runs On'
});

En.ESP32_CONFIG_MESSAGE_EVENTS_RUN_ON = XML.render(En.ESP32_CONFIG_TEMPLATE, {
    title: 'Events Run On',
    message: 'This function is also used to select the core that runs the Arduino events. This is only valid if the target SoC has 2 cores.',
    moreInfo: En.ESP32_CONFIG_INTRODUCE,
    href: 'https://docs.espressif.com/projects/arduino-esp32/en/latest/guides/tools_menu.html#events-run-on',
    name: 'Events Run On'
});

En.ESP32_CONFIG_MESSAGE_USB_CDC_ON_BOOT = XML.render(En.ESP32_CONFIG_TEMPLATE, {
    title: 'USB CDC On Boot',
    message: 'The USB Communications Device Class, or USB CDC, is a class used for basic communication to be used as a regular serial controller (like RS-232). This class is used for flashing the device without any other external device attached to the SoC. This option can be used to Enable or Disable this function at the boot. If this option is Enabled, once the device is connected via USB, one new serial port will appear in the list of the serial ports. Use this new serial port for flashing the device.',
    moreInfo: En.ESP32_CONFIG_INTRODUCE,
    href: 'https://docs.espressif.com/projects/arduino-esp32/en/latest/guides/tools_menu.html#usb-cdc-on-boot',
    name: 'USB CDC On Boot'
});

En.ESP32_CONFIG_MESSAGE_USB_FIRMWARE_MSC_ON_BOOT = XML.render(En.ESP32_CONFIG_TEMPLATE, {
    title: 'USB Firmware MSC On Boot',
    message: 'The USB Mass Storage Class, or USB MSC, is a class used for storage devices, like a USB flash drive. This option can be used to Enable or Disable this function at the boot. If this option is Enabled, once the device is connected via USB, one new storage device will appear in the system as a storage drive. Use this new storage drive to write and read files or to drop a new firmware binary to flash the device.',
    moreInfo: En.ESP32_CONFIG_INTRODUCE,
    href: 'https://docs.espressif.com/projects/arduino-esp32/en/latest/guides/tools_menu.html#usb-firmware-msc-on-boot',
    name: 'USB Firmware MSC On Boot'
});

En.ESP32_CONFIG_MESSAGE_USB_DFU_ON_BOOT = XML.render(En.ESP32_CONFIG_TEMPLATE, {
    title: 'USB DFU On Boot',
    message: 'The USB Device Firmware Upgrade is a class used for flashing the device through USB. This option can be used to Enable or Disable this function at the boot. If this option is Enabled, once the device is connected via USB, the device will appear as a USB DFU capable device.',
    moreInfo: En.ESP32_CONFIG_INTRODUCE,
    href: 'https://docs.espressif.com/projects/arduino-esp32/en/latest/guides/tools_menu.html#usb-dfu-on-boot',
    name: 'USB DFU On Boot'
});

En.ESP32_CONFIG_MESSAGE_UPLOAD_MODE = XML.render(En.ESP32_CONFIG_TEMPLATE, {
    title: 'Upload Mode',
    moreInfo: En.ESP32_CONFIG_INTRODUCE,
    href: '#',
    name: 'None'
});

En.ESP32_CONFIG_MESSAGE_USB_MODE = XML.render(En.ESP32_CONFIG_TEMPLATE, {
    title: 'USB Mode',
    moreInfo: En.ESP32_CONFIG_INTRODUCE,
    href: '#',
    name: 'None'
});

En.ESP32_CONFIG_MESSAGE_CORE_DEBUG_LEVEL = XML.render(En.ESP32_CONFIG_TEMPLATE, {
    title: 'Core Debug Level',
    message: 'This option is used to select the Arduino core debugging level to be printed to the serial debug.',
    moreInfo: En.ESP32_CONFIG_INTRODUCE,
    href: 'https://docs.espressif.com/projects/arduino-esp32/en/latest/guides/tools_menu.html#core-debug-level',
    name: 'Core Debug Level'
});

En.ESP32_CONFIG_MESSAGE_ERASE_ALL_FLASH_BEFORE_SKETCH_UPLOAD = XML.render(En.ESP32_CONFIG_TEMPLATE, {
    title: 'Erase All Flash Before Sketch Upload',
    message: 'This option selects the flash memory region to be erased before uploading the new sketch.',
    moreInfo: En.ESP32_CONFIG_INTRODUCE,
    href: 'https://docs.espressif.com/projects/arduino-esp32/en/latest/guides/tools_menu.html#erase-all-flash-before-sketch-upload',
    name: 'Erase All Flash Before Sketch Upload'
});

En.BOARD_FS = 'Board FS';

export default En;