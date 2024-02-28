import { useEffect, useState } from "react";
import { Container, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { clearPaymentDeclineState, getRejectStatus, rejectPaymentById } from "../../redux/reducers/acceptRejectPaymentSlice";
import { clearPaymentDetailData, getPaymentsDetailData } from "../../redux/reducers/paymentDetailSlice";
import { hideRejectionModal } from "../../redux/reducers/paymentRejectionModalSlice";
import loadingRolling from '../../assets/svg/loadingRolling.svg';
import Swal from "sweetalert2";
import { getAllPayments } from "../../redux/reducers/paymentSlice";

const PaymentRejectionModal = () => {
    const dispatch = useDispatch();
    const rejectStatus = useSelector(getRejectStatus);
    const paymentDetailData = useSelector(getPaymentsDetailData);
    const [ reasonValue, setReasonValue ] = useState('');
    const [ otherMessage, setOtherMessage ] = useState('');

    useEffect(() => {
        if(rejectStatus.succeed){
            Swal.fire({
                icon: 'success',
                title: 'Reject Payment Succeed',
                text: `You have succesfuly reject the payment`,
                confirmButtonText: 'Yes',
                confirmButtonColor: '#173468',
            }).then(() => {
                dispatch(clearPaymentDeclineState());
                dispatch(getAllPayments());
                dispatch(clearPaymentDetailData());
                dispatch(hideRejectionModal());
            })
        }
        if(rejectStatus.error){
            Swal.fire({
                icon: 'error',
                title: 'Confirm Payment Failed',
                text: `${rejectStatus.errMsg}`,
                confirmButtonText: 'Yes',
                confirmButtonColor: '#173468',
            }).then(() => {
                dispatch(clearPaymentDeclineState());
            })
        }
    })

    const onChange = (e) => {
        setOtherMessage('');
        setReasonValue(e.target.value);
    }

    const otherOnChange = (e) => {
        setOtherMessage(e.target.value);
    }

    const backgroundOnClick = () => {
        dispatch(hideRejectionModal());
    }

    const confirmOnClick = () => {
        if(rejectStatus.loading)return;
        if(reasonValue === '' || (reasonValue === 'Other' && otherMessage === '')){
            Swal.fire({
                icon: 'error',
                title: 'Reject Payment Failed',
                text: `Please input a reason before reject payment`,
                confirmButtonText: 'Yes',
                confirmButtonColor: '#173468',
            });
            return
        }
        if(otherMessage !== ''){
            dispatch(rejectPaymentById({
                id: paymentDetailData.invoice_id,
                message: {
                    message: otherMessage
                }
            }))
        } else {
            dispatch(rejectPaymentById({
                id: paymentDetailData.invoice_id,
                message: {
                    message: reasonValue
                }
            }))
        }
    }

    return(
        <>
            <div className="modal-test" onClick={backgroundOnClick}/>
            <Container className="rejection-modal-container">
                <div className='d-flex flex-column justify-content-start align-items-start w-100 h-100'>
                    <div className="d-flex flex-row justify-content-between align-items-center w-100">
                        <div className="invoice-modal-filter-text">Filter</div>
                        <div className="invoice-modal-reset-text-button" onClick={backgroundOnClick}>Cancel</div>
                    </div>
                    <div className="invoice-modal-border"/>
                    <div>
                        <div className="form-check">
                            <input 
                                type="radio" 
                                className="form-check-input" 
                                id="radio1" 
                                name="optradio" 
                                value="Transfer receipt doesn’t match"
                                onChange={onChange}
                                selected={reasonValue === 'Transfer receipt doesn’t match'}
                            />
                            <label className="form-check-label invoice-modal-label-text" for="radio1">Transfer receipt doesn’t match</label>
                        </div>
                        <div className="form-check">
                            <input 
                                type="radio" 
                                className="form-check-input" 
                                id="radio2" 
                                name="optradio" 
                                value="Total amount doesn’t match"
                                onChange={onChange}
                                selected={reasonValue === 'Total amount doesn’t match'}
                            />
                            <label className="form-check-label invoice-modal-label-text" for="radio2">Total amount doesn’t match</label>
                        </div>
                        <div className="form-check">
                            <input 
                                type="radio" 
                                className="form-check-input" 
                                id="radio3" 
                                name="optradio" 
                                value="Other"
                                onChange={onChange}
                                selected={reasonValue === 'Other'}
                            />
                            <label className="form-check-label invoice-modal-label-text" for="radio3">Other</label>
                        </div>
                        <Form.Control
                            style={{width: '452px', marginTop: '5px', transition: '0.5s', display: `${reasonValue === 'Other' ? '' : 'none'}`}}
                            name='reason'
                            type="text"
                            placeholder="Input your reason of payment rejection..."
                            value={otherMessage}
                            onChange={otherOnChange}
                        />
                    </div>
                </div>
                <div className="modal-filter-submit-button" onClick={confirmOnClick}>
                    {
                        rejectStatus.loading ? <img src={loadingRolling} height='20px' width='20px' alt='notFound' /> :
                        "Confirm"
                    }
                </div>
            </Container>
        </>
    )
}

export default PaymentRejectionModal;