import * as Blockly from 'blockly/core';

const WEATHER_HUE = '#27b6ac';

export const WEATHER_NOW = {
    init: function () {
        this.setColour(WEATHER_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MSG.catweather)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLY_WEB_DATA_SENIVERSE_GET_WEATHER_NOW, "weather_now"],
                [Blockly.Msg.MIXLY_WEB_DATA_SENIVERSE_GET_WEATHER_ALARM, "weather_alarm"],
                [Blockly.Msg.MIXLY_WEB_DATA_SENIVERSE_GET_AIR_NOW, "air_now"],
                [Blockly.Msg.MIXLY_WEB_DATA_SENIVERSE_GET_TIDE_DAILY, "tide_daily"],
                [Blockly.Msg.MIXLY_WEB_PLACE + Blockly.Msg.HTML_SEARCH, "location_search"]
            ]), "mode");
        this.appendValueInput('key')
            .appendField(Blockly.Msg.MIXLY_API_PRIVATE_KEY);
        this.appendValueInput('addr')
            .appendField(Blockly.Msg.MIXLY_GEOGRAPHIC_LOCATION);
        this.setInputsInline(true);
        this.setOutput(true);
    }
};

export const WEATHER_DAILY = {
    init: function () {
        this.setColour(WEATHER_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MSG.catweather)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLY_WEB_DATA_SENIVERSE_GET_WEATHER_DAILY, "weather_daily"],
                [Blockly.Msg.MIXLY_WEB_DATA_SENIVERSE_GET_LIFE_SUGGESTION, "life_suggestion"],
                [Blockly.Msg.MIXLY_WEB_DATA_SENIVERSE_GET_AIR_DAILY, "air_daily"],
                [Blockly.Msg.MIXLY_WEB_DATA_SENIVERSE_GET_GEO_SUN, "geo_sun"],
                [Blockly.Msg.MIXLY_WEB_DATA_SENIVERSE_GET_GEO_MOON, "geo_moon"]
            ]), "mode");
        this.appendValueInput('key')
            .appendField(Blockly.Msg.MIXLY_API_PRIVATE_KEY);
        this.appendValueInput('addr')
            .appendField(Blockly.Msg.MIXLY_GEOGRAPHIC_LOCATION);
        this.appendValueInput('day')
            .appendField(Blockly.Msg.MIXLY_WEB_DAILY);
        this.setInputsInline(true);
        this.setOutput(true);
    }
};

export const WEATHER_HOUR = {
    init: function () {
        this.setColour(WEATHER_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MSG.catweather)
            .appendField(Blockly.Msg.MIXLY_WEB_DATA_SENIVERSE_GET_WEATHER_HOURS);
        this.appendValueInput('key')
            .appendField(Blockly.Msg.MIXLY_API_PRIVATE_KEY);
        this.appendValueInput('addr')
            .appendField(Blockly.Msg.MIXLY_GEOGRAPHIC_LOCATION);
        this.appendValueInput('hour')
            .appendField(Blockly.Msg.MIXLY_WEB_HOURS);
        this.setInputsInline(true);
        this.setOutput(true);
    }
};

export const Weather_now = {
    init: function () {
        this.setColour(WEATHER_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MSG.catweather)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLY_WEB_DATA_SENIVERSE_GET_WEATHER_NOW, "Weather_now"],
                [Blockly.Msg.MIXLY_WEB_DATA_SENIVERSE_GET_WEATHER_ALARM, "Weather_alarm"],
                [Blockly.Msg.MIXLY_WEB_DATA_SENIVERSE_GET_AIR_NOW, "Air_now"],
                [Blockly.Msg.MIXLY_WEB_DATA_SENIVERSE_GET_TIDE_DAILY, "Tide_daily"],
                [Blockly.Msg.MIXLY_WEB_PLACE + Blockly.Msg.HTML_SEARCH, "Location_search"],
                [Blockly.Msg.MIXLY_WEB_DATA_SENIVERSE_GET_LIFE_SUGGESTION, "Life_suggestion"]
            ]), "mode");
        this.appendValueInput('key')
            .appendField(Blockly.Msg.MIXLY_API_PRIVATE_KEY);
        this.appendValueInput('addr')
            .appendField(Blockly.Msg.MIXLY_GEOGRAPHIC_LOCATION);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};

