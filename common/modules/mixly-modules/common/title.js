goog.loadJs('common', () => {

goog.require('Mixly.Config');
goog.require('Mixly.Debug');
goog.provide('Mixly.Title');

let {
    Config,
    Debug,
    Title
} = Mixly;
let { BOARD, SOFTWARE } = Config;

if (SOFTWARE?.version && BOARD?.boardType) {
    document.title = SOFTWARE.version + " For " + BOARD.boardType;
}
Title.title = document.title;
Title.NOWTITLE = Title.title;

Title.updeteVersionNumber = (newVersionNumber) => {
    try {
        Title.NOWTITLE = document.title.replace(/Mixly[\s]?[\d.]+/g, "Mixly " + newVersionNumber);
        document.title = Title.NOWTITLE;
    } catch (error) {
        Debug.error(error);
    }
}

Title.getVersionNumber = () => {
    try {
        Title.NOWTITLE = document.title.match(/Mixly[\s]?[\d.]+/g);
        return Title.NOWTITLE;
    } catch (error) {
        Debug.error(error);
        return '';
    }
}

Title.updeteFilePath = function (newPath) {
    try {
        var pathArr = Title.NOWTITLE.match(/\([^\n\r]+\)/g);
        if (pathArr) {
            Title.NOWTITLE = document.title.replace(/\([^\n\r]+\)/g, "(" + newPath + ")");
            document.title = Title.NOWTITLE;
        } else {
            Title.NOWTITLE = document.title + " (" + newPath + ")";
            document.title = Title.NOWTITLE;
        }
    } catch (error) {
        Debug.error(error);
    }
}

Title.getFilePath = () => {
    try {
        let filePathArr = document.title.match(/(?<=\()[^\n\r]+(?=\))/g);
        if (filePathArr && filePathArr.length > 0) {
            return filePathArr[0];
        }
    } catch (error) {
        Debug.error(error);
    }
    return null;
}

Title.updateTitle = (newTitle) => {
    Title.NOWTITLE = newTitle;
    document.title = newTitle;
}
});