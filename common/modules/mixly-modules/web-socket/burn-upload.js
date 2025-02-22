goog.loadJs('web', () => {

goog.require('path');
goog.require('layui');
goog.require('dayjs.duration');
goog.require('Mixly.Debug');
goog.require('Mixly.LayerExt');
goog.require('Mixly.Msg');
goog.require('Mixly.Env');
goog.require('Mixly.Config');
goog.require('Mixly.Workspace');
goog.require('Mixly.MString');
goog.require('Mixly.WebSocket.Serial');
goog.provide('Mixly.WebSocket.BU');

const {
    Debug,
    LayerExt,
    Config,
    Msg,
    Env,
    Workspace,
    MString,
    WebSocket
} = Mixly;

const { SELECTED_BOARD } = Config;

const { Serial } = WebSocket;


class WebSocketBU {
    static {
        this.mixlySocket = null;
        this.socket = null;
        this.shell = null;

        this.getSocket = function () {
            return this.socket;
        }

        this.getMixlySocket = function () {
            return this.mixlySocket;
        }

        this.init = function (mixlySocket) {
            this.mixlySocket = mixlySocket;
            this.socket = mixlySocket.getSocket();
            this.shell = new WebSocketBU();
            const socket = this.socket;

            socket.on('micropython.dataEvent', (data) => {
                const { mainStatusBarTabs } = Mixly;
                const statusBarTerminal = mainStatusBarTabs.getStatusBarById('output');
                statusBarTerminal.addValue(data);
            });

            socket.on('micropython.errorEvent', (data) => {
                const { mainStatusBarTabs } = Mixly;
                const statusBarTerminal = mainStatusBarTabs.getStatusBarById('output');
                statusBarTerminal.addValue(data);
            });
        }

        this.initBurn = function () {
            if (!this.mixlySocket.isConnected()) {
                layer.msg('服务端已离线', { time: 1000 });
                return;
            }
            const port = Serial.getSelectedPortName();
            if (!port) {
                layer.msg(Msg.Lang['statusbar.serial.noDevice'], {
                    time: 1000
                });
                return;
            }
            const { mainStatusBarTabs } = Mixly;
            const statusBarTerminal = mainStatusBarTabs.getStatusBarById('output');
            mainStatusBarTabs.changeTo('output');
            mainStatusBarTabs.show();
            statusBarTerminal.setValue(`${Msg.Lang['shell.burning']}...\n`);
            const statusBarSerial = mainStatusBarTabs.getStatusBarById(port);
            const closePromise = statusBarSerial ? statusBarSerial.close() : Promise.resolve();
            closePromise
                .then(() => {
                    return this.shell.burn(port);
                })
                .then((info) => {
                    this.endCallback(info.code, info.time);
                })
                .catch((error) => {
                    Debug.error(error);
                    statusBarTerminal.addValue(`\n==${Msg.Lang['shell.burnFailed']}==\n`);
                });
        }

        this.initUpload = function () {
            if (!this.mixlySocket.isConnected()) {
                layer.msg('服务端已离线', { time: 1000 });
                return;
            }
            const port = Serial.getSelectedPortName();
            if (!port) {
                layer.msg(Msg.Lang['statusbar.serial.noDevice'], {
                    time: 1000
                });
                return;
            }
            const { mainStatusBarTabs } = Mixly;
            const statusBarTerminal = mainStatusBarTabs.getStatusBarById('output');
            mainStatusBarTabs.changeTo('output');
            mainStatusBarTabs.show();
            statusBarTerminal.setValue(`${Msg.Lang['shell.uploading']}...\n`);
            const mainWorkspace = Workspace.getMain();
            const editor = mainWorkspace.getEditorsManager().getActive();
            const code = editor.getCode();
            const statusBarSerial = mainStatusBarTabs.getStatusBarById(port);
            const closePromise = statusBarSerial ? statusBarSerial.close() : Promise.resolve();
            closePromise
                .then(() => {
                    return this.shell.upload(port, code)
                })
                .then((info) => {
                    this.endCallback(info.code, info.time);
                    if (info.code || !Serial.portIsLegal(port)) {
                        return;
                    }
                    mainStatusBarTabs.add('serial', port);
                    mainStatusBarTabs.changeTo(port);
                    const statusBarSerial = mainStatusBarTabs.getStatusBarById(port);
                    statusBarSerial.open()
                        .then(() => {
                            return statusBarSerial.setBaudRate(115200);
                        })
                        .catch(Debug.error);
                })
                .catch((error) => {
                    Debug.error(error);
                    statusBarTerminal.addValue(`\n==${Msg.Lang['shell.uploadFailed']}==\n`);
                });
        }

        this.endCallback = function (code, time) {
            const { mainStatusBarTabs } = Mixly;
            const statusBarTerminal = mainStatusBarTabs.getStatusBarById('output');
            mainStatusBarTabs.changeTo('output');
            let message = '';
            if (code) {
                message = (this.shell.isBurning() ? Msg.Lang['shell.burnFailed'] : Msg.Lang['shell.uploadFailed']);
                statusBarTerminal.addValue(`\n==${message}==\n`);
            } else {
                message = (this.shell.isBurning() ? Msg.Lang['shell.burnSucc'] : Msg.Lang['shell.uploadSucc']);
                statusBarTerminal.addValue(`\n==${message}(${Msg.Lang['shell.timeCost']} ${
                    dayjs.duration(time).format('HH:mm:ss.SSS')
                })==\n`);
            }
            layer.msg(message, { time: 1000 });
        }
    }

    #running_ = false;
    #upload_ = false;
    #layerNum_ = null;

    constructor() {}

    async burn(port) {
        return new Promise(async (resolve, reject) => {
            this.#running_ = true;
            this.#upload_ = false;
            await this.showProgress();
            const config = {
                boardDirPath: `.${Env.boardDirPath}`,
                port,
                command: SELECTED_BOARD.burn.command
            };
            const mixlySocket = WebSocketBU.getMixlySocket();
            mixlySocket.emit('micropython.burn', config, (response) => {
                this.hideProgress();
                if (response.error) {
                    reject(response.error);
                    return;
                }
                const [error, result] = response;
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    }

    async upload(port, code) {
        return new Promise(async (resolve, reject) => {
            this.#running_ = true;
            this.#upload_ = true;
            await this.showProgress();

            const importsMap = this.getImportModules(code);
            let libraries = {};
            for (let key in importsMap) {
                const filename = importsMap[key]['__name__'];
                const data = goog.get(importsMap[key]['__path__']);
                libraries[filename] = data;
            }
            const config = {
                boardDirPath: `.${Env.boardDirPath}`,
                command: SELECTED_BOARD.upload.command,
                filePath: SELECTED_BOARD.upload.filePath,
                port, code, libraries
            };
            
            const mixlySocket = WebSocketBU.getMixlySocket();
            mixlySocket.emit('micropython.upload', config, (response) => {
                this.hideProgress();
                if (response.error) {
                    reject(response.error);
                    return;
                }
                const [error, result] = response;
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    }

    getImportModulesName(code) {
        // 正则表达式: 匹配 import 或 from 导入语句
        const importRegex = /(?:import\s+([a-zA-Z0-9_]+)|from\s+([a-zA-Z0-9_]+)\s+import)/g;

        let imports = [];
        let match;
        while ((match = importRegex.exec(code)) !== null) {
            if (match[1]) {
                imports.push(match[1]); // 'import module'
            }
            if (match[2]) {
                imports.push(match[2]); // 'from module import ...'
            }
        }
        return imports;
    }

    getImportModules(code) {
        let importsMap = {};
        const libPath = SELECTED_BOARD.upload.libPath;
        for (let i = libPath.length - 1; i >= 0; i--) {
            const dirname = MString.tpl(libPath[i], { indexPath: Env.boardDirPath });
            const map = goog.getJSON(path.join(dirname, 'map.json'));
            if (!(map && map instanceof Object)) {
                continue;
            }
            for (let key in map) {
                importsMap[key] = structuredClone(map[key]);
                importsMap[key]['__path__'] = path.join(dirname, map[key]['__name__']);
            }
        }

        let usedMap = {};
        let currentImports = this.getImportModulesName(code);
        while (currentImports.length) {
            let temp = [];
            for (let moduleName of currentImports) {
                let moduleInfo = importsMap[moduleName];
                if (!moduleInfo) {
                    continue;
                }
                usedMap[moduleName] = moduleInfo;
                const moduleImports = moduleInfo['__require__'];
                if (!moduleImports) {
                    continue;
                }
                for (let name of moduleImports) {
                    if (usedMap[name] || !importsMap[name] || temp.includes(name)) {
                        continue;
                    }
                    temp.push(name);
                }
            }
            currentImports = temp;
        }
        return usedMap;
    }

    async kill() {
        return new Promise(async (resolve, reject) => {
            const mixlySocket = WebSocketBU.getMixlySocket();
            mixlySocket.emit('micropython.kill', (response) => {
                if (response.error) {
                    reject(response.error);
                    return;
                }
                const [error, result] = response;
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    }

    async showProgress() {
        return new Promise((resolve, reject) => {
            this.#layerNum_ = layer.open({
                type: 1,
                title: `${this.isCompiling ? Msg.Lang['shell.burning'] : Msg.Lang['shell.uploading']}...`,
                content: $('#mixly-loader-div'),
                shade: LayerExt.SHADE_NAV,
                resize: false,
                closeBtn: 0,
                success: () => {
                    $('#mixly-loader-btn').off('click').click(() => {
                        $('#mixly-loader-btn').css('display', 'none');
                        layer.title(`${Msg.Lang['shell.aborting']}...`, this.layerNum);
                        this.kill().catch(Debug.error);
                    });
                    resolve();
                },
                end: function () {
                    $('#mixly-loader-btn').off('click');
                    $('#mixly-loader-btn').css('display', 'inline-block');
                }
            });
        })
    }

    hideProgress() {
        layer.close(this.#layerNum_);
    }

    isUploading() {
        return this.#running_ && this.#upload_;
    }

    isBurning() {
        return this.#running_ && !this.#upload_;
    }
}

WebSocket.BU = WebSocketBU;

});