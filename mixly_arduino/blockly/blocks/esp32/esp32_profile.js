var profile = {
    esp32: {
        description: "MicroPython[ESP32]",
        pin: [["p0", "0"], ["p2", "2"], ["p4", "4"], ["p5", "5"], ["p12", "12"], ["p13", "13"], ["p14", "14"], ["p15", "15"], ["p16", "16"], ["p17", "17"], ["p18", "18"], ["p19", "19"], ["p20", "20"], ["p21", "21"], ["p22", "22"], ["p23", "23"], ["p25", "25"], ["p26", "26"], ["p27", "27"], ["p32", "32"], ["p33", "33"], ["p34", "34"], ["p35", "35"], ["p36", "36"], ["p39", "39"]],
        digital: [["p0", "p0"], ["p2", "p2"], ["p4", "p4"], ["p5", "p5"], ["p12", "p12"], ["p13", "p13"], ["p14", "p14"], ["p15", "p15"], ["p16", "p16"], ["p17", "p17"], ["p18", "p18"], ["p19", "p19"], ["p20", "p20"], ["p21", "p21"], ["p22", "p22"], ["p23", "p23"], ["p25", "p25"], ["p26", "p26"], ["p27", "p27"], ["p32", "p32"], ["p33", "p33"], ["p34", "p34"], ["p35", "p35"], ["p36", "p36"], ["p39", "p39"]],
        pwm: [["pwm0", "0"], ["pwm2", "2"], ["pwm4", "4"], ["pwm5", "5"], ["pwm12", "12"], ["pwm13", "13"], ["pwm14", "14"], ["pwm15", "15"], ["pwm16", "16"], ["pwm17", "17"], ["pwm18", "18"], ["pwm19", "19"], ["pwm20", "20"], ["pwm21", "21"], ["pwm22", "22"], ["pwm23", "23"], ["pwm25", "25"], ["pwm26", "26"], ["pwm27", "27"], ["pwm32", "32"], ["pwm33", "33"], ["pwm34", "34"], ["pwm35", "35"], ["pwm36", "36"], ["pwm39", "39"]],
        analog: [["adc32", "32"], ["adc33", "33"], ["adc34", "34"], ["adc35", "35"], ["adc36", "36"], ["adc39", "39"]],
        dac: [["dac25", "25"], ["dac26", "26"]],
        interrupt: [["tc0", "0"], ["tc2", "2"], ["tc4", "4"], ["tc12", "12"], ["tc13", "13"], ["tc14", "14"], ["tc15", "15"], ["tc27", "27"], ["tc32", "32"], ["tc33", "33"]],
        button:[["A", "button_a"], ["B", "button_b"]],
        axis:[["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"]],
        exlcdh:[["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"],["10", "10"], ["11", "11"],["12", "12"], ["13", "13"],["14", "14"], ["15", "15"]],
        exlcdv:[["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"]],
        brightness:[["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"]],
        builtinimg: [["HEART", "Image.HEART"],["HEART_SMALL", "Image.HEART_SMALL"],["HAPPY", "Image.HAPPY"],["SAD", "Image.SAD"],["SMILE", "Image.SMILE"],["SILLY", "Image.SILLY"],["FABULOUS", "Image.FABULOUS"],["SURPRISED", "Image.SURPRISED"],["ASLEEP", "Image.ASLEEP"],["ANGRY", "Image.ANGRY"],["CONFUSED", "Image.CONFUSED"],["NO", "Image.NO"],["YES", "Image.YES"],["LEFT_ARROW", "Image.LEFT_ARROW"],["RIGHT_ARROW", "Image.RIGHT_ARROW"],["DRESS", "Image.DRESS"],["TRANSFORMERS", "Image.TRANSFORMERS"],["SCISSORS", "Image.SCISSORS"],["EXIT", "Image.EXIT"],["TREE", "Image.TREE"],["PACMAN", "Image.PACMAN"],["TARGET", "Image.TARGET"],["TSHIRT", "Image.TSHIRT"],["ROLLERSKATE", "Image.ROLLERSKATE"],["DUCK", "Image.DUCK"],["HOUSE", "Image.HOUSE"],["TORTOISE", "Image.TORTOISE"],["BUTTERFLY", "Image.BUTTERFLY"],["STICKFIGURE", "Image.STICKFIGURE"],["GHOST", "Image.GHOST"],["PITCHFORK", "Image.PITCHFORK"],["MUSIC_QUAVERS", "Image.MUSIC_QUAVERS"],["MUSIC_QUAVER", "Image.MUSIC_QUAVER"],["MUSIC_CROTCHET", "Image.MUSIC_CROTCHET"],["COW", "Image.COW"],["RABBIT", "Image.RABBIT"],["SQUARE_SMALL", "Image.SQUARE_SMALL"],["SQUARE", "Image.SQUARE"],["DIAMOND_SMALL", "Image.DIAMOND_SMALL"],["DIAMOND", "Image.DIAMOND"],["CHESSBOARD", "Image.CHESSBOARD"],["TRIANGLE_LEFT", "Image.TRIANGLE_LEFT"],["TRIANGLE", "Image.TRIANGLE"],["SNAKE", "Image.SNAKE"],["UMBRELLA", "Image.UMBRELLA"],["SKULL", "Image.SKULL"],["GIRAFFE", "Image.GIRAFFE"],["SWORD", "Image.SWORD"]],
        imglist: [["ALL_CLOCKS", "Image.ALL_CLOCKS"], ["ALL_ARROWS", "Image.ALL_ARROWS"]],
        tone_notes: [["NOTE_C3", "131"],["NOTE_D3", "147"],["NOTE_E3", "165"],["NOTE_F3", "175"],["NOTE_G3", "196"],["NOTE_A3", "220"],["NOTE_B3", "247"],
           ["NOTE_C4", "262"],["NOTE_D4", "294"],["NOTE_E4", "330"],["NOTE_F4", "349"],["NOTE_G4", "392"],["NOTE_A4", "440"],["NOTE_B4", "494"],
           ["NOTE_C5", "532"],["NOTE_D5", "587"],["NOTE_E5", "659"],["NOTE_F5", "698"],["NOTE_G5", "784"],["NOTE_A5", "880"],["NOTE_B5", "988"]],
        serial_pin: [["p0", "0"], ["p1", "1"], ["p2", "2"], ["p8", "8"], ["p12", "12"], ["p13", "13"], ["p14", "14"], ["p15", "15"], ["p16", "16"]],
	radio_power: [['0', '0'], ['1', '1'], ['2', '2'], ['3', '3'], ['4', '4'], ['5', '5'], ['6', '6'], ['7', '7']],
	radio_datarate:[["1Mbit", "RATE_1MBIT"], ["250Kbit", "RATE_250KBIT"], ["2Mbit", "RATE_2MBIT"]],
    one_more:[["ONE_SHOT", "ONE_SHOT"], ["PERIODIC", "PERIODIC"]],
    }
};

profile["default"] = profile["esp32"];