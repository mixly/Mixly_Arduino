goog.loadJs('web', () => {

goog.require('path');
goog.require('Blockly');
goog.require('Mixly.MFile');
goog.require('Mixly.Title');
goog.require('Mixly.LayerExt');
goog.require('Mixly.Msg');
goog.require('Mixly.Workspace');
goog.provide('Mixly.Web.File');

const {
    MFile,
    Web,
    LayerExt,
    Msg,
    Title,
    Workspace
} = Mixly;

const { MSG } = Blockly.Msg;

const { File } = Web;

File.obj = null;

File.open = async () => {
    if (window.location.protocol === 'https:') {
        let filters = [];
        MFile.openFilters.map((data) => {
            filters.push('.' + data);
        });
        const fileConfig = {
            multiple: false,
            types: [{
                description: 'Mixly File',
                accept: {
                    'application/xml': filters
                }
            }],
            suggestedStartLocation: 'pictures-library'
        };
        try {
            const [ obj ] = await window.showOpenFilePicker(fileConfig);
            if (!obj) {
                return;
            }
            File.obj = obj;
            const extname = path.extname(obj.name);
            const fileInfo = await File.obj.getFile();
            if (!fileInfo) {
                return;
            }
            File.parseData(extname, await fileInfo.text());
            Title.updateTitle(obj.name + ' - ' + Title.title);
        } catch (error) {
            console.log(error);
        }
    } else {
        const filters = '.' + MFile.openFilters.join(',.');
        MFile.openFile(filters, 'text', (fileObj) => {
            let { data, filename } = fileObj;
            const extname = path.extname(filename);
            File.parseData(extname, data);
            Title.updateTitle(filename + ' - ' + Title.title);
        });
    }
}

File.parseData = (extname, text) => {
    if (['.bin', '.hex'].includes(extname)) {
        MFile.loadHex(text);
    } else if (['.mix', '.xml', '.ino', '.py'].includes(extname)) {
        const mainWorkspace = Workspace.getMain();
        const editor = mainWorkspace.getEditorsManager().getActive();
        editor.setValue(text, extname);
    } else {
        layer.msg(Msg.Lang['文件后缀错误'], { time: 1000 });
        File.obj = null;
    }
}

File.save = async () => {
    window.userEvents && window.userEvents.addRecord({
        operation: 'save'
    });
    if (!File.obj) {
        File.saveAs();
        return;
    }
    const mainWorkspace = Workspace.getMain();
    const editor = mainWorkspace.getEditorsManager().getActive();
    let text = '';
    const extname = path.extname(File.obj.name);
    switch (extname) {
    case '.mix':
    case '.xml':
        text = editor.getValue();
        break;
    case '.ino':
    case '.py':
        text = editor.getCode();
        break;
    default:
        return;
    }
    try {
        const writer = await File.obj.createWritable();
        await writer.write(text);
        await writer.close();
        layer.msg('写入新数据到' + File.obj.name, { time: 1000 });
    } catch (error) {
        console.log(error);
    }
}

File.saveAs = async () => {
    let filters = [];
    MFile.saveFilters.map((data) => {
        filters.push('.' + data.extensions[0]);
    });
    const fileConfig = {
        types: [{
            description: 'Mixly File',
            accept: {
                'application/xml': filters
            }
        }]
    };
    try {
        const obj = await window.showSaveFilePicker(fileConfig);
        if (!obj) {
            return;
        }
        File.obj = obj;
        File.save();
        Title.updateTitle(obj.name + ' - ' + Title.title);
    } catch (error) {
        console.log(error);
    }
}

File.new = async () => {
    const mainWorkspace = Workspace.getMain();
    const editor = mainWorkspace.getEditorsManager().getActive();
    const blockEditor = editor.getPage('block').getEditor();
    const codeEditor = editor.getPage('code').getEditor();
    const generator = Blockly.generator;
    const blocksList = blockEditor.getAllBlocks();
    if (editor.getPageType() === 'code') {
        const code = codeEditor.getValue(),
        workspaceToCode = generator.workspaceToCode(blockEditor) || '';
        if (!blocksList.length && workspaceToCode === code) {
            layer.msg(Msg.Lang['代码区已清空'], { time: 1000 });
            Title.updateTitle(Title.title);
            File.obj = null;
            return;
        }
    } else {
        if (!blocksList.length) {
            layer.msg(Msg.Lang['工作区已清空'], { time: 1000 });
            Title.updateTitle(Title.title);
            File.obj = null;
            return;
        }
    }
    layer.confirm(MSG['confirm_newfile'], {
        title: false,
        shade: LayerExt.SHADE_ALL,
        resize: false,
        success: (layero) => {
            const { classList } = layero[0].childNodes[1].childNodes[0];
            classList.remove('layui-layer-close2');
            classList.add('layui-layer-close1');
        },
        btn: [MSG['newfile_yes'], MSG['newfile_no']],
        btn2: (index, layero) => {
            layer.close(index);
        }
    }, (index, layero) => {
        layer.close(index);
        blockEditor.clear();
        blockEditor.scrollCenter();
        Blockly.hideChaff();
        codeEditor.setValue(generator.workspaceToCode(blockEditor) || '', -1);
        Title.updateTitle(Title.title);
        File.obj = null;
    });
}

File.saveCode = () => {

}

File.saveMix = () => {

}

File.saveImg = () => {

}

File.saveHex = () => {

}

});