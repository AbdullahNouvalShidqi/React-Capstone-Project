import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import InvoiceAPI from "../../api/InvoiceAPI";

export const getInvoices = createAsyncThunk('get/invoices', async (data, {fulfillWithValue, rejectWithValue}) => {
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


const INVOICE_INITIAL_STATE = {
    status: {
        loading: false,
        error: false,
        succeed: false,
        errMsg: '',
        errCode: 0,
    },
    filter: 'All',
    data: [],
    filteredData: undefined,
    searchValue: ''
}

const invoiceSlice = createSlice({
    name: 'invoices',
    initialState: INVOICE_INITIAL_STATE,
    reducers: {
        clearInvoiceStatus: (state) => {
            state.status = INVOICE_INITIAL_STATE.status;
        },
        setData: (state, event) => {
            state.data = [...event.payload];
        },
        setFilter: (state, event) => {
            state.filter = event.payload;

            if(state.filter !== 'All'){
                state.filteredData = state.data.filter(
                    (data) => data.payment_status_name.toLowerCase() === state.filter.toLowerCase() && (data.customer_name.toLowerCase().includes(state.searchValue) || data.invoice_id.toString().toLowerCase().includes(state.searchValue))
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
                    (data) => (data.customer_name.toLowerCase().includes(state.searchValue) || data.invoice_id.toString().toLowerCase().includes(state.searchValue)) && data.payment_status_name.toLowerCase() === state.filter.toLowerCase()
                )
            } else {
                state.filteredData = state.data.filter(
                    (data) => (data.customer_name.toLowerCase().includes(state.searchValue) || data.invoice_id.toString().toLowerCase().includes(state.searchValue))
                ); 
            }
        }
    },
    extraReducers(builder){
        builder.addCase(getInvoices.pending, (state) => {
            state.status.loading = true;
            state.status.error = false;
            state.status.succeed = false;
        })
        .addCase(getInvoices.fulfilled, (state, action) => {
            state.status.loading = false;
            state.status.error = false;
            state.status.succeed = true;
            state.data = action.payload.invoices.filter((data) => data.payment_status_name.toLowerCase() !== 'pending');
        })
        .addCase(getInvoices.rejected, (state, action) => {
            state.status.loading = false;
            state.status.error = true;
            state.status.succeed = false;
            state.status.errMsg = action.payload.errMsg;
            state.status.errCode = action.payload.errCode;
        })
    }
});

export const { setData, setFilter, setSearch, clearInvoiceStatus } = invoiceSlice.actions;

export const getInvoicesData = (state) => state.invoices.data;

export const getFilterStatus = (state) => state.invoices.filter;

export const getFilteredData = (state) => state.invoices.filteredData;

export const getSearchValue = (state) => state.invoices.searchValue;

export const getInvoiceStatus = (state) => state.invoices.status;

export default invoiceSlice.reducer;