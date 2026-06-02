import React from 'react';
import "./Global_Blackbutton.css";

const Global_Blackbutton = ({ text, onClick }) => {
    return (
        <div>
            <button className="global-button" onClick={onClick}>
                {text}
            </button>
        </div>
    )
}

export default Global_Blackbutton
