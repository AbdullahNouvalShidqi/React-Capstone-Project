import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import { useDispatch, useSelector } from "react-redux";
import { clearLoginState, getLoginStatus, loginApi } from "../../redux/reducers/loginSlice";
import Swal from "sweetalert2";

const LOGIN_BASE_DATA = {
    username: '',
    password: ''
}

const ERROR_MESSAGE_BASE_DATA = {
    usernameMsg: '',
    passwordMsg: ''
}

const LoginForm = () => {
    const [ loginFormData, setLoginFormData ] = useState(LOGIN_BASE_DATA);
    const [ showPassword, setShowPassword ] = useState(false);
    const [ errorMessages, setErrorMessages ] = useState(ERROR_MESSAGE_BASE_DATA);
    const loginStatus = useSelector(getLoginStatus);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
    })

    useEffect(() => {
        if(loginStatus.succeed){
            Toast.fire({
                icon: 'success',
                title: 'Login Success'
            });
            dispatch(clearLoginState());
            navigate('/home/dashboard');
        }
        if(loginStatus.error){
            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: `Please check your email and password`,
                confirmButtonText: 'Yes',
                confirmButtonColor: '#173468',
            }).then(() => {
                dispatch(clearLoginState());
            })
        }
    }, [loginStatus, navigate, dispatch, Toast]);

    const onChange = e => {
        const name = e.target.name;
        const value = e.target.value;

        setLoginFormData(prev => ({
            ...prev,
            [name] : value
        }));
    }

    const toRegisterOnClick = () => {
        navigate('/register')
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let usernameErrorStatus = false;
        let passwordErrorStatus = false;
        const passwordLength = loginFormData.password.length;

        if(loginFormData.username === ''){
            setErrorMessages(prev => ({
                ...prev,
                usernameMsg: 'Please input your email'
            }));
            usernameErrorStatus = true;
        } else {
            setErrorMessages(prev => ({
                ...prev,
                usernameMsg: ''
            }));
            usernameErrorStatus = false;
        }

        if(loginFormData.password === ''){
            setErrorMessages(prev => ({
                ...prev,
                passwordMsg: 'Please input your password'
            }));
            passwordErrorStatus = true;
        } else if( passwordLength < 8 || passwordLength > 16 ) {
            setErrorMessages(prev => ({
                ...prev,
                passwordMsg: 'The length of password should be 8-16 characters'
            }))
            passwordErrorStatus = true
        } else {
            setErrorMessages(prev => ({
                ...prev,
                passwordMsg: ''
            }));
            passwordErrorStatus = false;
        }

        login(usernameErrorStatus, passwordErrorStatus);

    }

    const login = (usernameErrorStatus, passwordErrorStatus) => {
        if(usernameErrorStatus || passwordErrorStatus){
            return;
        }
        dispatch(loginApi({
            email: loginFormData.username,
            password: loginFormData.password
        }))
    }

    const passwordIconOnClick = () => {
        setShowPassword(prev => !prev);
    }

    return(
        <>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mt-3" style={{width: '400px'}}>
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                        name="username"
                        type="text"
                        placeholder="Enter email"
                        value={loginFormData.username}
                        onChange={onChange}
                        style={{borderColor: `${errorMessages.usernameMsg === '' ? '' : '#D62D33'}`}}
                    />
                    {errorMessages.usernameMsg === '' ? <></> : <div className='error-message'>{errorMessages.usernameMsg}</div>}
                </Form.Group>
                <Form.Group className="mt-3 position-relative">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        name='password'
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter password"
                        value={loginFormData.password}
                        onChange={onChange}
                        style={{borderColor: `${errorMessages.passwordMsg === '' ? '' : '#D62D33'}`}}
                    />
                    {showPassword ?
                        <BsEyeFill size={25} className="password-icon" onClick={passwordIconOnClick}/> : 
                        <BsEyeSlashFill size={25} className="password-icon" onClick={passwordIconOnClick}/>
                    }
                    {errorMessages.passwordMsg === '' ? <></> : <div className='error-message'>{errorMessages.passwordMsg}</div>}
                </Form.Group>
                <div className='d-flex justify-content-end mt-2'>
                    <div className="forgot-password-text">
                        Forget password?
                    </div>
                </div>
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <input type={'submit'} className="button-primary d-flex justify-content-center mt-5" style={{width: '400px'}} value={'Login'}/>
                    <div className="mt-4 not-registered">Not registered yet? <span onClick={toRegisterOnClick}>Create an account</span></div>
                </div>
            </Form>
        </>
    );
}

export default LoginForm;