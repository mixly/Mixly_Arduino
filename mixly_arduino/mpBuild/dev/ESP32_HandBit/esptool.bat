@echo off
cd mpBuild/common
esptool.exe --port %2 --baud %1 erase_flash && esptool.exe --port %2 --baud %1 write_flash -ff=40m -fm=dio -fs=8MB 0x0000 ../ESP32_HandBit/target.bin