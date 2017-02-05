import { combineReducers } from "redux";
import pins from "./pinsReducer"
import feedback from "./feedbackReducer"

export default combineReducers({
  pins,
  feedback
});
