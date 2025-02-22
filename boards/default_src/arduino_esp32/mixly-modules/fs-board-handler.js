import { Env, Boards, FSBoardHandler } from 'mixly';
import * as path from 'path';
import COMMANDS from './commands';
import PARTITIONS from './partitions';
import BOARDS_PARTITIONS_INFO from './boards-partitions-info';
import MENU from './menu';
import FS_INFO from './fs-info';

export default class FSArduEsp32Handler extends FSBoardHandler {
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
        let flashSize = Boards.getSelectedBoardConfigParam('FlashSize') || 'detect';
        if (flashSize !== 'detect') {
            flashSize += 'B';
        }
        const baud = Boards.getSelectedBoardConfigParam('UploadSpeed') || '115200';
        let partitionScheme = Boards.getSelectedBoardConfigParam('PartitionScheme');
        let partitionsType = BOARDS_PARTITIONS_INFO[boardKey] ?? [];
        if (!partitionsType.includes(partitionScheme)) {
            if (partitionsType.length) {
                partitionScheme = partitionsType[0];
            } else {
                partitionScheme = 'default';
            }
        }
        const partition = { ...PARTITIONS[partitionScheme] };
        if (this.getFSType() === 'default') {
            this.setFSType(partition.type);
        }
        const fsTool = this.getFSToolPath();
        const img = path.join(Env.boardDirPath, 'build', 'script.img');
        this.updateConfig({ fsTool, img, flashMode, flashFreq, flashSize, baud, ...partition });
    }

    onBeforeDownload() {
        const boardKey = Boards.getSelectedBoardKey();
        const baud = Boards.getSelectedBoardConfigParam('UploadSpeed') || '115200';
        let partitionScheme = Boards.getSelectedBoardConfigParam('PartitionScheme');
        let partitionsType = BOARDS_PARTITIONS_INFO[boardKey] ?? [];
        if (!partitionsType.includes(partitionScheme)) {
            if (partitionsType.length) {
                partitionScheme = partitionsType[0];
            } else {
                partitionScheme = 'default';
            }
        }
        const partition = { ...PARTITIONS[partitionScheme] };
        if (this.getFSType() === 'default') {
            this.setFSType(partition.type);
        }
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