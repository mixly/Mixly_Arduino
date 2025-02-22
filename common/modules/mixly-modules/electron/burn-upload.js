goog.loadJs('electron', () => {

goog.require('layui');
goog.require('Mixly.Config');
goog.require('Mixly.LayerExt');
goog.require('Mixly.Env');
goog.require('Mixly.Boards');
goog.require('Mixly.MString');
goog.require('Mixly.Msg');
goog.require('Mixly.Workspace');
goog.require('Mixly.Debug');
goog.require('Mixly.HTMLTemplate');
goog.require('Mixly.Electron.Serial');
goog.provide('Mixly.Electron.BU');

const {
    Electron,
    Config,
    LayerExt,
    Env,
    Boards,
    MString,
    Msg,
    Workspace,
    Serial,
    Debug,
    HTMLTemplate
} = Mixly;

const { BU } = Electron;
const { BOARD, SELECTED_BOARD, USER } = Config;

var downloadShell = null;

const { form } = layui;

const fs = Mixly.require('node:fs');
const fs_plus = Mixly.require('fs-plus');
const fs_extra = Mixly.require('fs-extra');
const path = Mixly.require('node:path');
const child_process = Mixly.require('node:child_process');
const iconv_lite = Mixly.require('iconv-lite');
const os = Mixly.require('node:os');

BU.uploading = false;

BU.burning = false;

BU.shell = null;

BU.FILMWARE_LAYER = new HTMLTemplate(
    goog.get(path.join(Env.templatePath, 'html/filmware-layer.html'))
).render({
    cancel: Msg.Lang['nav.btn.cancel'],
    burn: Msg.Lang['nav.btn.burn']
});

/**
 * @function 根据传入的stdout判断磁盘数量并选择对应操作
 * @param type {string} 值为'burn' | 'upload'
 * @param stdout {string} 磁盘名称字符串，形如'G:K:F:'
 * @param startPath {string} 需要拷贝的文件路径
 * @return {void}
 **/
BU.checkNumOfDisks = function (type, stdout, startPath) {
    const { mainStatusBarTabs } = Mixly;
    const statusBarTerminal = mainStatusBarTabs.getStatusBarById('output');
    let wmicResult = stdout;
    wmicResult = wmicResult.replace(/\s+/g, "");
    wmicResult = wmicResult.replace("DeviceID", "");
    // wmicResult = 'G:K:F:';
    let result = wmicResult.split(':');
    let pathAdd = (Env.currentPlatform === "win32") ? ':' : '';
    if (stdout.indexOf(":") != stdout.lastIndexOf(":")) {
        let form = layui.form;
        let devicesName = $('#mixly-selector-type');
        let oldDevice = $('#mixly-selector-type option:selected').val();
        devicesName.empty();
        for (let i = 0; i < result.length; i++) {
            if (result[i]) {
                if (oldDevice == result[i] + pathAdd) {
                    devicesName.append('<option value="' + result[i] + pathAdd + '" selected>' + result[i] + pathAdd + '</option>');
                } else {
                    devicesName.append('<option value="' + result[i] + pathAdd + '">' + result[i] + pathAdd + '</option>');
                }
            }
        }
        form.render();
        let initBtnClicked = false;
        const layerNum = layer.open({
            type: 1,
            id: "serial-select",
            title: Msg.Lang['shell.tooManyDevicesInfo'],
            area: ['350px', '150px'],
            content: $('#mixly-selector-div'),
            shade: LayerExt.SHADE_ALL,
            resize: false,
            closeBtn: 0,
            success: function (layero) {
                $('#serial-select').css('height', '195px');
                $(".layui-layer-page").css("z-index","198910151");
                $("#mixly-selector-btn1").off("click").click(() => {
                    layer.close(layerNum);
                    BU.cancel();
                });
                $("#mixly-selector-btn2").off("click").click(() => {
                    layer.close(layerNum);
                    initBtnClicked = true;
                });
            },
            end: function () {
                $('#mixly-selector-div').css('display', 'none');
                $("#layui-layer-shade" + layerNum).remove();
                if (initBtnClicked) {
                    BU.initWithDropdownBox(type, startPath);
                }
                $("#mixly-selector-btn1").off("click");
                $("#mixly-selector-btn2").off("click");
            }
        });
    } else {
        const layerNum = layer.open({
            type: 1,
            title: (type === 'burn'? Msg.Lang['shell.burning'] : Msg.Lang['shell.uploading']) + '...',
            content: $('#mixly-loader-div'),
            shade: LayerExt.SHADE_ALL,
            resize: false,
            closeBtn: 0,
            success: function (layero, index) {
                if (type === 'burn') {
                    BU.copyFiles(type, index, startPath, result[0] + pathAdd + '/');
                } else {
                    const mainWorkspace = Workspace.getMain();
                    const editor = mainWorkspace.getEditorsManager().getActive();
                    const code = editor.getCode();
                    fs_extra.outputFile(startPath, code)
                    .then(() => {
                        BU.copyFiles(type, index, startPath, result[0] + pathAdd + '/');
                    })
                    .catch((error) => {
                        layer.close(index);
                        BU.burning = false;
                        BU.uploading = false;
                        statusBarTerminal.setValue(error + '\n');
                    });
                }
                $("#mixly-loader-btn").off("click").click(() => {
                    layer.close(index);
                    BU.cancel();
                });
            },
            end: function () {
                $('#mixly-selector-div').css('display', 'none');
                $("#layui-layer-shade" + layerNum).remove();
                $("#mixly-loader-btn").off("click");
            }
        });
    }
}

/**
 * @function 将文件或文件夹下所有文件拷贝到指定文件夹
 * @param type {string} 值为'burn' | 'upload'
 * @param layerNum {number} 烧录或上传加载弹窗的编号，用于关闭此弹窗
 * @param startPath {string} 需要拷贝的文件或文件夹的路径
 * @param desPath {string} 文件的目的路径
 **/
BU.copyFiles = (type, layerNum, startPath, desPath) => {
    const { mainStatusBarTabs } = Mixly;
    const statusBarTerminal = mainStatusBarTabs.getStatusBarById('output');
    const { burn, upload } = SELECTED_BOARD;
    if (type === 'upload' && upload.copyLib) {
        const mainWorkspace = Workspace.getMain();
        const editor = mainWorkspace.getEditorsManager().getActive();
        const code = editor.getCode();
        let startLibPath = path.dirname(upload.filePath);
        let pyFileArr = BU.copyLib(startPath, code);
        startPath = path.dirname(startPath);
    }
    // 如果需要拷贝的是文件，则在目的路径后要加上文件名
    if (fs_plus.isFileSync(startPath)) {
        desPath = path.join(desPath, path.basename(startPath));
    }
    fs_extra.copy(startPath, desPath)
    .then(() => {
        layer.close(layerNum);
        const message = (type === 'burn'? Msg.Lang['shell.burnSucc'] : Msg.Lang['shell.uploadSucc']);
        layer.msg(message, {
            time: 1000
        });
        statusBarTerminal.setValue(`==${message}==`);
        if (type === 'upload' && Serial.uploadPorts.length === 1) {
            if (USER.autoOpenPort === 'no') {
                return;
            }
            mainStatusBarTabs.add('serial', port);
            mainStatusBarTabs.changeTo(port);
            const statusBarSerial = mainStatusBarTabs.getStatusBarById(port);
            statusBarSerial.open();
        }
    })
    .catch((error) => {
        layer.close(layerNum);
        statusBarTerminal.setValue(error + '\n');
        console.log(error);
    })
    .finally(() => {
        BU.burning = false;
        BU.uploading = false;
    });
}

/**
* @function 判断当前环境，以开始一个上传过程
* @param type {string} 值为'burn' | 'upload'
 * @param startPath {string} 需要拷贝的文件或文件夹的路径
* @return {void}
*/
BU.initWithDropdownBox = function (type, startPath) {
    const { mainStatusBarTabs } = Mixly;
    const statusBarTerminal = mainStatusBarTabs.getStatusBarById('output');
    const layerNum = layer.open({
        type: 1,
        title: (type === 'burn'? Msg.Lang['shell.burning'] : Msg.Lang['shell.uploading']) + '...',
        content: $('#mixly-loader-div'),
        shade: LayerExt.SHADE_ALL,
        resize: false,
        closeBtn: 0,
        success: function (layero, index) {
            $(".layui-layer-page").css("z-index","198910151");
            $("#mixly-loader-btn").off("click").click(() => {
                layer.close(index);
                BU.cancel();
            });
            const desPath = $('#mixly-selector-type option:selected').val();
            if (type === 'burn') {
                BU.copyFiles(type, index, startPath, desPath);
            } else {
                const mainWorkspace = Workspace.getMain();
                const editor = mainWorkspace.getEditorsManager().getActive();
                const code = editor.getCode();
                fs_extra.outputFile(startPath, code)
                .then(() => {
                    BU.copyFiles(type, index, startPath, desPath);
                })
                .catch((error) => {
                    layer.close(index);
                    BU.burning = false;
                    BU.uploading = false;
                    statusBarTerminal.setValue(error + '\n');
                });
            }
        },
        end: function () {
            $('#mixly-loader-div').css('display', 'none');
            $(`#layui-layer-shade${layerNum}`).remove();
        }
    });
}

/**
* @function 根据传入的盘符名称获取对应的磁盘名称
* @param type {string} 值为'burn' | 'upload'
* @param volumeName {string} 所要查找盘符的名称
* @param startPath {string} 需要拷贝文件的路径
* @return {void}
*/
BU.getDisksWithVolumesName = function (type, volumeName, startPath) {
    let dirPath = path.dirname(startPath);
    fs_extra.ensureDirSync(dirPath);
    if (Env.currentPlatform === "win32") {
        child_process.exec('wmic logicaldisk where "' + volumeName + '" get DeviceID', function (err, stdout, stderr) {
            if (err || stderr) {
                $('#mixly-loader-div').css('display', 'none');
                console.log("root path open failed" + err + stderr);
                layer.msg(Msg.Lang['statusbar.serial.noDevice'], {
                    time: 1000
                });
                BU.burning = false;
                BU.uploading = false;
                return;
            }
            BU.checkNumOfDisks(type, stdout, startPath);
        });
    } else {
        let diskPath = '/Volumes/';
        let addChar = ' ';
        if (Env.currentPlatform === "linux") {
            diskPath = '/media/';
            addChar = '';
        }
        let stdout = '';
        let result = null;
        result = volumeName.split('/');
        let deviceNum = 0;
        for (var i = 0; i < result.length; i++) {
            if (result[i] === '') continue;
            for (var j = 0; ; j++) {
                if (fs_plus.isDirectorySync(diskPath + result[i] + (j == 0 ? '' : (addChar + j)))) {
                    stdout += diskPath + result[i] + (j == 0 ? '' : (addChar + j)) + ':';
                    deviceNum++;
                } else if (fs_plus.isDirectorySync(diskPath + os.userInfo().username + '/' + result[i] + (j == 0 ? '' : (addChar + j)))) {
                    stdout += diskPath + os.userInfo().username + '/' + result[i] + (j == 0 ? '' : (addChar + j)) + ':';
                    deviceNum++;
                } else {
                    break;
                }
            }
        }
        if (deviceNum === 0) {
            layer.msg(Msg.Lang['statusbar.serial.noDevice'], {
                time: 1000
            });
            BU.burning = false;
            BU.uploading = false;
            return;
        }
        BU.checkNumOfDisks(type, stdout, startPath);
    }
}

/**
* @function 取消烧录或上传
* @return {void}
*/
BU.cancel = function () {
    if (BU.shell) {
        BU.shell.stdout.end();
        BU.shell.stdin.end();
        if (Env.currentPlatform === 'win32') {
            child_process.exec('taskkill /pid ' + BU.shell.pid + ' /f /t');
        } else {
            BU.shell.kill("SIGTERM");
        }
        BU.shell = null;
    } else {
        if (BU.uploading) {
            BU.uploading = false;
            layer.msg(Msg.Lang['shell.uploadCanceled'], {
                time: 1000
            });
        } else if (BU.burning) {
            BU.burning = false;
            layer.msg(Msg.Lang['shell.burnCanceled'], {
                time: 1000
            });
        }
    }
}

/**
* @function 开始一个烧录过程
* @return {void}
*/
BU.initBurn = function () {
    if (BU.burning) return;
    const { burn } = SELECTED_BOARD;
    BU.burning = true;
    BU.uploading = false;
    if (burn.type === 'volume') {
        BU.getDisksWithVolumesName('burn', burn.volume, burn.filePath);
    } else {
        const port = Serial.getSelectedPortName();
        if (burn.special && burn.special instanceof Array) {
            BU.burning = false;
            BU.burnWithSpecialBin();
        } else {
            BU.burnWithPort(port, burn.command);
        }
    }
}

/**
* @function 开始一个上传过程
* @return {void}
*/
BU.initUpload = function () {
    if (BU.uploading) return;
    const { upload } = SELECTED_BOARD;
    BU.burning = false;
    BU.uploading = true;
    if (upload.type === "volume") {
        BU.getDisksWithVolumesName('upload', upload.volume, upload.filePath);
    } else {
        const port = Serial.getSelectedPortName();
        BU.uploadWithPort(port, upload.command);
    }
}

/**
 * @function 递归代码找出import项并拷贝对应库文件到filePath所在目录
 * @param filePath {string} 主代码文件所在路径
 * @param code {string} 主代码数据
 * @return {array} 库列表
 **/
BU.copyLib = function (filePath, code) {
    const dirPath = path.dirname(filePath);
    const fileName = path.basename(filePath);
    fs_extra.ensureDirSync(dirPath);
    try {
        const libFiles = fs.readdirSync(dirPath);
        for (let value of libFiles) {
            if (value !== fileName) {
                fs.unlinkSync(path.join(dirPath, value));
            }
        }
    } catch (e) {
        console.log(e);
    }
    var pyFileArr = [];
    pyFileArr = BU.searchLibs(dirPath, code, pyFileArr);
    return pyFileArr;
}

/**
 * @function 获取当前代码数据中所使用的库并检测此文件是否在库目录下存在，
 *           若存在则拷贝到主文件所在目录
 * @param dirPath {string} 主代码文件所在目录的路径
 * @param code {string} 主代码数据
 * @param libArr {array} 当前已查找出的库列表
 * @return {array} 库列表
 **/
BU.searchLibs = function (dirPath, code, libArr) {
    const { mainStatusBarTabs } = Mixly;
    const statusBarTerminal = mainStatusBarTabs.getStatusBarById('output');
    const { upload } = SELECTED_BOARD;
    let arrayObj = new Array();
    code.trim().split("\n").forEach(function (v, i) {
        arrayObj.push(v);
    });
    let moduleName = "";
    let pyFileArr = [];
    for (let i = 0; i < arrayObj.length; i++) {
        let fromLoc = arrayObj[i].indexOf("from");
        let importLoc = arrayObj[i].indexOf("import");
        const str = arrayObj[i].substring(0, (fromLoc === -1)? importLoc : fromLoc);
        str.split('').forEach((ch) => {
            if (ch !== ' ' && ch !== '\t') {
                fromLoc = -1;
                importLoc = -1;
                return;
            }
        });
        if (fromLoc !== -1) {
            moduleName = arrayObj[i].substring(fromLoc + 4, arrayObj[i].indexOf("import"));
        } else if (importLoc !== -1) {
            let endPos = arrayObj[i].indexOf("as");
            if (endPos === -1) {
                endPos = arrayObj[i].length;
            }
            moduleName = arrayObj[i].substring(importLoc + 6, endPos);
        } else {
            continue;
        }
        moduleName = moduleName.replaceAll(' ', '');
        moduleName = moduleName.replaceAll('\r', '');
        let moduleArr = moduleName.split(",");
        for (let j = 0; j < moduleArr.length; j++) {
            if (!libArr.includes(moduleArr[j] + '.py') && !libArr.includes(moduleArr[j] + '.mpy')) {
                try {
                    let oldLibPath = null;
                    if (!(upload.libPath && upload.libPath.length))
                        return;
                    for (let nowDirPath of upload.libPath) {
                        const nowMpyFilePath = path.join(nowDirPath, moduleArr[j] + '.mpy');
                        const nowPyFilePath = path.join(nowDirPath, moduleArr[j] + '.py');
                        if (fs_plus.isFileSync(nowMpyFilePath)) {
                            oldLibPath = nowMpyFilePath;
                            break;
                        } else if (fs_plus.isFileSync(nowPyFilePath)) {
                            oldLibPath = nowPyFilePath;
                        }
                    }
                    if (oldLibPath) {
                        const extname = path.extname(oldLibPath);
                        const newLibPath = path.join(dirPath, moduleArr[j] + extname);
                        statusBarTerminal.addValue(Msg.Lang['shell.copyLib'] + ' ' + moduleArr[j] + '\n');
                        fs.copyFileSync(oldLibPath, newLibPath);
                        libArr.push(moduleArr[j] + extname);
                        if (extname === '.py') {
                            pyFileArr.push(moduleArr[j] + extname);
                            code = fs.readFileSync(oldLibPath, 'utf8');
                            libArr = BU.searchLibs(dirPath, code, libArr);
                        }
                    }
                } catch (e) {
                    console.log(e);
                }
            }
        }
    }
    return libArr;
}

/**
* @function 通过cmd烧录
 * @param layerNum {number} 烧录或上传加载弹窗的编号，用于关闭此弹窗
* @param port {string} 所选择的串口
* @param command {string} 需要执行的指令
* @return {void}
*/
BU.burnByCmd = function (layerNum, port, command) {
    const { mainStatusBarTabs } = Mixly;
    const statusBarTerminal = mainStatusBarTabs.getStatusBarById('output');
    statusBarTerminal.setValue(Msg.Lang['shell.burning'] + '...\n');
    BU.runCmd(layerNum, 'burn', port, command);
}

/**
* @function 通过cmd上传
* @param layerNum {number} 烧录或上传加载弹窗的编号，用于关闭此弹窗
* @param port {string} 所选择的串口
* @param command {string} 需要执行的指令
* @return {void}
*/
BU.uploadByCmd = async function (layerNum, port, command) {
    const { mainStatusBarTabs } = Mixly;
    const statusBarTerminal = mainStatusBarTabs.getStatusBarById('output');
    statusBarTerminal.setValue(Msg.Lang['shell.uploading'] + '...\n');
    const { upload } = SELECTED_BOARD;
    const mainWorkspace = Workspace.getMain();
    const editor = mainWorkspace.getEditorsManager().getActive();
    const code = editor.getCode();
    if (upload.copyLib) {
        BU.copyLib(upload.filePath, code);
    }
    fs_extra.outputFile(upload.filePath, code)
    .then(() => {
        BU.runCmd(layerNum, 'upload', port, command);
    })
    .catch((error) => {
        statusBarTerminal.setValue(error.toString() + '\n');
        console.log(error);
        layer.close(layerNum);
        BU.uploading = false;
    });
}

/**
* @function 运行cmd
* @param layerNum {number} 烧录或上传加载弹窗的编号，用于关闭此弹窗
* @param type {string} 值为 'burn' | 'upload'
* @param port {string} 所选择的串口
* @param command {string} 需要执行的指令
* @param sucFunc {function} 指令成功执行后所要执行的操作
* @return {void}
*/
BU.runCmd = function (layerNum, type, port, command, sucFunc) {
    const { mainStatusBarTabs } = Mixly;
    const statusBarTerminal = mainStatusBarTabs.getStatusBarById('output');
    mainStatusBarTabs.changeTo('output');
    mainStatusBarTabs.show();
    let nowCommand = MString.tpl(command, { com: port });

    BU.shell = child_process.exec(nowCommand, { encoding: 'binary' }, function (error, stdout, stderr) {
        layer.close(layerNum);
        BU.burning = false;
        BU.uploading = false;
        BU.shell = null;
        const text = statusBarTerminal.getValue();
        if (text.lastIndexOf('\n') !== text.length - 1) {
            statusBarTerminal.addValue('\n');
        }
        if (error) {
            if (Env.currentPlatform === 'win32') {
                error = iconv_lite.decode(Buffer.from(error.message, 'binary'), 'cp936');
            } else {
                let lines = error.message.split('\n');
                for (let i in lines) {
                    if (lines[i].indexOf('Command failed') !== -1) {
                        continue;
                    }
                    lines[i] = iconv_lite.decode(Buffer.from(lines[i], 'binary'), 'utf-8');
                }
                error = lines.join('\n');
            }
            error = MString.decode(error);
            statusBarTerminal.addValue(error);
            statusBarTerminal.addValue('==' + (type === 'burn' ? Msg.Lang['shell.burnFailed'] : Msg.Lang['shell.uploadFailed']) + '==\n');
        } else {
            layer.msg((type === 'burn' ? Msg.Lang['shell.burnSucc'] : Msg.Lang['shell.uploadSucc']), {
                time: 1000
            });
            statusBarTerminal.addValue('==' + (type === 'burn' ? Msg.Lang['shell.burnSucc'] : Msg.Lang['shell.uploadSucc']) + '==\n');
            if (type === 'upload') {
                mainStatusBarTabs.show();
                mainStatusBarTabs.add('serial', port);
                const statusBarSerial = mainStatusBarTabs.getStatusBarById(port);
                statusBarSerial.setValue('');
                mainStatusBarTabs.changeTo(port);
                statusBarSerial.open().catch(Debug.error);
            }
        }
    })

    BU.shell.stdout.on('data', function (data) {
        if (BU.uploading || BU.burning) {
            data = iconv_lite.decode(Buffer.from(data, 'binary'), 'utf-8');
            data = MString.decode(data);
            statusBarTerminal.addValue(data);
        }
    });
}

/**
 * @function 特殊固件的烧录
 * @return {void}
 **/
BU.burnWithSpecialBin = () => {
    const { mainStatusBarTabs } = Mixly;
    const statusBarTerminal = mainStatusBarTabs.getStatusBarById('output');
    const firmwares = SELECTED_BOARD.burn.special;
    let menu = [];
    for (let firmware of firmwares) {
        if (!firmware?.name && !firmware?.command) return;
        menu.push({
            id: firmware.command,
            text: firmware.name
        });
    }
    LayerExt.open({
        title: [Msg.Lang['nav.btn.burn'], '36px'],
        area: ['400px', '160px'],
        max: false,
        min: false,
        content: BU.FILMWARE_LAYER,
        shade: Mixly.LayerExt.SHADE_ALL,
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
                const command = $select.val();
                layer.close(index, () => {
                    if (type !== 'burn') {
                        return;
                    }
                    statusBarTerminal.setValue('');
                    mainStatusBarTabs.changeTo('output');
                    mainStatusBarTabs.show();
                    BU.burning = true;
                    BU.uploading = false;
                    const port = Serial.getSelectedPortName();
                    BU.burnWithPort(port, command);
                });
            });
        },
        beforeEnd: function (layero) {
            layero.find('select').select2('destroy');
            layero.find('button').off();
        }
    });
}

