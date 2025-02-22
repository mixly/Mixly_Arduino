goog.loadJs('common', () => {

goog.require('Mixly.Debug');
goog.provide('Mixly.MJSON');

const { Debug, MJSON } = Mixly;

MJSON.operate = (jsonObj, optFunc) => {
    // 循环所有键
    for (var key in jsonObj) {
        //如果对象类型为object类型且数组长度大于0 或者 是对象 ，继续递归解析
        var element = jsonObj[key];
        if (element.length > 0 && typeof (element) == "object" || typeof (element) == "object") {
            let data = MJSON.operate(element, optFunc);
            for (let i in data) {
                jsonObj[key][i] = data[i];
            }
        } else { //不是对象或数组、直接输出
            if (typeof (element) === 'string') {
                try {
                    jsonObj[key] = optFunc(jsonObj[key]);
                } catch (error) {
                    Debug.error(error);
                }
            }
        }
    }
    return jsonObj;
}

MJSON.decode = (jsonObj) => {
    // 深度拷贝对象，防止解码或编码时篡改原有对象
    let newJsonObj = structuredClone(jsonObj);
    return MJSON.operate(newJsonObj, decodeURIComponent);
}

MJSON.encode = (jsonObj) => {
    // 深度拷贝对象，防止解码或编码时篡改原有对象
    let newJsonObj = structuredClone(jsonObj);
    return MJSON.operate(newJsonObj, encodeURIComponent);;
}

MJSON.parse = (jsonStr) => {
    let jsonObj = null;
    try {
        jsonStr = jsonStr.replace(/\\"|"(?:\\"|[^"])*"|(\/\/.*|\/\*[\s\S]*?\*\/)/g, (m, g) => g ? "" : m);
        jsonObj = JSON.parse(jsonStr);
    } catch (error) {
        Debug.error(error);
    }
    return jsonObj;
}

MJSON.stringify = (jsonObj) => {
    let jsonStr = '';
    try {
        jsonStr = JSON.stringify(jsonObj);
    } catch (error) {
        Debug.error(error);
    }
    return jsonStr;
}

MJSON.get = (inPath) => {
    return goog.getJSON(inPath);
}

});