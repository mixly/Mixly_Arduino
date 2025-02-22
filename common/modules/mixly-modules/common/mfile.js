goog.loadJs('common', () => {

goog.require('layui');
goog.require('Blockly');
goog.require('Base64');
goog.require('Mixly.Config');
goog.require('Mixly.MArray');
goog.require('Mixly.Boards');
goog.require('Mixly.XML');
goog.require('Mixly.LayerExt');
goog.require('Mixly.Msg');
goog.provide('Mixly.MFile');

const { form, util } = layui;

const {
    Config,
    MArray,
    Boards,
    XML,
    LayerExt,
    Msg,
    MFile
} = Mixly;

const { BOARD, SOFTWARE } = Config;

MFile.SAVE_FILTER_TYPE = {
    mix: { name: Msg.Lang['file.type.mix'], extensions: ['mix'] },
    py: { name: Msg.Lang['file.type.python'], extensions: ['py'] },
    ino: { name: Msg.Lang['file.type.arduino'], extensions: ['ino'] },
    hex: { name: Msg.Lang['file.type.hex'], extensions: ['hex'] },
    bin: { name: Msg.Lang['file.type.bin'], extensions: ['bin'] },
    mil: { name: Msg.Lang['file.type.mil'], extensions: ['mil'] }
};

MFile.saveFilters = [ MFile.SAVE_FILTER_TYPE.mix ];

MFile.OPEN_FILTER_TYPE = ['mix','xml', 'py', 'ino', 'hex', 'bin'];

MFile.openFilters = ['mix'];

/**
 * @function 更新保存文件时可用的后缀
 * @param config { array }
 * config = ["py", "ino", "hex", "bin", "png"]
 * 注：mix后缀为默认添加，列表后缀名顺序即为保存时自上而下显示的顺序
 * @param priority { string }，配置需要优先显示的后缀名，没有此项可不填
 * @return void
 **/
MFile.updateSaveFilters = (config, priority = null) => {
    if (typeof config !== 'object')
        config = [];
    MFile.saveFilters = [ MFile.SAVE_FILTER_TYPE.mix ];
    let saveFilterType = ['mix'];
    for (let i of config)
        if (MFile.SAVE_FILTER_TYPE[i] && !saveFilterType.includes(i)) {
            saveFilterType.push(i);
            if (i === priority) {
                MFile.saveFilters.unshift(MFile.SAVE_FILTER_TYPE[i]);
            } else {
                MFile.saveFilters.push(MFile.SAVE_FILTER_TYPE[i]);
            }
        }
}

/**
 * @function 更新打开文件时的可用后缀
 * @param config { array }
 * config = ["py", "ino", "hex", "bin"]
 * @return void
 **/
MFile.updateOpenFilters = (config, priority) => {
    if (typeof config !== 'object')
        config = [];
    MFile.openFilters = ['mix', 'xml'];
    for (let i of config)
        if (MFile.OPEN_FILTER_TYPE.includes(i) && !MFile.openFilters.includes(i))
            MFile.openFilters.push(i);
}

MFile.init = () => {
    const saveConfig = BOARD?.nav?.save ?? {};
    let saveFilters = [], openFilters = [];
    for (let i in saveConfig)
        if (saveConfig[i]) {
            saveFilters.push(i);
            openFilters.push(i);
        }
    if (BOARD?.nav?.setting?.thirdPartyLibrary)
        saveFilters.push('mil');
    MFile.updateOpenFilters(openFilters);
    MFile.updateSaveFilters(saveFilters);
}

MFile.init();

MFile.getCode = (type) => {
    const { mainEditor } = Editor;
    const { codeEditor, blockEditor } = mainEditor;
    const { editor, generator } = blockEditor;
    if (mainEditor.selected === 'CODE')
        return codeEditor.getValue();
    else {
        return generator.workspaceToCode(editor) || '';
    }
}

MFile.getMix = () => {
    const mixDom = $(Blockly.Xml.workspaceToDom(Editor.blockEditor)),
    version = SOFTWARE?.version ?? 'Mixly 2.0',
    boardName = Boards.getSelectedBoardName(),
    board = BOARD?.boardType ?? 'default',
    config = Boards.getSelectedBoardConfig();
    mixDom.removeAttr('xmlns')
          .attr('version', version)
          .attr('board', board + '@' + boardName);
    let xmlStr = mixDom[0].outerHTML;
    let code = MFile.getCode();
    if (config) {
        try {
            xmlStr += `<config>${JSON.stringify(config)}</config>`;
        } catch (error) {
            console.log(error);
        }
    }
    if (BOARD.saveMixWithCode) {
        code = Base64.encode(code);
        xmlStr += `<code>${code}</code>`;
    }
    return xmlStr;
}

MFile.getMil = () => {
    const mixDom = $(MFile.getMix());
    let xmlDom, configDom, codeDom;
    for (let i = 0; mixDom[i]; i++) {
        switch (mixDom[i].nodeName) {
        case 'XML':
            xmlDom = $(mixDom[i]);
            break;
        case 'CONFIG':
            configDom = $(mixDom[i]);
            break;
        case 'CODE':
            codeDom = $(mixDom[i]);
            break;
        }
    }
    if (!xmlDom) return '';
    configDom && configDom.remove();
    codeDom && codeDom.remove();
    xmlDom.attr('type', 'lib');
    xmlDom.find('block,shadow').removeAttr('id varid x y');
    const blocksDom = xmlDom.children('block');
    let blockXmlList = [];
    for (let i = 0; blocksDom[i]; i++) {
        const outerHTML = blocksDom[i].outerHTML;
        if (!blockXmlList.includes(outerHTML))
            blockXmlList.push(outerHTML);
        else
            blocksDom[i].remove();
    }
    return xmlDom[0].outerHTML;
}

MFile.parseMix = (xml, useCode = false, useIncompleteBlocks = false, endFunc = (message) => {}) => {
    const mixDom = xml;
    let xmlDom, configDom, codeDom;
    for (let i = 0; mixDom[i]; i++) {
        switch (mixDom[i].nodeName) {
        case 'XML':
            xmlDom = $(mixDom[i]);
            break;
        case 'CONFIG':
            configDom = $(mixDom[i]);
            break;
        case 'CODE':
            codeDom = $(mixDom[i]);
            break;
        }
    }
    if (!xmlDom && !codeDom) {
        layer.msg(Msg.Lang['editor.invalidData'], { time: 1000 });
        return;
    }
    for (let i of ['version', 'id', 'type', 'varid', 'name', 'x', 'y', 'items']) {
        const nowDom = xmlDom.find('*[' + i + ']');
        if (nowDom.length) {
            for (let j = 0; nowDom[j]; j++) {
                let attr = $(nowDom[j]).attr(i);
                try {
                    attr = attr.replaceAll('\\\"', '');
                } catch (error) {
                    console.log(error);
                }
                $(nowDom[j]).attr(i, attr);
            }
        }
    }
    let config, configStr = configDom && configDom.html();
    try {
        if (configStr)
            config = JSON.parse(configStr);
    } catch (error) {
        console.log(error);
    }
    let boardName = xmlDom.attr('board') ?? '';
    Boards.setSelectedBoard(boardName, config);
    let code = codeDom ? codeDom.html() : '';
    if (Base64.isValid(code)) {
        code = Base64.decode(code);
    } else {
        try {
            code = util.unescape(code);
            code = code.replace(/(_E[0-9A-F]{1}_[0-9A-F]{2}_[0-9A-F]{2})+/g, function (s) {
                try {
                    return decodeURIComponent(s.replace(/_/g, '%'));
                } catch (error) {
                    return s;
                }
            });
        } catch (error) {
            console.log(error);
        }
    }
    if (useCode) {
        if (!codeDom) {
            layer.msg(Msg.Lang['editor.invalidData'], { time: 1000 });
            return;
        }
        Editor.mainEditor.drag.full('NEGATIVE'); // 完全显示代码编辑器
        Editor.codeEditor.setValue(code, -1);
        Editor.blockEditor.clear();
        endFunc('USE_CODE');
        return;
    }
    const blockDom = mixDom.find('block');
    const shadowDom = mixDom.find('shadow');
    blockDom.removeAttr('id varid');
    shadowDom.removeAttr('id varid');
    let blocks = [];
    let undefinedBlocks = [];
    for (let i = 0; blockDom[i]; i++) {
        const blockType = $(blockDom[i]).attr('type');
        if (blockType && !blocks.includes(blockType))
            blocks.push(blockType);
    }
    for (let i = 0; shadowDom[i]; i++) {
        const shadowType = $(shadowDom[i]).attr('type');
        if (shadowType && !blocks.includes(shadowType))
            blocks.push(shadowType);
    }
    const blocklyGenerator = Editor.mainEditor.blockEditor.generator;
    for (let i of blocks) {
        if (Blockly.Blocks[i] && blocklyGenerator.forBlock[i]) {
            continue;
        }
        undefinedBlocks.push(i);
    }
    if (undefinedBlocks.length) {
        MFile.showParseMixErrorDialog(mixDom, undefinedBlocks, endFunc);
        return;
    }
    Editor.blockEditor.clear();
    Blockly.Xml.domToWorkspace(xmlDom[0], Editor.blockEditor);
    Editor.blockEditor.scrollCenter();
    Blockly.hideChaff();
    if (!useIncompleteBlocks && codeDom) {
        const workspaceCode = MFile.getCode();
        if (workspaceCode !== code) {
            Editor.mainEditor.drag.full('NEGATIVE'); // 完全显示代码编辑器
            Editor.codeEditor.setValue(code, -1);
        }
        endFunc();
        return;
    }
    Editor.mainEditor.drag.full('POSITIVE'); // 完全显示块编辑器
    if (useIncompleteBlocks)
        endFunc('USE_INCOMPLETE_BLOCKS');
    else
        endFunc();
}

MFile.removeUndefinedBlocks = (xml, undefinedBlocks) => {
    for (let i of undefinedBlocks) {
        xml.find('*[type='+i+']').remove();
    }
}

MFile.showParseMixErrorDialog = (xml, undefinedBlocks, endFunc = () => {}) => {
    const { PARSE_MIX_ERROR_DIV } = XML.TEMPLATE_STR;
    const renderStr = XML.render(PARSE_MIX_ERROR_DIV, {
        text: undefinedBlocks.join('<br/>'),
        btn1Name: Msg.Lang['editor.cancel'],
        btn2Name: Msg.Lang['editor.ignoreBlocks'],
        btn3Name: Msg.Lang['editor.loadCode']
    })
    LayerExt.open({
        title: Msg.Lang['editor.parseMixErrorInfo'],
        id: 'parse-mix-error-layer',
        area: ['50%', '250px'],
        max: ['500px', '250px'],
        min: ['350px', '100px'],
        shade: LayerExt.SHADE_ALL,
        content: renderStr,
        borderRadius: '5px',
        success: (layero, index) => {
            $('#parse-mix-error-layer').css('overflow', 'hidden');
            form.render(null, 'parse-mix-error-filter');
            layero.find('button').click((event) => {
                layer.close(index);
                const mId = $(event.currentTarget).attr('m-id');
                switch (mId) {
                case '0':
                    break;
                case '1':
                    for (let i of undefinedBlocks) {
                        xml.find('*[type='+i+']').remove();
                    }
                    MFile.parseMix(xml, false, true, endFunc);
                    break;
                case '2':
                    MFile.parseMix(xml, true, false, endFunc);
                    break;
                }
            });
        }
    });
}

MFile.openFile = (filters, readType = 'text', sucFunc = () => {}) => {
    const loadFileDom = $('<input></input>');
    loadFileDom.attr({
        id: 'web-open-file',
        type: 'file',
        name: 'web-open-file',
        accept: filters
    });
    loadFileDom.change(function(event) {
        MFile.onclickOpenFile(this, readType, (data) => {
            sucFunc(data);
        });
    });
    loadFileDom.css('display', 'none');
    $('#web-open-file').remove();
    $('body').append(loadFileDom);
    loadFileDom.click();
}

MFile.onclickOpenFile = (input, readType, endFunc) => {
    const files = input.files;
    //限制上传文件的 大小,此处为10M
    if (files[0].size > 5 * 1024 * 1024) {
        layer.msg('所选择文件大小必须在5MB内', { time: 1000 });
        $('#web-open-file').remove();
        endFunc(null);
        return false;
    }
    const resultFile = input.files[0];
    // 如果文件存在
    if (resultFile) {
        const filename = resultFile.name;
        const reader = new FileReader();
        switch (readType) {
        case 'text':
            reader.readAsText(resultFile);
            break;
        case 'bin':
            reader.readAsBinaryString(resultFile);
            break;
        case 'url':
            reader.readAsDataURL(resultFile);
            break;
        default:
            reader.readAsArrayBuffer(resultFile);
        }
        reader.onload = function (e) {
            const data = e.target.result;
            $('#web-open-file').remove();
            endFunc({ data, filename });
        };
    } else {
        endFunc(null);
    }
}

});