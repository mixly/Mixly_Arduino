import * as Blockly from 'blockly/core';
import * as Mixly from 'mixly';
import * as path from 'path';

// export const game_init = {
//     init: function() {
//     this.appendDummyInput()
//     .appendField(Blockly.Msg.MIXLY_GAME_INIT);
//     this.setPreviousStatement(true);
//     this.setNextStatement(true);
//     this.setColour(290);
//     this.setTooltip('');
//   }
// };
//初始化地图为第X关
export const initSettedMap = {
    init: function () {
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_GAME_INIT_AS)
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.MIXLY_GAME_ONE, '0'], [Blockly.Msg.MIXLY_GAME_TWO, '1'], [Blockly.Msg.MIXLY_GAME_THREE, '2'], [Blockly.Msg.MIXLY_GAME_FOUR, '3'], [Blockly.Msg.MIXLY_GAME_FIVE, '4'], [Blockly.Msg.MIXLY_GAME_SIX, '5']]), "level");
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
            .appendField(Blockly.Msg.MIXLY_GAME_TOWARD)
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.MIXLY_GAME_RIGHT, '1'], [Blockly.Msg.MIXLY_GAME_DOWN, '2'], [Blockly.Msg.MIXLY_GAME_LEFT, '3'], [Blockly.Msg.MIXLY_GAME_UP, '0']]), "direction");
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_GAME_MOVE);
        this.appendValueInput("times")
            .setCheck(Number)
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_GAME_STEP);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(290);
        this.setTooltip('');
    }
};
// export const move_direction = {
//       init: function() {
//       this.appendDummyInput()
//         .appendField("向")
//         .appendField(new Blockly.FieldDropdown([["东",'1'],["南",'2'],["西",'3'],["北",'0']]), "direction");
//       this.appendDummyInput()
//               .appendField("移动");
//       this.setInputsInline(true);
//       this.setPreviousStatement(true);
//       this.setNextStatement(true);
//       this.setColour(290);
//       this.setTooltip('');
//     }
//   };
// export const move_forward = {
//   init: function() {
//   this.appendDummyInput()
//       .appendField("向前移动");
//   this.setPreviousStatement(true);
//   this.setNextStatement(true);
//   this.setColour(290);
//   this.setTooltip('');
// }
// };


// export const move_backward = {
//   init: function() {
//     this.appendDummyInput()
//           .appendField(Blockly.Msg.MIXLY_GAME_MOVE_BACKWARD);
//   this.setPreviousStatement(true, null);
//   this.setNextStatement(true, null);
//   this.setColour(290);
//   this.setTooltip('');
//   this.setHelpUrl('');
//   }
// };
export const move_related_to_spirite = {
    init: function () {
        var Directions = [
            [Blockly.Msg.MIXLY_GAME_FORWARD, 'f'],
            [Blockly.Msg.MIXLY_GAME_BACKWARD, 'b']
        ];
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_RE_SPIRITE)
            .appendField(Blockly.Msg.MIXLY_GAME_TOWARD)
            .appendField(new Blockly.FieldDropdown(Directions), 'Direction')
            .appendField(Blockly.Msg.MIXLY_GAME_MOVE);
        this.appendValueInput("times")
            .setCheck(Number)
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_GAME_STEP);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(290);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};



export const Turn = {
    init: function () {
        var Directions = [
            [Blockly.Msg.MIXLY_GAME_TURN_LEFT, 'left'],
            [Blockly.Msg.MIXLY_GAME_TURN_RIGHT, 'right']
        ];
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_RE_SPIRITE)
            .appendField(Blockly.Msg.MIXLY_GAME_TOWARD)
            .appendField(new Blockly.FieldDropdown(Directions), 'Direction')
            .appendField(Blockly.Msg.MIXLY_GAME_TURN);
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
            [Blockly.Msg.MIXLY_GAME_UP, "0"],
            [Blockly.Msg.MIXLY_GAME_DOWN, "2"],
            [Blockly.Msg.MIXLY_GAME_RIGHT, "1"],
            [Blockly.Msg.MIXLY_GAME_LEFT, "3"]
        ];
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(Directions), 'Direction')
            .appendField(Blockly.Msg.MIXLY_GAME_ISPATH);
        this.setOutput(true, null);
        this.setColour(290);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

