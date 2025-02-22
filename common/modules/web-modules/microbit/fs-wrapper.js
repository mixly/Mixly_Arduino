(() => {

class microbitFsWrapper {
    /**
     * Creates an instance of Micropythonthis.
     * @private
     */
    constructor(filename = 'main.py') {
        this.filename = filename;
        this.fs = null;
        this.commonFsSize = 20 * 1024;
        this.passthroughMethods = [
            'create',
            'exists',
            'getStorageRemaining',
            'getStorageSize',
            'getStorageUsed',
            'getUniversalHex',
            'ls',
            'read',
            'readBytes',
            'remove',
            'size',
            'write'
        ];
    }

    /**
     * Initialize file system wrapper of BBC micro:bit with micropython firmwares.
     */
    async initialize(folderPath) {
        await this.setupFilesystem(folderPath);
    }

    /**
     * Duplicates some of the methods from the MicropythonFsHex class by
     * creating functions with the same name in this object.
     */
    duplicateMethods() {
        this.passthroughMethods.forEach((method) => {
            this[method] = () => {
                return this.fs[method].apply(this.fs, arguments);
            };
        });
    }

    /**
     * Fetches both MicroPython hexes and sets up the file system with the
     * initial main.py
     */
    setupFilesystem(folderPath) {
        const uPyV1 = goog.get(path.join(folderPath, 'microbit-micropython-v1.hex'));
        const uPyV2  = goog.get(path.join(folderPath, 'microbit-micropython-v2.hex'));
        if (!uPyV1 || !uPyV2) {
            console.error('There was an issue loading the MicroPython Hex files.');
        }
        // TODO: We need to use ID 9901 for app compatibility, but can soon be changed to 9900 (as per spec)
        this.fs = new microbitFs.MicropythonFsHex([
            { hex: uPyV1, boardId: 0x9901 },
            { hex: uPyV2, boardId: 0x9903 }
        ], {
            'maxFsSize': this.commonFsSize,
        });
        this.duplicateMethods();
    }

    /**
     * Setup the file system by adding main program and its dependencies.
     * @param {string} code
     */
    async setFilesystemProgram() {
        const userCode = CodeManager.getSharedInstance().getCode();
        await this.fs.write(this.filename, userCode);
        await this.addExternalLibraries();
    }

    /**
     * Add only needed libraries in micro:bit file system by reading user python code.
     */
    async addExternalLibraries() {
        const uPyCode = CodeManager.getSharedInstance().getCode();
        const requestedLibs = this.getRequestedLibraries(uPyCode);
        for (var i = 0; i < requestedLibs.length; i++) {
            await this.fs.write(requestedLibs[i].filename, requestedLibs[i].code);
        }
    }

    /**
     * Get requested libraries and dependencies recursively.
     * @param {String} code
     */
    getRequestedLibraries(code) {
        let requestedLibs = new Array();
        for (var lib in VittaInterface.externalLibraries) {
            const regExp1 = new RegExp('from ' + lib + ' import');
            const regExp2 = new RegExp('import ' + lib);
            if (regExp1.test(code) || regExp2.test(code)) {
                requestedLibs.push({
                    filename: lib + ".py",
                    code: VittaInterface.externalLibraries[lib]
                });
                const requestedDependencies = this.getRequestedLibraries(VittaInterface.externalLibraries[lib]);
                requestedLibs = requestedLibs.concat(requestedDependencies);
            }
        }
        return requestedLibs;
    }

    /**
     * @param {string} boardId String with the Board ID for the generation.
     * @returns Uint8Array with the data for the given Board ID.
     */
    getBytesForBoardId(boardId) {
        if (boardId == '9900' || boardId == '9901') {
            return this.fs.getIntelHexBytes(0x9901);
        } else if (boardId == '9903' || boardId == '9904' || boardId == '9905' || boardId == '9906') {
            return this.fs.getIntelHexBytes(0x9903);
        } else {
            throw Error('Could not recognise the Board ID ' + boardId);
        }
    }

    /**
     * @param {string} boardId String with the Board ID for the generation.
     * @returns ArrayBuffer with the Intel Hex data for the given Board ID.
     */
    getIntelHexForBoardId(boardId) {
        if (boardId == '9900' || boardId == '9901') {
            var hexStr = this.fs.getIntelHex(0x9901);
        } else if (boardId == '9903' || boardId == '9904' || boardId == '9905' || boardId == '9906') {
            var hexStr = this.fs.getIntelHex(0x9903);
        } else {
            throw Error('Could not recognise the Board ID ' + boardId);
        }
        // iHex is ASCII so we can do a 1-to-1 conversion from chars to bytes
        return this.convertHexStringToBin(hexStr);
    }

    /**
     * Convert Hex string into Uint8Array buffer.
     * @param {string} hex String of hex data.
     * @returns ArrayBuffer with the Intel Hex data.
     */
    convertHexStringToBin(hex) {
        var hexBuffer = new Uint8Array(hex.length);
        for (var i = 0, strLen = hex.length; i < strLen; i++) {
            hexBuffer[i] = hex.charCodeAt(i);
        }
        return hexBuffer;
    }

    /**
     * Import the files from the provide hex string into the filesystem.
     * If the import is successful this deletes all the previous files.
     *
     * @param {string} hexStr Hex (Intel or Universal) string with files to
     *     import.
     * @return {string[]} Array with the filenames of all files imported.
     */
    importHexFiles(hexStr) {
        var filesNames = this.fs.importFilesFromHex(hexStr, {
            overwrite: true,
            formatFirst: true
        });
        if (!filesNames.length) {
            throw new Error('The filesystem in the hex file was empty');
        }
        return filesNames;
    }

    /**
     * Import an appended script from the provide hex string into the filesystem.
     * If the import is successful this deletes all the previous files.
     * @param {string} hexStr Hex (Intel or Universal) string with files to import.
     * @return {string[]} Array with the filenames of all files imported.
     */
    importHexAppended(hexStr) {
        var code = microbitFs.getIntelHexAppendedScript(hexStr);
        if (!code) {
            throw new Error('No appended code found in the hex file');
        };
        this.fs.ls().forEach(function (filename) {
            this.fs.remove(filename);
        });
        this.fs.write(this.filename, code);
        return [this.filename];
    }

    writeFile(filename, fileBytes) {
        try {
            if (this.fs.exists(filename)) {
                this.fs.remove(filename);
                this.fs.create(filename, fileBytes);
            } else {
                this.fs.write(filename, fileBytes);
            }
        } catch (e) {
            if (this.fs.exists(filename)) {
                this.fs.remove(filename);
            }
        }
    }
}

window.FSWrapper = new microbitFsWrapper();

})();