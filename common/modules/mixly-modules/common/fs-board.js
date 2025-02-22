goog.loadJs('common', () => {

goog.require('Mixly.Serial');
goog.require('Mixly.Boards');
goog.require('Mixly.FSBoardHandler');
goog.provide('Mixly.FSBoard');

const {
    Serial,
    FSBoardHandler,
    Boards
} = Mixly;

class FSBoard {
    #handler_ = null;

    constructor() {}

    #addParms_(usrFolder, fsType) {
        this.#handler_.updateConfig({
            port: Serial.getSelectedPortName()
        });
        this.#handler_.setUsrFolder(usrFolder);
        this.#handler_.setFSType(fsType);
    }

    async download(usrFolder, fsType) {
        this.#addParms_(usrFolder, fsType);
        this.#handler_.onBeforeDownload();
    }

    async upload(usrFolder, fsType) {
        this.#addParms_(usrFolder, fsType);
        this.#handler_.onBeforeUpload();
    }

    getConfig() {
        return this.#handler_.getConfig();
    }

    getFSType() {
        return this.#handler_.getFSType();
    }

    getLittleFSCommands() {
        return this.#handler_.getLittleFSCommands();
    }

    getFatFSCommands() {
        return this.#handler_.getFatFSCommands();
    }

    getSpifFSCommands() {
        return this.#handler_.getSpifFSCommands();
    }

    getFSCommands(type) {
        return this.#handler_.getFSCommands(type);
    }

    getSelectedFSCommands() {
        return this.getFSCommands(this.getFSType());
    }

    getSelectedFSDownloadCommand() {
        const fsRegistry = this.getSelectedFSCommands();
        if (!fsRegistry) {
            return '';
        }
        return fsRegistry.getItem(FSBoardHandler.CommandType.DOWNLOAD);
    }

    getSelectedFSUploadCommand() {
        const fsRegistry = this.getSelectedFSCommands();
        if (!fsRegistry) {
            return '';
        }
        return fsRegistry.getItem(FSBoardHandler.CommandType.UPLOAD);
    }

    setHandler(handler) {
        this.#handler_ = handler;
    }

    getHandler() {
        return this.#handler_;
    }

    dispose() {
        this.#handler_ = null;
    }
}

Mixly.FSBoard = FSBoard;

});