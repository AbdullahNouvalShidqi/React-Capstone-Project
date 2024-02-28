const getDateDifferences = (status, dueDate) =>{
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    const todaysDate = new Date();
    const trueDueDate = new Date(Date.parse(dueDate));
    const utc1 = Date.UTC(todaysDate.getFullYear(), todaysDate.getMonth(), todaysDate.getDate());
    const utc2 = Date.UTC(trueDueDate.getFullYear(), trueDueDate.getMonth(), trueDueDate.getDate());
    const diffDays = Math.floor((utc1 - utc2) / _MS_PER_DAY);

    if(status.toLowerCase() === 'paid'){
        return 'Paid';
    }
    else if(status.toLowerCase() === 'failed'){
        return 'Failed';
    }
    else if(diffDays === 0){
        return 'Due Today'
    }
    else if(trueDueDate > todaysDate){
        return `${diffDays * -1} Days Left`;
    } else {
        return `Overdue by ${diffDays} Days`
    }
}

export default getDateDifferences;