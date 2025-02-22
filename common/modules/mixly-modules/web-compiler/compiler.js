goog.loadJs('web', () => {

goog.require('Mixly.Url');
goog.require('Mixly.Config');
goog.require('Mixly.LayerExt');
goog.require('Mixly.Boards');
goog.require('Mixly.MFile');
goog.require('Mixly.Msg');
goog.require('Mixly.Web.BU');
goog.require('Mixly.Web.Serial');
goog.provide('Mixly.WebCompiler.Compiler');

const {
    WebCompiler,
    Url,
    Boards,
    MFile,
    Config,
    LayerExt,
    Msg,
    Web
} = Mixly;
const { SOFTWARE, BOARD } = Config;
const { Compiler } = WebCompiler;
const { BU, Serial } = Web;

const DEFAULT_CONFIG = {
    "enabled": true,
    "protocol": "http:",
    "ip": "localhost",
    "domain": null
};

Compiler.CONFIG = { ...DEFAULT_CONFIG, ...(SOFTWARE?.webCompiler ?? {}) };
const { CONFIG } = Compiler;
let { hostname, protocol, port } = window.location;
if (port) {
    port = ':' + port;
}
Compiler.protocol = protocol;
Compiler.URL = Compiler.protocol + '//' + hostname + port + '/compile';

Compiler.compile = () => {
    const { mainStatusBarTabs } = Mixly;
    const statusBarTerminal = mainStatusBarTabs.getStatusBarById('output');
    mainStatusBarTabs.show();
    statusBarTerminal.setValue('');
    Compiler.generateCommand('compile', (error, obj, layerNum) => {
        layer.close(layerNum);
        let message = Msg.Lang['shell.compileSucc'];
        if (error) {
            message = Msg.Lang['shell.compileFailed'];
        }
        layer.msg(message, { time: 1000 });
        statusBarTerminal.addValue("==" + message + "(" + Msg.Lang['shell.timeCost'] + " " + obj.timeCost + ")==\n");
    });
}

Compiler.upload = async () => {
    const { mainStatusBarTabs } = Mixly;
    const statusBarTerminal = mainStatusBarTabs.getStatusBarById('output');
    mainStatusBarTabs.show();
    statusBarTerminal.setValue('');
    BU.burning = false;
    BU.uploading = true;
    const board = Boards.getSelectedBoardCommandParam();
    const boardParam = board.split(':');
    const portName = 'web-serial';
    if (boardParam[1] === 'avr') {
        let boardUpload;
        switch (boardParam[2]) {
            case 'uno':
                boardUpload = 'uno';
                break;
            case 'nano':
                if (boardParam.length > 3 && boardParam[3] === 'cpu=atmega328old') {
                    boardUpload = 'nanoOldBootloader';
                } else {
                    boardUpload = 'nano';
                }
                break;
            case 'pro':
                boardUpload = 'proMini';
                break;
        }
        Serial.portClose(portName, async () => {
            mainStatusBarTabs.changeTo('output');
            try {
                await AvrUploader.connect(boardUpload, {});
                Compiler.generateCommand('upload', BU.uploadWithAvrUploader);
            } catch (error) {
                statusBarTerminal.addValue(error.toString() + '\n');
            }
        });
    } else {
        Serial.connect(portName, 115200, async (port) => {
            if (!port) {
                layer.msg(Msg.Lang['已取消连接'], { time: 1000 });
                return;
            }
            mainStatusBarTabs.changeTo('output');
            Compiler.generateCommand('upload', BU.uploadWithEsptool);
        });
    }
}

Compiler.generateCommand = (operate, endFunc = (errorMessage, data, layerNum) => {}) => {
    const code = MFile.getCode();
    let type;
    const boardType = Boards.getSelectedBoardCommandParam();
    let command = {
        board: encodeURIComponent(boardType),
        code: encodeURIComponent(code),
        visitorId: BOARD.visitorId.str32CRC32b,
        operate
    };
    const { mainStatusBarTabs } = Mixly;
    const statusBarTerminal = mainStatusBarTabs.getStatusBarById('output');
    let commandStr = Compiler.URL + '?' + Url.jsonToUrl(command);
    statusBarTerminal.setValue(Msg.Lang['shell.compiling'] + '...\n');
    console.log('send -> ', commandStr);
    const compileLayer = layer.open({
        type: 1,
        title: Msg.Lang['shell.compiling'] + "...",
        content: $('#mixly-loader-div'),
        shade: LayerExt.SHADE_NAV,
        closeBtn: 0,
        success: function () {
            $(".layui-layer-page").css("z-index", "198910151");
            $("#mixly-loader-btn").off("click").click(() => {
                layer.close(compileLayer);
            });
        },
        end: function () {
            $('#mixly-loader-div').css('display', 'none');
            $(".layui-layer-shade").remove();
        }
    });
    Compiler.sendCommand(compileLayer, commandStr, endFunc);
}

Compiler.sendCommand = (layerType, command, endFunc = (errorMessage, data, layerNum) => {}) => {
    /*
    fetch(command).then(function(response) {
        console.log(response);
        if(response.ok) {
            return response.blob();
        }
        throw new Error('Network response was not ok.');
    }).then(function(myBlob) { 
        var objectURL = URL.createObjectURL(myBlob); 
        console.log(objectURL);
    }).catch(function(error) {
        console.log('There has been a problem with your fetch operation: ', error.message);
    });
    */
    const { mainStatusBarTabs } = Mixly;
    const statusBarTerminal = mainStatusBarTabs.getStatusBarById('output');
    let req = new Request(command);
    fetch(req, {
        credentials: 'omit', // 设置不传递cookie
        mode: 'cors', // 设置请求不允许跨域
    }).then(res => {
        return res.text();
    }).then((data) => {
        const dataObj = JSON.parse(data);
        console.log(dataObj);
        if (dataObj.error) {
            statusBarTerminal.addValue(decodeURIComponent(dataObj.error));
            endFunc(true, null, layerType);
        } else {
            statusBarTerminal.addValue(decodeURIComponent(dataObj.compileMessage));
            endFunc(false, {
                data: dataObj.data,
                timeCost: decodeURIComponent(dataObj.timeCost)
            }, layerType);
        }
    })
    .catch((error) => {
        endFunc(true, error.toString(), layerType);
    });
}

});