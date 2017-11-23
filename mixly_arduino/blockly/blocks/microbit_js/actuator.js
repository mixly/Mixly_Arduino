'use strict';

goog.provide('Blockly.Blocks.actuator');

goog.require('Blockly.Blocks');

Blockly.Blocks.actuator.HUE = 100;
Blockly.Blocks.servo_move = {
  init: function() {
    this.setColour(Blockly.Blocks.actuator.HUE);
	this.appendValueInput("PIN", Number)
        .appendField(Blockly.MIXLY_SERVO)
        .appendField(Blockly.MIXLY_PIN)
        .setCheck(Number);
    this.appendValueInput("DEGREE", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.MIXLY_DEGREE_0_180);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setTooltip(Blockly.MIXLY_TOOLTIP_BLOCKGROUP_SERVO_MOVE);
  }
};

Blockly.Blocks.servo_pulse = {
  init: function() {
    this.setColour(Blockly.Blocks.actuator.HUE);
	this.appendValueInput("PIN", Number)
        .appendField(Blockly.MIXLY_SERVO)
        .appendField(Blockly.MIXLY_PIN)
        .setCheck(Number);
    this.appendValueInput("DEGREE", Number)
        .setCheck(Number)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField('writeMicroseconds');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
	this.setInputsInline(true);
  }
};

var TONE_NOTES=[["NOTE_C3", "131"],["NOTE_D3", "147"],["NOTE_E3", "165"],["NOTE_F3", "175"],["NOTE_G3", "196"],["NOTE_A3", "220"],["NOTE_B3", "247"],
           ["NOTE_C4", "262"],["NOTE_D4", "294"],["NOTE_E4", "330"],["NOTE_F4", "349"],["NOTE_G4", "392"],["NOTE_A4", "440"],["NOTE_B4", "494"],
           ["NOTE_C5", "532"],["NOTE_D5", "587"],["NOTE_E5", "659"],["NOTE_F5", "698"],["NOTE_G5", "784"],["NOTE_A5", "880"],["NOTE_B5", "988"]];


Blockly.Blocks.tone_notes = {
   init: function() {
    this.setColour(Blockly.Blocks.actuator.HUE);
    this.appendDummyInput("")
        .appendField(new Blockly.FieldDropdown(TONE_NOTES), 'STAT');
    this.setOutput(true, Number);
  }
};

Blockly.Blocks.tone_beats = {
    init: function() {
        this.setColour(Blockly.Blocks.actuator.HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown([
                ["1", "BeatFraction.Whole"],
                ["1/2", "BeatFraction.Half"],
                ["1/4", "BeatFraction.Quarter"],
                ["1/8", "BeatFraction.Eighth"],
                ["1/16", "BeatFraction.Sixteenth"],
                ["2", "BeatFraction.Double"],
                ["4", "BeatFraction.Breve"]
            ]), 'BEAT')
            .appendField("beat");
        this.setOutput(true, Number);
    }
};

Blockly.Blocks.tone_play={
init:function(){
    this.setColour(Blockly.Blocks.actuator.HUE);
    this.appendValueInput('FREQUENCY')
        .setCheck(Number)
        .appendField(Blockly.MIXLY_MBOT_TONE +  ' ' + Blockly.MIXLY_FREQUENCY);
    this.appendValueInput('BEAT')
        .setCheck(Number)
        .appendField(Blockly.MIXLY_MICROBIT_JS_BEAT);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
	this.setTooltip(Blockly.MIXLY_TOOLTIP_BLOCKGROUP_TONE);
  }
};

