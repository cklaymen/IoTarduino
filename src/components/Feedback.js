import React from 'react';

import "../css/Feedback.css";

const Feedback = ({type, message}) => {
    let className = "feedback";
    if (type === "error") {
        className += " error";
    }

    return (
        <div className={className}>
            {message}
        </div>
    );
};

export default Feedback;