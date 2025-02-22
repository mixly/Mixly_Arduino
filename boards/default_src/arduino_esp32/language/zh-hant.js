import * as Mixly from 'mixly';
import TEMPLATE from '../template/board-config-message.html';

const ZhHant = {};
const { XML } = Mixly;

ZhHant.ESP32_CONFIG_TEMPLATE = TEMPLATE;

ZhHant.ESP32_CONFIG_INTRODUCE = '詳細介紹請參攷';

ZhHant.ESP32_CONFIG_MESSAGE_PSRAM = XML.render(ZhHant.ESP32_CONFIG_TEMPLATE, {
    title: 'PSRAM',
    message: 'PSRAM是存在於某些板、模塊或SoC上的內部或外部擴展RAM。',
    moreInfo: ZhHant.ESP32_CONFIG_INTRODUCE,
    href: 'https://docs.espressif.com/projects/arduino-esp32/en/latest/guides/tools_menu.html#psram',
    name: 'PSRAM'
});

ZhHant.ESP32_CONFIG_MESSAGE_PARTITION_SCHEME = XML.render(ZhHant.ESP32_CONFIG_TEMPLATE, {
    title: '分區方案',
    message: '此選項用於根據閃存大小和所需資源（如存儲區域和OTA（空中更新））選擇分區方案。',
    moreInfo: ZhHant.ESP32_CONFIG_INTRODUCE,
    href: 'https://docs.espressif.com/projects/arduino-esp32/en/latest/guides/tools_menu.html#partition-scheme',
    name: 'Partition Scheme'
});

ZhHant.ESP32_CONFIG_MESSAGE_CPU_FREQUENCY = XML.render(ZhHant.ESP32_CONFIG_TEMPLATE, {
    title: 'CPU時鐘頻率',
    message: '在此選項上，你可以選擇CPU時鐘頻率。 此選項至關重要，必須根據板上的晶振和無線模塊使用情况（Wi-Fi和藍牙）進行選擇。 在某些應用中，建議降低CPU時鐘頻率以降低功耗。 如果你不知道為什麼要更改此頻率，請保留默認選項。',
    moreInfo: ZhHant.ESP32_CONFIG_INTRODUCE,
    href: 'https://docs.espressif.com/projects/arduino-esp32/en/latest/guides/tools_menu.html#cpu-frequency',
    name: 'CPU Frequency'
});

ZhHant.ESP32_CONFIG_MESSAGE_FLASH_MODE = XML.render(ZhHant.ESP32_CONFIG_TEMPLATE, {
    title: '燒錄管道',
    message: '此選項用於選擇與閃存的SPI通信模式。 根據應用程序的不同，可以更改此模式以提高閃存通信速度。',
    moreInfo: ZhHant.ESP32_CONFIG_INTRODUCE,
    href: 'https://docs.espressif.com/projects/arduino-esp32/en/latest/guides/tools_menu.html#flash-mode',
    name: 'Flash Mode'
});

ZhHant.ESP32_CONFIG_MESSAGE_FLASH_FREQUENCY = XML.render(ZhHant.ESP32_CONFIG_TEMPLATE, {
    title: '閃存頻率',
    message: '使用此功能可選擇閃存頻率。 頻率取決於記憶體型號，如果你不知道記憶體是否支持80Mhz，你可以嘗試使用80Mhz選項上傳草圖，並通過串列監視器查看日誌輸出。',
    moreInfo: ZhHant.ESP32_CONFIG_INTRODUCE,
    href: 'https://docs.espressif.com/projects/arduino-esp32/en/latest/guides/tools_menu.html#partition-scheme',
    name: 'Flash Frequency'
});

ZhHant.ESP32_CONFIG_MESSAGE_FLASH_SIZE = XML.render(ZhHant.ESP32_CONFIG_TEMPLATE, {
    title: '閃存大小',
    message: '此選項用於選擇閃存大小。 應該根據你板上使用的閃存型號來確定閃存大小，如果你選擇了錯誤的大小，則在選擇分區方案時可能會出現問題。',
    moreInfo: ZhHant.ESP32_CONFIG_INTRODUCE,
    href: 'https://docs.espressif.com/projects/arduino-esp32/en/latest/guides/tools_menu.html#flash-size',
    name: 'Flash Size'
});

ZhHant.ESP32_CONFIG_MESSAGE_UPLOAD_SPEED = XML.render(ZhHant.ESP32_CONFIG_TEMPLATE, {
    title: '上傳速度',
    message: '要選擇上傳速度，請更改“上載速度”，此值將用於向設備燒錄程式碼。 如果在用較高的上傳速度時出現問題，請嘗試减小此值，這可能是由於外部串列到USB晶片的限制。',
    moreInfo: ZhHant.ESP32_CONFIG_INTRODUCE,
    href: 'https://docs.espressif.com/projects/arduino-esp32/en/latest/guides/tools_menu.html#upload-speed',
    name: 'Upload Speed'
});

ZhHant.ESP32_CONFIG_MESSAGE_ARDUINO_RUNS_ON = XML.render(ZhHant.ESP32_CONFIG_TEMPLATE, {
    title: 'Arduino迴圈覈心',
    message: '此選項用於選擇運行Arduino覈心任務的內核。 只有當目標SoC有2個覈心時才有效。 當你有一些繁重的任務在運行時，你可能想在與Arduino任務不同的覈心上運行此任務。 出於這個原因，你可以使用此配寘來選擇正確的覈心。',
    moreInfo: ZhHant.ESP32_CONFIG_INTRODUCE,
    href: 'https://docs.espressif.com/projects/arduino-esp32/en/latest/guides/tools_menu.html#arduino-runs-on',
    name: 'Arduino Runs On'
});

