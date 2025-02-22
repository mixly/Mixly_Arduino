import * as Mixly from 'mixly';
import TEMPLATE from '../template/board-config-message.html';

const ZhHans = {};
const { XML } = Mixly;

ZhHans.ESP32_CONFIG_TEMPLATE = TEMPLATE;

ZhHans.ESP32_CONFIG_INTRODUCE = '详细介绍请参考';

ZhHans.ESP32_CONFIG_MESSAGE_PSRAM = XML.render(ZhHans.ESP32_CONFIG_TEMPLATE, {
    title: 'PSRAM',
    message: 'PSRAM是存在于某些板、模块或SoC上的内部或外部扩展RAM。',
    moreInfo: ZhHans.ESP32_CONFIG_INTRODUCE,
    href: 'https://docs.espressif.com/projects/arduino-esp32/en/latest/guides/tools_menu.html#psram',
    name: 'PSRAM'
});

ZhHans.ESP32_CONFIG_MESSAGE_PARTITION_SCHEME = XML.render(ZhHans.ESP32_CONFIG_TEMPLATE, {
    title: '分区方案',
    message: '此选项用于根据闪存大小和所需资源（如存储区域和OTA（空中更新））选择分区方案。请注意根据闪存大小选择正确的分区，如果你选择了错误的分区，系统将崩溃。',
    moreInfo: ZhHans.ESP32_CONFIG_INTRODUCE,
    href: 'https://docs.espressif.com/projects/arduino-esp32/en/latest/guides/tools_menu.html#partition-scheme',
    name: 'Partition Scheme'
});

ZhHans.ESP32_CONFIG_MESSAGE_CPU_FREQUENCY = XML.render(ZhHans.ESP32_CONFIG_TEMPLATE, {
    title: 'CPU时钟频率',
    message: '在此选项上，你可以选择CPU时钟频率。此选项至关重要，必须根据板上的晶振和无线模块使用情况（Wi-Fi和蓝牙）进行选择。在某些应用中，建议降低CPU时钟频率以降低功耗。如果你不知道为什么要更改此频率，请保留默认选项。',
    moreInfo: ZhHans.ESP32_CONFIG_INTRODUCE,
    href: 'https://docs.espressif.com/projects/arduino-esp32/en/latest/guides/tools_menu.html#cpu-frequency',
    name: 'CPU Frequency'
});

ZhHans.ESP32_CONFIG_MESSAGE_FLASH_MODE = XML.render(ZhHans.ESP32_CONFIG_TEMPLATE, {
    title: '烧录方式',
    message: '此选项用于选择与闪存的SPI通信模式。根据应用程序的不同，可以更改此模式以提高闪存通信速度。',
    moreInfo: ZhHans.ESP32_CONFIG_INTRODUCE,
    href: 'https://docs.espressif.com/projects/arduino-esp32/en/latest/guides/tools_menu.html#flash-mode',
    name: 'Flash Mode'
});

ZhHans.ESP32_CONFIG_MESSAGE_FLASH_FREQUENCY = XML.render(ZhHans.ESP32_CONFIG_TEMPLATE, {
    title: '闪存频率',
    message: '使用此功能可选择闪存频率。频率取决于内存型号，如果你不知道内存是否支持80Mhz，你可以尝试使用80Mhz选项上传草图，并通过串行监视器查看日志输出。',
    moreInfo: ZhHans.ESP32_CONFIG_INTRODUCE,
    href: 'https://docs.espressif.com/projects/arduino-esp32/en/latest/guides/tools_menu.html#partition-scheme',
    name: 'Flash Frequency'
});

ZhHans.ESP32_CONFIG_MESSAGE_FLASH_SIZE = XML.render(ZhHans.ESP32_CONFIG_TEMPLATE, {
    title: '闪存大小',
    message: '此选项用于选择闪存大小。应该根据你板上使用的闪存型号来确定闪存大小，如果你选择了错误的大小，则在选择分区方案时可能会出现问题。',
    moreInfo: ZhHans.ESP32_CONFIG_INTRODUCE,
    href: 'https://docs.espressif.com/projects/arduino-esp32/en/latest/guides/tools_menu.html#flash-size',
    name: 'Flash Size'
});

ZhHans.ESP32_CONFIG_MESSAGE_UPLOAD_SPEED = XML.render(ZhHans.ESP32_CONFIG_TEMPLATE, {
    title: '上传速度',
    message: '要选择上传速度，请更改“上载速度”，此值将用于向设备烧录代码。如果在用较高的上传速度时出现问题，请尝试减小此值，这可能是由于外部串行到USB芯片的限制。',
    moreInfo: ZhHans.ESP32_CONFIG_INTRODUCE,
    href: 'https://docs.espressif.com/projects/arduino-esp32/en/latest/guides/tools_menu.html#upload-speed',
    name: 'Upload Speed'
});

ZhHans.ESP32_CONFIG_MESSAGE_ARDUINO_RUNS_ON = XML.render(ZhHans.ESP32_CONFIG_TEMPLATE, {
    title: 'Arduino循环核心',
    message: '此选项用于选择运行Arduino核心任务的内核。只有当目标SoC有2个核心时才有效。当你有一些繁重的任务在运行时，你可能想在与Arduino任务不同的核心上运行此任务。出于这个原因，你可以使用此配置来选择正确的核心。',
    moreInfo: ZhHans.ESP32_CONFIG_INTRODUCE,
    href: 'https://docs.espressif.com/projects/arduino-esp32/en/latest/guides/tools_menu.html#arduino-runs-on',
    name: 'Arduino Runs On'
});

