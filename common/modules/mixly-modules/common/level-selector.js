goog.loadJs('common', () => {

goog.require('layui');
goog.require('Mixly.Msg');
goog.provide('Mixly.LevelSelector');

const {
    Msg,
    LevelSelector
} = Mixly;

const { form } = layui;

LevelSelector.nowLevel = -1;

LevelSelector.XML_STR = [
    `<xml xmlns="https://developers.google.com/blockly/xml">
        <block type="initSettedMap_1">
        </block>
    </xml>`,
    `<xml xmlns="https://developers.google.com/blockly/xml">
        <block type="initSettedMap_2">
        </block>
    </xml>`,
    `<xml xmlns="https://developers.google.com/blockly/xml">
        <block type="initSettedMap_3">
        </block>
    </xml>`,
    `<xml xmlns="https://developers.google.com/blockly/xml">
        <block type="initSettedMap_4">
        </block>
    </xml>`,
    `<xml xmlns="https://developers.google.com/blockly/xml">
        <block type="initSettedMap_5">
        </block>
    </xml>`,
    `<xml xmlns="https://developers.google.com/blockly/xml">
        <block type="initSettedMap_6">
        </block>
    </xml>`,
    `<xml xmlns="https://developers.google.com/blockly/xml">
        <block type="initSettedMap_7">
        </block>
    </xml>`
];

LevelSelector.init = () => {
    $('#nav-right-btn-list').prepend(`
        <div
            id="level-selector"
            class="layui-form mixly-scrollbar"
            lay-filter="level-selector-filter"
            style="
                width: 90px;
                height: 28px;
                margin-right: 10px;
            "
        >
            <select id="level-type" spellcheck="false" lay-filter="level-type-filter"></select>
        </div>
    `);

    const $level = $('#level-type');
    $level.empty();
    for (let i = 1; i < 8; i++) {
        $level.append(`<option value="${i}">${Msg.Lang['关卡']} ${i}</option>`);
    }
    form.render('select', 'level-selector-filter');

    form.on('select(level-type-filter)', function (data) {
        if (LevelSelector.nowLevel !== data.value) {
            LevelSelector.nowLevel = data.value;
            LevelSelector.xmlToWorkspace(data.value);
        }
    });
}

LevelSelector.xmlToWorkspace = (level) => {
    /*if (level < 1 || level > 7) {
        return;
    }
    const xmlStr =  LevelSelector.XML_STR[--level];
    try {
        Editor.blockEditor.clear();
        const xmlDom = Blockly.utils.xml.textToDom(xmlStr);
        Blockly.Xml.domToWorkspace(xmlDom, Editor.blockEditor);
        Editor.blockEditor.scrollCenter();
    } catch (e) {
        Editor.blockEditor.clear();
        console.log(e);
    }*/
}

});