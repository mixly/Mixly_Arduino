goog.loadJs('common', () => {

goog.require('Mixly');
goog.provide('Mixly.Url');

const { Url } = Mixly;

/**
* @function 输入url，返回json
* @param url {String} 输入的url字符串
* @return object
*/
Url.urlToJson = (url) => {
    // 递归字符串生成json对象
    function strToObj(obj, str, value) {
        if(str.indexOf('.') !== -1) {
            let key = str.substring(0, str.indexOf('.'));
            str = str.substring(str.indexOf('.') + 1, str.length);
            if (obj[key] === undefined) {
                obj[key] = {};
            }
            obj[key] = strToObj(obj[key], str, value);
            return obj;
        } else {
            const decodeValue = decodeURIComponent(value);
            const decodeKey = decodeURIComponent(str);
            if (isNaN(decodeValue)) {
                const decodeValueLower = decodeValue.toLowerCase();
                switch (decodeValueLower) {
                case 'true':
                    obj[decodeKey] = true;
                    break;
                case 'false':
                    obj[decodeKey] = false;
                    break;
                case 'undefined':
                    obj[decodeKey] = undefined;
                    break;
                case 'null':
                    obj[decodeKey] = null;
                    break;
                default:
                    obj[decodeKey] = decodeValue;
                }
            } else {
                obj[decodeKey] = decodeValue-0;
            }
            return obj;
        }
    }
    var hash;
    var myJson = {};
    var hashes = url.slice(url.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        try {
            var hash0 = hash[0].replaceAll('@', '=');
            hash0 = hash0.replaceAll('$', '&');
            var hash1 = hash[1].replaceAll('@', '=');
            hash1 = hash1.replaceAll('$', '&');
            myJson = strToObj(myJson, hash0, hash1);
        } catch (e) {
            myJson = strToObj(myJson, hash[0], hash[1]);
        }
    }
    return myJson;
}

/**
 * @function JSON对象转Url字符串
 * @param param {object | array | string | number | boolean} 传入的JSON对象或者是转换过程中某个键的对应值
 * @param key {null | string} 转换过程中传入的JSON对象中的某个键
 * @return {string} 转换后的Url字符串
 **/
Url.jsonToUrl = (param, key = null) => {
    var paramStr = '';
    if (param instanceof String || param instanceof Number || param instanceof Boolean) {
        try {
            var newKey = key.toString().replaceAll('=', '@');
            newKey = newKey.replaceAll('&', '$');
            var newParam = param.toString().replaceAll('=', '@')
            newParam = newParam.replaceAll('&', '$');
            paramStr += '&' + newKey + '=' + encodeURIComponent(newParam);
        } catch (e) {
            //console.log(e);
            paramStr += '&' + key + '=' + encodeURIComponent(param);
        }
    } else {
        $.each(param, function (i) {
            var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);
            paramStr += '&' + Url.jsonToUrl(this, k);
        });
    }
    return paramStr.substr(1);
};

/**
* @function 获取主页面传递的配置信息
* @return {object}
*/
Url.getConfig = () => {
    var href = '';
    try {
        href = window.location.href.replaceAll('#', '');
    } catch (e) {
        //console.log(e);
        href = window.location.href;
    }
    href = href.substring(href.indexOf('?') + 1, href.length);
    var boardConfig = Url.urlToJson(href);
    return boardConfig;
}

/**
 * @function 更改传入Url字符串中某个参数的值，如果没有则添加该参数
 * @param url {string} Url字符串
 * @param arg {string} 参数名
 * @param argVal {string} 参数名对应值
 * @return {string} 修改后的Url字符串
 **/
Url.changeURLArg = (url, arg, argVal) => {
    var pattern = arg + '=([^&]*)';
    var replaceText = arg + '=' + argVal;
    if (url.match(pattern)) {
        var tmp = '/(' + arg + '=)([^&]*)/gi';
        tmp = url.replace(eval(tmp), replaceText);
        return tmp;
    } else {
        if (url.match('[\?]')) {
            return url + '&' + replaceText;
        } else {
            return url + '?' + replaceText;
        }
    }
}

/**
 * @function 求解某个字符串的CRC32值
 * @param str {string} 传入的字符串
 * @param radix {number} 返回文本的进制，默认十进制
 * @return {string}
 **/
Url.CRC32 = (str, radix = 10) => {
    const Utf8Encode = function (string) {
        string = string.replace(/\r\n/g, '\n');
        let text = '';
        for (let n = 0; n < string.length; n++) {
            const c = string.charCodeAt(n);
            if (c < 128) {
                text += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                text += String.fromCharCode((c >> 6) | 192);
                text += String.fromCharCode((c & 63) | 128);
            } else {
                text += String.fromCharCode((c >> 12) | 224);
                text += String.fromCharCode(((c >> 6) & 63) | 128);
                text += String.fromCharCode((c & 63) | 128);
            }
        }
        return text;
    }

    const makeCRCTable = function () {
        let c;
        const crcTable = [];
        for (let n = 0; n < 256; n++) {
            c = n;
            for (let k = 0; k < 8; k++) {
                c = ((c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
            }
            crcTable[n] = c;
        }
        return crcTable;
    }

    const crcTable = makeCRCTable();
    const strUTF8 = Utf8Encode(str);
    let crc = 0 ^ (-1);
    for (let i = 0; i < strUTF8.length; i++) {
        crc = (crc >>> 8) ^ crcTable[(crc ^ strUTF8.charCodeAt(i)) & 0xFF];
    }
    crc = (crc ^ (-1)) >>> 0;
    return crc.toString(radix);
};

/**
 * @function 获取当前网页的IP地址
 * @return {string | null}
 **/
Url.getIPAddress = () => {
    const url = window.location.host;
    const IPList = url.match(/[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/g);
    if (IPList && IPList.length > 0) {
        return IPList[0];
    }
    return null;
}

/**
 * @function 在新窗口打开某个网址
 * @param href {string} 传入的网址
 * @return {void}
 **/
Url.open = (href) => {
    if (goog.isElectron) {
        const { shell } = Mixly.require('electron');
        shell.openExternal(href);
    } else {
        window.open(href, '_blank');
    }
}

});