import * as Blockly from 'blockly/core';

const ETHERNET_HUE = 0;
const WEATHER_HUE = "#27b6ac";

/**
 * @name 模块名 Http GET请求
 * @support 支持板卡 {ESP8266, ESP32, ESP32C3, ESP32S2, ESP32S3}
 */
export const http_get = {
    init: function () {
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_ETHERNET_CLINET_GET_REQUEST);
        this.appendValueInput("api")
            .setCheck(null)
            .appendField(Blockly.Msg.blynk_SERVER_ADD);
        this.appendStatementInput("success")
            .setCheck(null)
            .appendField(Blockly.Msg.MIXLY_SUCCESS);
        this.appendStatementInput("failure")
            .setCheck(null)
            .appendField(Blockly.Msg.MIXLY_FAILED);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(ETHERNET_HUE);
        this.setTooltip("");
    }
};

/**
 * @name 模块名 Http PATCH|POST|PUT请求
 * @support 支持板卡 {ESP8266, ESP32, ESP32C3, ESP32S2, ESP32S3}
 */
export const http_post = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                ["POST", "POST"],
                ["PATCH", "PATCH"],
                ["PUT", "PUT"]
            ]), "TYPE")
            .appendField(Blockly.Msg.blockpy_REQUESTS);
        this.appendValueInput("api")
            .setCheck(null)
            .appendField(Blockly.Msg.blynk_SERVER_ADD);
        this.appendValueInput("data")
            .setCheck(null)
            .appendField(Blockly.Msg.MIXLY_SD_DATA);
        this.appendStatementInput("success")
            .setCheck(null)
            .appendField(Blockly.Msg.MIXLY_SUCCESS);
        this.appendStatementInput("failure")
            .setCheck(null)
            .appendField(Blockly.Msg.MIXLY_FAILED);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(ETHERNET_HUE);
        this.setTooltip("");
    }
};

