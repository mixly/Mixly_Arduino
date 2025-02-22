goog.loadJs('web', () => {

goog.require('workerpool');
goog.require('Mixly.Web');
goog.provide('Mixly.Web.FS');

const { FS } = Mixly.Web;

FS.pool = workerpool.pool('../common/modules/mixly-modules/workers/web/file-system-access.js', {
    workerOpts: {
        name: 'fileSystemAccess'
    },
    workerType: 'web'
});

FS.showOpenFilePicker = async () => {
    return new Promise((resolve, reject) => {
        resolve();
    });
}

FS.showDirectoryPicker = async () => {
    const directoryHandle = await window.showDirectoryPicker({ mode: 'readwrite' });
    const permissionStatus = await directoryHandle.requestPermission({ mode: 'readwrite' });
    if (permissionStatus !== 'granted') {
        throw new Error('readwrite access to directory not granted');
    }
    await FS.pool.exec('addFileSystemHandler', [directoryHandle]);
    return directoryHandle;
}

FS.showSaveFilePicker = async () => {
    return new Promise((resolve, reject) => {
        
    });
}

FS.readFile = (path) => {
    return new Promise(async (resolve, reject) => {
        const [data] = await FS.pool.exec('readFile', [path, 'utf8']);
        resolve(data);
    });
}

FS.writeFile = (path, data) => {
    return new Promise(async (resolve, reject) => {
        const [error, entries] = await FS.pool.exec('writeFile', [path, data, 'utf8']);
        if (error) {
            reject(error);
        } else {
            resolve(entries);
        }
    });
}

FS.isFile = (path) => {
    return new Promise(async (resolve, reject) => {
        const [_, stats] = await FS.pool.exec('stat', [path]);
        if (!stats) {
            resolve(false);
            return;
        }
        if (stats.mode === 33188) {
            resolve(true);
        } else {
            resolve(false);
        }
    });
}

FS.renameFile = (oldFilePath, newFilePath) => {
    return new Promise(async (resolve, reject) => {
        const [error] = await FS.pool.exec('rename', [oldFilePath, newFilePath]);
        if (error) {
            reject(error);
        } else {
            resolve();
        }
    });
}

FS.moveFile = (oldFilePath, newFilePath) => {
    return FS.renameFile(oldFilePath, newFilePath);
}

FS.deleteFile = (filePath) => {
    return new Promise(async (resolve, reject) => {
        const [error] = await FS.pool.exec('unlink', [filePath]);
        if (error) {
            reject(error);
        } else {
            resolve();
        }
    });
}

FS.createDirectory = (folderPath) => {
    return new Promise(async (resolve, reject) => {
        const [error] = await FS.pool.exec('mkdir', [folderPath, 0o777]);
        if (error) {
            reject(error);
        } else {
            resolve();
        }
    });
}

FS.readDirectory = (path) => {
    return new Promise(async (resolve, reject) => {
        const [error, entries] = await FS.pool.exec('readdir', [path]);
        if (error) {
            reject(error);
        } else {
            resolve(entries);
        }
    });
}

FS.isDirectory = (path) => {
    return new Promise(async (resolve, reject) => {
        const [_, stats] = await FS.pool.exec('stat', [path]);
        if (!stats) {
            resolve(false);
            return;
        }
        if (stats.mode === 33188) {
            resolve(false);
        } else {
            resolve(true);
        }
    });
}

FS.isDirectoryEmpty = async (path) => {
    return !(await FS.readDirectory(path) ?? []).length;
}

FS.moveDirectory = (oldFolderPath, newFolderPath) => {
    return new Promise(async (resolve, reject) => {
        resolve();
    });
}

FS.copyDirectory = (oldFolderPath, newFolderPath) => {
    return new Promise(async (resolve, reject) => {
        resolve();
    });
}

FS.deleteDirectory = (folderPath) => {
    return new Promise(async (resolve, reject) => {
        const [error] = await FS.pool.exec('rmdir', [folderPath]);
        if (!error) {
            resolve();
        } else {
            reject();
        }
    });
}

});