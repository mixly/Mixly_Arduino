cd ./mpBuild/common && python ./esptool.py --port $2 --baud $1 erase_flash && python ./esptool.py --port $2 --baud $1  write_flash -ff=40m -fm=dio -fs=8MB 0x0000 ../ESP32_HandBit/target.bin; echo  ""
