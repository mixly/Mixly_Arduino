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
                                                     [Blockly.MIXLY_AipFace, "AipFace"],
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

Blockly.Blocks.AI_Speech_asr = { //  AI_TYPE_FUNC
    init: function () {
        this.setColour(Blockly.Blocks.AI.HUE);
        this.appendValueInput('SUB')
            .appendField(Blockly.MIXLY_AipSpeech_asr)
            .appendField(Blockly.MIXLY_Client)
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendValueInput('FILE')
            .appendField(Blockly.MIXLY_AipSpeech_File)
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendValueInput('ATTR')
            .appendField(Blockly.MIXLY_AIP_ATTR)   
            .setAlign(Blockly.ALIGN_RIGHT);
        this.setTooltip(Blockly.MIXLY_AipSpeech_ASR_TOOLTIP)     
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
        this.appendValueInput('ATTR')
            .appendField(Blockly.MIXLY_AIP_ATTR)   
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

Blockly.Blocks.AI_Face_match = { //  AI_TYPE_FUNC
    init: function () {
        this.setColour(Blockly.Blocks.AI.HUE);
        this.appendValueInput('SUB')
            .appendField(Blockly.MIXLY_AipFace_match)
            .appendField(Blockly.MIXLY_Client)
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendValueInput('VAR')
            .appendField(Blockly.MIXLY_AipImageClassify_Image+'1'+Blockly.MIXLY_MICROBIT_PY_STORAGE_THE_PATH)
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendValueInput('VAR2')
            .appendField(Blockly.MIXLY_AipImageClassify_Image+'2'+Blockly.MIXLY_MICROBIT_PY_STORAGE_THE_PATH)
            .setAlign(Blockly.ALIGN_RIGHT);    
        this.appendValueInput('ATTR')
            .appendField(Blockly.MIXLY_AIP_ATTR)   
            .setAlign(Blockly.ALIGN_RIGHT);
        this.setTooltip(Blockly.MIXLY_AipFace_match_TOOLTIP)     
        this.setInputsInline(false);
        this.setOutput(true);
    }
};

Blockly.Blocks.AI_Ocr = { //  AI_TYPE_FUNC
    init: function () {
        this.setColour(Blockly.Blocks.AI.HUE);
        this.appendValueInput('SUB')
            .appendField(Blockly.MIXLY_AipOcr)
            .appendField(Blockly.MIXLY_Client)
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendValueInput('FUNC')
            .appendField(Blockly.MIXLY_AIP_FUNC)
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendValueInput('ADDR')
            .appendField(Blockly.MIXLY_AipImageClassify_Image)
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendValueInput('ATTR')
            .appendField(Blockly.MIXLY_AIP_ATTR)   
            .setAlign(Blockly.ALIGN_RIGHT);
        this.setTooltip(Blockly.MIXLY_AipOcr_TOOLTIP)     
        this.setInputsInline(false);
        this.setOutput(true);
    }
};


Blockly.Blocks.AI_Ocr_Func = {
   init: function() {
    this.setColour(Blockly.Blocks.AI.HUE);
    this.appendDummyInput("")
        .appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_AipOcr_basicGeneral, "basicGeneral"], 
                                                 [Blockly.MIXLY_AipOcr_webImage, "webImage"],
                                                 [Blockly.MIXLY_AipOcr_idcard, "idcard"],
                                                 [Blockly.MIXLY_AipOcr_bankcard, "bankcard"],
                                                 [Blockly.MIXLY_AipOcr_drivingLicense, "drivingLicense"],
                                                 [Blockly.MIXLY_AipOcr_vehicleLicense, "vehicleLicense"],
                                                 [Blockly.MIXLY_AipOcr_licensePlate, "licensePlate"],
                                                 [Blockly.MIXLY_AipOcr_businessLicense, "businessLicense"],
                                                 [Blockly.MIXLY_AipOcr_receipt, "receipt"],
                                                 [Blockly.MIXLY_AipOcr_trainTicket, "trainTicket"],
                                                 [Blockly.MIXLY_AipOcr_taxiReceipt, "taxiReceipt"],
                                                 [Blockly.MIXLY_AipOcr_form, "tableRecognition"],
                                                 [Blockly.MIXLY_AipOcr_vatInvoice, "vatInvoice"],
                                                 [Blockly.MIXLY_AipOcr_passport, "passport"],
                                                 [Blockly.MIXLY_AipOcr_handwriting, "handwriting"]
                                                ]),'TYPE')
    this.setOutput(true);
  }
};

Blockly.Blocks.AI_Nlp = { //  AI_TYPE_FUNC
    init: function () {
        this.setColour(Blockly.Blocks.AI.HUE);
        this.appendValueInput('SUB')
            .appendField(Blockly.MIXLY_AipNlp)
            .appendField(Blockly.MIXLY_Client)
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendValueInput('FUNC')
            .appendField(Blockly.MIXLY_AIP_FUNC)
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendValueInput('STR')
            .appendField(Blockly.OLED_STRING)
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendValueInput('ATTR')
            .appendField(Blockly.MIXLY_AIP_ATTR)   
            .setAlign(Blockly.ALIGN_RIGHT);
        this.setTooltip(Blockly.MIXLY_AipNlp_TOOLTIP)     
        this.setInputsInline(false);
        this.setOutput(true);
    }
};

