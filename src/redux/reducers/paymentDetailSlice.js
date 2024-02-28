import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import InvoiceAPI from "../../api/InvoiceAPI";

const paymentDetailInitialState = undefined;

const initialStatus = {
    loading: false,
    error: false,
    succeed: false,
    errCode: 0,
    errMsg: ''
}

export const getInvoicePaymentDetailById = createAsyncThunk('get/getPayemntDetailById', async (id, {fulfillWithValue, rejectWithValue}) => {
    try{
      const response = await InvoiceAPI.getPayemntDetailById(id);
      return fulfillWithValue(response.data);
    } catch(e) {
      return rejectWithValue({
        errMsg: e.response.data.error.message,
        errCode: e.response.request.status,
      })
    }
  });

const paymentDetailSlice = createSlice({
    name: 'paymentDetail',
    initialState: {
        status: initialStatus,
        detailData : paymentDetailInitialState,
    },
    reducers: {
        clearPaymentDetailData: (state) => {
            state.detailData = undefined;
        },
    },
    extraReducers(builder){
        builder.addCase(getInvoicePaymentDetailById.pending, (state) => {
            state.status.loading = true;
            state.status.error = false;
            state.status.succeed = false;
        })
        .addCase(getInvoicePaymentDetailById.fulfilled, (state, action) => {
            state.status.loading = false;
            state.status.error = false;
            state.status.succeed = true;
            state.detailData = action.payload.data;
        })
        .addCase(getInvoicePaymentDetailById.rejected, (state, action) => {
            state.status.loading = false;
            state.status.error = true;
            state.status.succeed = false;
            state.status.errCode = action.payload.errCode;
            state.status.errMsg = action.payload.errMsg;
        })
    }
})

export const { clearPaymentDetailData } = paymentDetailSlice.actions;

export const getPaymentsDetailData = (state) => state.paymentDetail.detailData;

export const getPaymentDetailStatus = (state) => state.paymentDetail.status;

export default paymentDetailSlice.reducer;