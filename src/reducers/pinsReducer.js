export default function pinsReducer(state={
  pins: []
}, action) {
  switch (action.type) {
    case "SWITCH_ON":
    case "SWITCHING_ON":
    case "SWITCH_OFF":
    case "SWITCHING_OFF":
    const newPins = [];
    state.pins.forEach(elem => {
      if (elem.pin !== action.payload.pin) {
        newPins.push(elem);
      }
    });
    newPins.push(action.payload);
    newPins.sort((a, b) => {
      return b.pin - a.pin;
    });
    state = {...state, pins: newPins}
    break;

    default:
    break;
  }
  return state;
}
