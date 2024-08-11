import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {addTask, editTask} from '../features/tasks/taskSlice';
import {v4 as uuid} from "uuid"
import {useNavigate, useParams} from "react-router-dom";

export const TaskForm = () => {
    const [task, setTasks] = useState({
        title: "",
        description: "",
        status: "PENDING"
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    // @ts-ignore
    const tasks = useSelector(state => state.tasks);

    const handleChange = (e: any) => {
        console.log(e.target.name, e.target.value)
        setTasks({
            // all previous tasks
            ...task,
            // new task [title]: description
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit =(e: any) => {
        e.preventDefault()

        if (params.id) {
            dispatch(editTask(task));
        } else {
            dispatch(addTask({
                ...task,
                id: uuid()
            }))
        }
        navigate('/')
    }

    useEffect(() => {
        if (params.id) {
            setTasks(tasks.find((task: any) => task.id === params.id))
        }
    }, []);

    // @ts-ignore
    const stateTasks = useSelector(state => state.tasks);
    console.log(stateTasks)
    return (
        <div className="bg-zinc-700 h-1/3 w-1/2 text-center rounded-2xl">
            <h1 className="m-2 text-4xl">{params.id ? 'Edit Task' : 'Create Task'}</h1>
            <form onSubmit={handleSubmit} className="flex flex-col p-4">
                <input name="title" type="text" placeholder="Task title" value={task.title} onChange={handleChange} className="mb-2 rounded-2xl px-2 py-1.5 text-center bg-zinc-800 text-white border-none focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-opacity-50"/>
                <textarea name="description" placeholder="Task description" value={task.description} onChange={handleChange} className="mb-2 rounded-2xl px-2 py-1.5 text-center bg-zinc-800 text-white border-none focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-opacity-50"/>
                <button type="submit" className="text-white bg-gray-900 hover:bg-gray-800 font-medium w-fit mx-auto rounded-2xl text-sm px-5 py-2.5 text-center my-2">Submit</button>
            </form>
        </div>
    );
};
