import { createSlice } from '@reduxjs/toolkit';

import {
    getInterest,
    addInterest,
    deleteInterest,
    acceptInterest,
    rejectInterest
} from './interestActions';


const initialState = {
    
    loadingInterest: false,
    interest: null,
    error:null
}

const interestSlice = createSlice({
    name: 'interest',
    initialState,
    reducers: {
        resetInterest:()=>initialState
    },
    extraReducers: {

        //get interest
        [getInterest.pending]: (state) => {
            state.loadingInterest = true
            state.error = null
            state.success =false
        },
        [getInterest.fulfilled]: (state, { payload }) => {
            state.loadingInterest = false
            state.interest = payload
            state.error = null
            state.success =false
        },
        [getInterest.rejected]: (state, { payload }) => {
            state.loadingInterest = false
            state.error = payload
            state.interest=null
            state.success = false
        },
         //add interest
        [addInterest.pending]: (state) => {
            state.loadingInterest = true
            state.error = null
            state.success =false
        },
        [addInterest.fulfilled]: (state, { payload }) => {
            state.loadingInterest = false
            state.interest = payload
            state.error = null
            state.success =false
        },
        [addInterest.rejected]: (state, { payload }) => {
            state.loadingInterest = false
            state.error = payload
            state.success = false
        },

        // delete interest
        [deleteInterest.pending]: (state) => {
            state.loadingInterest = true
            state.error = null
            state.success=false
            
        },
        [deleteInterest.fulfilled]: (state) => {
            state.loadingInterest = false
            state.error = null
            state.interest=null
            state.success =true
        },
        [deleteInterest.rejected]: (state, { payload }) => {
            state.loadingInterest = false
            state.error = payload
            state.success =false
        },
         //accept interest
        [acceptInterest.pending]: (state) => {
            state.loadingInterest = true
            state.error = null
            state.success =false
        },
        [acceptInterest.fulfilled]: (state, { payload }) => {
            state.loadingInterest = false
            state.interest = payload
            state.error = null
            state.success =false
        },
        [acceptInterest.rejected]: (state, { payload }) => {
            state.loadingInterest = false
            state.error = payload
            state.success = false
        },
        //reject interest
        [rejectInterest.pending]: (state) => {
            state.loadingInterest = true
            state.error = null
            state.success =false
        },
        [rejectInterest.fulfilled]: (state, { payload }) => {
            state.loadingInterest = false
            state.interest = payload
            state.error = null
            state.success =false
        },
        [rejectInterest.rejected]: (state, { payload }) => {
            state.loadingInterest = false
            state.error = payload
            state.success = false
        },
        
    }
})


export const { resetInterest } = interestSlice.actions;
export default interestSlice.reducer
