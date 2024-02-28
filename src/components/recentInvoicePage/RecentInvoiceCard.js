import React from 'react'
import { Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import arrowIcon from '../../assets/svg/arrowIcon.svg'
import documentIcon from '../../assets/svg/documentIcon.svg'
import { setDetailData } from "../../redux/reducers/invoiceDetailSlice";
import formatRupiah from "../../utils/formatRupiah";
import getClassNameByStatus from "../../utils/getClassNameByStatus";
import getDateDifferences from "../../utils/getDateDifferences";

const RecentInvoiceCard = (props) => {
    const { invoiceData, selected } = props;
    const dispatch = useDispatch();
    const statusClassName = getClassNameByStatus(invoiceData.payment_status, invoiceData.due_at);
    const statusValue = getDateDifferences(invoiceData.payment_status,invoiceData.due_at);
    
    const onClick = () => {
        dispatch(setDetailData(invoiceData));
    }


  return (
    <div>
        <Row fluid className={`invoice-card align-items-center m-0 ${selected ? 'selected' : ""}`} style={{padding: '10px 0px 10px 40px', borderBottom: '1px solid #CDCDCD'}} onClick={onClick}>
            <Col md={1} className='p-0'>
                <img src={documentIcon} alt={'Not Found'}/>
            </Col>
            <Col md={5} className='p-0'>
                <div className="invoice-card-title">{invoiceData.customer.name}</div>
                <div className="invoice-card-subtitle">{invoiceData.id} | {invoiceData.created_at}</div>
            </Col>
            <Col md={5} className='p-0'>
                <div className="invoice-card-price">{formatRupiah(invoiceData.total_price)}</div>
                <div className={`invoice-card-status ${statusClassName}`}>{statusValue}</div>
            </Col>
            <Col md={1} className='p-0'>
                <img src={arrowIcon} alt='not found'/>
            </Col>
        </Row>
    </div>
  )
}

export default RecentInvoiceCard