import React from 'react';
import "./Selectfield.css";

const Selectfield = (props) => {
    const { options: repList, label, changeHandler} = props;

    return (
        <div className="selectContainer">
            <label className="labelText">{label}</label>
            <select onChange={ changeHandler ?? null } placeholder="State Representatives" className="selector">
            {repList.map( (obj, idx) => {
                return (
                    <option key={idx} value={obj}> {obj} </option>
                )
            })}
            </select>
        </div>
    )
}

export default Selectfield;