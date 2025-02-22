goog.loadJs('electron', () => {

goog.require('Mixly.Command');
goog.require('Mixly.Config');
goog.require('Mixly.Electron');
goog.provide('Mixly.Electron.Events');

const { Command, Config, Electron } = Mixly;
const { Events } = Electron;
const { SOFTWARE } = Config;

const electron = Mixly.require('electron');
const ipcRenderer = electron.ipcRenderer;

ipcRenderer.on('command', (event, message) => {
    if (SOFTWARE.debug) {
        console.log('receive -> ', message);
    }
    const commandObj = Command.parse(message);
    Command.run(commandObj);
});

});