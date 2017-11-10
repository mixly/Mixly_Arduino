'use strict';

goog.provide('Blockly.Blocks.game');

goog.require('Blockly.Blocks');

//Blockly.Blocks.game.HUE = Blockly.Blocks.game.HUE;
Blockly.Blocks.game.HUE = 0;
Blockly.Blocks['game_create_sprite'] = {
    init:function(){
        this.setColour(Blockly.Blocks.game.HUE);
        this.appendValueInput('x')
            .setCheck(Number)
            .appendField(Blockly.MIXLY_MICROBIT_JS_CREATE_SPRITE);

        this.appendValueInput('y')
            .setCheck(Number)
            .appendField(Blockly.MIXLY_MICROBIT_JS_Y);
        this.setOutput(true, 'LedSprite');
        this.setInputsInline(true);
    }
}

Blockly.Blocks['game_move_by'] = {
    init: function () {
        this.setColour(Blockly.Blocks.game.HUE);
        this.appendValueInput('var')
            .setCheck("LedSprite");
        this.appendValueInput("data")
            .appendField(Blockly.MIXLY_MICROBIT_JS_MOVE_BY);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
    },
    getVars: function() {
        return [this.getFieldValue('var')];
    },
    renameVar: function(oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('var'))) {
            this.setTitleValue(newName, 'var');
        }
    }
}

Blockly.Blocks['game_delete_var'] = {
    init: function(){
        this.setColour(Blockly.Blocks.game.HUE);
        this.appendValueInput('var')
            .appendField(Blockly.MIXLY_MICROBIT_JS_DELETE_VAR)
            .setCheck("LedSprite");

        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
    },
    getVars: function() {
        return [this.getFieldValue('var')];
    },
    renameVar: function(oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('var'))) {
            this.setTitleValue(newName, 'var');
        }
    }
};
Blockly.Blocks['game_turn_by_direction'] = {
    init: function () {
        this.setColour(Blockly.Blocks.game.HUE);
        this.appendValueInput('var')
            .setCheck("LedSprite");
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_MICROBIT_JS_TURN)
            .appendField(new Blockly.FieldDropdown([[Blockly.MIXLY_RIGHT, "Direction.Right"], [Blockly.MIXLY_LEFT, "Direction.Left"]]), 'dir');
        this.appendValueInput("data")
            .appendField(Blockly.MIXLY_MICROBIT_JS_BY_ANGLE);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
    },
    getVars: function() {
        return [this.getFieldValue('var')];
    },
    renameVar: function(oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('var'))) {
            this.setTitleValue(newName, 'var');
        }
    }
}
Blockly.Blocks['game_change_by'] = {
    init: function () {
        this.setColour(Blockly.Blocks.game.HUE);
        this.appendValueInput('var')
            .setCheck("LedSprite");
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_MICROBIT_JS_CHANGE)
            .appendField(new Blockly.FieldDropdown([
                ['x', "LedSpriteProperty.X"],
                ['y', "LedSpriteProperty.Y"],
                ['direction', 'LedSpriteProperty.Direction'],
                ['brightness', 'LedSpriteProperty.Brightness'],
                ['blink', 'LedSpriteProperty.Blink']
            ]), 'change_key');
        this.appendValueInput("data")
            .appendField(Blockly.MIXLY_MICROBIT_JS_NUMBER);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
    },
    getVars: function() {
        return [this.getFieldValue('var')];
    },
    renameVar: function(oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('var'))) {
            this.setTitleValue(newName, 'var');
        }
    }
}
Blockly.Blocks['game_set_xy'] = {
    init: function () {
        this.setColour(Blockly.Blocks.game.HUE);
        this.appendValueInput('var')
            .setCheck("LedSprite");
        this.appendDummyInput()
            .appendField(Blockly.Msg.LISTS_SET_INDEX_SET)
            .appendField(new Blockly.FieldDropdown([
                ['x', "LedSpriteProperty.X"],
                ['y', "LedSpriteProperty.Y"],
                ['direction', 'LedSpriteProperty.Direction'],
                ['brightness', 'LedSpriteProperty.Brightness'],
                ['blink', 'LedSpriteProperty.Blink']
            ]), 'change_key');
        this.appendValueInput("data")
            .appendField(Blockly.Msg.VARIABLES_SET_TAIL);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
    },
    getVars: function() {
        return [this.getFieldValue('var')];
    },
    renameVar: function(oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('var'))) {
            this.setTitleValue(newName, 'var');
        }
    }
}
Blockly.Blocks['game_get_xy'] = {
    init: function () {
        this.setColour(Blockly.Blocks.game.HUE);
        this.appendValueInput('var')
            .setCheck("LedSprite");
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                ['x', "LedSpriteProperty.X"],
                ['y', "LedSpriteProperty.Y"],
                ['direction', 'LedSpriteProperty.Direction'],
                ['brightness', 'LedSpriteProperty.Brightness'],
                ['blink', 'LedSpriteProperty.Blink']
            ]), 'change_key');
        this.setOutput(true, Number);
        this.setInputsInline(true);
    },
    getVars: function() {
        return [this.getFieldValue('var')];
    },
    renameVar: function(oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('var'))) {
            this.setTitleValue(newName, 'var');
        }
    }
}

