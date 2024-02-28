import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";
import InvoiceAPI from "../../api/InvoiceAPI";

export const loginApi = createAsyncThunk('post/login', async (data, {fulfillWithValue, rejectWithValue}) => {
    try{
        const response = await InvoiceAPI.login(data);
        const token = response.data.data.access_token;
        const refreshToken = response.data.data.refresh_token
        const user = jwtDecode(token);
        localStorage.setItem('token', token);
        localStorage.setItem('refrehToken', refreshToken);
        return fulfillWithValue(user);
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
    data: {
        id: 0,
        merchant_id: 0,
        merchant_name: ''
    }
}

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        clearLoginState: (state) => {
            state.status = initialState.status;
        },
        logOut: (state) => {
            state.status = {
                loading: false,
                succeed: false,
                error: false,
                errMsg: '',
                errCode: 0
            };
            state.data = {
                id: 0,
                merchant_id: 0,
                merchant_name: ''
            }
            localStorage.clear();
        }
    },
    extraReducers(builder){
        builder.addCase(loginApi.pending, (state) => {
            state.status.loading = true;
            state.status.succeed = false;
            state.status.error = false;
        })
        .addCase(loginApi.fulfilled, (state, action) => {
            state.status.loading = false;
            state.status.succeed = true;
            state.status.error = false;
            state.data = action.payload;
        })
        .addCase(loginApi.rejected, (state, action) => {
            state.status.loading = false;
            state.status.succeed = false;
            state.status.error = true;
            state.status.errMsg = action.payload.errMsg;
            state.status.errCode = action.payload.errCode;
        })
    }
})

export const { clearLoginState, logOut } = loginSlice.actions;

export const getLoginStatus = (state) => state.login.status;

export const getLoginUserData = (state) => state.login.data;

export default loginSlice.reducer;