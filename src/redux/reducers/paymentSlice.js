import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import InvoiceAPI from "../../api/InvoiceAPI";

const initialStatus = {
    loading: false,
    error: false,
    succeed: false,
    errMsg: '',
    errCode: 0
}

const paymentInitialData = {
    status: initialStatus,
    filter: 'All',
    data: [],
    filteredData: undefined,
    searchValue: ''
}

export const getAllPayments = createAsyncThunk('get/invoices', async (data, {fulfillWithValue, rejectWithValue}) => {
    try{
        const reponse = await InvoiceAPI.getInvoices();
        return fulfillWithValue(reponse.data.data);
    }catch(e){
        return rejectWithValue({
            errMsg: e.response.data.error.message,
            errCode: e.response.request.status,
        })
    }
})

const paymentSlice = createSlice({
    name: 'payments',
    initialState: paymentInitialData,
    reducers: {
        clearPaymentStatus: (state) => {
            state.status = initialStatus;
        },
        setData: (state, event) => {
            state.data = [...event.payload];
        },
        setFilter: (state, event) => {
            state.filter = event.payload;

            state.filter = event.payload;

            if(state.filter !== 'All'){
                state.filteredData = state.data.filter(
                    (data) => data.payment_type_name.toLocaleLowerCase() === state.filter.toLowerCase() && (data.customer_name.toLowerCase().includes(state.searchValue) || data.invoice_id.toString().toLowerCase().includes(state.searchValue))
                );
            } else {
                state.filteredData = state.data.filter(
                    (data) => (data.customer_name.toLowerCase().includes(state.searchValue) || data.invoice_id.toString().toLowerCase().includes(state.searchValue))
                );
            }
        },
        setSearch: (state, action) => {
            state.searchValue = action.payload.toLowerCase();

            if(state.filter !== 'All'){
                state.filteredData = state.data.filter(
                    (data) => (data.customer_name.toLowerCase().includes(state.searchValue) || data.invoice_id.toString().toLowerCase().includes(state.searchValue)) && data.payment_type_name.toLowerCase() === state.filter.toLowerCase()
                )
            } else {
                state.filteredData = state.data.filter(
                    (data) => (data.customer_name.toLowerCase().includes(state.searchValue) || data.invoice_id.toString().toLowerCase().includes(state.searchValue))
                ); 
            }
        }
    },
    extraReducers(builder){
        builder.addCase(getAllPayments.pending, (state) => {
            state.status.loading = true;
            state.status.error = false;
            state.status.succeed = false;
        })
        .addCase(getAllPayments.fulfilled, (state, action) => {
            state.status.loading = false;
            state.status.error = false;
            state.status.succeed = true;
            state.data = action.payload.invoices.filter((data) => data.payment_status_name === 'Pending');
        })
        .addCase(getAllPayments.rejected, (state, action) => {
            state.status.loading = false;
            state.status.error = true;
            state.status.succeed = false;
            state.status.errMsg = action.payload.errMsg;
            state.status.errCode = action.payload.errCode;
        })
    }
})

export const { setData, setFilter, setSearch, clearPaymentStatus } = paymentSlice.actions;

export const getPaymentsData = (state) => state.payments.data;

export const getPaymentsFilteredData = (state) => state.payments.filteredData;

export const getPaymentsFilterStatus = (state) => state.payments.filter;

export const getPaymentSearchValue = (state) => state.payments.searchValue;

export const getPaymentStatus = (state) => state.payments.status;

export default paymentSlice.reducer;