export const is_Related_Path = {
    init: function () {
        var Directions = [[Blockly.Msg.MIXLY_GAME_FORWARD, "f"], [Blockly.Msg.MIXLY_GAME_BACKWARD, "b"], [Blockly.Msg.MIXLY_GAME_LEFT, "l"], [Blockly.Msg.MIXLY_GAME_RIGHT, "r"]];
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_RE_SPIRITE)
            .appendField(new Blockly.FieldDropdown(Directions), 'Direction')
            .appendField(Blockly.Msg.MIXLY_GAME_ISPATH);
        this.setOutput(true, null);
        this.setColour(290);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

//设置地图背景
export const set_map_bg = {
    init: function () {
        this.appendValueInput("background")
            .setCheck(null)
            .appendField(Blockly.Msg.LISTS_SET_INDEX_SET + Blockly.Msg.MIXLY_GAME_BACKGROUND);
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(290);
        this.setTooltip('');
        this.setHelpUrl('');
    }
}

//最新块
export const set_map = {
    init: function () {
        // this.appendDummyInput()
        //     .appendField("设置地图：长");
        this.appendValueInput("x")
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_GAME_SETMAP + Blockly.Msg.MIXLY_GAME_LENGTH_IS);
        this.appendValueInput("y")
            .setCheck(Number)
            .appendField(Blockly.Msg.MIXLY_GAME_WIDTH_IS);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_GAME_STARTPOS_IS + "(");
        this.appendValueInput("startPos_x")
            .setCheck(Number)
        this.appendDummyInput()
            .appendField(",");
        this.appendValueInput("startPos_y")
            .setCheck(Number)
        this.appendDummyInput()
            .appendField(")");
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_GAME_ENDPOS_IS + "(");
        this.appendValueInput("endPos_x")
            .setCheck(Number)
        this.appendDummyInput()
            .appendField(",");
        this.appendValueInput("endPos_y")
            .setCheck(Number)
        this.appendDummyInput()
            .appendField(")");
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
            // let imgDirPath = MixlyEnv.clientPath + "/mixpyBuild/maps/";///改图片路径
            // if (nodeFs.existsSync(imgDirPath)) {
            //   let imgDirArr = nodeFs.readdirSync(imgDirPath);
            //   for (let i = 0; i < imgDirArr.length; i++) {
            //     let imgPathToLowerCase = imgDirArr[i].toLowerCase();
            //     if (imgPathToLowerCase.indexOf(".png") != -1
            //      || imgPathToLowerCase.indexOf(".jpg") != -1
            //      || imgPathToLowerCase.indexOf(".ico") != -1) {
            //       let dropdownItem = {};
            //       dropdownItem.src = MixlyEnv.clientPath + "/mixpyBuild/maps/" + imgDirArr[i];
            //       let dimensions = imagesize("mixpyBuild/maps/" + imgDirArr[i]);
            //       dropdownItem.width = 40;
            //       dropdownItem.height = dimensions.height*40/dimensions.width;
            //       dropdownItem.alt = "*";
            //       let dropdownArr = [];
            //       dropdownArr.push(dropdownItem);
            //       let dropdownData = imgDirArr[i].substring(0, imgDirArr[i].lastIndexOf("."));
            //       dropdownData = '\'' + dropdownData + '\'';
            //       dropdownArr.push(dropdownData);
            //       imgArr.push(dropdownArr);
            //     }
            //   }
            // }
            var imgDirArr = ["bg_default.png", "bg_astro.png", "bg_panda.jpg"]
            for (var i = 0; i < imgDirArr.length; i++) {
                var dropdownItem = {};
                dropdownItem.src = path.join(Mixly.Env.boardDirPath, "media/mixpyBuild/maps", imgDirArr[i]);
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
        return [["'无可用地图'", "'无可用地图'"]]
    }
};


