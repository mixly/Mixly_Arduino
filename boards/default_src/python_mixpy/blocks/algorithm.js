import * as Blockly from 'blockly/core';

const ALGORITHM_HUE = '#526FC3';

// sub_algorithm_1

export const algorithm_prepare = {
    init: function () {
        this.setColour(ALGORITHM_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MIXPY_ALGORITHM_PREPARE);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

export const algorithm_add_school = {
    init: function () {
        this.setColour(ALGORITHM_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MIXPY_ALGORITHM_ADD_SCHOOL);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

export const algorithm_find_path = {
    init: function () {
        this.setColour(ALGORITHM_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MIXPY_ALGORITHM_FIND_PATH);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

export const algorithm_new_path = {
    init: function () {
        this.setColour(ALGORITHM_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MIXPY_ALGORITHM_NEW_PATH);
        this.setOutput(true);
    }
}

export const algorithm_set_path = {
    init: function () {
        this.setColour(ALGORITHM_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MIXPY_ALGORITHM_SET_PATH);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

export const algorithm_add_path = {
    init: function () {
        this.setColour(ALGORITHM_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MIXPY_ALGORITHM_ADD_PATH);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

export const algorithm_del_path = {
    init: function () {
        this.setColour(ALGORITHM_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MIXPY_ALGORITHM_DEL_PATH);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

export const algorithm_return_path = {
    init: function () {
        this.setColour(ALGORITHM_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MIXPY_ALGORITHM_RETURN_PATH);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

export const algorithm_no_left = {
    init: function () {
        this.setColour(ALGORITHM_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MIXPY_ALGORITHM_NO_LEFT);
        this.setOutput(true);
    }
}

export const algorithm_print_path = {
    init: function () {
        this.setColour(ALGORITHM_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MIXPY_ALGORITHM_PRINT_PATH);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

// sub_algorithm_2

export const algorithm_prepare2 = {
    init: function () {
        this.setColour(ALGORITHM_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MIXPY_ALGORITHM_PREPARE2);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

export const algorithm_current_school = {
    init: function () {
        this.setColour(ALGORITHM_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MIXPY_ALGORITHM_CURRENT_SCHOOL);
        this.setOutput(true);
    }
}

export const algorithm_no_path = {
    init: function () {
        this.setColour(ALGORITHM_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MIXPY_ALGORITHM_NO_PATH);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

// sub_algorithm_3

export const algorithm_prepare_2_1 = {
    init: function () {
        this.setColour(ALGORITHM_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MIXPY_ALGORITHM_PREPARE_2_1);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

export const algorithm_prepare_2_2 = {
    init: function () {
        this.setColour(ALGORITHM_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MIXPY_ALGORITHM_PREPARE_2_2);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

export const algorithm_move_recent = {
    init: function () {
        this.setColour(ALGORITHM_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MIXPY_ALGORITHM_MOVE_RECENT);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

export const algorithm_not_home = {
    init: function () {
        this.setColour(ALGORITHM_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MIXPY_ALGORITHM_NOT_HOME);
        this.setOutput(true);
    }
};

export const algorithm_not_school = {
    init: function () {
        this.setColour(ALGORITHM_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MIXPY_ALGORITHM_NOT_SCHOOL);
        this.setOutput(true);
    }
};

export const algorithm_print_path2 = {
    init: function () {
        this.setColour(ALGORITHM_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MIXPY_ALGORITHM_PRINT_PATH2);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

// sub_algorithm_4 hanoi

export const hanoi_init = {
    init: function () {
        this.appendDummyInput()
            .appendField("准备")
            .appendField(new Blockly.FieldNumber(3, 0, 100, 1), "NUM")
            .appendField("层汉诺塔");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(ALGORITHM_HUE);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

export const hanoi_move = {
    init: function () {
        this.appendDummyInput()
            .appendField("移动圆盘从");
        this.appendValueInput("FROM_NUM")
            .setCheck(null)
            .appendField("柱");
        this.appendDummyInput()
            .appendField("到");
        this.appendValueInput("TO_NUM")
            .setCheck(null)
            .appendField("柱");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(ALGORITHM_HUE);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

// sub_algorithm_5

export const algorithm_all_books = {
    init: function () {
        this.setColour(ALGORITHM_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MIXPY_ALGORITHM_ALL_BOOKS);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

export const algorithm_all_books_sequence = {
    init: function () {
        this.setColour(ALGORITHM_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MIXPY_ALGORITHM_ALL_BOOKS2);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

export const algorithm_first_book = {
    init: function () {
        this.setColour(ALGORITHM_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MIXPY_ALGORITHM_FIRST_BOOK);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

// export const algorithm_no_ring = {
//   init: function() {
//     this.setColour(ALGORITHM_HUE);
//     this.appendDummyInput()
//     .appendField(Blockly.Msg.MIXLY_MIXPY_ALGORITHM_NO_RING);
//     this.setOutput(true);
//   }
// }

export const algorithm_no_ring2 = {
    init: function () {
        this.setColour(ALGORITHM_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MIXPY_ALGORITHM_NO_RING);
        this.setOutput(true);
    }
};

export const algorithm_yes_ring2 = {
    init: function () {
        this.setColour(ALGORITHM_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MIXPY_ALGORITHM_YES_RING);
        this.setOutput(true);
    }
};

export const algorithm_next_book = {
    init: function () {
        this.setColour(ALGORITHM_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MIXPY_ALGORITHM_NEXT_BOOK);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

export const algorithm_two_left = {
    init: function () {
        this.setColour(ALGORITHM_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MIXPY_ALGORITHM_TWO_LEFT);
        this.setOutput(true);
    }
}

export const algorithm_divide_books = {
    init: function () {
        this.setColour(ALGORITHM_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MIXPY_ALGORITHM_DIVIDE_BOOKS);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

export const algorithm_get_half_books = {
    init: function () {
        this.setColour(ALGORITHM_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MIXPY_ALGORITHM_GET_HALF_BOOKS);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

// export const algorithm_check_half_books = {
//   init: function() {
//     this.setColour(ALGORITHM_HUE);
//     this.appendDummyInput()
//     .appendField(Blockly.Msg.MIXLY_MIXPY_ALGORITHM_CHECK_HALF_BOOKS);
//     this.setPreviousStatement(true, null);
//     this.setNextStatement(true, null);
//   }
// };

export const algorithm_delete_book = {
    init: function () {
        this.setColour(ALGORITHM_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MIXPY_ALGORITHM_DELETE_BOOK);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

export const algorithm_delete_books = {
    init: function () {
        this.setColour(ALGORITHM_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MIXPY_ALGORITHM_DELETE_BOOKS);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

export const algorithm_delete_books2 = {
    init: function () {
        this.setColour(ALGORITHM_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MIXPY_ALGORITHM_DELETE_BOOKS2);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

// export const algorithm_print_book = {
//   init: function() {
//     this.setColour(ALGORITHM_HUE);
//     this.appendDummyInput()
//     .appendField(Blockly.Msg.MIXLY_MIXPY_ALGORITHM_PRINT_BOOK);
//     this.setPreviousStatement(true, null);
//     this.setNextStatement(true, null);
//   }
// };

export const algorithm_print_book2 = {
    init: function () {
        this.setColour(ALGORITHM_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MIXPY_ALGORITHM_PRINT_BOOK);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

// sub_algorithm_6

export const algorithm_book_scale = {
    init: function () {
        this.appendDummyInput()
            .setAlign(Blockly.inputs.Align.LEFT)
            .appendField("设置待查书总数 N=")
            .appendField(new Blockly.FieldDropdown([
                ["5", "5"],
                ["10", "10"],
                ["20", "20"],
                ["50", "50"]
            ]), "NUM");
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(ALGORITHM_HUE);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

export const algorithm_number_zero = {
    init: function () {
        this.setColour(ALGORITHM_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MIXPY_ALGORITHM_NUMBER_ZERO);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

export const algorithm_number_add = {
    init: function () {
        this.setColour(ALGORITHM_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MIXPY_ALGORITHM_NUMBER_ADD);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

export const algorithm_print_number = {
    init: function () {
        this.setColour(ALGORITHM_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MIXPY_ALGORITHM_PRINT_NUMBER);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

export const algorithm_get_book_num = {
    init: function () {
        this.setColour(ALGORITHM_HUE);
        this.appendDummyInput()
            .appendField('n' + Blockly.Msg.MIXLY_VALUE2)
            .appendField(new Blockly.FieldTextInput('50'), 'NUM');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

export const algorithm_print_sequence = {
    init: function () {
        this.setColour(ALGORITHM_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MIXPY_ALGORITHM_PRINT_SEQUENCE);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

export const algorithm_print_divide = {
    init: function () {
        this.setColour(ALGORITHM_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MIXPY_ALGORITHM_PRINT_DIVIDE);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

// sub_algorithm_7

export const algorithm_init_jttl = {
    init: function () {
        this.appendDummyInput()
            .setAlign(Blockly.inputs.Align.LEFT)
            .appendField("初始化鸡兔同笼问题：");
        this.appendDummyInput()
            .setAlign(Blockly.inputs.Align.LEFT)
            .appendField("有若干只鸡、兔在同一个笼子里。");
        this.appendDummyInput()
            .setAlign(Blockly.inputs.Align.LEFT)
            .appendField("从上面数鸡兔有10个头，");
        this.appendDummyInput()
            .setAlign(Blockly.inputs.Align.LEFT)
            .appendField("从下面数鸡兔有32只脚。");
        this.appendDummyInput()
            .setAlign(Blockly.inputs.Align.LEFT)
            .appendField("问笼中有多少只鸡和多少只兔？");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(ALGORITHM_HUE);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

export const algorithm_rabbit_zero = {
    init: function () {
        this.appendDummyInput()
            .setAlign(Blockly.inputs.Align.LEFT)
            .appendField("假设兔子的数量为0只");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(ALGORITHM_HUE);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

export const algorithm_rabbit_number_in_range = {
    init: function () {
        this.appendDummyInput()
            .setAlign(Blockly.inputs.Align.LEFT)
            .appendField("兔子的数量在范围之内");
        this.setOutput(true, null);
        this.setColour(ALGORITHM_HUE);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

export const algorithm_chick_calculate = {
    init: function () {
        this.appendDummyInput()
            .setAlign(Blockly.inputs.Align.LEFT)
            .appendField("根据（头数-兔子数）计算出鸡的数量");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(ALGORITHM_HUE);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

export const algorithm_check_feet = {
    init: function () {
        this.appendDummyInput()
            .setAlign(Blockly.inputs.Align.LEFT)
            .appendField("计算得到脚的数量正确");
        this.setOutput(true, null);
        this.setColour(ALGORITHM_HUE);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

export const algorithm_print_jttl_answer = {
    init: function () {
        this.appendDummyInput()
            .setAlign(Blockly.inputs.Align.LEFT)
            .appendField("输出鸡、兔的数量");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(ALGORITHM_HUE);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

export const algorithm_rabbit_add = {
    init: function () {
        this.appendDummyInput()
            .setAlign(Blockly.inputs.Align.LEFT)
            .appendField("假设兔子数量要更多一只");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(ALGORITHM_HUE);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

// sub_algorithm_8

export const algorithm_init_fzsf = {
    init: function () {
        this.appendDummyInput()
            .setAlign(Blockly.inputs.Align.LEFT)
            .appendField("加载路线图");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(ALGORITHM_HUE);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

export const algorithm_fz_calc = {
    init: function () {
        this.appendDummyInput()
            .setAlign(Blockly.inputs.Align.LEFT)
            .appendField("计算")
            .appendField(new Blockly.FieldDropdown([
                ["S1", "1"],
                ["S2", "2"],
                ["S3", "3"],
                ["S4", "4"]
            ]), "PATHNAME")
            .appendField("长度");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(ALGORITHM_HUE);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

export const algorithm_fz_calc_first_min = {
    init: function () {
        this.appendDummyInput()
            .setAlign(Blockly.inputs.Align.LEFT)
            .appendField("设置S1为Smin");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(ALGORITHM_HUE);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

export const algorithm_fz_compare = {
    init: function () {
        this.appendDummyInput()
            .setAlign(Blockly.inputs.Align.LEFT)
            .appendField(new Blockly.FieldDropdown([
                ["S1", "1"],
                ["S2", "2"],
                ["S3", "3"],
                ["S4", "4"]
            ]), "PATHNAME")
            .appendField("的长度比")
            .appendField(new Blockly.FieldDropdown([
                ["S1", "1"],
                ["S2", "2"],
                ["S3", "3"],
                ["S4", "4"]
            ]), "PATHNAME2")
            .appendField("短");
        this.setOutput(true, null);
        this.setColour(ALGORITHM_HUE);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

export const algorithm_fz_set_min = {
    init: function () {
        this.appendDummyInput()
            .setAlign(Blockly.inputs.Align.LEFT)
            .appendField("设置")
            .appendField(new Blockly.FieldDropdown([
                ["S1", "1"],
                ["S2", "2"],
                ["S3", "3"],
                ["S4", "4"]
            ]), "PATHNAME")
            .appendField("为Smin");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(ALGORITHM_HUE);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

export const algorithm_fz_move = {
    init: function () {
        this.appendDummyInput()
            .setAlign(Blockly.inputs.Align.LEFT)
            .appendField("按照Smin移动");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(ALGORITHM_HUE);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

// sub_algorithm_8

export const algorithm_init_hxdb = {
    init: function () {
        this.appendDummyInput()
            .setAlign(Blockly.inputs.Align.LEFT)
            .appendField("初始化韩信点兵问题：");
        this.appendDummyInput()
            .setAlign(Blockly.inputs.Align.LEFT)
            .appendField("有未知数量的若干士兵。");
        this.appendDummyInput()
            .setAlign(Blockly.inputs.Align.LEFT)
            .appendField("若3人一排列队，多1人；");
        this.appendDummyInput()
            .setAlign(Blockly.inputs.Align.LEFT)
            .appendField("若5人一排列队，多2人；");
        this.appendDummyInput()
            .setAlign(Blockly.inputs.Align.LEFT)
            .appendField("若7人一排列队，多2人；");
        this.appendDummyInput()
            .setAlign(Blockly.inputs.Align.LEFT)
            .appendField("问士兵的数量最少是多少人？");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(ALGORITHM_HUE);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

export const algorithm_hxdb_init_soldier = {
    init: function () {
        this.appendDummyInput()
            .setAlign(Blockly.inputs.Align.LEFT)
            .appendField("初始化士兵为")
            .appendField(new Blockly.FieldTextInput("7"), "NUM")
            .appendField("个");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(ALGORITHM_HUE);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

export const algorithm_hxdb_stand_in_line = {
    init: function () {
        this.appendDummyInput()
            .setAlign(Blockly.inputs.Align.LEFT)
            .appendField("使士兵")
            .appendField(new Blockly.FieldDropdown([
                ["3", "3"],
                ["5", "5"],
                ["7", "7"]
            ]), "NUM")
            .appendField("人一排列队");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(ALGORITHM_HUE);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

export const algorithm_hxdb_last_line = {
    init: function () {
        this.appendDummyInput()
            .setAlign(Blockly.inputs.Align.LEFT)
            .appendField("剩余")
            .appendField(new Blockly.FieldTextInput("1"), "NUM")
            .appendField("个士兵");
        this.setOutput(true, null);
        this.setColour(ALGORITHM_HUE);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

export const algorithm_hxdb_add = {
    init: function () {
        this.appendDummyInput()
            .setAlign(Blockly.inputs.Align.LEFT)
            .appendField("增加1个士兵");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(ALGORITHM_HUE);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

export const algorithm_hxdb_result = {
    init: function () {
        this.appendDummyInput()
            .setAlign(Blockly.inputs.Align.LEFT)
            .appendField("输出士兵数量");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(ALGORITHM_HUE);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

// others

export const hanoi_init_offline = {
    init: function () {
        this.appendDummyInput()
            .appendField("准备")
            .appendField(new Blockly.FieldNumber(3, 0, 100, 1), "NUM")
            .appendField("层汉诺塔");
        this.appendValueInput('VAR')
            .setCheck(String)
            .appendField(Blockly.Msg.HTML_COLOUR);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(ALGORITHM_HUE);
        this.setInputsInline(true);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

export const algorithm_get_current_location = {
    init: function () {
        this.setColour(ALGORITHM_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MIXPY_ALGORITHM_GET_CURRENT_LOCATION);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

export const algorithm_void_path = {
    init: function () {
        this.setColour(ALGORITHM_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MIXPY_ALGORITHM_VOID_PATH);
        this.setOutput(true);
    }
}

export const algorithm_color_seclet = {
    init: function () {
        this.setColour(ALGORITHM_HUE);
        this.appendDummyInput("")
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField(new Blockly.FieldColour("ff0000"), "COLOR");
        this.setInputsInline(true);
        this.setOutput(true, String);
    }
};