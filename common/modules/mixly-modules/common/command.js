goog.loadJs('common', () => {

goog.require('Mixly.Config');
goog.require('Mixly.MJSON')
goog.require('Mixly.Debug');
goog.provide('Mixly.Command');

const {
    Config,
    Command,
    MJSON,
    Debug
} = Mixly;

const { SOFTWARE } = Config;

Command.DEFAULT = {
    obj: '',
    func: '',
    args: []
}

Command.parse = (commandStr) => {
    return MJSON.decode(MJSON.parse(commandStr));
}

Command.run = (commandObj) => {
    Debug.log('收到指令：', commandObj);
    if (typeof commandObj !== 'object') return;
    commandObj = {
        ...Command.DEFAULT,
        ...commandObj
    };
    const { obj, func, args } = commandObj;
    const objList = obj.split('.');
    if (objList.length === 0) return;
    let nowObj = window[objList[0]];
    if (!nowObj) return;
    objList.shift();
    for (let i of objList) {
        nowObj = nowObj[i];
        if (!nowObj) return;
    }
    try {
        if (nowObj[func])
            nowObj[func](...args);
    } catch (error) {
        Debug.error(error);
    }
}

});