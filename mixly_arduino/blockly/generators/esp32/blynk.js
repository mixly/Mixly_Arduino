'use strict';
goog.provide('Blockly.Python.blynk');
goog.require('Blockly.Python');


// Blynk 第二版
// Blynk 自定义终端部件 Terminal
Blockly.Python['mpython_blynk_terminal_widget_vpin'] = function (block) {
    // Blockly.Python.definitions_['import_BlynkLib'] = 'import blynklib';
    var virtual_pin = Blockly.Python.valueToCode(block, 'virtual_pin', Blockly.Python.ORDER_ATOMIC);

    Blockly.Python.functions_['terminal_widget_vpin_' + virtual_pin] =
        `
ALLOWED_COMMANDS_LIST = ['ls', 'lsusb', 'ip a', 'ip abc']

@blynk.handle_event('write V${virtual_pin}')
def write_handler(pin, _values):
    header = ''
    result = ''
    delimiter = '{}\\n'.format('=' * 30)
    if _values and _values[0] in ALLOWED_COMMANDS_LIST:
        cmd_params = _values[0].split(' ')
        try:
            result = subprocess.check_output(cmd_params).decode('utf-8')
            header = '[output]\\n'
        except subprocess.CalledProcessError as exe_err:
            header = '[error]\\n'
            result = 'Return Code: {}\\n'.format(exe_err.returncode)
        except Exception as g_err:
            print("Command caused '{}'".format(g_err))
    elif _values and _values[0] == 'help':
        header = '[help -> allowed commands]\\n'
        result = '{}\\n'.format('\\n'.join(ALLOWED_COMMANDS_LIST))

    # communicate with terminal if help or some allowed command
    if result:
        output = '{}{}{}{}'.format(header, delimiter, result, delimiter)
        print(output)
        blynk.virtual_write(pin, output)
        blynk.virtual_write(pin, '\\n')
`

    var code = '';
    return code;
};

// Blynk 同步虚拟管脚的状态
Blockly.Python['mpython_blynk_sync_virtual'] = function (block) {
    // Blockly.Python.definitions_['import_BlynkLib'] = 'import blynklib';
    var virtual_pin = Blockly.Python.valueToCode(block, 'virtual_pin', Blockly.Python.ORDER_ATOMIC);

    var code = 'blynk.virtual_sync(' + virtual_pin + ')\n';
    return code;
};

// 斷開连接 Blynk
Blockly.Python['mpython_blynk_on_disconnected'] = function (block) {
    // Blockly.Python.definitions_['import_BlynkLib'] = 'import blynklib';

    var branch = Blockly.Python.statementToCode(block, 'DO');
    branch = Blockly.Python.addLoopTrap(branch, block.id) || Blockly.Python.PASS;

    Blockly.Python.definitions_['blynk_on_disconnected'] =
        '@blynk.handle_event("disconnect")\n' +
        'def connect_handler():\n' + 
        "    print('Blynk disconnected')\n" + branch;

    return '';
};

// 连接上 Blynk
Blockly.Python['mpython_blynk_on_connected'] = function (block) {
    // Blockly.Python.definitions_['import_BlynkLib'] = 'import blynklib';

    var branch = Blockly.Python.statementToCode(block, 'DO');
    branch = Blockly.Python.addLoopTrap(branch, block.id) || Blockly.Python.PASS;

    Blockly.Python.definitions_['blynk_on_connected'] =
        '@blynk.handle_event("connect")\n' +
        'def connect_handler():\n' + 
        "    print('Blynk connected')\n" + branch;

    return '';
};

// Blynk 定时器的进程生效并运行
Blockly.Python['mpython_blynktimer_run'] = function (block) {
    // Blockly.Python.definitions_['import_BlynkLib'] = 'import blynklib';
    // Blockly.Python.definitions_['import_blynktimer'] = 'import blynktimer';

    var code = 'blynk_timer.run()\n';
    return code;
};

// Blynk 进程生效并运行
Blockly.Python['mpython_blynk_run'] = function (block) {
    // Blockly.Python.definitions_['import_BlynkLib'] = 'import blynklib';

    var code = 'blynk.run()\n';
    return code;
};

// Blynk APP 显示通知
Blockly.Python['mpython_blynk_app_notify'] = function (block) {
    // Blockly.Python.definitions_['import_BlynkLib'] = 'import blynklib';
    var notification = Blockly.Python.valueToCode(block, 'notification', Blockly.Python.ORDER_ATOMIC);

    var code = 'blynk.notify(' + notification + ')\n';
    return code;
};

// 停止 Blynk 定时器 %1
Blockly.Python['mpython_blynk_stop_timers'] = function (block) {
    Blockly.Python.definitions_['import_blynktimer'] = 'import blynktimer';
    Blockly.Python.definitions_['def_blynktimer'] = 'blynk_timer = blynktimer.Timer(no_timers_err=False)';

    var timer_num = Blockly.Python.valueToCode(block, 'timer_num', Blockly.Python.ORDER_ATOMIC);
    var code = `blynk_timer.stop('${timer_num}_blynk_timer${timer_num}')` + '\n';

    return code;
};