/**
 * @function 通过串口执行命令行烧录或上传操作
 * @param type {string} 值为 'burn' | 'upload'
 * @param port {string} 所选择的串口
 * @param command {string} 需要执行的指令
 * @return {void}
 **/
BU.operateWithPort = (type, port, command) => {
    if (!port) {
        layer.msg(Msg.Lang['statusbar.serial.noDevice'], {
            time: 1000
        });
        BU.burning = false;
        BU.uploading = false;
        return;
    }
    const title = (type === 'burn' ? Msg.Lang['shell.burning'] : Msg.Lang['shell.uploading']) + '...';
    const operate = () => {
        const layerNum = layer.open({
            type: 1,
            title,
            content: $('#mixly-loader-div'),
            shade: LayerExt.SHADE_NAV,
            resize: false,
            closeBtn: 0,
            success: function (layero, index) {
                $(".layui-layer-page").css("z-index","198910151");
                switch (type) {
                    case 'burn':
                        BU.burnByCmd(index, port, command);
                        break;
                    case 'upload':
                    default:
                        BU.uploadByCmd(index, port, command);
                }
                $("#mixly-loader-btn").off("click").click(() => {
                    $("#mixly-loader-btn").css('display', 'none');
                    layer.title(Msg.Lang['shell.aborting'] + '...', index);
                    BU.cancel(type);
                });
            },
            end: function () {
                $('#mixly-loader-div').css('display', 'none');
                $("layui-layer-shade" + layerNum).remove();
                $("#mixly-loader-btn").off("click");
                $("#mixly-loader-btn").css('display', 'inline-block');
            }
        });
    }
    const { mainStatusBarTabs } = Mixly;
    const statusBarSerial = mainStatusBarTabs.getStatusBarById(port);
    if (statusBarSerial) {
        statusBarSerial.close()
        .finally(() => {
            operate();
        });
    } else {
        operate();
    }
}

/**
 * @function 通过串口执行命令行烧录操作
 * @param port {string} 所选择的串口
 * @param command {string} 需要执行的指令
 * @return {void}
 **/
BU.burnWithPort = (port, command) => {
    BU.operateWithPort('burn', port, command);
}

/**
 * @function 通过串口执行命令行上传操作
 * @param port {string} 所选择的串口
 * @param command {string} 需要执行的指令
 * @return {void}
 **/
BU.uploadWithPort = (port, command) => {
    BU.operateWithPort('upload', port, command);
}

});