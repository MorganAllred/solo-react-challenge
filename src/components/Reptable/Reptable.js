import React from 'react';
import "./Reptable.css";

const Reptable = (props) => {

    const { data: reps, clickHandler } = props;

    return (
        <ul className="listContainer">
            <li className="repSelector" key={-1}>
                            <div>Name</div>
                            <div>Party</div>
            </li>
            {reps.map((rep, idx) => {
                return(
                    <li className="repSelector" key={idx} onClick={() => clickHandler(rep.name)}>
                        <div>{rep ? rep.name : {}}</div>
                        <div>{rep ? rep.party.split('')[0] : {}}</div>
                    </li>
                )})
            }
        </ul>
    );
}

export default Reptable;