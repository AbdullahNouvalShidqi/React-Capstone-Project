import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import InvoiceAPI from "../../api/InvoiceAPI";

const initialState = {
    status: {
        loading: false,
        error: false,
        succeed: false,
        errMsg: '',
        errCode: 0
    },
    data: {
        id: 0,
        display_profile_url: "",
        email: "",
        username: "",
        merchant_name: "",
        merchant_address: "",
        merchant_phone_number: ""
    }
}

export const getMerchantData = createAsyncThunk('get/merchatData', async (data, {fulfillWithValue, rejectWithValue}) => {
    try{
        const response = await InvoiceAPI.getMerchantData();
        return fulfillWithValue(response.data);
    } catch(e) {
        Swal.fire({
            icon: 'error',
            title: 'Cannot get mechant data',
            text: `${e.response.data.error.message}`,
        })
        return rejectWithValue({
            errMsg: e.response.data.error.message,
            errCode: e.response.request.status,
        });
    }
})

const merchantSlice = createSlice({
    name: 'merchant',
    initialState,
    reducers: {
        clearStatusState: (state) => {
            state.status = initialState.status;
        },
        clearMerchantData: (state) => {
            state.data = initialState.data;
        }
    },
    extraReducers(builder){
        builder.addCase(getMerchantData.pending, (state) => {
            state.status.loading = true;
            state.status.error = false;
            state.status.succeed = false;
        })
        .addCase(getMerchantData.fulfilled, (state, action) => {
            state.status.loading = false;
            state.status.error = false;
            state.status.succeed = true;
            state.data = action.payload.data;
        })
        .addCase(getMerchantData.rejected, (state, action) => {
            state.status.loading = false;
            state.status.error = false;
            state.status.succeed = true;
            state.status.errCode = action.payload.errCode;
            state.status.errMsg = action.payload.errMsg;
        })
    }
});

export const { clearMerchantData, clearStatusState } = merchantSlice.actions;

export const getMerchantStatus = (state) => state.merchant.status;

export const getMerhchantDataValue = (state) => state.merchant.data;

export default merchantSlice.reducer;