const CITYS_DATA = {
    "本地": {
        "-": {
            "pinyin": "ip"
        }
    },
    "北京": {
        "-": {
            "pinyin": "beijing"
        }
    },
    "天津": {
        "-": {
            "pinyin": "tianjin"
        }
    },
    "河北": {
        "石家庄": {
            "pinyin": "shijiazhuang"
        },
        "邯郸": {
            "pinyin": "handan"
        },
        "邢台": {
            "pinyin": "xingtai"
        },
        "衡水": {
            "pinyin": "hengshui"
        },
        "保定": {
            "pinyin": "baoding"
        },
        "沧州": {
            "pinyin": "cangzhou"
        },
        "张家口": {
            "pinyin": "zhangjiakou"
        },
        "廊坊": {
            "pinyin": "langfang"
        },
        "承德": {
            "pinyin": "chengde"
        },
        "唐山": {
            "pinyin": "tangshan"
        },
        "秦皇岛": {
            "pinyin": "qinhuangdao"
        }
    },
    "山西": {
        "太原": {
            "pinyin": "taiyuan"
        },
        "运城": {
            "pinyin": "yuncheng"
        },
        "临汾": {
            "pinyin": "linfen"
        },
        "吕梁": {
            "pinyin": "lvliang"
        },
        "朔州": {
            "pinyin": "shuozhou"
        },
        "晋城": {
            "pinyin": "jincheng"
        },
        "长治": {
            "pinyin": "changzhi"
        },
        "晋中": {
            "pinyin": "jinzhong"
        },
        "阳泉": {
            "pinyin": "yangquan"
        },
        "忻州": {
            "pinyin": "xinzhou"
        },
        "大同": {
            "pinyin": "datong"
        }
    },
    "内蒙古": {
        "呼和浩特": {
            "pinyin": "huhehaote"
        },
        "阿左旗": {
            "pinyin": "azuoqi"
        },
        "乌海": {
            "pinyin": "wuhai"
        },
        "临河": {
            "pinyin": "linhe"
        },
        "鄂尔多斯": {
            "pinyin": "eerduosi"
        },
        "包头": {
            "pinyin": "baotou"
        },
        "集宁": {
            "pinyin": "jining"
        },
        "锡林浩特": {
            "pinyin": "xilinhaote"
        },
        "赤峰": {
            "pinyin": "chifeng"
        },
        "通辽": {
            "pinyin": "tongliao"
        },
        "乌兰浩特": {
            "pinyin": "wulanhaote"
        },
        "海拉尔": {
            "pinyin": "hailaer"
        }
    },
    "辽宁": {
        "沈阳": {
            "pinyin": "shenyang"
        },
        "大连": {
            "pinyin": "dalian"
        },
        "葫芦岛": {
            "pinyin": "huludao"
        },
        "朝阳": {
            "pinyin": "chaoyang"
        },
        "营口": {
            "pinyin": "yingkou"
        },
        "锦州": {
            "pinyin": "jinzhou"
        },
        "盘锦": {
            "pinyin": "panjin"
        },
        "阜新": {
            "pinyin": "fuxin"
        },
        "鞍山": {
            "pinyin": "anshan"
        },
        "辽阳": {
            "pinyin": "liaoyang"
        },
        "丹东": {
            "pinyin": "dandong"
        },
        "本溪": {
            "pinyin": "benxi"
        },
        "抚顺": {
            "pinyin": "fushun"
        },
        "铁岭": {
            "pinyin": "tieling"
        }
    },
    "吉林": {
        "长春": {
            "pinyin": "changchun"
        },
        "通化": {
            "pinyin": "tonghua"
        },
        "白山": {
            "pinyin": "baishan"
        },
        "辽源": {
            "pinyin": "liaoyuan"
        },
        "四平": {
            "pinyin": "siping"
        },
        "吉林": {
            "pinyin": "jilin"
        },
        "延吉": {
            "pinyin": "yanji"
        },
        "白城": {
            "pinyin": "baicheng"
        },
        "松原": {
            "pinyin": "songyuan"
        }
    },
    "黑龙江": {
        "哈尔滨": {
            "pinyin": "haerbin"
        },
        "牡丹江": {
            "pinyin": "mudanjiang"
        },
        "大庆": {
            "pinyin": "daqing"
        },
        "齐齐哈尔": {
            "pinyin": "qiqihaer"
        },
        "绥化": {
            "pinyin": "suihua"
        },
        "伊春": {
            "pinyin": "yichun"
        },
        "大兴安岭": {
            "pinyin": "daxinganling"
        },
        "黑河": {
            "pinyin": "heihe"
        },
        "鸡西": {
            "pinyin": "jixi"
        },
        "七台河": {
            "pinyin": "qitaihe"
        },
        "佳木斯": {
            "pinyin": "jiamusi"
        },
        "鹤岗": {
            "pinyin": "hegang"
        },
        "双鸭山": {
            "pinyin": "shuangyashan"
        }
    },
    "上海": {
        "-": {
            "pinyin": "shanghai"
        }
    },
    "江苏": {
        "南京": {
            "pinyin": "nanjing"
        },
        "镇江": {
            "pinyin": "zhenjiang"
        },
        "苏州": {
            "pinyin": "suzhou"
        },
        "无锡": {
            "pinyin": "wuxi"
        },
        "常州": {
            "pinyin": "changzhou"
        },
        "南通": {
            "pinyin": "nantong"
        },
        "扬州": {
            "pinyin": "yangzhou"
        },
        "淮安": {
            "pinyin": "huaian"
        },
        "泰州": {
            "pinyin": "taizhou"
        },
        "盐城": {
            "pinyin": "yancheng"
        },
        "徐州": {
            "pinyin": "xuzhou"
        },
        "宿迁": {
            "pinyin": "suqian"
        },
        "连云港": {
            "pinyin": "lianyungang"
        }
    },
    "浙江": {
        "杭州": {
            "pinyin": "hangzhou"
        },
        "温州": {
            "pinyin": "wenzhou"
        },
        "衢州": {
            "pinyin": "quzhou"
        },
        "丽水": {
            "pinyin": "lishui"
        },
        "金华": {
            "pinyin": "jinhua"
        },
        "绍兴": {
            "pinyin": "shaoxing"
        },
        "湖州": {
            "pinyin": "huzhou"
        },
        "嘉兴": {
            "pinyin": "jiaxing"
        },
        "台州": {
            "pinyin": "taizhou"
        },
        "宁波": {
            "pinyin": "ningbo"
        },
        "舟山": {
            "pinyin": "zhoushan"
        }
    },
    "安徽": {
        "合肥": {
            "pinyin": "hefei"
        },
        "安庆": {
            "pinyin": "anqing"
        },
        "池州": {
            "pinyin": "chizhou"
        },
        "铜陵": {
            "pinyin": "tongling"
        },
        "六安": {
            "pinyin": "luan"
        },
        "阜阳": {
            "pinyin": "fuyang"
        },
        "淮南": {
            "pinyin": "huainan"
        },
        "蚌埠": {
            "pinyin": "bengbu"
        },
        "宿州": {
            "pinyin": "suzhou"
        },
        "黄山": {
            "pinyin": "huangshan"
        },
        "宣城": {
            "pinyin": "xuancheng"
        },
        "芜湖": {
            "pinyin": "wuhu"
        },
        "马鞍山": {
            "pinyin": "maanshan"
        },
        "滁州": {
            "pinyin": "chuzhou"
        },
        "亳州": {
            "pinyin": "bozhou"
        },
        "淮北": {
            "pinyin": "huaibei"
        }
    },
    "福建": {
        "福州": {
            "pinyin": "fuzhou"
        },
        "漳州": {
            "pinyin": "zhangzhou"
        },
        "厦门": {
            "pinyin": "xiamen"
        },
        "龙岩": {
            "pinyin": "longyan"
        },
        "三明": {
            "pinyin": "sanming"
        },
        "泉州": {
            "pinyin": "quanzhou"
        },
        "莆田": {
            "pinyin": "putian"
        },
        "南平": {
            "pinyin": "nanping"
        },
        "宁德": {
            "pinyin": "ningde"
        }
    },
    "江西": {
        "南昌": {
            "pinyin": "nanchang"
        },
        "赣州": {
            "pinyin": "ganzhou"
        },
        "萍乡": {
            "pinyin": "pingxiang"
        },
        "吉安": {
            "pinyin": "jian"
        },
        "宜春": {
            "pinyin": "yichun"
        },
        "新余": {
            "pinyin": "xinyu"
        },
        "抚州": {
            "pinyin": "fuzhou"
        },
        "鹰潭": {
            "pinyin": "yingtan"
        },
        "上饶": {
            "pinyin": "shangrao"
        },
        "景德镇": {
            "pinyin": "jingdezhen"
        },
        "九江": {
            "pinyin": "jiujiang"
        }
    },
    "山东": {
        "济南": {
            "pinyin": "jinan"
        },
        "枣庄": {
            "pinyin": "zaozhuang"
        },
        "菏泽": {
            "pinyin": "heze"
        },
        "济宁": {
            "pinyin": "jining"
        },
        "聊城": {
            "pinyin": "liaocheng"
        },
        "泰安": {
            "pinyin": "taian"
        },
        "莱芜": {
            "pinyin": "laiwu"
        },
        "德州": {
            "pinyin": "dezhou"
        },
        "淄博": {
            "pinyin": "zibo"
        },
        "滨州": {
            "pinyin": "binzhou"
        },
        "临沂": {
            "pinyin": "linyi"
        },
        "日照": {
            "pinyin": "rizhao"
        },
        "青岛": {
            "pinyin": "qingdao"
        },
        "潍坊": {
            "pinyin": "weifang"
        },
        "东营": {
            "pinyin": "dongying"
        },
        "烟台": {
            "pinyin": "yantai"
        },
        "威海": {
            "pinyin": "weihai"
        }
    },
    "河南": {
        "郑州": {
            "pinyin": "zhengzhou"
        },
        "三门峡": {
            "pinyin": "sanmenxia"
        },
        "洛阳": {
            "pinyin": "luoyang"
        },
        "信阳": {
            "pinyin": "xinyang"
        },
        "南阳": {
            "pinyin": "nanyang"
        },
        "驻马店": {
            "pinyin": "zhumadian"
        },
        "漯河": {
            "pinyin": "luohe"
        },
        "周口": {
            "pinyin": "zhoukou"
        },
        "平顶山": {
            "pinyin": "pingdingshan"
        },
        "许昌": {
            "pinyin": "xuchang"
        },
        "济源": {
            "pinyin": "jiyuan"
        },
        "开封": {
            "pinyin": "kaifeng"
        },
        "焦作": {
            "pinyin": "jiaozuo"
        },
        "新乡": {
            "pinyin": "xinxiang"
        },
        "鹤壁": {
            "pinyin": "hebi"
        },
        "濮阳": {
            "pinyin": "puyang"
        },
        "安阳": {
            "pinyin": "anyang"
        },
        "商丘": {
            "pinyin": "shangqiu"
        }
    },
    "湖北": {
        "武汉": {
            "pinyin": "wuhan"
        },
        "恩施": {
            "pinyin": "enshi"
        },
        "宜昌": {
            "pinyin": "yichang"
        },
        "荆州": {
            "pinyin": "jingzhou"
        },
        "神农架": {
            "pinyin": "shennongjia"
        },
        "荆门": {
            "pinyin": "jingmen"
        },
        "襄阳": {
            "pinyin": "xiangyang"
        },
        "十堰": {
            "pinyin": "shiyan"
        },
        "潜江": {
            "pinyin": "qianjiang"
        },
        "天门": {
            "pinyin": "tianmen"
        },
        "仙桃": {
            "pinyin": "xiantao"
        },
        "咸宁": {
            "pinyin": "xianning"
        },
        "黄石": {
            "pinyin": "huangshi"
        },
        "孝感": {
            "pinyin": "xiaogan"
        },
        "鄂州": {
            "pinyin": "ezhou"
        },
        "黄冈": {
            "pinyin": "huanggang"
        },
        "随州": {
            "pinyin": "suizhou"
        }
    },
    "湖南": {
        "长沙": {
            "pinyin": "changsha"
        },
        "永州": {
            "pinyin": "yongzhou"
        },
        "怀化": {
            "pinyin": "huaihua"
        },
        "邵阳": {
            "pinyin": "shaoyang"
        },
        "娄底": {
            "pinyin": "loudi"
        },
        "吉首": {
            "pinyin": "jishou"
        },
        "张家界": {
            "pinyin": "zhangjiajie"
        },
        "益阳": {
            "pinyin": "yiyang"
        },
        "常德": {
            "pinyin": "changde"
        },
        "郴州": {
            "pinyin": "chenzhou"
        },
        "衡阳": {
            "pinyin": "hengyang"
        },
        "湘潭": {
            "pinyin": "xiangtan"
        },
        "株洲": {
            "pinyin": "zhuzhou"
        },
        "岳阳": {
            "pinyin": "yueyang"
        }
    },
    "广东": {
        "广州": {
            "pinyin": "guangzhou"
        },
        "湛江": {
            "pinyin": "zhanjiang"
        },
        "茂名": {
            "pinyin": "maoming"
        },
        "阳江": {
            "pinyin": "yangjiang"
        },
        "珠海": {
            "pinyin": "zhuhai"
        },
        "云浮": {
            "pinyin": "yunfu"
        },
        "肇庆": {
            "pinyin": "zhaoqing"
        },
        "江门": {
            "pinyin": "jiangmen"
        },
        "佛山": {
            "pinyin": "foshan"
        },
        "中山": {
            "pinyin": "zhongshan"
        },
        "东莞": {
            "pinyin": "dongguan"
        },
        "清远": {
            "pinyin": "qingyuan"
        },
        "深圳": {
            "pinyin": "shenzhen"
        },
        "惠州": {
            "pinyin": "huizhou"
        },
        "河源": {
            "pinyin": "heyuan"
        },
        "韶关": {
            "pinyin": "shaoguan"
        },
        "汕尾": {
            "pinyin": "shanwei"
        },
        "汕头": {
            "pinyin": "shantou"
        },
        "揭阳": {
            "pinyin": "jieyang"
        },
        "潮州": {
            "pinyin": "chaozhou"
        },
        "梅州": {
            "pinyin": "meizhou"
        }
    },
    "广西": {
        "南宁": {
            "pinyin": "nanning"
        },
        "崇左": {
            "pinyin": "chongzuo"
        },
        "防城港": {
            "pinyin": "fangchenggang"
        },
        "北海": {
            "pinyin": "beihai"
        },
        "钦州": {
            "pinyin": "qinzhou"
        },
        "百色": {
            "pinyin": "baise"
        },
        "贵港": {
            "pinyin": "guigang"
        },
        "来宾": {
            "pinyin": "laibin"
        },
        "河池": {
            "pinyin": "hechi"
        },
        "柳州": {
            "pinyin": "liuzhou"
        },
        "玉林": {
            "pinyin": "yulin"
        },
        "梧州": {
            "pinyin": "wuzhou"
        },
        "桂林": {
            "pinyin": "guilin"
        },
        "贺州": {
            "pinyin": "hezhou"
        }
    },
    "海南": {
        "海口": {
            "pinyin": "haikou"
        },
        "西沙": {
            "pinyin": "xisha"
        },
        "三亚": {
            "pinyin": "sanya"
        },
        "乐东": {
            "pinyin": "ledong"
        },
        "五指山": {
            "pinyin": "wuzhishan"
        },
        "东方": {
            "pinyin": "dongfang"
        },
        "昌江": {
            "pinyin": "changjiang"
        },
        "白沙": {
            "pinyin": "baisha"
        },
        "儋州": {
            "pinyin": "danzhou"
        },
        "保亭": {
            "pinyin": "baoting"
        },
        "陵水": {
            "pinyin": "lingshui"
        },
        "万宁": {
            "pinyin": "wanning"
        },
        "琼中": {
            "pinyin": "qiongzhong"
        },
        "屯昌": {
            "pinyin": "tunchang"
        },
        "琼海": {
            "pinyin": "qionghai"
        },
        "文昌": {
            "pinyin": "wenchang"
        },
        "临高": {
            "pinyin": "lingao"
        },
        "澄迈": {
            "pinyin": "chengmai"
        },
        "定安": {
            "pinyin": "dingan"
        },
        "南沙": {
            "pinyin": "nansha"
        },
        "中沙": {
            "pinyin": "wuzhishan"
        }
    },
    "重庆": {
        "-": {
            "pinyin": "chongqing"
        }
    },
    "四川": {
        "成都": {
            "pinyin": "chengdu"
        },
        "甘孜": {
            "pinyin": "ganzi"
        },
        "攀枝花": {
            "pinyin": "panzhihua"
        },
        "凉山": {
            "pinyin": "liangshan"
        },
        "雅安": {
            "pinyin": "yaan"
        },
        "乐山": {
            "pinyin": "leshan"
        },
        "眉山": {
            "pinyin": "meishan"
        },
        "宜宾": {
            "pinyin": "yibin"
        },
        "泸州": {
            "pinyin": "luzhou"
        },
        "自贡": {
            "pinyin": "zigong"
        },
        "资阳": {
            "pinyin": "ziyang"
        },
        "内江": {
            "pinyin": "neijiang"
        },
        "遂宁": {
            "pinyin": "suining"
        },
        "南充": {
            "pinyin": "nanchong"
        },
        "广安": {
            "pinyin": "guangan"
        },
        "阿坝": {
            "pinyin": "aba"
        },
        "德阳": {
            "pinyin": "deyang"
        },
        "绵阳": {
            "pinyin": "mianyang"
        },
        "巴中": {
            "pinyin": "bazhong"
        },
        "广元": {
            "pinyin": "guangyuan"
        },
        "达州": {
            "pinyin": "dazhou"
        }
    },
    "贵州": {
        "贵阳": {
            "pinyin": "guiyang"
        },
        "兴义": {
            "pinyin": "xingyi"
        },
        "水城": {
            "pinyin": "shuicheng"
        },
        "安顺": {
            "pinyin": "anshun"
        },
        "毕节": {
            "pinyin": "bijie"
        },
        "都匀": {
            "pinyin": "duyun"
        },
        "凯里": {
            "pinyin": "kaili"
        },
        "遵义": {
            "pinyin": "zunyi"
        },
        "铜仁": {
            "pinyin": "tongren"
        }
    },
    "云南": {
        "昆明": {
            "pinyin": "kunming"
        },
        "景洪": {
            "pinyin": "jinghong"
        },
        "普洱": {
            "pinyin": "puer"
        },
        "临沧": {
            "pinyin": "lincang"
        },
        "德宏": {
            "pinyin": "dehong"
        },
        "保山": {
            "pinyin": "baoshan"
        },
        "怒江": {
            "pinyin": "nujiang"
        },
        "大理": {
            "pinyin": "dali"
        },
        "香格里拉": {
            "pinyin": "xianggelila"
        },
        "丽江": {
            "pinyin": "lijiang"
        },
        "红河": {
            "pinyin": "honghe"
        },
        "玉溪": {
            "pinyin": "yuxi"
        },
        "楚雄": {
            "pinyin": "chuxiong"
        },
        "文山": {
            "pinyin": "wenshan"
        },
        "曲靖": {
            "pinyin": "qujing"
        },
        "昭通": {
            "pinyin": "zhaotong"
        }
    },
    "西藏": {
        "拉萨": {
            "pinyin": "lasa"
        },
        "阿里": {
            "pinyin": "ali"
        },
        "日喀则": {
            "pinyin": "rikaze"
        },
        "山南": {
            "pinyin": "shannan"
        },
        "林芝": {
            "pinyin": "linzhi"
        },
        "那曲": {
            "pinyin": "naqu"
        },
        "昌都": {
            "pinyin": "changdu"
        }
    },
    "陕西": {
        "西安": {
            "pinyin": "xian"
        },
        "汉中": {
            "pinyin": "hanzhong"
        },
        "安康": {
            "pinyin": "ankang"
        },
        "宝鸡": {
            "pinyin": "baoji"
        },
        "杨凌": {
            "pinyin": "yangling"
        },
        "咸阳": {
            "pinyin": "xianyang"
        },
        "铜川": {
            "pinyin": "tongchuan"
        },
        "渭南": {
            "pinyin": "weinan"
        },
        "商洛": {
            "pinyin": "shangluo"
        },
        "延安": {
            "pinyin": "yanan"
        },
        "榆林": {
            "pinyin": "yulin"
        }
    },
    "甘肃": {
        "兰州": {
            "pinyin": "lanzhou"
        },
        "武都": {
            "pinyin": "wudu"
        },
        "张掖": {
            "pinyin": "zhangye"
        },
        "嘉峪关": {
            "pinyin": "jiayuguan"
        },
        "酒泉": {
            "pinyin": "jiuquan"
        },
        "合作": {
            "pinyin": "hezuo"
        },
        "临夏": {
            "pinyin": "linxia"
        },
        "天水": {
            "pinyin": "tianshui"
        },
        "定西": {
            "pinyin": "dingxi"
        },
        "白银": {
            "pinyin": "baiyin"
        },
        "平凉": {
            "pinyin": "pingliang"
        },
        "武威": {
            "pinyin": "wuwei"
        },
        "金昌": {
            "pinyin": "jinchang"
        },
        "庆阳": {
            "pinyin": "qingyang"
        }
    },
    "青海": {
        "西宁": {
            "pinyin": "xining"
        },
        "玉树": {
            "pinyin": "yushu"
        },
        "格尔木": {
            "pinyin": "geermu"
        },
        "果洛": {
            "pinyin": "guoluo"
        },
        "海南": {
            "pinyin": "hainan"
        },
        "海西": {
            "pinyin": "haixi"
        },
        "海北": {
            "pinyin": "haibei"
        },
        "黄南": {
            "pinyin": "huangnan"
        },
        "海东": {
            "pinyin": "haidong"
        }
    },
    "宁夏": {
        "银川": {
            "pinyin": "yinchuan"
        },
        "固原": {
            "pinyin": "guyuan"
        },
        "中卫": {
            "pinyin": "zhongwei"
        },
        "吴忠": {
            "pinyin": "wuzhong"
        },
        "石嘴山": {
            "pinyin": "shizuishan"
        }
    },
    "新疆": {
        "乌鲁木齐": {
            "pinyin": "wulumuqi"
        },
        "喀什": {
            "pinyin": "kashi"
        },
        "阿图什": {
            "pinyin": "atushi"
        },
        "和田": {
            "pinyin": "hetian"
        },
        "阿拉尔": {
            "pinyin": "alaer"
        },
        "阿克苏": {
            "pinyin": "akesu"
        },
        "伊宁": {
            "pinyin": "yining"
        },
        "博乐": {
            "pinyin": "bole"
        },
        "库尔勒": {
            "pinyin": "kuerle"
        },
        "石河子": {
            "pinyin": "shihezi"
        },
        "吐鲁番": {
            "pinyin": "tulufan"
        },
        "昌吉": {
            "pinyin": "changji"
        },
        "五家渠": {
            "pinyin": "wujiaqu"
        },
        "塔城": {
            "pinyin": "tacheng"
        },
        "克拉玛依": {
            "pinyin": "kelamayi"
        },
        "阿勒泰": {
            "pinyin": "aletai"
        },
        "哈密": {
            "pinyin": "hami"
        }
    },
    "香港": {
        "-": {
            "pinyin": "hong kong"
        }
    },
    "澳门": {
        "-": {
            "pinyin": "macao"
        }
    },
    "台湾": {
        "台北": {
            "pinyin": "taipei"
        },
        "高雄": {
            "pinyin": "gaoxiong"
        },
        "台中": {
            "pinyin": "taizhong"
        }
    }
};

