import searchLogo from "../../assets/svg/searchLogo.svg";
import {TiDelete} from 'react-icons/ti';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPaymentSearchValue, setSearch } from "../../redux/reducers/paymentSlice";

const PaymentSearchContainer = () => {
    const dispatch = useDispatch();
    const searchValue = useSelector(getPaymentSearchValue);
    const [ searchvalue, setSearchValue ] = useState(searchValue);

    const onChange = (e) => {
        setSearchValue(e.target.value);
        dispatch(setSearch(e.target.value));
    }

    const xIconOnClick = () => {
        setSearchValue('');
        dispatch(setSearch(''));
    }

    return(
        <div className="search-container">
            <div className="d-flex flex-row justify-content-between align-items-center w-100">
                <div className="d-flex flex-row justify-content-start align-items-center gap-2">
                <img src={searchLogo} alt='Not found'/>
                <input className="header-search-input" type={'text'} placeholder='Search Payments' onChange={onChange} value={searchvalue} />
                </div>
                <TiDelete style={{cursor: 'pointer'}} size={25} color={'#D62D33'} onClick={xIconOnClick} />
            </div>
        </div>
    );
}

export default PaymentSearchContainer;