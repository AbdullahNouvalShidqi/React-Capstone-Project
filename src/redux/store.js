import { configureStore } from "@reduxjs/toolkit";
import acceptRejectPaymentSlice from "./reducers/acceptRejectPaymentSlice";
import filterModalSlice from "./reducers/filterModalSlice";
import invoiceDetailSlice from "./reducers/invoiceDetailSlice";
import invoicesSlice from "./reducers/invoicesSlice";
import loginSlice from "./reducers/loginSlice";
import merchantSlice from "./reducers/merchantSlice";
import navbarSlice from "./reducers/navbarSlice";
import newInvoiceSlice from "./reducers/newInvoiceSlice";
import paymentDetailSlice from "./reducers/paymentDetailSlice";
import paymentFilterModalSlice from "./reducers/paymentFilterModalSlice";
import paymentRejectionModalSlice from "./reducers/paymentRejectionModalSlice";
import paymentSlice from "./reducers/paymentSlice";
import registerSlice from "./reducers/registerSlice";
import userDropDownSlice from "./reducers/userDropDownSlice";
import verificationSlice from "./reducers/verificationSlice";

export const store = configureStore({
    reducer: {
        navbarState: navbarSlice,
        invoices: invoicesSlice,
        filterModal: filterModalSlice,
        invoiceDetail: invoiceDetailSlice,
        payments: paymentSlice,
        paymentDetail: paymentDetailSlice,
        paymentModal: paymentFilterModalSlice,
        rejectionModal: paymentRejectionModalSlice,
        register: registerSlice,
        verificationState: verificationSlice,
        login: loginSlice,
        userDropdown: userDropDownSlice,
        newInvoice: newInvoiceSlice,
        merchant: merchantSlice,
        paymentConfirmation: acceptRejectPaymentSlice
    },
})