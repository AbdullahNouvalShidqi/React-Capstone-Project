import { useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { hideFilterModal } from "../../redux/reducers/paymentFilterModalSlice";
import { getPaymentsFilterStatus, setFilter } from "../../redux/reducers/paymentSlice";

const PaymentFilterModal = () => {
    const dispatch = useDispatch();
    const currentFilterValue = useSelector(getPaymentsFilterStatus);
    const [ filterValue, setFilterValue ] = useState(currentFilterValue);

    const onChange = (e) => {
        setFilterValue(e.target.value);
    }

    const resetOnPressed = () => {
        setFilterValue('All');
    }

    const onSubmit = () => {
        dispatch(setFilter(filterValue));
        dispatch(hideFilterModal());
    }

    return(
        <>
            <div className="modal-test" onClick={() => dispatch(hideFilterModal())}/>
            <Container className="filter-modal-container">
                <div className='d-flex flex-column justify-content-start align-items-start w-100 h-100'>
                    <div className="d-flex flex-row justify-content-between align-items-center w-100">
                        <div className="invoice-modal-filter-text">Filter</div>
                        <div className="invoice-modal-reset-text-button" onClick={resetOnPressed}>Reset</div>
                    </div>
                    <div className="invoice-modal-border"/>
                    <div>
                        <div className="form-check">
                            <input type="radio" className="form-check-input" id="radio1" name="optradio" value="All" checked={filterValue === 'All'} onChange={onChange}/>
                            <label className="form-check-label invoice-modal-label-text" for="radio1">All</label>
                        </div>
                        <div className="form-check">
                            <input type="radio" className="form-check-input" id="radio2" name="optradio" value="Success" checked={filterValue === 'Success'} onChange={onChange}/>
                            <label className="form-check-label invoice-modal-label-text" for="radio2">Success</label>
                        </div>
                        <div className="form-check">
                            <input type="radio" className="form-check-input" id="radio3" name="optradio" value="Pending" checked={filterValue === 'Pending'} onChange={onChange}/>
                            <label className="form-check-label invoice-modal-label-text" for="radio3">Pending</label>
                        </div>
                    </div>
                </div>
                <div className="modal-filter-submit-button" onClick={onSubmit}>
                    Show Result
                </div>
            </Container>
        </>
    );
}

export default PaymentFilterModal;