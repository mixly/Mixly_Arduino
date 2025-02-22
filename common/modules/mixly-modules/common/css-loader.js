goog.provide('Mixly.CssLoader');
goog.require('Mixly.Config');
goog.require('Mixly.Env');

/**
 * 加载 link 文件
 * @param href
 */
Mixly.CssLoader.loadCss = function (href) {
    var addSign = true;
    var links = document.getElementsByTagName("link");
    for (var i = 0; i < links.length; i++) {
        if (links[i] && links[i].href && links[i].href.indexOf(href) != -1) {
            addSign = false;
        }
    }
    if (addSign) {
        var $link = document.createElement("link");
        $link.setAttribute("rel", "stylesheet");
        $link.setAttribute("type", "text/css");
        $link.setAttribute("href", href);
        document.getElementsByTagName("head").item(0).appendChild($link);
    }
}

/**
 * 删除 link 文件
 * @param href
 */
Mixly.CssLoader.removeCss = function (href) {
    var links = document.getElementsByTagName("link");
    for (var i = 0; i < links.length; i++) {
        var _href = links[i].href;
        if (links[i] && links[i].href && links[i].href.indexOf(href) != -1) {
            links[i].parentNode.removeChild(links[i]);
        }
    }
}