import { WebAccessFS } from '@zenfs/dom';
import { get, set } from 'idb-keyval';
import { FS } from 'mixly';


class WebAccessFSExt extends WebAccessFS {
    constructor(handle) {
        super(handle);
    }

    async readFile(path) {
        const handle = await this.getHandle(path);
        if (handle instanceof window.FileSystemFileHandle) {
            const file = await handle.getFile();
            const text = await file.text();
            return text;
        }
        return '';
    }
}


export default class FileSystemFS extends FS {
    #fs_ = null;
    #encoder_ = new TextEncoder();

    constructor() {
        super();
    }

    async showDirectoryPicker() {
        const directoryHandle = await window.showDirectoryPicker({ mode: 'readwrite' });
        const permissionStatus = await directoryHandle.requestPermission({ mode: 'readwrite' });
        if (permissionStatus !== 'granted') {
            throw new Error('readwrite access to directory not granted');
        }
        await this.setFSCache(directoryHandle);
        this.#fs_ = new WebAccessFSExt(directoryHandle);
        return directoryHandle;
    }

    async loadFS() {
        let directoryHandle = await this.getFSCache();
        if (!directoryHandle) {
            return null;
        }
        const permissionStatus = await directoryHandle.requestPermission({ mode: 'readwrite' });
        if (permissionStatus !== 'granted') {
            throw new Error('readwrite access to directory not granted');
        }
        this.#fs_ = new WebAccessFSExt(directoryHandle);
        return directoryHandle;
    }

    async getFSCache() {
        return get('mixly-pyodide-fs');
    }

    async setFSCache(data) {
        await set('mixly-pyodide-fs', data);
    }

    async createFile(filePath) {
        return this.#fs_.createFile(filePath, '');
    }

    async readFile(path) {
        return this.#fs_.readFile(path);
    }

    async writeFile(path, data) {
        const encodedArray = this.#encoder_.encode(data);
        return this.#fs_.writeFile(path, encodedArray);
    }

    async isFile(path) {
        const stats = await this.#fs_.stat(path);
        if (stats && stats.mode === 33279) {
            return true;
        }
        return false;
    }

    async renameFile(oldFilePath, newFilePath) {
        return await this.#fs_.rename(oldFilePath, newFilePath);
    }

    async moveFile(oldFilePath, newFilePath) {
        return this.renameFile(oldFilePath, newFilePath);
    }

    async deleteFile(filePath) {
        return this.#fs_.unlink(filePath);
    }

    async createDirectory(folderPath) {
        return this.#fs_.mkdir(folderPath, 0o777);
    }

    async readDirectory(path) {
        const result = await this.#fs_.readdir(path);
        return result;
    }

    async isDirectory(path) {
        const stats = await this.#fs_.stat(path);
        if (stats && stats.mode === 16895) {
            return true;
        }
        return false;
    }

    async isDirectoryEmpty(path) {
        const result = await this.readDirectory(path);
        return !result?.length;
    }

    async renameDirectory(oldFolderPath, newFolderPath) {
        return this.#fs_.rename(oldFolderPath, newFolderPath);
    }

    async moveDirectory(oldFolderPath, newFolderPath) {
        return this.#fs_.rename(oldFolderPath, newFolderPath);
    }

    async deleteDirectory(folderPath) {
        return this.#fs_.rmdir(folderPath);
    }
}