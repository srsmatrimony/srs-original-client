import { createSlice } from '@reduxjs/toolkit';

import { getSelectedProfile } from './selectedProfileActions';



const initialState = {
    
    loading: false,
    selectedProfile: null,
    error:null
}

const selectedProfileSlice = createSlice({
    name: "selectedProfile",
    initialState,
    reducers: {
        resetSelectedProfile:()=>initialState
    },
    extraReducers: {
        // get selected profile
        [getSelectedProfile.pending]: (state) => {
            state.loading = true
            state.error = null
            state.success =false
        },
        [getSelectedProfile.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.selectedProfile = payload
            state.success = true
            state.error = null
        },
        [getSelectedProfile.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
            state.success =false
        },
    }
})


export const { resetSelectedProfile } = selectedProfileSlice.actions;
export default selectedProfileSlice.reducer;
 