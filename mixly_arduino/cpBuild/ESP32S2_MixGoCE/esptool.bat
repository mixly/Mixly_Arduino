@echo off
cd cpBuild/common
esptool.exe --port %2 --baud %1 --after=no_reset write_flash 0x0000 ../ESP32S2_MixGoCE/mixgoce.bin 
