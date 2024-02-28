import { Col, Container, Row, Table } from "react-bootstrap";
import {useDetectClickOutside} from "react-detect-click-outside";
import Moment from 'moment'
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import pencilIcon from '../../assets/svg/pencilIcon.svg';
import trashIcon from '../../assets/svg/trashIcon.svg'
import dropdownIcon from '../../assets/svg/dropdownIcon.svg'
import UserDataDropdownCard from "./UserDataDropdownCard";
import { useEffect, useState } from "react";
import CostumDatePicker from "./CotumDatePicker";
import {IoMdAddCircle} from 'react-icons/io'
import formatRupiah from "../../utils/formatRupiah";
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from "react-redux";
import { clearNewInvoiceState, createNewInvoice, getNewInvoiceState } from "../../redux/reducers/newInvoiceSlice";
import { useNavigate } from "react-router-dom";
import loadingRolling from '../../assets/svg/loadingRolling.svg';
import moment from "moment";
import { getInvoices } from "../../redux/reducers/invoicesSlice";

const today = new Date();

const FORM_BASE_DATA = {
    id: 0,
    email: '',
    name: '',
    address: '',
    due_at: today.setDate(today.getDate() + 1),
    items: [
        {
            product: '',
            quantity: 0,
            price: 0
        }
    ]
}

