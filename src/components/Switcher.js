import React from 'react';
import "../css/Switcher.css";

const componentName = ({pin, value, togglePinHandler}) => {
    return (
        <div>
            <label className="switch">
                <input type="checkbox" checked={value} onChange={() => togglePinHandler(pin)}/>
                <div className="slider round"></div>
            </label>
        </div>
    );
};

export default componentName;