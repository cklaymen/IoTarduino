export const switchPinOn = (pin) => {
  return {
    type: "SWITCH_ON",
    payload: {
      pin,
      value: 1,
      switching: false
    }
  }
}

export const switchingPinOn = (pin) => {
  return {
    type: "SWITCHING_ON",
    payload: {
      pin,
      value: 0,
      switching: true
    }
  }
}

export const switchPinOff = (pin) => {
  return {
    type: "SWITCH_OFF",
    payload: {
      pin,
      value: 0,
      switching: false
    }
  }
}

export const switchingPinOff = (pin) => {
  return {
    type: "SWITCHING_OFF",
    payload: {
      pin,
      value: 1,
      switching: true
    }
  }
}