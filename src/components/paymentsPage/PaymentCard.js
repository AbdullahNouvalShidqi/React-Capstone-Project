import { Col, Row } from "react-bootstrap";
import dollarIcon from '../../assets/svg/dollarIcon.svg';
import arrowIcon from '../../assets/svg/arrowIcon.svg';
import formatRupiah from "../../utils/formatRupiah";
import paymentGetClassnameByStatus from "../../utils/paymentGetClassnameByStatus";
import { useDispatch } from "react-redux";
import { getInvoicePaymentDetailById, setPaymentDetailData } from "../../redux/reducers/paymentDetailSlice";
import moment from "moment";

const PaymentCard = (props) => {
    const { data, selected } = props;
    const dispatch = useDispatch();
    const paymentClassname = paymentGetClassnameByStatus(data.payment_status_name);

    const onClick = () => {
        dispatch(getInvoicePaymentDetailById(data.invoice_id));
    }

    return(
        <Row fluid className={`invoice-card align-items-center m-0 ${selected ? 'selected' : ""}`} style={{padding: '10px 0px 10px 40px', borderBottom: '1px solid #CDCDCD'}} onClick={onClick}>
            <Col md={1} className='p-0'>
                <img src={dollarIcon} alt={'Not Found'}/>
            </Col>
            <Col md={5} className='p-0'>
                <div className="invoice-card-title">{data.customer_name}</div>
                <div className="invoice-card-subtitle">{`INV-${data.invoice_id}`}</div>
                <div className="invoice-card-subtitle">{moment(data.created_at).format('DD MMM YYYY') }</div>
            </Col>
            <Col md={5} className='p-0'>
                <div className="invoice-card-price">{formatRupiah(data.total_price)}</div>
                <div className="invoice-card-payment-status">{data.payment_type_name}</div>
                <div className={`invoice-card-status ${paymentClassname}`}>{data.payment_status_name}</div>
            </Col>
            <Col md={1} className='p-0'>
                <img src={arrowIcon} alt='not found'/>
            </Col>
        </Row>
    );
}

export default PaymentCard;