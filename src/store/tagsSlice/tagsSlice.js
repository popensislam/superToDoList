import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isProductivite: false,
    isEducation: false,
    isHealth: false,
    isImportant: false 
}

export const tagsSlice = createSlice({
    name: 'tags',
    initialState,
    reducers: {
        changeProduct: (state) => {
            state.isProductivite = !state.isProductivite
        },
        changeEduc: (state) => {
            state.isEducation = !state.isEducation
        },
        changeHealth: (state) => {
            state.isHealth = !state.isHealth
        },
        changeImportant: (state) => {
            state.isImportant = !state.isImportant
        }
    }
})

export const { changeProduct, changeEduc, changeHealth, changeImportant } = tagsSlice.actions 

export default tagsSlice.reducer