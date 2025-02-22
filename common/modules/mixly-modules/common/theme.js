goog.loadJs('common', () => {

goog.require('Blockly');
goog.provide('Mixly.Theme');

const { Theme } = Mixly;

Theme.changeTo = function (type) {
    const { blockEditor, codeEditor } = Editor;
    let blockEditorTheme, codeEditorTheme, statusBarTheme;
    if (type === 'dark') {
        $("#nav").removeClass("layui-bg-green").addClass("layui-bg-cyan");
        $("body").removeClass("light").addClass("dark");
        blockEditorTheme = Blockly.Themes.Dark;
        codeEditorTheme = 'ace/theme/dracula';
        statusBarTheme = 'ace/theme/terminal';
    } else {
        $("#nav").removeClass("layui-bg-cyan").addClass("layui-bg-green");
        $("body").removeClass("dark").addClass("light");
        blockEditorTheme = Blockly.Themes.Classic;
        codeEditorTheme = "ace/theme/crimson_editor";
        if (Blockly.Arduino) {
            codeEditorTheme = "ace/theme/xcode";
        }
        statusBarTheme = 'ace/theme/xcode';
    }
    blockEditor.setTheme(blockEditorTheme);
    codeEditor.setOption("theme", codeEditorTheme);
    // for (let statusBar of StatusBarTabs.statusBars) {
    //     statusBar.editor.setOption("theme", statusBarTheme);
    // }
}

const themeMedia = window.matchMedia("(prefers-color-scheme: light)");
themeMedia.addListener(e => {
    if (e.matches) {
        Theme.changeTo('light');
    } else {
        Theme.changeTo('dark');
    }
});

});