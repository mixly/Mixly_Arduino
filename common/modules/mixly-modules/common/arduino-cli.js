goog.loadJs('common', () => {

goog.require('path');
goog.provide('Mixly.ArduinoCLI');

class ArduinoCLI {
    static {
        this.COMMAND = {
            boardAttach: 'board attach',
            boardDetails: 'board details',
            boardList: 'board list',
            boardListAll: 'board listall',
            boardSearch: 'board search',
            burnBootloader: 'burn-bootloader',
            cacheClean: 'cache clean',
            compile: 'compile',
            completion: 'completion',
            configDump: 'config dump',
            configInit: 'config init',
            configAdd: 'config add',
            configDelete: 'config delete',
            configRemove: 'config remove',
            configSet: 'config set',
            coreDownload: 'core download',
            coreInstall: 'core install',
            coreList: 'core list',
            coreSearch: 'core search',
            coreUninstall: 'core uninstall',
            coreUpdateIndex: 'core update-index',
            coreUpgrade: 'core upgrade',
            daemon: 'daemon',
            debug: 'debug',
            libDeps: 'lib deps',
            libDownload: 'lib download',
            libExamples: 'lib examples',
            libInstall: 'lib install',
            libList: 'lib list',
            libSearch: 'lib search',
            libUninstall: 'lib uninstall',
            libUpdateIndex: 'lib update-index',
            libUpgrade: 'lib upgrade',
            monitor: 'monitor',
            outdated: 'outdated',
            sketchArchive: 'sketch archive',
            sketchNew: 'sketch new',
            update: 'update',
            upgrade: 'upgrade',
            upload: 'upload',
            version: 'version'
        };
    }

    #cliPath_ = '';
    #configPath_ = '';
    constructor(cliPath) {
        this.#cliPath_ = cliPath;
        this.#configPath_ = path.join(path.dirname(cliPath), 'config.json');
    }

    async exist() {
        return true;
    }

    async exec(name, config) {

    }
}

});