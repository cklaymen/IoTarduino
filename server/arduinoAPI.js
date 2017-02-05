var rest = require("./getJSON");
var config = require("./config");

const processData = (data) => {
    var result = {};
    if (data !== undefined) {
        if (data.state == 'done') {
            result.state = "done";
            if (data.value !== undefined) {
                result.value = data.value;
            }
        } else if (data.state == 'error') {
            result.state = "error";
            result.value = data.value;
        } else {
            result.state = "error";
            result.value = data;
        }
    } 

    return result;
}

exports.switchOn = function (pin, callback) {
    rest.getJSON(config.arduino_address + "/api/on/" + pin, (data) => {
        callback(processData(data));
    });
}

exports.switchOff = function (pin, callback) {
    rest.getJSON(config.arduino_address + "/api/off/" + pin, (data) => {
        callback(processData(data));
    });
}

exports.fetchState = function (callback) {
    rest.getJSON(config.arduino_address + "/api/fetchAll/", (data) => {
        callback(processData(data));
    });
}