export const Weather_now_content = {
    init: function () {
        this.setColour(WEATHER_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_WEB_DATA_SENIVERSE_GET_WEATHER_NOW + Blockly.Msg.MIXLY_BELONG);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLY_PARAMETER_FREE, "none"],
                [Blockly.Msg.MIXLY_WEATHER_PHENOMENON, "text"],
                [Blockly.Msg.MIXLY_WEATHER_PHENOMENON_CODE, "code"],
                [Blockly.Msg.MIXLY_TEMPERATURE + Blockly.Msg.MIXLY_TEMPERATURE_UNIT_, "temperature"],
                [Blockly.Msg.MIXLY_WEB_DATA_SENIVERSE_GET_WEATHER_NOW_FEEL, "feels_like"],
                [Blockly.Msg.MIXLY_Altitude + Blockly.Msg.MIXLY_PRESSURE_UNIT, "pressure"],
                [Blockly.Msg.MIXLY_WEB_DATA_SENIVERSE_GET_WEATHER_NOW_HUMIDITY, "humidity"],
                [Blockly.Msg.MIXLY_WEB_DATA_SENIVERSE_GET_WEATHER_NOW_VISIBILITY, "visibility"],
                [Blockly.Msg.ForecastFx, "wind_direction"],
                [Blockly.Msg.MIXLY_WEB_DATA_SENIVERSE_GET_WEATHER_NOW_WIND_DIRECT_DEGREE, "wind_direction_degree"],
                [Blockly.Msg.MIXLY_WEB_DATA_SENIVERSE_GET_WEATHER_NOW_WIND_SPEED, "wind_speed"],
                [Blockly.Msg.MIXLY_WIND_RATING, "wind_scale"],
                [Blockly.Msg.MIXLY_WEB_DATA_SENIVERSE_GET_WEATHER_NOW_CLOUDS, "clouds"]
            ]), "content");
        this.setInputsInline(true);
        this.setOutput(true);
    }
};

export const Air_now_content = {
    init: function () {
        this.setColour(WEATHER_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_WEB_DATA_SENIVERSE_GET_AIR_NOW + Blockly.Msg.MIXLY_BELONG);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLY_PARAMETER_FREE, "none"],
                [Blockly.Msg.MIXLY_AIR_NOW_AIRQUAILTY, "api"],
                [Blockly.Msg.MIXLY_AIR_NOW_PM25, "pm25"],
                [Blockly.Msg.MIXLY_AIR_NOW_PM10, "pm10"],
                [Blockly.Msg.MIXLY_AIR_NOW_so2, "so2"],
                [Blockly.Msg.MIXLY_AIR_NOW_no2, "no2"],
                [Blockly.Msg.MIXLY_AIR_NOW_co, "co"],
                [Blockly.Msg.MIXLY_AIR_NOW_o3, "o3"],
                [Blockly.Msg.MIXLY_AIR_NOW_pp, "primary_pollutant"],
                [Blockly.Msg.MIXLY_AIR_NOW_quailty, "quality"],
                [Blockly.Msg.MIXLY_AIR_NOW_last_update, "last_update"]
            ]), "content");
        this.setInputsInline(true);
        this.setOutput(true);
    }
};

export const Weather_alarm_content = {
    init: function () {
        this.setColour(WEATHER_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_WEB_DATA_SENIVERSE_GET_WEATHER_ALARM + Blockly.Msg.MIXLY_BELONG);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLY_PARAMETER_FREE, "none"],
                [Blockly.Msg.MIXLY_WEATHER_ALARM_TITLE, "title"],
                [Blockly.Msg.MIXLY_WEATHER_ALARM_TYPE, "type"],
                [Blockly.Msg.MIXLY_WEATHER_ALARM_LEVEL, "level"],
                [Blockly.Msg.MIXLY_WEATHER_ALARM_DESCRIPTION, "description"],
                [Blockly.Msg.MIXLY_WEATHER_ALARM_PUB_DATE, "pub_date"]
            ]), "content");
        this.setInputsInline(true);
        this.setOutput(true);
    }
};

