cd ./mpBuild/common && ./esptool --port $2 --baud $1 erase_flash && ./esptool --port $2 --baud $1 write_flash -ff=40m -fm=dio -fs=8MB 0x0000 ../ESP32_HandBit/target.bin; echo ""