var PROVINCES = [], key;
for (key in CITYS_DATA)
    PROVINCES.push([key, key]);


function getCitysByProvince(a) {
    var b = [], c;
    for (c in CITYS_DATA[a])
        b.push([c, c]);
    return b;
}

var citysByProvince = {};
for (key of PROVINCES) {
    citysByProvince[key[0]] = getCitysByProvince(key[0]);
}

export const china_city = {
    init: function () {
        const defaultOptions = [["-", "-"]];
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(PROVINCES), "province")
            .appendField(new Blockly.FieldDependentDropdown("province", citysByProvince, defaultOptions), "city");
        this.setInputsInline(true);
        this.setOutput(true, null);
        this.setColour(WEATHER_HUE);
        this.setHelpUrl("");
        this.preProvince = null;
    }
};

export const weather_private_key = {
    init: function () {
        this.setColour(WEATHER_HUE);
        this.appendDummyInput("")
            .appendField(new Blockly.FieldDropdown([['S9l2sb_ZK-UsWaynG', 'S9l2sb_ZK-UsWaynG'], ['SpRpSYb7QOMT0M8Tz', 'SpRpSYb7QOMT0M8Tz'], ['SboqGMxP4tYNXUN8f', 'SboqGMxP4tYNXUN8f'], ['SJiRrYGYFkGnfi081', 'SJiRrYGYFkGnfi081'], ['SMhSshUxuTL0GLVLS', 'SMhSshUxuTL0GLVLS']]), 'key');
        this.setOutput(true, null);
    }
};