export const Life_suggestion_content = {
    init: function () {
        this.setColour(WEATHER_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_WEB_DATA_SENIVERSE_GET_LIFE_SUGGESTION + Blockly.Msg.MIXLY_BELONG);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLY_PARAMETER_FREE, "none"],
                [Blockly.Msg.MIXLY_LIFE_SUGGESTION_AC, "ac"],
                [Blockly.Msg.MIXLY_LIFE_SUGGESTION_AP, "air_pollution"],
                [Blockly.Msg.MIXLY_LIFE_SUGGESTION_AIRING, "airing"],
                [Blockly.Msg.MIXLY_LIFE_SUGGESTION_ALLERGY, "allergy"],
                [Blockly.Msg.MIXLY_LIFE_SUGGESTION_BEER, "beer"],
                [Blockly.Msg.MIXLY_LIFE_SUGGESTION_BOATING, "boating"],
                [Blockly.Msg.MIXLY_LIFE_SUGGESTION_CAR_WS, "car_washing"],
                [Blockly.Msg.MIXLY_LIFE_SUGGESTION_CHILL, "chill"],
                [Blockly.Msg.MIXLY_LIFE_SUGGESTION_COMFORT, "comfort"],
                [Blockly.Msg.MIXLY_LIFE_SUGGESTION_DATING, "dating"],
                [Blockly.Msg.MIXLY_LIFE_SUGGESTION_DRESSING, "dressing"],
                [Blockly.Msg.MIXLY_LIFE_SUGGESTION_FISHING, "fishing"],
                [Blockly.Msg.MIXLY_LIFE_SUGGESTION_FLU, "flu"],
                [Blockly.Msg.MIXLY_LIFE_SUGGESTION_HAIR_DRESS, "hair_dressing"],
                [Blockly.Msg.MIXLY_LIFE_SUGGESTION_KITEFLYING, "kiteflying"],
                [Blockly.Msg.MIXLY_LIFE_SUGGESTION_MAKEUP, "makeup"],
                [Blockly.Msg.MIXLY_LIFE_SUGGESTION_MOOD, "mood"],
                [Blockly.Msg.MIXLY_LIFE_SUGGESTION_MORNINIG_SPORT, "morning_sport"],
                [Blockly.Msg.MIXLY_LIFE_SUGGESTION_NIGHT_LIFE, "night_life"],
                [Blockly.Msg.MIXLY_LIFE_SUGGESTION_ROAD_CONDI, "road_condition"],
                [Blockly.Msg.MIXLY_LIFE_SUGGESTION_SHOPPING, "shopping"],
                [Blockly.Msg.MIXLY_LIFE_SUGGESTION_SPORT, "sport"],
                [Blockly.Msg.MIXLY_LIFE_SUGGESTION_SUNSCREEN, "sunscreen"],
                [Blockly.Msg.MIXLY_LIFE_SUGGESTION_TRAFFIC, "traffic"],
                [Blockly.Msg.MIXLY_LIFE_SUGGESTION_TRAVEL, "travel"],
                [Blockly.Msg.MIXLY_LIFE_SUGGESTION_UMBRELLA, "umbrella"],
                [Blockly.Msg.MIXLY_LIFE_SUGGESTION_UV, "uv"]
            ]), "content");
        this.setInputsInline(true);
        this.setOutput(true);
    }
};

