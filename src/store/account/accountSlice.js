import { createSlice } from '@reduxjs/toolkit';

import {
    getOrderDetails,
    getPaymentDetails,
    validateAccount
} from './accountActions';


const initialState = {
    loadingAccount: false,
    orderDetails: null,
    paymentDetails: null,
    error:null
}

const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        resetAccount:()=>initialState
    },
    extraReducers: {
         //get order details
        [getOrderDetails.pending]: (state) => {
            state.loadingAccount = true
            state.error = null
            state.success =false
        },
        [getOrderDetails.fulfilled]: (state, { payload }) => {
            state.loadingAccount = false
            state.orderDetails = payload
            state.error = null
            state.success =false
        },
        [getOrderDetails.rejected]: (state, { payload }) => {
            state.loadingAccount = false
            state.orderDetails = null
            state.error = payload
            state.success = false
        },
         //get payment details
        [getPaymentDetails.pending]: (state) => {
            state.loadingAccount = true
            state.error = null
            state.success =false
        },
        [getPaymentDetails.fulfilled]: (state, { payload }) => {
            state.loadingAccount = false
            state.paymentDetails = payload
            state.error = null
            state.success =false
        },
        [getPaymentDetails.rejected]: (state, { payload }) => {
            state.loadingAccount = false
            state.paymentDetails = null
            state.error = payload
            state.success = false
        },
        // //make payment
        // [makePayment.pending]: (state) => {
        //     state.loadingAccount = true
        //     state.error = null
        //     state.success =false
        // },
        // [makePayment.fulfilled]: (state, { payload }) => {
        //     state.loadingAccount = false
        //     state.paymentDetails = payload
        //     state.error = null
        //     state.success =true
        // },
        // [makePayment.rejected]: (state, { payload }) => {
        //     state.loadingAccount = false
        //     state.paymentDetails = null
        //     state.error = payload
        //     state.success = false
        // },
        //validate account
        [validateAccount.pending]: (state) => {
            state.loadingAccount = true
            state.error = null
            state.success =false
        },
        [validateAccount.fulfilled]: (state, { payload }) => {
            state.loadingAccount = false
            state.paymentDetails = payload
            state.error = null
            state.success =true
        },
        [validateAccount.rejected]: (state, { payload }) => {
            state.loadingAccount = false
            state.error = payload
            state.success = false
        },
    }
})



export const { resetAccount } = accountSlice.actions;
export default accountSlice.reducer
