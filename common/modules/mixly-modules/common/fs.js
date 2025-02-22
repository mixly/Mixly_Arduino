goog.loadJs('common', () => {

goog.require('Mixly');
goog.provide('Mixly.FS');


class FS {
    constructor() {}

    async rename(oldPath, newPath) {}

    async createFile(filePath) {}

    async readFile(filePath) {}

    async writeFile(filePath, data) {}

    async isFile(filePath) {}

    async renameFile(oldFilePath, newFilePath) {}

    async moveFile(oldFilePath, newFilePath) {}

    async copyFile(oldFilePath, newFilePath) {}

    async deleteFile(filePath) {}

    async createDirectory(folderPath) {}

    async readDirectory(folderPath) {}

    async isDirectory(folderPath) {}

    async isDirectoryEmpty(folderPath) {}

    async renameDirectory(oldFolderPath, newFolderPath) {}

    async moveDirectory(oldFolderPath, newFolderPath) {}

    async copyDirectory(oldFolderPath, newFolderPath) {}

    async deleteDirectory(folderPath) {}
}

Mixly.FS = FS;

});