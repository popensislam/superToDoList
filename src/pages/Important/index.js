import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux/es/exports";
import ModalAddTask from "../../components/modalAddTask";
import Search from "../../components/search";
import TasksList from "../../components/tasksList";
import { addDeletedTask } from "../../store/deletedTasksSlice/deletedTasksSlice";
import { deleteImportantTask, dragAndDropImportant, removeImportantTask } from "../../store/importantSlice/importantTasksSlice";
import { addModalTask, deleteTask, removeTask, turnOnModalAdd } from "../../store/taskSlice/taskSlice";
import { sortFunc } from "../MyTasks";
import '../pages.css'

const Important = () => {

    const { isProductivite, isEducation, isHealth, isImportant } = useSelector(store => store.tags)

    const tasksRed = useSelector(store => store.importantTasks.importantTasks)

    const [tasks, setTasks] = useState([])

    const dispatch = useDispatch()

    // При каждом изменения стора мы берем с localStorage все данные

    useEffect(() => {
        const tasksLocal = JSON.parse(localStorage.getItem('importantTask'))

        sortFunc(isProductivite, isEducation, isImportant, isHealth, setTasks, tasksLocal)

    }, [tasksRed, isProductivite, isEducation, isHealth, isImportant])

    const deletedTask = (item) => {
        dispatch(addDeletedTask(item))
        dispatch(removeTask(item))
        dispatch(removeImportantTask(item))
    }

    const checkTask = (item) => {
        dispatch(addModalTask(item))
        dispatch(turnOnModalAdd())
    }

    const deleteTaskModal = (item) => {
        dispatch(deleteTask(item))
        dispatch(deleteImportantTask(item))
    }

    return (
        <div className="myPage">
            <Search />
            <h1>Важные</h1>
            <TasksList
                importPage={true}
                checkTask={checkTask}
                tasks={tasks}
                deletedTask={deletedTask}
                dispatchFunction={(newTask) => dispatch(dragAndDropImportant(newTask))}
            />
            <ModalAddTask deleteTask={deleteTaskModal} />
        </div>
    );
}

export default Important;