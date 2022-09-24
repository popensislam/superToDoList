import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    deletedTasks: [],
}


export const deletedTasksSlice = createSlice({
    name: 'deletedTasks',
    initialState,
    reducers: {
        addDeletedTask: (state, {payload}) => {
            state.deletedTasks.push(payload)
        },
        resetDeletedTask: (state, {payload}) => {
            state.deletedTasks = state.deletedTasks.filter(item => item.id != payload.id)
        },
        dragAndDropDeleted: (state, {payload}) => {
            state.deletedTasks = payload
        },
        connectLocalDeleted: (state, {payload}) => {
            state.deletedTasks = payload
        }
    }
})

export const { addDeletedTask, connectLocalDeleted, dragAndDropDeleted, resetDeletedTask } = deletedTasksSlice.actions 

export default deletedTasksSlice.reducer