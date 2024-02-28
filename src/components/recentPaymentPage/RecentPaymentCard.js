import { Col, Row } from "react-bootstrap";
import dollarIcon from '../../assets/svg/dollarIcon.svg';
import arrowIcon from '../../assets/svg/arrowIcon.svg';
import formatRupiah from "../../utils/formatRupiah";
import paymentGetClassnameByStatus from "../../utils/paymentGetClassnameByStatus";
import { useDispatch } from "react-redux";
import { setPaymentDetailData } from "../../redux/reducers/paymentDetailSlice";

const RecentPaymentCard = (props) => {
    const { data, selected } = props;
    const dispatch = useDispatch();
    const paymentClassname = paymentGetClassnameByStatus(data.payment_status);

    const onClick = () => {
        dispatch(setPaymentDetailData(data));
    }

    return(
        <Row fluid className={`invoice-card align-items-center m-0 ${selected ? 'selected' : ""}`} style={{padding: '10px 0px 10px 40px', borderBottom: '1px solid #CDCDCD'}} onClick={onClick}>
            <Col md={1} className='p-0'>
                <img src={dollarIcon} alt={'Not Found'}/>
            </Col>
            <Col md={5} className='p-0'>
                <div className="invoice-card-title">{data.customer.name}</div>
                <div className="invoice-card-subtitle">{data.id}</div>
                <div className="invoice-card-subtitle">{data.created_at}</div>
            </Col>
            <Col md={5} className='p-0'>
                <div className="invoice-card-price">{formatRupiah(data.total_price)}</div>
                <div className="invoice-card-payment-status">{data.payment_method.payment_type}</div>
                <div className={`invoice-card-status ${paymentClassname}`}>{data.payment_status}</div>
            </Col>
            <Col md={1} className='p-0'>
                <img src={arrowIcon} alt='not found'/>
            </Col>
        </Row>
    );
}

export default RecentPaymentCard;