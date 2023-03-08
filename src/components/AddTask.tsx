import React, {useEffect, useRef} from 'react';
import ToggleButton from "./ToggleButton";
import {useDispatch} from "react-redux";
import {addTask} from "../redux";

const AddTask = () => {
    const dispatch = useDispatch();
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() =>{
        const input = document.getElementById("inputNewTask") as HTMLInputElement;
        input.addEventListener("keydown", (e) => {
            if(e.code === "Enter" && input.value !== ""){
                e.preventDefault();
                handleCreateNewTask(input.value);
                if(inputRef.current) {
                    inputRef.current.value = "";
                }
            }
        })
    }, [])

    const handleCreateNewTask = (value:string) => {
        dispatch(addTask(value))
    }

    return (
        <div className="addTask-content">
            <div className="toggleButton"></div>
            <input id="inputNewTask" type="text" placeholder="Create a new todo" ref={inputRef}/>
        </div>
    );
};

export default AddTask;
