// import Swiper core and required modules
// import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import { Form } from "react-bootstrap";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';

import plusIcon from '../../assets/svg/plusIcon.svg';
import AddBankModal from './AddBankModal';
import svgValidation from '../../utils/svgValidation';
import { useDispatch, useSelector } from 'react-redux';
import { clearState, getRegisterState, register } from '../../redux/reducers/registerSlice';
import Swal from 'sweetalert2';
import loadingRolling from '../../assets/svg/loadingRolling.svg';

const REGISTER_FORM_BASE_DATA = {
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    merchant_name: '',
    merchant_address: '',
    merchant_banks: [
        {
            bank_id: -1,
            on_behalf_of: '',
            bank_number: ''
        }
    ]
}

const REGISTER_BASE_ERR_MSG = {
    emailMsg: '',
    usernameMsg: '',
    passwordMsg: '',
    confirmPasswordMsg: '',
    merchant_nameMsg: '',
    merchant_addressMsg: '',
    bankAccountMsg: '',
}

const RegisterForm = () => {
    const [ registerFormData, setRegisterFormData ] = useState(REGISTER_FORM_BASE_DATA);
    const [ swiperState, setSwiperState ] = useState();
    const [ currentIndex, setCurrentIndex ] = useState(0);
    const [ showPassword, setShowPassword ] = useState(false);
    const [ showConfirmPassword, setShowConfirmPassowrd ] = useState(false);
    const [ errMsgs, setErrMsgs ] = useState(REGISTER_BASE_ERR_MSG);
    const [ showAddBankModal, setShowAddBankModal ] = useState(false);
    const registerState = useSelector(getRegisterState);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if(registerState.loading)return;
        if(registerState.succeed){
            Swal.fire({
                icon: 'success',
                title: 'Register Succeed',
                text: `We've sent you an email to you for email verification, please verified before login`,
                confirmButtonText: 'Yes',
                confirmButtonColor: '#173468',
            }).then(() => {
                dispatch(clearState())
                navigate('/login');
            })
        } 
        if(registerState.error) {
            Swal.fire({
                icon: 'error',
                title: 'Register Failed',
                text: `${registerState.errMsg}`,
                confirmButtonText: 'Yes',
                confirmButtonColor: '#173468',
            }).then(() => {
                dispatch(clearState());
            })
        }
    }, [registerState, navigate, dispatch]);

    const addBankButtonOnClick = () => {
        setShowAddBankModal(true);
    }

    const addBankFormSubmit = (formData) => {
        const currentValue = [...registerFormData.merchant_banks];
        currentValue[0] = formData;

        setRegisterFormData(prev => ({
            ...prev,
            merchant_banks: [...currentValue]
        }))
    }

    const nextOnClick = () => {
        let emailErr = false;
        let usernameErr = false;
        let passwordErr = false;
        let confirmPasswordErr = false;
        const passwordLength = registerFormData.password.length;
        const emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if(registerFormData.email === ''){
            setErrMsgs(prev => ({
                ...prev,
                emailMsg: 'Please input your email'
            }))
            emailErr = true;
        } else if(!registerFormData.email.match(emailRegEx)) {  
            setErrMsgs(prev => ({
                ...prev,
                emailMsg: 'Please input a proper email'
            }))
            emailErr = true;
        } else {
            setErrMsgs(prev => ({
                ...prev,
                emailMsg: ''
            }))
            emailErr = false;
        }

        if(registerFormData.username === ''){
            setErrMsgs(prev => ({
                ...prev,
                usernameMsg: 'Please input your email'
            }))
            usernameErr = true;
        } else {
            setErrMsgs(prev => ({
                ...prev,
                usernameMsg: ''
            }))
            usernameErr = false;
        }

        if(registerFormData.password === ''){
            setErrMsgs(prev => ({
                ...prev,
                passwordMsg: 'Please input your password'
            }))
            passwordErr = true;
        } 
        else if(passwordLength < 8 || passwordLength > 16) {
            setErrMsgs(prev => ({
                ...prev,
                passwordMsg: 'Password must be 8 - 16 characters'
            }))
            passwordErr = true;
        } else {
            setErrMsgs(prev => ({
                ...prev,
                passwordMsg: ''
            }))
            passwordErr = false;
        }

        if(registerFormData.confirmPassword === ''){
            setErrMsgs(prev => ({
                ...prev,
                confirmPasswordMsg: 'Please input your confirm password'
            }))
            confirmPasswordErr = true;
        } else if(registerFormData.confirmPassword !== registerFormData.password){
            setErrMsgs(prev => ({
                ...prev,
                confirmPasswordMsg: 'Password doesn’t match'
            }))
            confirmPasswordErr = true;
        } else {
            setErrMsgs(prev => ({
                ...prev,
                confirmPasswordMsg: ''
            }))
            confirmPasswordErr = false;
        }

        if(emailErr || usernameErr || passwordErr || confirmPasswordErr){
            return;
        }

        swiperState.slideNext();
    }

    const onRegister = () => {
        let merchantNameError = false;
        let merchantAddressError = false;
        let merchantBankError = false;

        if(registerFormData.merchant_name === ''){
            setErrMsgs(prev => ({
                ...prev,
                merchant_nameMsg: 'Plese input your merchant name'
            }))
            merchantNameError = true;
        } else {
            setErrMsgs(prev => ({
                ...prev,
                merchant_nameMsg: ''
            }))
            merchantNameError = false;
        }

        if(registerFormData.merchant_address === ''){
            setErrMsgs(prev => ({
                ...prev,
                merchant_addressMsg: 'Please input your merchant address'
            }));
            merchantAddressError = true;
        } else {
            setErrMsgs(prev => ({
                ...prev,
                merchant_addressMsg: ''
            }));
            merchantAddressError = false;
        }

        if(registerFormData.merchant_banks[0].bank_id === -1){
            setErrMsgs(prev => ({
                ...prev,
                bankAccountMsg: 'Please add a bank account for transfer'
            }));
            merchantBankError = true
        } else {
            setErrMsgs(prev => ({
                ...prev,
                bankAccountMsg: ''
            }));
            merchantBankError = false;
        }

        if(merchantNameError || merchantAddressError || merchantBankError){
            return;
        }

        dispatch(register({
            username: registerFormData.username,
            email: registerFormData.email,
            password: registerFormData.password,
            merchant_name: registerFormData.merchant_name,
            merchant_address: registerFormData.merchant_address,
            merchant_phone_number: '',
            merchant_banks: registerFormData.merchant_banks
        }));
    }

    const toLoginOnClick = () => {
        navigate('/login');
    }
    
    const onChange = e => {
        const name = e.target.name;
        const value = e.target.value;

        setRegisterFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const passwordIconOnClick = () => {
        setShowPassword(prev => !prev);
    }

    const confirmPasswordIconOnClick = () => {
        setShowConfirmPassowrd(prev => !prev);
    }

    return(
        <>
            <Form>
                <Swiper
                    style={{flexShrink: '100 !important', width: '45vw', margin:'0'}}
                    onInit={(ev) => {
                        setSwiperState(ev);
                    }}
                    onSlideChange={(index) => {
                        setCurrentIndex(index.snapIndex);
                    }}
                    allowTouchMove={false}
                    spaceBetween={0}
                    slidesPerView={1}
                >
                    <SwiperSlide className='d-flex flex-column justify-content-center align-items-center'>
                        <h1>Register</h1>
                        <p>Welcome to MyINVOICE</p>
                        
                            <Form.Group className="mt-3 register-form">
                                <Form.Label>Email</Form.Label>
                                <Form.Control 
                                    name="email"
                                    type="email"
                                    placeholder="example@gmail.com"
                                    value={registerFormData.email}
                                    onChange={onChange}
                                    style={{borderColor: `${errMsgs.emailMsg === '' ? '' : '#D62D33'}`}}
                                />
                                {errMsgs.emailMsg === '' ? <></> : <div className='error-message'>{errMsgs.emailMsg}</div>}
                            </Form.Group>
                            <Form.Group className="mt-3 register-form">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    name='username'
                                    type="text"
                                    placeholder="e.g Alvin Wiraprathama"
                                    value={registerFormData.username}
                                    onChange={onChange}
                                    style={{borderColor: `${errMsgs.usernameMsg === '' ? '' : '#D62D33'}`}}
                                />
                                {errMsgs.usernameMsg === '' ? <></> : <div className='error-message'>{errMsgs.usernameMsg}</div>}
                            </Form.Group>
                            <Form.Group className="mt-3 register-form position-relative">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    name='password'
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="********"
                                    value={registerFormData.password}
                                    onChange={onChange}
                                    style={{borderColor: `${errMsgs.passwordMsg === '' ? '' : '#D62D33'}`}}
                                />
                                {showPassword ?
                                    <BsEyeFill size={25} className="password-icon" onClick={passwordIconOnClick}/> : 
                                    <BsEyeSlashFill size={25} className="password-icon" onClick={passwordIconOnClick}/>
                                }
                                {errMsgs.passwordMsg === '' ? <></> : <div className='error-message'>{errMsgs.passwordMsg}</div>}
                            </Form.Group>
                            <Form.Group className="mt-3 mb-5 register-form position-relative">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    name='confirmPassword'
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    placeholder="********"
                                    value={registerFormData.confirmPassword}
                                    onChange={onChange}
                                    style={{borderColor: `${errMsgs.confirmPasswordMsg === '' ? '' : '#D62D33'}`}}
                                />
                                {showConfirmPassword ?
                                    <BsEyeFill size={25} className="password-icon" onClick={confirmPasswordIconOnClick}/> : 
                                    <BsEyeSlashFill size={25} className="password-icon" onClick={confirmPasswordIconOnClick}/>
                                }
                                {errMsgs.confirmPasswordMsg === '' ? <></> : <div className='error-message'>{errMsgs.confirmPasswordMsg}</div>}
                            </Form.Group>
                    </SwiperSlide>
                    <SwiperSlide className='d-flex flex-column justify-content-center align-items-center'>
                        <h1>Merchant Details</h1>
                        <p>Fill out the details, and we’re ready to go!</p>
                            <Form.Group className="mt-3 register-form" style={{width: '400px'}}>
                                <Form.Label>Merchant Name</Form.Label>
                                <Form.Control name="merchant_name" type="text" placeholder="e.g Toko Sejahtera" value={registerFormData.merchant_name} onChange={onChange} />
                                {errMsgs.merchant_nameMsg === '' ? <></> : <div className='error-message'>{errMsgs.merchant_nameMsg}</div>}
                            </Form.Group>
                            <Form.Group className="mt-3 register-form">
                                <Form.Label>Merchant Address</Form.Label>
                                <Form.Control name='merchant_address' type="text" placeholder="e.g Jalan Sumatra no 2" value={registerFormData.merchant_address} onChange={onChange} />
                                {errMsgs.merchant_addressMsg === '' ? <></> : <div className='error-message'>{errMsgs.merchant_addressMsg}</div>}
                            </Form.Group>
                            <Form.Group className="mt-3 register-form">
                                <Form.Label>Bank Account</Form.Label>
                                <div className='register-add-bank-container' onClick={addBankButtonOnClick}>
                                {registerFormData.merchant_banks[0].bank_id === -1 ? 
                                    <>
                                        <img src={plusIcon} alt='not found' />
                                        <div>Add bank for your account</div>
                                    </>
                                    :
                                    <>
                                        <img src={svgValidation(registerFormData.merchant_banks[0].bank_id)} alt='not found'/>
                                        <div>{registerFormData.merchant_banks[0].bank_number}</div>
                                    </>
                                }
                                </div>
                                {errMsgs.bankAccountMsg === '' ? <></> : <div className='error-message'>{errMsgs.bankAccountMsg}</div>}
                            </Form.Group>
                    </SwiperSlide>
                </Swiper>
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <div 
                        className="button-primary d-flex justify-content-center" 
                        style={{width: '400px'}}
                        onClick={registerState.loading ? ()=>{} : currentIndex === 1 ? onRegister : nextOnClick }>
                            {
                                registerState.loading ? <img src={loadingRolling} height='20px' width='20px' alt='notFound' /> : 
                                currentIndex === 1 ? 'SignUp' :'Next'
                            }
                    </div>
                    <div className="mt-4 not-registered">Already have an account? <span onClick={toLoginOnClick}>Login</span></div>         
                </div>
            </Form>
            {showAddBankModal ? 
                <AddBankModal
                    outisdeModalOnClick={()=>{setShowAddBankModal(false)}}
                    addBankFormSubmit={addBankFormSubmit}
                    currentBankData={registerFormData.merchant_banks[0]}
                /> : <></>
            }
        </>
    )
}

export default RegisterForm;