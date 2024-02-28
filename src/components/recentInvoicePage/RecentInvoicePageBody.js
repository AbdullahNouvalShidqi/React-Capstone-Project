import React from 'react'
import { Col, Container, Row } from "react-bootstrap";
import InvoiceCard from "../invoicePage/InvoiceCard";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getFilteredData, getFilterStatus, getInvoicesData } from "../../redux/reducers/invoicesSlice";
import { getDetailData } from "../../redux/reducers/invoiceDetailSlice";
import RecentNoInvoices from "../recentInvoicePage/RecentNoInvoices";

const RecentInvoicePageBody = () => {
    const data = useSelector(getInvoicesData);
    const [ invoicesData, setInvoicesData ] = useState(data);
    const detailData = useSelector(getDetailData);
    const filteredData = useSelector(getFilteredData);
    const filterStatus = useSelector(getFilterStatus); 
    


    useEffect(() => {
        if(filteredData === undefined){
            setInvoicesData(() => [...data]);
        } else {
            setInvoicesData(() => [...filteredData]);
        }
    }, [filteredData, filterStatus, setInvoicesData, data]);

  return (
    <>
        <Row className='page m-0'>
                <Col md={6} className='p-0'>
                        {invoicesData.length === 0 ? <RecentNoInvoices/> : 
                        <Container fluid className="invoice-cards-container2 p-0" style={{width:'calc(68vh)', height: 'calc(115vh - 210px)', overflow:'auto'}}>
                            {invoicesData.map((data, i) => <InvoiceCard key={i} invoiceData={data} selected={data.id === detailData?.id}/>)}
                        </Container>
                        }
                </Col>
            </Row>
    
    </>
  )
}

export default RecentInvoicePageBody