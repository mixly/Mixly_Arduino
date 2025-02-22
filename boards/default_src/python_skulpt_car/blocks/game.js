import * as Blockly from 'blockly/core';

//初始化地图为第1关
export const initSettedMap_1 = {
    init: function () {
        this.appendDummyInput()
            .appendField("初始化地图为第一关")
        this.setInputsInline(true);
        this.setNextStatement(true);
        this.setColour(290);
        this.setTooltip('');
    }
};

//初始化地图为第2关
export const initSettedMap_2 = {
    init: function () {
        this.appendDummyInput()
            .appendField("初始化地图为第二关")
        this.setInputsInline(true);
        this.setNextStatement(true);
        this.setColour(290);
        this.setTooltip('');
    }
};

//初始化地图为第3关
export const initSettedMap_3 = {
    init: function () {
        this.appendDummyInput()
            .appendField("初始化地图为第三关")
        this.setInputsInline(true);
        this.setNextStatement(true);
        this.setColour(290);
        this.setTooltip('');
    }
};

//初始化地图为第4关
export const initSettedMap_4 = {
    init: function () {
        this.appendDummyInput()
            .appendField("初始化地图为第四关")
        this.setInputsInline(true);
        this.setNextStatement(true);
        this.setColour(290);
        this.setTooltip('');
    }
};

//初始化地图为第5关
export const initSettedMap_5 = {
    init: function () {
        this.appendDummyInput()
            .appendField("初始化地图为第五关")
        this.setInputsInline(true);
        this.setNextStatement(true);
        this.setColour(290);
        this.setTooltip('');
    }
};

//初始化地图为第6关
export const initSettedMap_6 = {
    init: function () {
        this.appendDummyInput()
            .appendField("初始化地图为第六关")
        this.setInputsInline(true);
        this.setNextStatement(true);
        this.setColour(290);
        this.setTooltip('');
    }
};

//初始化地图为第7关
export const initSettedMap_7 = {
    init: function () {
        this.appendDummyInput()
            .appendField("初始化地图为第七关")
        this.setInputsInline(true);
        this.setNextStatement(true);
        this.setColour(290);
        this.setTooltip('');
    }
};

export const game_init = {
    init: function () {
        this.setNextStatement(true);
        this.setColour(290);
        this.setTooltip('');
        this.appendStatementInput('DO0')
            .appendField(Blockly.Msg.MIXLY_GAME_INIT);
    }
};


export const move_direction_steps = {
    init: function () {
        this.appendDummyInput()
            .appendField("向")
            .appendField(new Blockly.FieldDropdown([["东", '1'], ["南", '2'], ["西", '3'], ["北", '0']]), "direction");
        this.appendDummyInput()
            .appendField("移动");
        this.appendValueInput("times")
            .setCheck(Number)
        this.appendDummyInput()
            .appendField("步");
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(290);
        this.setTooltip('');
    }
};

