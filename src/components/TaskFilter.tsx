import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {clearComplete, TaskListInterface} from "../redux";

const TaskFilter = ({filter, setFilter}: {filter: string,setFilter: Function}) => {

    const taskList = useSelector((state:TaskListInterface) => state.todo);
    const dispatch = useDispatch();

    return (
        <div className="taskFilter-content">
            <span>{taskList.filter(obj => !obj.state).length} items left</span>
            <ul>
                <li><button className={filter === "All" ? "active-button" : ""} onClick={() => setFilter("All")}>All</button></li>
                <li><button className={filter === "Active" ? "active-button" : ""} onClick={() => setFilter("Active")}>Active</button></li>
                <li><button className={filter === "Completed" ? "active-button" : ""} onClick={() => setFilter("Completed")}>Completed</button></li>
            </ul>
            <button onClick={() => dispatch(clearComplete())}>Clear completed</button>
        </div>
    );
};

export default TaskFilter;
