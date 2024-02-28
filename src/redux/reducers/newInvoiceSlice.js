import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import InvoiceAPI from "../../api/InvoiceAPI";

export const createNewInvoice = createAsyncThunk('post/createNewInvoice', async (data, {fulfillWithValue, rejectWithValue}) => {
    try{
        console.log(data);
        const response = await InvoiceAPI.createNewInvoice(data);
        return fulfillWithValue(response.data);
    } catch(e) {
        return rejectWithValue({
            errMsg: e.response.data.error.message,
            errCode: e.response.request.status,
        });
    }
})

const initialState = {
    loading: false,
    error: false,
    succeed: false,
    errMsg: '',
    errCode: 0
}

const newInvoiceSlice = createSlice({
    name: 'newInvoice',
    initialState,
    reducers: {
        clearNewInvoiceState: (state) => {
            state.loading = initialState.loading;
            state.error = initialState.error;
            state.succeed = initialState.succeed;
            state.errMsg = initialState.errMsg;
            state.errCode = initialState.errCode;
        }
    },
    extraReducers(builder){
        builder.addCase(createNewInvoice.pending, (state) => {
            state.loading = true;
            state.error = false;
            state.succeed = false;
        })
        .addCase(createNewInvoice.fulfilled, (state) => {
            state.loading = false;
            state.error = false;
            state.succeed = true;
        })
        .addCase(createNewInvoice.rejected, (state, action) => {
            state.loading = false;
            state.error = true;
            state.succeed = false;
            state.errMsg = action.payload.errMsg;
            state.errCode = action.payload.errCode;
        })
    }
});

export const { clearNewInvoiceState } = newInvoiceSlice.actions;

export const getNewInvoiceState = (state) => state.newInvoice;

export default newInvoiceSlice.reducer;