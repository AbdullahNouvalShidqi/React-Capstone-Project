import { Col, Container, Row } from "react-bootstrap";
import LoginCarousel from "../loginPage/LoginCarousel";
import { useLocation, useNavigate } from "react-router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { verifyAccount } from "../../redux/reducers/verificationSlice";
import VerifyResult from "./VerifyResult";

const VerifyPageBody = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        if(params.get('email') === null || params.get('code') === null){
            navigate('/login');
            return;
        }
        dispatch(verifyAccount({
            email: params.get('email'),
            code: params.get('code')
        }))
    }, [navigate, location, dispatch])

    return(
        <Container fluid>
            <Row style={{height: '100vh'}}>
                <Col lg className='d-flex flex-column justify-content-between align-items-center'>
                    <Container style={{height: '50px'}}/>
                    <div className="d-flex flex-column justify-content-center align-items-center">
                        <VerifyResult/>
                    </div>
                    <div className="mb-4 mt-5 login-copyright">© Copyright 2022 Kelompok 15 Capstone Project - Alterra Academy</div>
                </Col>
                <Col lg className='d-flex flex-column justify-content-center align-items-center' style={{backgroundColor: '#173468'}}>
                    <LoginCarousel/>
                </Col>
            </Row>
        </Container>
    )
}

export default VerifyPageBody;