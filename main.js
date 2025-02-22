const {
    app,
    BrowserWindow,
    ipcMain,
    globalShortcut,
    dialog,
    Menu,
    MenuItem,
    shell,
    webContents
} = require('electron');
const electron = require('electron');
const electronLocalshortcut = require('electron-localshortcut');
const nodeFs = require('fs');
const nodePath = require('path');
const electron_remote = require('@electron/remote/main');
electron_remote.initialize();

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

let cloudSoftwareJson = null;

const usbDetection = require('usb-detection');

usbDetection.startMonitoring();
usbDetection.on('add', (device) => {
    setTimeout(() => {
        sendCommand({
            obj: 'Mixly.Electron.Serial',
            func: 'refreshPorts',
            args: [device]
        });
    }, 1000);
});

usbDetection.on('remove', (device) => {
    setTimeout(() => {
        sendCommand({
            obj: 'Mixly.Electron.Serial',
            func: 'refreshPorts',
            args: [device]
        });
    }, 1000);
});

function sendCommand (commandObj, win = null) {
    let commandStr = '';
    try {
        commandStr = JSON.stringify(commandObj);
    } catch (error) {
        return;
    } 
    if (win) {
        win.webContents.send('command', commandStr);
    } else {
        const nowWebContents = webContents.getAllWebContents();
        for (let i in nowWebContents) {
                nowWebContents[i].send('command', commandStr);
        }
    }
}

// 程序 ready 前禁用GPU加速，解决软件打开时的黑屏问题
app.disableHardwareAcceleration();
app.allowRendererProcessReuse = false;

if (process.platform !== 'darwin') {
    Menu.setApplicationMenu(null);
}

