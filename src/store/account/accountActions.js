import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import Constants from '../../config/constants';



export const getOrderDetails = createAsyncThunk(
    'account/getOrderDetails',
    async ({ _id ,token}, { rejectWithValue }) => {
        const config = {
            headers: {
                'authorization': `Bearer ${token}`
            }
        }
        
        
        try {
            const { data } = await axios.get(Constants.url_order_details, config);

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

export const getPaymentDetails = createAsyncThunk(
    'account/getPaymentDetails',
    async ({ _id, token }, { rejectWithValue }) => {
        const config = {
            headers: {
                'authorization': `Bearer ${token}`
            }
        }
        try {
            
            const { data } = await axios.get(`${Constants.url_account}/${_id}`, config);

            if (data) {
                return data
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



export const validateAccount = createAsyncThunk(
    'account/validateAccount',
    async ({ _id,token }, { rejectWithValue }) => {
         const config = {
            headers: {
                 'authorization': `Bearer ${token}`
             }
        }


        try {
            
            const { data } = await axios.get(`${Constants.url_account}/${_id}`, config);
            
            if (data) {
                
                if (new Date(data.dueDate) <= new Date()) {
                    
                    const profileData = { accountStatus: false };

                    await axios.patch(`${Constants.url_profiles}/${_id}`, profileData, config);
                    await axios.delete(`${Constants.url_account}/${_id}`, config);
                    
                    return null

                }
                else {
                    return data;
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

