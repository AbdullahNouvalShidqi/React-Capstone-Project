import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import InvoiceAPI from "../../api/InvoiceAPI";

export const getAllCostumer = createAsyncThunk('get/allCostuner', async (data, {fulfillWithValue, rejectWithValue}) => {
    try{
        const response = await InvoiceAPI.getAllCostumer();
        return fulfillWithValue(response.data.data);
    } catch(e) {
        return rejectWithValue({
            errMsg: e.response.data.error.message,
            errCode: e.response.request.status,
        });
    }
    
})

const initialState = {
    status: {
        loading: false,
        succeed: false,
        error: false,
        errMsg: '',
        errCode: 0
    },
    data: []
}

const userDropDownSlice = createSlice({
    name: 'userDropdown',
    initialState,
    reducers: {
        clearUsersState: (state) => {
            state.status = initialState.status;
        },
        cleaUsersData: (state) => {
            state.data = [];
        }
    },
    extraReducers(builder){
        builder.addCase(getAllCostumer.pending, (state) => {
            state.status.loading = true;
            state.status.error = false;
            state.status.succeed = false;
        })
        .addCase(getAllCostumer.fulfilled, (state, action) => {
            state.status.loading = false;
            state.status.error = false;
            state.status.succeed = true;
            state.data = action.payload;
        })
        .addCase(getAllCostumer.rejected, (state, action) => {
            state.status.loading = false;
            state.status.error = true;
            state.status.succeed = false;
            console.log(action.payload.errMsg);
            state.status.errMsg = action.payload.errMsg;
            state.status.errCode = action.payload.errCode;
        })
    }
})

export const { clearUsersState, cleaUsersData } = userDropDownSlice.actions;

export const getUserDropdownStatus = (state) => state.userDropdown.status;

export const getUserDropdownData = (state) => state.userDropdown.data;

export default userDropDownSlice.reducer;