'use strict';

goog.provide('Blockly.Blocks.AI');

goog.require('Blockly.Blocks');

Blockly.Blocks.AI.HUE = 205

Blockly.Blocks.AI_ChooseAndGet = {
    init: function () {
        this.setColour(Blockly.Blocks.storage.HUE);
        this.appendDummyInput("")
            .appendField(Blockly.MIXLY_CHOOSE_AND_GET)
            .appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_CHOOSE_AND_GET_ONE_FILE_NAME, "getOneFile"], 
                                                     [Blockly.MIXLY_CHOOSE_AND_GET_MANY_FILE_NAMES, "getManyFiles"],
                                                     [Blockly.MIXLY_CHOOSE_AND_GET_DIR, "getDirectory"]
                                                    ]),'TYPE');       
        this.setInputsInline(true);
        this.setOutput(true);
    }
}

Blockly.Blocks.AI_client = {
    init: function () {
        this.setColour(Blockly.Blocks.AI.HUE);
        this.appendDummyInput("")
            .appendField(Blockly.MIXLY_SETUP)
            .appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_AipImageClassify, "AipImageClassify"], 
                                                     [Blockly.MIXLY_AipSpeech, "AipSpeech"],
                                                     [Blockly.MIXLY_AipImageCensor, "AipImageCensor"],
                                                     [Blockly.MIXLY_AipOcr, "AipOcr"],
                                                     [Blockly.MIXLY_AipNlp, "AipNlp"]
                                                    ]),'CTYPE')
        this.appendValueInput('SUB')
            .appendField(Blockly.MIXLY_Client)
            .setAlign(Blockly.ALIGN_RIGHT);            
        this.appendValueInput('APP_ID')
            .appendField('APP_ID')
            .setAlign(Blockly.ALIGN_RIGHT);            
        this.appendValueInput('API_KEY')
            .appendField('API_KEY')
            .setAlign(Blockly.ALIGN_RIGHT);            
        this.appendValueInput('SECRET_KEY')
            .appendField('SECRET_KEY')
            .setAlign(Blockly.ALIGN_RIGHT);            
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

Blockly.Blocks.AI_Speech_synthesis = { //  AI_TYPE_FUNC
    init: function () {
        this.setColour(Blockly.Blocks.AI.HUE);
        this.appendValueInput('SUB')
            .appendField(Blockly.MIXLY_AipSpeech_synthesis)
            .appendField(Blockly.MIXLY_Client)
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendValueInput('STR')
            .appendField(Blockly.OLED_STRING)
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendValueInput('ATTR')
            .appendField(Blockly.MIXLY_AIP_ATTR)   
            .setAlign(Blockly.ALIGN_RIGHT);
        this.setTooltip(Blockly.MIXLY_AipSpeech_synthesis_TOOLTIP)     
        this.setInputsInline(false);
        this.setOutput(true);
    }
};

Blockly.Blocks.AI_ImageClassify = { //  AI_TYPE_FUNC
    init: function () {
        this.setColour(Blockly.Blocks.AI.HUE);
        this.appendValueInput('SUB')
            .appendField(Blockly.MIXLY_AipImageClassify)
            .appendField(Blockly.MIXLY_Client)
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendValueInput('FUNC')
            .appendField(Blockly.MIXLY_AIP_FUNC)
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendValueInput('ADDR')
            .appendField(Blockly.MIXLY_AipImageClassify_Image)
            .setAlign(Blockly.ALIGN_RIGHT);
        this.setTooltip(Blockly.MIXLY_AipImageClassify_advancedGeneral_TOOLTIP)     
        this.setInputsInline(false);
        this.setOutput(true);
    }
};


Blockly.Blocks.AI_ImageClassify_Func = {
   init: function() {
    this.setColour(Blockly.Blocks.AI.HUE);
    this.appendDummyInput("")
        .appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_AipImageClassify_advancedGeneral, "advancedGeneral"], 
                                                 [Blockly.MIXLY_AipImageClassify_dishDetect, "dishDetect"],
                                                 [Blockly.MIXLY_AipImageClassify_carDetect, "carDetect"],
                                                 [Blockly.MIXLY_AipImageClassify_animalDetect, "animalDetect"],
                                                 [Blockly.MIXLY_AipImageClassify_plantDetect, "plantDetect"],
                                                 [Blockly.MIXLY_AipImageClassify_logoSearch, "logoSearch"]
                                                ]),'TYPE')
    this.setOutput(true);
  }
};