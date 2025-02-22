import * as Blockly from 'blockly/core';

const AI_HUE = 205;

export const AI_ChooseAndGet = {
    init: function () {
        this.setColour(AI_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_CHOOSE_AND_GET)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLY_CHOOSE_AND_GET_ONE_FILE_NAME, "getOneFile"],
                [Blockly.Msg.MIXLY_CHOOSE_AND_GET_MANY_FILE_NAMES, "getManyFiles"],
                [Blockly.Msg.MIXLY_CHOOSE_AND_GET_DIR, "getDirectory"]
            ]), 'TYPE');
        this.setInputsInline(true);
        this.setOutput(true);
    }
}

export const AI_client = {
    init: function () {
        this.setColour(AI_HUE);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_SETUP)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLY_AipImageClassify, "AipImageClassify"],
                [Blockly.Msg.MIXLY_AipSpeech, "AipSpeech"],
                [Blockly.Msg.MIXLY_AipImageCensor, "AipImageCensor"],
                [Blockly.Msg.MIXLY_AipFace, "AipFace"],
                [Blockly.Msg.MIXLY_AipOcr, "AipOcr"],
                [Blockly.Msg.MIXLY_AipNlp, "AipNlp"]
            ]), 'CTYPE')
        this.appendValueInput('SUB')
            .appendField(Blockly.Msg.MIXLY_Client)
            .setAlign(Blockly.inputs.Align.RIGHT);
        this.appendValueInput('API_KEY')
            .appendField('API_KEY')
            .setAlign(Blockly.inputs.Align.RIGHT);
        this.appendValueInput('SECRET_KEY')
            .appendField('SECRET_KEY')
            .setAlign(Blockly.inputs.Align.RIGHT);
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

export const AI_Speech_synthesis = { //  AI_TYPE_FUNC
    init: function () {
        this.setColour(AI_HUE);
        this.appendValueInput('SUB')
            .appendField(Blockly.Msg.MIXLY_AipSpeech_synthesis)
            .appendField(Blockly.Msg.MIXLY_Client)
            .setAlign(Blockly.inputs.Align.RIGHT);
        this.appendValueInput('STR')
            .appendField(Blockly.Msg.OLED_STRING)
            .setAlign(Blockly.inputs.Align.RIGHT);
        this.appendValueInput('ATTR')
            .appendField(Blockly.Msg.MIXLY_AIP_ATTR)
            .setAlign(Blockly.inputs.Align.RIGHT);
        this.setTooltip(Blockly.Msg.MIXLY_AipSpeech_synthesis_TOOLTIP)
        this.setInputsInline(false);
        this.setOutput(true);
    }
};

export const AI_Speech_asr = { //  AI_TYPE_FUNC
    init: function () {
        this.setColour(AI_HUE);
        this.appendValueInput('SUB')
            .appendField(Blockly.Msg.MIXLY_AipSpeech_asr)
            .appendField(Blockly.Msg.MIXLY_Client)
            .setAlign(Blockly.inputs.Align.RIGHT);
        this.appendValueInput('FILE')
            .appendField(Blockly.Msg.MIXLY_AipSpeech_File)
            .setAlign(Blockly.inputs.Align.RIGHT);
        this.appendValueInput('ATTR')
            .appendField(Blockly.Msg.MIXLY_AIP_ATTR)
            .setAlign(Blockly.inputs.Align.RIGHT);
        this.setTooltip(Blockly.Msg.MIXLY_AipSpeech_ASR_TOOLTIP)
        this.setInputsInline(false);
        this.setOutput(true);
    }
};

