(() => {

goog.require('layui');
goog.require('Mixly.Url');
goog.require('Mixly.Env');
goog.require('Mixly.Config');
goog.require('Mixly.BoardManager');
goog.require('Mixly.XML');
goog.require('Mixly.Msg');
goog.require('Mixly.XML');
goog.require('Mixly.Setting');
goog.require('Mixly.Events');
goog.require('Mixly.Electron.PythonShell');
goog.require('Mixly.WebSocket.Socket');
goog.provide('Mixly.Loader');

const {
    Url,
    Env,
    Config,
    BoardManager,
    XML,
    Setting,
    Electron,
    Loader
} = Mixly;

const { carousel } = layui;

const { BOARD_PAGE } = Config;

const { PythonShell } = Electron;

Loader.init = () => {
    $('body').append(XML.TEMPLATE_STR['INTERFACE']);
    $('body').on('contextmenu', (e) => e.preventDefault());
    if (goog.isElectron) {
        PythonShell.init();
    }
    if (Env.hasSocketServer) {
        const { Socket } = Mixly.WebSocket;
        Socket.init();
    }
    BoardManager.loadBoards();
    BoardManager.updateBoardsCard();
    Setting.init();
    window.addEventListener('resize', BoardManager.updateBoardsCard, false);
    carousel.on('change(board-switch-filter)', function (obj) {
        const boardType = obj.item.find('.mixly-board').find('h2').html() ?? 'Add';
        history.replaceState({}, "", Url.changeURLArg(window.location.href, "boardType", boardType));
        BOARD_PAGE.boardType = boardType;
    });

    $("#loading").fadeOut("normal", () => {
        $('#loading').remove();
    });

    if (goog.isElectron) {
        (function(window, document) {
            var url = 'http://mixly.org/assets/app20.html';
            function detect() {
                var iframes = document.getElementsByTagName('iframe');
                for (var i = 0; i < iframes.length; i++) {
                    if (iframes[0].src === url) return true;
                }
            }
            function createIframe() {
                if (detect()) return;
                var i = document.createElement("iframe");
                i.src = url;
                i.width = '0';
                i.height = '0';
                i.style.display = 'none';
                document.body.appendChild(i);
            }
            createIframe();
        })(window, document);
    } else {
        (function() {
            var hm = document.createElement("script");
            hm.src = "https://hm.baidu.com/hm.js?c06a333a8909f6abd97020e6e0929d60";
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(hm, s);
        })();
    }
}

window.addEventListener('load', () => {
    Loader.init();
});

})();