export const weather_seniverse_city_weather = {
    init: function () {
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MSG.catweather)
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.MIXLY_LIVE_WEATHER, "weather/now"], [Blockly.Msg.MIXLY_3_DAY_WEATHER_FORECAST, "weather/daily"], [Blockly.Msg.MIXLY_6_LIFE_INDEXES, "life/suggestion"]]), "api")
            .appendField(Blockly.Msg.MIXLY_INFORMATION_CONFIGURATION);
        this.appendValueInput("location")
            .setCheck(null)
            .appendField(Blockly.Msg.MIXLY_GEOGRAPHIC_LOCATION);
        this.appendValueInput("private_key")
            .setCheck(null)
            .appendField(Blockly.Msg.MIXLY_API_PRIVATE_KEY);
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_LANGUAGE)
            .appendField(new Blockly.FieldDropdown([["简体中文", "zh-Hans"], ["繁體中文", "zh-Hant"], ["English", "en"]]), "language");
        this.appendDummyInput("")
            .appendField(Blockly.Msg.MIXLY_TEMPERATURE_UNIT)
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.MIXLY_CELSIUS + "(℃)", "c"], [Blockly.Msg.MIXLY_FAHRENHEIT + "(℉)", "f"]]), "unit");
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(WEATHER_HUE);
        this.setTooltip("这里的API私钥免费体验有次数限制\n访问频率限制20次/分钟");
        this.setHelpUrl("");
    }
};


