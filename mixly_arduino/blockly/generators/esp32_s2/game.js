'use strict';

goog.provide('Blockly.Python.game');

goog.require('Blockly.Python');

Blockly.Python.game_create_sprite = function(){
    var x = Blockly.Python.valueToCode(this, 'x', Blockly.Python.ORDER_ATOMIC);
    var y = Blockly.Python.valueToCode(this, 'y', Blockly.Python.ORDER_ATOMIC);
    var code = 'game.createSprite(' + x + ', ' + y + ')';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.game_move_by = function(){
    var item = Blockly.Python.valueToCode(this, 'var', Blockly.Python.ORDER_ATOMIC);
    var data = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ATOMIC);
    Blockly.Python.definitions_['var_declare' + item] =  'let ' + item  + ':game.LedSprite = null;';
    var code = item + '.move(' + data + ');\n';
    return code;
};

Blockly.Python.game_delete_var = function(){
    var item = Blockly.Python.valueToCode(this, 'var', Blockly.Python.ORDER_ATOMIC);
    Blockly.Python.definitions_['var_declare' + item] =  'let ' + item  + ':game.LedSprite = null;';
    var code = item + '.delete();\n';
    Blockly.isDefiniedItem = 1;
    return code;
};

Blockly.Python.game_turn_by_direction = function(){
    var item = Blockly.Python.valueToCode(this, 'var', Blockly.Python.ORDER_ATOMIC);
    var dir = this.getFieldValue('dir');
    var data = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ATOMIC);
    Blockly.Python.definitions_['var_declare' + item] =  'let ' + item  + ':game.LedSprite = null;';
    var code = item + '.turn(' + dir + ', ' +  data + ');\n';
    return code;
};
Blockly.Python.game_change_by = function(){
    var item = Blockly.Python.valueToCode(this, 'var', Blockly.Python.ORDER_ATOMIC);
    var change_key = this.getFieldValue('change_key');
    var data = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ATOMIC);
    Blockly.Python.definitions_['var_declare' + item] =  'let ' + item  + ':game.LedSprite = null;';
    var code = item + '.change(' + change_key + ', ' +  data + ');\n';
    return code;
};
Blockly.Python.game_set_xy = function(){
    var item = Blockly.Python.valueToCode(this, 'var', Blockly.Python.ORDER_ATOMIC);
    var change_key = this.getFieldValue('change_key');
    var data = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ATOMIC);
    Blockly.Python.definitions_['var_declare' + item] =  'let ' + item  + ':game.LedSprite = null;';
    var code = item + '.set(' + change_key + ', ' +  data + ');\n';
    return code;
};
Blockly.Python.game_get_xy = function(){
    var item = Blockly.Python.valueToCode(this, 'var', Blockly.Python.ORDER_ATOMIC);
    var change_key = this.getFieldValue('change_key');
    var code = item + '.get(' + change_key +  ')';
    Blockly.Python.definitions_['var_declare' + item] =  'let ' + item  + ':game.LedSprite = null;';
    return [code, Blockly.Python.ORDER_ATOMIC] ;
};

Blockly.Python.game_touch_another = function(){
    var item = Blockly.Python.valueToCode(this, 'var', Blockly.Python.ORDER_ATOMIC);
    var another = Blockly.Python.valueToCode(this, 'another', Blockly.Python.ORDER_ATOMIC) || 'null';
    var code = item + '.isTouching(' + another +  ')';
    Blockly.Python.definitions_['var_declare' + item] =  'let ' + item  + ':game.LedSprite = null;';
    return [code, Blockly.Python.ORDER_ATOMIC] ;
};

Blockly.Python.game_touch_edge = function(){
    var item = Blockly.Python.valueToCode(this, 'var', Blockly.Python.ORDER_ATOMIC);
    var code = item + '.isTouchingEdge()';
    Blockly.Python.definitions_['var_declare' + item] =  'let ' + item  + ':game.LedSprite = null;';
    return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python.game_on_edge_and_bounce = function(){
    var item = Blockly.Python.valueToCode(this, 'var', Blockly.Python.ORDER_ATOMIC);
    var code = item + '.ifOnEdgeBounce();\n';
    Blockly.Python.definitions_['var_declare' + item] =  'let ' + item  + ':game.LedSprite = null;';
    return code;
};

Blockly.Python.game_change_score = function(){
    var data = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ATOMIC);
    var code = 'game.addScore('  + data +  ');\n';
    return code;
};

Blockly.Python.game_set_score = function(){
    var data = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ATOMIC);
    var code = 'game.setScore('  + data +  ');\n';
    return code;
};

Blockly.Python.game_start_countdown = function(){
    var data = Blockly.Python.valueToCode(this, 'data', Blockly.Python.ORDER_ATOMIC);
    var code = 'game.startCountdown(' + data + ');\n';
    return code;
};

Blockly.Python.game_get_score = function() {
    return ["game.score()", Blockly.Python.ORDER_ATOMIC];
}

Blockly.Python.game_over = function() {
    return "game.gameOver();\n";
}

Blockly.Python.game_resume = function() {
    return "game.resume();\n";
}

Blockly.Python.game_pause= function() {
    return "game.pause();\n";
}
