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

export const move_related_to_spirite = function (block, generator) {
    generator.definitions_.import_blocklygame = "import blocklygame";
    var times = generator.valueToCode(this, 'times', generator.ORDER_ATOMIC);
    var Direction = this.getFieldValue('Direction');
    if (Direction == 'f') {
        Direction = 0;
    } else {
        Direction = 2
    }
    var d = 'dire=(actor.direction+' + Direction + ")%4\n\t" + 'actor.moveDirection(dire,\'block_id=' + block.id + '\');\n',
        d = generator.addLoopTrap(d, block.id) || generator.PASS;
    return 'for _my_variable in range(' + times + '):\n\t' + d;
}

export const initSettedMap = function (block, generator) {
    generator.definitions_.import_blocklygame = "import blocklygame";
    var level = this.getFieldValue('level');
    return 'blocklygame.settedMap(' + level + ',\'block_id=' + block.id + '\');\n' + 'actor=blocklygame.Actor(\'car\',2);\n';
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
    var code = 'actor.isPath(' + dropdown_Direction + ",'block_id=" + block.id + '\')';
    return [code, generator.ORDER_ATOMIC];
}

export const is_Related_Path = function (block, generator) {
    generator.definitions_.import_blocklygame = "import blocklygame";
    var dropdown_Direction = this.getFieldValue('Direction');
    switch (dropdown_Direction) {
        case 'f':
            dropdown_Direction = 0;
            break;
        case "b":
            dropdown_Direction = 2;
            break;
        case "r":
            dropdown_Direction = 1;
            break;
        case "l":
            dropdown_Direction = 3;
            break;
    }
    var code = 'actor.isPath(' + "(actor.direction+" + dropdown_Direction + ")%4" + ",'block_id=" + block.id + '\')';
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
    var startPos_x = generator.valueToCode(this, 'startPos_x', generator.ORDER_ATOMIC);
    var startPos_y = generator.valueToCode(this, 'startPos_y', generator.ORDER_ATOMIC);
    var endPos_x = generator.valueToCode(this, 'endPos_x', generator.ORDER_ATOMIC);
    var endPos_y = generator.valueToCode(this, 'endPos_y', generator.ORDER_ATOMIC);

    return 'blocklygame.setMap(' + value_x + ',' + value_y + ',' + startPos_x + ',' + startPos_y + ',' + endPos_x + ',' + endPos_y + ",'block_id=" + block.id + '\');\n';
}

export const set_map_bg = function (block, generator) {
    generator.definitions_['import_blocklygame'] = 'import blocklygame';
    var bg_pic = generator.valueToCode(this, 'background', generator.ORDER_ATOMIC);
    return 'blocklygame.set_map_bg(' + bg_pic + ",'block_id=" + block.id + '\');\n';
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
    var value_direction = "1"
    // this.getFieldValue('direction');
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

export const is_Related_Barrier = function (block, generator) {
    generator.definitions_.import_blocklygame = "import blocklygame";
    var dropdown_Direction = this.getFieldValue('direction');
    switch (dropdown_Direction) {
        case 'f':
            dropdown_Direction = 0;
            break;
        case "b":
            dropdown_Direction = 2;
            break;
        case "r":
            dropdown_Direction = 1;
            break;
        case "l":
            dropdown_Direction = 3;
            break;
    }

    var code = 'actor.isBarrier(' + "(actor.direction+" + dropdown_Direction + ")%4" + ",'block_id=" + block.id + '\')';
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

export const checkMarker = function (block, generator) {
    generator.definitions_.import_blocklygame = "import blocklygame";
    var marker = this.getFieldValue('marker');
    var code = 'actor.checkMarker(' + marker + ',\'block_id=' + block.id + '\')';
    return [code, generator.ORDER_ATOMIC];
}

export const getMarkerNum = function (block, generator) {
    generator.definitions_['import_blocklygame'] = 'import blocklygame';
    var marker = this.getFieldValue('marker');
    var code = 'actor.getMarkerNum(' + marker + ',\'block_id=' + block.id + '\')';
    return [code, generator.ORDER_ATOMIC];
}

export const randomPlaceBarrier = function (block, generator) {
    generator.definitions_.import_blocklygame = "import blocklygame";
    var value_posx = generator.valueToCode(this, 'posx', generator.ORDER_ATOMIC);
    var value_posy = generator.valueToCode(this, 'posy', generator.ORDER_ATOMIC);
    return 'blocklygame.randomPlaceBarrier(' + value_posx + ',' + value_posy + ",'block_id=" + block.id + '\');\n';
}

export const settedSimpleMap = function (block, generator) {
    generator.definitions_.import_blocklygame = "import blocklygame";
    var level = this.getFieldValue('level');
    return 'blocklygame.settedSimpleMap(' + level + ',\'block_id=' + block.id + '\');\n';
}

export const find_books_by_dichotomy = function (_, generator) {
    var VALUE_INPUT_N = generator.valueToCode(this, "N", generator.ORDER_ATOMIC);
    generator.setups_["find_books_by_dichotomy"] = `
def find_books_by_dichotomy(N):
    counter = 0
    left = 0
    right = N
    key = N
    i = (left + right) / 2
    while i != key:
        counter = counter + 1
        if i > key:
            right = i
        else:
            left = i
        i = ((left + right) + 1) / 2
    print(counter,end ="")\n`;
    return `find_books_by_dichotomy(${VALUE_INPUT_N})\n`;
}

export const find_books_by_sequence = function (_, generator) {
    var VALUE_INPUT_N = generator.valueToCode(this, "N", generator.ORDER_ATOMIC);
    generator.setups_["find_books_by_sequence"] = `
def find_books_by_sequence(N):
    counter = 1
    key = N
    i = 1
    while i != key:
        counter = counter + 1
        i = i + 1
    print(counter,end ="")\n`;
    return `find_books_by_sequence(${VALUE_INPUT_N})\n`;
}