ZhHans.ESP32_CONFIG_MESSAGE_EVENTS_RUN_ON = XML.render(ZhHans.ESP32_CONFIG_TEMPLATE, {
    title: 'Arduino事件核心',
    message: '此选项用于选择运行Arduino事件的核心，这仅在目标SoC具有2个核心的情况下有效。',
    moreInfo: ZhHans.ESP32_CONFIG_INTRODUCE,
    href: 'https://docs.espressif.com/projects/arduino-esp32/en/latest/guides/tools_menu.html#events-run-on',
    name: 'Events Run On'
});

ZhHans.ESP32_CONFIG_MESSAGE_USB_CDC_ON_BOOT = XML.render(ZhHans.ESP32_CONFIG_TEMPLATE, {
    title: 'USB CDC On Boot',
    message: 'USB通信设备类，或USB CDC，是一个用于基本通信的类，被用作常规串行控制器。该类用于在没有任何其他外部设备连接到SoC的情况下烧写设备。该选项可用于在启动时启用或禁用该功能。如果此选项为E启用，则一旦设备通过USB连接，一个新的串行端口将出现在串行端口列表中，使用这个新的串行端口来烧写设备。这个选项也可以用于使用CDC而不是UART0通过串行监视器进行调试。',
    moreInfo: ZhHans.ESP32_CONFIG_INTRODUCE,
    href: 'https://docs.espressif.com/projects/arduino-esp32/en/latest/guides/tools_menu.html#usb-cdc-on-boot',
    name: 'USB CDC On Boot'
});

ZhHans.ESP32_CONFIG_MESSAGE_USB_FIRMWARE_MSC_ON_BOOT = XML.render(ZhHans.ESP32_CONFIG_TEMPLATE, {
    title: 'USB Firmware MSC On Boot',
    message: 'USB大容量存储类或USB MSC是用于存储设备（如USB闪存驱动器）的类，此选项可用于在启动时启用或禁用此功能。如果此选项为启用，则一旦设备通过USB连接，系统中将显示一个新的存储设备作为存储驱动器。使用这个新的存储驱动器来写入和读取文件，或者拖拽新的二进制固件来烧写设备。',
    moreInfo: ZhHans.ESP32_CONFIG_INTRODUCE,
    href: 'https://docs.espressif.com/projects/arduino-esp32/en/latest/guides/tools_menu.html#usb-firmware-msc-on-boot',
    name: 'USB Firmware MSC On Boot'
});

ZhHans.ESP32_CONFIG_MESSAGE_USB_DFU_ON_BOOT = XML.render(ZhHans.ESP32_CONFIG_TEMPLATE, {
    title: 'USB DFU On Boot',
    message: 'USB设备固件升级是一个用于通过USB烧写设备的类，此选项可用于在启动时启用或禁用此功能。如果此选项为启用，则一旦设备通过USB连接，该设备将显示为支持USB DFU的设备。',
    moreInfo: ZhHans.ESP32_CONFIG_INTRODUCE,
    href: 'https://docs.espressif.com/projects/arduino-esp32/en/latest/guides/tools_menu.html#usb-dfu-on-boot',
    name: 'USB DFU On Boot'
});

ZhHans.ESP32_CONFIG_MESSAGE_UPLOAD_MODE = XML.render(ZhHans.ESP32_CONFIG_TEMPLATE, {
    title: '上传方式',
    moreInfo: ZhHans.ESP32_CONFIG_INTRODUCE,
    href: '#',
    name: '无'
});

ZhHans.ESP32_CONFIG_MESSAGE_USB_MODE = XML.render(ZhHans.ESP32_CONFIG_TEMPLATE, {
    title: 'USB模式',
    moreInfo: ZhHans.ESP32_CONFIG_INTRODUCE,
    href: '#',
    name: '无'
});

ZhHans.ESP32_CONFIG_MESSAGE_CORE_DEBUG_LEVEL = XML.render(ZhHans.ESP32_CONFIG_TEMPLATE, {
    title: '核心调试级别',
    message: '此选项用于选择要打印到串行调试的Arduino核心调试级别。',
    moreInfo: ZhHans.ESP32_CONFIG_INTRODUCE,
    href: 'https://docs.espressif.com/projects/arduino-esp32/en/latest/guides/tools_menu.html#core-debug-level',
    name: 'Core Debug Level'
});

ZhHans.ESP32_CONFIG_MESSAGE_ERASE_ALL_FLASH_BEFORE_SKETCH_UPLOAD = XML.render(ZhHans.ESP32_CONFIG_TEMPLATE, {
    title: '草图上传前擦除所有闪存',
    message: '此选项选择在上传新草图之前要擦除的闪存区域。',
    moreInfo: ZhHans.ESP32_CONFIG_INTRODUCE,
    href: 'https://docs.espressif.com/projects/arduino-esp32/en/latest/guides/tools_menu.html#erase-all-flash-before-sketch-upload',
    name: 'Erase All Flash Before Sketch Upload'
});

ZhHans.BOARD_FS = '板卡文件管理';

export default ZhHans;