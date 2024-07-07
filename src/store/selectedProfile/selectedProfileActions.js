import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import Constants from '../../config/constants';


            

export const getSelectedProfile = createAsyncThunk(
    'selectedProfile/getSelectedProfile',
    async ({ id, token }, { rejectWithValue }) => {
    
        const config = {
                
            headers: {
                'authorization': `Bearer ${token}`
            }
        }
        
        
        try {
            const { data } = await axios.get(`${Constants.url_profiles}/${id}`, config);
           
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