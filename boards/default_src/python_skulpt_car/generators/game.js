export const game_init = function (block, generator) {
    generator.definitions_.import_blocklygame = "import blocklygame";
    var code = generator.statementToCode(block, "DO0") + 'blocklygame.initMap(\'block_id=' + block.id + '\');\n'

    var code_piece = [];
    code_piece = code.split("\n");
    for (var i = 0; i < code_piece.length; i++) {
        if ((code_piece[i].indexOf("    ") >= 0)) {
            code_piece[i] = code_piece[i].replace("    ", "");
        }
    }
    code = ""
    for (var i = 0; i < code_piece.length; i++) {
        code += code_piece[i] + '\n'
    }
    return code;
}

// export const move_direction = function(block) {
//     generator.definitions_.import_blocklygame = "import blocklygame";
//     var Direction = this.getFieldValue('direction');
//     return 'actor.moveDirection('+Direction+',\'block_id=' + block.id + '\');\n';
//   }

export const move_direction_steps = function (block, generator) {
    generator.definitions_.import_blocklygame = "import blocklygame";
    var times = generator.valueToCode(this, 'times', generator.ORDER_ATOMIC);
    var Direction = this.getFieldValue('direction');
    var d = 'actor.moveDirection(' + Direction + ',\'block_id=' + block.id + '\');\n',
        d = generator.addLoopTrap(d, block.id) || generator.PASS;
    return 'for _my_variable in range(' + times + '):\n\t' + d;
}

export const initSettedMap_1 = function (block, generator) {
    generator.definitions_.import_blocklygame = "import blocklygame";
    return 'blocklygame.settedMap(0,\'block_id=' + block.id + '\');\n' + 'actor=blocklygame.Actor(\'car\',2);\n';
}

export const initSettedMap_2 = function (block, generator) {
    generator.definitions_.import_blocklygame = "import blocklygame";
    return 'blocklygame.settedMap(1,\'block_id=' + block.id + '\');\n' + 'actor=blocklygame.Actor(\'car\',2);\n';
}

export const initSettedMap_3 = function (block, generator) {
    generator.definitions_.import_blocklygame = "import blocklygame";
    return 'blocklygame.settedMap(2,\'block_id=' + block.id + '\');\n' + 'actor=blocklygame.Actor(\'car\',2);\n';
}

export const initSettedMap_4 = function (block, generator) {
    generator.definitions_.import_blocklygame = "import blocklygame";
    return 'blocklygame.settedMap(3,\'block_id=' + block.id + '\');\n' + 'actor=blocklygame.Actor(\'car\',2);\n' + 'actor.randomOil(\'block_id=' + block.id + '\');\n';
}

export const initSettedMap_5 = function (block, generator) {
    generator.definitions_.import_blocklygame = "import blocklygame";
    return 'blocklygame.settedMap(4,\'block_id=' + block.id + '\');\n' + 'actor=blocklygame.Actor(\'car\',2);\n';
}

export const initSettedMap_6 = function (block, generator) {
    generator.definitions_.import_blocklygame = "import blocklygame";
    return 'blocklygame.settedMap(5,\'block_id=' + block.id + '\');\n' + 'actor=blocklygame.Actor(\'car\',2);\n';
}

export const initSettedMap_7 = function (block, generator) {
    generator.definitions_.import_blocklygame = "import blocklygame";
    return 'blocklygame.settedMap(6,\'block_id=' + block.id + '\');\n' + 'actor=blocklygame.Actor(\'car\',2);\n';
}

// export const move_forward = function(block) {
//   generator.definitions_.import_blocklygame = "import blocklygame";
//   return 'actor.moveForward(\'block_id=' + block.id + '\');\n';
// }

// export const move_backward = function(block) {
//   generator.definitions_.import_blocklygame = "import blocklygame";
//   var code = 'actor.moveBackward(\'block_id=' + block.id + '\');\n';
//   return code;
// }

export const Turn = function (block, generator) {
    generator.definitions_.import_blocklygame = "import blocklygame";
    var dropdown_Direction = this.getFieldValue('Direction');
    var code = 'actor.turn(\'' + dropdown_Direction + "','block_id=" + block.id + '\');\n';
    return code;
}

export const isDone = function (block, generator) {
    generator.definitions_.import_blocklygame = "import blocklygame";
    var code = 'actor.isDone(\'block_id=' + block.id + '\')';
    return [code, generator.ORDER_ATOMIC];
}

export const isPath = function (block, generator) {
    generator.definitions_.import_blocklygame = "import blocklygame";
    var dropdown_Direction = this.getFieldValue('Direction');
    var code = 'actor.isPath(\'' + dropdown_Direction + "','block_id=" + block.id + '\')';
    return [code, generator.ORDER_ATOMIC];
}

