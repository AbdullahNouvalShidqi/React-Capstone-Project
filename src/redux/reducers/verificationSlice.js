import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import InvoiceAPI from "../../api/InvoiceAPI";

const initialState = {
    loading: false,
    succeed: false,
    error: false,
    errMsg: '',
    errCode: 0,
    resendLoading: false,
    resendsucceed: false,
    resendError: false,
    resendErrMsg: '',
    resendErrCode: 0
};

export const verifyAccount = createAsyncThunk('post/verifyAccount', async (data, {fulfillWithValue, rejectWithValue}) => {
    try{
        const response = await InvoiceAPI.verifyAccount(data);
        return fulfillWithValue(response.data);
    } catch(e){
        return rejectWithValue({
            errMsg: e.response.data.error.message,
            errCode: e.response.request.status,
        });
    }
})

export const resendVerification = createAsyncThunk('post/resendVerification', async (data, {fulfillWithValue, rejectWithValue}) => {
    try{
        const response = await InvoiceAPI.resendVerification(data);
        return fulfillWithValue(response.data);
    } catch(e){
        return rejectWithValue({
            errMsg: e.response.data.error.message,
            errCode: e.response.request.status,
        });
    }
})

const verificationSlice = createSlice({
    name: 'verificationState',
    initialState,
    reducers: {
        clearVerificationState(state){
            state.loading = false;
            state.error = false;
            state.succeed = false;
            state.errMsg = '';
            state.errCode = 0;
            state.resendLoading = false;
            state.resendsucceed = false;
            state.resendError = false;
            state.resendErrMsg = '';
            state.resendErrCode = 0;
        },
    },
    extraReducers(builder){
        builder.addCase(verifyAccount.pending, (state) => {
            state.loading = true;
            state.succeed = false;
            state.error = false
        })
        .addCase(verifyAccount.fulfilled, (state) => {
            state.loading = false;
            state.succeed = true;
            state.error = false
        })
        .addCase(verifyAccount.rejected, (state, action) => {
            state.loading = false;
            state.succeed = false;
            state.error = true;
            state.errCode = action.payload.errCode;
            console.log(action.payload.errMsg);
            state.errMsg = action.payload.errMsg;
        })
        .addCase(resendVerification.pending, (state) => {
            state.resendLoading = true;
            state.resendsucceed = false;
            state.resendError = false
        })
        .addCase(resendVerification.fulfilled, (state) => {
            state.resendLoading = false;
            state.resendsucceed = true;
            state.resendError = false
        })
        .addCase(resendVerification.rejected, (state, action) => {
            state.resendLoading = false;
            state.resendsucceed = false;
            state.resendError = true;
            console.log(action.payload.errMsg);
            state.resendErrCode = action.payload.errCode
            state.resendErrMsg = action.payload.errMsg;
        })
    } 
});

export const { clearVerificationState } = verificationSlice.actions;

export const getVerificationState = (state) => state.verificationState;

export default verificationSlice.reducer;