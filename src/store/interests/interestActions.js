import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import Constants from '../../config/constants';

            
export const getInterest = createAsyncThunk(
    'interest/getInterest',

    async ({ userId, selectedProfileId, token }, { rejectWithValue }) => {
        
        const config = {
            headers: {
                'authorization': `Bearer ${token}`
            }
        }
        
        
        try {
            
            const { data } = await axios.get(Constants.url_interests, config);

            if (data) {
                const currentInterest = data.find(interest => (interest.sender === userId && interest.receiver === selectedProfileId) || (interest.sender === selectedProfileId && interest.receiver === userId));
                if (currentInterest) {
                    return currentInterest;
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

export const addInterest = createAsyncThunk(
    'interest/addInterest',
    async ({ newIneterest, token }, { rejectWithValue }) => {
        
        const config = {
            headers: {
                'authorization': `Bearer ${token}`
            }
        }

        try {
            
            const { data } = await axios.post(Constants.url_interests, newIneterest, config);

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

export const deleteInterest = createAsyncThunk(
    'interest/deleteInterest',
    async ({ _id, token }, { rejectWithValue }) => {
        
        const config = {
            headers: {
                'authorization': `Bearer ${token}`
            }
        }
        
        try {
            await axios.delete(`${Constants.url_interests}/${_id}`, config);
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

export const acceptInterest = createAsyncThunk(
    'interest/acceptInterest',
    async ({ _id, token }, { rejectWithValue }) => {
    
        const config = {
            headers: {
                'authorization': `Bearer ${token}`
            }
        }

        try {
            const status = "accept";
            const updatedInterest = { status };

            const { data } = await axios.patch(`${Constants.url_interests}/${_id}`, updatedInterest, config);

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

export const rejectInterest = createAsyncThunk(
    'interest/acceptInterest',
    async ({ _id, token }, { rejectWithValue }) => {
        
        const config = {
            headers: {
                'authorization': `Bearer ${token}`
            }
        }

        try {
            const status = "reject";
            const updatedInterest = { status };

            const { data } = await axios.patch(`${Constants.url_interests}/${_id}`, updatedInterest, config);

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