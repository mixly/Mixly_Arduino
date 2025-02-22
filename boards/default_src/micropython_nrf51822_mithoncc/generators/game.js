import * as Blockly from 'blockly/core';

export const game_create_sprite = function (_, generator) {
    var x = generator.valueToCode(this, 'x', generator.ORDER_ATOMIC);
    var y = generator.valueToCode(this, 'y', generator.ORDER_ATOMIC);
    var code = 'game.createSprite(' + x + ', ' + y + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const game_move_by = function (_, generator) {
    var item = generator.valueToCode(this, 'var', generator.ORDER_ATOMIC);
    var data = generator.valueToCode(this, 'data', generator.ORDER_ATOMIC);
    generator.definitions_['var_declare' + item] =  'let ' + item  + ':game.LedSprite = null;';
    var code = item + '.move(' + data + ');\n';
    return code;
}

export const game_delete_var = function (_, generator) {
    var item = generator.valueToCode(this, 'var', generator.ORDER_ATOMIC);
    generator.definitions_['var_declare' + item] =  'let ' + item  + ':game.LedSprite = null;';
    var code = item + '.delete();\n';
    Blockly.isDefiniedItem = 1;
    return code;
}

export const game_turn_by_direction = function (_, generator) {
    var item = generator.valueToCode(this, 'var', generator.ORDER_ATOMIC);
    var dir = this.getFieldValue('dir');
    var data = generator.valueToCode(this, 'data', generator.ORDER_ATOMIC);
    generator.definitions_['var_declare' + item] =  'let ' + item  + ':game.LedSprite = null;';
    var code = item + '.turn(' + dir + ', ' +  data + ');\n';
    return code;
}

export const game_change_by = function (_, generator) {
    var item = generator.valueToCode(this, 'var', generator.ORDER_ATOMIC);
    var change_key = this.getFieldValue('change_key');
    var data = generator.valueToCode(this, 'data', generator.ORDER_ATOMIC);
    generator.definitions_['var_declare' + item] =  'let ' + item  + ':game.LedSprite = null;';
    var code = item + '.change(' + change_key + ', ' +  data + ');\n';
    return code;
}

export const game_set_xy = function (_, generator) {
    var item = generator.valueToCode(this, 'var', generator.ORDER_ATOMIC);
    var change_key = this.getFieldValue('change_key');
    var data = generator.valueToCode(this, 'data', generator.ORDER_ATOMIC);
    generator.definitions_['var_declare' + item] =  'let ' + item  + ':game.LedSprite = null;';
    var code = item + '.set(' + change_key + ', ' +  data + ');\n';
    return code;
}

export const game_get_xy = function (_, generator) {
    var item = generator.valueToCode(this, 'var', generator.ORDER_ATOMIC);
    var change_key = this.getFieldValue('change_key');
    var code = item + '.get(' + change_key +  ')';
    generator.definitions_['var_declare' + item] =  'let ' + item  + ':game.LedSprite = null;';
    return [code, generator.ORDER_ATOMIC] ;
}

export const game_touch_another = function (_, generator) {
    var item = generator.valueToCode(this, 'var', generator.ORDER_ATOMIC);
    var another = generator.valueToCode(this, 'another', generator.ORDER_ATOMIC) || 'null';
    var code = item + '.isTouching(' + another +  ')';
    generator.definitions_['var_declare' + item] =  'let ' + item  + ':game.LedSprite = null;';
    return [code, generator.ORDER_ATOMIC] ;
}

export const game_touch_edge = function (_, generator) {
    var item = generator.valueToCode(this, 'var', generator.ORDER_ATOMIC);
    var code = item + '.isTouchingEdge()';
    generator.definitions_['var_declare' + item] =  'let ' + item  + ':game.LedSprite = null;';
    return [code, generator.ORDER_ATOMIC];
}

export const game_on_edge_and_bounce = function (_, generator) {
    var item = generator.valueToCode(this, 'var', generator.ORDER_ATOMIC);
    var code = item + '.ifOnEdgeBounce();\n';
    generator.definitions_['var_declare' + item] =  'let ' + item  + ':game.LedSprite = null;';
    return code;
}

export const game_change_score = function (_, generator) {
    var data = generator.valueToCode(this, 'data', generator.ORDER_ATOMIC);
    var code = 'game.addScore('  + data +  ');\n';
    return code;
}

export const game_set_score = function (_, generator) {
    var data = generator.valueToCode(this, 'data', generator.ORDER_ATOMIC);
    var code = 'game.setScore('  + data +  ');\n';
    return code;
}

export const game_start_countdown = function (_, generator) {
    var data = generator.valueToCode(this, 'data', generator.ORDER_ATOMIC);
    var code = 'game.startCountdown(' + data + ');\n';
    return code;
}

export const game_get_score = function(_, generator) {
    return ["game.score()", generator.ORDER_ATOMIC];
}

export const game_over = function() {
    return "game.gameOver();\n";
}

export const game_resume = function() {
    return "game.resume();\n";
}

export const game_pause = function() {
    return "game.pause();\n";
}