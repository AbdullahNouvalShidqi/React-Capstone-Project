import { createSlice } from "@reduxjs/toolkit";

const dummyData = [
    {
        id: 'INV-00341212',
        payment_status: "Paid",
        total_price: 24800000,
        due_at: "5 December 2022",
        created_at : "24 November 2022",
        updated_at: "",
        merchant: {
            id: "string",
            name: "string",
            display_profile_url: "string",
            address: "string"
        },
        customer: {
            id: "1231233",
            name: "Alvin Wiraprathama",
            email: "wiraprathamaalvin@gmail.com",
            address: "Jalan Gajah Waktra no 1"
        },
        "payment_method": {
            "payment_type": "manual",
            "bank_name": "string",
            "bank_code": "string",
            "bank_number": "string",
            "on_behalf_of": "string"
        },
        items: [
            {
            product: "Asus Vivobook",
            quantity: 2,
            price: 12000000,
            total_price: 24000000,
            created_at: "string",
            updated_at: "string"
            },
            {
            product: "SSD Samsung Evo",
            quantity: 1,
            price: 800000,
            total_price: 800000,
            created_at: "string",
            updated_at: "string"
            },
            {
            product: "Shipping",
            quantity: 1,
            price: 0,
            total_price: 0,
            created_at: "string",
            updated_at: "string"
            },
        ]
    },
    {
        id: 'INV-00341213',
        payment_status: "Unpaid",
        total_price: 12800000,
        due_at: "28 November 2022",
        created_at : "24 November 2022",
        updated_at: "",
        merchant: {
            id: "string",
            name: "string",
            display_profile_url: "string",
            address: "string"
        },
        customer: {
            id: "1231234",
            name: "Abdullah Nouval Shidqi",
            email: "abullah.nouval@gmail.com",
            address: "Jalan Kawista no 2"
        },
        "payment_method": {
            "payment_type": "manual",
            "bank_name": "string",
            "bank_code": "string",
            "bank_number": "string",
            "on_behalf_of": "string"
        },
        items: [
            {
            product: "Microsoft Surface Pro 4",
            quantity: 1,
            price: 12000000,
            total_price: 12000000,
            created_at: "string",
            updated_at: "string"
            },
            {
            product: "SSD Seagate",
            quantity: 1,
            price: 800000,
            total_price: 800000,
            created_at: "string",
            updated_at: "string"
            },
            {
            product: "Shipping",
            quantity: 1,
            price: 0,
            total_price: 0,
            created_at: "string",
            updated_at: "string"
            },
        ]
    },
    {
        id: 'INV-00341215',
        payment_status: "Unpaid",
        total_price: 24800000,
        due_at: "7 December 2022",
        created_at : "24 November 2022",
        updated_at: "",
        merchant: {
            id: "string",
            name: "string",
            display_profile_url: "string",
            address: "string"
        },
        customer: {
            id: "1231235",
            name: "Alvin Wiraprathama",
            email: "wiraprathamaalvin@gmail.com",
            address: "Jalan Gajah Waktra no 1"
        },
        "payment_method": {
            "payment_type": "manual",
            "bank_name": "string",
            "bank_code": "string",
            "bank_number": "string",
            "on_behalf_of": "string"
        },
        items: [
            {
            product: "Asus Vivobook",
            quantity: 2,
            price: 12000000,
            total_price: 24000000,
            created_at: "string",
            updated_at: "string"
            },
            {
            product: "SSD Samsung Evo",
            quantity: 1,
            price: 800000,
            total_price: 800000,
            created_at: "string",
            updated_at: "string"
            },
            {
            product: "Shipping",
            quantity: 1,
            price: 0,
            total_price: 0,
            created_at: "string",
            updated_at: "string"
            },
        ]
    },
]

const INVOICE_INITIAL_STATE = {
    filter: 'All',
    data: dummyData,
    filteredData: undefined,
    searchValue: ''
}

const invoiceSlice = createSlice({
    name: 'invoices',
    initialState: INVOICE_INITIAL_STATE,
    reducers: {
        setData: (state, event) => {
            state.data = [...event.payload];
        },
        setFilter: (state, event) => {
            state.filter = event.payload;

            if(state.filter !== 'All'){
                state.filteredData = state.data.filter(
                    (data) => data.payment_status.toLocaleLowerCase() === state.filter.toLowerCase() && (data.customer.name.toLowerCase().includes(state.searchValue) || data.id.toLowerCase().includes(state.searchValue))
                );
            } else {
                state.filteredData = state.data.filter(
                    (data) => (data.customer.name.toLowerCase().includes(state.searchValue) || data.id.toLowerCase().includes(state.searchValue))
                );
            }
        },
        setSearch: (state, action) => {
            state.searchValue = action.payload.toLowerCase();

            if(state.filter !== 'All'){
                state.filteredData = state.data.filter(
                    (data) => (data.customer.name.toLowerCase().includes(state.searchValue) || data.id.toLowerCase().includes(state.searchValue)) && data.payment_status.toLowerCase() === state.filter.toLowerCase()
                )
            } else {
                state.filteredData = state.data.filter(
                    (data) => (data.customer.name.toLowerCase().includes(state.searchValue) || data.id.toLowerCase().includes(state.searchValue))
                ); 
            }
        }
    }
});

export const { setData, setFilter, setSearch } = invoiceSlice.actions;

export const getInvoicesData = (state) => state.invoices.data;

export const getFilterStatus = (state) => state.invoices.filter;

export const getFilteredData = (state) => state.invoices.filteredData;

export const getSearchValue = (state) => state.invoices.searchValue;

export default invoiceSlice.reducer;