(() => {

goog.require('Mixly.Env');
goog.require('Mixly.Config');
goog.require('Mixly.MJSON');
goog.require('Mixly.WebSocket');
goog.require('Mixly.LayerExt');
goog.require('Mixly.Command');
goog.provide('Mixly.WebSocket.Socket');

const {
    Env,
    Config,
    MJSON,
    LayerExt,
    Command
} = Mixly;

const { SOFTWARE } = Config;

const { Socket } = Mixly.WebSocket;

Socket.obj = null;
Socket.url = 'ws://127.0.0.1/socket';
Socket.jsonArr = [];
Socket.connected = false;
Socket.initFunc = null;
Socket.debug = SOFTWARE.debug;
let { hostname, protocol, port } = window.location;
if (protocol === 'http:') {
    Socket.protocol = 'ws:';
} else {
    Socket.protocol = 'wss:';
}
if (port) {
    port = ':' + port;
}
Socket.url = Socket.protocol + '//' + hostname + port + '/socket';
Socket.IPAddress = hostname;
Socket.disconnectTimes = 0;
Socket.updating = false;


let lockReconnect = false; // 避免重复连接
let timeoutFlag = true;
let timeoutSet = null;
let reconectNum = 0;
const timeout = 5000; // 超时重连间隔

function reconnect () {
    if (lockReconnect) return;
    lockReconnect = true;
    // 没连接上会一直重连，设置延迟避免请求过多
    setTimeout(function () {
        timeoutFlag = true;
        Socket.init();
        console.info(`正在重连第${reconectNum + 1}次`);
        reconectNum++;
        lockReconnect = false;
    }, timeout); // 这里设置重连间隔(ms)
}

//心跳检测
const heartCheck = {
    timeout, // 毫秒
    timeoutObj: null,
    serverTimeoutObj: null,
    reset: function () {
        clearInterval(this.timeoutObj);
        clearTimeout(this.serverTimeoutObj);
        return this;
    },
    start: function () {
        const self = this;
        let count = 0;
        let WS = Socket;
        this.timeoutObj = setInterval(() => {
            if (count < 3) {
                if (WS.obj.readyState === 1) {
                    WS.obj.send('HeartBeat');
                    console.info(`HeartBeat第${count + 1}次`);
                }
                count++;
            } else {
                clearInterval(this.timeoutObj);
                count = 0;
                if (WS.obj.readyState === 0 && WS.obj.readyState === 1) {
                    WS.obj.close();
                }
            }
        }, self.timeout);
    }
}

Socket.init = (onopenFunc = (data) => {}, doFunc = () => {}) => {
    if (Socket.connected) {
        if (Socket.initFunc) {
            Socket.initFunc();
            Socket.initFunc = null;
        }
        doFunc();
        return;
    }

    timeoutSet = setTimeout(() => {
        if (timeoutFlag && reconectNum < 3) {
            console.info(`重连`);
            reconectNum++;
            Socket.init();
        }
    }, timeout);
    
    let WS = Socket;
    WS.obj = new WebSocket(WS.url);
    WS.obj.onopen = () => {
        console.log('已连接' + WS.url);
        WS.connected = true;
        Socket.initFunc = doFunc;
        reconectNum = 0;
        timeoutFlag = false;
        clearTimeout(timeoutSet);
        heartCheck.reset().start();
        onopenFunc(WS);
        Socket.reload();
        if (Socket.updating) {
            Socket.updating = false;
        }
    };

    WS.obj.onmessage = (event) => {
        heartCheck.reset().start();
        let command = Command.parse(event.data);
        command = MJSON.decode(command);
        if (Socket.debug)
            console.log('receive -> ', event.data);
        Command.run(command);
    };

    WS.obj.onerror = (event) => {
        console.log('WebSocket error: ', event);
        reconnect();
    };

    WS.obj.onclose = (event) => {
        WS.connected = false;
        WS.disconnectTimes += 1;
        if (WS.disconnectTimes > 255) {
            WS.disconnectTimes = 1;
        }
        console.log('已断开' + WS.url);

        console.info(`关闭`, event.code);
        if (event.code !== 1000) {
            timeoutFlag = false;
            clearTimeout(timeoutSet);
            reconnect();
        } else {
            clearInterval(heartCheck.timeoutObj);
            clearTimeout(heartCheck.serverTimeoutObj);
        }
    }
}

Socket.sendCommand = (command) => {
    let WS = Mixly.WebSocket.Socket;
    if (!WS.connected) {
        layer.msg('未连接' + WS.url, {time: 1000});
        return;
    }
    let commandStr = '';
    
    try {
        commandStr = JSON.stringify(MJSON.encode(command));
        if (Socket.debug)
            console.log('send -> ', commandStr);
    } catch (e) {
        console.log(e);
        return;
    }
    WS.obj.send(commandStr);
}

Socket.clickConnect = () => {
    if (Socket.connected) {
        Socket.disconnect();
    } else {
        Socket.connect((WS) => {
            layer.closeAll();
            layer.msg(WS.url + '连接成功', { time: 1000 });
        });
    }
}

Socket.openLoadingBox = (title, successFunc = () => {}, endFunc = () => {}) => {
    layer.open({
        type: 1,
        title: title,
        content: $('#mixly-loader-div'),
        shade: LayerExt.SHADE_ALL,
        closeBtn: 0,
        success: function () {
            $("#webusb-cancel").css("display","none");
            $(".layui-layer-page").css("z-index", "198910151");
            successFunc();
        },
        end: function () {
            $("#mixly-loader-div").css("display", "none");
            $(".layui-layer-shade").remove();
            $("#webusb-cancel").css("display", "unset");
            if (Socket.connected)
                endFunc();
        }
    });
}

Socket.connect = (onopenFunc = (data) => {}, doFunc = () => {}) => {
    if (Socket.connected) {
        doFunc();
        return;
    }
    let title = '连接中...';
    Socket.openLoadingBox(title, () => {
        setTimeout(() => {
            Socket.init(onopenFunc);
        }, 1000);
    }, doFunc);
}

Socket.disconnect = () => {
    if (!Socket.connected)
        return;
    let title = '断开中...';
    Socket.openLoadingBox(title, () => {
        Socket.obj.close();
    });
}

Socket.reload = () => {
    if (!Socket.updating && Socket.disconnectTimes) {
        window.location.reload();
    }
}

})();
