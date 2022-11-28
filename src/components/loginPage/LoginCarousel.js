// import Swiper core and required modules
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import CarouselImg from '../../assets/image/carousel-img.png';

const LoginCarousel = () => {
    SwiperCore.use([Autoplay])

    return(
        <Swiper
            style={{flexShrink: '100 !important', width: '45vw', height: '100vh', margin:'0'}}
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={0}
            slidesPerView={1}
            speed={1000}
            autoplay={{
                delay: 5000,
                disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
        >
            <SwiperSlide className='d-flex h-100 flex-column justify-content-center align-items-center'>
                <img src={CarouselImg} alt='Not found' width={'400px'}></img>
                <div className='login-carousel-title'>Manage your invoice payment easily</div>
                <p className='login-carousel-subtitle'>MyINVOICE make your invoice management easier</p>
            </SwiperSlide>
            <SwiperSlide className='d-flex h-100 flex-column justify-content-center align-items-center'>
                <img src={CarouselImg} alt='Not found' width={'400px'}></img>
                <div className='login-carousel-title'>Manage your invoice payment easily</div>
                <p className='login-carousel-subtitle'>MyINVOICE make your invoice management easier</p>
            </SwiperSlide>
        </Swiper>
    );
}

export default LoginCarousel;