const NewInvoicesBody = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const newInvoiceState = useSelector(getNewInvoiceState);
    const [ showDropdown, setShowDropdown ] = useState(false);
    const [ formData, setFormData ] = useState(FORM_BASE_DATA)
    const [ startDate, setStartDate ] = useState(formData.due_at);
    const currentDate = Moment().format('DD MMMM YYYY');

    useEffect(() => {
        if(newInvoiceState.succeed){
            Swal.fire({
                icon: 'success',
                title: 'Creating Invoice Succeed',
                text: 'Invoice was successfuly created, please continue to invoices page',
                confirmButtonText: 'Continue to Invoices Page',
                confirmButtonColor: '#173468'
            }).then(() => {
                dispatch(clearNewInvoiceState());
                navigate('/home/invoices');
            });
            dispatch(getInvoices())
        }
        if(newInvoiceState.error){
            Swal.fire({
                icon: 'error',
                title: 'Creating Invoice Failed',
                text: `${newInvoiceState.errMsg}`,
                confirmButtonText: 'Continue',
                confirmButtonColor: '#173468',
            })
            dispatch(clearNewInvoiceState())
        }
    }, [newInvoiceState, dispatch, navigate])

    const onChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setFormData(prev => ({
            ...prev,
            [name] : value
        }))

    }

    const addLineOnClick = () => {
        const latestIndex = formData.items.length - 1;
        if(formData.items[latestIndex].product === ''){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please insert a product first before you add a new line',
                confirmButtonColor: '#173468',
            })
            return;
        }
        const newArray = [...formData.items, FORM_BASE_DATA.items[0]];

        setFormData(prev => ({
            ...prev,
            items: [...newArray]
        }))
    };

    const deleteOnClick = (i) => {
        const newArray = [...formData.items];
        newArray.splice(i, 1);

        setFormData(prev => ({
            ...prev,
            items: [...newArray]
        }))
    }

    const tableOnChange = (e, i) => {
        const name = e.target.name;
        const value = e.target.value;

        const newArray = [...formData.items];

        if((name === 'quantity' || name === 'price') && value !== ''){
            newArray[i] = {
                ...formData.items[i],
                [name]: parseInt(value)
            }
        } else {
            newArray[i] = {
                ...formData.items[i],
                [name]: value
            }
        }

        setFormData(prev => ({
            ...prev,
            items: [...newArray]
        }))
    }


    const ref = useDetectClickOutside({ onTriggered: () => {
        if(document.activeElement === ref.current){
            return
        }
        setShowDropdown(false);
    }});

    const dropdownCardOnClick = (userData) => {
        setFormData(prev => ({
            ...prev,
            id: userData.id,
            email: userData.email,
            name: userData.full_name,
            address: userData.address
        }))
    }

    const dropdownIconOnClick = () => {
        ref.current.focus();
        setShowDropdown(true);
    }

    const toShowDropDown = () => {
        setShowDropdown(true);
    }

    const createOnClick = () => {
        if(newInvoiceState.loading)return;
        const emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if(
            !formData.email.match(emailRegEx) || 
            formData.items.reduce((a,b) => a + (b.price * b.quantity), 0) === 0 ||
            formData.items.filter((data) => data.product === '').length !== 0
        ){
            Swal.fire({
                icon: 'error',
                title: 'Create Invoice Failed',
                text: `There is something wrong with the data, please check again`,
                confirmButtonText: 'Yes',
                confirmButtonColor: '#173468',
            });
            return;
        }

        dispatch(createNewInvoice({
            customer_id: formData.id,
            due_at: moment(formData.due_at).format('YYYY-M-D'),
            items: formData.items
        }))
    }

    return(
        <Container fluid className="p-0" style={{height: 'calc(100vh - 64px)', overflow: 'auto'}}>
            <div className="d-flex flex-column justify-content-center align-items-center my-3">
                <div className='d-flex justify-content-end' style={{width: '620px'}}>
                    <div className="create-invoice-button" onClick={createOnClick}>
                        {newInvoiceState.loading ? 
                            <img src={loadingRolling} height='20px' width='20px' alt='notFound' /> : 
                            <>
                                <img src={pencilIcon} alt='Not Found'/>
                                Create Invoice
                            </>
                        }
                    </div>
                </div>
                <Container fluid style={{marginTop: '18px', backgroundColor: 'white', padding: '60px 27px', width: '620px'}}>
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex flex-column">
                            <div className="invoice-detail-underlined-container main-text">Toko Sejahtera</div>
                            <div className="invoice-detail-underlined-container main-text">Jalan Sumatra no 2</div>
                        </div>
                        <div className="invoice-detail-main-title">INVOICE</div>
                    </div>
                    <div className='main-text' style={{paddingTop: '35px'}}>Bill to:</div>
                        <Row>
                            <Col md>
                                <div className="invoice-detail-underlined-container sub-text" style={{position: 'relative'}}>
                                    <input
                                        name='email'
                                        ref={ref}
                                        type={'text'}
                                        style={{border: 'none', outline:'none', width: '100%'}}
                                        placeholder='Client Email'
                                        onMouseDown={toShowDropDown}
                                        onChange={onChange}
                                        value={formData.email}
                                        autoComplete='off'
                                    />
                                    <img src={dropdownIcon} alt='not found' style={{cursor: 'pointer'}} onClick={dropdownIconOnClick}/>
                                    {showDropdown ? <UserDataDropdownCard onClick={dropdownCardOnClick} currentEmail={formData.email}/> : <></>}
                                </div>
                                <div className="invoice-detail-underlined-container sub-text">
                                    <input
                                        className="disabled-input"
                                        type={'text'}
                                        style={{border: 'none', outline:'none', width: '100%'}}
                                        placeholder='Client Name'
                                        value={formData.name}
                                        disabled
                                    />
                                </div>
                                <div className="invoice-detail-underlined-container sub-text">
                                    <input 
                                        className="disabled-input"
                                        type={'text'}
                                        style={{border: 'none', outline:'none', width: '100%'}}
                                        placeholder='Client Address'
                                        value={formData.address}
                                        disabled
                                    />
                                </div>
                            </Col>
                            <Col md className="d-flex flex-column sub-text2" style={{gap: '16px'}}>
                                <div className="d-flex flex-row" style={{gap: '32px'}}>
                                    <div>Invoice</div>
                                    <div>: </div>
                                </div>
                                <div className="d-flex flex-row" style={{gap: '5px'}}>
                                    <div>Invoice Date</div>
                                    <div>:</div>
                                    <div>{currentDate}</div>
                                </div>
                                <div className="d-flex flex-row" style={{gap: '22px'}}>
                                    <div>Due Date</div>
                                    <div className="d-flex flex-row" style={{gap: '5px'}}>:
                                    <DatePicker
                                        selected={startDate}
                                        onChange={(date) => {
                                            if(date < new Date()){
                                                Swal.fire({
                                                    icon: 'error',
                                                    title: 'Oops...',
                                                    text: `Please input date at least after today's date`,
                                                    confirmButtonColor: '#173468',
                                                })
                                                return;
                                            }
                                            setStartDate(date);
                                            setFormData(prev => ({
                                                ...prev,
                                                due_at: date,
                                            }))
                                        }}
                                        customInput={<CostumDatePicker />}
                                    />
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    
                    <div style={{paddingTop: '35px'}}>
                        <Table responsive='sm'>
                            <thead style={{backgroundColor: '#173468'}}>
                                <tr className="table-head-text">
                                    <th>Item Description</th>
                                    <th className="text-center">Qty</th>
                                    <th className="text-center">Price</th>
                                    <th className="text-center">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                
                                    {formData.items.map((data, i) => {
                                        return(
                                            <tr className="table-body-text" key={i}>
                                                <td className="table-data" style={{width: '265px'}}>
                                                    <input type='text' name='product' style={{border: 'none', outline: 'none', width: '100%'}} placeholder={'Input item name'} value={data.product} onChange={(e) => tableOnChange(e, i)} autoComplete='off' />
                                                </td>
                                                <td className="table-data text-center">
                                                    <input className="text-center" name='quantity' type={'number'} style={{border: 'none', outline: 'none', width: '20px'}} placeholder={'qty'} value={data.quantity} onChange={(e) => tableOnChange(e, i)} />
                                                </td>
                                                <td className="table-data text-center" style={{width: '100px'}}>
                                                    <input className="text-center" name='price' type={'number'} style={{border: 'none', outline: 'none', width: '100%'}} placeholder={'price'} value={data.price} onChange={(e) => tableOnChange(e, i)} />
                                                </td>
                                                <td className="table-data text-center">{formatRupiah(data.price * data.quantity)}</td>
                                                {i === 0 ? <td className="table-trash-icon" style={{paddingRight: '27px'}}></td> : 
                                                <td className="table-trash-icon" onClick={() => deleteOnClick(i)}>
                                                    <img src={trashIcon} alt='Not Found' style={{cursor: 'pointer'}}/>
                                                </td>
                                                }
                                            </tr>
                                        )
                                    })}
                            </tbody>
                        </Table>
                    </div>
                    <div className="d-flex flex-row justify-content-between" style={{marginRight: '35px'}}>
                        <div className="add-line-container d-flex flex-row align-items-center" style={{gap: '10px'}} onClick={addLineOnClick}>
                            <IoMdAddCircle size={18} color="#329059"/>
                            <div>Add Line Item</div>
                        </div>
                        <div className="invoice-detail-total-container">
                            <div>Total</div>
                            <div>{formatRupiah(formData.items.reduce((a,b) => a + (b.price * b.quantity), 0))}</div>
                        </div>
                    </div>
                    <div className="d-flex flex-column" style={{paddingTop: '35px', gap:'10px'}}>
                        <div className="sub-text2">
                            Notes
                        </div>
                        <div className="sub-text">
                            It was pleasure doing business with you
                        </div>
                    </div>
                    <div className="d-flex flex-column" style={{paddingTop: '35px', gap:'10px'}}>
                        <div className="sub-text2">
                            Terms and Conditions
                        </div>
                        <div className="sub-text">
                            Please make the payment by the due date
                        </div>
                    </div>
                </Container>
            </div>
        </Container>
    )
}

export default NewInvoicesBody;