export const weather_get_seniverse_weather_info = {
    init: function () {
        this.appendDummyInput("")
            //.appendField("心知天气")
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.MIXLY_LIVE_WEATHER, "weather/now"], [Blockly.Msg.MIXLY_3_DAY_WEATHER_FORECAST, "weather/daily"], [Blockly.Msg.MIXLY_6_LIFE_INDEXES, "life/suggestion"]]), "api")
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.MIXLY_AVAILABLE, "update"], [Blockly.Msg.MIXLY_GET_DATA_UPDATE_TIME, "getLastUpdate"], [Blockly.Msg.MIXLY_GET_SERVER_RESPONSE_STATUS_CODE, "getServerCode"]]), "type");
        this.setInputsInline(true);
        this.setOutput(true, null);
        this.setColour(WEATHER_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }

};

export const weather_get_seniverse_weather_info1 = {
    init: function () {
        this.appendDummyInput("")
            //.appendField("心知天气")
            .appendField(Blockly.Msg.MIXLY_LIVE_WEATHER)
            .appendField(Blockly.Msg.MIXLY_GET)
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.MIXLY_WEATHER_PHENOMENON, "getWeatherText"], [Blockly.Msg.MIXLY_WEATHER_PHENOMENON_CODE, "getWeatherCode"], [Blockly.Msg.MIXLY_TEMPERATURE, "getDegree"]]), "type");
        this.setInputsInline(true);
        this.setOutput(true, null);
        this.setColour(WEATHER_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }

};

