cd ./mpBuild/ESP32_MixGo && ./esptool --port $2 --baud $1 erase_flash && ./esptool --port $2 --baud $1 write_flash 0x1000 esp32.bin;echo ""
