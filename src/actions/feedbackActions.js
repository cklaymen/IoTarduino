export const addFeedback = (feedback) => {
  return {
    type: "ADD_FEEDBACK",
    payload: {
        id: feedback.id, 
        type: feedback.type,
        message: feedback.message
    }
  }
}

export const removeFeedback = (feedbackId) => {
  return {
    type: "REMOVE_FEEDBACK",
    payload: {
        id: feedbackId
    }
  }
}