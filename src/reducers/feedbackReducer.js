export default function feedbackReducer(state={
  list: []
}, action) {
  switch (action.type) {
    case "ADD_FEEDBACK":
    state = {...state, list: [...state.list, action.payload]};
    break;

    case "REMOVE_FEEDBACK":
    state = {...state, list: state.list.filter(feedback => feedback.id !== action.payload.id)};
    break;

    default:
    break;
  }
  return state;
}