Blockly.Blocks['game_touch_another'] = {
    init: function () {
        this.setColour(Blockly.Blocks.game.HUE);
        this.appendValueInput('var')
            .setCheck("LedSprite");
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_MICROBIT_JS_TOUCH)
        this.appendValueInput('another')
            .setCheck(['LedSprite'])
        this.appendDummyInput()
            .appendField("?")
        this.setOutput(true, Boolean);
        this.setInputsInline(true);
    },
    getVars: function() {
        return [this.getFieldValue('var')];
    },
    renameVar: function(oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('var'))) {
            this.setTitleValue(newName, 'var');
        }
    }
}

Blockly.Blocks['game_touch_edge'] = {
    init: function () {
        this.setColour(Blockly.Blocks.game.HUE);
        this.appendValueInput('var')
            .setCheck("LedSprite");
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_MICROBIT_JS_TOUCH_EDGE)
        this.setOutput(true, Boolean);
        this.setInputsInline(true);
    },
    getVars: function() {
        return [this.getFieldValue('var')];
    },
    renameVar: function(oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('var'))) {
            this.setTitleValue(newName, 'var');
        }
    }
}
Blockly.Blocks['game_on_edge_and_bounce'] = {
    init: function () {
        this.setColour(Blockly.Blocks.game.HUE);
        this.appendValueInput('var')
            .setCheck("LedSprite");
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_MICROBIT_JS_ON_EDGE_BOUNCE)

        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
    },
    getVars: function() {
        return [this.getFieldValue('var')];
    },
    renameVar: function(oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('var'))) {
            this.setTitleValue(newName, 'var');
        }
    }
}

Blockly.Blocks['game_change_score'] = {
    init: function () {
        this.setColour(Blockly.Blocks.game.HUE);
        this.appendValueInput("data")
            .appendField(Blockly.MIXLY_MICROBIT_JS_CHANGE_SCORE);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
    }
}
Blockly.Blocks['game_set_score'] = {
    init: function () {
        this.setColour(Blockly.Blocks.game.HUE);
        this.appendValueInput("data")
            .appendField(Blockly.MIXLY_MICROBIT_JS_SET_SCORE);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
    }
}
Blockly.Blocks['game_start_countdown'] = {
    init: function () {
        this.setColour(Blockly.Blocks.game.HUE);
        this.appendValueInput("data")
            .appendField(Blockly.MIXLY_MICROBIT_JS_START_COUNTDOWN);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
    }
}
Blockly.Blocks['game_get_score'] = {
    init: function () {
        this.setColour(Blockly.Blocks.game.HUE);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_MICROBIT_JS_SCORE)
        this.setOutput(true, Number);
        this.setInputsInline(true);
    }
}
Blockly.Blocks['game_over'] = {
    init: function () {
        this.setColour(Blockly.Blocks.game.HUE);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_MICROBIT_JS_GAME_OVER);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
    }
}
Blockly.Blocks['game_resume'] = {
    init: function () {
        this.setColour(Blockly.Blocks.game.HUE);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_MICROBIT_JS_GAME_RESUME);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
    }
}

Blockly.Blocks['game_pause'] = {
    init: function () {
        this.setColour(Blockly.Blocks.game.HUE);
        this.appendDummyInput()
            .appendField(Blockly.MIXLY_MICROBIT_JS_GAME_PAUSE);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
    }
}
