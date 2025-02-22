(() => {

goog.require('Mixly.Env');
goog.require('Mixly.Electron');
goog.provide('Mixly.Electron.PythonShell');

const {
    Env,
    Electron
} = Mixly;

const fs_extra = Mixly.require('fs-extra');
const fs_plus = Mixly.require('fs-plus');
const python_shell = Mixly.require('python-shell');

const { PythonShell } = Electron;

PythonShell.init = () => {
    if (Env.currentPlatform !== 'win32' && fs_plus.isFileSync('/usr/local/bin/python3')) {
        Env.python3Path = '/usr/local/bin/python3';
    }
    PythonShell.OPTIONS = {
        pythonPath: Env.python3Path,
        pythonOptions: ['-u'],
        encoding: "binary",
        mode: 'utf-8'
    };
}

PythonShell.run = (indexPath, pyFilePath) => {
    indexPath = decodeURIComponent(indexPath);
    pyFilePath = decodeURIComponent(pyFilePath);
    const shell = new python_shell.PythonShell(pyFilePath, {
        ...PythonShell.OPTIONS,
        args: [ Env.clientPath, indexPath ]
    });
}

})();