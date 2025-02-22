goog.loadJs('common', () => {

goog.require('Mixly');
goog.provide('Mixly.Profile');

const { Profile } = Mixly;

Profile.parse = function (range) {
    let pinList = [];
    for (let i of range) {
        const pinInfo = i.split('-');
        switch (pinInfo.length) {
        case 1:
            const pinNumStr = pinInfo[0].toString();
            if (!isNaN(pinNumStr)) {
                const pinNum = parseInt(pinNumStr);
                pinList.push(pinNum);
            }
            break;
        case 2:
            const pinNumStr0 = pinInfo[0].toString(),
            pinNumStr1 = pinInfo[1].toString();
            if (!isNaN(pinNumStr0) && !isNaN(pinNumStr1)) {
                let pinNum0 = parseInt(pinNumStr0);
                let pinNum1 = parseInt(pinNumStr1);
                if (pinNum0 < 0 || pinNum1 < 0) break;
                if (pinNum0 > pinNum1) {
                    [ pinNum0, pinNum1 ] = [ pinNum1, pinNum0 ];
                }
                for (let j = pinNum0; j <= pinNum1; j++) {
                    if (!pinList.includes(j)) {
                        pinList.push(j);
                    }
                }
            }
            break;
        }
    }
    return pinList;
};

Profile.generate = function (pinMap, add1 = '', add2 = '') {
    const getPins = (list) => {
        let pins = [];
        for (let i of list) {
            const pin = [ add1 + i, add2 + i ];
            pins.push(pin);
        }
        return pins;
    }
    const pinList = this.parse(pinMap);
    return getPins(pinList);
};

window.profile = Profile;

});