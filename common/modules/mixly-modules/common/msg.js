goog.loadJs('common', () => {

goog.require('path');
goog.require('Mixly.MJSON');
goog.require('Mixly.Config');
goog.require('Mixly.Env');
goog.require('Blockly');
goog.require('Blockly.Lang.ZhHans');
goog.require('Blockly.Lang.ZhHant');
goog.require('Blockly.Lang.En');
goog.provide('Mixly.Msg');

const {
    Msg,
    MJSON,
    Config,
    Env
} = Mixly;

const { USER } = Config;

const {
    ZhHans,
    ZhHant,
    En
} = Blockly.Lang;

Msg.PATH = {
    "zh-hans": path.join(Env.msgPath, "mixly/zh-hans.json"),
    "zh-hant": path.join(Env.msgPath, "./mixly/zh-hant.json"),
    "en": path.join(Env.msgPath, "mixly/en.json")
}

Msg.LANG = {
    "zh-hans": MJSON.get(Msg.PATH["zh-hans"]),
    "zh-hant": MJSON.get(Msg.PATH["zh-hant"]),
    "en": MJSON.get(Msg.PATH["en"])
}

Msg.nowLang = USER.language ?? 'zh-hans';

Msg.prevBlocklyMsg = Blockly.Msg;

Msg.prevBlocklyMsgKey = [
    'DELETE_X_BLOCKS', 'REMOVE_COMMENT', 'DUPLICATE_COMMENT', 'WORKSPACE_COMMENT_DEFAULT_TEXT',
    'ADD_COMMENT', 'UNDO', 'REDO', 'CLEAN_UP', 'COLLAPSE_ALL', 'EXPAND_ALL', 'DELETE_BLOCK',
    'DELETE_ALL_BLOCKS', 'DUPLICATE_BLOCK', 'EXTERNAL_INPUTS', 'INLINE_INPUTS',
    'EXPAND_BLOCK', 'COLLAPSE_BLOCK', 'DISABLE_BLOCK', 'ENABLE_BLOCK', 'HELP', 'CHANGE_VALUE_TITLE',
    'RENAME_VARIABLE', 'DELETE_VARIABLE', 'WORKSPACE_ARIA_LABEL', 'UNNAMED_KEY',
    'PROCEDURES_DEFNORETURN_PROCEDURE', 'PROCEDURES_DEFRETURN_PROCEDURE', 'NEW_VARIABLE_TITLE',
    'VARIABLE_ALREADY_EXISTS', 'VARIABLE_ALREADY_EXISTS_FOR_ANOTHER_TYPE', 'RENAME_VARIABLE_TITLE',
    'VARIABLE_ALREADY_EXISTS_FOR_A_PARAMETER', 'NEW_VARIABLE', 'NEW_STRING_VARIABLE', 'NEW_NUMBER_VARIABLE', 
    'NEW_COLOUR_VARIABLE', 'CANNOT_DELETE_VARIABLE_PROCEDURE', 'DELETE_VARIABLE_CONFIRMATION'
];

Msg.getLang = (str) => {
    return Msg.LANG[Msg.nowLang][str] ?? '';
}

Msg.changeTo = (lang) => {
    Msg.Lang = Msg.LANG[lang ?? 'zh-hans'];
    let newMsg;
    switch (lang) {
    case 'zh-hant':
        newMsg = ZhHant;
        break;
    case 'en':
        newMsg = En;
        break;
    default:
        newMsg = ZhHans;
    }
    Blockly.Msg = newMsg;
    for (let key of Msg.prevBlocklyMsgKey) {
        Msg.prevBlocklyMsg[key] = Blockly.Msg[key];
    }
}

Msg.renderToolbox = (addToolboxitemid = false) => {
    let $categories = $('#toolbox').find('category');
    for (let i = 0; i < $categories.length; i++) {
        let { id } = $categories[i];
        if (!Blockly.Msg.MSG[id]) {
            continue;
        }
        let $category = $($categories[i]);
        $category.attr('name', Blockly.Msg.MSG[id]);
        if (addToolboxitemid) {
            if ($category.attr('toolboxitemid')) {
                continue;
            }
            $category.attr({
                'toolboxitemid': id,
                'name': Blockly.Msg.MSG[id]
            });
        } else {
            $(`span[id="${id}.label"]`).html(Blockly.Msg.MSG[id]);
        }
    }
}

Msg.changeTo(Msg.nowLang);

});