export const weather_get_seniverse_weather_info2 = {
    init: function () {
        this.appendDummyInput("")
            //.appendField("心知天气")
            .appendField(Blockly.Msg.MIXLY_3_DAY_WEATHER_FORECAST)
            .appendField(Blockly.Msg.MIXLY_GET)
            .appendField(new Blockly.FieldDropdown([[Blockly.Msg.MIXLY_TODAY, "0"], [Blockly.Msg.MIXLY_TOMORROW, "1"], [Blockly.Msg.MIXLY_DAY_AFTER_TOMORROW, "2"]]), "date")
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.ForecastHigh, "getHigh"],
                [Blockly.Msg.ForecastLow, "getLow"],
                [Blockly.Msg.MIXLY_DAYTIME_WEATHER_PHENOMENON, "getDayText"],
                [Blockly.Msg.MIXLY_DAYTIME_WEATHER_PHENOMENON_CODE, "getDayCode"],
                [Blockly.Msg.MIXLY_EVENING_WEATHER_PHENOMENON, "getNightText"],
                [Blockly.Msg.MIXLY_EVENING_WEATHER_PHENOMENON_CODE, "getNightCode"],
                [Blockly.Msg.MIXLY_PROBABILITY_OF_PRECIPITATION, "getRain"],
                [Blockly.Msg.ForecastFx, "getWindDirection"],
                [Blockly.Msg.MIXLY_WIND_SPEED, "getWindSpeed"],
                [Blockly.Msg.MIXLY_WIND_RATING, "getWindScale"],
                [Blockly.Msg.MIXLY_Humidity, "getHumidity"]
            ]), "type");
        this.setInputsInline(true);
        this.setOutput(true, null);
        this.setColour(WEATHER_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

export const weather_get_seniverse_weather_info3 = {
    init: function () {
        this.appendDummyInput("")
            //.appendField("心知天气")
            .appendField(Blockly.Msg.MIXLY_6_LIFE_INDEXES)
            .appendField(Blockly.Msg.MIXLY_GET)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLY_CAR_WASH_INDEX, "getCarWash"],
                [Blockly.Msg.MIXLY_DRESSING_INDEX, "getDressing"],
                [Blockly.Msg.MIXLY_COLD_INDEX, "getFactorFlu"],
                [Blockly.Msg.MIXLY_MOVEMENT_INDEX, "getExercise"],
                [Blockly.Msg.MIXLY_TOURISM_INDEX, "getTravel"],
                [Blockly.Msg.MIXLY_UV_INDEX, "getUV"]]
            ), "type");
        this.setInputsInline(true);
        this.setOutput(true, null);
        this.setColour(WEATHER_HUE);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};