export const Tide_daily_content = {
    init: function () {
        this.setColour(WEATHER_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_WEB_DATA_SENIVERSE_GET_TIDE_DAILY + Blockly.Msg.MIXLY_BELONG);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLY_PARAMETER_FREE, "none"],
                [Blockly.Msg.MIXLY_GPS_DATE, "date"],
                [Blockly.Msg.MIXLY_TIDE_DAILY_HEIGHT, "tide"],
                [Blockly.Msg.MIXLY_TIDE_DAILY_0_TIME, "0,time"],
                [Blockly.Msg.MIXLY_TIDE_DAILY_0_HEIGHT, "0,height"],
                [Blockly.Msg.MIXLY_TIDE_DAILY_1_TIME, "1,time"],
                [Blockly.Msg.MIXLY_TIDE_DAILY_1_HEIGHT, "1,height"],
                [Blockly.Msg.MIXLY_TIDE_DAILY_2_TIME, "2,time"],
                [Blockly.Msg.MIXLY_TIDE_DAILY_2_HEIGHT, "2,height"],
                [Blockly.Msg.MIXLY_TIDE_DAILY_3_TIME, "3,time"],
                [Blockly.Msg.MIXLY_TIDE_DAILY_3_HEIGHT, "3,height"]
            ]), "content");
        this.setInputsInline(true);
        this.setOutput(true);
    }
};

export const Location_search_content = {
    init: function () {
        this.setColour(WEATHER_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_WEB_PLACE + Blockly.Msg.HTML_SEARCH + Blockly.Msg.MIXLY_BELONG);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLY_PARAMETER_FREE, "none"],
                [Blockly.Msg.MIXLY_LOCATION_SEARCH_ID, "id"],
                [Blockly.Msg.MIXLY_LOCATION_SEARCH_NAME, "name"],
                [Blockly.Msg.MIXLY_LOCATION_SEARCH_COUNTRY, "country"],
                [Blockly.Msg.MIXLY_LOCATION_SEARCH_PATH, "path"],
                [Blockly.Msg.MIXLY_LOCATION_SEARCH_TIMEZONE, "timezone"],
                [Blockly.Msg.MIXLY_LOCATION_SEARCH_TIMEZONE_O, "timezone_offset"]
            ]), "content");
        this.setInputsInline(true);
        this.setOutput(true);
    }
};

export const Weather_daily = {
    init: function () {
        this.setColour(WEATHER_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MSG.catweather)
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLY_WEB_DATA_SENIVERSE_GET_WEATHER_DAILY, "Weather_daily"],
                [Blockly.Msg.MIXLY_WEB_DATA_SENIVERSE_GET_AIR_DAILY, "Air_daily"],
                [Blockly.Msg.MIXLY_WEB_DATA_SENIVERSE_GET_GEO_SUN, "Geo_sun"],
                [Blockly.Msg.MIXLY_WEB_DATA_SENIVERSE_GET_GEO_MOON, "Geo_moon"]
            ]), "mode");
        this.appendValueInput('key')
            .appendField(Blockly.Msg.MIXLY_API_PRIVATE_KEY);
        this.appendValueInput('addr')
            .appendField(Blockly.Msg.MIXLY_GEOGRAPHIC_LOCATION);
        this.appendValueInput('day')
            .appendField(Blockly.Msg.MIXLY_WEB_DAILY);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};

export const Weather_daily_content = {
    init: function () {
        this.setColour(WEATHER_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_WEB_DATA_SENIVERSE_GET_WEATHER_DAILY);
        this.appendValueInput('day')
            .appendField(Blockly.Msg.LISTS_GET_INDEX_FROM_START);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_WEB_DATA_SENIVERSE_GET_WEATHER_DAILY_DAY + Blockly.Msg.MIXLY_BELONG);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLY_PARAMETER_FREE, "none"],
                [Blockly.Msg.MIXLY_GPS_DATE, "date"],
                [Blockly.Msg.MIXLY_DAYTIME_WEATHER_PHENOMENON, "text_day"],
                [Blockly.Msg.MIXLY_DAYTIME_WEATHER_PHENOMENON_CODE, "code_day"],
                [Blockly.Msg.MIXLY_EVENING_WEATHER_PHENOMENON, "text_night"],
                [Blockly.Msg.MIXLY_EVENING_WEATHER_PHENOMENON_CODE, "code_night"],
                [Blockly.Msg.ForecastHigh + Blockly.Msg.MIXLY_TEMPERATURE_UNIT_, "high"],
                [Blockly.Msg.ForecastLow + Blockly.Msg.MIXLY_TEMPERATURE_UNIT_, "low"],
                [Blockly.Msg.MIXLY_PROBABILITY_OF_PRECIPITATION, "precip"],
                [Blockly.Msg.ForecastFx, "wind_direction"],
                [Blockly.Msg.MIXLY_WEB_DATA_SENIVERSE_GET_WEATHER_NOW_WIND_DIRECT_DEGREE, "wind_direction_degree"],
                [Blockly.Msg.MIXLY_WEB_DATA_SENIVERSE_GET_WEATHER_NOW_WIND_SPEED, "wind_speed"],
                [Blockly.Msg.MIXLY_WIND_RATING, "wind_scale"],
                [Blockly.Msg.MIXLY_RAINFALL, "rainfall"],
                [Blockly.Msg.MIXLY_WEB_DATA_SENIVERSE_GET_WEATHER_NOW_HUMIDITY, "humidity"]
            ]), "content");
        this.setInputsInline(true);
        this.setOutput(true);
    }
};

