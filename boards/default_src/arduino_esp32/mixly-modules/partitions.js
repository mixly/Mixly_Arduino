import { FSBoardHandler } from 'mixly';

export default {
    'app3M_fat9M_16MB': {
        type: FSBoardHandler.FsType.FATFS,
        offset: 0x610000,
        size: 0x9F0000,
        blockSize: 4096,
        pageSize: 256
    },
    'default': {
        type: FSBoardHandler.FsType.SPIFFS,
        offset: 0x290000,
        size: 0x160000,
        blockSize: 4096,
        pageSize: 256
    },
    'default_8MB': {
        type: FSBoardHandler.FsType.SPIFFS,
        offset: 0x670000,
        size: 0x190000,
        blockSize: 4096,
        pageSize: 256
    },
    'default_16MB': {
        type: FSBoardHandler.FsType.SPIFFS,
        offset: 0xc90000,
        size: 0x370000,
        blockSize: 4096,
        pageSize: 256
    },
    'defaultffat': {
        type: FSBoardHandler.FsType.FATFS,
        offset: 0x290000 + 4096,
        size: 0x160000 - 4096,
        blockSize: 4096,
        pageSize: 256
    },
    'ffat': {
        type: FSBoardHandler.FsType.FATFS,
        offset: 0x410000 + 4096,
        size: 0xBF0000,
        blockSize: 4096,
        pageSize: 256
    },
    'huge_app': {
        type: FSBoardHandler.FsType.SPIFFS,
        offset: 0x310000,
        size: 0xF0000,
        blockSize: 4096,
        pageSize: 256
    },
    'large_spiffs_16MB': {
        type: FSBoardHandler.FsType.SPIFFS,
        offset: 0x910000,
        size: 0x6F0000,
        blockSize: 4096,
        pageSize: 256
    },
    'min_spiffs': {
        type: FSBoardHandler.FsType.SPIFFS,
        offset: 0x3D0000,
        size: 0x30000,
        blockSize: 4096,
        pageSize: 256
    },
    'minimal': {
        type: FSBoardHandler.FsType.SPIFFS,
        offset: 0x150000,
        size: 0xB0000
    },
    'no_ota': {
        type: FSBoardHandler.FsType.SPIFFS,
        offset: 0x210000,
        size: 0x1F0000,
        blockSize: 4096,
        pageSize: 256
    },
    'noota_3g': {
        type: FSBoardHandler.FsType.SPIFFS,
        offset: 0x110000,
        size: 0x2F0000,
        blockSize: 4096,
        pageSize: 256
    },
    'noota_3gffat': {
        type: FSBoardHandler.FsType.FATFS,
        offset: 0x110000,
        size: 0x2F0000,
        blockSize: 4096,
        pageSize: 256
    },
    'noota_ffat': {
        type: FSBoardHandler.FsType.FATFS,
        offset: 0x210000,
        size: 0x1F0000,
        blockSize: 4096,
        pageSize: 256
    },
    'rainmaker': {
        type: FSBoardHandler.FsType.FATFS,
        offset: 0x290000,
        size: 0x160000,
        blockSize: 4096,
        pageSize: 256
    }
};