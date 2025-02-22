goog.loadJs('common', () => {

goog.require('Mixly.Env');
goog.require('Mixly.Config');
goog.require('Mixly.Storage');
goog.provide('Mixly.BoardConfigItem');

const {
    Env,
    Config,
    Storage
} = Mixly;

const { USER, BOARD } = Config;

class BoardConfigItem {
    /**
     * @param boardName {string} 板卡名
     * @param boardInfo {object} 某个板卡的配置信息
        ------------------------------------------
        "板卡名": {
            "group": "板卡所处分组",
            "key": "板卡key",
            "config": [
                {
                    "label": "配置x的描述信息",
                    "key": "配置x的key",
                    "options": [
                        {
                            "key": "选项x的key",
                            "label": "选项x"
                        },
                        ...
                    ]
                },
                ...
            ],
            ignore: []
        }
        ------------------------------------------
        // 不支持
        "板卡名": {
            "key": "板卡key",
            "config": {
                "配置x的key": [
                    {
                        "key": "选项x的key",
                        "label": "选项x"
                    },
                    ...
                ],
                ...
            }
        }
        ------------------------------------------
        "板卡名": "板卡key"
        ------------------------------------------
     * 
     **/
    constructor(boardName, boardInfo) {
        this.name = boardName;
        this.config = { ...boardInfo.config };
        this.ignore = [];
        if (typeof boardInfo === 'string') {
            this.key = boardInfo;
        } else if (boardInfo instanceof Object) {
            this.key = boardInfo.key;
            this.ignore = boardInfo.ignore ?? [];
            this.group = boardInfo.group;
        } else {
            this.key = boardName;
        }
        this.generateOptions();
    }

    /**
     * @method 根据传入的某个板卡配置构造字典
     --------------------------------------------
       this.options {array}:
        [
            {
                "name": "Flash Mode",
                "key": "FlashMode",
                --------------
                "message": {
                    "zh-hans": "",
                    "zh-hant": "",
                    "en": ""
                },
                "message": "",
                --------------
                "options": [
                    {
                        "title": "QIO",
                        "id": "qio"
                    },
                    ...
                ]
            },
            ...
        ]
     --------------------------------------------
       this.selectedOptions {object}:
        {
            "xxxkey": {
                "label": "xxx",
                "key": "xxx"
            },
            ...
        }
        例如:
        {
            "FlashMode": {
                "label": "QIO",
                "key": "qio"
            },
            ...
        }
     --------------------------------------------
       this.defaultOptions = this.selectedOptions;
     --------------------------------------------
       this.optionsInfo {object}:
        {
            "xxxkey": {
                "key": [ "xxx", "xxx", ... ],
                "label": [ "xxx", "xxx", ... ]
            },
            ...
        }
        例如:
        {
            "FlashMode": {
                "key": [ "qio", "dio", ... ],
                "label": [ "QIO", "DIO", ... ]
            },
            ...
        }
     --------------------------------------------
     * @return {void}
     **/
    generateOptions() {
        this.options = [];
        this.selectedOptions = {};
        this.defaultOptions = {};
        this.optionsInfo = {};
        if (!(this.config instanceof Object)) {
            return;
        }
        for (let i in this.config) {
            let child = this.config[i];
            if (!(child.options instanceof Object)) {
                continue;
            }
            if (!child.options.length) {
                continue;
            }
            this.defaultOptions[child.key] = { ...child.options[0] };
            this.optionsInfo[child.key] = {
                key: [],
                label: []
            };
            let childOptions = [];
            for (let j in child.options) {
                let childOption = child.options[j];
                if (!(childOption instanceof Object)) {
                    continue;
                }
                childOptions.push({
                    title: childOption.label,
                    id: childOption.key
                });
                this.optionsInfo[child.key].label.push(childOption.label);
                this.optionsInfo[child.key].key.push(childOption.key);
            }
            this.options.push({
                name: child.label,
                key: child.key,
                messageId: child.messageId,
                options: childOptions
            })
        }
        this.selectedOptions = { ...this.defaultOptions };
    }

    /**
     * @method 判断所要更新的配置项是否合法，
               也即为判断新的配置项是否存在以及配置项的选中项是否在该配置项中存在
     * @param name {string} 所要设置的配置项，xxxkey
     * @param value {object} 所要设置的配置项的新的值
        value = {
            "label": "xxx",
            "key": "xxx"
        }
     * @return {boolean}
     **/
    optionIsLegal(name, value) {
        let optionsType = Object.keys(this.defaultOptions);
        if (!optionsType.includes(name)
         || !this.optionsInfo[name].key.includes(value.key)
         || !this.optionsInfo[name].label.includes(value.label)) {
            return false;
        } else {
            return true;
        }
    }

    /**
     * @method 设置当前某个配置项的选中项
     * @param name {string} 所要设置的配置项，xxxkey
     * @param value {object} 所要设置的配置项的新的值
        value = {
            "label": "xxx",
            "key": "xxx"
        }
     * @return {void}
     **/
    setSelectedOption(name, value) {
        if (this.optionIsLegal(name, value)) {
            this.selectedOptions[name] = { ...value };
        }
    }

    /**
     * @method 设置当前某些配置项的选中项
     * @param newOptions {object} 所要设置的配置项
        newOptions = {
            "xxxkey": {
                "label": "xxx",
                "key": "xxx"
            },
            ...
        }
     * @return {void}
     **/
    setSelectedOptions(newOptions) {
        if (!(newOptions instanceof Object)) {
            return;
        }
        this.selectedOptions = this.selectedOptions ?? {};
        for (let i in newOptions) {
            this.setSelectedOption(i, newOptions[i]);
        }
    }

    /**
     * @method 储存新的配置项设置
     * @return {void}
     **/
    writeSelectedOptions() {
        USER.board = USER.board ?? {};
        const { board } = USER;
        board[BOARD.boardType] = board[BOARD.boardType] ?? {};
        board[BOARD.boardType].key = this.key;
        board[BOARD.boardType].default = { ...this.selectedOptions };
        Storage.user('/', USER);
    }

    getCommandParam() {

    }
}

Mixly.BoardConfigItem = BoardConfigItem;

});