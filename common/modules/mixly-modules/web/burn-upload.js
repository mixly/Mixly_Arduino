goog.loadJs('web', () => {

goog.require('path');
goog.require('BoardId');
goog.require('FSWrapper');
goog.require('DAPWrapper');
goog.require('PartialFlashing');
goog.require('ESPTool');
goog.require('AdafruitESPTool');
goog.require('CryptoJS');
goog.require('AvrUploader');
goog.require('Mixly.Env');
goog.require('Mixly.LayerExt');
goog.require('Mixly.Config');
goog.require('Mixly.MFile');
goog.require('Mixly.Boards');
goog.require('Mixly.Msg');
goog.require('Mixly.Workspace');
goog.require('Mixly.Debug');
goog.require('Mixly.HTMLTemplate');
goog.require('Mixly.MString');
goog.require('Mixly.Web.Serial');
goog.require('Mixly.Web.Ampy');
goog.provide('Mixly.Web.BU');

const {
    Env,
    Web,
    LayerExt,
    Config,
    MFile,
    Boards,
    Msg,
    Workspace,
    Debug,
    HTMLTemplate,
    MString
} = Mixly;

const {
    Serial,
    BU,
    Ampy
} = Web;

const { BOARD, SELECTED_BOARD } = Config;

const {
    ESPLoader,
    Transport
} = ESPTool;

BU.uploading = false;
BU.burning = false;

BU.FILMWARE_LAYER = new HTMLTemplate(
    goog.get(path.join(Env.templatePath, 'html/filmware-layer.html'))
).render({
    cancel: Msg.Lang['nav.btn.cancel'],
    burn: Msg.Lang['nav.btn.burn']
});

const BAUD = goog.platform() === 'darwin' ? 460800 : 921600;

if (['BBC micro:bit', 'Mithon CC'].includes(BOARD.boardType)) {
    FSWrapper.setupFilesystem(path.join(Env.boardDirPath, 'build'));
}

BU.requestPort = async () => {
    await Serial.requestPort();
}

const readBinFile = (path, offset) => {
    return new Promise((resolve, reject) => {
        fetch(path)
        .then((response) => {
            return response.blob();
        })
        .then((blob) => {
            const reader = new FileReader();
            reader.onload = function (event) {
                resolve({
                    address: parseInt(offset),
                    data: event.target.result
                });
            };
            reader.onerror = function (error) {
                throw(error);
            }
            reader.readAsBinaryString(blob);
        })
        .catch((error) => {
            reject(error);
        });
    });
}

const readBinFileAsArrayBuffer = (path, offset) => {
    return new Promise((resolve, reject) => {
        fetch(path)
        .then((response) => {
            return response.blob();
        })
        .then((blob) => {
            const reader = new FileReader();
            reader.onload = function (event) {
                resolve({
                    address: parseInt(offset),
                    data: event.target.result
                });
            };
            reader.onerror = function (error) {
                throw(error);
            }
            reader.readAsArrayBuffer(blob);
        })
        .catch((error) => {
            reject(error);
        });
    });
}

BU.initBurn = () => {
    if (['BBC micro:bit', 'Mithon CC'].includes(BOARD.boardType)) {
        BU.burnByUSB();
    } else {
        const { web } = SELECTED_BOARD;
        const boardKey = Boards.getSelectedBoardKey();
        if (!web?.burn?.binFile) {
            return;
        }
        if (typeof web.burn.binFile !== 'object') {
            return;
        }
        if (web.burn.special && web.burn.special instanceof Array) {
            BU.burnWithSpecialBin();
        } else {
            if (boardKey.indexOf('micropython:esp32s2') !== -1) {
                BU.burnWithAdafruitEsptool(web.burn.binFile, web.burn.erase);
            } else {
                BU.burnWithEsptool(web.burn.binFile, web.burn.erase);
            }
        }
    }
}

BU.burnByUSB = async () => {
    const { mainStatusBarTabs } = Mixly;
    let portName = Serial.getSelectedPortName();
    if (!portName) {
        try {
            await BU.requestPort();
            portName = Serial.getSelectedPortName();
            if (!portName) {
                return;
            }
        } catch (error) {
            Debug.error(error);
            return;
        }
    }
    const statusBarSerial = mainStatusBarTabs.getStatusBarById(portName);
    if (statusBarSerial) {
        await statusBarSerial.close();
    }

    const { web } = SELECTED_BOARD;
    const { burn } = web;
    const hexStr = goog.get(path.join(Env.boardDirPath, burn.filePath));
    const hex2Blob = new Blob([ hexStr ], { type: 'text/plain' });
    const buffer = await hex2Blob.arrayBuffer();
    if (!buffer) {
        layer.msg(Msg.Lang['shell.bin.readFailed'], { time: 1000 });
        return;
    }
    BU.burning = true;
    BU.uploading = false;
    const statusBarTerminal = mainStatusBarTabs.getStatusBarById('output');
    statusBarTerminal.setValue(`${Msg.Lang['shell.burning']}...\n`);
    mainStatusBarTabs.show();
    mainStatusBarTabs.changeTo('output');
    const port = Serial.getPort(portName);
    const webUSB = new DAPjs.WebUSB(port);
    const dapLink = new DAPjs.DAPLink(webUSB);
    try {
        await dapLink.connect();
        await dapLink.setSerialBaudrate(115200);
    } catch (error) {
        Debug.error(error);
        return;
    }
    let prevPercent = 0;
    dapLink.on(DAPjs.DAPLink.EVENT_PROGRESS, progress => {
        const nowPercent = Math.floor(progress * 100);
        if (nowPercent > prevPercent) {
            prevPercent = nowPercent;
        } else {
            return;
        }
        const nowProgressLen = Math.floor(nowPercent / 2);
        const leftStr = new Array(nowProgressLen).fill('=').join('');
        const rightStr = (new Array(50 - nowProgressLen).fill('-')).join('');
        statusBarTerminal.addValue(`[${leftStr}${rightStr}] ${nowPercent}%\n`);
    });
    layer.open({
        type: 1,
        title: `${Msg.Lang['shell.burning']}...`,
        content: $('#mixly-loader-div'),
        shade: LayerExt.SHADE_NAV,
        resize: false,
        closeBtn: 0,
        success: async (layero, index) => {
            $('#mixly-loader-btn').hide();
            try {
                await dapLink.flash(buffer);
                layer.close(index);
                layer.msg(Msg.Lang['shell.burnSucc'], { time: 1000 });
                statusBarTerminal.addValue(`==${Msg.Lang['shell.burnSucc']}==\n`);
            } catch (error) {
                Debug.error(error);
                layer.close(index);
                statusBarTerminal.addValue(`==${Msg.Lang['shell.burnFailed']}==\n`);
            } finally {
                dapLink.removeAllListeners(DAPjs.DAPLink.EVENT_PROGRESS);
                await dapLink.disconnect();
                await webUSB.close();
                await port.close();
            }
        },
        end: function () {
            $('#mixly-loader-btn').css('display', 'inline-block');
            $('#mixly-loader-div').css('display', 'none');
        }
    });
}

BU.burnWithEsptool = async (binFile, erase) => {
    const { mainStatusBarTabs } = Mixly;
    let portName = Serial.getSelectedPortName();
    if (!portName) {
        try {
            await BU.requestPort();
            portName = Serial.getSelectedPortName();
            if (!portName) {
                return;
            }
        } catch (error) {
            Debug.error(error);
            return;
        }
    }
    const statusBarSerial = mainStatusBarTabs.getStatusBarById(portName);
    if (statusBarSerial) {
        await statusBarSerial.close();
    }
    const port = Serial.getPort(portName);
    const statusBarTerminal = mainStatusBarTabs.getStatusBarById('output');
    statusBarTerminal.setValue(Msg.Lang['shell.burning'] + '...\n');
    mainStatusBarTabs.show();
    mainStatusBarTabs.changeTo('output');
    let esploader = null;
    let transport = null;
    try {
        transport = new Transport(port, false);
        esploader = new ESPLoader({
            transport,
            baudrate: BAUD,
            terminal: {
                clean() {
                    statusBarTerminal.setValue('');
                },
                writeLine(data) {
                    statusBarTerminal.addValue(data + '\n');
                },
                write(data) {
                    statusBarTerminal.addValue(data);
                }
            }
        });
        let chip = await esploader.main();
    } catch (error) {
        Debug.error(error);
        statusBarTerminal.addValue(`\n${error.toString()}\n`);
        await transport.disconnect();
        return;
    }

    statusBarTerminal.addValue(Msg.Lang['shell.bin.reading'] + "...");
    let firmwarePromise = [];
    statusBarTerminal.addValue("\n");
    for (let i of binFile) {
        if (i.path && i.offset) {
            let absolutePath = path.join(Env.boardDirPath, i.path);
            // statusBarTerminal.addValue(`${Msg.Lang['读取固件'] + ' '
            //     + Msg.Lang['路径']}:${absolutePath}, ${Msg.Lang['偏移']}:${i.offset}\n`);
            firmwarePromise.push(readBinFile(absolutePath, i.offset));
        }
    }
    let data = null;
    try {
        data = await Promise.all(firmwarePromise);
    } catch (error) {
        statusBarTerminal.addValue("Failed!\n" + Msg.Lang['shell.bin.readFailed'] + "！\n");
        statusBarTerminal.addValue("\n" + e + "\n", true);
        await transport.disconnect();
        return;
    }
    statusBarTerminal.addValue("Done!\n");
    BU.burning = true;
    BU.uploading = false;
    const flashOptions = {
        fileArray: data,
        flashSize: 'keep',
        eraseAll: erase,
        compress: true,
        calculateMD5Hash: (image) => CryptoJS.MD5(CryptoJS.enc.Latin1.parse(image))
    };
    layer.open({
        type: 1,
        title: Msg.Lang['shell.burning'] + '...',
        content: $('#mixly-loader-div'),
        shade: LayerExt.SHADE_NAV,
        resize: false,
        closeBtn: 0,
        success: async function (layero, index) {
            let cancel = false;
            $("#mixly-loader-btn").off().click(async () => {
                cancel = true;
                try {
                    await transport.disconnect();
                } catch (error) {
                    layer.close(index);
                    Debug.error(error);
                }
            });
            try {
                await esploader.writeFlash(flashOptions);
                layer.msg(Msg.Lang['shell.burnSucc'], { time: 1000 });
                statusBarTerminal.addValue(`==${Msg.Lang['shell.burnSucc']}==\n`);
            } catch (error) {
                Debug.error(error);
                statusBarTerminal.addValue(`==${Msg.Lang['shell.burnFailed']}==\n`);
            } finally {
                layer.close(index);
                if (!cancel) {
                    await transport.disconnect();
                }
            }
        }
    });
}

BU.burnWithAdafruitEsptool = async (binFile, erase) => {
    const { mainStatusBarTabs } = Mixly;
    let portName = Serial.getSelectedPortName();
    if (!portName) {
        try {
            await BU.requestPort();
            portName = Serial.getSelectedPortName();
            if (!portName) {
                return;
            }
        } catch (error) {
            Debug.error(error);
            return;
        }
    }
    const statusBarSerial = mainStatusBarTabs.getStatusBarById(portName);
    if (statusBarSerial) {
        await statusBarSerial.close();
    }
    const port = Serial.getPort(portName);
    const statusBarTerminal = mainStatusBarTabs.getStatusBarById('output');
    statusBarTerminal.setValue(Msg.Lang['shell.burning'] + '...\n');
    mainStatusBarTabs.show();
    mainStatusBarTabs.changeTo('output');
    let esploader = null;
    let transport = null;
    let espStub = null;
    try {
        await port.open({ baudRate: 115200 });
        esploader = new AdafruitESPTool.ESPLoader(port, {
            log(...args) {
                statusBarTerminal.addValue(args.join('') + '\n');
            },
            debug(...args) {
                statusBarTerminal.addValue(args.join('') + '\n');
            },
            error(...args) {
                statusBarTerminal.addValue(args.join('') + '\n');
            }
        });
        await esploader.initialize();
        espStub = await esploader.runStub();
    } catch (error) {
        Debug.error(error);
        statusBarTerminal.addValue(`\n${error.toString()}\n`);
        await port.close();
        return;
    }

    statusBarTerminal.addValue(Msg.Lang['shell.bin.reading'] + "...");
    let firmwarePromise = [];
    statusBarTerminal.addValue("\n");
    for (let i of binFile) {
        if (i.path && i.offset) {
            let absolutePath = path.join(Env.boardDirPath, i.path);
            // statusBarTerminal.addValue(`${Msg.Lang['读取固件'] + ' '
            //     + Msg.Lang['路径']}:${absolutePath}, ${Msg.Lang['偏移']}:${i.offset}\n`);
            firmwarePromise.push(readBinFileAsArrayBuffer(absolutePath, i.offset));
        }
    }
    let data = null;
    try {
        data = await Promise.all(firmwarePromise);
    } catch (error) {
        statusBarTerminal.addValue("Failed!\n" + Msg.Lang['shell.bin.readFailed'] + "！\n");
        statusBarTerminal.addValue("\n" + e + "\n", true);
        await espStub.disconnect();
        await espStub.port.close();
        return;
    }
    statusBarTerminal.addValue("Done!\n");
    BU.burning = true;
    BU.uploading = false;
    const layerNum = layer.open({
        type: 1,
        title: Msg.Lang['shell.burning'] + '...',
        content: $('#mixly-loader-div'),
        shade: LayerExt.SHADE_NAV,
        resize: false,
        closeBtn: 0,
        success: async function (layero, index) {
            let cancel = false;
            $("#mixly-loader-btn").hide();
            try {
                if (erase) {
                    await espStub.eraseFlash();
                }
                for (let file of data) {
                    await espStub.flashData(
                        file.data,
                        (bytesWritten, totalBytes) => {
                            const percent = Math.floor((bytesWritten / totalBytes) * 100) + '%';
                            statusBarTerminal.addValue(`Writing at 0x${(file.address + bytesWritten).toString(16)}... (${percent})\n`);
                        },
                        file.address, true
                    );
                }
                await espStub.disconnect();
                await espStub.port.close();
                cancel = true;
                layer.msg(Msg.Lang['shell.burnSucc'], { time: 1000 });
                statusBarTerminal.addValue(`==${Msg.Lang['shell.burnSucc']}==\n`);
            } catch (error) {
                Debug.error(error);
                statusBarTerminal.addValue(`==${Msg.Lang['shell.burnFailed']}==\n`);
            } finally {
                layer.close(index);
                if (!cancel) {
                    await espStub.disconnect();
                    await espStub.port.close();
                }
            }
        },
        end: function () {
            $(`#layui-layer-shade${layerNum}`).remove();
        }
    });
}

BU.getImportModulesName = (code) => {
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

BU.getImportModules = (code) => {
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
    let currentImports = BU.getImportModulesName(code);
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

BU.initUpload = async () => {
    let portName = Serial.getSelectedPortName();
    if (!portName) {
        try {
            await BU.requestPort();
            portName = Serial.getSelectedPortName();
            if (!portName) {
                return;
            }
        } catch (error) {
            Debug.error(error);
            return;
        }
    }
    if (['BBC micro:bit', 'Mithon CC'].includes(BOARD.boardType)) {
        BU.uploadByUSB(portName);
    } else {
        BU.uploadWithAmpy(portName);
    }
}

BU.uploadByUSB = async (portName) => {
    const { mainStatusBarTabs } = Mixly;
    if (!portName) {
        try {
            await BU.requestPort();
            portName = Serial.getSelectedPortName();
            if (!portName) {
                return;
            }
        } catch (error) {
            Debug.error(error);
            return;
        }
    }
    let statusBarSerial = mainStatusBarTabs.getStatusBarById(portName);
    if (statusBarSerial) {
        await statusBarSerial.close();
    }

    const port = Serial.getPort(portName);
    const statusBarTerminal = mainStatusBarTabs.getStatusBarById('output');
    const dapWrapper = new DAPWrapper(port, {
        event: () => {},
        log: () => {}
    });
    const partialFlashing = new PartialFlashing(dapWrapper, {
        event: () => {}
    });

    let boardId = 0x9901;
    const boardKey = Boards.getSelectedBoardKey();
    if (boardKey === 'micropython:nrf51822:v2') {
        boardId = 0x9903;
    }

    BU.burning = false;
    BU.uploading = true;
    statusBarTerminal.setValue(Msg.Lang['shell.uploading'] + '...\n');
    mainStatusBarTabs.show();
    mainStatusBarTabs.changeTo('output');
    const mainWorkspace = Workspace.getMain();
    const editor = mainWorkspace.getEditorsManager().getActive();
    const code = editor.getCode();
    FSWrapper.writeFile('main.py', code);
    const importsMap = BU.getImportModules(code);
    for (let key in importsMap) {
        const filename = importsMap[key]['__name__'];
        const data = goog.get(importsMap[key]['__path__']);
        FSWrapper.writeFile(filename, data);
    }
    const layerNum = layer.open({
        type: 1,
        title: Msg.Lang['shell.uploading'] + '...',
        content: $('#mixly-loader-div'),
        shade: LayerExt.SHADE_NAV,
        resize: false,
        closeBtn: 0,
        success: async function (layero, index) {
            $('#mixly-loader-btn').hide();
            try {
                let prevPercent = 0;
                await partialFlashing.flashAsync(new BoardId(0x9900), FSWrapper, progress => {
                    const nowPercent = Math.floor(progress * 100);
                    if (nowPercent > prevPercent) {
                        prevPercent = nowPercent;
                    } else {
                        return;
                    }
                    const nowProgressLen = Math.floor(nowPercent / 2);
                    const leftStr = new Array(nowProgressLen).fill('=').join('');
                    const rightStr = (new Array(50 - nowProgressLen).fill('-')).join('');
                    statusBarTerminal.addValue(`[${leftStr}${rightStr}] ${nowPercent}%\n`);
                });
                layer.close(index);
                layer.msg(Msg.Lang['shell.uploadSucc'], { time: 1000 });
                statusBarTerminal.addValue(`==${Msg.Lang['shell.uploadSucc']}==\n`);
                if (!statusBarSerial) {
                    mainStatusBarTabs.add('serial', portName);
                    statusBarSerial = mainStatusBarTabs.getStatusBarById(portName);
                }
                statusBarSerial.setValue('');
                mainStatusBarTabs.changeTo(portName);
                await statusBarSerial.open();
            } catch (error) {
                await dapWrapper.disconnectAsync();
                layer.close(index);
                console.error(error);
                statusBarTerminal.addValue(`${error}\n`);
                statusBarTerminal.addValue(`==${Msg.Lang['shell.uploadFailed']}==\n`);
            }
            BU.burning = false;
            BU.uploading = false;
        },
        end: function () {
            $('#mixly-loader-btn').css('display', 'inline-block');
            $('#mixly-loader-div').css('display', 'none');
            $(`#layui-layer-shade${layerNum}`).remove();
        }
    });
}

BU.uploadWithAmpy = (portName) => {
    const { mainStatusBarTabs } = Mixly;
    const statusBarTerminal = mainStatusBarTabs.getStatusBarById('output');
    let statusBarSerial = mainStatusBarTabs.getStatusBarById(portName);
    BU.burning = false;
    BU.uploading = true;
    statusBarTerminal.setValue(Msg.Lang['shell.uploading'] + '...\n');
    mainStatusBarTabs.show();
    mainStatusBarTabs.changeTo('output');
    const mainWorkspace = Workspace.getMain();
    const editor = mainWorkspace.getEditorsManager().getActive();
    let useBuffer = true, dataLength = 256;
    if (Serial.type === 'usb') {
        dataLength = 64;
    } else if (Serial.type === 'hid') {
        dataLength = 31;
    }
    const layerNum = layer.open({
        type: 1,
        title: Msg.Lang['shell.uploading'] + '...',
        content: $('#mixly-loader-div'),
        shade: LayerExt.SHADE_NAV,
        resize: false,
        closeBtn: 0,
        success: async function (layero, index) {
            $('#mixly-loader-btn').hide();
            const serial = new Serial(portName);
            const ampy = new Ampy(serial, useBuffer, dataLength);
            const code = editor.getCode();
            let closePromise = Promise.resolve();
            if (statusBarSerial) {
                closePromise = statusBarSerial.close();
            }
            try {
                /*const importsMap = BU.getImportModules(code);
                let libraries = {};
                for (let key in importsMap) {
                    const filename = importsMap[key]['__name__'];
                    const data = goog.get(importsMap[key]['__path__']);
                    libraries[filename] = {
                        data,
                        size: importsMap[key]['__size__']
                    };
                }*/
                await closePromise;
                await ampy.enter();
                statusBarTerminal.addValue('Writing main.py ');
                await ampy.put('main.py', code);
                statusBarTerminal.addValue('Done!\n');
                /*const rootInfo = await ampy.ls('/');
                let rootMap = {};
                for (let item of rootInfo) {
                    rootMap[item[0]] = item[1];
                }
                if (libraries && libraries instanceof Object) {
                    for (let key in libraries) {
                        if (rootMap[`/${key}`] !== undefined && rootMap[`/${key}`] === libraries[key].size) {
                            statusBarTerminal.addValue(`Skip ${key}\n`);
                            continue;
                        }
                        statusBarTerminal.addValue(`Writing ${key} `);
                        await ampy.put(key, libraries[key].data);
                        statusBarTerminal.addValue('Done!\n');
                    }
                }*/
                await ampy.exit();
                await ampy.dispose();
                layer.close(index);
                layer.msg(Msg.Lang['shell.uploadSucc'], { time: 1000 });
                statusBarTerminal.addValue(`==${Msg.Lang['shell.uploadSucc']}==\n`);
                if (!statusBarSerial) {
                    mainStatusBarTabs.add('serial', portName);
                    statusBarSerial = mainStatusBarTabs.getStatusBarById(portName);
                }
                statusBarSerial.setValue('');
                mainStatusBarTabs.changeTo(portName);
                await statusBarSerial.open();
            } catch (error) {
                ampy.dispose();
                layer.close(index);
                Debug.error(error);
                statusBarTerminal.addValue(`${error}\n`);
                statusBarTerminal.addValue(`==${Msg.Lang['shell.uploadFailed']}==\n`);
            }
            BU.burning = false;
            BU.uploading = false;
        },
        end: function () {
            $('#mixly-loader-btn').css('display', 'inline-block');
            $('#mixly-loader-div').css('display', 'none');
            $(`#layui-layer-shade${layerNum}`).remove();
        }
    });
}

function hexToBuf (hex) {
    var typedArray = new Uint8Array(hex.match(/[\da-f]{2}/gi).map(function (h) {
        return parseInt(h, 16)
    }));
    
    return typedArray.buffer;
}

BU.uploadWithEsptool = async (endType, obj, layerType) => {
    const portName = 'web-serial';
    const portObj = Serial.portsOperator[portName];
    const { serialport, toolConfig } = portObj;
    let prevBaud = toolConfig.baudRates;
    if (prevBaud !== 115200) {
        toolConfig.baudRates = 115200;
        await serialport.setBaudRate(toolConfig.baudRates);
    }
    const { mainStatusBarTabs } = Mixly;
    const statusBarTerminal = mainStatusBarTabs.getStatusBarById('output');
    let firmwareData = obj.data;
    if (endType || typeof firmwareData !== 'object') {
        statusBarTerminal.addValue(Msg.Lang['shell.bin.readFailed'] + "！\n");
        layer.close(layerType);
        return;
    }
    layer.title(Msg.Lang['shell.uploading'] + '...', layerType);
    statusBarTerminal.addValue(Msg.Lang['shell.bin.reading'] + "... ");
    let firmwareList = [];
    for (let i of firmwareData) {
        if (!i.offset || !i.data) {
            continue;
        }
        const firmware = {
            offset: i.offset,
            binBuf: hexToBuf(i.data)
        };
        firmwareList.push(firmware);
    }
    statusBarTerminal.addValue("Done!\n");
    BU.burning = true;
    BU.uploading = false;
    statusBarTerminal.addValue(Msg.Lang['shell.uploading'] + '...\n');
    mainStatusBarTabs.show();
    mainStatusBarTabs.changeTo('output');
    try {
        SerialPort.refreshOutputBuffer = false;
        SerialPort.refreshInputBuffer = true;
        await espTool.reset();
        if (await clickSync()) {
            // await clickErase();
            for (let i of firmwareList) {
                await clickProgram(i.offset, i.binBuf);
            }
        }
        layer.close(layerType);
        layer.msg(Msg.Lang['shell.uploadSucc'], { time: 1000 });
        statusBarTerminal.addValue(`==${Msg.Lang['shell.uploadSucc']}==\n`);
        Serial.reset(portName, 'upload');
        mainStatusBarTabs.changeTo(portName);
    } catch (error) {
        Debug.error(error);
        layer.close(layerType);
        statusBarTerminal.addValue(`==${Msg.Lang['shell.uploadFailed']}==\n`);
    } finally {
        SerialPort.refreshOutputBuffer = true;
        SerialPort.refreshInputBuffer = false;
        const code = MFile.getCode();
        const baudRateList = code.match(/(?<=Serial.begin[\s]*\([\s]*)[0-9]*(?=[\s]*\))/g);
        if (baudRateList && Serial.BAUDRATES.includes(baudRateList[0]-0)) {
            prevBaud = baudRateList[0]-0;
        }
        if (toolConfig.baudRates !== prevBaud) {
            toolConfig.baudRates = prevBaud;
            await serialport.setBaudRate(prevBaud);
        }
    }
}

BU.uploadWithAvrUploader = async (endType, obj, layerType) => {
    let firmwareData = obj.data;
    const { mainStatusBarTabs } = Mixly;
    const statusBarTerminal = mainStatusBarTabs.getStatusBarById('output');
    if (endType || typeof firmwareData !== 'object') {
        statusBarTerminal.addValue(Msg.Lang['shell.bin.readFailed'] + "！\n");
        layer.close(layerType);
        return;
    }
    statusBarTerminal.addValue(Msg.Lang['shell.uploading'] + '...\n');
    layer.title(Msg.Lang['shell.uploading'] + '...', layerType);
    let uploadSucMessageShow = true;
    AvrUploader.upload(firmwareData[0].data, (progress) => {
        if (progress >= 100 && uploadSucMessageShow) {
            statusBarTerminal.addValue(`==${Msg.Lang['shell.uploadSucc']}==\n`);
            layer.msg(Msg.Lang['shell.uploadSucc'], { time: 1000 });
            layer.close(layerType);
            uploadSucMessageShow = false;
        }
    }, true)
    .catch((error) => {
        layer.close(layerType);
        statusBarTerminal.addValue(`==${Msg.Lang['shell.uploadFailed']}==\n`);
    });
}

/**
 * @function 特殊固件的烧录
 * @return {void}
 **/
BU.burnWithSpecialBin = () => {
    const { mainStatusBarTabs } = Mixly;
    const statusBarTerminal = mainStatusBarTabs.getStatusBarById('output');
    const firmwares = SELECTED_BOARD.web.burn.special;
    let menu = [];
    let firmwareMap = {};
    for (let firmware of firmwares) {
        if (!firmware?.name && !firmware?.binFile) return;
        menu.push({
            id: firmware.name,
            text: firmware.name
        });
        firmwareMap[firmware.name] = firmware.binFile;
    }
    const layerNum = LayerExt.open({
        title: [Msg.Lang['nav.btn.burn'], '36px'],
        area: ['400px', '160px'],
        max: false,
        min: false,
        content: BU.FILMWARE_LAYER,
        shade: LayerExt.SHADE_ALL,
        resize: false,
        success: function (layero, index) {
            const $select = layero.find('select');
            $select.select2({
                data: menu,
                minimumResultsForSearch: 50,
                width: '360px',
                dropdownCssClass: 'mixly-scrollbar'
            });
            layero.find('button').click((event) => {
                const $target = $(event.currentTarget);
                const type = $target.attr('data-id');
                const binFile = firmwareMap[$select.val()];
                layer.close(index, () => {
                    if (type !== 'burn') {
                        return;
                    }
                    const boardKey = Boards.getSelectedBoardKey();
                    const { web } = SELECTED_BOARD;
                    if (boardKey.indexOf('micropython:esp32s2') !== -1) {
                        BU.burnWithAdafruitEsptool(binFile, web.burn.erase);
                    } else {
                        BU.burnWithEsptool(binFile, web.burn.erase);
                    }
                });
            });
        },
        beforeEnd: function (layero) {
            layero.find('select').select2('destroy');
            layero.find('button').off();
        },
        end: function () {
            $(`#layui-layer-shade${layerNum}`).remove();
        }
    });
}

});