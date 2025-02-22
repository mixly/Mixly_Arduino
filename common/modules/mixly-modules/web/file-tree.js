goog.loadJs('web', () => {

goog.require('path');
goog.require('Mixly.FileTree');
goog.require('Mixly.Web.FS');
goog.provide('Mixly.Web.FileTree');

const { FileTree, Web } = Mixly;
const { FS } = Web;

class FileTreeExt extends FileTree {
    constructor() {
        super(FS);
    }

    async readFolder(inPath) {
        const fs = this.getFS();
        const status = await fs.isDirectory(inPath);
        let output = [];
        if (!status) {
            return output;
        }
        const children = await fs.readDirectory(inPath);
        for (let data of children) {
            const dataPath = path.join(inPath, data);
            if (await fs.isDirectory(dataPath)) {
                const isDirEmpty = await fs.isDirectoryEmpty(dataPath);
                output.push({
                    type: 'folder',
                    id: dataPath,
                    children: !isDirEmpty
                });
            } else {
                output.push({
                    type: 'file',
                    id: dataPath,
                    children: false
                });
            }
        }
        return output;
    }
}

Web.FileTree = FileTreeExt;

});