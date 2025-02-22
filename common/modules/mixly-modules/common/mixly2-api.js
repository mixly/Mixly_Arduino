goog.loadJs('common', () => {

goog.require('Blockly');
goog.require('Mixly');
goog.provide('Mixly.API2');
goog.provide('Mixly.Editor');

const { API2, Editor } = Mixly;

const HUES = {
    ACTUATOR_HUE: 100,
    BLYNK0_HUE: 0,
    BLYNK1_HUE: 159,
    COMMUNICATE_HUE: 140,
    LOOPS_HUE: 120,
    DISPLAY_HUE: 180,
    ETHERNET_HUE: 0,
    FACTORY_HUE: '#777777',
    BASE_HUE: 20,
    LISTS_HUE: 260,
    LOGIC_HUE: 210,
    MATH_HUE: 230,
    PINS_HUE: 230,
    PROCEDURES_HUE: 290,
    SCOOP_HUE: 120,
    SENSOR_HUE: 40,
    SERIAL_HUE: 65,
    STORAGE_HUE: 0,
    TEXTS_HUE: 160,
    TOOLS_HUE: '#555555',
    VARIABLES_HUE: 330,
    HANDBIT_HUE: 65
};

API2.init = () => {
    const workspace = Mixly.app.getWorkspace();
    const editorsManager = workspace.getEditorsManager();
    const mixEditor = editorsManager.getActive();
    const blockPage = mixEditor.getPage('block');
    const codePage = mixEditor.getPage('code');
    Blockly.mainWorkspace = blockPage.getEditor();
    Editor.blockEditor = blockPage.getEditor();
    Editor.codeEditor = codePage.getEditor();
    Object.assign(Blockly.Msg, HUES);
    Blockly.ALIGN_LEFT = Blockly.inputs.Align.LEFT;
    Blockly.ALIGN_CENTRE = Blockly.inputs.Align.CENTRE;
    Blockly.ALIGN_RIGHT = Blockly.inputs.Align.RIGHT;
}

});