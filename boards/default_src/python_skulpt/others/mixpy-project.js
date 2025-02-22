export default class MixpyProject {
    constructor() {
        this.initProject();
    }

    initProject() {
        this.fileD = {};
        this.MAINF = 'main.py';
        this.fileD[this.MAINF] = ["", true, 1];
        this.selectFile = this.MAINF;
    }

    add(file, filecontent, filetype) {
        if (this.exist(file)) {
            console.log("Warning:file already in project");
            return;
        }
        this.fileD[file] = [filecontent, false, filetype];
    }

    delete(file) {
        delete this.fileD[file];
        this.selectFile = undefined;
    }

    getProject() {
        return Object.keys(this.fileD);
    }

    getUploadFileList() {
        var fileNameList = Object.keys(this.fileD);
        var ret = [];
        for (var i in fileNameList) {
            if (this.fileD[fileNameList[i]][2] === 2)
                ret.push(fileNameList[i]);
        }
        return ret;
    }

    getNewFileList() {
        var fileNameList = Object.keys(this.fileD);
        var ret = [];
        for (var i in fileNameList) {
            if (this.fileD[fileNameList[i]][2] === 1)
                ret.push(fileNameList[i]);
        }
        return ret;
    }

    isSelect(f) {
        return this.fileD[f][1];
    }

    select(f) {
        // if (this.selectFile !== undefined) {
        //     this.modify(this.selectFile, mixlyjs.getCodeContent());
        //     this.fileD[this.selectFile][1] = false;
        // }
        this.fileD[f][1] = true;
        // this.selectFile = f;
        // var suffix = mixlyjs.getFileSuffix(f);
        // var textFileSuffix = ["py", "txt", "csv", "xml"];
        // if (textFileSuffix.indexOf(suffix) !== -1) {
        //     tabClick('arduino');
        //     mixlyjs.renderIno(this.fileD[f][0]);
        // } else {
        //     var base64str = 'data:image/' + suffix + ';base64,' + this.fileD[f][0];
        //     $('#mixpy_show_image').attr('src', base64str);
        //     mixlyjs.renderIno(this.fileD[f][0]);
        //     tabClick('image');
        //     var $imageA = $('#mixpy_link_image');
        //     $imageA.attr('href', base64str);
        //     $imageA.attr('download', f);
        // }
    }

    getFileNum() {
        var files = Object.keys(this.fileD);
        return files.length;
    }

    getFileContent(f) {
        return this.fileD[f][0];
    }

    getFileType(f) {
        return this.fileD[f][2];
    }

    modify(f, content) {
        this.fileD[f][0] = content;
    }

    exist(f) {
        return f in this.fileD;
    }
}