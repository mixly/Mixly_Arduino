// Blynk 第二版
// Blynk 自定义终端部件 Terminal
export const mpython_blynk_terminal_widget_vpin = function (_, generator) {
    // generator.definitions_['import_BlynkLib'] = 'import blynklib';
    var virtual_pin = generator.valueToCode(this, 'virtual_pin', generator.ORDER_ATOMIC);

    generator.functions_['terminal_widget_vpin_' + virtual_pin] =
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
}

// Blynk 同步虚拟管脚的状态
export const mpython_blynk_sync_virtual = function (_, generator) {
    // generator.definitions_['import_BlynkLib'] = 'import blynklib';
    var virtual_pin = generator.valueToCode(this, 'virtual_pin', generator.ORDER_ATOMIC);

    var code = 'blynk.virtual_sync(' + virtual_pin + ')\n';
    return code;
}

// 斷開连接 Blynk
export const mpython_blynk_on_disconnected = function (_, generator) {
    // generator.definitions_['import_BlynkLib'] = 'import blynklib';

    var branch = generator.statementToCode(this, 'DO');
    branch = generator.addLoopTrap(branch, this.id) || generator.PASS;

    generator.definitions_['blynk_on_disconnected'] =
        '@blynk.handle_event("disconnect")\n' +
        'def connect_handler():\n' +
        "    print('Blynk disconnected')\n" + branch;

    return '';
}

// 连接上 Blynk
export const mpython_blynk_on_connected = function (_, generator) {
    // generator.definitions_['import_BlynkLib'] = 'import blynklib';

    var branch = generator.statementToCode(this, 'DO');
    branch = generator.addLoopTrap(branch, this.id) || generator.PASS;

    generator.definitions_['blynk_on_connected'] =
        '@blynk.handle_event("connect")\n' +
        'def connect_handler():\n' +
        "    print('Blynk connected')\n" + branch;

    return '';
}

// Blynk 定时器的进程生效并运行
export const mpython_blynktimer_run = function () {
    // generator.definitions_['import_BlynkLib'] = 'import blynklib';
    // generator.definitions_['import_blynktimer'] = 'import blynktimer';

    var code = 'blynk_timer.run()\n';
    return code;
}

// Blynk 进程生效并运行
export const mpython_blynk_run = function () {
    // generator.definitions_['import_BlynkLib'] = 'import blynklib';

    var code = 'blynk.run()\n';
    return code;
}

// Blynk APP 显示通知
export const mpython_blynk_app_notify = function (_, generator) {
    // generator.definitions_['import_BlynkLib'] = 'import blynklib';
    var notification = generator.valueToCode(this, 'notification', generator.ORDER_ATOMIC);

    var code = 'blynk.notify(' + notification + ')\n';
    return code;
}

// 停止 Blynk 定时器 %1
export const mpython_blynk_stop_timers = function (_, generator) {
    generator.definitions_['import_blynktimer'] = 'import blynktimer';
    generator.definitions_['def_blynktimer'] = 'blynk_timer = blynktimer.Timer(no_timers_err=False)';

    var timer_num = generator.valueToCode(this, 'timer_num', generator.ORDER_ATOMIC);
    var code = `blynk_timer.stop('${timer_num}_blynk_timer${timer_num}')` + '\n';

    return code;
}

// 可用的 Blynk 定时器
export const mpython_blynk_get_timers = function (_, generator) {
    generator.definitions_['import_blynktimer'] = 'import blynktimer';
    generator.definitions_['def_blynktimer'] = 'blynk_timer = blynktimer.Timer(no_timers_err=False)';

    var code = `blynk_timer.get_timers()`;
    return [code, generator.ORDER_ATOMIC];
}

