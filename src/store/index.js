import { configureStore } from "@reduxjs/toolkit";

import tasks from './taskSlice/taskSlice'
import importantTasks from './importantSlice/importantTasksSlice'
import deletedTasks from './deletedTasksSlice/deletedTasksSlice'
import tags from './tagsSlice/tagsSlice'



export const store = configureStore({
    reducer: {
        tasks: tasks,
        importantTasks: importantTasks,
        deletedTasks: deletedTasks,
        tags: tags
    }
})


// При каждом изменении хранилища все записывается в localStorage
store.subscribe(() => {
    if (store.getState().tasks.tasks) {
        localStorage.setItem('task', JSON.stringify(store.getState().tasks.tasks))
    }
    if (store.getState().importantTasks.importantTasks) {
        localStorage.setItem('importantTask', JSON.stringify(store.getState().importantTasks.importantTasks))
    }
    if (store.getState().deletedTasks.deletedTasks) {
        localStorage.setItem('deletedTask', JSON.stringify(store.getState().deletedTasks.deletedTasks))
    }
})

