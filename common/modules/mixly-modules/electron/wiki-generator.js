goog.loadJs('electron', () => {

goog.require('path');
goog.require('Blockly');
goog.require('Mustache');
goog.require('Mixly.Env');
goog.require('Mixly.IdGenerator');
goog.require('Mixly.Electron');
goog.provide('Mixly.Electron.WikiGenerator');

const {
    Env,
    IdGenerator,
    Electron
} = Mixly;
const fs_extra = Mixly.require('fs-extra');
const fs = Mixly.require('fs');

class WikiGenerator {
    static {
        this.WIKI_PAGE_FILE = goog.get(path.join(Env.templatePath, 'markdown/wiki-page-file.md'));
        this.WIKI_PAGE_DIR = goog.get(path.join(Env.templatePath, 'markdown/wiki-page-dir.md'));
    }

    #$xml_ = null;
    #desPath_ = '';
    #tree_ = [];
    constructor($xml, desPath) {
        this.#$xml_ = $xml;
        this.#desPath_ = desPath;
        this.workspace = Mixly.Workspace.getMain().getEditorsManager().getActive().getPage('block').getEditor();
        this.generator = Mixly.Workspace.getMain().getEditorsManager().getActive().getPage('block').generator;
    }

    buildTree($nodes) {
        let output = [];
        for (let i = 0; i < $nodes.length; i++) {
            let child = {};
            child.id = $nodes[i].getAttribute('id') ?? IdGenerator.generate();
            if ($nodes[i].nodeName == 'CATEGORY') {
                child.name = $nodes[i].getAttribute('name') ?? child.id;
                child.children = this.buildTree($($nodes[i]).children());
                output.push(child);
            } else if ($nodes[i].nodeName == 'BLOCK') {
                child.name = $nodes[i].getAttribute('type') ?? child.id;
                child.children = false;
                child.xml = $nodes[i].outerHTML;
                output.push(child);
            }
        }
        return output;
    }

    async generate() {
        let output = this.buildTree(this.#$xml_.children());
        fs_extra.ensureDirSync('./outputBlock/');
        fs_extra.emptyDirSync('./outputBlock/');
        let info = await this.generateWikiPage('./outputBlock/', {
            title: 'Micropython ESP32',
            order: 1
        }, output);
        fs_extra.outputFileSync(path.join('./outputBlock/', 'README.md'), info.md);
    }

    generateImage(desPath) {
        return new Promise((resolve, reject) => {
            Blockly.Screenshot.workspaceToSvg_(this.workspace, (datauri) => {
                const base64 = datauri.replace(/^data:image\/\w+;base64,/, '');
                const dataBuffer = new Buffer(base64, 'base64');
                fs_extra.outputFile(desPath, dataBuffer, (error) => {
                    resolve(error);
                });
            });
        });
    }

    async generateWikiPage(rootPath, parentInfo, nodes) {
        let config = {
            id: parentInfo.id,
            title: parentInfo.title,
            order: parentInfo.order
        };
        let blocksNum = 0;
        for (let node of nodes) {
            if (!node.children) {
                blocksNum += 1;
            }
        }
        config.index = !!blocksNum;
        if (blocksNum) {
            let blocks = [];
            for (let node of nodes) {
                if (node.children) {
                    continue;
                }
                this.workspace.clear();
                let xmlNode = Blockly.utils.xml.textToDom(`<xml>${node.xml}</xml>`);
                Blockly.Xml.domToWorkspace(xmlNode, this.workspace);
                let code = this.generator.workspaceToCode(this.workspace) || '';
                code = code.replace(/(_E[0-9A-F]{1}_[0-9A-F]{2}_[0-9A-F]{2})+/g, function (s) {
                    try {
                        return decodeURIComponent(s.replace(/_/g, '%'));
                    } catch (error) {
                        return s;
                    }
                });
                await this.generateImage(path.join(rootPath, '../assets', parentInfo.title, node.id + '.png'))
                blocks.push({
                    imgPath: `./assets/${parentInfo.title}/${node.id}.png`,
                    code: code,
                    type: node.name
                });
            }
            config.blocks = blocks;
            return {
                file: true,
                md: Mustache.render(WikiGenerator.WIKI_PAGE_FILE, config)
            };
        } else {
            let index = 0;
            for (let i in nodes) {
                if (!nodes[i].children) {
                    continue;
                }
                index += 1;
                let order = String(index * 5);
                let mdIndex = Array(4 - Math.min(order.length, 4)).fill('0').join('') + order;
                let desPath = path.join(rootPath, mdIndex + '-' + nodes[i].id);
                let info = await this.generateWikiPage(desPath, {
                    id: nodes[i].id,
                    title: nodes[i].name,
                    order: order,
                }, nodes[i].children);
                if (info.file) {
                    fs_extra.outputFileSync(`${desPath}.md`, info.md);
                } else if (!info.isEmpty) {
                    fs_extra.outputFileSync(path.join(desPath, 'README.md'), info.md);
                } else if (info.isEmpty) {
                    index -= 1;
                }
            }
            config.blocks = [];
            return {
                file: false,
                isEmpty: !index,
                md: Mustache.render(WikiGenerator.WIKI_PAGE_DIR, config)
            };
        }
    }
}

Electron.WikiGenerator = WikiGenerator;

});