import React from 'react';
import "./Inputfield.css";

const Inputfield = (props) => {
    return(
        <input 
            className="inputField"
            disabled={true}
            {...props}
        />
    );
}

export default Inputfield;