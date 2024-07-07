import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Constants from '../../config/constants'



export const getMatchingProfiles = createAsyncThunk(
    'profiles/getMatchingProfiles',
    async ({ _id ,token}, { rejectWithValue }) => {
        const config = {
            headers: {
                'authorization': `Bearer ${token}`
            }
        }
        
        try {
            
            const { data } = await axios.get(`${Constants.url_matching_profiles}/${_id}`, config);

            if (data) {
                if (data.length !== 0) {
                    return data;
                }
                else {
                    return null;
                }
            }
            else {
                return null;
            }
            

        }
        catch(err) {
            if (err.response && err.response.data.message) {
                
                return rejectWithValue(err.response.data.message);
            }
            else {
                return rejectWithValue(err.message);
            }
        }
    }
)

export const getFreshProfiles = createAsyncThunk(
    'profiles/getFreshProfiles',
    async ({ _id, token }, { rejectWithValue }) => {
        
        const config = {
            headers: {
                'authorization': `Bearer ${token}`
            }
        }

        
        try {
            
            const { data } = await axios.get(`${Constants.url_fresh_profiles}/${_id}`, config);
            
            if (data) {
                if (data.length !== 0) {
                    
                    return data;
                }
                else {
                    return null;
                }
            }
            else {
                return null;
            }
            

        }
        catch(err) {
            if (err.response && err.response.data.message) {
                
                return rejectWithValue(err.response.data.message);
            }
            else {
                return rejectWithValue(err.message);
            }
        }
    }
)

export const getSentInterestProfiles = createAsyncThunk(
    'profiles/getSentInterestProfiles',
    async ({ _id, token }, { rejectWithValue }) => {
        
        const config = {
            headers: {
                'authorization': `Bearer ${token}`
            }
        }

        try {
            
            const { data } = await axios.get(`${Constants.url_sent_interest_profiles}/${_id}`, config);
            
            if (data) {
                if (data.length !== 0) {
                    
                    return data;
                }
                else {
                    return null;
                }
            }
            else {
                return null;
            }
            

        }
        catch(err) {
            if (err.response && err.response.data.message) {
                
                return rejectWithValue(err.response.data.message);
            }
            else {
                return rejectWithValue(err.message);
            }
        }
    }
)

export const getReceivedInterestProfiles = createAsyncThunk(
    'profiles/getReceivedInterestProfiles',
    async ({ _id, token }, { rejectWithValue }) => {
        
        const config = {
            headers: {
                'authorization': `Bearer ${token}`
            }
        }

        try {
            
            const { data } = await axios.get(`${Constants.url_received_interest_profiles}/${_id}`, config);
            
            if (data) {
                if (data.length !== 0) {
                    
                    return data;
                }
                else {
                    return null;
                }
            }
            else {
                return null;
            }
            

        }
        catch(err) {
            if (err.response && err.response.data.message) {
                
                return rejectWithValue(err.response.data.message);
            }
            else {
                return rejectWithValue(err.message);
            }
        }
    }
)

export const getMutualInterestProfiles = createAsyncThunk(
    'profiles/getMutualInterestProfiles',
    async ({ _id, token }, { rejectWithValue }) => {
        
        const config = {
            headers: {
                'authorization': `Bearer ${token}`
            }
        }
        
        try {
            
            const { data } = await axios.get(`${Constants.url_mutual_interest_profiles}/${_id}`, config);
            if (data) {
                if (data.length !== 0) {
                    
                    return data;
                }
                else {
                    return null;
                }
            }
            else {
                return null;
            }
            

        }
        catch(err) {
            if (err.response && err.response.data.message) {
                
                return rejectWithValue(err.response.data.message);
            }
            else {
                return rejectWithValue(err.message);
            }
        }
    }
)