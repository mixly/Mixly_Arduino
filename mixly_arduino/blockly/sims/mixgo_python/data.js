var mbData = {
    'temperature': 23,
    'humidity': 0,
    'distance': 0,
    'distance_infrared_left': 0,
    'distance_infrared_right': 0,
    'soundlevel': 0,
    'brightness': 0,
    'servo': 0,
    'compass': {
       'heading': 0,
       'strength': 0,
       'x': 0,
       'y': 0,
       'z': 0,
       'calibrated': false
    },
    'music': {
        'ticks': 4,
        'bpm': 120,
        'duration': 4,
        'octave': 4
    },
    'radio':{
        'channel': 7,
        'address': '0x75626974',
        'group': 0,
        'data_rate': 1000,
        'queue': 3,
        'length': 32,
        'power':6
    },
    'mpu9250': {
        'x': 0,
        'y': 0,
        'z': 0,
        'gyro_x': 0,
        'gyro_y': 0,
        'gyro_z': 0,
        'currentGesture': '',
        'gestureHistory': []
    },
    'uart': {
       'baudrate': 115200,
       'bits': 8,
       'parity': null,
       'stop': 1,
       'tx': null,
       'rx': null,
       'buffer': ''
    }
}

