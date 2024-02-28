const getClassNameByStatus = (status, dueDate) => {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    const todaysDate = new Date();
    const trueDueDate = new Date(Date.parse(dueDate));
    const utc1 = Date.UTC(todaysDate.getFullYear(), todaysDate.getMonth(), todaysDate.getDate());
    const utc2 = Date.UTC(trueDueDate.getFullYear(), trueDueDate.getMonth(), trueDueDate.getDate());
    const diffDays = Math.floor((utc1 - utc2) / _MS_PER_DAY);

    if (status.toLowerCase() === 'paid'){
        return 'invoice-status-paid'
    }
    else if(status.toLowerCase() === 'failed'){
        return 'invoice-status-overdue';
    }
    else if(trueDueDate > todaysDate || diffDays === 0){
        return `invoice-status-unpaid`;
    } else {
        return `invoice-status-overdue`
    }
}

export default getClassNameByStatus;