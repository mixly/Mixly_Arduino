export default {
    littlefs: {
        download: "{{&esptool}} --chip esp8266 --port {{&port}} --baud {{&baud}} read_flash {{&offset}} {{&size}} {{&img}} && {{&fsTool}} -u {{&usrFolder}} -b {{&blockSize}} -p {{&pageSize}} -s {{&size}} {{&img}}",
        upload: "{{&fsTool}} -c {{&usrFolder}} -b {{&blockSize}} -p {{&pageSize}} -s {{&size}} {{&img}} && {{&esptool}} --chip esp8266 --port {{&port}} --baud {{&baud}} write_flash --flash_mode {{&flashMode}} --flash_freq {{&flashFreq}} --flash_size {{&flashSize}} {{&offset}} {{&img}}"
    },
    spiffs: {
        download: "{{&esptool}} --chip esp8266 --port {{&port}} --baud {{&baud}} read_flash {{&offset}} {{&size}} {{&img}} && {{&fsTool}} -u {{&usrFolder}} -b {{&blockSize}} -p {{&pageSize}} -s {{&size}} {{&img}}",
        upload: "{{&fsTool}} -c {{&usrFolder}} -b {{&blockSize}} -p {{&pageSize}} -s {{&size}} {{&img}} && {{&esptool}} --chip esp8266 --port {{&port}} --baud {{&baud}} write_flash --flash_mode {{&flashMode}} --flash_freq {{&flashFreq}} --flash_size {{&flashSize}} {{&offset}} {{&img}}"
    },
    fatfs: {
        download: "{{&esptool}} --chip esp8266 --port {{&port}} --baud {{&baud}} read_flash {{&offset}} {{&size}} {{&img}} && {{&fsTool}} -u {{&usrFolder}} -t fatfs -s {{&size}} {{&img}}",
        upload: "{{&fsTool}} -c {{&usrFolder}} -t fatfs -s {{&size}} {{&img}} && {{&esptool}} --chip esp8266 --port {{&port}} --baud {{&baud}} write_flash --flash_mode {{&flashMode}} --flash_freq {{&flashFreq}} --flash_size {{&flashSize}} {{&offset}} {{&img}}"
    }
};