'use strict';

goog.provide('Blockly.JavaScript.game');

goog.require('Blockly.JavaScript');

Blockly.JavaScript.game_create_sprite = function(){
    var x = Blockly.JavaScript.valueToCode(this, 'x', Blockly.JavaScript.ORDER_ATOMIC);
    var y = Blockly.JavaScript.valueToCode(this, 'y', Blockly.JavaScript.ORDER_ATOMIC);
    var code = 'game.createSprite(' + x + ', ' + y + ')';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.game_move_by = function(){
    var item = Blockly.JavaScript.valueToCode(this, 'var', Blockly.JavaScript.ORDER_ATOMIC);
    var data = Blockly.JavaScript.valueToCode(this, 'data', Blockly.JavaScript.ORDER_ATOMIC);
    Blockly.JavaScript.definitions_['var_declare' + item] =  'let ' + item  + ':game.LedSprite = null;';
    var code = item + '.move(' + data + ');\n';
    return code;
};

Blockly.JavaScript.game_delete_var = function(){
    var item = Blockly.JavaScript.valueToCode(this, 'var', Blockly.JavaScript.ORDER_ATOMIC);
    Blockly.JavaScript.definitions_['var_declare' + item] =  'let ' + item  + ':game.LedSprite = null;';
    var code = item + '.delete();\n';
    Blockly.isDefiniedItem = 1;
    return code;
};

Blockly.JavaScript.game_turn_by_direction = function(){
    var item = Blockly.JavaScript.valueToCode(this, 'var', Blockly.JavaScript.ORDER_ATOMIC);
    var dir = this.getFieldValue('dir');
    var data = Blockly.JavaScript.valueToCode(this, 'data', Blockly.JavaScript.ORDER_ATOMIC);
    Blockly.JavaScript.definitions_['var_declare' + item] =  'let ' + item  + ':game.LedSprite = null;';
    var code = item + '.turn(' + dir + ', ' +  data + ');\n';
    return code;
};
Blockly.JavaScript.game_change_by = function(){
    var item = Blockly.JavaScript.valueToCode(this, 'var', Blockly.JavaScript.ORDER_ATOMIC);
    var change_key = this.getFieldValue('change_key');
    var data = Blockly.JavaScript.valueToCode(this, 'data', Blockly.JavaScript.ORDER_ATOMIC);
    Blockly.JavaScript.definitions_['var_declare' + item] =  'let ' + item  + ':game.LedSprite = null;';
    var code = item + '.change(' + change_key + ', ' +  data + ');\n';
    return code;
};
Blockly.JavaScript.game_set_xy = function(){
    var item = Blockly.JavaScript.valueToCode(this, 'var', Blockly.JavaScript.ORDER_ATOMIC);
    var change_key = this.getFieldValue('change_key');
    var data = Blockly.JavaScript.valueToCode(this, 'data', Blockly.JavaScript.ORDER_ATOMIC);
    Blockly.JavaScript.definitions_['var_declare' + item] =  'let ' + item  + ':game.LedSprite = null;';
    var code = item + '.set(' + change_key + ', ' +  data + ');\n';
    return code;
};
Blockly.JavaScript.game_get_xy = function(){
    var item = Blockly.JavaScript.valueToCode(this, 'var', Blockly.JavaScript.ORDER_ATOMIC);
    var change_key = this.getFieldValue('change_key');
    var code = item + '.get(' + change_key +  ')';
    Blockly.JavaScript.definitions_['var_declare' + item] =  'let ' + item  + ':game.LedSprite = null;';
    return [code, Blockly.JavaScript.ORDER_ATOMIC] ;
};

Blockly.JavaScript.game_touch_another = function(){
    var item = Blockly.JavaScript.valueToCode(this, 'var', Blockly.JavaScript.ORDER_ATOMIC);
    var another = Blockly.JavaScript.valueToCode(this, 'another', Blockly.JavaScript.ORDER_ATOMIC) || 'null';
    var code = item + '.isTouching(' + another +  ')';
    Blockly.JavaScript.definitions_['var_declare' + item] =  'let ' + item  + ':game.LedSprite = null;';
    return [code, Blockly.JavaScript.ORDER_ATOMIC] ;
};

Blockly.JavaScript.game_touch_edge = function(){
    var item = Blockly.JavaScript.valueToCode(this, 'var', Blockly.JavaScript.ORDER_ATOMIC);
    var code = item + '.isTouchingEdge()';
    Blockly.JavaScript.definitions_['var_declare' + item] =  'let ' + item  + ':game.LedSprite = null;';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.game_on_edge_and_bounce = function(){
    var item = Blockly.JavaScript.valueToCode(this, 'var', Blockly.JavaScript.ORDER_ATOMIC);
    var code = item + '.ifOnEdgeBounce();\n';
    Blockly.JavaScript.definitions_['var_declare' + item] =  'let ' + item  + ':game.LedSprite = null;';
    return code;
};

Blockly.JavaScript.game_change_score = function(){
    var data = Blockly.JavaScript.valueToCode(this, 'data', Blockly.JavaScript.ORDER_ATOMIC);
    var code = 'game.addScore('  + data +  ');\n';
    return code;
};

Blockly.JavaScript.game_set_score = function(){
    var data = Blockly.JavaScript.valueToCode(this, 'data', Blockly.JavaScript.ORDER_ATOMIC);
    var code = 'game.setScore('  + data +  ');\n';
    return code;
};

Blockly.JavaScript.game_start_countdown = function(){
    var data = Blockly.JavaScript.valueToCode(this, 'data', Blockly.JavaScript.ORDER_ATOMIC);
    var code = 'game.startCountdown(' + data + ');\n';
    return code;
};

Blockly.JavaScript.game_get_score = function() {
    return ["game.score()", Blockly.JavaScript.ORDER_ATOMIC];
}

Blockly.JavaScript.game_over = function() {
    return "game.gameOver();\n";
}

Blockly.JavaScript.game_resume = function() {
    return "game.resume();\n";
}

Blockly.JavaScript.game_pause= function() {
    return "game.pause();\n";
}
