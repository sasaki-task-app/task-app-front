import {createSlice} from "@reduxjs/toolkit";
import axios from 'axios';
import {Task} from "./task";
import {createTaskThunk, deleteTaskThunk, fetchTasksThunk, updateTaskThunk} from "../../thunks/taskThunks";


// @ts-ignore
const initialState: Task[] = [];

export const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
    },
    extraReducers: builder => {
        builder.addCase(fetchTasksThunk.fulfilled, (state, action) => {
            return action.payload
        }).addCase(createTaskThunk.fulfilled, (state, action) => {
            state.push(action.payload)
        }).addCase(updateTaskThunk.fulfilled, (state, action) => {
            const {id, title, description} = action.payload
            const taskFound = state.find(task => task.id === id)
            if (taskFound) {
                taskFound.title = title
                taskFound.description = description
            }
        }).addCase(deleteTaskThunk.fulfilled, (state, action) => {
            const taskFound = state.find(task => task.id === action.payload)
            if (taskFound) {
                state.splice(state.indexOf(taskFound), 1)
            }
        })
    }
})

// export const {addTask, deleteTask, editTask} = taskSlice.actions;
export default taskSlice.reducer;