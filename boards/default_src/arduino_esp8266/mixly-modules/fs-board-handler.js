import { Env, Boards, FSBoardHandler } from 'mixly';
import * as path from 'path';
import COMMANDS from './commands';
import BOARDS_EESZ_INFO from './boards-eesz-info';
import MENU from './menu';
import FS_INFO from './fs-info';

export default class FSArduEsp8266Handler extends FSBoardHandler {
    constructor() {
        super();
        for (let key in COMMANDS) {
            this.setFSCommands(key, COMMANDS[key]);
        }
    }

    onBeforeUpload() {
        const boardKey = Boards.getSelectedBoardKey();
        const flashMode = Boards.getSelectedBoardConfigParam('FlashMode') || 'keep';
        let flashFreq = Boards.getSelectedBoardConfigParam('FlashFreq') || 'keep';
        if (flashFreq !== 'keep') {
            flashFreq += 'm';
        }
        const baud = Boards.getSelectedBoardConfigParam('baud') || '115200';
        const eesz = Boards.getSelectedBoardConfigParam('eesz');
        const info = BOARDS_EESZ_INFO[boardKey][eesz];
        const partition = {
            offset: info.spiffs_start,
            size: info.spiffs_end - info.spiffs_start,
            blockSize: info.spiffs_blocksize,
            pageSize: info.spiffs_pagesize
        };
        const flashSize = info.flash_size + 'B';
        const fsTool = this.getFSToolPath();
        const img = path.join(Env.boardDirPath, 'build', 'script.img');
        this.updateConfig({
            fsTool, img, flashMode, flashFreq, flashSize, baud,
            ...partition
        });
    }

    onBeforeDownload() {
        const boardKey = Boards.getSelectedBoardKey();
        const baud = Boards.getSelectedBoardConfigParam('baud') || '115200';
        const eesz = Boards.getSelectedBoardConfigParam('eesz');
        const info = BOARDS_EESZ_INFO[boardKey][eesz];
        const partition = {
            offset: info.spiffs_start,
            size: info.spiffs_end - info.spiffs_start,
            blockSize: info.spiffs_blocksize,
            pageSize: info.spiffs_pagesize
        };
        const fsTool = this.getFSToolPath();
        const img = path.join(Env.boardDirPath, 'build', 'script.img');
        this.updateConfig({ fsTool, img, baud, ...partition });
    }

    getFSMenu() {
        return MENU;
    }

    getFSToolPath() {
        const fsType = this.getFSType();
        let arch = 'x64';
        switch (process.arch) {
        case 'arm64':
        case 'arm':
            arch = 'arm';
            break;
        case 'ia32':
            arch = 'x32';
            break;
        case 'x64':
        default:
            arch = 'x64';
        }
        const platform = Env.currentPlatform;
        const fsToolInfo = FS_INFO[`mk${fsType}`];
        return path.join(Env.boardDirPath, 'build/tools', fsToolInfo[platform][arch]);
    }
}