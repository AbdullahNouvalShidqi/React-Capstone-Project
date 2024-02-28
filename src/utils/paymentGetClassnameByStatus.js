const paymentGetClassnameByStatus = (status) => {
    if (status.toLowerCase() === 'success'){
        return 'invoice-status-paid'
    } else {
        return 'invoice-status-unpaid'
    }
}

export default paymentGetClassnameByStatus;