// 从这里开始是新的块
export const get_actor_point = function (block, generator) {
    generator.definitions_.import_blocklygame = "import blocklygame";
    var code = 'actor.getPoint(\'block_id=' + block.id + '\')';
    return [code, generator.ORDER_ATOMIC];
}

export const game_get_local_img = function (_, generator) {
    var dropdown_type = this.getFieldValue('type');
    generator.definitions_.import_blocklygame = "import blocklygame";
    var code = dropdown_type;
    return [code, generator.ORDER_ATOMIC];
}

export const set_map = function (block, generator) {
    generator.definitions_.import_blocklygame = "import blocklygame";
    var value_x = generator.valueToCode(this, 'x', generator.ORDER_ATOMIC);
    var value_y = generator.valueToCode(this, 'y', generator.ORDER_ATOMIC);
    var startPos = generator.valueToCode(this, 'startPos', generator.ORDER_ATOMIC);
    var endPos = generator.valueToCode(this, 'endPos', generator.ORDER_ATOMIC);
    var bg_pic = generator.valueToCode(this, 'background', generator.ORDER_ATOMIC);

    return 'blocklygame.setMap(' + value_x + ',' + value_y + ',' + startPos + ',' + endPos + ',' + bg_pic + ",'block_id=" + block.id + '\');\n';
}

export const game_get_character_img = function (_, generator) {
    var dropdown_type = this.getFieldValue('type');
    generator.definitions_.import_blocklygame = "import blocklygame";
    var code = dropdown_type;
    return [code, generator.ORDER_ATOMIC];
}

export const initialize = function (block, generator) {
    generator.definitions_.import_blocklygame = "import blocklygame";
    // var value_character = this.getFieldValue('character');
    var value_direction = this.getFieldValue('direction');
    var value_character = generator.valueToCode(this, 'character', generator.ORDER_ATOMIC);
    return 'actor=blocklygame.Actor(' + value_character + ',' + value_direction + ",'block_id=" + block.id + '\');\n';
}

export const place_item = function (block, generator) {
    generator.definitions_.import_blocklygame = "import blocklygame";
    var value_posx = generator.valueToCode(this, 'posx', generator.ORDER_ATOMIC);
    var value_posy = generator.valueToCode(this, 'posy', generator.ORDER_ATOMIC);
    var value_item = this.getFieldValue('item');
    return 'blocklygame.placeItem(' + value_posx + ',' + value_posy + ',' + value_item + ",'block_id=" + block.id + '\');\n';
}

export const game_get_path_img = function (_, generator) {
    var dropdown_type = this.getFieldValue('type');
    generator.definitions_.import_blocklygame = "import blocklygame";
    var code = dropdown_type;
    return [code, generator.ORDER_ATOMIC];
}

export const set_pathtype = function (block, generator) {
    generator.definitions_['import_blocklygame'] = 'import blocklygame';
    var path_type = generator.valueToCode(this, 'pathtype', generator.ORDER_ATOMIC);
    return 'blocklygame.setPathType(' + path_type + ",'block_id=" + block.id + '\');\n';
    // return 'actor.getPoint();\n';
}

export const isBarrier = function (block, generator) {
    generator.definitions_.import_blocklygame = "import blocklygame";
    var dropdown_Direction = this.getFieldValue('direction');
    var code = 'actor.isBarrier(' + dropdown_Direction + ",'block_id=" + block.id + '\')';
    return [code, generator.ORDER_ATOMIC];
}

export const randomOil = function (block, generator) {
    generator.definitions_.import_blocklygame = "import blocklygame";
    return 'actor.randomOil(\'block_id=' + block.id + '\');\n';
}

export const isOilFull = function (block, generator) {
    generator.definitions_.import_blocklygame = "import blocklygame";
    var code = 'actor.isOilFull(\'block_id=' + block.id + '\')';
    return [code, generator.ORDER_ATOMIC];
}

export const isLightGreen = function (block, generator) {
    generator.definitions_.import_blocklygame = "import blocklygame";
    var code = 'actor.isLightGreen(\'block_id=' + block.id + '\')';
    return [code, generator.ORDER_ATOMIC];
}

export const isLightRed = function (block, generator) {
    generator.definitions_.import_blocklygame = "import blocklygame";
    var code = 'not actor.isLightGreen(\'block_id=' + block.id + '\')';
    return [code, generator.ORDER_ATOMIC];
}

export const addOil = function (block, generator) {
    generator.definitions_.import_blocklygame = "import blocklygame";
    var code = 'actor.addOil(\'block_id=' + block.id + '\');\n';
    return code;
}

export const isCirculationRight = function (block, generator) {
    generator.definitions_.import_blocklygame = "import blocklygame";
    var code = 'actor.isCirculationRight(\'block_id=' + block.id + '\');\n';
    return code;
}