// 可用的 Blynk 定时器
Blockly.Python['mpython_blynk_get_timers'] = function (block) {
    Blockly.Python.definitions_['import_blynktimer'] = 'import blynktimer';
    Blockly.Python.definitions_['def_blynktimer'] = 'blynk_timer = blynktimer.Timer(no_timers_err=False)';

    var code = `blynk_timer.get_timers()`;
    return [code, Blockly.Python.ORDER_ATOMIC];
};

//blynk定时器
Blockly.Python['mpython_blynktimer'] = function (block) {
    Blockly.Python.definitions_['import_blynktimer'] = 'import blynktimer';

    var Num = Blockly.Python.valueToCode(block, 'Num', Blockly.Python.ORDER_ATOMIC);
    var period = Blockly.Python.valueToCode(block, 'period', Blockly.Python.ORDER_ATOMIC);
    var Timer_mode = block.getFieldValue('Timer_mode');

    var branch = Blockly.Python.statementToCode(block, 'DO');
    branch = Blockly.Python.addLoopTrap(branch, block.id) || Blockly.Python.PASS;

    Blockly.Python.definitions_['def_blynktimer'] = 'blynk_timer = blynktimer.Timer(no_timers_err=False)';

    Blockly.Python.definitions_['blynktimer_event' + Num] =
        `
@blynk_timer.register(interval=${period}, run_once=${Timer_mode})
def blynk_timer${Num}():
`
         + branch;

    return '';
};

// 发送数据 %1 到 Bylnk APP 的虚拟管脚 %2
Blockly.Python['mpython_blynk_sensor_data_to_app'] = function (block) {
    // Blockly.Python.definitions_['import_BlynkLib'] = 'import blynklib';
    var sensor_data = Blockly.Python.valueToCode(block, 'sensor_data', Blockly.Python.ORDER_ATOMIC);
    var virtual_pin = Blockly.Python.valueToCode(block, 'virtual_pin', Blockly.Python.ORDER_ATOMIC);
    var code = 'blynk.virtual_write(' + virtual_pin + ', ' + sensor_data + ')\n';
    return code;
};

// 从 Bylnk APP 获取虚拟管脚 %1 的值
Blockly.Python['mpython_blynk_app_data'] = function (block) {

    // Blockly.Python.definitions_['import_BlynkLib'] = 'import blynklib';
    var virtual_pin = Blockly.Python.valueToCode(block, 'virtual_pin', Blockly.Python.ORDER_ATOMIC);

    var branch = Blockly.Python.statementToCode(block, 'DO');
    branch = Blockly.Python.addLoopTrap(branch, block.id) || Blockly.Python.PASS;

    Blockly.Python.definitions_['blynk_VIRTUAL_WRITE_' + virtual_pin] =
        "@blynk.handle_event('write V" + virtual_pin + "')\n" +
        'def write_virtual_pin_handler(pin, _value):\n' + 
        '    for i in range(0, len(_value)):\n' +
        '        try: _value[i] = eval(_value[i])\n' +
        '        except: pass\n' +
        '    if len(_value) == 1: _value = _value[0]\n' + branch;
    //'    print('+'"v' + virtual_pin + '_value: {}".format(_value))\n'
    // var code = 'blynk.run()\n';
    return '';
};

// 向 %1 发邮件  主题 %2 正文 %3
Blockly.Python['mpython_blynk_email'] = function (block) {
    var body = Blockly.Python.valueToCode(block, 'body', Blockly.Python.ORDER_ATOMIC);
    var subject = Blockly.Python.valueToCode(block, 'subject', Blockly.Python.ORDER_ATOMIC);
    var TargetEmail = Blockly.Python.valueToCode(block, 'TargetEmail', Blockly.Python.ORDER_ATOMIC);

    var code = `blynk.email(${TargetEmail}, ${subject}, ${body})` + '\n';
    return code;
};

// 给虚拟管脚添加   属性 %1 值 %2
Blockly.Python['mpython_blynk_set_property'] = function (block) {
    var attribute_value = Blockly.Python.valueToCode(block, 'attribute_value', Blockly.Python.ORDER_ATOMIC);
    var attribute_name = Blockly.Python.valueToCode(block, 'attribute_name', Blockly.Python.ORDER_ATOMIC);

    var code = `blynk.set_property(pin, ${attribute_name}, ${attribute_value})` + '\n';

    return code;
};

// Bylnk设置
Blockly.Python['mpython_blynk_setup'] = function (block) {
    Blockly.Python.definitions_['import_BlynkLib'] = 'import blynklib';
    var server = Blockly.Python.valueToCode(block, 'server', Blockly.Python.ORDER_ATOMIC);
    var auth = Blockly.Python.valueToCode(block, 'auth', Blockly.Python.ORDER_ATOMIC);
    var port = Blockly.Python.valueToCode(block, 'port', Blockly.Python.ORDER_ATOMIC);

    Blockly.Python.definitions_['mpython_blynk_setup'] =
        "blynk = blynklib.Blynk(" + auth + ", server=" + server + ", port=" + port + ")";

    Blockly.Python.definitions_['blynk_on_connected'] =
        `
@blynk.handle_event("connect")
def connect_handler():
    print('Blynk connected')
`

    Blockly.Python.definitions_['blynk_on_disconnected'] =
        `
@blynk.handle_event("disconnect")
def connect_handler():
    print('Blynk disconnected')
`

    return '';
};
