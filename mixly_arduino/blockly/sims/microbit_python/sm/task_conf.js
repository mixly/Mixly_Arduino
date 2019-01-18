var task_conf = {
    'task_button': [
        {
            'code': 'sm.button.press("button_a", 100)',
            'time': 300
        },
        {
            'code': 'sm.button.press("button_a", 100)',
            'time': 500
        },
        {
            'code': 'sm.button.press("button_a", 100)',
            'time': 700
        }
    ],
    'task_no': [],
    'task_01': [
        {
            'code': 'sm.button.press("button_a", 100)',
            'time': 50
        },
        {
            'code': 'sm.button.press("button_a", 100)',
            'time': 300
        },
        {
            'code': 'sm.button.press("button_a", 100)',
            'time': 600
        },
        {
            'code': 'sm.button.press("button_a", 100)',
            'time': 800
        }
    ],
    'task_02': [
        {
            'code': 'sm.compass.set_x(300000);',
            'time': 100
        },
        {
            'code': 'sm.button.press("button_a", 100);',
            'time': 200
        },
        {
            'code': 'sm.button.press("button_b", 100)',
            'time': 400
        },
        {
            'code': 'sm.compass.set_x(0);',
            'time': 500
        },
        {
            'code': 'sm.button.press("button_a", 100)',
            'time': 600
        },
        {
            'code': 'sm.button.press("button_b", 100)',
            'time': 800
        }
    ],
    'task_03': [
        {
            'code': 'sm.button.press("button_a", 100);',
            'time': 200
        },
        {
            'code': 'sm.button.press("button_b", 100)',
            'time': 400
        },
        {
            'code': 'sm.button.press("button_a", 100)\nsm.button.press("button_b", 100)',
            'time': 600
        },
        {
            'code': 'sm.button.press("button_b", 100)',
            'time': 800
        }
    ],
    'task_06': [],
    'task_08': {
        programTimeout: 1000,
        steps: [{
            'code': 'sm.accelerometer.set_z(8);',
            'time': 300
        }],
    },
    'task_10': {
        programTimeout: 1000,
        steps: [
            {
                'code': 'sm.temperature.set_value(10);',
                'time': 200
            },
            {
                'code': 'sm.temperature.set_value(20);',
                'time': 300
            },
            {
                'code': 'sm.temperature.set_value(-20);',
                'time': 400
            },
            {
                'code': 'sm.temperature.set_value(40);',
                'time': 500
            },
            {
                'code': 'sm.temperature.set_value(-7);',
                'time': 600
            },
            {
                'code': 'sm.temperature.set_value(16);',
                'time': 700
            }
        ]
    },
    'task_12': {
        programTimeout: 2000,
        steps: [
            {
                'code': 'sm.button.press("button_b", 100)',
                'time': 1800,
            }
        ]
    },
    'task_13': {
        programTimeout: 3000,
        steps: []
    }
};



