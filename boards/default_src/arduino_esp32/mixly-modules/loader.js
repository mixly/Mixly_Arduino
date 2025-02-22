import { Workspace, ContextMenu } from 'mixly';
import FSArduEsp32Handler from './fs-board-handler';
import { Msg } from 'blockly/core';

export default function addBoardFSItem () {
    const mainWorkspace = Workspace.getMain();
    const statusBarsManager = mainWorkspace.getStatusBarsManager();
    const dropdownMenu = statusBarsManager.getDropdownMenu();
    const menu = dropdownMenu.getItem('menu');
    menu.add({
        weight: 2,
        type: 'sep1',
        preconditionFn: () => {
            return goog.isElectron;
        },
        data: '---------'
    });
    menu.add({
        weight: 3,
        type: 'filesystem-tool',
        preconditionFn: () => {
            return goog.isElectron;
        },
        data: {
            isHtmlName: true,
            name: ContextMenu.getItem(Msg.BOARD_FS, ''),
            callback: () => {
                statusBarsManager.add('board-fs', 'board-fs', Msg.BOARD_FS, Msg.BOARD_FS);
                statusBarsManager.changeTo('board-fs');
                const fsStatusBar = statusBarsManager.getStatusBarById('board-fs');
                fsStatusBar.setHandler(new FSArduEsp32Handler());
            }
        }
    });
}