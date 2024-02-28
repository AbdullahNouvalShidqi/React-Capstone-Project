import { useDispatch, useSelector } from "react-redux";
import { clearVerificationState, getVerificationState, resendVerification } from "../../redux/reducers/verificationSlice";
import verifiedIcon from '../../assets/svg/verifiedIcon.svg';
import verifiedErrorIcon from '../../assets/svg/verifiedErrorIcon.svg';
import { useEffect } from "react";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router";

const VerifyResult = () => {
    const verifyState = useSelector(getVerificationState);
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const email = new URLSearchParams(location.search).get('email');

    useEffect(() => {
        const params = new URLSearchParams(location.search);

        if(verifyState.resendLoading)return;
        if(verifyState.resendError){
            Swal.fire({
                icon: 'error',
                title: 'Resend Failed',
                text: `${verifyState.resendErrMsg}`,
                confirmButtonText: 'Resend verification',
                confirmButtonColor: '#173468',
                showCancelButton: true,
                cancelButtonText: `Don't resend`,
                cancelButtonColor: '#173468'
            }).then((result) => {
                if(result.isConfirmed){
                    dispatch(resendVerification({
                        email: params.get('email')
                    }));
                }
            })
        }
        if(verifyState.resendSucceed){
            Swal.fire({
                icon: 'success',
                title: 'Resend Succeed',
                text: `Resend has succeded, check your email and verified before it expired`,
                confirmButtonText: 'Yes',
                confirmButtonColor: '#173468',
            }).then(() => {
                dispatch(clearVerificationState());
                navigate('/login');
            })
        }
    }, [verifyState, location, dispatch, navigate]);

    const resendVerificationOnClick = () => {
        dispatch(resendVerification({
            email: email
        }));
    }

    const continueToLoginOnClick = () => {
        dispatch(clearVerificationState());
        navigate('/login');
    }

    if (verifyState.succeed){
        return(
            <>
                <img src={verifiedIcon} alt='NotFound'/>
                <div className="verified-title-text">Yeay, your account has been succesfully created</div>
                <div className="verified-button" onClick={continueToLoginOnClick}>Continue to Login</div>
            </>
        )
    } else if(verifyState.error && verifyState.errCode === 400){
        return(
            <>
                <img src={verifiedErrorIcon} alt='NotFound'/>
                <div className="verified-title-text">Sorry, something went wrong</div>
                <div className="verified-button" onClick={continueToLoginOnClick}>Go to login page</div>
            </>
        )
    } else if(verifyState.error){
        return(
            <>
                <img src={verifiedErrorIcon} alt='NotFound'/>
                <div className="verified-title-text">Sorry, the verification link has timed out</div>
                <div className="verified-button" onClick={resendVerificationOnClick}>Resend Verification Link</div>
            </>
        )
    } else{
        return(<></>)
    }
}

export default VerifyResult;