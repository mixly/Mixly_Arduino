class MixIO {
    
    static HELLO = 'b640a0ce465fa2a4150c36b305c1c11b';
    static BYE = '9d634e1a156dc0c1611eb4c3cff57276';
    static PUBLIC_USER = 'MixIO_public';

    constructor(broker, port, username, password, project, clientId) {
        this.broker = broker;
        this.port = port;
        this.username = username;
        this.password = password;
        this.project = project;
        this.clientId = clientId;
        this.client = mqtt.connect(`wss://${broker}:${port}`, {
            username: this.username,
            password: this.password,
            clientId: this.clientId,
            will: this.username != MixIO.PUBLIC_USER ? {
                topic: `${this.username}/${this.project}/${MixIO.BYE}`,
                payload: this.clientId,
                qos: 0,
                retain: false
            } : undefined
        });
        this.callbacks = [];
        this.client.on('connect', () => this.onConnect());
        this.client.on('message', (topic, message) => this.onMessage(topic, message.toString()));
    }

    static fromMixlyKey(broker, port, mixlyKey, clientId) {
        const username = MixIO.PUBLIC_USER;
        const password = MixIO.PUBLIC_USER;
        const project = mixlyKey;
        return new MixIO(broker, port, username, password, project, clientId);
    }

    static async fromShareKey(broker, port, shareKey, clientId) {
        const response = await axios.get(`https://mixio.mixly.cn/mixio-php/sharekey.php?sk=${shareKey}`);
        if(response.status == 200) {
            if(response.data == "-1"){
                throw new Error("share key error");
            }
            else{
                const jsonR = response.data;
                const username = jsonR['userName'];
                const password = jsonR['projectPass'];
                const project = jsonR['projectName'];
                return new MixIO(broker, port, username, password, project, clientId);
            }
        }
    }

    onMessage(topic, message) {
        const topicPart = topic.split('/').pop();
        this.callbacks.forEach(callbackObj => {
            if(callbackObj.topic == topicPart) {
                callbackObj.callback(this.client, topicPart, message);
            }
        });
    }

    onConnect() {
        if(this.client.connected) {
            if(this.username != MixIO.PUBLIC_USER) {
                this.client.publish(`${this.username}/${this.project}/${MixIO.HELLO}`, this.clientId);
            }
            console.log("Connected to MixIO!");
        } else {
            console.log("Failed to connect");
        }
    }

    publish(topic, message) {
        if(this.username != MixIO.PUBLIC_USER) {
            this.client.publish(`${this.username}/${this.project}/${topic}`, message);
        } else {
            this.client.publish(`MixIO/${this.project}/default/${topic}`, message);
        }
    }

    subscribeAndSetCallback(topic, callback) {
        if(this.username != MixIO.PUBLIC_USER) {
            this.client.subscribe(`${this.username}/${this.project}/${topic}`);
            this.callbacks.push({topic: topic, callback: callback});
        } else {
            this.client.subscribe(`MixIO/${this.project}/default/${topic}`);
            this.callbacks.push({topic: topic, callback: callback});
        }
    }

    unsubscribe(topic) {
        if(this.username != MixIO.PUBLIC_USER) {
            this.client.unsubscribe(`${this.username}/${this.project}/${topic}`);
        } else {
            this.client.unsubscribe(`MixIO/${this.project}/default/${topic}`);
        }
    }

    disconnect() {
        if(this.username != MixIO.PUBLIC_USER) {
            this.client.publish(`${this.username}/${this.project}/${MixIO.BYE}`, this.clientId);
        }
        this.client.end();
    }
}