export const AI_ImageClassify = { //  AI_TYPE_FUNC
    init: function () {
        this.setColour(AI_HUE);
        this.appendValueInput('SUB')
            .appendField(Blockly.Msg.MIXLY_AipImageClassify)
            .appendField(Blockly.Msg.MIXLY_Client)
            .setAlign(Blockly.inputs.Align.RIGHT);
        this.appendValueInput('FUNC')
            .appendField(Blockly.Msg.MIXLY_AIP_FUNC)
            .setAlign(Blockly.inputs.Align.RIGHT);
        this.appendValueInput('ADDR')
            .appendField(Blockly.Msg.MIXLY_AipImageClassify_Image)
            .setAlign(Blockly.inputs.Align.RIGHT);
        this.appendValueInput('ATTR')
            .appendField(Blockly.Msg.MIXLY_AIP_ATTR)
            .setAlign(Blockly.inputs.Align.RIGHT);
        this.setTooltip(Blockly.Msg.MIXLY_AipImageClassify_advancedGeneral_TOOLTIP)
        this.setInputsInline(false);
        this.setOutput(true);
    }
};


export const AI_ImageClassify_Func = {
    init: function () {
        this.setColour(AI_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLY_AipImageClassify_advancedGeneral, "advancedGeneral"],
                [Blockly.Msg.MIXLY_AipImageClassify_dishDetect, "dishDetect"],
                [Blockly.Msg.MIXLY_AipImageClassify_carDetect, "carDetect"],
                [Blockly.Msg.MIXLY_AipImageClassify_animalDetect, "animalDetect"],
                [Blockly.Msg.MIXLY_AipImageClassify_plantDetect, "plantDetect"],
                [Blockly.Msg.MIXLY_AipImageClassify_logoSearch, "logoSearch"]
            ]), 'TYPE')
        this.setOutput(true);
    }
};

export const AI_Face_match = { //  AI_TYPE_FUNC
    init: function () {
        this.setColour(AI_HUE);
        this.appendValueInput('SUB')
            .appendField(Blockly.Msg.MIXLY_AipFace_match)
            .appendField(Blockly.Msg.MIXLY_Client)
            .setAlign(Blockly.inputs.Align.RIGHT);
        this.appendValueInput('VAR')
            .appendField(Blockly.Msg.MIXLY_AipImageClassify_Image + '1' + Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_THE_PATH)
            .setAlign(Blockly.inputs.Align.RIGHT);
        this.appendValueInput('VAR2')
            .appendField(Blockly.Msg.MIXLY_AipImageClassify_Image + '2' + Blockly.Msg.MIXLY_MICROBIT_PY_STORAGE_THE_PATH)
            .setAlign(Blockly.inputs.Align.RIGHT);
        this.appendValueInput('ATTR')
            .appendField(Blockly.Msg.MIXLY_AIP_ATTR)
            .setAlign(Blockly.inputs.Align.RIGHT);
        this.setTooltip(Blockly.Msg.MIXLY_AipFace_match_TOOLTIP)
        this.setInputsInline(false);
        this.setOutput(true);
    }
};

export const AI_Ocr = { //  AI_TYPE_FUNC
    init: function () {
        this.setColour(AI_HUE);
        this.appendValueInput('SUB')
            .appendField(Blockly.Msg.MIXLY_AipOcr)
            .appendField(Blockly.Msg.MIXLY_Client)
            .setAlign(Blockly.inputs.Align.RIGHT);
        this.appendValueInput('FUNC')
            .appendField(Blockly.Msg.MIXLY_AIP_FUNC)
            .setAlign(Blockly.inputs.Align.RIGHT);
        this.appendValueInput('ADDR')
            .appendField(Blockly.Msg.MIXLY_AipImageClassify_Image)
            .setAlign(Blockly.inputs.Align.RIGHT);
        this.appendValueInput('ATTR')
            .appendField(Blockly.Msg.MIXLY_AIP_ATTR)
            .setAlign(Blockly.inputs.Align.RIGHT);
        this.setTooltip(Blockly.Msg.MIXLY_AipOcr_TOOLTIP)
        this.setInputsInline(false);
        this.setOutput(true);
    }
};


