import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios';
import {Task} from "../features/tasks/task";

export const fetchTasksThunk = createAsyncThunk('tasks/fetchTasks',
    async () => {
        const response = await axios.get('http://localhost:3001/tasks')
        return await response.data
    }
)

export const createTaskThunk = createAsyncThunk('tasks/createTask',
    async (task: any) => {
        const response = await axios.post('http://localhost:3001/tasks', task)
        return response.data
    }
)

export const updateTaskThunk = createAsyncThunk('tasks/updateTask',
    async (task: any) => {
        const response = await axios.patch(`http://localhost:3001/tasks/${task.id}`, task)
        return response.data
    }
)

export const deleteTaskThunk = createAsyncThunk('tasks/deleteTask',
    async (id: string) => {
        await axios.delete(`http://localhost:3001/tasks/${id}`)
        return id
    }
)

