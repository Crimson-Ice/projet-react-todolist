import {configureStore, createSlice} from "@reduxjs/toolkit";

const todoSlice = createSlice({
    name: "todo",
    initialState: [
        {id: 1, value: "aller rouler", state: false}
    ],
    reducers: {
        addTask: (state, action) => {
            state.push({id: state.length + 1, value: action.payload, state: false});
        },
        changeState: (state, action) => {
            const task = state.find(obj => obj.id === action.payload);
            if (task) {
                task.state = !task.state;
            }
        },
        clearComplete: (state) => {
            return state.filter(obj => !obj.state);
        },
        deleteTask: (state, action) => {
            return state.filter(obj => obj.id !== action.payload);
        },
        updateTaskList: (state, action) => {
            return action.payload;
        }
    }
})

export interface TaskInterface {
    id: number;
    value: string;
    state: boolean;
}

export interface TaskListInterface {
    todo: TaskInterface[];
}

export const {addTask, changeState, clearComplete, deleteTask, updateTaskList} = todoSlice.actions;

export const store = configureStore({
    reducer: {
        todo: todoSlice.reducer,
    }
})
