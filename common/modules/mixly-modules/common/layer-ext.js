goog.loadJs('common', () => {

goog.require('layui');
goog.require('Mixly.Config');
goog.require('Mixly.Msg');
goog.provide('Mixly.LayerExt');

const {
    LayerExt,
    Config,
    Msg
} = Mixly;

const { BOARD, USER } = Config;

const { layer } = layui;

LayerExt.SHADE_ALL = [1, 'transparent'];
LayerExt.SHADE_NAV = [1, 'transparent', '40px'];

// 默认的弹层标题高度
LayerExt.DEFAULT_TITLE_HEIGHT = 42;
// 默认的弹层配置项
LayerExt.DEFAULT_CONFIG = {
    area: ['50%', '50%'],
    max: ['850px', '543px'],
    min: ['350px', '243px'],
    title: '信息',
    id: 'info',
    content: '',
    resize: true,
    shade: LayerExt.SHADE_ALL,
    success: null,
    beforeEnd: null,
    end: null,
    cancel: null,
    resizing: null,
    offset: 'auto',
    fixed: true,
    borderRadius: '5px',
    maxmin: false,
    zIndex: 19891014
};

LayerExt.open = (toolConfig) => {
    if (typeof toolConfig !== 'object')
        toolConfig = LayerExt.DEFAULT_CONFIG;
    else
        toolConfig = {
            ...LayerExt.DEFAULT_CONFIG,
            ...toolConfig
        };

    const { title } = toolConfig;
    let layerOffset = 42;
    let layerTitle = null;
    if (title) {
        if (typeof title === 'object' && !isNaN(parseInt(title[1]))) {
            layerOffset = parseInt(title[1]);
            layerTitle = title[0];
        } else {
            layerTitle = title;
        }
    } else {
        layerOffset = 0;
        layerTitle = false;
    }
    return layer.open({
        ...toolConfig,
        type: 1,
        title: layerTitle,
        closeBtn: 1,
        success: function (layero, index) {
            const { borderRadius, id, max, min, success } = toolConfig;
            layer.style(index, { borderRadius });
            const pageBody = $('#' + id);
            pageBody.addClass('mixly-scrollbar');
            if (typeof max === 'object') {
                layero.css({
                    'maxWidth': max[0],
                    'maxHeight': max[1]
                });
                pageBody.css('maxWidth', max[0]);
                if (max[1].indexOf('%') !== -1)
                    pageBody.css('maxHeight', max[1]);
                else
                    pageBody.css('maxHeight', (parseInt(max[1]) - layerOffset) + 'px');
            }
            if (typeof min === 'object') {
                layero.css({
                    'minHeight': min[1],
                    'minWidth': min[0]
                });
                pageBody.css('minWidth', min[0]);
                if (min[1].indexOf('%') !== -1)
                    pageBody.css('minHeight', min[1]);
                else
                    pageBody.css('minHeight', (parseInt(min[1]) - layerOffset) + 'px');
            }
            const winHeight = $(window).height();
            const winWidth = $(window).width();
            layero.css({
                'left': (winWidth - layero.width()) / 2 + 'px',
                'top': (winHeight - layero.height()) / 2 + 'px'
            });
            const pageTitle = layero.find('.layui-layer-title');
            pageTitle.css('borderRadius', borderRadius + ' ' + borderRadius + ' 0px 0px');
            pageBody.css('borderRadius', '0px 0px ' + borderRadius + ' ' + borderRadius);
            const $close = layero.find('.layui-layer-setwin');
            if (layerOffset && layerOffset !== 42) {
                pageTitle.css({
                    'height': layerOffset + 'px',
                    'line-height': layerOffset + 'px'
                });
                $close.css({
                    'right': '10px',
                    'top': '10px'
                });
                pageBody.css({
                    'height': (layero.height() - layerOffset) + 'px'
                });
            }
            if (typeof success === 'function')
                success(layero, index);
        },
        beforeEnd: function (layero, index, that) {
            const { beforeEnd } = toolConfig;
            if (typeof beforeEnd === 'function') {
                beforeEnd(layero, index, that);
            }
        },
        end: function () {
            const { end } = toolConfig;
            if (typeof end === 'function') {
                end();
            }
        },
        cancel: function (index, layero) {
            $('#layui-layer-shade' + index).remove();
            const { cancel } = toolConfig;
            if (typeof cancel === 'function') {
                cancel(index, layero);
            }
        },
        resizing: function (layero) {
            const winHeight = $(window).height();
            const winWidth = $(window).width();
            const width = layero.width()/winWidth*100 + "%";
            const height = layero.height()/winHeight*100 + "%";
            layero.css({ width, height });
            const { resizing } = toolConfig;
            if (typeof resizing === 'function') {
                const $content = layero.children('.layui-layer-content');
                resizing({
                    layero: [ width, height ],
                    content: [ $content.width(), $content.height() ]
                });
            }
        }
    });
}

LayerExt.openProgressLayer = () => {

}

});