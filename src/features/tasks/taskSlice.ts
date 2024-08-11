import {createSlice} from "@reduxjs/toolkit";

const initialState = [
    {
        id: "1",
        title: "title",
        description: "description",
        completed: false
    },
    {
        id: "2",
        title: "title",
        description: "description",
        completed: false
    },
]

export const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action) => {
            state.push(action.payload)
        },
        editTask: (state, action) => {
            console.log(action.payload)
            const {id, title, description} = action.payload
            const taskFound = state.find(task => task.id === id)
            if (taskFound) {
                taskFound.title = title
                taskFound.description = description
            }
        },
        deleteTask: (state, action) => {
            const taskFound = state.find(task => task.id === action.payload)
            if (taskFound) {
                state.splice(state.indexOf(taskFound), 1)
            }
        }
    }
})

export const {addTask, deleteTask, editTask} = taskSlice.actions;
export default taskSlice.reducer;