export const Air_daily_content = {
    init: function () {
        this.setColour(WEATHER_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_WEB_DATA_SENIVERSE_GET_AIR_DAILY);
        this.appendValueInput('day')
            .appendField(Blockly.Msg.LISTS_GET_INDEX_FROM_START);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_WEB_DATA_SENIVERSE_GET_WEATHER_DAILY_DAY + Blockly.Msg.MIXLY_BELONG);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLY_PARAMETER_FREE, "none"],
                [Blockly.Msg.MIXLY_AIR_NOW_AIRQUAILTY, "api"],
                [Blockly.Msg.MIXLY_AIR_NOW_PM25, "pm25"],
                [Blockly.Msg.MIXLY_AIR_NOW_PM10, "pm10"],
                [Blockly.Msg.MIXLY_AIR_NOW_so2, "so2"],
                [Blockly.Msg.MIXLY_AIR_NOW_no2, "no2"],
                [Blockly.Msg.MIXLY_AIR_NOW_co, "co"],
                [Blockly.Msg.MIXLY_AIR_NOW_o3, "o3"],
                [Blockly.Msg.MIXLY_AIR_NOW_quailty, "quality"],
                [Blockly.Msg.MIXLY_GPS_DATE, "date"]
            ]), "content");
        this.setInputsInline(true);
        this.setOutput(true);
    }
};

export const Geo_sun_content = {
    init: function () {
        this.setColour(WEATHER_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_WEB_DATA_SENIVERSE_GET_GEO_SUN);
        this.appendValueInput('day')
            .appendField(Blockly.Msg.LISTS_GET_INDEX_FROM_START);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_WEB_DATA_SENIVERSE_GET_WEATHER_DAILY_DAY + Blockly.Msg.MIXLY_BELONG);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLY_PARAMETER_FREE, "none"],
                [Blockly.Msg.MIXLY_GPS_DATE, "date"],
                [Blockly.Msg.MIXLY_SUNRISE_T, "sunrise"],
                [Blockly.Msg.MIXLY_SUNSET_T, "sunset"]
            ]), "content");
        this.setInputsInline(true);
        this.setOutput(true);
    }
};

export const Geo_moon_content = {
    init: function () {
        this.setColour(WEATHER_HUE);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_WEB_DATA_SENIVERSE_GET_GEO_MOON);
        this.appendValueInput('day')
            .appendField(Blockly.Msg.LISTS_GET_INDEX_FROM_START);
        this.appendDummyInput()
            .appendField(Blockly.Msg.MIXLY_WEB_DATA_SENIVERSE_GET_WEATHER_DAILY_DAY + Blockly.Msg.MIXLY_BELONG);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Msg.MIXLY_PARAMETER_FREE, "none"],
                [Blockly.Msg.MIXLY_GPS_DATE, "date"],
                [Blockly.Msg.MIXLT_MOONRISE_T, "rise"],
                [Blockly.Msg.MIXLY_MOONSET_T, "set"],
                [Blockly.Msg.MIXLY_MOON_FRACTION, "fraction"],
                [Blockly.Msg.MIXLY_MOON_PHASE, "phase"],
                [Blockly.Msg.MIXLY_MOON_PHASE_NAME, "phase_name"]
            ]), "content");
        this.setInputsInline(true);
        this.setOutput(true);
    }
};