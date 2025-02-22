export const SCoopTask = function (_, generator) {
    var _tasknum = this.getFieldValue('_tasknum');
    var statements_setup = generator.statementToCode(this, 'setup');
    var statements_loop = generator.statementToCode(this, 'loop');
    var taskcode = 'defineTask(scoopTask' + _tasknum + ')\n'
        + 'void scoopTask' + _tasknum + '::setup()\n'
        + '{\n'
        + statements_setup
        + '}\n'
        + 'void scoopTask' + _tasknum + '::loop()\n'
        + '{\n'
        + statements_loop
        + '}\n';
    generator.definitions_['include_Scoop'] = '#include "SCoop.h"';
    generator.setups_['scoop_start'] = 'mySCoop.start();';
    generator.definitions_['scoop_task' + _tasknum] = taskcode;
    var code = "";
    return code;
}

export const SCoop_yield = function () {
    var code = 'yield();\n';
    return code;
}

export const SCoop_sleep = function (_, generator) {
    var value_sleeplength = generator.valueToCode(this, 'sleeplength', generator.ORDER_ATOMIC);
    var code = 'sleep(' + value_sleeplength + ');\n'
    return code;
}