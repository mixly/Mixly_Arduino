export default {
    "mkspiffs": {
        "version": "0.2.3",
        "linux": {
            "x32": "./mkspiffs/linux/mkspiffs-x32.bin",
            "x64": "./mkspiffs/linux/mkspiffs-x64.bin",
            "arm": "./mkspiffs/linux/mkspiffs-arm.bin"
        },
        "darwin": {
            "x64": "./mkspiffs/darwin/mkspiffs.bin",
            "arm": "./mkspiffs/darwin/mkspiffs.bin"
        },
        "win32": {
            "x32": "./mkspiffs/win32/mkspiffs.exe",
            "x64": "./mkspiffs/win32/mkspiffs.exe"
        }
    },
    "mklittlefs": {
        "version": "3.2.0",
        "linux": {
            "x32": "./mklittlefs/linux/mklittlefs-x64.bin",
            "x64": "./mklittlefs/linux/mklittlefs-x64.bin",
            "arm": "./mklittlefs/linux/mklittlefs-arm.bin"
        },
        "darwin": {
            "x64": "./mklittlefs/darwin/mklittlefs.bin",
            "arm": "./mklittlefs/darwin/mklittlefs.bin"
        },
        "win32": {
            "x32": "./mklittlefs/win32/mklittlefs-x32.exe",
            "x64": "./mklittlefs/win32/mklittlefs-x64.exe"
        }
    }
};