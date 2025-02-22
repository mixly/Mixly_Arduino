export const WEATHER_NOW = function (_, generator) {
    generator.definitions_['import_seniverse_api'] = "import seniverse_api";
    var dropdown_mode = this.getFieldValue('mode');
    var key = generator.valueToCode(this, 'key', generator.ORDER_ATOMIC);
    var addr = generator.valueToCode(this, 'addr', generator.ORDER_ATOMIC);
    var code = 'seniverse_api.' + dropdown_mode + '(' + key + ',' + addr + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const WEATHER_DAILY = function (_, generator) {
    generator.definitions_['import_seniverse_api'] = "import seniverse_api";
    var dropdown_mode = this.getFieldValue('mode');
    var key = generator.valueToCode(this, 'key', generator.ORDER_ATOMIC);
    var addr = generator.valueToCode(this, 'addr', generator.ORDER_ATOMIC);
    var day = generator.valueToCode(this, 'day', generator.ORDER_ATOMIC);
    var code = 'seniverse_api.' + dropdown_mode + '(' + key + ',' + addr + ',' + day + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const WEATHER_HOUR = function (_, generator) {
    generator.definitions_['import_seniverse_api'] = "import seniverse_api";
    var key = generator.valueToCode(this, 'key', generator.ORDER_ATOMIC);
    var addr = generator.valueToCode(this, 'addr', generator.ORDER_ATOMIC);
    var hour = generator.valueToCode(this, 'hour', generator.ORDER_ATOMIC);
    var code = 'seniverse_api.weather_hourly(' + key + ',' + addr + ',' + hour + ')';
    return [code, generator.ORDER_ATOMIC];
}

export const Weather_now = function (_, generator) {
    generator.definitions_['import_seniverse_api*'] = "from seniverse_api import *";
    var dropdown_mode = this.getFieldValue('mode');
    var key = generator.valueToCode(this, 'key', generator.ORDER_ATOMIC);
    var addr = generator.valueToCode(this, 'addr', generator.ORDER_ATOMIC);
    var code = dropdown_mode + '.request(' + key + ',' + addr + ')\n';
    return code;
};

export const Weather_now_content = function (_, generator) {
    generator.definitions_['import_seniverse_api*'] = "from seniverse_api import *";
    var content = this.getFieldValue('content');
    if (content == 'none') {
        var code = 'Weather_now.analysis()';
    }
    else {
        var code = 'Weather_now.analysis("' + content + '")';
    }
    return [code, generator.ORDER_ATOMIC];
};

export const Air_now_content = function (_, generator) {
    generator.definitions_['import_seniverse_api*'] = "from seniverse_api import *";
    var content = this.getFieldValue('content');
    if (content == 'none') {
        var code = 'Air_now.analysis()';
    }
    else {
        var code = 'Air_now.analysis("' + content + '")';
    }
    return [code, generator.ORDER_ATOMIC];
};

export const Weather_alarm_content = function (_, generator) {
    generator.definitions_['import_seniverse_api*'] = "from seniverse_api import *";
    var content = this.getFieldValue('content');
    if (content == 'none') {
        var code = 'Weather_alarm.analysis()';
    }
    else {
        var code = 'Weather_alarm.analysis("' + content + '")';
    }
    return [code, generator.ORDER_ATOMIC];
};

export const Life_suggestion_content = function (_, generator) {
    generator.definitions_['import_seniverse_api*'] = "from seniverse_api import *";
    var content = this.getFieldValue('content');
    if (content == 'none') {
        var code = 'Life_suggestion.analysis()';
    }
    else {
        var code = 'Life_suggestion.analysis("' + content + '")';
    }
    return [code, generator.ORDER_ATOMIC];
};

export const Tide_daily_content = function (_, generator) {
    generator.definitions_['import_seniverse_api*'] = "from seniverse_api import *";
    var content = this.getFieldValue('content');
    if (content == 'none') {
        var code = 'Tide_daily.analysis()';
    }
    else {
        var code = 'Tide_daily.analysis("' + content + '")';
    }
    return [code, generator.ORDER_ATOMIC];
};

export const Location_search_content = function (_, generator) {
    generator.definitions_['import_seniverse_api*'] = "from seniverse_api import *";
    var content = this.getFieldValue('content');
    if (content == 'none') {
        var code = 'Location_search.analysis()';
    }
    else {
        var code = 'Location_search.analysis("' + content + '")';
    }
    return [code, generator.ORDER_ATOMIC];
};

export const Weather_daily = function (_, generator) {
    generator.definitions_['import_seniverse_api*'] = "from seniverse_api import *";
    var dropdown_mode = this.getFieldValue('mode');
    var key = generator.valueToCode(this, 'key', generator.ORDER_ATOMIC);
    var addr = generator.valueToCode(this, 'addr', generator.ORDER_ATOMIC);
    var day = generator.valueToCode(this, 'day', generator.ORDER_ATOMIC);
    var code = dropdown_mode + '.request(' + key + ',' + addr + ',' + day + ')\n';
    return code;
};

export const Weather_daily_content = function (_, generator) {
    generator.definitions_['import_seniverse_api*'] = "from seniverse_api import *";
    var content = this.getFieldValue('content');
    var day = generator.valueToCode(this, 'day', generator.ORDER_ATOMIC);
    if (content == 'none') {
        var code = 'Weather_daily.analysis('+day+')';
    }
    else {
        var code = 'Weather_daily.analysis(' + day + ',"' + content + '")';
    }
    return [code, generator.ORDER_ATOMIC];
};

export const Air_daily_content = function (_, generator) {
    generator.definitions_['import_seniverse_api*'] = "from seniverse_api import *";
    var content = this.getFieldValue('content');
    var day = generator.valueToCode(this, 'day', generator.ORDER_ATOMIC);
    if (content == 'none') {
        var code = 'Air_daily.analysis('+day+')';
    }
    else {
        var code = 'Air_daily.analysis(' + day + ',"' + content + '")';
    }
    return [code, generator.ORDER_ATOMIC];
};

export const Geo_sun_content = function (_, generator) {
    generator.definitions_['import_seniverse_api*'] = "from seniverse_api import *";
    var content = this.getFieldValue('content');
    var day = generator.valueToCode(this, 'day', generator.ORDER_ATOMIC);
    if (content == 'none') {
        var code = 'Geo_sun.analysis('+day+')';
    }
    else {
        var code = 'Geo_sun.analysis(' + day + ',"' + content + '")';
    }
    return [code, generator.ORDER_ATOMIC];
};

export const Geo_moon_content = function (_, generator) {
    generator.definitions_['import_seniverse_api*'] = "from seniverse_api import *";
    var content = this.getFieldValue('content');
    var day = generator.valueToCode(this, 'day', generator.ORDER_ATOMIC);
    if (content == 'none') {
        var code = 'Geo_moon.analysis('+day+')';
    }
    else {
        var code = 'Geo_moon.analysis(' + day + ',"' + content + '")';
    }
    return [code, generator.ORDER_ATOMIC];
};