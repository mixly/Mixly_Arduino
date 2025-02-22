import * as Blockly from 'blockly/core';
import { ZhHansMsg, ZhHansCatgories } from './zh-hans';
import { ZhHantMsg, ZhHantCatgories } from './zh-hant';
import { EnMsg, EnCatgories } from './en';

// 载入语言文件
Object.assign(Blockly.Lang.ZhHans, ZhHansMsg);
Object.assign(Blockly.Lang.ZhHant, ZhHantMsg);
Object.assign(Blockly.Lang.En, EnMsg);
Object.assign(Blockly.Lang.ZhHans.MSG, ZhHansCatgories);
Object.assign(Blockly.Lang.ZhHant.MSG, ZhHantCatgories);
Object.assign(Blockly.Lang.En.MSG, EnCatgories);