Blockly.Blocks.tone_ring={
init:function(){
    this.setColour(Blockly.Blocks.actuator.HUE);
    this.appendValueInput('FREQUENCY')
        .setCheck(Number)
        .appendField(Blockly.MIXLY_MICROBIT_JS_RING_TONE);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks.tone_rest={
init:function(){

    this.setColour(Blockly.Blocks.actuator.HUE);
    this.appendValueInput('BEAT')
        .setCheck(Number)
        .appendField(Blockly.MIXLY_MICROBIT_JS_REST_TONE);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};
Blockly.Blocks.tone_start_melody = {
    init: function () {
        this.setColour(Blockly.Blocks.actuator.HUE);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_MICROBIT_JS_START_MELODY)
            .appendField(new Blockly.FieldDropdown([
                ["dadadum", "Melodies.Dadadadum"],
                ["entertainer", "Melodies.Entertainer"],
                ["prelude", "Melodies.Prelude"],
                ["ode", "Melodies.Ode"],
                ["nyan", "Melodies.Nyan"],
                ["ringtone", "Melodies.Ringtone"],
                ["funk", "Melodies.Funk"],
                ["blues", "Melodies.Blues"],
                ["birthday", "Melodies.Birthday"],
                ["wedding", "Melodies.Wedding"],
                ["funereal", "Melodies.Funereal"],
                ["punchline", "Melodies.Punchline"],
                ["baddy", "Melodies.Baddy"],
                ["chase", "Melodies.Chase"],
                ["ba ding", "Melodies.BaDing"],
                ["wawawawaa", "Melodies.Wawawawaa"],
                ["jump up", "Melodies.JumpUp"],
                ["jump down", "Melodies.JumpDown"],
                ["power up", "Melodies.PowerUp"],
                ["power down", "Melodies.PowerDown"]
            ]), "melody");
        this.appendDummyInput()
            .appendField(Blockly.Msg.CONTROLS_REPEAT_TITLE_REPEAT)
            .appendField(new Blockly.FieldDropdown([
                ["once", "MelodyOptions.Once"],
                ["forever", "MelodyOptions.Forever"],
                ["once in backgroup", "MelodyOptions.OnceInBackground"],
                ["forever in backgroup", "MelodyOptions.ForeverInBackground"]
            ]), "repeat");

        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
}

Blockly.Blocks.tone_event = {
    init: function () {
        this.setColour(Blockly.Blocks.actuator.HUE);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_MICROBIT_JS_MUSIC_EVENT)
            .appendField(new Blockly.FieldDropdown([
                ["melody note played", "MusicEvent.MelodyNotePlayed"],
                ["melody started", "MusicEvent.MelodyStarted"],
                ["melody ended", "MusicEvent.MelodyEnded"],
                ["melody repeated", "MusicEvent.MelodyRepeated"],
                ["background melody note played", "MusicEvent.BackgroundMelodyNotePlayed"],
                ["background melody started", "MusicEvent.BackgroundMelodyStarted"],
                ["background melody ended", "MusicEvent.BackgroundMelodyEnded"],
                ["background melody repeated", "MusicEvent.BackgroundMelodyRepeated"],
                ["background melody paused", "MusicEvent.BackgroundMelodyPaused"],
                ["background melody resumed", "MusicEvent.BackgroundMelodyResumed"]

            ]), "event");
        this.appendStatementInput('do')
            .appendField(Blockly.MIXLY_DO);
    }
}

Blockly.Blocks.tone_get_tempo = {
    init: function () {
        this.setColour(Blockly.Blocks.actuator.HUE);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_MICROBIT_JS_GET_TEMPO);

        this.setInputsInline(true);
        this.setOutput(true, Number);
    }
}
Blockly.Blocks.tone_change_tempo = {
    init: function () {
        this.setColour(Blockly.Blocks.actuator.HUE);
        this.appendValueInput('DEGREE')
            .setCheck(Number)
            .appendField(Blockly.MIXLY_MICROBIT_JS_CHANGE_TEMPO);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
    }
}
Blockly.Blocks.tone_set_tempo = {
    init: function () {
        this.setColour(Blockly.Blocks.actuator.HUE);
        this.appendValueInput('DEGREE')
            .setCheck(Number)
            .appendField(Blockly.MIXLY_MICROBIT_JS_SET_TEMPO);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
    }
}
