import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { getPaymentsDetailData } from "../../redux/reducers/paymentDetailSlice";
import { getPaymentsData, getPaymentsFilteredData, getPaymentsFilterStatus } from "../../redux/reducers/paymentSlice";
import RecentNoPayment from "../recentPaymentPage/RecentNoPayment";
import PaymentCard from "../paymentsPage/PaymentCard";

const RecentPaymentPageBody = () => {
    const filterStatus = useSelector(getPaymentsFilterStatus);
    const filteredData = useSelector(getPaymentsFilteredData);
    const paymentDetailData = useSelector(getPaymentsDetailData);
    const paymentsData = useSelector(getPaymentsData);
    const [ currentPaymentsData, setcurrentPaymentsData ] = useState(paymentsData);

    useEffect(() => {
        if(filteredData === undefined){
            setcurrentPaymentsData(() => [...paymentsData]);
        } else {
            setcurrentPaymentsData(() => [...filteredData]);
        }
    }, [filteredData, filterStatus, setcurrentPaymentsData, paymentsData]);

    return(
        <>
            <Row className='m-0'>
                <Col md={6} className='p-0'>
                        {currentPaymentsData.length === 0 ? <RecentNoPayment/> :
                        <Container fluid className="invoice-cards-container2 p-0" style={{width:'calc(68vh)', height: 'calc(115vh - 210px)', overflow:'auto'}}>
                            {currentPaymentsData.map((data, i) => <PaymentCard key={i} data={data} selected={data.id === paymentDetailData?.id}/>)}
                        </Container>
                        }
                </Col>
            
            </Row>
           
        </>
    );
}

export default RecentPaymentPageBody;