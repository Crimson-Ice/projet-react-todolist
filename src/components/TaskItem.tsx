import React, {useEffect, useState} from 'react';
import ToggleButton from "./ToggleButton";
import {deleteTask, TaskInterface} from "../redux";
import {useDispatch} from "react-redux";


const TaskItem = ({ item }: { item: TaskInterface }) => {
    const [isHovered, setIsHovered] = useState(false);
    const dispatch = useDispatch();

    const handleMouseOver = () => {
        setIsHovered(true);
    };

    const handleMouseOut = () => {
        setIsHovered(false);
    };

    const handleDelete = () => {
        dispatch(deleteTask(item.id));
    }

    return (
        <div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} className="taskItem-content">
            <div className="wrapper">
                <ToggleButton id={item.id} state={item.state}/>
                <span className={item.state ? "task-complete" : ""}>{item.value}</span>
            </div>
            {isHovered &&
                <div className="button-delete">
                    <button onClick={handleDelete}>
                        <i className="fa-solid fa-xmark fa-xl"></i>
                    </button>
                </div>
            }
        </div>
    );
};

export default TaskItem;