ZhHant.ESP32_CONFIG_MESSAGE_EVENTS_RUN_ON = XML.render(ZhHant.ESP32_CONFIG_TEMPLATE, {
    title: 'Arduino事件覈心',
    message: '此選項用於選擇運行Arduino事件的覈心，這僅在目標SoC具有2個覈心的情况下有效。',
    moreInfo: ZhHant.ESP32_CONFIG_INTRODUCE,
    href: 'https://docs.espressif.com/projects/arduino-esp32/en/latest/guides/tools_menu.html#events-run-on',
    name: 'Events Run On'
});

ZhHant.ESP32_CONFIG_MESSAGE_USB_CDC_ON_BOOT = XML.render(ZhHant.ESP32_CONFIG_TEMPLATE, {
    title: 'USB CDC On Boot',
    message: 'USB通信設備類，或USB CDC，是一個用於基本通信的類，被用作常規串列控制器。 該類用於在沒有任何其他外部設備連接到SoC的情况下燒寫設備。 該選項可用於在啟動時啟用或禁用該功能。 如果此選項為E啟用，則一旦設備通過USB連接，一個新的串列埠將出現在串列埠清單中，使用這個新的串列埠來燒寫設備。 這個選項也可以用於使用CDC而不是UART0通過串列監視器進行調試。',
    moreInfo: ZhHant.ESP32_CONFIG_INTRODUCE,
    href: 'https://docs.espressif.com/projects/arduino-esp32/en/latest/guides/tools_menu.html#usb-cdc-on-boot',
    name: 'USB CDC On Boot'
});

ZhHant.ESP32_CONFIG_MESSAGE_USB_FIRMWARE_MSC_ON_BOOT = XML.render(ZhHant.ESP32_CONFIG_TEMPLATE, {
    title: 'USB Firmware MSC On Boot',
    message: 'USB大容量存儲類或USB MSC是用於儲存設備（如USB閃存驅動器）的類，此選項可用於在啟動時啟用或禁用此功能。 如果此選項為啟用，則一旦設備通過USB連接，系統中將顯示一個新的儲存設備作為存儲驅動器。 使用這個新的存儲驅動器來寫入和讀取檔案，或者拖拽新的二進位固件來燒寫設備。',
    moreInfo: ZhHant.ESP32_CONFIG_INTRODUCE,
    href: 'https://docs.espressif.com/projects/arduino-esp32/en/latest/guides/tools_menu.html#usb-firmware-msc-on-boot',
    name: 'USB Firmware MSC On Boot'
});

ZhHant.ESP32_CONFIG_MESSAGE_USB_DFU_ON_BOOT = XML.render(ZhHant.ESP32_CONFIG_TEMPLATE, {
    title: 'USB DFU On Boot',
    message: 'USB設備固件升級是一個用於通過USB燒寫設備的類，此選項可用於在啟動時啟用或禁用此功能。 如果此選項為啟用，則一旦設備通過USB連接，該設備將顯示為支持USB DFU的設備。',
    moreInfo: ZhHant.ESP32_CONFIG_INTRODUCE,
    href: 'https://docs.espressif.com/projects/arduino-esp32/en/latest/guides/tools_menu.html#usb-dfu-on-boot',
    name: 'USB DFU On Boot'
});

ZhHant.ESP32_CONFIG_MESSAGE_UPLOAD_MODE = XML.render(ZhHant.ESP32_CONFIG_TEMPLATE, {
    title: '上传方式',
    moreInfo: ZhHant.ESP32_CONFIG_INTRODUCE,
    href: '#',
    name: '無'
});

ZhHant.ESP32_CONFIG_MESSAGE_USB_MODE = XML.render(ZhHant.ESP32_CONFIG_TEMPLATE, {
    title: 'USB模式',
    moreInfo: ZhHant.ESP32_CONFIG_INTRODUCE,
    href: '#',
    name: '無'
});

ZhHant.ESP32_CONFIG_MESSAGE_CORE_DEBUG_LEVEL = XML.render(ZhHant.ESP32_CONFIG_TEMPLATE, {
    title: '核心調試等級',
    message: '此選項用於選擇要列印到串行調試的Arduino核心調試等級。',
    moreInfo: ZhHant.ESP32_CONFIG_INTRODUCE,
    href: 'https://docs.espressif.com/projects/arduino-esp32/en/latest/guides/tools_menu.html#core-debug-level',
    name: 'Core Debug Level'
});

ZhHant.ESP32_CONFIG_MESSAGE_ERASE_ALL_FLASH_BEFORE_SKETCH_UPLOAD = XML.render(ZhHant.ESP32_CONFIG_TEMPLATE, {
    title: '草圖上傳前擦除所有快閃記憶體',
    message: '此選項選擇在上傳新草圖之前要擦除的快閃記憶體區域。',
    moreInfo: ZhHant.ESP32_CONFIG_INTRODUCE,
    href: 'https://docs.espressif.com/projects/arduino-esp32/en/latest/guides/tools_menu.html#erase-all-flash-before-sketch-upload',
    name: 'Erase All Flash Before Sketch Upload'
});

ZhHant.BOARD_FS = '闆卡文件管理';

export default ZhHant;