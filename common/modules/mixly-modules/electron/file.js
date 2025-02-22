goog.loadJs('electron', () => {

goog.require('path');
goog.require('Blockly');
goog.require('Mixly.Env');
goog.require('Mixly.LayerExt');
goog.require('Mixly.Config');
goog.require('Mixly.Title');
goog.require('Mixly.MFile');
goog.require('Mixly.XML');
goog.require('Mixly.Msg');
goog.require('Mixly.Workspace');
goog.require('Mixly.Electron.ArduShell');
goog.require('Mixly.Electron.BU');
goog.provide('Mixly.Electron.File');

const {
    Env,
    LayerExt,
    Config,
    Title,
    MFile,
    XML,
    Msg,
    Workspace,
    Electron
} = Mixly;

const { BOARD } = Config;

const { ArduShell, BU, File } = Electron;

const fs = Mixly.require('fs');
const fs_plus = Mixly.require('fs-plus');
const fs_extra = Mixly.require('fs-extra');
const fs_promise = Mixly.require('node:fs/promises');
const electron_remote = Mixly.require('@electron/remote');
const { dialog, app } = electron_remote;

const { MSG } = Blockly.Msg;

File.DEFAULT_PATH = path.join(app.getAppPath(), 'src/sample');
File.workingPath = File.DEFAULT_PATH;
File.openedFilePath = null;

File.userPath = {
    img: null,
    mix: null,
    code: null,
    hex: null
}

File.showSaveDialog = (title, filters, endFunc) => {
    const currentWindow = electron_remote.getCurrentWindow();
    currentWindow.focus();
    dialog.showSaveDialog(currentWindow, {
        title,
        defaultPath: File.workingPath,
        filters,
        // nameFieldLabel: Msg.Lang['替换文件'],
        showsTagField: true,
        properties: ['showHiddenFiles'],
        message: title
    }).then(result => {
        let res = result.filePath;
        if (res)
            endFunc(res);
    }).catch(error => {
        console.log(error);
    });
}

File.showOpenDialog = (title, filters, endFunc) => {
    const currentWindow = electron_remote.getCurrentWindow();
    currentWindow.focus();
    dialog.showOpenDialog(currentWindow, {
        title,
        defaultPath: File.workingPath,
        filters,
        properties: ['openFile', 'showHiddenFiles'],
        message: title
    })
    .then(result => {
        let res = result.filePaths[0];
        if (res)
            endFunc(res);
    })
    .catch(error => {
        console.log(error);
    });
}

File.save = (endFunc = () => {}) => {
    if (File.openedFilePath) {
        const mainWorkspace = Workspace.getMain();
        const editor = mainWorkspace.getEditorsManager().getActive();
        const extname = path.extname(File.openedFilePath);
        let data = '';
        switch (extname) {
        case '.mix':
            data = editor.getValue();
            break;
        case '.py':
        case '.ino':
            data = editor.getCode();
            break;
        default:
            layer.msg(Msg.Lang['file.type.error'], { time: 1000 });
            return;
        }
        fs_extra.outputFile(File.openedFilePath, data)
        .then(() => {
            Title.updeteFilePath(File.openedFilePath);
            layer.msg(Msg.Lang['file.saveSucc'], { time: 1000 });
        })
        .catch((error) => {
            File.openedFilePath = null;
            console.log(error);
            layer.msg(Msg.Lang['file.saveFailed'], { time: 1000 });
        })
        .finally(() => {
            endFunc();
        })
    } else {
        File.saveAs(endFunc);
    }
}

File.saveAs = (endFunc = () => {}) => {
    File.showSaveDialog(Msg.Lang['file.saveAs'], MFile.saveFilters, (filePath) => {
        const mainWorkspace = Workspace.getMain();
        const editor = mainWorkspace.getEditorsManager().getActive();
        const extname = path.extname(filePath);
        if (['.mix', '.py', '.ino'].includes(extname)) {
            File.openedFilePath = filePath;
            File.workingPath = path.dirname(filePath);
            File.save(endFunc);
        } else {
            switch (extname) {
            case '.bin':
            case '.hex':
                if (BOARD?.nav?.compile) {
                    ArduShell.saveBinOrHex(filePath);
                } else {
                    const hexStr = MFile.getHex();
                    fs_extra.outputFile(filePath, hexStr)
                    .then(() => {
                        layer.msg(Msg.Lang['file.saveSucc'], { time: 1000 });
                    })
                    .catch((error) => {
                        console.log(error);
                        layer.msg(Msg.Lang['file.saveFailed'], { time: 1000 });
                    })
                    .finally(() => {
                        endFunc();
                    });
                }
                break;
            case '.mil':
                const milStr = editor.getMil();
                const $mil = $(milStr);
                $mil.attr('name', path.basename(filePath, '.mil'));
                fs_extra.outputFile(filePath, $mil[0].outerHTML)
                .then(() => {
                    layer.msg('file.saveSucc', { time: 1000 });
                })
                .catch((error) => {
                    console.log(error);
                    layer.msg(Msg.Lang['file.saveFailed'], { time: 1000 });
                })
                .finally(() => {
                    endFunc();
                });
                break;
            default:
                layer.msg(Msg.Lang['file.type.error'], { time: 1000 });
                endFunc();
            }
        }
    });
}

File.exportLib = (endFunc = () => {}) => {
    File.showSaveDialog(Msg.Lang['file.exportAs'], [ MFile.SAVE_FILTER_TYPE.mil ], (filePath) => {
        const mainWorkspace = Workspace.getMain();
        const editor = mainWorkspace.getEditorsManager().getActive();
        const milStr = editor.getMil();
        const $mil = $(milStr);
        $mil.attr('name', path.basename(filePath, '.mil'));
        fs_extra.outputFile(filePath, $mil[0].outerHTML)
        .then(() => {
            layer.msg('file.saveSucc', { time: 1000 });
        })
        .catch((error) => {
            console.log(error);
            layer.msg(Msg.Lang['file.saveFailed'], { time: 1000 });
        })
        .finally(() => {
            endFunc();
        });
    });
}

File.new = () => {
    const mainWorkspace = Workspace.getMain();
    const editor = mainWorkspace.getEditorsManager().getActive();
    const blockEditor = editor.getPage('block').getEditor();
    const codeEditor = editor.getPage('code').getEditor();
    const generator = Blockly.generator;
    const blocksList = blockEditor.getAllBlocks();
    if (editor.getPageType() === 'code') {
        const code = codeEditor.getValue(),
        workspaceToCode = generator.workspaceToCode(blockEditor) || '';
        if (!blocksList.length && workspaceToCode === code) {
            layer.msg(Msg.Lang['editor.codeEditorEmpty'], { time: 1000 });
            File.openedFilePath = null;
            Title.updateTitle(Title.title);
            return;
        }
    } else {
        if (!blocksList.length) {
            layer.msg(Msg.Lang['editor.blockEditorEmpty'], { time: 1000 });
            File.openedFilePath = null;
            Title.updateTitle(Title.title);
            return;
        }
    }
    layer.confirm(MSG['confirm_newfile'], {
        title: false,
        shade: LayerExt.SHADE_ALL,
        resize: false,
        success: (layero) => {
            const { classList } = layero[0].childNodes[1].childNodes[0];
            classList.remove('layui-layer-close2');
            classList.add('layui-layer-close1');
        },
        btn: [Msg.Lang['nav.btn.ok'], Msg.Lang['nav.btn.cancel']],
        btn2: (index, layero) => {
            layer.close(index);
        }
    }, (index, layero) => {
        layer.close(index);
        blockEditor.clear();
        blockEditor.scrollCenter();
        Blockly.hideChaff();
        codeEditor.setValue(generator.workspaceToCode(blockEditor) || '', -1);
        File.openedFilePath = null;
        Title.updateTitle(Title.title);
    });
}

File.open = () => {
    File.showOpenDialog(Msg.Lang['file.open'], [
        { name: Msg.Lang['file.type.mix'], extensions: MFile.openFilters }
    ], (filePath) => {
        File.openFile(filePath);
    });
}

File.openFile = (filePath) => {
    const extname = path.extname(filePath);
    let data;
    if (!fs_plus.isFileSync(filePath)) {
        console.log(filePath + '不存在');
        return;
    }
    try {
        data = fs.readFileSync(filePath, 'utf-8');
    } catch (error) {
        console.log(error);
        return;
    }
    if (['.bin', '.hex'].includes(extname)) {
        if (BOARD?.nav?.compile) {
            ArduShell.showUploadBox(filePath);
        } else {
            MFile.loadHex(data);
        }
    } else if (['.mix', '.xml', '.ino', '.py'].includes(extname)) {
        const mainWorkspace = Workspace.getMain();
        const editor = mainWorkspace.getEditorsManager().getActive();
        editor.setValue(data, extname);
        File.openedFilePath = filePath;
        File.workingPath = path.dirname(filePath);
        Title.updeteFilePath(File.openedFilePath);
    } else {
        layer.msg(Msg.Lang['file.type.error'], { time: 1000 });
    }
}

});