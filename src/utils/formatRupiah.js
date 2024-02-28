const formatRupiah = (number) => {
    return Intl.NumberFormat('id-Id', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0}).format(number);
}

export default formatRupiah;