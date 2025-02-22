goog.loadJs('electron', () => {

goog.require('path');
goog.require('Mixly.Msg');
goog.require('Mixly.Electron');
goog.provide('Mixly.Electron.FS');

const { Msg, Electron } = Mixly;
const { FS } = Electron;

const fs_plus = Mixly.require('fs-plus');
const fs_extra = Mixly.require('fs-extra');
const fs_promise = Mixly.require('node:fs/promises');
const electron_remote = Mixly.require('@electron/remote');
const { dialog, app } = electron_remote;

FS.showOpenFilePicker = () => {
    return new Promise((resolve, reject) => {
        const currentWindow = electron_remote.getCurrentWindow();
        currentWindow.focus();
        dialog.showOpenDialog(currentWindow, {
            title: Msg.Lang['file.openFile'],
            defaultPath: File.workingPath,
            filters,
            properties: ['openFile', 'showHiddenFiles'],
            message: Msg.Lang['file.openFile']
        })
        .then(result => {
            const filePath = result.filePaths[0];
            if (filePath) {
                resolve(new File(filePath));
            } else {
                reject('file not found');
            }
        })
        .catch(error => {
            reject(error);
        });
    });
}

FS.showDirectoryPicker = () => {
    return new Promise((resolve, reject) => {
        const currentWindow = electron_remote.getCurrentWindow();
        currentWindow.focus();
        dialog.showOpenDialog(currentWindow, {
            title: Msg.Lang['file.openFolder'],
            // defaultPath: File.workingPath,
            // filters,
            properties: ['openDirectory', 'createDirectory'],
            message: Msg.Lang['file.openFolder']
        })
        .then(result => {
            const folderPath = result.filePaths[0];
            if (folderPath) {
                resolve(folderPath);
            } else {
                resolve(null);
            }
        })
        .catch(reject);
    });
}

FS.showSaveFilePicker = (fileName, ext) => {
    return new Promise((resolve, reject) => {
        const currentWindow = electron_remote.getCurrentWindow();
        currentWindow.focus();
        dialog.showSaveDialog(currentWindow, {
            filters: [{
                name: Msg.Lang['file.type.mix'],
                extensions: [ext.substring(ext.lastIndexOf('.') + 1)]
            }],
            defaultPath: fileName,
            showsTagField: true,
            properties: ['showHiddenFiles']
        }).then(result => {
            let filePath = result.filePath;
            if (filePath) {
                resolve(filePath);
            } else {
                resolve(null);
            }
        }).catch(reject);
    });
}

FS.createFile = (filePath) => {
    return fs_extra.ensureFile(filePath);
}

FS.readFile = (filePath) => {
    return fs_promise.readFile(filePath, { encoding: 'utf8' });
}

FS.writeFile = (filePath, data) => {
    return fs_promise.writeFile(filePath, data, { encoding: 'utf8' });
}

FS.isFile = (filePath) => {
    return new Promise((resolve, reject) => {
        resolve(fs_plus.isFileSync(filePath));
    });
}

FS.renameFile = (oldFilePath, newFilePath) => {
    return fs_promise.rename(oldFilePath, newFilePath);
}

FS.moveFile = (oldFilePath, newFilePath) => {
    return fs_extra.move(oldFilePath, newFilePath, { overwrite: true });
}

FS.copyFile = (oldFilePath, newFilePath) => {
    return fs_extra.copy(oldFilePath, newFilePath);
}

FS.deleteFile = (filePath) => {
    return fs_extra.remove(filePath);
}

FS.createDirectory = (folderPath) => {
    return fs_extra.ensureDir(folderPath);
}

FS.readDirectory = (folderPath) => {
    return fs_promise.readdir(folderPath);
}

FS.isDirectory = (folderPath) => {
    return new Promise((resolve, reject) => {
        fs_plus.isDirectory(folderPath, (status) => {
            resolve(status);
        });
    });
}

FS.isDirectoryEmpty = async (folderPath) => {
    return !(await FS.readDirectory(folderPath)).length;
}

FS.renameDirectory = (oldFolderPath, newFolderPath) => {
    return fs_promise.rename(oldFolderPath, newFolderPath);
}

FS.moveDirectory = (oldFolderPath, newFolderPath) => {
    return fs_extra.move(oldFolderPath, newFolderPath, { overwrite: true });
}

FS.copyDirectory = (oldFolderPath, newFolderPath) => {
    return fs_extra.copy(oldFolderPath, newFolderPath);
}

FS.deleteDirectory = (folderPath) => {
    return fs_extra.remove(folderPath);
}

});