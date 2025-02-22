(() => {

goog.require('Mixly.MJSON');
goog.require('Mixly.Config');
goog.provide('Mixly.Msg');

const { Msg, MJSON, Config } = Mixly;

const { USER } = Config;

Msg.LANG_PATH = {
	"zh-hans": "./mixly-sw/msg/zh-hans.json",
	"zh-hant": "./mixly-sw/msg/zh-hant.json",
	"en": "./mixly-sw/msg/en.json"
}

Msg.LANG = {
	"zh-hans": MJSON.get(Msg.LANG_PATH["zh-hans"]),
	"zh-hant": MJSON.get(Msg.LANG_PATH["zh-hant"]),
	"en": MJSON.get(Msg.LANG_PATH["en"])
}

Msg.nowLang = USER.language ?? 'zh-hans';

Msg.getLang = (str) => {
	return Msg.LANG[Msg.nowLang][str];
}

console.log('Msg.LANG', Msg.LANG);

})();