export const Turn = {
    init: function () {
        var Directions = [
            [Blockly.Msg.MIXLY_GAME_Turn_LEFT, 'left'],
            [Blockly.Msg.MIXLY_GAME_Turn_RIGHT, 'right']
        ];
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_GAME_TURN1)
            .appendField(new Blockly.FieldDropdown(Directions), 'Direction')
            .appendField(Blockly.Msg.MIXLY_GAME_TURN2);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(290);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

export const isDone = {
    init: function () {
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_GAME_ISDONE);
        this.setOutput(true, null);
        this.setColour(290);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

export const isPath = {
    init: function () {
        var Directions = [
            [Blockly.Msg.MIXLY_GAME_ISPATH_LEFT, 'left'],
            [Blockly.Msg.MIXLY_GAME_ISPATH_RIGHT, 'right']
        ];
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_GAME_ISPATH1)
            .appendField(new Blockly.FieldDropdown(Directions), 'Direction')
            .appendField(Blockly.Msg.MIXLY_GAME_ISPATH2);
        this.setOutput(true, null);
        this.setColour(290);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

//最新块
export const set_map = {
    init: function () {
        // this.appendDummyInput()
        //     .appendField("设置地图：长");
        this.appendValueInput("x")
            .setCheck(Number)
            .appendField("设置地图,长为:");
        this.appendValueInput("y")
            .setCheck(Number)
            .appendField("宽为:");
        this.appendValueInput("startPos")
            .setCheck(null)
            .appendField("，起点坐标");
        this.appendValueInput("endPos")
            .setCheck(null)
            .appendField("终点坐标");
        this.appendValueInput("background")
            .setCheck(null)
            .appendField("背景");
        // this.appendDummyInput()
        //     .appendField("，背景")
        //     .appendField(new Blockly.FieldDropdown([["背景1","3"],["背景2","4"]]), "bg");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(290);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

export const game_get_local_img = {
    init: function () {
        this.imgArr = this.getLocalImg();
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(this.getLocalImg()), "type");
        this.setOutput(true, null);
        this.setColour(290);
        this.setTooltip('');
        this.setHelpUrl('');
    },
    onchange: function () {
        let typeValue = this.getFieldValue("type");
        //let newImgArr = this.getLocalImg();
        let newImgArr = this.imgArr;
        if (this.haveNewSrc(this.imgArr, newImgArr)) {
            this.imgArr = newImgArr;
            var typeField = this.getField("type");
            typeField.menuGenerator_ = this.imgArr;
            if (this.checkSrc(typeValue, this.imgArr)) {
                this.setFieldValue(typeValue, "type");
            } else {
                this.setFieldValue(this.imgArr[0][1], "type");
            }
        }
    },
    haveNewSrc: function (oldArr, newArr) {
        if (oldArr.length !== newArr.length) return true;
        for (var i = 0; i < oldArr.length; i++) {
            if (oldArr[i][0].src !== newArr[i][0].src) {
                return true;
            }
        }
        return false;
    },
    checkSrc: function (newSrc, srcArr) {
        for (var i = 0; i < srcArr.length; i++) {
            if (srcArr[i][0].src == newSrc) {
                return true;
            }
        }
        return false;
    },
    getLocalImg: function () {
        let imgArr = [];
        try {
            var imgDirArr = ["bg_default.png", "bg_astro.png", "bg_panda.jpg"]
            for (var i = 0; i < imgDirArr.length; i++) {
                var dropdownItem = {};
                dropdownItem.src = "./media/mixpyBuild/maps/" + imgDirArr[i];
                dropdownItem.width = 40;
                dropdownItem.height = 45;
                if (imgDirArr[i] == "") {
                    dropdownItem.alt = "无";
                } else {
                    dropdownItem.alt = "*";
                }
                var dropdownArr = [];
                dropdownArr.push(dropdownItem);
                var dropdownData = imgDirArr[i].substring(0, imgDirArr[i].lastIndexOf("."));
                dropdownData = '\'' + dropdownData + '\'';
                dropdownArr.push(dropdownData);
                imgArr.push(dropdownArr);
            }
        } catch (e) {
            console.log(e);
            imgArr = [["'无可用地图'", "'无可用地图'"]];
        }
        if (imgArr.length > 0) {
            return imgArr;
        }
        return [["'无可用地图'", "'无可用地图'"]];
    }
};


export const set_pathtype = {
    init: function () {
        this.appendValueInput("pathtype")
            .setCheck(null)
            .appendField("设置路径样式为");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(290);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

export const game_get_path_img = {
    init: function () {
        this.imgArr = this.getLocalImg();
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(this.getLocalImg()), "type");
        this.setOutput(true, null);
        this.setColour(290);
        this.setTooltip('');
        this.setHelpUrl('');
    },
    onchange: function () {
        let typeValue = this.getFieldValue("type");
        //let newImgArr = this.getLocalImg();
        let newImgArr = this.imgArr;
        if (this.haveNewSrc(this.imgArr, newImgArr)) {
            this.imgArr = newImgArr;
            var typeField = this.getField("type");
            typeField.menuGenerator_ = this.imgArr;
            if (this.checkSrc(typeValue, this.imgArr)) {
                this.setFieldValue(typeValue, "type");
            } else {
                this.setFieldValue(this.imgArr[0][1], "type");
            }
        }
    },
    haveNewSrc: function (oldArr, newArr) {
        if (oldArr.length !== newArr.length) return true;
        for (var i = 0; i < oldArr.length; i++) {
            if (oldArr[i][0].src !== newArr[i][0].src) {
                return true;
            }
        }
        return false;
    },
    checkSrc: function (newSrc, srcArr) {
        for (var i = 0; i < srcArr.length; i++) {
            if (srcArr[i][0].src == newSrc) {
                return true;
            }
        }
        return false;
    },
    getLocalImg: function () {
        let imgArr = [];
        try {
            var imgDirArr = ["default.png", "bamboo.png", "pipeline.png"]
            for (var i = 0; i < imgDirArr.length; i++) {
                var dropdownItem = {};
                dropdownItem.src = "./media/mixpyBuild/path/" + imgDirArr[i];
                dropdownItem.width = 40;
                dropdownItem.height = 45;
                dropdownItem.alt = "*";
                var dropdownArr = [];
                dropdownArr.push(dropdownItem);
                var dropdownData = imgDirArr[i].substring(0, imgDirArr[i].lastIndexOf("."));
                dropdownData = '\'' + dropdownData + '\'';
                dropdownArr.push(dropdownData);
                imgArr.push(dropdownArr);
            }
        } catch (e) {
            console.log(e);
            imgArr = [["'无可用路径'", "'无可用路径'"]];
        }
        if (imgArr.length > 0) {
            return imgArr;
        }
        return [["'无可用路径'", "'无可用路径'"]];
    }
};

export const place_item = {
    init: function () {
        this.setColour(290);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.appendValueInput("posx")
            .setCheck(null)
            .appendField("在(");
        this.appendDummyInput()
            .appendField(',');
        this.appendValueInput("posy")
            .setCheck(null)
            .appendField("");
        this.appendDummyInput()
            .appendField(')放置')
            .appendField(new Blockly.FieldDropdown([["障碍", "'wall'"], ["金币", "'coin'"]]), "item");
        this.setTooltip('');
    }
};

export const game_get_character_img = {
    init: function () {
        this.imgArr = this.getLocalImg();
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(this.getLocalImg()), "type");
        this.setOutput(true, null);
        this.setColour(290);
        this.setTooltip('');
        this.setHelpUrl('');
    },
    onchange: function () {
        let typeValue = this.getFieldValue("type");
        //let newImgArr = this.getLocalImg();
        let newImgArr = this.imgArr;
        if (this.haveNewSrc(this.imgArr, newImgArr)) {
            this.imgArr = newImgArr;
            var typeField = this.getField("type");
            typeField.menuGenerator_ = this.imgArr;
            if (this.checkSrc(typeValue, this.imgArr)) {
                this.setFieldValue(typeValue, "type");
            } else {
                this.setFieldValue(this.imgArr[0][1], "type");
            }
        }
    },
    haveNewSrc: function (oldArr, newArr) {
        if (oldArr.length !== newArr.length) return true;
        for (var i = 0; i < oldArr.length; i++) {
            if (oldArr[i][0].src !== newArr[i][0].src) {
                return true;
            }
        }
        return false;
    },
    checkSrc: function (newSrc, srcArr) {
        for (var i = 0; i < srcArr.length; i++) {
            if (srcArr[i][0].src == newSrc) {
                return true;
            }
        }
        return false;
    },
    getLocalImg: function () {
        let imgArr = [];
        try {
            var imgDirArr = ["pegman.png", "astro.png", "panda.png", "robot.png"]
            for (var i = 0; i < imgDirArr.length; i++) {
                var dropdownItem = {};
                dropdownItem.src = "./media/mixpyBuild/characters/" + imgDirArr[i];
                dropdownItem.width = 40;
                dropdownItem.height = 45;
                dropdownItem.alt = "*";
                var dropdownArr = [];
                dropdownArr.push(dropdownItem);
                var dropdownData = imgDirArr[i].substring(0, imgDirArr[i].lastIndexOf("."));
                dropdownData = '\'' + dropdownData + '\'';
                dropdownArr.push(dropdownData);
                imgArr.push(dropdownArr);
            }


        } catch (e) {
            console.log(e);
            imgArr = [["'无可用角色'", "'无可用角色'"]];
        }
        if (imgArr.length > 0) {
            return imgArr;
        }
        return [["'无可用角色'", "'无可用角色'"]];
    }
};


export const initialize = {
    init: function () {
        this.setColour(290);
        this.appendValueInput("character")
            .setCheck(null)
            .appendField("初始化角色为");
        this.appendDummyInput()
            // .appendField('初始化角色为')
            // .appendField(new Blockly.FieldDropdown([["默认⼩⼈","0"],["熊猫","1"],["宇航员","2"],["机器⼈","3"]]), "character")
            .appendField('面朝')
            .appendField(new Blockly.FieldDropdown([["北", "0"], ["南", "2"], ["西", "3"], ["东", "1"]]), "direction");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip('');
    }
};

export const get_actor_point = {
    init: function () {
        this.setColour(290);
        this.appendDummyInput()
            .appendField('获取⻆⾊所获分数');
        this.setOutput(true, Number);
        this.setTooltip('');
    }
};

export const isBarrier = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([["北", "0"], ["南", "2"], ["西", "3"], ["东", "1"]]), "direction");
        this.appendDummyInput()
            .appendField('侧有障碍');
        this.setInputsInline(true);
        this.setOutput(true, null);
        this.setColour(290);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

export const randomOil = {
    init: function () {
        this.appendDummyInput()
            .appendField("随机生成小车油量");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(290);
        this.setTooltip('');
    }
};

export const isOilFull = {
    init: function () {
        this.appendDummyInput()
            .appendField('需要加油');
        this.setOutput(true, null);
        this.setColour(290);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

export const isLightGreen = {
    init: function () {
        this.appendDummyInput()
            .appendField('信号灯为绿灯');
        this.setOutput(true, null);
        this.setColour(290);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

export const isLightRed = {
    init: function () {
        this.appendDummyInput()
            .appendField('信号灯为红灯');
        this.setOutput(true, null);
        this.setColour(290);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

export const addOil = {
    init: function () {
        this.appendDummyInput()
            .appendField("进加油站加油");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(290);
        this.setTooltip('');
    }
};

export const isCirculationRight = {
    init: function () {
        this.appendDummyInput()
            .appendField("检查程序循环数目是否正确");
        this.setPreviousStatement(true);
        this.setColour(290);
        this.setTooltip('');
    }
};