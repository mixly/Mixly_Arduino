/**
 *auth: liuyu 4654081@qq.com
 *Date: 2022/2/11
 *Desc: 消息提示插件-支持自定义位置显示,独立版本
 **/
"use strict";


function _typeof(obj) {
    "@babel/helpers - typeof";
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function _typeof(obj) {
            return typeof obj;
        };
    } else {
        _typeof = function _typeof(obj) {
            return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };
    }
    return _typeof(obj);
}

!function (global, factory) {
    (typeof exports === "undefined" ? "undefined" : _typeof(exports)) === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : (global = global || self, global.notify = factory());
}(void 0, function () {

    function c(args, children) {
        var el = document.createElement("div");

        for (var key in args) {
            var element = args[key];

            if (key == "className") {
                key = "class";
                el.setAttribute(key, element);
            } else if (key[0] == "_") {
                el.addEventListener(key.slice(1), element);
            }
        }

        if (typeof children == "string") {
            el.innerHTML = children;
        } else if (_typeof(children) == "object" && children.tagName) {
            el.appendChild(children);
        } else if (children) {
            for (var i = 0; i < children.length; i++) {
                var child = children[i];
                el.appendChild(child);
            }
        }

        return el;
    }

    function addAnimationEnd(el, fn) {
        ["a", "webkitA"].forEach(function (prefix) {
            var name = prefix + "nimationEnd";
            el.addEventListener(name, function () {
                fn();
            });
        });
    }

    function css(el, css) {
        for (var key in css) {
            el.style[key] = css[key];
        }

        if (el.getAttribute("style") === "") {
            el.removeAttribute("style");
        }
    }

    function addClass(el, s) {
        var c = el.className || "";

        if (!hasClass(c, s)) {
            var arr = c.split(/\s+/);
            arr.push(s);
            el.className = arr.join(" ");
        }
    }

    function hasClass(c, s) {
        return c.indexOf(s) > -1 ? !0 : !1;
    }

    function removeClass(el, s) {
        var c = el.className || "";

        if (hasClass(c, s)) {
            var arr = c.split(/\s+/);
            var i = arr.indexOf(s);
            arr.splice(i, 1);
            el.className = arr.join(" ");
        }

        if (el.className === "") {
            el.removeAttribute("class");
        }
    }

    var initArgs = {
        msg: "", //文字内容
        position: 'topCenter', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
        duration: 3000, //默认3秒关闭
        showClose: true //显示关闭按钮
    };
    var positionB=['bottomLeft','bottomCenter','bottomRight'];
    var notify = {
        info: function info() {
            initConfig(arguments, "info");
        },
        success: function success() {
            initConfig(arguments, "success");
        },
        warning: function warning() {
            initConfig(arguments, "warning");
        },
        error: function error() {
            initConfig(arguments, "error");
        },
        loading: function loading() {
            return initConfig(arguments, "loading");
        },
        destroyAll: function destroyAll() {
            _destroyAll();
        },
        config: function config(obj) {
            for (var key in obj) {
                if (Object.hasOwnProperty.call(obj, key)) {
                    if (obj[key] !== undefined) {
                        initArgs[key] = obj[key];
                    }
                }
            }
        }
    };

    function initConfig(obj, type) {
        var args = {};
        for (var key in initArgs) {
            args[key] = initArgs[key];
        }
        var posArr = ["bottomRight", "bottomLeft", "topRight", "topLeft", "topCenter", "bottomCenter", "center"];
        for (var i = 0; i < obj.length; i++) {
            var it = obj[i];

            if (it !== undefined) {
                if (typeof it == "string" || _typeof(it) === "object") {
                    if (posArr.indexOf(it) > -1) {
                        args.position = it;
                    } else {
                        args.msg = it;
                    }

                } else if (typeof it == "boolean") {
                    args.showClose = it;
                } else if (typeof it == "function") {
                    args.onClose = it;
                } else if (typeof it == "number") {
                    args.duration = it;
                }
            }
        }

        args.type = type;
        return createMsgEl(args);
    }

    var msgWrappers = new Array();

    function createMsgEl(args) {
        var _msgWrapper;
        var type = args.type,
            duration = args.duration,
            msg = args.msg,
            position = args.position,
            closable = args.showClose,
            onClose = args.onClose;
        var iconObj = getIconObj();

        if (document.getElementsByClassName(position)[0]) {
            _msgWrapper = document.getElementsByClassName(position)[0];
        } else {
            _msgWrapper = c({
                className: "notify-msg-stage " + position
            });
            msgWrappers.push(_msgWrapper);
        }

        if (type === "loading") {
            msg = msg === "" ? "正在加载，请稍后" : msg;
            closable = false; //loading不显示关闭按钮
        }

        var el;



        if(positionB.indexOf(position)!=-1){

            el = c({
                className: "notify-msg-wrapper"
            }, [c({
                className: "notify-msg notify-bottom notify-msg-fade-in-b " + type
            }, [c({
                className: "notify-msg-icon"
            }, iconObj[type]), c({
                className: "notify-msg-content"
            }, msg), c({
                className: "notify-msg-wait " + (closable ? "notify-msg-pointer" : ""),
                _click: function _click() {
                    if (closable) {
                        closeFlag = true; //点击关闭按钮标志
                        flag = false; //正常关闭标志
                        closeMsg(el, onClose, _msgWrapper);
                    }
                }
            }, getMsgRight(closable))])]);
        }else{
            el = c({
                className: "notify-msg-wrapper"
            }, [c({
                className: "notify-msg notify-msg-fade-in " + type
            }, [c({
                className: "notify-msg-icon"
            }, iconObj[type]), c({
                className: "notify-msg-content"
            }, msg), c({
                className: "notify-msg-wait " + (closable ? "notify-msg-pointer" : ""),
                _click: function _click() {
                    if (closable) {
                        closeFlag = true; //点击关闭按钮标志
                        flag = false; //正常关闭标志
                        closeMsg(el, onClose, _msgWrapper);
                    }
                }
            }, getMsgRight(closable))])]);
        }
        var anm = el.querySelector(".notify-msg__circle");

        if (anm) {
            css(anm, {
                animation: "notify-msg_" + type + " " + duration + "ms linear"
            });

            if ("onanimationend" in window) {
                addAnimationEnd(anm, function () {
                    closeMsg(el, onClose, _msgWrapper);
                });
            } else {
                setTimeout(function () {
                    closeMsg(el, onClose, _msgWrapper);
                }, duration);
            }
        }

        if (type != "loading") {
            setTimeout(function () {
                closeMsg(el, onClose, _msgWrapper);
            }, duration);
        }

        if (!_msgWrapper.children.length) {
            document.body.appendChild(_msgWrapper);
        }

        _msgWrapper.appendChild(el);
        css(el, {
            height: el.offsetHeight + "px"
        });
        setTimeout(function () {
            if(positionB.indexOf(position)!=-1){
                removeClass(el.children[0], "notify-msg-fade-in-b");
            }else{
                removeClass(el.children[0], "notify-msg-fade-in");
            }

        }, 300);

        if (type == "loading") {
            return function () {
                closeMsg(el, onClose, _msgWrapper);
            };
        }

    }

    function getMsgRight(showClose) {
        if (showClose) {
            return "\n    <svg class=\"notify-msg-close\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"5514\"><path d=\"M810 274l-238 238 238 238-60 60-238-238-238 238-60-60 238-238-238-238 60-60 238 238 238-238z\" p-id=\"5515\"></path></svg>\n    ";
        }
    }

    var flag = true; //正常关闭标志
    var closeFlag = false;//点击关闭按钮标志

    function closeMsg(el, cb, _msgWrapper) {
        if (!el) return;

        css(el, {
            padding: 0,
            height: 0
        });
        if($(el.children[0]).hasClass("notify-bottom")){
            addClass(el.children[0], "notify-msg-fade-out-b");
        }else{
            addClass(el.children[0], "notify-msg-fade-out");
        }


        if (closeFlag) { //点击关闭按钮
            closeFlag = false;
            cb && cb(); //回调方法
        } else {
            if (flag) {//正常关闭，全局变量
                cb && cb();
            } else {
                flag = true
                // return;
            }
        }

        setTimeout(function () {

            if (!el) return;
            var has = false;
            if (_msgWrapper) {
                for (var i = 0; i < _msgWrapper.children.length; i++) {
                    if (_msgWrapper.children[i] && _msgWrapper.children[i] === el) {
                        has = true;
                    }
                }
                has && removeChild(el);
                el = null;

                if (!_msgWrapper.children.length) {
                    has && removeChild(_msgWrapper);
                }

            }

        }, 300);
    }

    function getIconObj() {
        return {
            info: "\n    <svg t=\"1609810636603\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"3250\"><path d=\"M469.333333 341.333333h85.333334v469.333334H469.333333z\" fill=\"#ffffff\" p-id=\"3251\"></path><path d=\"M469.333333 213.333333h85.333334v85.333334H469.333333z\" fill=\"#ffffff\" p-id=\"3252\"></path><path d=\"M384 341.333333h170.666667v85.333334H384z\" fill=\"#ffffff\" p-id=\"3253\"></path><path d=\"M384 725.333333h256v85.333334H384z\" fill=\"#ffffff\" p-id=\"3254\"></path></svg>\n    ",
            success: "\n    <svg t=\"1609781242911\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"1807\"><path d=\"M455.42 731.04c-8.85 0-17.75-3.05-24.99-9.27L235.14 553.91c-16.06-13.81-17.89-38.03-4.09-54.09 13.81-16.06 38.03-17.89 54.09-4.09l195.29 167.86c16.06 13.81 17.89 38.03 4.09 54.09-7.58 8.83-18.31 13.36-29.1 13.36z\" p-id=\"1808\" fill=\"#ffffff\"></path><path d=\"M469.89 731.04c-8.51 0-17.07-2.82-24.18-8.6-16.43-13.37-18.92-37.53-5.55-53.96L734.1 307.11c13.37-16.44 37.53-18.92 53.96-5.55 16.43 13.37 18.92 37.53 5.55 53.96L499.67 716.89c-7.58 9.31-18.64 14.15-29.78 14.15z\" p-id=\"1809\" fill=\"#ffffff\"></path></svg>\n    ",
            warning: "\n    <svg t=\"1609776406944\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"18912\"><path d=\"M468.114286 621.714286c7.314286 21.942857 21.942857 36.571429 43.885714 36.571428s36.571429-14.628571 43.885714-36.571428L585.142857 219.428571c0-43.885714-36.571429-73.142857-73.142857-73.142857-43.885714 0-73.142857 36.571429-73.142857 80.457143l29.257143 394.971429zM512 731.428571c-43.885714 0-73.142857 29.257143-73.142857 73.142858s29.257143 73.142857 73.142857 73.142857 73.142857-29.257143 73.142857-73.142857-29.257143-73.142857-73.142857-73.142858z\" p-id=\"18913\" fill=\"#ffffff\"></path></svg>\n    ",
            error: "\n    <svg t=\"1609810716933\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"5514\"><path d=\"M810 274l-238 238 238 238-60 60-238-238-238 238-60-60 238-238-238-238 60-60 238 238 238-238z\" p-id=\"5515\" fill=\"#ffffff\"></path></svg>\n    ",
            loading: "\n    <div class=\"notify-msg_loading\">\n    <svg class=\"notify-msg-circular\" viewBox=\"25 25 50 50\">\n      <circle class=\"notify-msg-path\" cx=\"50\" cy=\"50\" r=\"20\" fill=\"none\" stroke-width=\"4\" stroke-miterlimit=\"10\"/>\n    </svg>\n    </div>\n    "
        };
    }

    function removeChild(el) {
        el && el.parentNode.removeChild(el);
    }

    function _destroyAll() {
        for (var j = 0; j < msgWrappers.length; j++) {
            for (var i = 0; i < msgWrappers[j].children.length; i++) {
                var element = msgWrappers[j].children[i];
                closeMsg(element, '', msgWrappers[j]);
            }
        }
    }

    window.addEventListener('DOMContentLoaded', function () {
        insertCssInHead();
    });

    function insertCssInHead() {
        var doc = document;

        if (doc && doc.head) {
            var head = doc.head;

            var _css = doc.createElement('style');

            var cssStr = "\n\n[class|=notify],[class|=notify]::after,[class|=notify]::before{box-sizing:border-box;outline:0}.notify-msg-progress{width:13px;height:13px}.notify-msg__circle{stroke-width:2;stroke-linecap:square;fill:none;transform:rotate(-90deg);transform-origin:center}.notify-msg-stage:hover .notify-msg__circle{-webkit-animation-play-state:paused!important;animation-play-state:paused!important}.notify-msg__background{stroke-width:2;fill:none}.notify-msg-stage{position:fixed;width:auto;z-index:99891015}.topLeft{top: 20px;left: 20px;}.topCenter{top: 20px;left: 50%;transform:translate(-50%,0)}.topRight{top: 20px;right: 20px;}.bottomLeft{bottom: 20px;left: 20px;}.bottomCenter{bottom: 20px;left: 50%;transform:translate(-50%,0)}.bottomRight{bottom: 20px;right: 20px;}.center{top: 50%;left: 50%;transform:translate(-50%,-50%)}.notify-msg-wrapper{position:relative;left:50%;transform:translate(-50%,0);transform:translate3d(-50%,0,0);transition:height .3s ease,padding .3s ease;padding:6px 0;will-change:transform,opacity}.notify-msg{padding:15px 21px;border-radius:3px;position:relative;left:50%;transform:translate(-50%,0);transform:translate3d(-50%,0,0);display:flex;align-items:center}.notify-msg-content,.notify-msg-icon,.notify-msg-wait{display:inline-block}.notify-msg-icon{position:relative;width:13px;height:13px;border-radius:100%;display:flex;justify-content:center;align-items:center}.notify-msg-icon svg{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:11px;height:11px}.notify-msg-wait{width:20px;height:20px;position:relative;fill:#4eb127}.notify-msg-wait svg{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}.notify-msg-close{width:14px;height:14px;}.notify-msg-content{margin:0 10px;min-width:240px;text-align:left;font-size:14px;font-weight:500;font-family:-apple-system,Microsoft Yahei,sans-serif;text-shadow:0 0 1px rgba(0,0,0,.01)}.notify-msg.info{color:#0fafad;background-color:#e7fdfc;box-shadow:0 0 2px 0 rgba(0,1,1,.01),0 0 0 1px #c0faf9}.notify-msg.info .notify-msg-icon{background-color:#0fafad}.notify-msg.success{color:#67c23a;background-color:#f0f9eb;box-shadow:0 0 2px 0 rgba(0,1,0,.01),0 0 0 1px #e1f3d8}.notify-msg.success .notify-msg-icon{background-color:#4ebb23}.notify-msg.warning{color:#5c3c00;background-color:#fffbe5;box-shadow:0 0 2px 0 rgba(1,1,0,.01),0 0 0 1px #faecd8}.notify-msg.warning .notify-msg-icon{background-color:#f1b306}.notify-msg.error{color:#f56c6c;background-color:#fef0f0;box-shadow:0 0 2px 0 rgba(1,0,0,.01),0 0 0 1px #fde2e2}.notify-msg.error .notify-msg-icon{background-color:#f34b51}.notify-msg.loading{color:#0fafad;background-color:#e7fdfc;box-shadow:0 0 2px 0 rgba(0,1,1,.01),0 0 0 1px #c2faf9}.notify-msg_loading{flex-shrink:0;width:20px;height:20px;position:relative}.notify-msg-circular{-webkit-animation:notify-msg-rotate 2s linear infinite both;animation:notify-msg-rotate 2s linear infinite both;transform-origin:center center;height:18px!important;width:18px!important}.notify-msg-path{stroke-dasharray:1,200;stroke-dashoffset:0;stroke:#0fafad;-webkit-animation:notify-msg-dash 1.5s ease-in-out infinite;animation:notify-msg-dash 1.5s ease-in-out infinite;stroke-linecap:round}@-webkit-keyframes notify-msg-rotate{100%{transform:translate(-50%,-50%) rotate(360deg)}}@keyframes notify-msg-rotate{100%{transform:translate(-50%,-50%) rotate(360deg)}}@-webkit-keyframes notify-msg-dash{0%{stroke-dasharray:1,200;stroke-dashoffset:0}50%{stroke-dasharray:89,200;stroke-dashoffset:-35px}100%{stroke-dasharray:89,200;stroke-dashoffset:-124px}}@keyframes notify-msg-dash{0%{stroke-dasharray:1,200;stroke-dashoffset:0}50%{stroke-dasharray:89,200;stroke-dashoffset:-35px}100%{stroke-dasharray:89,200;stroke-dashoffset:-124px}}.notify-msg.info .notify-msg-wait{fill:#0fafad}.notify-msg.success .notify-msg-wait{fill:#4ebb23}.notify-msg.warning .notify-msg-wait{fill:#f1b306}.notify-msg.error .notify-msg-wait{fill:#f34b51}.notify-msg.loading .notify-msg-wait{fill:#0fafad}.notify-msg-pointer{cursor:pointer}@-webkit-keyframes notify-msg_info{0%{stroke:#0fafad}to{stroke:#0fafad;stroke-dasharray:0 100}}@keyframes notify-msg_info{0%{stroke:#0fafad}to{stroke:#0fafad;stroke-dasharray:0 100}}@-webkit-keyframes notify-msg_success{0%{stroke:#4eb127}to{stroke:#4eb127;stroke-dasharray:0 100}}@keyframes notify-msg_success{0%{stroke:#4eb127}to{stroke:#4eb127;stroke-dasharray:0 100}}@-webkit-keyframes notify-msg_warning{0%{stroke:#fcbc0b}to{stroke:#fcbc0b;stroke-dasharray:0 100}}@keyframes notify-msg_warning{0%{stroke:#fcbc0b}to{stroke:#fcbc0b;stroke-dasharray:0 100}}@-webkit-keyframes notify-msg_error{0%{stroke:#eb262d}to{stroke:#eb262d;stroke-dasharray:0 100}}@keyframes notify-msg_error{0%{stroke:#eb262d}to{stroke:#eb262d;stroke-dasharray:0 100}}.notify-msg-fade-in{-webkit-animation:notify-msg-fade .2s ease-out both;animation:notify-msg-fade .2s ease-out both}.notify-msg-fade-out{animation:notify-msg-fade .3s linear reverse both}@-webkit-keyframes notify-msg-fade{0%{opacity:0;transform:translate(-50%,0);transform:translate3d(-50%,-80%,0)}to{opacity:1;transform:translate(-50%,0);transform:translate3d(-50%,0,0)}}@keyframes notify-msg-fade{0%{opacity:0;transform:translate(-50%,0);transform:translate3d(-50%,-80%,0)}to{opacity:1;transform:translate(-50%,0);transform:translate3d(-50%,0,0)}} .notify-msg-fade-in-b { -webkit-animation: notify-msg-fade-b .2s ease-out both; animation: notify-msg-fade-b .2s ease-out both }.notify-msg-fade-out-b { animation: notify-msg-fade-b .3s linear reverse both }@-webkit-keyframes notify-msg-fade-b {0% { opacity: 0; transform: translate(-50%, 0); transform: translate3d(-50%, 80%, 0) }to { opacity: 1; transform: translate(-50%, 0); transform: translate3d(-50%, 0, 0) }}@keyframes notify-msg-fade-b {0% { opacity: 0; transform: translate(-50%, 0); transform: translate3d(-50%, 80%, 0) }to { opacity: 1; transform: translate(-50%, 0); transform: translate3d(-50%, 0, 0) }}\n        ";
            _css.innerHTML = cssStr;

            if (head.children.length) {
                head.insertBefore(_css, head.children[0]);
            } else {
                head.appendChild(_css);
            }
        }
    }

    return notify;
});