export const set_pathtype = {
    init: function () {
        this.appendValueInput("pathtype")
            .setCheck(null)
            .appendField(Blockly.Msg.MIXLY_GAME_SETPATHTYPE);
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
            // let imgDirPath = MixlyEnv.clientPath + "/mixpyBuild/path/";///改图片路径
            // if (nodeFs.existsSync(imgDirPath)) {
            //   let imgDirArr = nodeFs.readdirSync(imgDirPath);
            //   for (let i = 0; i < imgDirArr.length; i++) {
            //     let imgPathToLowerCase = imgDirArr[i].toLowerCase();
            //     if (imgPathToLowerCase.indexOf(".png") != -1
            //      || imgPathToLowerCase.indexOf(".jpg") != -1
            //      || imgPathToLowerCase.indexOf(".ico") != -1) {
            //       let dropdownItem = {};
            //       dropdownItem.src = MixlyEnv.clientPath + "/mixpyBuild/path/" + imgDirArr[i];
            //       let dimensions = imagesize("mixpyBuild/path/" + imgDirArr[i]);
            //       dropdownItem.width = 40;
            //       dropdownItem.height = dimensions.height*40/dimensions.width;
            //       dropdownItem.alt = "*";
            //       let dropdownArr = [];
            //       dropdownArr.push(dropdownItem);
            //       let dropdownData = imgDirArr[i].substring(0, imgDirArr[i].lastIndexOf("."));
            //       dropdownData = '\'' + dropdownData + '\'';
            //       dropdownArr.push(dropdownData);
            //       imgArr.push(dropdownArr);
            //     }
            //   }
            // }
            var imgDirArr = ["default.png", "bamboo.png", "pipeline.png"]
            for (var i = 0; i < imgDirArr.length; i++) {
                var dropdownItem = {};
                dropdownItem.src = path.join(Mixly.Env.boardDirPath, "media/mixpyBuild/path", imgDirArr[i]);
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
            .appendField(Blockly.Msg.TEXT_APPEND_TO + "(");
        this.appendDummyInput()
            .appendField(',');
        this.appendValueInput("posy")
            .setCheck(null)
            .appendField("");
        this.appendDummyInput()
            .appendField(')' + Blockly.Msg.MIXLY_GAME_LAY)
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.MIXLY_GAME_WALL, "'wall'"], [Blockly.Msg.MIXLY_GAME_BARRIER, "'barrier'"], [Blockly.Msg.MIXLY_GAME_COIN, "'coin'"], [Blockly.Msg.MIXLY_GAME_REDMARKER, "'redmarker'"], [Blockly.Msg.MIXLY_GAME_YELLOWMARKER, "'yellowmarker'"], [Blockly.Msg.MIXLY_GAME_BLUEMARKER, "'bluemarker'"], [Blockly.Msg.MIXLY_GAME_GREENMARKER, "'greenmarker'"]]), "item");
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
            var imgDirArr = ["pegman.png", "astro.png", "panda.png", "robot.png", 'car.png']
            for (var i = 0; i < imgDirArr.length; i++) {
                var dropdownItem = {};
                dropdownItem.src = path.join(Mixly.Env.boardDirPath, "media/mixpyBuild/characters", imgDirArr[i]);
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
            .appendField(Blockly.Msg.MIXLY_GAME_INIT_CHARA)
        this.appendDummyInput().appendField(Blockly.Msg.MIXLY_GAME_FACE + Blockly.Msg.MIXLY_GAME_RIGHT);
        // this.appendDummyInput()
        //     // .appendField('初始化角色为')
        //     // .appendField(new Blockly.FieldDropdown([["默认⼩⼈","0"],["熊猫","1"],["宇航员","2"],["机器⼈","3"]]), "character")
        //     .appendField(Blockly.Msg.MIXLY_GAME_FACE)
        //     .appendField(new Blockly.FieldDropdown([[Blockly.Msg.MIXLY_GAME_NORTH,"0"],[Blockly.Msg.MIXLY_GAME_SOUTH,"2"],[Blockly.Msg.MIXLY_GAME_WEST,"3"],[Blockly.Msg.MIXLY_GAME_EAST,"1"]]), "direction");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip('');
    }
};

export const get_actor_point = {
    init: function () {
        this.setColour(290);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_GAME_GETPOINT);
        this.setOutput(true, Number);
        this.setTooltip('');
    }
};

export const isBarrier = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.MIXLY_GAME_UP, "0"], [Blockly.Msg.MIXLY_GAME_DOWN, "2"], [Blockly.Msg.MIXLY_GAME_LEFT, "3"], [Blockly.Msg.MIXLY_GAME_RIGHT, "1"]]), "direction");
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_GAME_ISBARRIER);
        this.setInputsInline(true);
        this.setOutput(true, null);
        this.setColour(290);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

export const is_Related_Barrier = {
    init: function () {
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_RE_SPIRITE)
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.MIXLY_GAME_FORWARD, "f"], [Blockly.Msg.MIXLY_GAME_BACKWARD, "b"], [Blockly.Msg.MIXLY_GAME_LEFT, "l"], [Blockly.Msg.MIXLY_GAME_RIGHT, "r"]]), "direction");
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_GAME_ISBARRIER);
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
            .appendField(Blockly.Msg.MIXLY_GAME_RANDOMCAROIL);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(290);
        this.setTooltip('');
    }
};

