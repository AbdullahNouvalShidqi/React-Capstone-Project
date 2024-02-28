import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import InvoiceAPI from "../../api/InvoiceAPI";

const invoiceDetailInitialState = undefined;

const statusInitialState = {
  loading: false,
  error: false,
  succeed: false,
  errMsg: '',
  errCode: 0
}

export const getInvoiceDetailById = createAsyncThunk('get/invoiceDetailById', async (id, {fulfillWithValue, rejectWithValue}) => {
  try{
    const response = await InvoiceAPI.getInvoiceDetailById(id);
    return fulfillWithValue(response.data);
  } catch(e) {
    return rejectWithValue({
      errMsg: e.response.data.error.message,
      errCode: e.response.request.status,
    })
  }
});

const invoiceDetailSlice = createSlice({
  name: 'invoiceDetail',
  initialState: {
      status: statusInitialState,
      detailData: invoiceDetailInitialState,
  },
  reducers: {
    clearDetailData: (state) => {
        state.detailData = invoiceDetailInitialState;
    },
    clearDetailStatus: (state) => {
      state.staus = statusInitialState;
    }
  },
  extraReducers(builder){
    builder.addCase(getInvoiceDetailById.pending, (state) => {
      state.status.loading = true;
      state.status.error = false;
      state.status.succeed = false;
    })
    .addCase(getInvoiceDetailById.fulfilled, (state, action) => {
      state.status.loading = false;
      state.status.error = false;
      state.status.succeed = true;
      state.detailData = action.payload.data;
    })
    .addCase(getInvoiceDetailById.rejected, (state, action) => {
      state.status.loading = false;
      state.status.error = true;
      state.status.succeed = false;
      state.status.errCode = action.payload.errCode;
      state.status.errMsg = action.payload.errMsg
    })
  }
});

export const { setDetailData, clearDetailData, clearDetailStatus } = invoiceDetailSlice.actions;

export const getDetailData = (state) => state.invoiceDetail.detailData;

export default invoiceDetailSlice.reducer;