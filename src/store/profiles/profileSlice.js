import { createSlice } from '@reduxjs/toolkit';

import {
    getMatchingProfiles,
    getFreshProfiles,
    getSentInterestProfiles,
    getReceivedInterestProfiles,
    getMutualInterestProfiles
} from './profileActions';


const initialState = {
    
    loading: false,
    matchingProfiles: null,
    freshProfiles: null,
    sentInterestProfiles:null,
    receivedInterestProfiles: null,
    mutualInterestProfiles: null,
    error:false
}

const profileSlice = createSlice({
    
    name: 'profiles',
    initialState,
    reducers: {
        resetProfiles:()=>initialState
    },
    extraReducers: {
        //get matching profiles
        [getMatchingProfiles.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [getMatchingProfiles.fulfilled]: (state,{payload}) => {
            state.loading = false
            state.matchingProfiles = payload 
            state.error = false
        },
        [getMatchingProfiles.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
        },
         //get fresh profiles
        [getFreshProfiles.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [getFreshProfiles.fulfilled]: (state,{payload}) => {
            state.loading = false
            state.freshProfiles = payload 
            state.error = false
        },
        [getFreshProfiles.rejected]: (state, { payload }) => {
            state.loading = false
            state.freshProfiles = null
            state.error = payload
        },
         //get sent Interest profiles
        [getSentInterestProfiles.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [getSentInterestProfiles.fulfilled]: (state,{payload}) => {
            state.loading = false
            state.sentInterestProfiles = payload 
            state.error = false
        },
        [getSentInterestProfiles.rejected]: (state, { payload }) => {
            state.loading = false
            state.sentInterestProfiles = null
            state.error = payload
        },
         //get received Interest profiles
        [getReceivedInterestProfiles.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [getReceivedInterestProfiles.fulfilled]: (state,{payload}) => {
            state.loading = false
            state.receivedInterestProfiles = payload 
            state.error = false
        },
        [getReceivedInterestProfiles.rejected]: (state, { payload }) => {
            state.loading = false
            state.receivedInterestProfiles = null
            state.error = payload
        },
        //get mutual Interest profiles
        [getMutualInterestProfiles.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [getMutualInterestProfiles.fulfilled]: (state,{payload}) => {
            state.loading = false
            state.mutualInterestProfiles = payload 
            state.error = false
        },
        [getMutualInterestProfiles.rejected]: (state, { payload }) => {
            state.loading = false
            state.mutualInterestProfiles = null
            state.error = payload
        },
    },
    
})

export const { resetProfiles } = profileSlice.actions;
export default profileSlice.reducer
