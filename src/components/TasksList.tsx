import {useDispatch, useSelector} from "react-redux";
import {deleteTask} from "../features/tasks/taskSlice";
import {useNavigate} from "react-router-dom";

export const TasksList = () => {
    // @ts-ignore
    const tasks = useSelector(state => state.tasks);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleDelete = (id: string) => {
        dispatch(deleteTask(id))
    }

    return (
        <div className="bg-zinc-700 h-fit w-1/2 text-center rounded-2xl">
            <h1 className="m-2 text-4xl">Tasks: {tasks.length}</h1>
            <button className="text-white bg-gray-900 hover:bg-gray-800 font-medium rounded-2xl text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={() => {navigate('/create-task')}}>Create Task</button>
            <div className="flex flex-wrap justify-center">
                {tasks.map((task: any) => (
                    <div key={task.id} className="bg-zinc-800 p-2 m-4 rounded-lg w-fit text-white text-center">
                        <h3 className="text-2xl font-bold">{task.title}</h3>
                        <p className="text-slate-300 mt-1 mb-3">{task.description}</p>
                        <button className="text-white bg-gray-700 hover:bg-gray-600 font-medium rounded-2xl text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={() => {handleDelete(task.id)}}>delete</button>
                        <button className="text-white bg-gray-700 hover:bg-gray-600 font-medium rounded-2xl text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={() => {navigate(`edit-task/${task.id}`)}}>edit</button>
                    </div>

                ))}
            </div>

        </div>
    );
};
