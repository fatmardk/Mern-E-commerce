import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
// import 'swiper/swiper-bundle.min.css'; // Swiper CSS dosyasını dahil ediyoruz

const Slider = () => {
  return (
    <div>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        // onSwiper={(swiper) => console.log(swiper)}
        // onSlideChange={() => console.log('slide change')}
        className='mySwiper'
      >
        <SwiperSlide className='slide'>
          <div className="slide-img bg-[url('/slider/1.jpg')] h-full w-full bg-cover bg-center"></div>
        </SwiperSlide>
        <SwiperSlide className='slide'>
          <div className="slide-img bg-[url('/slider/2.jpg')] h-full w-full bg-cover bg-center"></div>
        </SwiperSlide>
        <SwiperSlide className='slide'>
          <div className="slide-img bg-[url('/slider/3.jpg')] h-full w-full bg-cover bg-center"></div>
        </SwiperSlide>
        <SwiperSlide className='slide'>
          <div className="slide-img bg-[url('/slider/4.jpg')] h-full w-full bg-cover bg-center"></div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default Slider;