//blynk定时器
export const mpython_blynktimer = function (_, generator) {
    generator.definitions_['import_blynktimer'] = 'import blynktimer';

    var Num = generator.valueToCode(this, 'Num', generator.ORDER_ATOMIC);
    var period = generator.valueToCode(this, 'period', generator.ORDER_ATOMIC);
    var Timer_mode = this.getFieldValue('Timer_mode');

    var branch = generator.statementToCode(this, 'DO');
    branch = generator.addLoopTrap(branch, this.id) || generator.PASS;

    generator.definitions_['def_blynktimer'] = 'blynk_timer = blynktimer.Timer(no_timers_err=False)';

    generator.definitions_['blynktimer_event' + Num] =
        `
@blynk_timer.register(interval=${period}, run_once=${Timer_mode})
def blynk_timer${Num}():
`
        + branch;

    return '';
}

// 发送数据 %1 到 Bylnk APP 的虚拟管脚 %2
export const mpython_blynk_sensor_data_to_app = function (_, generator) {
    // generator.definitions_['import_BlynkLib'] = 'import blynklib';
    var sensor_data = generator.valueToCode(this, 'sensor_data', generator.ORDER_ATOMIC);
    var virtual_pin = generator.valueToCode(this, 'virtual_pin', generator.ORDER_ATOMIC);
    var code = 'blynk.virtual_write(' + virtual_pin + ', ' + sensor_data + ')\n';
    return code;
}

// 从 Bylnk APP 获取虚拟管脚 %1 的值
export const mpython_blynk_app_data = function (_, generator) {

    // generator.definitions_['import_BlynkLib'] = 'import blynklib';
    var virtual_pin = generator.valueToCode(this, 'virtual_pin', generator.ORDER_ATOMIC);

    var branch = generator.statementToCode(this, 'DO');
    branch = generator.addLoopTrap(branch, this.id) || generator.PASS;

    generator.definitions_['blynk_VIRTUAL_WRITE_' + virtual_pin] =
        "@blynk.handle_event('write V" + virtual_pin + "')\n" +
        'def write_virtual_pin_handler(pin, _value):\n' +
        '    for i in range(0, len(_value)):\n' +
        '        try: _value[i] = eval(_value[i])\n' +
        '        except: pass\n' +
        '    if len(_value) == 1: _value = _value[0]\n' + branch;
    //'    print('+'"v' + virtual_pin + '_value: {}".format(_value))\n'
    // var code = 'blynk.run()\n';
    return '';
}

// 向 %1 发邮件  主题 %2 正文 %3
export const mpython_blynk_email = function (_, generator) {
    var body = generator.valueToCode(this, 'body', generator.ORDER_ATOMIC);
    var subject = generator.valueToCode(this, 'subject', generator.ORDER_ATOMIC);
    var TargetEmail = generator.valueToCode(this, 'TargetEmail', generator.ORDER_ATOMIC);

    var code = `blynk.email(${TargetEmail}, ${subject}, ${body})` + '\n';
    return code;
}

// 给虚拟管脚添加   属性 %1 值 %2
export const mpython_blynk_set_property = function (_, generator) {
    var attribute_value = generator.valueToCode(this, 'attribute_value', generator.ORDER_ATOMIC);
    var attribute_name = generator.valueToCode(this, 'attribute_name', generator.ORDER_ATOMIC);

    var code = `blynk.set_property(pin, ${attribute_name}, ${attribute_value})` + '\n';

    return code;
}

// Bylnk设置
export const mpython_blynk_setup = function (_, generator) {
    generator.definitions_['import_BlynkLib'] = 'import blynklib';
    var server = generator.valueToCode(this, 'server', generator.ORDER_ATOMIC);
    var auth = generator.valueToCode(this, 'auth', generator.ORDER_ATOMIC);
    var port = generator.valueToCode(this, 'port', generator.ORDER_ATOMIC);

    generator.definitions_['mpython_blynk_setup'] =
        "blynk = blynklib.Blynk(" + auth + ", server=" + server + ", port=" + port + ")";

    generator.definitions_['blynk_on_connected'] =
        `
@blynk.handle_event("connect")
def connect_handler():
    print('Blynk connected')
`

    generator.definitions_['blynk_on_disconnected'] =
        `
@blynk.handle_event("disconnect")
def connect_handler():
    print('Blynk disconnected')
`

    return '';
}