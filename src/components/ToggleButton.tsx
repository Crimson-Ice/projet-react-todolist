import React from 'react';
import {useDispatch} from "react-redux";
import {changeState} from "../redux";

const ToggleButton = ({state, id}: {state:boolean, id:number}) => {
    const dispatch = useDispatch();

    return (
        <button
            className={`toggleButton ${state ? "checkButton" : ""}`}
            onClick={() => dispatch(changeState(id))}
        >
            {state &&
                <i className="fa-solid fa-check"></i>
            }
        </button>
    );
};

export default ToggleButton;
