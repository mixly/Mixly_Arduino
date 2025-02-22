goog.loadJs('common', () => {

goog.require('Mixly.Registry');
goog.provide('Mixly.FSBoardHandler');

const { Registry } = Mixly;


class FSBoardHandler {
    static {
        this.FsType = {
            LITTLEFS: 'littlefs',
            FATFS: 'fatfs',
            SPIFFS: 'spiffs'
        };

        this.CommandType = {
            DOWNLOAD: 'download',
            UPLOAD: 'upload'
        };
    }

    #config_ = {
        type: FSBoardHandler.FsType.LITTLEFS,
        offset: 0x610000,
        size: 0x9F0000,
        blockSize: 4096,
        pageSize: 256,
        usrFolder: '/'
    };
    #commandsRegistry_ = new Registry();

    constructor() {
        for (let key in FSBoardHandler.FsType) {
            const fsRegistry = new Registry();
            fsRegistry.register(FSBoardHandler.CommandType.DOWNLOAD, '');
            fsRegistry.register(FSBoardHandler.CommandType.UPLOAD, '');
            this.#commandsRegistry_.register(FSBoardHandler.FsType[key], fsRegistry);
        }
    }

    getConfig() {
        return this.#config_;
    }

    updateConfig(config) {
        Object.assign(this.#config_, config);
    }

    setFSType(type) {
        this.#config_.type = type;
    }

    getFSType() {
        return this.#config_.type;
    }

    setFSSize() {
        this.#config_.size = size;
    }

    getFSSize() {
        return this.#config_.size;
    }

    setFSPageSize(size) {
        this.#config_.pageSize = size;
    }

    getFSPageSize() {
        return this.#config_.pageSize;
    }

    setFSBlockSize(size) {
        this.#config_.blockSize = size;
    }

    getFSBlockSize() {
        return this.#config_.blockSize;
    }

    setFSOffset(offset) {
        this.#config_.offset = offset;
    }

    getFSOffset() {
        return this.#config_.offset;
    }

    setUsrFolder(usrFolder) {
        this.#config_.usrFolder = usrFolder;
    }

    getUsrFolder() {
        return this.#config_.usrFolder;
    }

    setFSCommands(type, commands) {
        const fsRegistry = this.getFSCommands(type);
        if (!fsRegistry) {
            return;
        }
        for (let key in commands) {
            fsRegistry.hasKey(key) && fsRegistry.unregister(key);
            fsRegistry.register(key, commands[key]);
        }
    }

    getFSCommands(type) {
        return this.#commandsRegistry_.getItem(type);
    }

    setLittleFSCommands(commands) {
        this.setFSCommands(FSBoardHandler.FsType.LITTLEFS, commands);
    }

    getLittleFSCommands() {
        return this.getFSCommands(FSBoardHandler.FsType.LITTLEFS);
    }

    setFatFSCommands(commands) {
        this.setFSCommands(FSBoardHandler.FsType.FATFS, commands);
    }

    getFatFSCommands() {
        return this.getFSCommands(FSBoardHandler.FsType.FATFS);
    }

    setSpifFSCommands(commands) {
        this.setFSCommands(FSBoardHandler.FsType.SPIFFS, commands);
    }

    getSpifFSCommands() {
        return this.getFSCommands(FSBoardHandler.FsType.SPIFFS);
    }

    onBeforeUpload() {}

    onBeforeDownload() {}
}

Mixly.FSBoardHandler = FSBoardHandler;

});