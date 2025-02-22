goog.loadJs('electron', () => {

goog.require('layui');
goog.require('path');
goog.require('Mustache');
goog.require('Mixly.Env');
goog.require('Mixly.FSBoard');
goog.require('Mixly.LayerExt');
goog.require('Mixly.Debug');
goog.require('Mixly.Msg');
goog.require('Mixly.Electron.Shell');
goog.provide('Mixly.Electron.FSBoard');

const {
    Env,
    FSBoard,
    LayerExt,
    Debug,
    Msg,
    Electron = {}
} = Mixly;

const { Shell } = Electron;

const fs_extra = Mixly.require('fs-extra');

const { layer } = layui;


class FSBoardExt extends FSBoard {
    #shell_ = null;
    constructor() {
        super();
        this.#shell_ = new Shell();
    }

    download(usrFolder, fsType) {
        return new Promise(async (resolve, reject) => {
            try {
                await super.download(usrFolder, fsType);
            } catch (error) {
                Debug.error(error);
                resolve();
                return;
            }
            const layerNum = layer.open({
                type: 1,
                title: `${Msg.Lang['shell.downloading']}...`,
                content: $('#mixly-loader-div'),
                shade: LayerExt.SHADE_NAV,
                resize: false,
                closeBtn: 0,
                success: () => {
                    $("#mixly-loader-btn").off("click").click(() => {
                        $("#mixly-loader-btn").css('display', 'none');
                        layer.title(Msg.Lang['shell.aborting'] + '...', layerNum);
                        this.cancel();
                    });
                    const { mainStatusBarTabs } = Mixly;
                    const statusBarTerminal = mainStatusBarTabs.getStatusBarById('output');
                    statusBarTerminal.setValue('');
                    mainStatusBarTabs.changeTo('output');
                    const commandTemplate = this.getSelectedFSDownloadCommand();
                    const command = this.#renderTemplate_(commandTemplate);
                    this.#shell_.exec(command)
                    .then((info) => {
                        if (info.code) {
                            statusBarTerminal.addValue(`\n==${Msg.Lang['shell.downloadFailed']}==\n`);
                        } else {
                            statusBarTerminal.addValue(`\n==${Msg.Lang['shell.downloadSucc']}(${Msg.Lang['shell.timeCost']} ${info.time})==\n`);
                        }
                    })
                    .catch(Debug.error)
                    .finally(() => {
                        layer.close(layerNum);
                        resolve();
                    });
                },
                end: function () {
                    $("#mixly-loader-btn").off("click");
                    $("#mixly-loader-btn").css('display', 'inline-block');
                }
            });
        });
    }

    upload(usrFolder, fsType) {
        return new Promise(async (resolve, reject) => {
            try {
                await super.upload(usrFolder, fsType);
            } catch (error) {
                Debug.error(error);
                resolve();
                return;
            }
            const layerNum = layer.open({
                type: 1,
                title: Msg.Lang['shell.uploading'] + '...',
                content: $('#mixly-loader-div'),
                shade: LayerExt.SHADE_NAV,
                resize: false,
                closeBtn: 0,
                success: () => {
                    $("#mixly-loader-btn").off("click").click(() => {
                        $("#mixly-loader-btn").css('display', 'none');
                        layer.title('上传终止中...', layerNum);
                        this.cancel();
                    });
                    const { mainStatusBarTabs } = Mixly;
                    const statusBarTerminal = mainStatusBarTabs.getStatusBarById('output');
                    statusBarTerminal.setValue('');
                    mainStatusBarTabs.changeTo('output');
                    const commandTemplate = this.getSelectedFSUploadCommand();
                    const command = this.#renderTemplate_(commandTemplate);
                    this.#shell_.exec(command)
                    .then((info) => {
                        if (info.code) {
                            statusBarTerminal.addValue(`\n==${Msg.Lang['shell.uploadFailed']}==\n`);
                        } else {
                            statusBarTerminal.addValue(`\n==${Msg.Lang['shell.uploadSucc']}(${Msg.Lang['shell.timeCost']} ${info.time})==\n`);
                        }
                    })
                    .catch(Debug.error)
                    .finally(() => {
                        layer.close(layerNum);
                        resolve();
                    });
                },
                end: function () {
                    $("#mixly-loader-btn").off("click");
                    $("#mixly-loader-btn").css('display', 'inline-block');
                }
            });
        });
    }

    #renderTemplate_(template) {
        const config = this.getConfig();
        return Mustache.render(template, {
            ...config,
            python3: `"${Env.python3Path}"`,
            esptool: `"${Env.python3Path}" "${path.join(Env.srcDirPath, 'tools/python/esptool/__init__.py')}"`
        });
    }

    cancel() {
        this.#shell_ && this.#shell_.kill();
    }
}

Electron.FSBoard = FSBoardExt;

});