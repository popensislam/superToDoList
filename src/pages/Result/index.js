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

const Result = () => {


    const { isProductivite, isEducation, isHealth, isImportant } = useSelector(store => store.tags)

    const { searchValue } = useSelector(store => store.tasks)

    const tasksRed = useSelector(store => store.tasks.tasks)
    const [tasks, setTasks] = useState([])

    const dispatch = useDispatch()

    useEffect(() => {
        const tasksLocal = JSON.parse(localStorage.getItem('task'))
        if (searchValue) {

            const searchTasks = tasksLocal.filter(item => item.title.toLowerCase().indexOf(searchValue.toLowerCase()) != -1)

            sortFunc(isProductivite, isEducation, isImportant, isHealth, setTasks, searchTasks)

        } else {
            setTasks([])
        }
    }, [tasksRed, searchValue, isProductivite, isEducation, isHealth, isImportant])

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

    const makeBold = (item) => {
        const re = new RegExp(searchValue, "g")
        return item.replace(re, "<b>" + searchValue + "</b>")
    };

    return (
        <div className="myPage">
            <Search />
            <h1>Результаты</h1>
            <TasksList isResult={true} makeBold={makeBold} setTasks={setTasks} checkTask={checkTask} tasks={tasks} deletedTask={deletedTask} dispatchFunction={(newTasks) => dispatch(dragAndDrop(newTasks))} />
            <ModalAddTask />
        </div>
    );
}

export default Result;