export const AI_Ocr_Func = {
    init: function () {
        this.setColour(AI_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLY_AipOcr_basicGeneral, "basicGeneral"],
                [Blockly.Msg.MIXLY_AipOcr_webImage, "webImage"],
                [Blockly.Msg.MIXLY_AipOcr_idcard, "idcard"],
                [Blockly.Msg.MIXLY_AipOcr_bankcard, "bankcard"],
                [Blockly.Msg.MIXLY_AipOcr_drivingLicense, "drivingLicense"],
                [Blockly.Msg.MIXLY_AipOcr_vehicleLicense, "vehicleLicense"],
                [Blockly.Msg.MIXLY_AipOcr_licensePlate, "licensePlate"],
                [Blockly.Msg.MIXLY_AipOcr_businessLicense, "businessLicense"],
                [Blockly.Msg.MIXLY_AipOcr_receipt, "receipt"],
                [Blockly.Msg.MIXLY_AipOcr_trainTicket, "trainTicket"],
                [Blockly.Msg.MIXLY_AipOcr_taxiReceipt, "taxiReceipt"],
                [Blockly.Msg.MIXLY_AipOcr_form, "tableRecognition"],
                [Blockly.Msg.MIXLY_AipOcr_vatInvoice, "vatInvoice"],
                [Blockly.Msg.MIXLY_AipOcr_passport, "passport"],
                [Blockly.Msg.MIXLY_AipOcr_handwriting, "handwriting"]
            ]), 'TYPE')
        this.setOutput(true);
    }
};

export const AI_Nlp = { //  AI_TYPE_FUNC
    init: function () {
        this.setColour(AI_HUE);
        this.appendValueInput('SUB')
            .appendField(Blockly.Msg.MIXLY_AipNlp)
            .appendField(Blockly.Msg.MIXLY_Client)
            .setAlign(Blockly.inputs.Align.RIGHT);
        this.appendValueInput('FUNC')
            .appendField(Blockly.Msg.MIXLY_AIP_FUNC)
            .setAlign(Blockly.inputs.Align.RIGHT);
        this.appendValueInput('STR')
            .appendField(Blockly.Msg.OLED_STRING)
            .setAlign(Blockly.inputs.Align.RIGHT);
        this.appendValueInput('ATTR')
            .appendField(Blockly.Msg.MIXLY_AIP_ATTR)
            .setAlign(Blockly.inputs.Align.RIGHT);
        this.setTooltip(Blockly.Msg.MIXLY_AipNlp_TOOLTIP)
        this.setInputsInline(false);
        this.setOutput(true);
    }
};

export const AI_Nlp_Sim = { //  AI_TYPE_FUNC
    init: function () {
        this.setColour(AI_HUE);
        this.appendValueInput('SUB')
            .appendField(Blockly.Msg.MIXLY_AipNlp_Sim)
            .appendField(Blockly.Msg.MIXLY_Client)
            .setAlign(Blockly.inputs.Align.RIGHT);
        this.appendValueInput('FUNC')
            .appendField(Blockly.Msg.MIXLY_AIP_FUNC)
            .setAlign(Blockly.inputs.Align.RIGHT);
        this.appendValueInput('STR1')
            .appendField(Blockly.Msg.OLED_STRING + '1')
            .setAlign(Blockly.inputs.Align.RIGHT);
        this.appendValueInput('STR2')
            .appendField(Blockly.Msg.OLED_STRING + '2')
            .setAlign(Blockly.inputs.Align.RIGHT);
        this.appendValueInput('ATTR')
            .appendField(Blockly.Msg.MIXLY_AIP_ATTR)
            .setAlign(Blockly.inputs.Align.RIGHT);
        this.setTooltip(Blockly.Msg.MIXLY_AipNlp_Sim_TOOLTIP)
        this.setInputsInline(false);
        this.setOutput(true);
    }
};

export const AI_Nlp_Func = {
    init: function () {
        this.setColour(AI_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLY_AipNlp_lexer, "lexer"],
                [Blockly.Msg.MIXLY_AipNlp_depParser, "depParser"],
                [Blockly.Msg.MIXLY_AipNlp_wordEmbedding, "wordEmbedding"],
                [Blockly.Msg.MIXLY_AipNlp_dnnlm, "dnnlm"],
                [Blockly.Msg.MIXLY_AipNlp_commentTag, "commentTag"],
                [Blockly.Msg.MIXLY_AipNlp_sentimentClassify, "sentimentClassify"],
                [Blockly.Msg.MIXLY_AipNlp_keyword, "keyword"],
                [Blockly.Msg.MIXLY_AipNlp_topic, "topic"],
                [Blockly.Msg.MIXLY_AipNlp_ecnet, "ecnet"],
                [Blockly.Msg.MIXLY_AipNlp_emotion, "emotion"]
            ]), 'TYPE')
        this.setOutput(true);
    }
};

