@echo off
cd mpBuild/ESP32_MixGo
esptool.exe --port %2 --baud %1 erase_flash && esptool.exe --port %2 --baud %1 write_flash 0x1000 esp32.bin 