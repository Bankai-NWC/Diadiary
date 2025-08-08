import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import './swiper.css';

import { EffectCoverflow, Pagination } from 'swiper/modules';

function SwiperCoverflow() {
  const images = [
    './images/swiper/2.png',
    './images/swiper/3.png',
    './images/swiper/4.png',
    './images/swiper/5.png',
    './images/swiper/6.png',
    './images/swiper/7.png',
    './images/swiper/8.png',
    './images/swiper/9.png',
  ];

  return (
    <>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
      >
        {images.map(image => (
          <SwiperSlide key={image}>
            <img src={image} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export default SwiperCoverflow;
