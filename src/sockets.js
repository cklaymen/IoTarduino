import * as pinActions from "./actions/pinActions";
import * as feedbackActions from "./actions/feedbackActions";
import io from "socket.io-client";

let socket = null;
let feedbackCounter = 0;

function displayFeedback (store, type, message) {
    const id = feedbackCounter++;
    store.dispatch(feedbackActions.addFeedback({
        id: id,
        type: type,
        message: message
    }));
    setTimeout(() => store.dispatch(feedbackActions.removeFeedback(id)), 7000);
}

export function socketsMiddleware(store) {
  return (next) => (action) => {
    const result = next(action);
    if (socket) {
        const pin = action.payload;
        switch (action.type) {
            case "SWITCHING_ON":
            socket.emit("switchOn", pin.pin, function (data) {
                data = JSON.parse(data);
                if (data.state === "error") {
                    displayFeedback(store, "error", data.value);
                    store.dispatch(pinActions.switchPinOff(pin.pin));
                }
            });
            break;

            case "SWITCHING_OFF":
            socket.emit("switchOff", pin.pin, function (data) {
                data = JSON.parse(data);
                if (data.state === "error") {
                    displayFeedback(store, "error", data.value);
                    store.dispatch(pinActions.switchPinOn(pin.pin));
                }
            });
            break;

            default:
            break;
        }
    }
    return result;
  }
}

export default function (store) {
    socket = io.connect("http://188.123.192.59:80");

    socket.emit("fetchAll", function (data) {
    data.forEach(elem => {
        if (elem.value === 1) {
            // switch on
            store.dispatch(pinActions.switchPinOn(elem.pin));
        } else if (elem.value === 0) {
            // switch off
            store.dispatch(pinActions.switchPinOff(elem.pin));
        }
    });
    });
    socket.on("switchedOn", function (pin) {
        store.dispatch(pinActions.switchPinOn(pin));
    });
    socket.on("switchedOff", function (pin) {
        store.dispatch(pinActions.switchPinOff(pin));
    });
}