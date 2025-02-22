goog.loadJs('electron', () => {

goog.require('path');
goog.require('Mixly.Config');
goog.require('Mixly.Env');
goog.require('Mixly.Msg');
goog.require('Mixly.Electron');
goog.provide('Mixly.Electron.WikiManager');

const {
    Config,
    Env,
    Msg,
    Electron
} = Mixly;

const { WikiManager } = Electron;

const { BOARD } = Config;

const fs = Mixly.require('fs');
const fs_plus = Mixly.require('fs-plus');
const fs_extra = Mixly.require('fs-extra');
const path = Mixly.require('path');
const json2md = Mixly.require('json2md');
const electron_localshortcut = Mixly.require('electron-localshortcut');
const electron_remote = Mixly.require('@electron/remote');
const { ipcMain } = electron_remote;


class WikiPage {
    constructor(indexPath, gotoInfo = null) {
        this.gotoInfo = gotoInfo;
        this.updateContentFile();
        this.win = Electron.newBrowserWindow(indexPath);
        this.isDestroyed = false;
        this.addReceiveCommandEvent();
        this.addLocalShortcutEvent();
        this.win.on('close', () => {
            this.isDestroyed = true;
        });
        $(window).unload(() => {
            if (!this.isDestroyed)
                this.win.close();
        });
    }

    addLocalShortcutEvent() {
        //打开或关闭开发者工具
        electron_localshortcut.register(this.win, 'CmdOrCtrl+Shift+I', () => {
            if (!this.isDestroyed)
                this.win.webContents.toggleDevTools();
        });

        //重载页面
        electron_localshortcut.register(this.win, 'CmdOrCtrl+R', () => {
            this.reload();
        });
    }
    
    addReceiveCommandEvent() {
        ipcMain.on('command', (event, command) => {
            if (typeof command !== 'object') return;

            switch (command.func) {
            case 'getPath':
                this.updateWiki();
                break;
            }
        });
    }

    sendCommand(command) {
        if (this.isDestroyed || typeof command !== 'object') return;
        this.win.webContents.send('command', command);
    }

    reload() {
        if (!this.isDestroyed) {
            this.updateContentFile();
            this.win.reload();
        }
    }

    getPagePath(contentPath, contentList) {
        if (typeof contentList !== 'object' || !contentPath.length) return null;
        if (contentPath.length === 1) {
            for (let key in contentList) {
                const child = contentList[key];
                if (child?.link?.title !== contentPath[0]) {
                    continue;
                }
                const { title, source } = child.link;
                if (title !== contentPath[0] || typeof source !== 'string') {
                    return null;
                }
                try {
                    const filePath = source.match(/(?<=(\?file=))[^\s]*/g);
                    if (filePath?.length) {
                        return filePath[0];
                    }
                } catch (error) {
                    console.log(error);
                }
                return null;
            }
            return null;
        } else {
            for (let key in contentList) {
                const child = contentList[key];
                if (child
                 && child.length === 2
                 && child[0].h5 === contentPath[0]) {
                    let childPath = [ ...contentPath ];
                    childPath.shift();
                    return this.getPagePath(childPath, child[1].ul);
                }
            }
        }
    }

    goto(pageList, scrollPos) {
        const args = [];
        const pagePath = this.getPagePath(pageList, this.contentList);
        if (!pageList) return;
        args.push(pagePath);
        scrollPos && args.push(scrollPos);
        this.sendCommand({
            func: 'goto',
            args
        });
        this.win.focus();
    }

    updateContentFile() {
        const wikiContentPath = path.join(Env.boardDirPath, 'wiki/content.md');
        const defaultWikiPath = path.join(Env.boardDirPath, 'wiki/wiki-libs/' + Msg.nowLang);
        const wikiHomePagePath = path.join(defaultWikiPath, 'home');
        const thirdPartyLibsPath = path.join(Env.boardDirPath, 'libraries/ThirdParty/');
        const changelogPath = path.join(Env.clientPath, 'CHANGELOG');
        const wikiList = [];
        if (fs_plus.isFileSync(wikiHomePagePath + '.md'))
            wikiList.push({
                h4: {
                    link: {
                        title: Msg.Lang['wiki.home'],
                        source: '?file=' + encodeURIComponent(wikiHomePagePath)
                    }
                }
            });
        if (fs_plus.isDirectorySync(defaultWikiPath)) {
            const childContentList = this.getContentJson(defaultWikiPath, BOARD.boardType);
            if (childContentList)
                wikiList.push(childContentList);
        }
        if (fs_plus.isDirectorySync(thirdPartyLibsPath)) {
            const libsName = fs.readdirSync(thirdPartyLibsPath);
            for (let name of libsName) {
                const libWikiPath = path.join(thirdPartyLibsPath, name , 'wiki', Msg.nowLang);
                if (fs_plus.isDirectorySync(libWikiPath)) {
                    const childContentList = this.getContentJson(libWikiPath, name);
                    if (childContentList) {
                        wikiList.push(childContentList);
                    }
                }
            }
        }
        this.contentList = wikiList;
        try {
            const md = json2md(wikiList);
            const lineList = md.split('\n');
            for (let i = 0; i < lineList.length; i++) {
                if (!lineList[i].replaceAll(' ', '')) {
                    lineList.splice(i, 1);
                    i--;
                } else {
                    if (!lineList[i].indexOf('#####'))
                        lineList[i] = '\n' + lineList[i];
                }
            }
            fs_extra.outputFile(wikiContentPath, lineList.join('\n'));
        } catch (error) {
            console.log(error);
        }
    }

    updateWiki() {
        const args = [
            {
                default: path.join(Env.boardDirPath, 'wiki/wiki-libs/'),
                thirdParty: path.join(Env.boardDirPath, 'libraries/ThirdParty/'),
                content: path.join(Env.boardDirPath, 'wiki/content.md')
            }
        ];
        if (this.gotoInfo) {
            const { page, scrollPos } = this.gotoInfo;
            const pagePath = this.getPagePath(this.gotoInfo.page, this.contentList);
            if (pagePath) {
                const goto = [];
                goto.push(pagePath);
                scrollPos && goto.push(scrollPos);
                args[0].goto = goto;
            }
            this.gotoInfo = null;
        }
        this.sendCommand({
            func: 'setPath',
            args
        });
    }

    getContentJson(dirPath, title = null) {
        const dirNameList = path.basename(dirPath).split('-');
        if (dirNameList.length !== 2 && !title) return null;
        const contentList = [];
        contentList.push({ h5: title ?? dirNameList[1] });
        contentList.push({ ul: [] });
        const { ul } = contentList[1];
        const keyList = fs.readdirSync(dirPath);
        for (let key of keyList) {
            const nowPath = path.join(dirPath, key);
            if (fs_plus.isDirectorySync(nowPath)) {
                const childContentList = this.getContentJson(nowPath);
                if (childContentList && childContentList[1].ul.length)
                    ul.push(childContentList);
            } else {
                const extname = path.extname(key);
                if (extname !== '.md') continue;
                const fileNameList = path.basename(key, '.md').split('-');
                if (fileNameList.length !== 2) continue;
                const newPath = path.join(path.dirname(nowPath), path.basename(key, '.md'));
                ul.push({ link: { title: fileNameList[1], source: '?file=' + encodeURIComponent(newPath) + ' \"' + fileNameList[1] + '\"' } });
            }
        }
        return contentList;
    }
}

WikiManager.WikiPage = WikiPage;

WikiManager.openWiki = (gotoInfo) => {
    const goto = (gotoInfo && typeof gotoInfo === 'object') ? gotoInfo[Msg.nowLang] : null;
    if (!WikiManager.wiki || WikiManager.wiki.isDestroyed) {
        const wikiPath = path.join(Env.indexDirPath, '../common/wiki/index.html');
        if (fs_plus.isFileSync(wikiPath)) {
            WikiManager.wiki = new WikiPage(wikiPath, goto);
        } else {
            layer.msg(Msg.Lang['wiki.pageNotFound'], { time: 1000 });
        }
    } else {
        const { win } = WikiManager.wiki;
        win && win.focus();
        if (goto) {
            const { page, scrollPos } = goto;
            WikiManager.wiki.goto(page, scrollPos);
        }
    }
}

WikiManager.registerContextMenu = () => {
    const openWikiPage = {
        displayText: Msg.Lang['wiki.open'],
        preconditionFn: function(scope) {
            const { wiki } =  scope.block;
            if (typeof wiki === 'object') {
                if (typeof wiki[Msg.nowLang] === 'object'
                 && typeof wiki[Msg.nowLang].page === 'object') {
                    return 'enabled';
                }
            }
            return 'hidden';
        },
        callback: function(scope) {
            const { wiki } =  scope.block;
            WikiManager.openWiki(wiki);
        },
        scopeType: Blockly.ContextMenuRegistry.ScopeType.BLOCK,
        id: 'wiki_open',
        weight: 200
    };
    Blockly.ContextMenuRegistry.registry.register(openWikiPage);
}

});