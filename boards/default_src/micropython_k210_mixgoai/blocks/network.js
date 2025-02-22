import * as Blockly from 'blockly/core';

const NETWORK_HUE = '#5B6DA5';

export const network_init = {
    init: function () {
        this.setColour(NETWORK_HUE);
        this.appendDummyInput()
            .appendField("ESP-AT 初始化");
        this.appendValueInput("RX", Number)
            .appendField("RX#")
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT);
        this.appendValueInput("TX", Number)
            .appendField("TX#")
            .setCheck(Number)
            .setAlign(Blockly.inputs.Align.RIGHT);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip("使用串口连接ESP-AT设备，并初始化配置");
    }
};

export const network_scan = {
    init: function () {
        this.setColour(NETWORK_HUE);
        this.appendDummyInput()
            .appendField("WiFi扫描");
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip("扫描附近可用的WiFi信息-返回多信息列表");
    }
};

export const network_connect = {
    init: function () {
        this.setColour(NETWORK_HUE);
        this.appendDummyInput("")
            .appendField("WiFi连接");
        this.appendValueInput('account')
            .appendField("名称")
            .setCheck(String);
        this.appendValueInput('password')
            .appendField("密码")
            .setCheck(String);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip("配置WiFi名称及密码，连接WiFi上网");
    }
};

export const network_ifconfig = {
    init: function () {
        this.setColour(NETWORK_HUE);
        this.appendDummyInput()
            .appendField("WiFi")
            .appendField(new Blockly.FieldDropdown([
                ['连接信息', "1"],
                ['连接状态', "2"]
            ]), "mode");
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip("查看wifi连接信息或者连接状态");
    }
};

export const network_disconnect = {
    init: function () {
        this.setColour(NETWORK_HUE);
        this.appendDummyInput()
            .appendField("WiFi断开连接");
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip("断开wifi连接");
    }
};

export const network_enable_ap = {
    init: function () {
        this.setColour(NETWORK_HUE);
        this.appendDummyInput("")
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("打开热点");
        this.appendValueInput('account')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("名称")
            .setCheck(String);
        this.appendValueInput('password')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("密码")
            .setCheck(String);
        this.appendValueInput('chl')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("通道")
            .setCheck(Number);
        this.appendDummyInput()
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("加密")
            .appendField(new Blockly.FieldDropdown([
                ['WPA2_PSK', "WPA2_PSK"],
                ['OPEN', "OPEN"],
                ['WPA_PSK', "WPA_PSK"],
                ['WPA_WPA2_PSK', "WPA_WPA2_PSK"]
            ]), "mode");
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip("打开WiFi热点并配置");
    }
};

export const network_disable_ap = {
    init: function () {
        this.setColour(NETWORK_HUE);
        this.appendDummyInput()
            .appendField("关闭热点");
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip("关闭热点");
    }
};



//ok
export const network_socket_init = {
    init: function () {
        this.setColour(NETWORK_HUE);
        this.appendValueInput('VAR')
            .appendField('')
            .setCheck("var");
        this.appendDummyInput()
            .appendField("套接字 初始化");
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip("套接字初始化");
    }
};

//ok
export const network_socket_getaddrinfo = {
    init: function () {
        this.setColour(NETWORK_HUE);
        this.appendValueInput('VAR')
            .appendField("")
            .setCheck("var");
        this.appendDummyInput()
            .appendField("获取地址");
        this.appendValueInput('addr')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("域名")
            .setCheck(String);
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip("套接字根据域名解析地址IP信息");
    }
};

//ok
export const network_socket_connect = {
    init: function () {
        this.setColour(NETWORK_HUE);
        this.appendValueInput('VAR')
            .appendField("")
            .setCheck("var");
        this.appendDummyInput()
            .appendField("创建连接");
        this.appendValueInput('address')
            .appendField("地址");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip("套接字创建目标IP地址连接");
    }
};

//ok
export const network_socket_settimeout = {
    init: function () {
        this.setColour(NETWORK_HUE);
        this.appendValueInput('VAR')
            .appendField("")
            .setCheck("var");
        this.appendDummyInput()
            .appendField("超时时间");
        this.appendValueInput('time')
            .setAlign(Blockly.inputs.Align.RIGHT)
            .appendField("")
            .setCheck(Number);
        this.appendDummyInput()
            .appendField("s");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip("设置阻塞套接字超时时间");
    }
};
//ok
export const network_socket_send = {
    init: function () {
        this.setColour(NETWORK_HUE);
        this.appendValueInput('VAR')
            .appendField("")
            .setCheck("var");
        this.appendValueInput('content')
            .appendField("发送数据")
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip("套接发送数据");
    }
};
//ok
export const network_socket_receive = {
    init: function () {
        this.setColour(NETWORK_HUE);
        this.appendValueInput('VAR')
            .appendField("")
            .setCheck("var");
        this.appendDummyInput()
            .appendField("接收数据");
        this.appendValueInput('size')
            .appendField("字节")
            .setCheck(Number);
        this.setOutput(true);
        this.setInputsInline(true);
        this.setTooltip("套接接收数据，返回接收到的数据对象");
    }
};


export const network_socket_close = {
    init: function () {
        this.setColour(NETWORK_HUE);
        this.appendValueInput('VAR')
            .setCheck("var")
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_MICROPYTHON_SOCKET_CLOSE);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
        this.setTooltip(Blockly.Msg.MIXLY_ESP32_NETWORK_SOCKET_CLOSE_TOOLTIP);
    }
};