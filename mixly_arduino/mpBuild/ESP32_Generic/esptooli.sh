cd ./mpBuild/common && python ./esptool.py --port $2 --baud $1 erase_flash && python ./esptool.py --port $2 --baud $1 write_flash 0x1000 ../ESP32_MixGo/esp32.bin;echo ""
