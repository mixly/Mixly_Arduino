importScripts('../../../web-modules/workerpool.min.js');
importScripts('../../../web-modules/browserfs.min.js');

let fs = BrowserFS.fs;

const createPromise = function(func, ...args) {
    return new Promise((resolve, reject) => {
        func(...args, function() {
            resolve([...arguments]);
        });
    });
}

const addFileSystemHandler = function(filesystem) {
    return new Promise((resolve, reject) => {
        BrowserFS.configure({
            fs: "FileSystemAccess",
            options: { handle: filesystem }
        }, function (error) {
            if (error) {
                reject(error);
                return;
            }
            fs = BrowserFS.fs;
            resolve();
        });
    });
}

const rename = function(oldPath, newPath) {
    return createPromise(fs.rename, oldPath, newPath);
}

const stat = function(p) {
    return createPromise(fs.stat, p);
}

const open = function(p, flag, mode) {
    return createPromise(fs.open, p, flag, mode);
}

const unlink = function(p) {
    return createPromise(fs.unlink, p);
}

const rmdir = function(p) {
    return createPromise(fs.rmdir, p);
}

const mkdir = function(p, mode) {
    return createPromise(fs.mkdir, p, mode);
}

const readdir = function(p) {
    return createPromise(fs.readdir, p);
}

const exists = function(p) {
    return createPromise(fs.exists, p);
}

const realpath = function(p) {
    return createPromise(fs.realpath, p);
}

const truncate = function(p, len) {
    return createPromise(fs.truncate, p, len);
}

const readFile = function(fname, encoding, flag) {
    return createPromise(fs.readFile, fname, encoding);
}

const writeFile = function(fname, data, encoding) {
    return createPromise(fs.writeFile, fname, data, encoding);
}

const appendFile = function(fname, data, encoding) {
    return createPromise(fs.appendFile, fname, data, encoding);
}

const chmod = function(p, mode) {
    return createPromise(fs.chmod, p, mode);
}

const chown = function(p, new_uid, new_gid) {
    return createPromise(fs.chown, p, new_uid, new_gid);
}

const utimes = function(p, atime, mtime) {
    return createPromise(fs.utimes, p, atime, mtime);
}

const link = function(srcpath, dstpath) {
    return createPromise(fs.link, srcpath, dstpath);
}

const symlink = function(srcpath, dstpath, type) {
    return createPromise(fs.symlink, srcpath, dstpath, type);
}

const readlink = function(p) {
    return createPromise(fs.readlink, p);
}

const syncClose = function(method, fd) {
    return fs.syncClose(method, fd);
}

workerpool.worker({
    addFileSystemHandler,
    rename,
    stat,
    open,
    unlink,
    rmdir,
    mkdir,
    readdir,
    exists,
    realpath,
    truncate,
    readFile,
    writeFile,
    appendFile,
    chmod,
    chown,
    utimes,
    link,
    symlink,
    readlink,
    syncClose
});