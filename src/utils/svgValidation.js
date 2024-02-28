import bcaSvg from '../assets/svg/bank0.svg';
import bniSvg from '../assets/svg/bank1.svg';
import mandiriSvg from '../assets/svg/bank2.svg';

const svgValidation = (id) => {
    if(id === 1){
        return bcaSvg;
    } else if(id === 3){
        return bniSvg;
    } else {
        return mandiriSvg;
    }
}

export default svgValidation;