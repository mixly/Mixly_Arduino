goog.loadJs('web', () => {

goog.require('io');
goog.require('Mixly');
goog.provide('Mixly.WebSocket');


class WebSocket {
    #socket_ = null;
    constructor(path, option) {
        this.#socket_ = io(path, option);
    }

    #detectStatus_(status, callback) {
        window.setTimeout(() => {
            if (status.finished) {
                return;
            }
            if (this.isConnected()) {
                this.#detectStatus_(status, callback);
            } else {
                callback({
                    error: 'socket is not connected'
                });
                status.finished = true;
            }
        }, 1000);
    }

    emit(eventName, ...args) {
        const callback = args.pop();
        if (this.isConnected()) {
            let emitStatus = {
                finished: false
            };
            let status = this.#socket_.emit(eventName, ...args, (...callbackArgs) => {
                if (emitStatus.finished) {
                    return;
                }
                emitStatus.finished = true;
                callback(...callbackArgs);
            });
            this.#detectStatus_(emitStatus, callback);
            return status;
        } else {
            callback({
                error: 'socket is not connected'
            });
            return false;
        }
    }

    async emitAsync(eventName, ...args) {
        return new Promise((resolve, reject) => {
            if (this.isConnected()) {
                const callback = (...callbackArgs) => {
                    if (callbackArgs[0].error) {
                        reject(callbackArgs[0].error);
                        return;
                    }
                    resolve(...callbackArgs);
                }
                let emitStatus = {
                    finished: false
                };
                let status = this.#socket_.emit(eventName, ...args, (...callbackArgs) => {
                    if (emitStatus.finished) {
                        return;
                    }
                    emitStatus.finished = true;
                    callback(...callbackArgs);
                });
                this.#detectStatus_(emitStatus, callback);
            } else {
                reject('socket is not connected');
            }
        })
    }

    getSocket() {
        return this.#socket_;
    }

    isConnected() {
        return this.#socket_?.connected;
    }
}

Mixly.WebSocket = WebSocket;

});