function createWindow(filePath = null, indexUrl = null) {
    // 可以创建多个渲染进程
    let win = new BrowserWindow({
        show: false,
        //resizable: false,
        minHeight: 400,
        minWidth: 700,
        width: 0,
        height: 0,
        icon: __dirname + '/files/mixly_uncompressed.ico',
        allowRunningInsecureContent: true,
        webPreferences: {
            nodeIntegration: true,
            nodeIntegrationInWorker: false,
            allowRunningInsecureContent: true,
            enableRemoteModule: true,
            contextIsolation: false,
            spellcheck: false
        }
    });

    //win.setBackgroundColor("#181818");

    electron_remote.enable(win.webContents);
    //win.webContents.openDevTools();
    //win.maximize()
    //win.show()

    // 渲染进程中的web页面可以加载本地文件
    if (indexUrl)
        win.loadURL(indexUrl);
    else
        win.loadFile('./src/index.html');

    //打开或关闭开发者工具
    electronLocalshortcut.register(win, 'CmdOrCtrl+Shift+I', () => {
        win.webContents.toggleDevTools();
    });

    //重载页面
    electronLocalshortcut.register(win, 'CmdOrCtrl+R', () => {
        //win.reload();
        sendCommand({
            obj: 'Mixly.Electron.Loader',
            func: 'reload',
            args: []
        }, win);
    });

    //重载页面
    electronLocalshortcut.register(win, 'CmdOrCtrl+Shift+R', () => {
        win.reload();
    });

    //最小化窗口
    electronLocalshortcut.register(win, 'CmdOrCtrl+M', () => {
        win.minimize();
    });

    //关闭窗口
    electronLocalshortcut.register(win, 'CmdOrCtrl+W', () => {
        win.close();
    });

    //还原窗口
    electronLocalshortcut.register(win, 'CmdOrCtrl+0', () => {
        win.webContents.setZoomFactor(1);
    });

    //放大窗口
    electronLocalshortcut.register(win, 'CmdOrCtrl+Shift+=', () => {
        let actualZoom = win.webContents.getZoomFactor();
        if (actualZoom == null) {
            actualZoom = 1;
        }
        if (actualZoom < 1.5) {
            win.webContents.setZoomFactor(actualZoom + 0.1);
        }
    });

    //缩小窗口
    electronLocalshortcut.register(win, 'CmdOrCtrl+Shift+-', () => {
        let actualZoom = win.webContents.getZoomFactor();
        if (actualZoom == null) {
            actualZoom = 1;
        }
        if (actualZoom > 0.5) {
            win.webContents.setZoomFactor(actualZoom - 0.1);
        }
    });

    //重启
    electronLocalshortcut.register(win, 'CmdOrCtrl+Q', () => {
        app.relaunch();
        app.exit(0);
    });

    //打开帮助页面
    electronLocalshortcut.register(win, 'CmdOrCtrl+H', () => {
        var sendObj = {};
        sendObj.type = "help";
        var sendStr = JSON.stringify(sendObj);
        win.webContents.send('ping', sendStr);
        //win.webContents.executeJavaScript('alert("this is a test!");');
    });

    //创建一个新页面
    electronLocalshortcut.register(win, 'CmdOrCtrl+Shift+N', () => {
        createWindow(null);
    });

    //文件另存为
    electronLocalshortcut.register(win, 'CmdOrCtrl+Shift+S', () => {
        const commandObj = {
            obj: 'Mixly.Electron.File',
            func: 'saveAs'
        }
        const commandStr = JSON.stringify(commandObj);
        win.webContents.send('command', commandStr);
    });

    //新建文件
    electronLocalshortcut.register(win, 'CmdOrCtrl+N', () => {
        const commandObj = {
            obj: 'Mixly.Electron.File',
            func: 'newFile'
        }
        const commandStr = JSON.stringify(commandObj);
        win.webContents.send('command', commandStr);
    });

    win.once('ready-to-show', () => {
        win.maximize();
        win.show();
        if (filePath != null) {
            win.webContents.send('open-file', filePath);
        }
    });

    win.on('close', function () {

    });

    // 记得在页面被关闭后清除该变量，防止内存泄漏
    win.on('closed', function () {
        win = null;
    });
    
    /*if (process.platform === 'win32') {
        getLibsJson(function (jsonData) {
            if (!jsonData?.version) return;
            cloudSoftwareJson = JSON.stringify(jsonData);
            //var updateSoftware = changeVersion(app.getVersion(), jsonData.version);
            var updateSoftware = (app.getVersion() != jsonData.version);
            if (updateSoftware) {
                var sendObj = {};
                sendObj.type = "update";
                sendObj.oldVersion = app.getVersion();
                sendObj.newVersion = jsonData.version;
                var sendStr = JSON.stringify(sendObj);
                setTimeout(function () {
                    win.webContents.send('ping', sendStr);
                }, 1000);
            }
        });

        ipcMain.on('ping', (event, arg) => {
            if (arg == "update") {
                shell.openPath(nodePath.join(__dirname, '../../一键更新.bat'));
            }
            event.reply('ping', 'get');
        });
    }*/

    win.on('unresponsive', async () => {
        const { response } = await dialog.showMessageBox({
            message: 'Mixly3.0无响应',
            title: '您想尝试强制重新加载应用程序吗？',
            buttons: ['确定', '取消'],
            cancelId: 1
        });
        if (response === 0) {
            win.forcefullyCrashRenderer();
            win.reload();
        }
    });
}

app.on('ready', () => {
    if (process.argv.length >= 2) {
        createWindow(process.argv[1]);
    } else {
        createWindow(null);
    }
});

app.on('activate', () => {
    if (!webContents.getAllWebContents().length) {
        createWindow(null);
    }
});

// 页面全部关闭后关闭主进程,不同平台可能有不同的处理方式
app.on('window-all-closed', () => {
    usbDetection.stopMonitoring();
    app.quit();
});

app.on('render-process-gone', async (e, w, d) => {
    let title;
    if(d.reason == "crashed") {
        nodeFs.appendFileSync('./log.txt', `${new Date()}渲染进程崩溃${d.reason}\n, ${JSON.stringify(d)}\n\n`);
        title = '渲染进程崩溃';
    } else {
        nodeFs.appendFileSync('./log.txt', `${new Date()}渲染进程被杀死${d.reason}\n`);
        title = '渲染进程被杀死';
    }
    const { response } = await dialog.showMessageBox({
        title: title,
        message: '您想尝试强制重新加载此页面吗？',
        type: 'none',
        buttons: ['确定', '取消'],
        cancelId: 1
    });
    w.destroy();
    if (response === 0) {
        createWindow(null, w.getURL());
    }
});

const gotTheLock = app.requestSingleInstanceLock();
if (gotTheLock) {
    app.on('second-instance', (event, commandLine, workingDirectory) => {
        if (commandLine[0] != app.getPath("exe")) {

        } else {
            if (commandLine.length >= 3) {
                createWindow(commandLine[2]);
            } else {
                createWindow(null);
            }
        }
    })
} else {
    app.quit();
}
