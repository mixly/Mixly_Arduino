const pins = {};

pins['microbit'] = {
    description: "microbit_python",
    // digital: [["P0", "DigitalPin.P0"], ["P1", "DigitalPin.P1"], ["P2", "DigitalPin.P2"], ["P3", "DigitalPin.P3"], ["P4", "DigitalPin.P4"], ["P5", "DigitalPin.P5"], ["P6", "DigitalPin.P6"], ["P7", "DigitalPin.P7"], ["P8", "DigitalPin.P8"], ["P9", "DigitalPin.P9"], ["P10", "DigitalPin.P10"], ["P11", "DigitalPin.P11"], ["P12", "DigitalPin.P12"], ["P13", "DigitalPin.P13"], ["P14", "DigitalPin.P14"], ["P15", "DigitalPin.P15"], ["P16", "DigitalPin.P16"], ["P17", "DigitalPin.P17"], ["P18", "DigitalPin.P18"], ["P19", "DigitalPin.P19"], ["P20", "DigitalPin.P20"]],
    digital: [["P0", "0"], ["P1", "1"], ["P2", "2"], ["P3", "3"], ["P4", "4"], ["P5", "5"], ["P6", "6"], ["P7", "7"], ["P8", "8"], ["P9", "9"], ["P10", "10"], ["P11", "11"], ["P12", "12"], ["P13", "13"], ["P14", "14"], ["P15", "15"], ["P16", "16"], ["P19", "19"], ["P20", "20"]],
    //pwm: [["P0", "AnalogPin.P0"], ["P1", "AnalogPin.P1"], ["P2", "AnalogPin.P2"], ["P3", "AnalogPin.P3"], ["P4", "AnalogPin.P4"], ["P5", "AnalogPin.P5"], ["P6", "AnalogPin.P6"], ["P7", "AnalogPin.P7"], ["P8", "AnalogPin.P8"], ["P9", "AnalogPin.P9"], ["P10", "AnalogPin.P10"], ["P11", "AnalogPin.P11"], ["P12", "AnalogPin.P12"], ["P13", "AnalogPin.P13"], ["P14", "AnalogPin.P14"], ["P15", "AnalogPin.P15"], ["P16", "AnalogPin.P16"], ["P19", "AnalogPin.P19"], ["P20", "AnalogPin.P20"]],
    pwm: [["P0", "0"], ["P1", "1"], ["P2", "2"], ["P3", "3"], ["P4", "4"], ["P5", "5"], ["P6", "6"], ["P7", "7"], ["P8", "8"], ["P9", "9"], ["P10", "10"], ["P11", "11"], ["P12", "12"], ["P13", "13"], ["P14", "14"], ["P15", "15"], ["P16", "16"], ["P19", "19"], ["P20", "20"]],
    analog: [["P0", "0"], ["P1", "1"], ["P2", "2"], ["P3", "3"], ["P4", "4"], ["P10", "10"]],
    interrupt: [["P0", "0"], ["P1", "1"], ["P2", "2"]],
    button: [["A", "button_a"], ["B", "button_b"]],
    axis: [["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"]],
    brightness: [["0", "0"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"]],
    builtinimg: [["HEART", "Image.HEART"], ["HEART_SMALL", "Image.HEART_SMALL"], ["HAPPY", "Image.HAPPY"], ["SMILE", "Image.SMILE"], ["SAD", "Image.SAD"], ["CONFUSED", "Image.CONFUSED"], ["ANGRY", "Image.ANGRY"], ["ASLEEP", "Image.ASLEEP"], ["SURPRISED", "Image.SURPRISED"], ["SILLY", "Image.SILLY"], ["FABULOUS", "Image.FABULOUS"], ["MEH", "Image.MEH"], ["YES", "Image.YES"], ["NO", "Image.NO"], ["CLOCK12", "Image.CLOCK12"], ["CLOCK11", "Image.CLOCK11"], ["CLOCK10", "Image.CLOCK10"], ["CLOCK9", "Image.CLOCK9"], ["CLOCK8", "Image.CLOCK8"], ["CLOCK7", "Image.CLOCK7"], ["CLOCK6", "Image.CLOCK6"], ["CLOCK5", "Image.CLOCK5"], ["CLOCK4", "Image.CLOCK4"], ["CLOCK3", "Image.CLOCK3"], ["CLOCK2", "Image.CLOCK2"], ["CLOCK1", "Image.CLOCK1"], ["ARROW_N", "Image.ARROW_N"], ["ARROW_NE", "Image.ARROW_NE"], ["ARROW_E", "Image.ARROW_E"], ["ARROW_SE", "Image.ARROW_SE"], ["ARROW_S", "Image.ARROW_S"], ["ARROW_SW", "Image.ARROW_SW"], ["ARROW_W", "Image.ARROW_W"], ["ARROW_NW", "Image.ARROW_NW"], ["TRIANGLE", "Image.TRIANGLE"], ["TRIANGLE_LEFT", "Image.TRIANGLE_LEFT"], ["CHESSBOARD", "Image.CHESSBOARD"], ["DIAMOND", "Image.DIAMOND"], ["DIAMOND_SMALL", "Image.DIAMOND_SMALL"], ["SQUARE", "Image.SQUARE"], ["SQUARE_SMALL", "Image.SQUARE_SMALL"], ["RABBIT", "Image.RABBIT"], ["COW", "Image.COW"], ["MUSIC_CROTCHET", "Image.MUSIC_CROTCHET"], ["MUSIC_QUAVER", "Image.MUSIC_QUAVER"], ["MUSIC_QUAVERS", "Image.MUSIC_QUAVERS"], ["PITCHFORK", "Image.PITCHFORK"], ["XMAS", "Image.XMAS"], ["PACMAN", "Image.PACMAN"], ["TARGET", "Image.TARGET"], ["TSHIRT", "Image.TSHIRT"], ["ROLLERSKATE", "Image.ROLLERSKATE"], ["DUCK", "Image.DUCK"], ["HOUSE", "Image.HOUSE"], ["TORTOISE", "Image.TORTOISE"], ["BUTTERFLY", "Image.BUTTERFLY"], ["STICKFIGURE", "Image.STICKFIGURE"], ["GHOST", "Image.GHOST"], ["SWORD", "Image.SWORD"], ["GIRAFFE", "Image.GIRAFFE"], ["SKULL", "Image.SKULL"], ["UMBRELLA", "Image.UMBRELLA"], ["SNAKE", "Image.SNAKE"], ["ALL_CLOCKS", "Image.ALL_CLOCKS"], ["ALL_ARROWS", "Image.ALL_ARROWS"]],
    imglist: [["ALL_CLOCKS", "Image.ALL_CLOCKS"], ["ALL_ARROWS", "Image.ALL_ARROWS"]],
    tone_notes: [
        ["NOTE_C3", "131"], ["NOTE_D3", "147"], ["NOTE_E3", "165"], ["NOTE_F3", "175"], ["NOTE_G3", "196"], ["NOTE_A3", "220"], ["NOTE_B3", "247"],
        ["NOTE_C4", "262"], ["NOTE_D4", "294"], ["NOTE_E4", "330"], ["NOTE_F4", "349"], ["NOTE_G4", "392"], ["NOTE_A4", "440"], ["NOTE_B4", "494"],
        ["NOTE_C5", "523"], ["NOTE_D5", "587"], ["NOTE_E5", "659"], ["NOTE_F5", "698"], ["NOTE_G5", "784"], ["NOTE_A5", "880"], ["NOTE_B5", "988"]
    ],
    serial_pin: [["P0", "0"], ["P1", "1"], ["P2", "2"], ["P8", "8"], ["P12", "12"], ["P13", "13"], ["P14", "14"], ["P15", "15"], ["P16", "16"]],
    radio_power: [['0', '0'], ['1', '1'], ['2', '2'], ['3', '3'], ['4', '4'], ['5', '5'], ['6', '6'], ['7', '7']],
    radio_datarate: [["1Mbit", "RATE_1MBIT"], ["250Kbit", "RATE_250KBIT"], ["2Mbit", "RATE_2MBIT"]],
};

pins["Mithon CC"] = pins["microbit"];

export default pins;