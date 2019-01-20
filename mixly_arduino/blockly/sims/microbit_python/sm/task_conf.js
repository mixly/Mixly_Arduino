var task_conf = {
    'task_01': {
        programTimeout: 1000,
        steps:[
            {
                'code': 'sm.button.press("button_a", 100)',
                'time': 100
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
        ]
    },
    'task_02': {
        programTimeout: 1000,
        steps: [{
            'code': 'sm.compass.set_heading(10);',
            'time': 100
        },
        {
            'code': 'sm.compass.set_heading(110);',
            'time': 200
        },
        {
            'code': 'sm.compass.set_heading(210);',
            'time': 300
        },
        {
            'code': 'sm.compass.set_heading(310);',
            'time': 400
        },
        {
            'code': 'sm.compass.set_heading(90);',
            'time': 500
        },
        {
            'code': 'sm.compass.set_heading(180);',
            'time': 600
        },
        {
            'code': 'sm.compass.set_heading(255);',
            'time': 700
        },
    ]},
    'task_03': {
        programTimeout: 3000,
        steps: [
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
        ]
    },
    'task_06': {
        programTimeout: 3000,
        steps: []
    },
    'task_08': {
        programTimeout: 1000,
        steps: [{
            'code': 'sm.accelerometer.set_z(8);',
            'time': 300
        }],
    },
    'task_09': {
        programTimeout: 10000,
        steps: []
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
    },
    'task_test': {
        programTimeout: 1000,
        steps: [
            {
                'code': 'sm.uart.send("123\\r");',
                'time': 200
            }]
    }
};