Blockly.Blocks.AI_Nlp_Sim = { //  AI_TYPE_FUNC
    init: function () {
        this.setColour(Blockly.Blocks.AI.HUE);
        this.appendValueInput('SUB')
            .appendField(Blockly.MIXLY_AipNlp_Sim)
            .appendField(Blockly.MIXLY_Client)
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendValueInput('FUNC')
            .appendField(Blockly.MIXLY_AIP_FUNC)
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendValueInput('STR1')
            .appendField(Blockly.OLED_STRING + '1')
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendValueInput('STR2')
            .appendField(Blockly.OLED_STRING + '2')
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendValueInput('ATTR')
            .appendField(Blockly.MIXLY_AIP_ATTR)   
            .setAlign(Blockly.ALIGN_RIGHT);
        this.setTooltip(Blockly.MIXLY_AipNlp_Sim_TOOLTIP)     
        this.setInputsInline(false);
        this.setOutput(true);
    }
};

Blockly.Blocks.AI_Nlp_Func = {
   init: function() {
    this.setColour(Blockly.Blocks.AI.HUE);
    this.appendDummyInput("")
        .appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_AipNlp_lexer, "lexer"], 
                                                 [Blockly.MIXLY_AipNlp_depParser, "depParser"],
                                                 [Blockly.MIXLY_AipNlp_wordEmbedding, "wordEmbedding"],
                                                 [Blockly.MIXLY_AipNlp_dnnlm, "dnnlm"],
                                                 [Blockly.MIXLY_AipNlp_commentTag, "commentTag"],
                                                 [Blockly.MIXLY_AipNlp_sentimentClassify, "sentimentClassify"],
                                                 [Blockly.MIXLY_AipNlp_keyword, "keyword"],
                                                 [Blockly.MIXLY_AipNlp_topic, "topic"],
                                                 [Blockly.MIXLY_AipNlp_ecnet, "ecnet"],
                                                 [Blockly.MIXLY_AipNlp_emotion, "emotion"]
                                                ]),'TYPE')
    this.setOutput(true);
  }
};

Blockly.Blocks.AI_Nlp_Func_sim = {
   init: function() {
    this.setColour(Blockly.Blocks.AI.HUE);
    this.appendDummyInput("")
        .appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_AipNlp_wordSimEmbedding, "wordSimEmbedding"],
                                                [Blockly.MIXLY_AipNlp_simnet, "simnet"]
                                                ]),'TYPE')
    this.setOutput(true);
  }
};

Blockly.Blocks.AI_Nlp_Topic = { //  AI_TYPE_FUNC
    init: function () {
        this.setColour(Blockly.Blocks.AI.HUE);
        this.appendValueInput('SUB')
            .appendField(Blockly.MIXLY_AipNlp_topic)
            .appendField(Blockly.MIXLY_Client)
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendValueInput('STR1')
            .appendField(Blockly.MIXLY_AipNlp_Topic_Title)
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendValueInput('STR2')
            .appendField(Blockly.MIXLY_AipNlp_Topic_Content)
            .setAlign(Blockly.ALIGN_RIGHT);
        this.setTooltip(Blockly.MIXLY_AipNlp_Topic_TOOLTIP)     
        this.setInputsInline(false);
        this.setOutput(true);
    }
};

Blockly.Blocks.AI_Nlp_newsSummary = { //  AI_TYPE_FUNC
    init: function () {
        this.setColour(Blockly.Blocks.AI.HUE);
        this.appendValueInput('SUB')
            .appendField(Blockly.MIXLY_AipNlp_summary)
            .appendField(Blockly.MIXLY_Client)
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendValueInput('STR')
            .appendField(Blockly.MIXLY_AipNlp_Topic_Content)
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendValueInput('LEN')
            .appendField(Blockly.Msg.MIXLY_LIST_LEN)
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendValueInput('ATTR')
            .appendField(Blockly.MIXLY_AIP_ATTR)   
            .setAlign(Blockly.ALIGN_RIGHT);
        this.setTooltip(Blockly.MIXLY_AipNlp_Summary_TOOLTIP)     
        this.setInputsInline(false);
        this.setOutput(true);
    }
};


// [Blockly.MIXLY_AipNlp_topic, "topic"]
// [Blockly.MIXLY_AipNlp_keyword, "keyword"]

 Blockly.Blocks['AI_audio'] = {
  init: function() {
    this.setColour(Blockly.Blocks.storage.HUE);
    this.appendValueInput("VAR")
        .appendField(Blockly.Msg.MIXPY_AI_AUDIO);
    this.appendValueInput("TIME")
        .appendField(Blockly.Msg.MIXPY_AI_AUDIO_TIME);    
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip(Blockly.Msg.MIXPY_AI_AUDIO_TOOLTIP);
  }
};

 Blockly.Blocks['AI_photo'] = {
  init: function() {
    this.setColour(Blockly.Blocks.storage.HUE);
    this.appendValueInput("VAR")
        .appendField(Blockly.Msg.MIXPY_AI_PHOTO);
    this.appendValueInput("BUT")
        .appendField(Blockly.Msg.MIXPY_AI_PHOTO_BUTTON);    
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip(Blockly.Msg.MIXPY_AI_PHOTO_TOOLTIP);
  }
};

Blockly.Blocks['AI_result'] = {
  /**
   * Block for negation.
   * @this Blockly.Block
   */
  init: function() {
    
    this.setColour(Blockly.Blocks.AI.HUE);
            
    this.appendValueInput('AI')
        .appendField(Blockly.Msg.MIXPY_AI_RESULT)
        .appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_AipImageClassify, "Image"], 
                                                     [Blockly.MIXLY_AipSpeech_asr, "Speech"],
                                                     [Blockly.MIXLY_AipFace_match, "Face"],
                                                     [Blockly.MIXLY_AipOcr, "Ocr"],
                                                     [Blockly.MIXLY_AipNlp_simnet, "OcrSimilarity"],
                                                     [Blockly.MIXLY_AipNlp_sentimentClassify, "Emotion"],
                                                    ]),'CTYPE')
      
    this.setOutput(true);
    this.setTooltip(Blockly.Msg.LOGIC_NEGATE_TOOLTIP);
  }
};
