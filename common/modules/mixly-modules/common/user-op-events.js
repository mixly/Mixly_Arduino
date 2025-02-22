goog.loadJs('common', () => {

goog.require('Mixly.MFile');
goog.require('Mixly.Config');
goog.require('Mixly.Boards');
goog.provide('Mixly.UserOPEvents');

const {
    MFile,
    Boards,
    Config,
    Editor
} = Mixly;
const { USER } = Config;

class UserOPEvents {
    #DEFAULT_DATA = {
        code: () => {
            return MFile.getCode();
        },
        board_name: () => {
            return Boards.getSelectedBoardName();
        },
        time: () => {
            return (new Date()).toLocaleString();
        },
        blocks: () => {
            return MFile.getMil();
        },
        output: () => {
            const { mainStatusBarTab } = Mixly;
            const statusBarTerminal = mainStatusBarTab.getStatusBarById('output');
            return statusBarTerminal.getValue();
        },
        id: () => {
            return USER.visitorId.str32CRC32b;
        }
    };
    #actionArrayRecord = [];
    constructor() {
        this.addTimer();
    }

    sendAll() {
        let sendPromise = [];
        let len = this.#actionArrayRecord.length;
        for (;this.#actionArrayRecord.length;) {
            let data = this.#actionArrayRecord.shift();
            sendPromise.push(this.send(data));
        }
        Promise.all(sendPromise)
        .finally(() => {
            this.addTimer();
        });
    }

    send(data) {
        for (let key in this.#DEFAULT_DATA) {
           data[key] = this.#DEFAULT_DATA[key]();
        }
        return new Promise((resolve, reject) => {
            $.post('https://cc.mixly.cn/api/behaviorrecord', data, function() {
                resolve();
            })
            .fail(function() {
                resolve();
            });
        });
    }

    addTimer() {
        setTimeout(() => this.sendAll(), 10000);
    }

    addRecord(data) {
        if (Editor.mainEditor.selected === 'BLOCK') {
            this.#actionArrayRecord.push(data);
        }
    }
}

Mixly.UserOPEvents = UserOPEvents;

});