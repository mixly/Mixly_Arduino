const chokidar = require('chokidar');

let watchedPath = {};

const watch = function(inPath) {
    if (watchedPath[watchedPath]) {
        return;
    }
    watchedPath[inPath] = chokidar.watch(inPath, {
        persistent: true,
        depth: 0,
        ignoreInitial: true
    });

    watchedPath[inPath].on('add', (actionPath, stats) => {
        self.postMessage({
            watcher: inPath,
            event: 'add',
            path: actionPath,
            stats
        });
    });

    watchedPath[inPath].on('addDir', (actionPath, stats) => {
        self.postMessage({
            watcher: inPath,
            event: 'addDir',
            path: actionPath,
            stats
        });
    });

    watchedPath[inPath].on('unlink', (actionPath, stats) => {
        self.postMessage({
            watcher: inPath,
            event: 'unlink',
            path: actionPath,
            stats
        });
    });

    watchedPath[inPath].on('unlinkDir', (actionPath, stats) => {
        self.postMessage({
            watcher: inPath,
            event: 'unlinkDir',
            path: actionPath,
            stats
        });
    });
}

const unwatch = function(inPath) {
    if (!watchedPath[inPath]) {
        return;
    }
    watchedPath[inPath].close();
    delete watchedPath[inPath];
}

self.addEventListener('message', function(event) {
    if (event.data.func === 'watch') {
        watch(...event.data.args);
    } else if (event.data.func === 'unwatch') {
        unwatch(...event.data.args);
    }
});