import {createSlice} from "@reduxjs/toolkit";
import axios from 'axios';
import {Task} from "./task";


// @ts-ignore
const initialState: Task[] = await axios.get('http://localhost:3001/tasks')
    .then(response => {
        console.log(response.data)
        return response.data.map((task: Task) => {
            return task
        })
    })
    .catch(error => {
        console.log(error)
    })

export const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action) => {
            state.push(action.payload)
            axios.post('http://localhost:3001/tasks', action.payload)
                .then(response => {
                    console.log(response)
                })
                .catch(error => {
                    console.log(error)
                })
        },
        editTask: (state, action) => {
            console.log(action.payload)
            const {id, title, description} = action.payload
            const taskFound = state.find(task => task.id === id)
            if (taskFound) {
                taskFound.title = title
                taskFound.description = description
            }
            axios.patch(`http://localhost:3001/tasks/${id}`, action.payload)
                .then(response => {
                    console.log(response)
                })
                .catch(error => {
                    console.log(error)
                })
        },
        deleteTask: (state, action) => {
            const taskFound = state.find(task => task.id === action.payload)
            if (taskFound) {
                state.splice(state.indexOf(taskFound), 1)
                axios.delete(`http://localhost:3001/tasks/${action.payload}`, action.payload)
                    .then(response => {
                        console.log(response)
                    })
                    .catch(error => {
                        console.log(error)
                    })
            }
        }
    }
})

export const {addTask, deleteTask, editTask} = taskSlice.actions;
export default taskSlice.reducer;