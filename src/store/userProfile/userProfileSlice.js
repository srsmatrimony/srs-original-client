import { createSlice } from "@reduxjs/toolkit";


import {
    getUserProfile,
    addBasicProfile,
    editUserProfile,
    updateProfilePic,
    deleteProfilePic,
    updateImage1,
    deleteImage1,
    updateImage2,
    deleteImage2,
    deleteUserProfile

} from './userProfileActions';


const initialState = {
    
    loading: false,
    userProfile: null,
    error: null,
    success:false
}

const userProfileSlice = createSlice({
    name: 'userProfile',
    initialState,
    reducers: {
        resetUserProfile:()=>initialState
    },
    extraReducers: {

    //get user profile
        [getUserProfile.pending]: (state) => {
            state.loading = true
            state.error = null
            state.success =false
        },
        [getUserProfile.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.userProfile = payload
            state.error = null
            state.success =false
        },
        [getUserProfile.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
            state.success = false
        },
        // add basic profile
        [addBasicProfile.pending]: (state) => {
            state.loading = true
            state.error = null
            state.success =false
        },
        [addBasicProfile.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.userProfile = payload
            state.success = true
            state.error = null
        },
        [addBasicProfile.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
            state.success =false
        },
         //edit basic profile
        [editUserProfile.pending]: (state) => {
            state.loading = true
            state.error = null
            state.success =false
        },
        [editUserProfile.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.userProfile = payload
            state.success = true
            state.error = null
        },
        [editUserProfile.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
            state.success =false
        },
        // update profile pic
        [updateProfilePic.pending]: (state) => {
            state.loading = true
            state.error = null
            state.success=false
        },
        [updateProfilePic.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.userProfile = payload
            state.error = null
        },
        [updateProfilePic.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
            state.success =false
        },

        // delete profile pic
        [deleteProfilePic.pending]: (state) => {
            state.loading = true
            state.error = null
            state.success=false
        },
        [deleteProfilePic.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.userProfile = payload
            state.error = null
        },
        [deleteProfilePic.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
            state.success =false
        },
        // update image1
        [updateImage1.pending]: (state) => {
            state.loading = true
            state.error = null
            state.success=false
        },
        [updateImage1.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.userProfile = payload
            state.error = null
        },
        [updateImage1.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
            state.success =false
        },

        // delete image1
        [deleteImage1.pending]: (state) => {
            state.loading = true
            state.error = null
            state.success=false
        },
        [deleteImage1.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.userProfile = payload
            state.error = null
        },
        [deleteImage1.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
            state.success =false
        },
         // update image2
        [updateImage2.pending]: (state) => {
            state.loading = true
            state.error = null
            state.success=false
        },
        [updateImage2.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.userProfile = payload
            state.error = null
        },
        [updateImage2.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
            state.success =false
        },

        // delete image2
        [deleteImage2.pending]: (state) => {
            state.loading = true
            state.error = null
            state.success=false
        },
        [deleteImage2.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.userProfile = payload
            state.error = null
        },
        [deleteImage2.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
            state.success =false
        },
        // delete user profile
        [deleteUserProfile.pending]: (state) => {
            state.loading = true
            state.error = null
            state.success=false
            
        },
        [deleteUserProfile.fulfilled]: (state) => {
            state.loading = false
            state.error = null
            state.userProfile=null
            state.success =true
        },
        [deleteUserProfile.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
            state.success =false
        }
    }
    

    
})

export const { resetUserProfile } = userProfileSlice.actions;
export default userProfileSlice.reducer
