goog.loadJs('electron', () => {

goog.require('path');
goog.require('Mixly.Env');
goog.require('Mixly.MJSON');
goog.require('Mixly.Electron');
goog.provide('Mixly.Electron.CloudDownload');

const {
    Env,
    MJSON,
    Electron
} = Mixly;

const { CloudDownload } = Electron;

const fs = Mixly.require('fs');
const fs_plus = Mixly.require('fs-plus');
const fs_extra = Mixly.require('fs-extra');
const node_downloader_helper = Mixly.require('node-downloader-helper');

CloudDownload.getJson = (url, downloadDir, endFunc) => {
    if (url) {
        CloudDownload.download(url, downloadDir)
        .then((message) => {
            if (message[0]) {
                throw message[0];
            } else {
                let jsonObj = null;
                if (fs_plus.isFileSync(message[1])) {
                    let data = fs.readFileSync(message[1], 'utf-8');
                    jsonObj = MJSON.parse(data);
                }
                if (jsonObj) {
                    return jsonObj;
                } else {
                    throw('解析失败');
                }
            }

        })
        .then((configObj) => {
            endFunc([null, configObj]);
        })
        .catch((error) => {
            endFunc([error, null]);
        });
    } else {
        endFunc(['url读取出错！', null]);
    }
}

CloudDownload.download = (url, downloadDir, options = {}) => {
    return new Promise((resolve, reject) => {
        const DEFAULT_OPTIONS = {
            progress: null,
            end: null,
            error: null
        }
        if (typeof options !== 'object')
            options = DEFAULT_OPTIONS;
        else
            options = { ...DEFAULT_OPTIONS, ...options };
        try {
            fs_extra.ensureDirSync(downloadDir);
            const fileName = path.basename(url);
            const filePath = path.join(downloadDir, './' + fileName);
            if (fs_plus.isFileSync(filePath))
                fs_extra.removeSync(filePath);
        } catch (error) {
            resolve([error, url]);
            return;
        }
        const { DownloaderHelper } = node_downloader_helper;
        const dl = new DownloaderHelper(url, downloadDir, {
            override: true,
            timeout: 15000,
            retry: false
        });
        dl.on('progress', (stats) => {
            if (typeof options.progress === 'function') {
                options.progress(stats);
            }
        });
        dl.on('end', (downloadInfo) => {
            if (typeof options.end === 'function') {
                options.end(downloadInfo);
            }
            resolve([null, downloadInfo.filePath]);
        });
        dl.on('error', (error) => {
            console.log('Download Failed', error);
            if (typeof options.error === 'function') {
                options.error(error);
            }
            resolve([error, url]);
        });
        dl.on('timeout', () => {
            console.log('Download Timeout');
            if (typeof options.timeout === 'function') {
                options.timeout('Download Timeout');
            }
            resolve(['Download Timeout', url]);
        });
        dl.start().catch((error) => {
            console.log('Download Failed', error);
            if (typeof options.error === 'function') {
                options.error(error);
            }
            resolve([error, url]);
        });
    });
}

});