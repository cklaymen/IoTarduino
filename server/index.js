var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var arduino = require("./arduinoAPI");

//enable uWebSocket
io.engine.ws = new (require('uws').Server)({
    noServer: true,
    perMessageDeflate: false
});

app.use('/', express.static("build"));

var pins = {
    arr: [],
    getState: function (pin) {
        var value=-1;
        this.arr.forEach(function (elem) {
            if (elem.pin == pin) {
                value = elem.value;
            }
        });
        return value;
    },
    setState: function (pin, state) {
        this.arr.forEach(function (elem) {
            if (elem.pin == pin) {
                elem.value = state;
            }
        });
    }
};

arduino.fetchState(function (data) {
    if (data !== undefined && data.state == 'done') {
        pins.arr = data.value;
    }
});

// pins.arr = [{pin: 1, value: 0}, {pin: 2, value: 1}];

io.on("connection", function (socket) {
    console.log("User connected");
    socket.on("switchOn", function (pin, callback=null) {
        arduino.switchOn(pin, function (data) {
            //add state check (allOk/error)!!!
            if (data.state == 'done') {
                pins.setState(pin, 1);
                io.emit("switchedOn", pin);
            }
            if (callback!=null)
                callback(JSON.stringify(data));
        });
    });
    socket.on("switchOff", function (pin, callback=null) {
        arduino.switchOff(pin, function (data) {
            //add state check (allOk/error)!!!
            if (data.state == 'done') {
                pins.setState(pin, 0);
                io.emit("switchedOff", pin);
            }
            
            if (callback!=null)
                callback(JSON.stringify(data));
        });
    });
    socket.on("fetchAll", function (callback=null) {
        if (callback!=null) {
            callback(pins.arr);
        }
    });
    socket.on("disconnect", function () {
        console.log("User disconnected");
    });
});



http.listen(80, function () {
    console.log("Server running on " + 80);
})