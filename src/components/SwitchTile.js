import React from 'react';
import Switcher from "./Switcher";

import "../css/SwitchTile.css";

const SwitchTile = ({elem, togglePinHandler}) => {
    let tileClass = "switchTile";
    if (elem.value === 0) {
        tileClass += " disabled";
    } else if (elem.value === 1) {
        tileClass += " enabled";
    }

    if (elem.switching) {
        tileClass += " switching";
    }

    return (
        <div className={tileClass}>
            <div className="header">{elem.pin}</div>
            <Switcher value={elem.value} pin={elem.pin} togglePinHandler={togglePinHandler}/>
        </div>
    );
};

export default SwitchTile;