export const AI_Nlp_Func_sim = {
    init: function () {
        this.setColour(AI_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLY_AipNlp_wordSimEmbedding, "wordSimEmbedding"],
                [Blockly.Msg.MIXLY_AipNlp_simnet, "simnet"]
            ]), 'TYPE')
        this.setOutput(true);
    }
};

export const AI_Nlp_Topic = { //  AI_TYPE_FUNC
    init: function () {
        this.setColour(AI_HUE);
        this.appendValueInput('SUB')
            .appendField(Blockly.Msg.MIXLY_AipNlp_topic)
            .appendField(Blockly.Msg.MIXLY_Client)
            .setAlign(Blockly.inputs.Align.RIGHT);
        this.appendValueInput('STR1')
            .appendField(Blockly.Msg.MIXLY_AipNlp_Topic_Title)
            .setAlign(Blockly.inputs.Align.RIGHT);
        this.appendValueInput('STR2')
            .appendField(Blockly.Msg.MIXLY_AipNlp_Topic_Content)
            .setAlign(Blockly.inputs.Align.RIGHT);
        this.setTooltip(Blockly.Msg.MIXLY_AipNlp_Topic_TOOLTIP)
        this.setInputsInline(false);
        this.setOutput(true);
    }
};

export const AI_Nlp_newsSummary = { //  AI_TYPE_FUNC
    init: function () {
        this.setColour(AI_HUE);
        this.appendValueInput('SUB')
            .appendField(Blockly.Msg.MIXLY_AipNlp_summary)
            .appendField(Blockly.Msg.MIXLY_Client)
            .setAlign(Blockly.inputs.Align.RIGHT);
        this.appendValueInput('STR')
            .appendField(Blockly.Msg.MIXLY_AipNlp_Topic_Content)
            .setAlign(Blockly.inputs.Align.RIGHT);
        this.appendValueInput('LEN')
            .appendField(Blockly.Msg.MIXLY_LIST_LEN)
            .setAlign(Blockly.inputs.Align.RIGHT);
        this.appendValueInput('ATTR')
            .appendField(Blockly.Msg.MIXLY_AIP_ATTR)
            .setAlign(Blockly.inputs.Align.RIGHT);
        this.setTooltip(Blockly.Msg.MIXLY_AipNlp_Summary_TOOLTIP)
        this.setInputsInline(false);
        this.setOutput(true);
    }
};


// [Blockly.Msg.MIXLY_AipNlp_topic, "topic"]
// [Blockly.Msg.MIXLY_AipNlp_keyword, "keyword"]

export const AI_audio = {
    init: function () {
        this.setColour(AI_HUE);
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

export const AI_photo = {
    init: function () {
        this.setColour(AI_HUE);
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

export const AI_result = {
    /**
     * Block for negation.
     * @this Blockly.Block
     */
    init: function () {

        this.setColour(AI_HUE);

        this.appendValueInput('AI')
            .appendField(Blockly.Msg.MIXPY_AI_RESULT)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLY_AipImageClassify, "Image"],
                [Blockly.Msg.MIXLY_AipSpeech_asr, "Speech"],
                [Blockly.Msg.MIXLY_AipFace_match, "Face"],
                [Blockly.Msg.MIXLY_AipOcr, "Ocr"],
                [Blockly.Msg.MIXLY_AipNlp_simnet, "OcrSimilarity"],
                [Blockly.Msg.MIXLY_AipNlp_sentimentClassify, "Emotion"],
            ]), 'CTYPE')

        this.setOutput(true);
        this.setTooltip(Blockly.Msg.LOGIC_NEGATE_TOOLTIP);
    }
};
