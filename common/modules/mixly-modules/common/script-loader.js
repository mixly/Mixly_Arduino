goog.require('Mixly');
goog.provide('Mixly.ScriptLoader');

/**
 * 加载 script 文件
 * @param src
 */
Mixly.ScriptLoader.loadScript = function (src) {
    var addSign = true;
    var scripts = document.getElementsByTagName("script");
    for (var i = 0; i < scripts.length; i++) {
        if (scripts[i] && scripts[i].src && scripts[i].src.indexOf(src) != -1) {
            addSign = false;
        }
    }
    if (addSign) {
        var $script = document.createElement('script');
        $script.setAttribute("type", "text/javascript");
        $script.setAttribute("src", src);
        //$script.setAttribute("async", "");
        document.getElementsByTagName("head").item(0).appendChild($script);
    }
}

/**
 * 删除 script 文件
 * @param src
 */
Mixly.ScriptLoader.removeScript = function (src) {
    var scripts = document.getElementsByTagName("script");
    if (src.indexOf("../") !== -1) {
        src = src.substring(src.lastIndexOf("../") + 3, src.length);
    }
    for (var i = 0; i < scripts.length; i++) {
        if (scripts[i] && scripts[i].src && scripts[i].src.indexOf(src) != -1) {
            scripts[i].parentNode.removeChild(scripts[i]);
        }
    }
}

Mixly.ScriptLoader.loadLangJs = function (oldLang, newLang, doFunc) {
    var scripts = document.querySelectorAll("script");
    let newLangPathArr = [];
    for (let i = 0; i < scripts.length; i++) {
        if (scripts[i] && scripts[i].src && scripts[i].src.indexOf(oldLang + ".js") != -1) {
            let oldLangPath = scripts[i].src;
            let newLangPath = oldLangPath.replace(oldLang + ".js", newLang + ".js");
            scripts[i].parentNode.removeChild(scripts[i]);
            newLangPathArr.push(newLangPath);
        }
    }
    for (let i = 0; i < Mixly.Env.thirdPartyJS.length; i++) {
        Mixly.Env.thirdPartyJS[i] = Mixly.Env.thirdPartyJS[i].replace(oldLang + ".js", newLang + ".js");
    }
    LazyLoad.js(newLangPathArr, function () {
        doFunc();
    });
}