import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import InvoiceAPI from "../../api/InvoiceAPI";

const initialState = {
    acceptStatus: {
        loading: false,
        error: false,
        succeed: false,
        errMsg: '',
        errCode: 0
    },
    rejectStatus: {
        loading: false,
        error: false,
        succeed: false,
        errMsg: '',
        errCode: 0
    }
}

export const acceptPaymentById = createAsyncThunk('put/acceptPayment', async(data, {fulfillWithValue, rejectWithValue}) => {
    try{
        const response = await InvoiceAPI.acceptPaymentById(data);
        return fulfillWithValue(response.data.data);
    } catch(e){
        return rejectWithValue({
            errMsg: e.response.data.error.message,
            errCode: e.response.request.status,
        })
    }
});

export const rejectPaymentById = createAsyncThunk('put/rejectPyament', async (data, {fulfillWithValue, rejectWithValue}) => {
    try{
        console.log(data.message);
        const response = await InvoiceAPI.rejectPaymentById(data.id, data.message);
        return fulfillWithValue(response.data.data);
    } catch(e){
        return rejectWithValue({
            errMsg: e.response.data.error.message,
            errCode: e.response.request.status,
        })
    }
})

const acceptRejectPaymentSlice = createSlice({
    name: 'paymentConfirmation',
    initialState,
    reducers: {
        clearPaymentAcceptState: (state) => {
            state.acceptStatus = initialState.acceptStatus;
        },
        clearPaymentDeclineState: (state) => {
            state.rejectStatus = initialState.rejectStatus;
        }
    },
    extraReducers(builder){
        builder.addCase(acceptPaymentById.pending, (state) => {
            state.acceptStatus.loading = true;
            state.acceptStatus.error = false;
            state.acceptStatus.succeed = false;
        })
        .addCase(acceptPaymentById.fulfilled, (state) => {
            state.acceptStatus.loading = false
            state.acceptStatus.error = false;
            state.acceptStatus.succeed = true;
        })
        .addCase(acceptPaymentById.rejected, (state, action) => {
            state.acceptStatus.loading = false;
            state.acceptStatus.succeed = false;
            state.acceptStatus.error = true;
            state.acceptStatus.errMsg = action.payload.errMsg;
            state.acceptStatus.errCode = action.payload.errCode;
        })
        .addCase(rejectPaymentById.pending, (state) => {
            state.rejectStatus.loading = true;
            state.rejectStatus.error = false;
            state.rejectStatus.succeed = false;
        })
        .addCase(rejectPaymentById.fulfilled, (state) => {
            state.rejectStatus.loading = false
            state.rejectStatus.error = false;
            state.rejectStatus.succeed = true;
        })
        .addCase(rejectPaymentById.rejected, (state, action) => {
            state.rejectStatus.loading = false;
            state.rejectStatus.succeed = false;
            state.rejectStatus.error = true;
            state.rejectStatus.errMsg = action.payload.errMsg;
            state.rejectStatus.errCode = action.payload.errCode;
        })
    }
});

export const { clearPaymentAcceptState, clearPaymentDeclineState } = acceptRejectPaymentSlice.actions;

export const getAcceptStatus = (state) => state.paymentConfirmation.acceptStatus;

export const getRejectStatus = (state) => state.paymentConfirmation.rejectStatus;

export default acceptRejectPaymentSlice.reducer;