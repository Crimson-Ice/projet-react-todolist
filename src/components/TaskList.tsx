import React, {useEffect, useState} from 'react';
import TaskItem from "./TaskItem";
import TaskFilter from "./TaskFilter";
import {useDispatch, useSelector} from "react-redux";
import {TaskInterface, TaskListInterface, updateTaskList} from "../redux";

interface DNDstateInterface{
    draggedFrom: number | null,
    draggedTo: number | null,
    isDragging: boolean,
    originalOrder: TaskInterface[],
    updatedOrder: TaskInterface[]
}

const initialDnDState: DNDstateInterface = {
    draggedFrom: null,
    draggedTo: 0,
    isDragging: false,
    originalOrder: [],
    updatedOrder: []
}

const TaskList = () => {
    const taskList = useSelector((state:TaskListInterface) => state.todo);
    const [filter, setFilter] = useState("All");
    const [filteredTasks, setFilteredTasks] = useState<TaskInterface[]>(taskList);
    const [dragAndDrop, setDragAndDrop] = React.useState(initialDnDState);
    const dispatch = useDispatch();

    const handleSetFilter = (state: string) => {
        setFilter(state);
    }

    useEffect(() => {
        if(filter !== "All"){
            const newFilteredTasks = taskList.filter(obj => obj.state === (filter === "Completed"));
            setFilteredTasks(newFilteredTasks);
        } else {
            setFilteredTasks(taskList);
        }
    }, [filter, taskList]);

    useEffect(() => {
        if(dragAndDrop.updatedOrder.length !== 0){
            dispatch(updateTaskList(dragAndDrop.updatedOrder))
        }
    }, [dragAndDrop.updatedOrder]);


    const onDragStart = (event: React.DragEvent<HTMLLIElement>) => {
        const initialPosition = Number(event.currentTarget.dataset.position);
        setDragAndDrop({
            ...dragAndDrop,
            draggedFrom: initialPosition,
            isDragging: true,
            originalOrder: filteredTasks
        });

        event.dataTransfer.setData("text/html", '');
    }

    const onDragOver = (event: React.DragEvent<HTMLLIElement>) => {
        event.preventDefault();
        let newList = dragAndDrop.originalOrder;

        // index of the item being dragged
        const draggedFrom = dragAndDrop.draggedFrom;
        // index of the droppable area being hovered
        const draggedTo = Number(event.currentTarget.dataset.position);

        if (draggedFrom !== null) {
            const itemDragged = newList[draggedFrom];
            const remainingItems = newList.filter((item, index) => index !== draggedFrom);
            newList = [
                ...remainingItems.slice(0, draggedTo),
                itemDragged,
                ...remainingItems.slice(draggedTo)
            ];
        }
        if (draggedTo !== dragAndDrop.draggedTo){
            setDragAndDrop({
                ...dragAndDrop,
                updatedOrder: newList,
                draggedTo: draggedTo
            })
        }

    }

    const onDrop = () => {
        setFilteredTasks(dragAndDrop.updatedOrder);
        setDragAndDrop({
            ...dragAndDrop,
            draggedFrom: null,
            draggedTo: null,
            isDragging: false
        });
    }

    const onDragLeave = () => {
        setDragAndDrop({
            ...dragAndDrop,
            draggedTo: null
        });
    }
    
    return (
        <div className="taskList-content">
            <div className="task">
                <ul>
                    {
                        filteredTasks.map((item, index) => (
                            <li
                                key={index}
                                data-position={index}
                                draggable
                                onDragStart={onDragStart}
                                onDragOver={onDragOver}
                                onDrop={onDrop}
                                onDragLeave={onDragLeave}
                            >
                                <TaskItem item={item}/>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div className="filter">
                <TaskFilter filter={filter} setFilter={handleSetFilter}/>
            </div>
        </div>
    );
};

export default TaskList;
