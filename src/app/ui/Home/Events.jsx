import React, { useRef, useState, useEffect } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { useRouter } from 'next/navigation';
import { IoIosArrowForward } from "react-icons/io";
import Link from 'next/link';
import { useAutoAnimate } from '@formkit/auto-animate/react'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import '../styles/swiper.css';

// import required modules
import { Pagination, Autoplay } from 'swiper/modules';

import { db, auth, storage } from "@/app/server/config/firebase";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";

export default function Slider() {
  const router = useRouter();
  const [centerSlideIndex, setCenterSlideIndex] = useState(0);
  const [indexValue, setIndexValue] = useState(1);
  const [events, setEvents] = useState([]);
  const eventsCollection = collection(db, "Events");
  const [loading, setLoading] = useState(true);
  const [parent, enableAnimations] = useAutoAnimate(/* optional config */)

  useEffect(() => {
    getEvents();
  }, []);

  const getEvents = async () => {
    try {
      const data = await getDocs(query(eventsCollection, where('Status', '==', 'Publish'), limit(6)));
      console.log("Fetched data:", data);
      const eventsData = data.docs.map((doc) => ({
        key: doc.id,
        title: doc.data().title,
        // Summary: doc.data().Summary,
        short_description: doc.data().short_description,
        Date: doc.data().Date,
        imageUrl: doc.data().imageUrl,
      }));
      setEvents(eventsData);
      setLoading(false);
      console.log("Events data:", eventsData);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleSlideChange = (swiper) => {
    setCenterSlideIndex(swiper.realIndex);
  };

  const pagination = {
    clickable: true,
    dynamicBullets: true,
    renderBullet: function (_index, className) {
      return '<span class=" ' + className + '"></span>';
    },
  };
  const handleOpen = (id) => () => {
    router.push(`/event/${id}`);
  }

  // useEffect(() => {
  //   const handleResize = () => {
  //     const newCenterSlideIndex = window.innerWidth <= 768 ? 0 : 1;
  //     setIndexValue(newCenterSlideIndex);
  //   };

  //   window.addEventListener('resize', handleResize);
  //   handleResize(); 

  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, []);


  return (
    <>
      <div>
        <Swiper
          breakpoints={{
            360: {
              slidesPerView: 1,
              spaceBetween: 40,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 40,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 50,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
          }}
          pagination={pagination}
          centeredSlides={true}
          loop={true}
          grabCursor={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Pagination, Autoplay]}
          className="mySwiper"
          onSlideChange={handleSlideChange}
        >
          {loading ? (
            <SwiperSlide>
              <div className='bg-gradient-to-b from-secondary to-violet text-left p-6 min-w-[200px] flex flex-col w-full h-full justify-between gap-2'>
                <h1 className='text-white font-bold text-3xl'>
                  Loading...
                </h1>
                <p className='text-white font-medium ml-2'>
                  Loading...
                </p>
                <div className='flex justify-end p-2 py-4'>
                  <button className='bg-white text-xs font-semibold text-black rounded-full px-2 py-1 flex items-center gap-1 font-medium'>
                    Loading...
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ) : events.length > 0 ? (
            events.map((slide, index) => (
              <SwiperSlide key={index} className={centerSlideIndex === (index + events.length) % events.length ? 'center-slide' : ''}>
                <div className='bg-gradient-to-b from-secondary to-violet text-left p-6 min-w-[200px] flex flex-col w-full h-full justify-between gap-2'>
                  <h1 className='text-white font-bold text-3xl'>
                    {slide.title}
                  </h1>
                  <p className='text-white font-medium ml-2'>
                    {slide.short_description}
                  </p>
                  <div className='flex justify-end p-2 py-4'>
                    <button className='bg-white text-xs font-semibold text-black rounded-full px-2 py-1 flex items-center gap-1 font-medium transition-all ease-in-out hover:gap-4 showMore' onClick={handleOpen(slide.key)}>
                      Open <MdKeyboardDoubleArrowRight className='text-xl' />
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide>
              <div className='bg-gradient-to-b from-secondary to-violet text-left p-6 min-w-[200px] flex flex-col w-full h-full justify-between gap-2'>
                <h1 className='text-white font-bold text-3xl'>
                  No Events
                </h1>
                <p className='text-white font-medium ml-2'>
                  No Events
                </p>
                <div className='flex justify-end p-2 py-4'>
                  <button className='bg-white text-xs font-semibold text-black rounded-full px-2 py-1 flex items-center gap-1 font-medium'>
                    No Events
                  </button>
                </div>
              </div>
            </SwiperSlide>
          )}
        </Swiper>
        <Link href="/event" className="text-white text-center mt-4 mx-auto w-fit h-fit flex items-center justify-center">
          <button className="showMore">
            Show More
            <IoIosArrowForward className='text-white' />
          </button>
        </Link>
      </div>


    </>
  );
}