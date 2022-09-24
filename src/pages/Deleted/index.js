import ModalAddTask from "../../components/modalAddTask";
import Search from "../../components/search";
import TasksList from "../../components/tasksList";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { useEffect, useState } from "react";
import '../pages.css'
import { dragAndDropDeleted, resetDeletedTask } from "../../store/deletedTasksSlice";
import { addTask } from "../../store/taskSlice/taskSlice";
import { addImportantTask } from "../../store/importantSlice/importantTasksSlice";


const Deleted = () => {

    const tasksRed = useSelector(store => store.deletedTasks.deletedTasks)

    const [tasks, setTasks] = useState([])

    const dispatch = useDispatch()

    useEffect(() => {
        const tasksLocal = JSON.parse(localStorage.getItem('deletedTask'))
        setTasks(tasksLocal)
    }, [tasksRed])


    const deletedTask = (item) => {
        dispatch(resetDeletedTask(item))
        dispatch(addTask(item))
        if (item.star) {
            dispatch(addImportantTask(item))
        } 
    }

    return (
        <div className="myPage">
            <Search />
            <h1>Удаленные</h1>
            <TasksList tasks={tasks} deletedTask={deletedTask} dispatchFunction={(newTask) => dispatch(dragAndDropDeleted(newTask))} deletedPage={true} />
            <ModalAddTask />
        </div>
    );
}

export default Deleted;