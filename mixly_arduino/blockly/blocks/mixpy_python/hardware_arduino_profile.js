var profile = {
    hardware_arduino: {
        description: "hardware_arduino",
        analog_write: [["5", "5"], ["6", "6"], ["9", "9"]],
        analog_read: [["A0", "0"], ["A1", "1"], ["A2", "2"], ["A3", "3"], ["A4", "4"], ["A5", "5"]],
        digital_read: [["2", "2"], ["3", "3"]],
        digital_write: [["10", "10"], ["11", "11"], ["12", "12"], ["13", "13"]],        
    }
};

profile["default"] = profile["hardware_arduino"];