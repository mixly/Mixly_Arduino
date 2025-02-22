goog.loadJs('electron', () => {

goog.require('path');
goog.require('layui');
goog.require('Mixly.Env');
goog.require('Mixly.Config');
goog.require('Mixly.MFile');
goog.require('Mixly.Title');
goog.require('Mixly.XML');
goog.require('Mixly.FooterLayerExample');
goog.require('Mixly.Electron.File');
goog.provide('Mixly.Electron.FooterLayerExample');

const {
    Env,
    Config,
    MFile,
    Title,
    XML,
    FooterLayerExample,
    Electron
} = Mixly;

const { dropdown, tree } = layui;

const { File } = Electron;

const { BOARD } = Config;

const fs = Mixly.require('fs');
const fs_plus = Mixly.require('fs-plus');
const electron_remote = Mixly.require('@electron/remote');
const { app } = electron_remote;

class FooterLayerExampleExt extends FooterLayerExample {
    constructor(element) {
        super(element);
    }

    getRoot() {
        let exampleList = [];
        let samplePath = path.join(Env.boardDirPath, 'examples');
        const sampleList = this.getExamplesByPath(samplePath, '.mix');
        if (sampleList.length) {
            exampleList.push({
                id: samplePath,
                title: BOARD.boardType,
                children: []
            });
        }
        const thirdPartyPath = path.join(Env.boardDirPath, 'libraries/ThirdParty');
        if (fs_plus.isDirectorySync(thirdPartyPath)) {
            const libList = fs.readdirSync(thirdPartyPath);
            for (let lib of libList) {
                const libPath = path.join(thirdPartyPath, lib);
                if (fs_plus.isFileSync(libPath))
                    continue;
                const examplesPath = path.join(libPath, 'examples');
                if (fs_plus.isFileSync(examplesPath))
                    continue;
                const thirdPartyList = this.getExamplesByPath(examplesPath, '.mix');
                if (thirdPartyList.length) {
                    exampleList.push({
                        id: examplesPath,
                        title: lib,
                        children: []
                    });
                }
            }
        }
        return exampleList;
    }

    getChildren(inPath) {
        return this.getExamplesByPath(inPath, '.mix');
    }

    dataToWorkspace(inPath) {
        if (!fs_plus.isFileSync(inPath)) {
            return;
        }
        const data = fs.readFileSync(inPath, 'utf8');
        const extname = path.extname(inPath);
        this.updateCode(extname, data);
        File.openedFilePath = null;
    }

    getExamplesByPath(inPath, fileExtname) {
        let exampleList = [];
        if (fs_plus.isDirectorySync(inPath)) {
            const dataList = fs.readdirSync(inPath);
            for (let data of dataList) {
                const dataPath = path.join(inPath, data);
                if (fs_plus.isDirectorySync(dataPath)) {
                    exampleList.push({ title: data, id: dataPath, children: [] });
                } else {
                    const extname = path.extname(data);
                    if (extname === fileExtname) {
                        exampleList.push({ title: data, id: dataPath });
                    }
                }
            }
        }
        return exampleList;
    }
}

Electron.FooterLayerExample = FooterLayerExampleExt;

});