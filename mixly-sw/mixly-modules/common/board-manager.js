(() => {

goog.require('path');
goog.require('layui');
goog.require('Mixly.Env');
goog.require('Mixly.Msg');
goog.require('Mixly.XML');
goog.require('Mixly.LayerExt');
goog.require('Mixly.Config');
goog.require('Mixly.MArray');
goog.require('Mixly.Url');
goog.require('Mixly.Storage');
goog.require('Mixly.Electron.CloudDownload');
goog.require('Mixly.Electron.PythonShell');
goog.provide('Mixly.BoardManager');

const {
    Env,
    Msg,
    XML,
    LayerExt,
    Config,
    MArray,
    Url,
    Storage,
    Electron,
    BoardManager
} = Mixly;

const {
    layer,
    table,
    element,
    carousel,
    form
} = layui;

const fs = Mixly.require('fs');
const fs_extra = Mixly.require('fs-extra');
const fs_plus = Mixly.require('fs-plus');
const os = Mixly.require('os');
const compressing = Mixly.require('compressing');
const electron_remote = Mixly.require('@electron/remote');

const {
    SOFTWARE,
    BOARDS_INFO,
    USER,
    BOARD_PAGE
} = Config;

const {
    PythonShell,
    CloudDownload
} = Electron;

/*BoardManager.ERROR = {
    "CONFIG_PARSE_ERROR": 0,
    "COPY_ERROR": 1,
    "UNZIP_ERROR": 2,

}*/

BoardManager.boardsList = [];

BoardManager.URL = SOFTWARE?.board?.url ?? null;

BoardManager.LOCAL_IMPORT_FILTERS = [
    { name: 'Lib File', extensions: ['json', 'zip'] }
];

BoardManager.showLocalImportDialog = () => {
    const currentWindow = electron_remote.getCurrentWindow();
    currentWindow.focus();
    const { dialog } = electron_remote;
    dialog.showOpenDialog(currentWindow, {
        title: Msg.getLang('IMPORT_BOARD'),
        // 默认打开的路径，比如这里默认打开下载文件夹
        defaultPath: Env.clientPath,
        buttonLabel: Msg.getLang('CONFIRM'),
        // 限制能够选择的文件类型
        filters: BoardManager.LOCAL_IMPORT_FILTERS,
        properties: ['openFile', 'showHiddenFiles'],
        message: Msg.getLang('IMPORT_BOARD')
    }).then(result => {
        const selectedPath = result.filePaths[0];

        if (!selectedPath) {
            return;
        }

        console.log('待导入板卡路径：', selectedPath);
        let layerNum;
        BoardManager.importFromLocal(selectedPath, () => {
            layerNum = layer.open({
                type: 1,
                id: "import-local-board-layer",
                title: Msg.getLang("IMPORTING_BOARD") + "...",
                content: $('#mixly-loader-div'),
                shade: LayerExt.SHADE_ALL,
                resize: false,
                closeBtn: 0,
                success: function (layero) {
                    $("#mixly-loader-btn").css('display', 'none');
                },
                end: function () {
                    $("#mixly-loader-btn").css('display', 'inline-block');
                    $('#layui-layer-shade' + layerNum).remove();
                }
            });
        }, (error) => {
            console.log(error);
            layer.msg(error, { time: 1000 });
        }, (error) => {
            layer.close(layerNum);
            if (error) {
                console.log(error);
                layer.msg(Msg.getLang('IMPORT_FAILED'), { time: 1000 });
            } else {
                layer.msg(Msg.getLang('IMPORT_SUCC'), { time: 1000 });
                BoardManager.onclickImportBoards();
                BoardManager.screenWidthLevel = -1;
                BoardManager.screenHeightLevel = -1;
                BoardManager.loadBoards();
                BoardManager.updateBoardsCard();
            }
        });
    }).catch(err => {
        console.log(err);
        layer.msg(Msg.getLang('IMPORT_FAILED'), { time: 1000 });
    });
}

BoardManager.importBoardPackageWithConfig = (configPath) => {
    return new Promise((resolve, reject) => {
        const dirPath = path.join(configPath, '../');
        const hardwarePath = path.join(dirPath, './hardware');
        if (fs_plus.isDirectorySync(dirPath) && fs_plus.isDirectorySync(hardwarePath)) {
            const packageList = fs.readdirSync(hardwarePath);
            const packagePath = [];
            let copyPromiseList = [];
            fs_extra.ensureDirSync(path.join(Env.arduinoCliPath, 'Arduino15/'));
            for (let i of packageList) {
                const startPath = path.join(hardwarePath, i);
                if (fs_plus.isDirectorySync(startPath)) {
                    const endPath = path.join(Env.arduinoCliPath, 'Arduino15/packages/', i);
                    copyPromiseList.push(BoardManager.copyDir(startPath, endPath));
                } else {
                    const endPath = path.join(Env.arduinoCliPath, 'Arduino15/', i);
                    if (path.extname(i) === '.json') {
                        fs_extra.copy(startPath, endPath);
                    }
                    packagePath.push(endPath);
                }
            }
            if (copyPromiseList.length) {
                Promise.all(copyPromiseList)
                .then((message) => {
                    for (let j of message) {
                        if (!j.error) {
                            packagePath.push(j.endPath);
                        }
                    }
                    resolve(packagePath);
                })
                .catch((error) => {
                    resolve(packagePath);
                });
            } else {
                resolve(packagePath);
            }
        } else {
            resolve(null);
        }
    });
}

BoardManager.copyDir = (startPath, endPath) => {
    return new Promise((resove, reject) => {
        fs_extra.ensureDir(endPath)
        .then(() => {
            return fs_extra.emptyDir(endPath);
        })
        .then(() => {
            return fs_extra.copy(startPath, endPath);
        })
        .then(() => {
            resove({ error: null, endPath });
        })
        .catch((error) => {
            resolve({ error, endPath });
        })
    });
}

BoardManager.importPyPackage = () => {

}

BoardManager.delBoard = (boardDir, endFunc) => {
    const layerIndex = BoardManager.showDelBoardProgress();
    const configPath = path.join(boardDir, './config.json');
    const boardConfig = BoardManager.readBoardConfig(configPath);
    if (boardConfig) {
        let removePromise = [];
        const { packagePath } = boardConfig;
        if (typeof packagePath === 'object') {
            packagePath.push(boardDir);
            for (let i of packagePath)
                removePromise.push(new Promise((resove, reject) => {
                    fs_extra.remove(i, (error) => {
                        resove(error);
                    });
                }));
            Promise.all(removePromise)
            .then((message) => {
                layer.close(layerIndex);
                endFunc(null);
            })
            .catch((error) => {
                layer.close(layerIndex);
                endFunc(error);
            });
            return;
        }
    }
    fs_extra.remove(boardDir, (error) => {
        layer.close(layerIndex);
        endFunc(error);
    });
}

BoardManager.ignoreBoard = (boardType, endFunc) => {
    USER.boardIgnore = USER.boardIgnore ?? [];
    USER.boardIgnore.push(boardType);
    Storage.user('/', USER);
    endFunc();
}

BoardManager.resetBoard = (endFunc) => {
    USER.boardIgnore = [];
    Storage.user('/', USER);
    endFunc();
}

BoardManager.showDelBoardProgress = () => {
    return layerNum = layer.open({
        type: 1,
        id: "del-local-board-layer",
        title: Msg.getLang("DELETING_BOARD") + "...",
        content: $('#mixly-loader-div'),
        shade: LayerExt.SHADE_ALL,
        resize: false,
        closeBtn: 0,
        success: function (layero) {
            $("#mixly-loader-btn").css('display', 'none');
        },
        end: function () {
            $("#mixly-loader-btn").css('display', 'inline-block');
            $('#layui-layer-shade' + layerNum).remove();
        }
    });
}

BoardManager.importFromLocal = (inPath, sucFunc, errorFunc, endFunc) => {
    const extname = path.extname(inPath);
    if (fs_plus.isFileSync(inPath)) {
        switch (extname) {
        case '.json':
            if (path.join(inPath, '../../') === Env.thirdPartyBoardPath) {
                errorFunc(Msg.getLang('BOARD_IMPORTED'));
                return;
            }
            sucFunc();
            BoardManager.importFromLocalWithConfig(inPath, endFunc);
            break;
        case '.zip':
            sucFunc();
            BoardManager.importFromLocalWithZip(inPath, endFunc);
            break;
        default:
            errorFunc(Msg.getLang('SELECT_CONFIG_FILE_ERR'));
        }
    } else {
        errorFunc(Msg.getLang('FILE_NOT_EXIST'));
    }
}

BoardManager.importFromLocalWithConfig = (inPath, endFunc = (errorMessages) => {}) => {
    const boardConfig = BoardManager.readBoardConfig(inPath);
    const hardwarePath = path.join(inPath, '../hardware');
    const filterFunc = (src, dest) => {
        if (src.indexOf(hardwarePath) !== -1)
            return false;
        return true;
    }
    if (boardConfig) {
        const dirPath = path.dirname(inPath);
        const dirName = path.basename(dirPath);
        const finalDir = path.join(Env.thirdPartyBoardPath, './' + dirName);
        if (dirPath !== finalDir) {
            fs_extra.ensureDir(Env.thirdPartyBoardPath)
            .then(() => {
                return fs_extra.emptyDir(finalDir);
            })
            .then(() => {
                return fs_extra.copy(dirPath, finalDir, { filter: filterFunc });
            })
            .then(() => {
                return BoardManager.importBoardPackageWithConfig(inPath);
            })
            .then((message) => {
                if (message) {
                    boardConfig.packagePath = message;
                    fs_extra.writeJsonSync(path.join(finalDir, './config.json'), boardConfig, {
                        spaces: '    '
                    });
                }
                return fs_extra.remove(path.join(finalDir, './hardware'));
            })
            .then(() => {
                endFunc(null);
            })
            .catch((error) => {
                console.log(error);
                endFunc(error);
            });
        } else {
            if (fs_plus.isDirectorySync(hardwarePath)) {
                BoardManager.importBoardPackageWithConfig(inPath)
                .then((message) => {
                    if (message) {
                        boardConfig.packagePath = message;
                        fs_extra.writeJsonSync(path.join(finalDir, './config.json'), boardConfig, {
                            spaces: '    '
                        });
                    }
                    return fs_extra.remove(path.join(finalDir, './hardware'));
                })
                .then(() => {
                    endFunc(null);
                })
                .catch((error) => {
                    console.log(error);
                    endFunc(error);
                })
            } else {
                endFunc(null);
            }
        }
    } else {
        console.log(Msg.getLang('CONFIG_FILE_DECODE_ERR'));
        endFunc(Msg.getLang('CONFIG_FILE_DECODE_ERR'));
    }
}

BoardManager.importFromLocalWithZip = (inPath, endFunc = (errorMessages) => {}) => {
    BoardManager.unZip(inPath, Env.thirdPartyBoardPath, false, (error) => {
        if (error) {
            endFunc(error);
        } else {
            const fileName = path.basename(inPath, '.zip');
            const configPath = path.join(Env.thirdPartyBoardPath, fileName, 'config.json');
            BoardManager.importFromLocalWithConfig(configPath, endFunc);
        }
    });
}

BoardManager.unZip = (inPath, desPath, delZip, endFunc = (errorMessage) => {}) => {
    const fileName = path.basename(inPath, '.zip');
    const unZipPath = path.join(desPath, './' + fileName);
    compressing.zip.uncompress(inPath, desPath, {
        zipFileNameEncoding: 'GBK'
    })
    .then(() => {
        if (delZip)
            try {
                fs.unlinkSync(inPath);
            } catch (error) {
                console.log(error);
            }
        endFunc(null);
    })
    .catch((error) => {
        endFunc(error);
    });
}

BoardManager.showCloudImportProgress = (boardList, endFunc = (errorMessages) => {}) => {
    const parentDom = $('<div></div>');
    parentDom.css({
        'overflow': 'hidden',
        'padding': '5px',
        'width': '100%',
        'height': '100%',
        'display': 'none'
    });
    const childDom = $('<div></div>');
    childDom.css({
        'overflow-x': 'hidden',
        'overflow-y': 'auto',
        'width': '100%',
        'height': '100%'
    });
    for (let i in boardList) {
        const boardInfo = boardList[i];
        const boardPanelConfig = {
            boardPanelId: 'board-' + i + '-panel-id',
            boardType: boardInfo.name,
            progressFilter: 'board-' + i + '-progress-filter',
            progressStatusId: 'board-' + i + '-progress-status-id'
        };
        childDom.append(
            XML.render(XML.TEMPLATE_STR.PROGRESS_BAR_DIV, boardPanelConfig)
        );
    }
    parentDom.append(childDom);
    $('body').append(parentDom);
    element.render('progress');
    LayerExt.open({
        title: Msg.getLang('IMPORTING_BOARD') + '...',
        id: 'setting-menu-layer1',
        content: parentDom,
        shade: LayerExt.SHADE_ALL,
        area: ['40%', '60%'],
        max: ['800px', (boardList.length * 106 + 42) + 'px'],
        min: ['500px', '100px'],
        success: (layero, index) => {
            layero.find('.layui-layer-setwin').css('display', 'none');
            BoardManager.importBoardsFromCloud(boardList, layero, index);
        },
        end: () => {
            parentDom.remove();
        }
    });
}

BoardManager.importBoardsFromCloud = (boardList, layero, layerIndex) => {
    let boardPromise = [];
    for (let i in boardList) {
        boardList[i].index = i;
        boardPromise.push(BoardManager.importBoardWithUrl(boardList[i]));
    }
    
    Promise.all(boardPromise)
    .then((message) => {
        let sucTimes = 0;
        let failedTimes = 0;
        for (let i of message) {
            const progressStatusDom = $('#board-' + i.index + '-progress-status-id');
            const panelDom = $('#board-' + i.index + '-panel-id');
            const cardHeadDom = panelDom.children('.layui-card-header').first();
            progressStatusDom.removeClass('layui-icon-loading layui-anim layui-anim-rotate layui-anim-loop');
            if (i.error) {
                progressStatusDom.addClass('layui-icon-close-fill');
                cardHeadDom.html(i.name + ' - ' + Msg.getLang('IMPORT_FAILED'));
                failedTimes++;
                console.log(i.error);
            } else {
                progressStatusDom.addClass('layui-icon-ok-circle');
                cardHeadDom.html(i.name + ' - ' + Msg.getLang('IMPORT_COMPLETE'));
                sucTimes++;
                BoardManager.writePackageConfig(i);
            }
        }
        const sucIcon = `<i class="layui-icon layui-icon-ok" style="font-size:13px;color:#41ce28;"></i>`;
        const errIcon = `<i class="layui-icon layui-icon-close" style="font-size:13px;color:#b9063b;"></i>`;
        layer.title(Msg.getLang('IMPORT_COMPLETE') + ' ' + sucTimes + sucIcon + ' ' + failedTimes + errIcon, layerIndex);
    })
    .catch((error) => {
        layer.title(Msg.getLang('IMPORT_FAILED'), layerIndex);
    })
    .finally(() => {
        layero.find('.layui-layer-setwin').css('display', 'block');
        BoardManager.screenWidthLevel = -1;
        BoardManager.screenHeightLevel = -1;
        BoardManager.loadBoards();
        BoardManager.updateBoardsCard();
        BoardManager.onclickImportBoards();
    });
}

/**
 * @function 在云端板卡下载完成后，将最新板卡版本信息写入板卡config
 * @param boardInfo { object }
 * @return void
 **/
BoardManager.writePackageConfig = (boardInfo) => {
    const {
        url,
        package,
        version,
        dependencies,
        boardDirName
    } = boardInfo;
    if (!boardDirName) return;
    const boardDir = path.join(Env.thirdPartyBoardPath, './' + boardDirName);
    if (fs_plus.isDirectorySync(boardDir)) {
        const { currentPlatform } = Env,
        arch = os.arch();
        let packageUrl, packageIndexUrl, packageName, packageIndexName;
        if (package) {
            packageUrl = package[currentPlatform + '-' + arch] ?? '';
            packageIndexUrl = package.index ?? '';
            packageName = path.basename(packageUrl, '.zip');
            packageIndexName = path.basename(packageIndexUrl);
        }
        const configPath = path.join(boardDir, './config.json');
        const boardConfig = BoardManager.readBoardConfig(configPath) ?? {};
        boardConfig.version = version;
        boardConfig.package = package;
        boardConfig.packagePath = [];
        if (packageName) {
            const packagePath = path.join(Env.arduinoCliPath, './Arduino15/packages/' + packageName);
            boardConfig.packagePath.push(packagePath);
        }
        if (packageIndexName) {
            const packageIndexPath = path.join(Env.arduinoCliPath, './Arduino15/' + packageIndexName);
            boardConfig.packagePath.push(packageIndexPath);
        }
        try {
            fs_extra.outputJsonSync(configPath, boardConfig, {
                spaces: '    '
            });
        } catch (error) {
            console.log(error);
        }
    }
}

/*{
    "index": Number,
    "error": Object,
    "name": "Arduino STM32",
    "version": "1.2.1",
    "desc": "Arduino STM32",
    "url": "http://106.52.57.223:8081/cloud-boards/arduino_stm32.zip",
    "dependencies": [
        "Arduino AVR"
    ],
    "package": {
        "index": "",
        "version": "1.0.0",
        "win32-x64": "http://106.52.57.223:8081/cloud-boards/arduino_stm32.zip",
        "win32-ia32": "None",
        "darwin-arm64": "None",
        "darwin-x64": "None",
        "linux-x64": "None",
        "linux-arm": "None"
    }
}*/
BoardManager.importBoardWithUrl = (boardInfo) => {
    return new Promise((resolve, reject) => {
        if (!boardInfo.url) {
            boardInfo.error = Msg.getLang('BOARD_URL_READ_ERR');
            resolve(boardInfo);
        }
        // 下载板卡文件
        BoardManager.downloadPromise(boardInfo, {
            desPath: path.join(Env.clientPath, './download'),
            url: boardInfo.downloadBoardIndex ? boardInfo.url : 'None',
            startMessage: Msg.getLang('BOARD_FILE_DOWNLOADING') + '...',
            endMessage: Msg.getLang('BOARD_FILE_DOWNLOAD_COMPLETE'),
            errorMessage: Msg.getLang('BOARD_FILE_DOWNLOAD_FAILED')
        })
        .then((newBoardInfo) => {
            if (newBoardInfo.error)
                throw newBoardInfo;
            else
                // 解压板卡文件
                return BoardManager.unZipPromise(newBoardInfo, {
                    desPath: Env.thirdPartyBoardPath,
                    zipPath: newBoardInfo.downloadPath,
                    startMessage: Msg.getLang('BOARD_FILE_UNZIPPING') + '...',
                    endMessage: Msg.getLang('BOARD_FILE_UNZIP_COMPLETE'),
                    errorMessage: Msg.getLang('BOARD_FILE_UNZIP_FAILED')
                });
        })
        .then((newBoardInfo) => {
            if (newBoardInfo.error)
                throw newBoardInfo;
            else {
                const packageIndexUrl = boardInfo?.package?.index ?? null;
                // 如果package-index有的话，下载板卡所需要的package-index
                const packageIndexDirPath = Env.arduinoCliPath ? path.join(Env.arduinoCliPath, './Arduino15') : null;
                return BoardManager.downloadPromise(newBoardInfo, {
                    desPath: packageIndexDirPath,
                    url: boardInfo.downloadPackage ? packageIndexUrl : 'None',
                    startMessage: Msg.getLang('BOARD_PACKAGE_INDEX_DOWNLOADING') + '...',
                    endMessage: Msg.getLang('BOARD_PACKAGE_INDEX_DOWNLOAD_COMPLETE'),
                    errorMessage: Msg.getLang('BOARD_PACKAGE_INDEX_DOWNLOAD_FAILED')
                });
            }
        })
        .then((newBoardInfo) => {
            if (newBoardInfo.error)
                throw newBoardInfo;
            else {
                const platform = Env.currentPlatform;
                const arch = os.arch();
                const package = boardInfo?.package ?? null;
                let packageUrl = null;
                if (package && package[platform + '-' + arch])
                    packageUrl = package[platform + '-' + arch] ?? null;
                // 如果package有的话，下载板卡所需要的package
                return BoardManager.downloadPromise(newBoardInfo, {
                    desPath: path.join(Env.clientPath, './download'),
                    url: boardInfo.downloadPackage ? packageUrl : 'None',
                    startMessage: Msg.getLang('BOARD_PACKAGE_DOWNLOADING') + '...',
                    endMessage: Msg.getLang('BOARD_PACKAGE_DOWNLOAD_COMPLETE'),
                    errorMessage: Msg.getLang('BOARD_PACKAGE_DOWNLOAD_FAILED')
                });
            }
        })
        .then((newBoardInfo) => {
            if (newBoardInfo.error)
                throw newBoardInfo;
            else {
                const packageDirPath = Env.arduinoCliPath ? path.join(Env.arduinoCliPath, './Arduino15/packages') : null;
                return BoardManager.unZipPromise(newBoardInfo, {
                    desPath: packageDirPath,
                    zipPath: newBoardInfo.downloadPath,
                    startMessage: Msg.getLang('BOARD_PACKAGE_UNZIPPING') + '...',
                    endMessage: Msg.getLang('BOARD_PACKAGE_UNZIP_COMPLETE'),
                    errorMessage: Msg.getLang('BOARD_PACKAGE_UNZIP_FAILED')
                });
            }
        })
        .then((newBoardInfo) => {
            const panelDom = $('#board-' + newBoardInfo.index + '-panel-id');
            const cardHeadDom = panelDom.children('.layui-card-header').first();
            const progressStatusDom = $('#board-' + newBoardInfo.index + '-progress-status-id');
            if (!newBoardInfo.downloadPackage && !newBoardInfo.downloadBoardIndex) {
                progressStatusDom.removeClass('layui-icon-loading layui-anim layui-anim-rotate layui-anim-loop');
                cardHeadDom.html(newBoardInfo.name + ' - ' + Msg.getLang('ALREADY_THE_LATEST_VERSION'));
                progressStatusDom.addClass('layui-icon-ok-circle');
                element.progress('board-' + newBoardInfo.index + '-progress-filter', '100%');
                element.render('progress', 'board-' + newBoardInfo.index + '-progress-filter');
            }
            resolve(newBoardInfo);
        })
        .catch((error) => {
            boardInfo.error = error;
            resolve(boardInfo);
        });
    });
}

BoardManager.downloadPromise = (boardInfo, config) => {
    return new Promise((resolve, reject) => {
        const DEFAULT_CONFIG = {
            desPath: path.join(Env.clientPath, './download'),
            url: null,
            startMessage: Msg.getLang('DOWNLOADING') + '...',
            endMessage: Msg.getLang('DOWNLOAD_COMPLETE'),
            errorMessage: Msg.getLang('DOWNLOAD_FAILED')
        };
        if (typeof config !== 'object')
            config = DEFAULT_CONFIG
        else
            config = { ...DEFAULT_CONFIG, ...config };

        const {
            desPath,
            url,
            startMessage,
            endMessage,
            errorMessage
        } = config;

        if (!url || url === 'None' || !desPath) {
           boardInfo.error = null;
           boardInfo.downloadPath = null;
           resolve(boardInfo);
           return;
        }

        try {
            fs_extra.ensureDir(desPath);
        } catch (error) {
            boardInfo.error = error;
            boardInfo.downloadPath = null;
            resolve(boardInfo);
            return;
        }
        const panelDom = $('#board-' + boardInfo.index + '-panel-id');
        const cardHeadDom = panelDom.children('.layui-card-header').first();
        cardHeadDom.html(boardInfo.name + ' - ' + startMessage);
        const progressStatusDom = $('#board-' + boardInfo.index + '-progress-status-id');
        progressStatusDom.removeClass('layui-icon-ok-circle layui-icon-close-fill');
        progressStatusDom.addClass('layui-icon-loading layui-anim layui-anim-rotate layui-anim-loop');
        element.progress('board-' + boardInfo.index + '-progress-filter', '0%');
        CloudDownload.download(url, desPath, {
            progress: (stats) => {
                const { speed, progress } = stats;
                const speedUnit = ['B/s', 'KB/s', 'MB/s', 'GB/s'];
                let type = 0;
                let nowProgress = parseInt(progress);
                nowProgress = nowProgress > 100 ? 100 : nowProgress;
                let nowSpeed = speed;
                for (let i = 0; i < 3; i++) {
                    if (nowSpeed / 1000 > 1) {
                        nowSpeed /= 1024;
                        type++;
                    } else {
                        break;
                    }
                }

                nowSpeed = nowSpeed.toFixed(1);
                cardHeadDom.html(boardInfo.name + ' - ' + startMessage + ' - ' + nowSpeed + speedUnit[type]);
                element.progress('board-' + boardInfo.index + '-progress-filter', parseInt(progress) + '%');
            },
            error: (message) => {
                progressStatusDom.removeClass('layui-icon-loading layui-anim layui-anim-rotate layui-anim-loop');
                progressStatusDom.addClass('layui-icon-close-fill');
                cardHeadDom.html(boardInfo.name + ' - ' + errorMessage);
            },
            end: (downloadInfo) => {
                progressStatusDom.removeClass('layui-icon-loading layui-anim layui-anim-rotate layui-anim-loop');
                progressStatusDom.addClass('layui-icon-ok-circle');
                cardHeadDom.html(boardInfo.name + ' - ' + endMessage);
            },
            timeout: this.error
        })
        .then((message) => {
            if (message[0])
                throw message[0];
            boardInfo.error = null;
            boardInfo.downloadPath = message[1];
            resolve(boardInfo);
        })
        .catch((error) => {
            boardInfo.error = error;
            boardInfo.downloadPath = null;
            resolve(boardInfo);
        });
    });
}

BoardManager.unZipPromise = (boardInfo, config) => {
    return new Promise((resolve, reject) => {
        const DEFAULT_CONFIG = {
            desPath: path.join(Env.clientPath, './download'),
            zipPath: null,
            startMessage: Msg.getLang('UNZIPPING') + '...',
            endMessage: Msg.getLang('UNZIP_COMPLETE'),
            errorMessage: Msg.getLang('UNZIP_FAILED'),
            delZip: true
        };
        if (typeof config !== 'object')
            config = DEFAULT_CONFIG
        else
            config = { ...DEFAULT_CONFIG, ...config };

        const {
            zipPath,
            desPath,
            delZip,
            startMessage,
            endMessage,
            errorMessage
        } = config;

        if (!zipPath || !desPath) {
            boardInfo.error = null;
            boardInfo.unZipPath = null;
            resolve(boardInfo);
            return;
        }
        const panelDom = $('#board-' + boardInfo.index + '-panel-id');
        const cardHeadDom = panelDom.children('.layui-card-header').first();
        cardHeadDom.html(boardInfo.name + ' - ' + startMessage);
        const progressStatusDom = $('#board-' + boardInfo.index + '-progress-status-id');
        progressStatusDom.removeClass('layui-icon-ok-circle layui-icon-close-fill');
        progressStatusDom.addClass('layui-icon-loading layui-anim layui-anim-rotate layui-anim-loop');
        element.progress('board-' + boardInfo.index + '-progress-filter', '0%');
        BoardManager.unZip(zipPath, desPath, delZip, (error) => {
            if (error) {
                progressStatusDom.removeClass('layui-icon-loading layui-anim layui-anim-rotate layui-anim-loop');
                progressStatusDom.addClass('layui-icon-close-fill');
                cardHeadDom.html(boardInfo.name + ' - ' + errorMessage);
                boardInfo.error = error;
                boardInfo.unZipPath = null;
                resolve(boardInfo);
            } else {
                progressStatusDom.removeClass('layui-icon-loading layui-anim layui-anim-rotate layui-anim-loop');
                progressStatusDom.addClass('layui-icon-ok-circle');
                cardHeadDom.html(boardInfo.name + ' - ' + endMessage);
                boardInfo.error = null;
                boardInfo.unZipPath = desPath;
                element.progress('board-' + boardInfo.index + '-progress-filter', '100%');
                resolve(boardInfo);
            }
        })
    });
}

BoardManager.readBoardConfig = (inPath) => {
    const boardConfig = fs_extra.readJsonSync(inPath, { throws: false });
    if (boardConfig) {
        const { boardType, boardImg, boardName } = boardConfig;

        if ((boardType || boardName) && boardImg) {
            const boardIndexPath = path.join(inPath, '../index.xml');
            boardConfig.boardIndex = path.relative(Env.indexDirPath, boardIndexPath);
            if (!boardType && boardName) {
                boardConfig.boardType = boardName;
                delete boardConfig.boardName;
            }
            return boardConfig;
        }
    }
    return null;
}

BoardManager.getThirdPartyBoardsConfig = () => {
    const thirdPartyBoardsConfig = [];
    if (fs_plus.isDirectorySync(Env.thirdPartyBoardPath)) {
        const nameList = fs.readdirSync(Env.thirdPartyBoardPath);
        for (let i of nameList) {
            const namePath = path.join(Env.thirdPartyBoardPath, './' + i);
            if (!fs_plus.isDirectorySync(namePath)) {
                continue;
            }
            const configPath = path.join(namePath, './config.json');
            const boardConfig = BoardManager.readBoardConfig(configPath);
            if (!boardConfig) {
                continue;
            }
            const { boardImg = '' } = boardConfig;
            const srcIndexDir = path.join(Env.indexDirPath, boardImg);
            const srcThirdDir = path.join(namePath, boardImg);
            const reSrcIndexDir = path.relative(Env.indexDirPath, srcIndexDir);
            const reSrcThirdDir = path.relative(Env.indexDirPath, srcThirdDir);
            if (fs_plus.isFileSync(srcIndexDir)) {
                boardConfig.boardImg = reSrcIndexDir;
            } else if (fs_plus.isFileSync(srcThirdDir)) {
                boardConfig.boardImg = reSrcThirdDir;
            }
            thirdPartyBoardsConfig.push(boardConfig);
        }
    }
    return thirdPartyBoardsConfig;
}

BoardManager.compareBoardConfig = (cloudConfig) => {
    const { url, version, package } = cloudConfig;
    const boardDirName = path.basename(url ?? '', '.zip');
    cloudConfig.boardDirName = boardDirName;
    cloudConfig.downloadBoardIndex = true;
    cloudConfig.downloadPackage = true;
    const boardDir = path.join(Env.thirdPartyBoardPath, './' + boardDirName);
    if (fs_plus.isDirectorySync(boardDir)) {
        const localConfigPath = path.join(boardDir, './config.json');
        const localConfig = fs_extra.readJsonSync(localConfigPath, { throws: false });
        if (localConfig !== null) {
            if (localConfig.version === version)
                cloudConfig.downloadBoardIndex = false;
            if (MArray.equals(localConfig?.package, package)) {
                cloudConfig.downloadPackage = false;
            }
        }
        if (cloudConfig.downloadPackage || cloudConfig.downloadBoardIndex)
            cloudConfig.status = Msg.getLang('TO_BE_UPDATED');
        else
            cloudConfig.status = Msg.getLang('INSTALLED');
    } else {
        cloudConfig.status = Msg.getLang('TO_BE_INSTALLED');
    }
    return cloudConfig;
}

BoardManager.onclickImportBoards = () => {
    let tableConfig = {
        id: 'cloud-boards-table',
        elem: '#import-board-page',
        data: [],
        toolbar: `<script type="text/html" id="import-board-toolbar">
                    <div class="layui-btn-container" style="text-align: center;">
                        <button class="layui-btn self-adaption-btn layui-btn-sm" lay-event="cloud-import">${Msg.getLang("CLOUD_IMPORT")}</button>
                        <button class="layui-btn self-adaption-btn layui-btn-sm" lay-event="local-import">${Msg.getLang("LOCAL_IMPORT")}</button>
                    </div>
                </script>`,
        defaultToolbar: [],
        title: Msg.getLang('CLOUD_BOARD'),
        cols: [[
            { type: 'checkbox', unresize: false, align: "center" },
            { field: 'status', title: Msg.getLang('STATUS'), unresize: false, align: "center", minWidth: 100 },
            { field: 'name', title: Msg.getLang('NAME'), sort: true, unresize: false, align: "center", minWidth: 200 },
            { field: 'version', title: Msg.getLang('VERSION'), unresize: false, align: "center", minWidth: 80 },
            { field: 'desc', title: Msg.getLang('INTRODUCTION'), unresize: false, align: "center", minWidth: 250 }
        ]],
        limit: 1000,
        skin: 'line',
        even: false,
        size: 'sm'
    };

    table.on('row(import-board-page-filter)', function(obj) {
        let $checkbox = obj.tr.first().find('.layui-form-checkbox');
        obj.setRowChecked({
            checked: !$checkbox.hasClass('layui-form-checked')
        });
    });
    
    table.render({
        ...tableConfig,
        text: {
            none: Msg.getLang('CLOUD_BOARD_JSON_DOWNLOADING') + '...'
        }
    });
    const downloadDir = path.join(Env.clientPath, './download');
    CloudDownload.getJson(BoardManager.URL, downloadDir, (message) => {
        if (message[0]) {
            console.log(message[0]);
            table.render(tableConfig);
            return;
        }
        let boardConfig = [];
        for (let i of message[1]) {
            boardConfig.push(BoardManager.compareBoardConfig({ ...i }));
        }
        tableConfig.data = boardConfig;
        table.render(tableConfig);
    });

    //头工具栏事件
    table.on('toolbar(import-board-page-filter)', function (obj) {
        const checkStatus = table.checkStatus(obj.config.id);
        switch (obj.event) {
            case 'cloud-import':
                let selectedBoards = checkStatus.data;
                let boardList = [];
                for (var i = 0; i < selectedBoards.length; i++) {
                    boardList.push({ ... selectedBoards[i] });
                }
                if (boardList.length > 0) {
                    BoardManager.showCloudImportProgress(boardList);
                } else {
                    layer.msg(Msg.getLang('SELECT_AT_LEAST_ONE_CLOUD_BOARD'), { time: 2000 });
                }
                break;
            case 'local-import':
                BoardManager.showLocalImportDialog();
                break;
        };
    });
}

BoardManager.onclickManageBoards = () => {

}

BoardManager.enterBoardIndexWithPyShell = (indexPath, pyFilePath) => {
    PythonShell.run(indexPath, pyFilePath);
}

BoardManager.loadBoards = () => {
    const newBoardsList = [];
    if (typeof USER.boardIgnore !== 'object')
        USER.boardIgnore = [];
    for (let i = 0; BOARDS_INFO[i]; i++) {
        if (!USER.boardIgnore.includes(BOARDS_INFO[i].boardType)) {
            const config = BOARDS_INFO[i];
            const {
                env = {
                    electron: true,
                    web: true,
                    webCompiler: true,
                    webSocket: true
                }
            } = config;
            let show = false;
            if ((Env.hasSocketServer && env.webSocket)
             || (Env.hasCompiler && env.webCompiler)
             || (goog.isElectron && env.electron)
             || (!goog.isElectron && env.web)) {
                show = true;
            } else {
                show = false;
            }
            if (!show) {
                continue;
            }
            if (goog.isElectron) {
                const indexPath = path.join(__dirname, config.boardIndex);
                if (fs_plus.isFileSync(indexPath))
                    newBoardsList.push({ ...BOARDS_INFO[i], thirdPartyBoard: false });
            } else {
                newBoardsList.push({ ...BOARDS_INFO[i], thirdPartyBoard: false });
            }
        }
    }

    if (goog.isElectron) {
        const tpBoardsConfig = BoardManager.getThirdPartyBoardsConfig();
        for (let i = 0; i < tpBoardsConfig.length; i++) {
            const config = tpBoardsConfig[i];
            const indexPath = path.join(__dirname, config.boardIndex);
            if (fs_plus.isFileSync(indexPath)) {
                const boardInfo = {
                    boardImg: config.boardImg ?? './files/default.png',
                    boardType: config.boardType ?? 'Unknown board',
                    boardIndex: config.boardIndex ?? 'javascript:;',
                    env: {
                        electron: true,
                        web: false,
                        webCompiler: false,
                        webSocket: false
                    },
                    thirdPartyBoard: true,
                    pyFilePath: config.pyFilePath ?? false,
                    language: config.language
                }
                newBoardsList.push(boardInfo);
            }
        }
    }
    const boardAdd = {
        boardImg: "./files/add.png",
        boardType: "Add",
        boardDescription: "",
        boardIndex: "javascript:;",
        env: {
            electron: true,
            web: true,
            webCompiler: true,
            webSocket: true
        }
    };
    newBoardsList.push(boardAdd);
    BoardManager.boardsList = newBoardsList;
}

BoardManager.showBoardsCard = (row, col) => {
    const boardContainerDom = $('#mixly-board');
    if (boardContainerDom.length === 0) return;
    var boardNum = 0;
    var rowStr = '';
    boardContainerDom.empty();
    const { boardsList } = BoardManager;
    const params = 'error=0';
    for (let i = 0; i < boardsList.length; i++) {
        const {
            thirdPartyBoard = false,
            boardIndex,
            boardType,
            boardName,
            boardImg,
            language
        } = boardsList[i];
        const indexPath = './boards/index.html';
        if (boardIndex !== 'javascript:;') {
            let configObj = {
                thirdPartyBoard,
                boardIndex,
                boardType,
                boardImg,
                language
            };
            if (boardName) {
                configObj.boardName = boardName;
            }
            const configUrl = Url.jsonToUrl(configObj);
            rowStr += `
            <div class="col-sm-6 col-md-4 col-lg-3 col-xl-2 mixly-board" id="board-${i}">
                <button id="board-${i}-button" index="${i}" type="button" class="layui-btn layui-btn-sm layui-btn-primary mixly-board-${thirdPartyBoard? 'del-btn' : 'ignore-btn'}">
                    <i class="icon-${thirdPartyBoard? 'cancel-outline' : 'eye-off'}"></i>
                </button>
                <div class="service-single">
                    <a href="${indexPath}?${configUrl}">
                        <img src="${boardsList[i]['boardImg']}" alt="service image" class="tiltimage">
                        <h2>${boardsList[i]['boardType']}</h2>
                        <label style="letter-spacing:1.5px;">${Msg.getLang('CODE_LANG')}: ${language}</label>
                    </a>
                </div>
            </div>
            `;
        } else {
            rowStr += `
            <div class="col-sm-6 col-md-4 col-lg-3 col-xl-2 setting-card">
                <div class="service-single">
                    <a href="${boardsList[i]['boardIndex']}" onclick="Mixly.Setting.onclick()">
                        <img id="add-board" src="${boardsList[i]['boardImg']}" alt="service image" class="tiltimage">
                        <h2></h2>
                        <label></label>
                    </a>
                </div>
                <div>
                    <div>
                        <form class="layui-form" lay-filter="setting-card-filter">
                            <div class="layui-form-item layui-form-text" style="display: ${USER.themeAuto? 'none':'block'};">
                                <div class="layui-col-md12" style="text-align: center;">
                                    <input 
                                    lay-filter="setting-theme-filter"
                                    type="checkbox"
                                    name="close"
                                    lay-skin="switch"
                                    lay-text="&#xf186|&#xf185"
                                    ${USER.theme === 'dark'? ' checked' : ''}>
                                </div>
                            </div>
                            <div class="layui-form-item layui-form-text">
                                <div class="layui-col-md12" style="text-align: center;">
                                    <button 
                                    type="button"
                                    class="layui-btn layui-btn-xs layui-btn-radius self-adaption-btn"
                                    lay-submit
                                    lay-filter="open-setting-dialog-filter">
                                        <i class="layui-icon layui-icon-set-fill"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="layui-form-item layui-form-text">
                                <div class="layui-col-md12" style="text-align: center;">
                                    <button
                                    type="button"
                                    class="layui-btn layui-btn-xs layui-btn-radius self-adaption-btn"
                                    lay-submit
                                    lay-filter="board-reset-filter">
                                        <i class="layui-icon layui-icon-refresh"></i>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            `;
        }
        boardNum++;
        if (boardNum % (col * row) === 0 && rowStr) {
            rowStr = '<div style="background-color:rgba(0,0,0,0);padding-left:70px;padding-right:70px;"><div class="row maxs" style="height:250px;">' + rowStr + '</div></div>';
            boardContainerDom.append(rowStr);
            rowStr = '';
        } else if ((boardNum % col) == 0) {
            rowStr += '</div><div class="row maxs" style="height:30px;"></div><div class="row maxs" style="height:250px;">';
        }
    }
    if (boardNum % (col * row) && rowStr) {
        while (boardNum % (col * row)) {
            rowStr += `
            <div class="col-sm-6 col-md-4 col-lg-3 col-xl-2">
                <div class="service-single">
                    <a>
                        <img src="./files/blank.png" alt="service image" class="tiltimage">
                        <label></label>
                    </a>
                </div>
            </div>
            `;
            boardNum++;
            if (!(boardNum % col)) {
                rowStr += '</div><div class="row maxs" style="height:30px;"></div><div class="row maxs" style="height:250px;">';
            }
        }
        rowStr = '<div style="background-color:rgba(0,0,0,0);padding-left:70px;padding-right:70px;"><div class="row maxs" style="height:250px;">' + rowStr + '</div></div>';
        boardContainerDom.append(rowStr);
        rowStr = '';
    }

    const endFunc = (error) => {
        if (error) {
            console.log(error);
        }
        BoardManager.screenWidthLevel = -1;
        BoardManager.screenHeightLevel = -1;
        BoardManager.loadBoards();
        BoardManager.updateBoardsCard();
    }

    $(".mixly-board-del-btn").off("click").click((event) => {
        const index = $(event.currentTarget).attr('index');
        const config = BoardManager.boardsList[index];
        const dirPath = path.join(Env.indexDirPath, config.boardIndex, '../');
        BoardManager.delBoard(dirPath, endFunc);
    });

    $(".mixly-board-ignore-btn").off("click").click((event) => {
        const index = $(event.currentTarget).attr('index');
        const config = BoardManager.boardsList[index];
        BoardManager.ignoreBoard(config.boardType, endFunc);
    });

    const footerDom = $('#footer');
    if (footerDom.length) {
        footerDom.empty();
        footerDom.append(
            `<div class="container" style="text-align:center;">
                <hr>
                <p>Copyright © Mixly Team@BNU, CHINA</p>
            </div>`
        );
    }
}

BoardManager.screenWidthLevel = -1;
BoardManager.screenHeightLevel = -1;

BoardManager.hasScrollbar = () => {
    return document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight);
}

BoardManager.updateBoardsCard = (offset = 0) => {
    const homeDivDom = $('#home'),
          homeDivHeight = homeDivDom[0].clientHeight;
    let boardRowNum = 1,
        boardColNum = 1;
    const footerDom = $('#footer');
    if (BoardManager.hasScrollbar()) {
        boardRowNum = parseInt((document.body.scrollHeight - homeDivHeight) / 250);
        if (boardRowNum <= 0) {
            boardRowNum = 1;
        }
        footerDom.css('top', (homeDivHeight + 275 * boardRowNum - 100) + "px");
    } else {
        boardRowNum = parseInt(((window.innerHeight || document.documentElement.clientHeight) - homeDivHeight) / 250);
        if (boardRowNum <= 0) {
            boardRowNum = 1;
        }
        if (((homeDivHeight + 275 * boardRowNum - 100) + 50) > (window.innerHeight || document.documentElement.clientHeight)) {
            footerDom.css('top', (homeDivHeight + 275 * boardRowNum - 100) + "px");
        } else {
            footerDom.css('top', "auto");
        }
    }

    //console.log("document.body.clientWidth:" + document.body.clientWidth);
    if ($('body').width() < 750) {
        if (BoardManager.screenWidthLevel != 0 || BoardManager.screenHeightLevel != boardRowNum) {
            BoardManager.screenWidthLevel = 0;
            BoardManager.screenHeightLevel = boardRowNum;
            Mixly.BoardManager.showBoardsCard(boardRowNum, 1);
        }
        boardColNum = 1;
    } else if ($('body').width() < 975) {
        if (BoardManager.screenWidthLevel != 1 || BoardManager.screenHeightLevel != boardRowNum) {
            BoardManager.screenWidthLevel = 1;
            BoardManager.screenHeightLevel = boardRowNum;
            Mixly.BoardManager.showBoardsCard(boardRowNum, 2);
        }
        boardColNum = 2;
    } else if ($('body').width() < 1182) {
        if (BoardManager.screenWidthLevel != 2 || BoardManager.screenHeightLevel != boardRowNum) {
            BoardManager.screenWidthLevel = 2;
            BoardManager.screenHeightLevel = boardRowNum;
            BoardManager.showBoardsCard(boardRowNum, 3);
        }
        boardColNum = 3;
    } else {
        if (BoardManager.screenWidthLevel != 3 || BoardManager.screenHeightLevel != boardRowNum) {
            BoardManager.screenWidthLevel = 3;
            BoardManager.screenHeightLevel = boardRowNum;
            Mixly.BoardManager.showBoardsCard(boardRowNum, 4);
        }
        boardColNum = 4;
    }

    //console.log('板卡 行×列:', boardRowNum + '×' + boardColNum);

    const { boardsList } = BoardManager;

    let pageIndex = 0;

    if (BOARD_PAGE.boardType)
        for (let i in boardsList) {
            const config = boardsList[i];
            if (config.boardType === BOARD_PAGE.boardType) {
                pageIndex = Math.floor((i - 0) / (boardRowNum * boardColNum));
                break;
            }
        }

    if (isNaN(pageIndex) || pageIndex < 0)
        pageIndex = 0;

    carousel.render({
        elem: '#board-switch',
        arrow: 'always',
        autoplay: false,
        width: '100%',
        height: (275 * boardRowNum) + 'px',
        anim: 'default',
        indicator: 'none',
        index: pageIndex
    });
    form.render(null, 'setting-card-filter');
    $('.setting-card > div:nth-child(2)').find('div').addClass('fontello-icon');
}

})();