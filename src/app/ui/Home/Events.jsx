import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import '../swiper.css';

// import required modules
import { Pagination , Autoplay } from 'swiper/modules';

export default function Slider() {
  const [centerSlideIndex, setCenterSlideIndex] = useState(0);

  const handleSlideChange = (swiper) => {
    setCenterSlideIndex(swiper.realIndex);
  };
  const slideContent = [
    'Slide 1',
    'Slide 2',
    'Slide 3',
    'Slide 4',
    'Slide 5',
    'Slide 6',
    'Slide 7',
    'Slide 8',
    'Slide 9',
  ];
  const pagination = {
    clickable: true,
    dynamicBullets: true,
    renderBullet: function (index, className) {
      return '<span class=" ' + className + '"></span>';
    },
  };
  return (
    <>
      <Swiper
        slidesPerView={3}
        spaceBetween={50}
        // pagination={{
        //   dynamicBullets: true,
        //   clickable: true,
        // }}
        pagination={pagination}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: true,
        }}
        modules={[Pagination,Autoplay]}
        className="mySwiper"
        onSlideChange={handleSlideChange}
      >
       {slideContent.map((slide, index) => (
          <SwiperSlide key={index} className={centerSlideIndex === (index - 1 + slideContent.length) % slideContent.length ? 'center-slide' : ''}>
            {slide}
          </SwiperSlide>
        ))}
      </Swiper>
      
    </>
  );
}