import { useEffect, useState } from "react";
import { Container, Form } from "react-bootstrap";

const FORM_BASE_DATA = {
    bank_id: -1,
    on_behalf_of: '',
    bank_number: ''
}

const BASE_ERR_MSG = {
    bank_id_msg: '',
    on_behalf_of_msg: '',
    bank_number_msg: ''
}

const AddBankModal = (props) => {
    const { outisdeModalOnClick, addBankFormSubmit, currentBankData } = props;
    const [ formData, setFormData ] = useState(FORM_BASE_DATA);
    const [ errMsg, setErrMsg ] = useState(BASE_ERR_MSG);
    const [ todo, setTodo ] = useState('Add');

    const onChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        if(name === 'bank_id'){
            setFormData(prev => ({
                ...prev,
                [name]: parseInt(value)
            }))
            return
        }
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    useEffect(() => {
        if(currentBankData.bank_id !== -1){
            setFormData(currentBankData);
            setTodo('Update');
        }
    }, [currentBankData])

    const onSubmit = () => {
        let errorBank = false;
        let errorNumber = false;
        let errorName = false;

        if(parseInt(formData.bank_id) === -1){
            setErrMsg(prev => ({
                ...prev,
                bank_id_msg: 'Please select one bank to use'
            }))
            errorBank = true;
        } else {
            setErrMsg(prev => ({
                ...prev,
                bank_id_msg: ''
            }))
            errorBank = false;
        }
        
        if(formData.bank_number === ''){
            setErrMsg(prev => ({
                ...prev,
                bank_number_msg: 'Please input your bank number'
            }))
            errorNumber = true;
        } else if(isNaN(formData.bank_number)) {
            setErrMsg(prev => ({
                ...prev,
                bank_number_msg: 'The bank number should writtern with number only'
            }))
            errorNumber = true;
        } else if(formData.bank_number.length < 10 || formData.bank_number.length > 15){
            setErrMsg(prev => ({
                ...prev,
                bank_number_msg: 'The bank number length should be between 10 to 15 characters'
            }))
            errorNumber = true;
        } else {
            setErrMsg(prev => ({
                ...prev,
                bank_number_msg: ''
            }))
            errorNumber = false;
        }

        if(formData.on_behalf_of === ''){
            setErrMsg(prev => ({
                ...prev,
                on_behalf_of_msg: 'Please input your name'
            }))
            errorName = true;
        } else {
            setErrMsg(prev => ({
                ...prev,
                on_behalf_of_msg: ''
            }))
            errorName = false;
        }

        if(errorBank || errorNumber || errorName)return;

        addBankFormSubmit(formData);
        outisdeModalOnClick();
    }

    return(
        <>
            <div className="modal-test" onClick={() => {outisdeModalOnClick()}}/>
            <Container className="add-bank-modal-container">
                <div className='d-flex flex-column justify-content-start align-items-start w-100 h-100'>
                    <div className="d-flex flex-row justify-content-center align-items-center w-100">
                        <div className="add-bank-modal-title">Add New Bank Account</div>
                    </div>
                    <div className="invoice-modal-border"/>
                    <Form className="w-100">
                        <Form.Group className="mb-3">
                            <Form.Label className='mb-1'>Bank Name</Form.Label>
                            <Form.Select name='bank_id' value={formData.bank_id} onChange={onChange}>
                                <option value={-1}>Choose your bank</option>
                                <option value={1}>Bank BCA</option>
                                <option value={3}>Bank BNI</option>
                                <option value={2}>Bank Mandiri</option>
                            </Form.Select>
                            {errMsg.bank_id_msg !== '' ? 
                                <div className='error-message'>{errMsg.bank_id_msg}</div>
                            : <></>
                            }
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className='mb-1'>Card Number</Form.Label>
                            <Form.Control
                                type='text'
                                name='bank_number'
                                placeholder="1234-5678-4321"
                                value={formData.bank_number}
                                onChange={onChange}
                                autoComplete='off'
                            />
                            {errMsg.bank_number_msg !== '' ? 
                                <div className='error-message'>{errMsg.bank_number_msg}</div>
                            : <></>
                            }
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className='mb-1'>Card Holder Name</Form.Label>
                            <Form.Control
                                type='text'
                                name='on_behalf_of'
                                placeholder="e.g Alvin W"
                                value={formData.on_behalf_of}
                                onChange={onChange}
                                autoComplete='off'
                            />
                            {errMsg.on_behalf_of_msg !== '' ? 
                                <div className='error-message'>{errMsg.on_behalf_of_msg}</div>
                            : <></>
                            }
                        </Form.Group>
                        <div className="modal-filter-submit-button" onClick={onSubmit}>
                            {todo} Card
                        </div>
                    </Form>
                </div>
            </Container>
        </>
    )
}

export default AddBankModal;