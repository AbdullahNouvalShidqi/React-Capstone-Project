import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import InvoiceAPI from "../../api/InvoiceAPI";

export const register = createAsyncThunk("post/register", async (data, {rejectWithValue, fulfillWithValue}) => {
    try{
        const response = await InvoiceAPI.register(data);
        return fulfillWithValue(response.data)
    } catch(e){
        return rejectWithValue({
            errMsg: e.response.data.error.message,
            errCode: e.response.request.status,
        });
    }
});

const initialState = {
    loading: false,
    succeed: false,
    error: false,
    errMsg: '',
    errCode: 0
}

const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        clearState(state){
            state.loading = false;
            state.succeed = false;
            state.error = false;
            state.errMsg = '';
            state.errCode = 0;
        }
    },
    extraReducers(builder){
        builder.addCase(register.pending, (state) => {
            state.loading = true;
            state.succeed = false;
            state.error = false
        })
        .addCase(register.fulfilled, (state) => {
            state.succeed = true;
            state.loading = false;
            state.error = false;
        })
        .addCase(register.rejected, (state, action) => {
            state.error = true;
            state.succeed = false;
            state.loading = false;
            state.errMsg = action.payload.errMsg;
            state.errCode = action.payload.errCode;
        })
    }
})

export const { clearState } = registerSlice.actions;

export const getRegisterState = (state) => state.register;

export default registerSlice.reducer;