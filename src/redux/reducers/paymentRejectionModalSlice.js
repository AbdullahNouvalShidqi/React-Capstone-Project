import { createSlice } from "@reduxjs/toolkit";

const paymentRejectionModalSlice = createSlice({
    name: 'rejectionModal',
    initialState: {
        showModal: false,
    },
    reducers: {
        showRejectionModal: (state) => {
            state.showModal = true;
        },
        hideRejectionModal: (state) => {
            state.showModal = false;
        }
    }
});

export const { showRejectionModal, hideRejectionModal } = paymentRejectionModalSlice.actions;

export const getRejectionModalStatus = (state) => state.rejectionModal.showModal;

export default paymentRejectionModalSlice.reducer;