goog.loadJs('common', () => {

goog.require('Mixly.Debug');
goog.provide('Mixly.MString');

const { Debug, MString } = Mixly;

/**
 * @function 使用传入值替换字符串中{xxx}
 * @param str {string} 传入字符串
 * @param obj {object}
 *  obj = {
 *      xxx: value1，
 *      xxx: value2
 *  }
 *  使用value替换{xxx}
 * @return {string} 返回处理后的字符串
 **/
MString.tpl = (str, obj) => {
    if (typeof str !== 'string' || !(obj instanceof Object)) {
        return str;
    }
    for (let key in obj) {
        let re = new RegExp("{[\s]*" + key + "[\s]*}", "gim");
        str = str.replace(re, obj[key]);
    }
    return str;
}

MString.decode = (str) => {
    try {
        str = unescape(str.replace(/(_E[0-9A-F]{1}_[0-9A-F]{2}_[0-9A-F]{2})+/gm, '%$1'));
        str = unescape(str.replace(/\\(u[0-9a-fA-F]{4})/gm, '%$1'));
    } catch (error) {
        Debug.error(error);
    }
    return str;
}

MString.strToByte = (str) => {
    var len, c;
    len = str.length;
    var bytes = [];
    for (var i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if (c >= 0x010000 && c <= 0x10FFFF) {
            bytes.push(((c >> 18) & 0x07) | 0xF0);
            bytes.push(((c >> 12) & 0x3F) | 0x80);
            bytes.push(((c >> 6) & 0x3F) | 0x80);
            bytes.push((c & 0x3F) | 0x80);
        } else if (c >= 0x000800 && c <= 0x00FFFF) {
            bytes.push(((c >> 12) & 0x0F) | 0xE0);
            bytes.push(((c >> 6) & 0x3F) | 0x80);
            bytes.push((c & 0x3F) | 0x80);
        } else if (c >= 0x000080 && c <= 0x0007FF) {
            bytes.push(((c >> 6) & 0x1F) | 0xC0);
            bytes.push((c & 0x3F) | 0x80);
        } else {
            bytes.push(c & 0xFF);
        }
    }
    return new Int8Array(bytes);
}

MString.uint8ArrayToStr = (fileData) => {
    var dataString = "";
    for (var i = 0; i < fileData.length; i++) {
        var convert = (fileData[i]).toString(16);
        if (convert.length % 2 == 1)
            convert = "0" + convert;
        dataString = dataString + " " + convert.toUpperCase();
    }
    return dataString;
}

});