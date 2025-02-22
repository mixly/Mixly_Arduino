goog.loadJs('web', () => {

goog.require('path');
goog.require('Mixly.Config');
goog.require('Mixly.Env');
goog.require('Mixly.MJSON');
goog.require('Mixly.FooterLayerExample');
goog.require('Mixly.Boards');
goog.provide('Mixly.Web.FooterLayerExample');

const {
    Config,
    Env,
    FooterLayerExample,
    MJSON,
    Boards,
    Web
} = Mixly;

const { BOARD } = Config;

class FooterLayerExampleExt extends FooterLayerExample {
    static DIR_TREE = MJSON.get(path.join(Env.boardDirPath, 'examples/map.json')) ?? [];

    constructor(element) {
        super(element);
    }

    getRoot() {
        const { DIR_TREE } = FooterLayerExampleExt;
        let exampleList = [];
        if (DIR_TREE instanceof Object) {
            exampleList = [{
                title: BOARD.boardType,
                id: '',
                children: []
            }];
        }
        return exampleList;
    }

    getChildren(inPath) {
        const { DIR_TREE } = FooterLayerExampleExt;
        let pathList = [];
        if (inPath) {
            pathList = inPath.split('/');
        }
        let obj = DIR_TREE;
        for (let key of pathList) {
            if (!key) {
                continue;
            }
            if (obj[key]) {
                obj = obj[key];
            } else {
                return [];
            }
        }
        if (!(obj instanceof Object)) {
            return [];
        }
        let exampleList = [];
        for (let key in obj) {
            if (!(obj[key] instanceof Object)) {
                continue;
            }
            const exampleObj = {
                title: obj[key]['__name__'],
                id: inPath ? (inPath + '/' + key) : key
            };
            if (!obj[key]['__file__']) {
                exampleObj.children = [];
            }
            exampleList.push(exampleObj);
        }
        return exampleList;
    }

    dataToWorkspace(inPath) {
        const data = goog.get(path.join(Env.boardDirPath, 'examples', inPath));
        this.updateCode(inPath.substring(inPath.lastIndexOf('.')), data);
    }
}

Web.FooterLayerExample = FooterLayerExampleExt;

});