import React from 'react';
import "./TabButton.css";

export default function TabButton({name:p_name,isActive:p_isActive,onclick:p_onclick}) {
  return (
    <button
        key={p_name}
        className={"profilebutton" +
            ((p_isActive) ? " activeprofilebutton" : "")}
        onClick={p_onclick}
    >
        {p_name}
    </button>
  )
}
