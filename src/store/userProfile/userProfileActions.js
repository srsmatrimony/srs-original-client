import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import Constants from '../../config/constants';


            
export const getUserProfile = createAsyncThunk(
    'userProfile/getUserProfile',

    async ({ email ,token}, { rejectWithValue }) => {
        
        const config = {
                headers: {
                    'authorization': `Bearer ${token}`
                }
        }
        
        
        try {
            var newUserProfile = null;
            
            // console.log(token1);

            const { data } = await axios.get(Constants.url_profiles, config);
            
            if (data) {
                newUserProfile = data.find(profile => profile.email === email);
                  
                if (newUserProfile) {
                    return newUserProfile
                }
                else {
                    return null;
                }
            }
            else {
                return null;
            }
            

        }
        catch (err) {

             if (err.response && err.response.data.message) {
                
                return rejectWithValue(err.response.data.message);
            }
            else {
                return rejectWithValue(err.message);
            }

        }

    }
)

export const addBasicProfile = createAsyncThunk(
    
    'userProfile/addBasicProfile',
    async ({ profileData, token }, { rejectWithValue }) => {
        const config = {
                headers: {
                    'authorization': `Bearer ${token}`
                }
        }
        try {

            const { data } = await axios.post(Constants.url_profiles, profileData, config)
            
            if (data) {
                return data;
            }
            else {
                return null;
            }


        }
        catch (err) {
            if (err.response && err.response.data.message) {
                
                return rejectWithValue(err.response.data.message);
            }
            else {
                return rejectWithValue(err.message);
            }
        }
    }
)

export const editUserProfile = createAsyncThunk(
    'userProfile/editBasicProfile',
    async ({ profileData, _id, token }, { rejectWithValue }) => {
         const config = {
                headers: {
                    'authorization': `Bearer ${token}`
                }
        }

        try {

            const { data } = await axios.patch(`${Constants.url_profiles}/${_id}`, profileData, config);

            if (data) {
                return data;
            }
            else {
                return null;
            }


        }
        catch (err) {
            if (err.response && err.response.data.message) {
                
                return rejectWithValue(err.response.data.message);
            }
            else {
                return rejectWithValue(err.message);
            }
        }
    }

)

export const updateProfilePic = createAsyncThunk(
    'userProfile/updateProfilePic',
    async ({ profileData, _id, token }, { rejectWithValue }) => {
        const customConfig = {
            headers: {
                'authorization': `Bearer ${token}`,
                "Content-type": "multipart/form-data"
            }
        }
        
         const config = {
                headers: {
                    'authorization': `Bearer ${token}`
                }
        }


        try {

            const { data } = await axios.patch(`${Constants.url_profile_pic}/${_id}`, profileData, customConfig);

            if (data) {
                return data;
            }
            else {
                const response = await axios.get(`${Constants.url_profiles}/${_id}`, config);
                response.data.message = data.message;
                return (response.data);
            }


        }
        catch (err) {
            if (err.response && err.response.data.message) {
                
                return rejectWithValue(err.response.data.message);
            }
            else {
                return rejectWithValue(err.message);
            }

        }
    }
)

export const deleteProfilePic = createAsyncThunk(
 
    'userProfile/deleteProfilePic',
    async ({ _id, token }, { rejectWithValue }) => {
        const config = {
                headers: {
                    'authorization': `Bearer ${token}`
                }
        }
        
        try {

            const { data } = await axios.delete(`${Constants.url_profile_pic}/${_id}`, config);
            return data;
            
        }
        catch (err) {
            if (err.response && err.response.data.message) {
                
                return rejectWithValue(err.response.data.message);
            }
            else {
                return rejectWithValue(err.message);
            }
        }
    }
    
)

export const updateImage1 = createAsyncThunk(
    'userProfile/updateImage1',
    async ({ profileData, _id, token }, { rejectWithValue }) => {
        const config = {
            headers: {
                'authorization': `Bearer ${token}`
            }
        }
        
        try {
            const customConfig = {
                 headers: {
                    'authorization': `Bearer ${token}`,
                     "Content-type": "multipart/form-data"
                }
            }
            

            const { data } = await axios.patch(`${Constants.url_image1}/${_id}`, profileData, customConfig);

            if (data) {
                return data;
            }
            else {
                const response = await axios.get(`${Constants.url_profiles}/${_id}`, config);
                response.data.message = data.message;
                return (response.data);
            }


        }
        catch (err) {
            if (err.response && err.response.data.message) {
                
                return rejectWithValue(err.response.data.message);
            }
            else {
                return rejectWithValue(err.message);
            }

        }
    }
)

export const deleteImage1 = createAsyncThunk(
 
    'userProfile/deleteImage1',
    async ({ _id, token }, { rejectWithValue }) => {
        const config = {
            headers: {
                'authorization': `Bearer ${token}`
            }
        }

        try {

            const { data } = await axios.delete(`${Constants.url_image1}/${_id}`, config);
            return data;
            
        }
        catch (err) {
            if (err.response && err.response.data.message) {
                
                return rejectWithValue(err.response.data.message);
            }
            else {
                return rejectWithValue(err.message);
            }
        }
    }
    
)

export const updateImage2 = createAsyncThunk(
    'userProfile/updateImage2',
    async ({ profileData, _id, token }, { rejectWithValue }) => {
        const config = {
            headers: {
                'authorization': `Bearer ${token}`
            }
        }
        
        try {
            const customConfig = {
                 headers: {
                    'authorization': `Bearer ${token}`,
                     "Content-type": "multipart/form-data"
                }
            }
            

            const { data } = await axios.patch(`${Constants.url_image2}/${_id}`, profileData, customConfig);

            if (data) {
                return data;
            }
            else {
                const response = await axios.get(`${Constants.url_profiles}/${_id}`, config);
                response.data.message = data.message;
                return (response.data);
            }


        }
        catch (err) {
            if (err.response && err.response.data.message) {
                
                return rejectWithValue(err.response.data.message);
            }
            else {
                return rejectWithValue(err.message);
            }

        }
    }
)

export const deleteImage2 = createAsyncThunk(
 
    'userProfile/deleteImage2',
    async ({ _id, token }, { rejectWithValue }) => {
        const config = {
            headers: {
                'authorization': `Bearer ${token}`
            }
        }
        
        try {

            const { data } = await axios.delete(`${Constants.url_image2}/${_id}`, config);
            return data;
            
        }
        catch (err) {
            if (err.response && err.response.data.message) {
                
                return rejectWithValue(err.response.data.message);
            }
            else {
                return rejectWithValue(err.message);
            }
        }
    }
    
)

export const deleteUserProfile = createAsyncThunk(
    'userProfile/deleteUserProfile',
    async ({ _id, token }, { rejectWithValue }) => {
        const config = {
            headers: {
                'authorization': `Bearer ${token}`
            }
        }
        
        try {
            await axios.delete(`${Constants.url_profiles}/${_id}`, config);

        }
        catch (err) {
            if (err.response && err.response.data.message) {
                
                return rejectWithValue(err.response.data.message);
            }
            else {
                return rejectWithValue(err.message);
            }
        }
    }
)