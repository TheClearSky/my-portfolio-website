import React from 'react';
import "./ChessInfoPickMenu.css";

export default function ChessInfoPickMenu({ buttonList: p_buttonList, activeButton: p_activeButton, setActiveButton: p_setActiveButton }) {
    function toggleMenu(menuname) {
        return function () {
            if (p_activeButton !== menuname) {
                p_setActiveButton(menuname);
            }
        }
    }
    return (
        <div className="chessinfopickmenu">
            {p_buttonList.map((buttonName)=>
            <span
                className={(p_activeButton == buttonName) ? "activepick" : ""}
                onClick={toggleMenu(buttonName)}
                key={buttonName}
            >
                {buttonName}
            </span>)}
        </div>
    )
}
