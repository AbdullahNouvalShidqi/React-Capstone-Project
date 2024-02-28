import { createSlice } from "@reduxjs/toolkit";

const filterModalSlice = createSlice({
    name: 'filterModal',
    initialState: {
        showModal: false,
    },
    reducers: {
        showFilterModal: (state) => {
            state.showModal = true;
        },
        hideFilterModal: (state) => {
            state.showModal = false;
        }
    }
});

export const { showFilterModal, hideFilterModal } = filterModalSlice.actions;

export const getShowFilterModal = (state) => state.filterModal.showModal;

export default filterModalSlice.reducer;