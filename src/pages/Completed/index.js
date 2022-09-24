import { useEffect, useState } from "react";
import ModalAddTask from "../../components/modalAddTask";
import Search from "../../components/search";
import TasksList from "../../components/tasksList";
import { useSelector } from "react-redux/es/exports";
import { useDispatch } from 'react-redux/es/exports'
import { addModalTask, dragAndDrop, removeTask, turnOnModalAdd } from "../../store/taskSlice/taskSlice";
import '../pages.css'
import { addDeletedTask } from "../../store/deletedTasksSlice/deletedTasksSlice";
import { removeImportantTask } from "../../store/importantSlice/importantTasksSlice";
import { sortFunc } from "../MyTasks";

const Completed = () => {

    const { isProductivite, isEducation, isHealth, isImportant } = useSelector(store => store.tags)

    const tasksRed = useSelector(store => store.tasks.tasks)
    const [tasks, setTasks] = useState([])

    const dispatch = useDispatch()

    // При каждом изменения стора мы берем с localStorage все данные
    useEffect(() => {
        const tasksLocal = JSON.parse(localStorage.getItem('task'))

        sortFunc(isProductivite, isEducation, isImportant, isHealth, setTasks, tasksLocal)
        
    }, [tasksRed, isProductivite, isEducation, isHealth, isImportant])

    const deletedTask = (item) => {
        dispatch(addDeletedTask(item))
        dispatch(removeTask(item))
        if (item.star) {
            dispatch(removeImportantTask(item))
        }
    }

    const checkTask = (item) => {
        dispatch(addModalTask(item))
        dispatch(turnOnModalAdd())
    }

    return (
        <div className="myPage">
            <Search />
            <h1>Выполненные</h1>
            <TasksList checkTask={checkTask} tasks={tasks} deletedTask={deletedTask} dispatchFunction={(newTasks) => dispatch(dragAndDrop(newTasks))} />
            <ModalAddTask />
        </div>
    );
}

export default Completed;