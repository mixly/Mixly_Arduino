goog.loadJs('common', () => {

goog.require('Blockly');
goog.require('Mixly.MFile');
goog.require('Mixly.Config');
goog.require('Mixly.Boards');
goog.require('Mixly.LocalStorage');
goog.provide('Mixly.UserEvents');

const {
    MFile,
    Config,
    Boards,
    LocalStorage
} = Mixly;

const { USER, SOFTWARE } = Config;

class UserEvents {
    #DEFAULT_DATA = {
        uid: () => {
            return LocalStorage.get('Authorization/user_id') ?? '';
        },
        mid: () => {
            return LocalStorage.get('module_id') ?? '';
        },
        type: () => {
            return Boards.getSelectedBoardName();
        },
        code: () => {
            return MFile.getCode();
        },
        blocks: () => {
            return MFile.getMil();
        },
        time: () => {
            return (new Date()).toLocaleString();
        },
        fileName: () => {
            return LocalStorage.get('file_name') ?? '';
        }
    };

    #actionFlow_ = [];
    #prevCode_ = '';

    constructor(workspace) {
        this.workspace = workspace;
        this.#addBlocklyEventListener_();
    }

    #addBlocklyEventListener_() {
        this.blocklyEventListener = this.workspace.addChangeListener((event) => {
            if (![
                    Blockly.Events.BLOCK_MOVE,
                    Blockly.Events.BLOCK_DELETE,
                    Blockly.Events.BLOCK_CREATE
                ].includes(event.type)) {
                return;
            }
            const currentCode = MFile.getCode();
            if (Blockly.Events.BLOCK_MOVE === event.type && this.#prevCode_ === currentCode) {
                return;
            }
            this.#prevCode_ = currentCode;
            const recordLine = {};
            recordLine.blockId = event.blockId;
            recordLine.currentCode = currentCode;
            recordLine.currentBlocks = MFile.getMil();
            recordLine.time = (new Date()).toLocaleString();
            let actionType = 1;
            switch (event.type) {
            case Blockly.Events.BLOCK_MOVE:
                let block = this.workspace.getBlockById(event.blockId);
                if (!block) {
                    return;
                }
                recordLine.blockType = block.type;
                actionType = 3;
                break;
            case Blockly.Events.BLOCK_DELETE:
                recordLine.blockType = event.oldJson.type;
                actionType = 2;
                break;
            case Blockly.Events.BLOCK_CREATE:
                recordLine.blockType = event.json.type;
                actionType = 1;
                break;
            }
            recordLine.actionType = actionType;
            this.addFlowItem(recordLine);
        });
    }

    addRecord(message) {
        if (this.flowIsEmpty()) {
            return;
        }
        let data = {};
        for (let key in this.#DEFAULT_DATA) {
           data[key] = this.#DEFAULT_DATA[key]();
        }
        for (let i in message) {
            data[i] = message[i];
        }
        data.actionFlow = this.getFlowItems();
        $.post(SOFTWARE?.behaviorRecord?.url, data, () => {
            this.resetFlow();
        })
        .fail(() => {
            this.resetFlow();
        });
    }

    addFlowItem(data) {
        this.#actionFlow_.push(data);
    }

    getFlowItems() {
        return this.#actionFlow_;
    }

    resetFlow() {
        this.#actionFlow_ = [];
    }

    flowIsEmpty() {
        return this.#actionFlow_.length === 0;
    }
}

Mixly.UserEvents = UserEvents;

});