export const isOilFull = {
    init: function () {
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_GAME_NEEDOIL);
        this.setOutput(true, null);
        this.setColour(290);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

export const isLightGreen = {
    init: function () {
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_GAME_ISGREEN);
        this.setOutput(true, null);
        this.setColour(290);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

export const addOil = {
    init: function () {
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_GAME_ADDOIL);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(290);
        this.setTooltip('');
    }
};

export const isCirculationRight = {
    init: function () {
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_GAME_CHECKCIRCURIGHT);
        this.setPreviousStatement(true);
        this.setColour(290);
        this.setTooltip('');
    }
};

export const checkMarker = {
    init: function () {
        this.setColour(290);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_GAME_CHECK_WHETHER_PASS);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.MIXLY_GAME_REDMARKER, "'redmarker'"], [Blockly.Msg.MIXLY_GAME_YELLOWMARKER, "'yellowmarker'"], [Blockly.Msg.MIXLY_GAME_BLUEMARKER, "'bluemarker'"], [Blockly.Msg.MIXLY_GAME_GREENMARKER, "'greenmarker'"]]), "marker");
        this.appendDummyInput()
            .appendField("?");
        this.setInputsInline(true);
        this.setOutput(true, null);
        this.setTooltip('');
    }
};

export const getMarkerNum = {
    init: function () {
        this.setColour(290);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_GAME_GET_MARKER_NUM);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.MIXLY_GAME_REDMARKER, "'redmarker'"], [Blockly.Msg.MIXLY_GAME_YELLOWMARKER, "'yellowmarker'"], [Blockly.Msg.MIXLY_GAME_BLUEMARKER, "'bluemarker'"], [Blockly.Msg.MIXLY_GAME_GREENMARKER, "'greenmarker'"]]), "marker");
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_GAME_NUMBER_OF_MARKER);
        this.setInputsInline(true);
        this.setOutput(true, null);
        this.setTooltip('');
    }
};

export const randomPlaceBarrier = {
    init: function () {
        this.setColour(290);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.appendValueInput("posx")
            .setCheck(null)
            .appendField(Blockly.Msg.TEXT_APPEND_TO + "(");
        this.appendDummyInput()
            .appendField(',');
        this.appendValueInput("posy")
            .setCheck(null)
            .appendField("");
        this.appendDummyInput()
            .appendField(')' + Blockly.Msg.TEXT_GET_INDEX_RANDOM + Blockly.Msg.MIXLY_GAME_LAY + Blockly.Msg.MIXLY_GAME_BARRIER)
        this.setTooltip('');
    }
};

//初始化为简单的迷宫地图，第X关
export const settedSimpleMap = {
    init: function () {
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_GAME_INIT_AS)
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.MIXLY_GAME_ONE, '0'], [Blockly.Msg.MIXLY_GAME_TWO, '1'], [Blockly.Msg.MIXLY_GAME_THREE, '2'], [Blockly.Msg.MIXLY_GAME_FOUR, '3'], [Blockly.Msg.MIXLY_GAME_FIVE, '4'], [Blockly.Msg.MIXLY_GAME_SIX, '5'], [Blockly.Msg.MIXLY_GAME_SEVEN, '6'], [Blockly.Msg.MIXLY_GAME_EIGHT, '7'], [Blockly.Msg.MIXLY_GAME_NINE, '8']
                , [Blockly.Msg.MIXLY_GAME_TEN, '9'], [Blockly.Msg.MIXLY_GAME_ELE, '10'], [Blockly.Msg.MIXLY_GAME_TWEL, '11'], [Blockly.Msg.MIXLY_GAME_THIR, '12'], [Blockly.Msg.MIXLY_GAME_FORT, '13'], [Blockly.Msg.MIXLY_GAME_FIFT, '14'], [Blockly.Msg.MIXLY_GAME_SIXT, '15'], [Blockly.Msg.MIXLY_GAME_SEVENT, '16']]), "level");
        this.setInputsInline(true);
        this.setNextStatement(true);
        this.setColour(290);
        this.setTooltip('');
    }
};

export const find_books_by_dichotomy = {
    init: function () {
        this.appendValueInput("N")
            .setCheck(null)
            .setAlign(Blockly.inputs.Align.LEFT)
            .appendField("二分法查找书籍")
            .appendField("N");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(290);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

export const find_books_by_sequence = {
    init: function () {
        this.appendValueInput("N")
            .setCheck(null)
            .setAlign(Blockly.inputs.Align.LEFT)
            .appendField("顺序法查找书籍")
            .appendField("N");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(290);
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

