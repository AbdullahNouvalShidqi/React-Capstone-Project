import smallDropDownIcon from '../../assets/svg/smallDropDownIcon.svg';
import { forwardRef } from "react";
import Moment from 'moment';

const CostumDatePicker = forwardRef(({value, onClick}, ref) => (
    <div className="d-flex flex-row justify-content-start gap-2 align-items-center" onClick={onClick} ref={ref} style={{cursor: 'pointer'}}>
        <div style={{textDecoration: 'underline'}}>{Moment(value).format('DD MMMM YYYY')}</div>
        <img src={smallDropDownIcon} alt='Not Found'/>
    </div>
));

export default CostumDatePicker;