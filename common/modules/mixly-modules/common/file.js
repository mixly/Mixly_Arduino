goog.loadJs('common', () => {

goog.provide('Mixly.File');

class File {
    static {
        this.showOpenFilePicker = async () => {
            return new Promise((resolve, reject) => {
                reject();
            });
        }

        this.showDirectoryPicker = async () => {
            return new Promise((resolve, reject) => {
                reject();
            });
        }

        this.showSaveFilePicker = async () => {
            return new Promise((resolve, reject) => {
                reject();
            });
        }
    }

    constructor() {}

    async readFile() {
        return new Promise((resolve, reject) => {
            reject();
        });
    }

    async writeFile(data) {
        return new Promise((resolve, reject) => {
            reject();
        });
    }
}

Mixly.File = File;

});