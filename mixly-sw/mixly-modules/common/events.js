goog.loadJs('electron', () => {

goog.require('Mixly.BoardManager');
goog.require('Mixly.Env');
goog.require('Mixly.Config');
goog.require('Mixly.Url');
goog.provide('Mixly.Events');

const {
    BoardManager,
    Env,
    Config,
    Url,
    Events
} = Mixly;

const fs = Mixly.require('fs');
const electron = Mixly.require('electron');
const electron_remote = Mixly.require('@electron/remote');
const { ipcRenderer } = electron;
const { USER } = Config;

ipcRenderer.on('ping', (event, message) => {
    console.log(message);
    var messageObj = null;
    try {
        messageObj = JSON.parse(message);
    } catch (e) {
        console.log(e);
        return;
    }
    if (messageObj?.type == "update") {
        if (USER.autoUpdate !== 'no') {
            const contentData = `<div style="padding: 50px; line-height: 22px; background-color: #393D49; color: #fff; font-weight: 300;text-align: center;">有可用更新，是否立即下载<br /><b style="font-size: 10px;color: #fff;">版本：${messageObj?.oldVersion} → ${messageObj?.newVersion}</b><br /><b style="color: #f70a2b;">注意：</b><br /><p style="color: #f70a2b;">更新时会关闭所有Mixly窗口！</p></div>`;
            layer.open({
                type: 1,
                title: false,
                closeBtn: false,
                area: '300px',
                shade: 0.8,
                id: 'LAY_layuipro',
                btn: ['稍后提醒', '立即更新'],
                btnAlign: 'c',
                moveType: 1,
                content: contentData,
                resize: false,
                success: function (layero) {
                },
                btn2: function () {
                    ipcRenderer.send('ping', "update");
                }
            });
        }
    }
});

ipcRenderer.on('open-file', (event, message) => {
    function getBoardFromXml(xml) {
        if (xml.indexOf("board=\"") === -1) {
            var idxa = xml.indexOf("board=\\\"") + 7;
            var idxb = xml.indexOf("\"", idxa + 1);
            if (idxa !== -1 && idxb !== -1 && idxb > idxa)
                return xml.substring(idxa + 1, idxb - 1);
        } else {
            var idxa = xml.indexOf("board=\"") + 6;
            var idxb = xml.indexOf("\"", idxa + 1);
            if (idxa !== -1 && idxb !== -1 && idxb > idxa)
                return xml.substring(idxa + 1, idxb);
        }
        return undefined;
    }
    let mixStr = fs.readFileSync(message, "utf8");
    let boardType = getBoardFromXml(mixStr);
    if (boardType && boardType.indexOf('@') !== -1) {
        boardType = boardType.substring(0, boardType.indexOf('@'));
    } else if (boardType && boardType.indexOf('/') !== -1) {
        boardType = boardType.substring(0, boardType.indexOf('/'));
    }
    if (boardType) {
        BoardManager.loadBoards();
        const { boardsList } = BoardManager;
        for (let i = 0; i < boardsList.length; i++) {
            if (boardsList[i].boardType === boardType) {
                boardsList[i].filePath = message;
                const {
                    boardType,
                    boardIndex,
                    boardImg,
                    thirdPartyBoard,
                    filePath
                } = boardsList[i];
                let boardJson = JSON.parse(JSON.stringify({
                    boardType,
                    boardIndex,
                    boardImg,
                    thirdPartyBoard,
                    filePath
                }));
                let params = "id=error";
                try {
                    params = Url.jsonToUrl(boardJson);
                    window.location.href = "./boards/index.html?" + params;
                } catch (e) {
                    console.log(e);
                }
            }
        }
        setTimeout(function () {
            alert("未找到" + boardType + "板卡！");
        }, 500);
    } else {
        setTimeout(function () {
            alert("未在文件内找到板卡名！");
        }, 500);
    }
});

ipcRenderer.on('command', (event, command) => {
    let commandObj = null;
    try {
        commandObj = JSON.parse(command);
    } catch (e) {
        console.log(e);
        return;
    }
    const defaultCommand = {
        obj: '',
        func: '',
        args: []
    };
    commandObj = {
        ...defaultCommand,
        ...commandObj
    }
    if (commandObj.obj === 'Mixly.Electron.Loader' && commandObj.func === 'reload') {
        const currentWindow = electron_remote.getCurrentWindow();
        currentWindow.reload();
    }
});

});