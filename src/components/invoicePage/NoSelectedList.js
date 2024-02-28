import { Col } from "react-bootstrap";
import personPointing from '../../assets/svg/personPointing.svg';

const NoSelectedList = () => {
    return(
        <Col md className="d-flex flex-column justify-content-center align-items-center">
            <img src={personPointing} alt='not found'/>
            <div className="no-selected-list-text">You can select one invoice from list to view</div>
        </Col>
    );
}

export default NoSelectedList;