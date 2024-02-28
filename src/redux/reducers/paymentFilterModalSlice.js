import { createSlice } from "@reduxjs/toolkit";

const paymentFilterModalSlice = createSlice({
    name: 'paymentModal',
    initialState: {
        showModal: false
    },
    reducers: {
        showFilterModal: (state) => {
            state.showModal = true;
        },
        hideFilterModal: (state) => {
            state.showModal = false;
        }
    }
})

export const { showFilterModal, hideFilterModal } = paymentFilterModalSlice.actions;

export const getPaymentModalShowStatus = (state) => state.paymentModal.showModal;

export default paymentFilterModalSlice.reducer;