"use client";
import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import {  FaTimes } from 'react-icons/fa';
import { MdKeyboardArrowRight } from "react-icons/md";
import events from '../../lib/Event';
import '../../ui/styles/event.css';

const EventPage: React.FC = () => {
  const [parent, enableAnimations] = useAutoAnimate(/* optional config */);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className='bg-primary min-h-screen text-white  pt-10 pb-24'>
      <h1 className='text-5xl font-bold text-center my-10'>Event Page</h1>
      <section className='p-6 border border-gray-700 rounded-lg bg-primary-light m-4 flex flex-wrap gap-4 items-center justify-center' ref={parent}>
        {events.map((event) => (
          <div key={event.id} className='bg-white rounded-lg flex flex-col gap-2 items-center justify-center h-fit max-w-[300px] min-w-[260px] p-4' >
            <div className='bg-dark-violet rounded-lg min-h-[200px] min-w-[100%]'>
            <img src='/image/poster1.png' alt='event' className='w-full h-full rounded-xl' />
            </div>
            <div className='text-black flex items-start justify-start w-full'>
              <p className='font-bold'>
              {event.name}
              </p>
            </div>
            <div className='flex justify-end text-black w-full' >
              <button  className='flex items-center font-medium justify-center' onClick={() => showModal()}>
                show more <MdKeyboardArrowRight className='text-xl'/></button>
              </div>
          </div>
        ))}
        {/* onOk={handleOk} onCancel={handleCancel} */}
        <Modal title="" width="800px" visible={isModalOpen} className='ant-modal-content' footer={null}>
          <div className='bg-white rounded-full'>
          <FaTimes className='absolute -top-6 -right-6 z-40 text-white text-xl cursor-pointer' onClick={handleCancel} />
            <div className="relative h-48 rounded-t-xl overflow-hidden">
              <img src='/image/Rectangle 40.png' alt='event' className='absolute top-0 z-10' />
              <img src='/image/Group 25.png' alt='event' className='absolute top-0 z-20 h-fit w-full' />
              <img src='/logo.png' alt='event' className='absolute top-6 right-6 z-30' />
            </div>
            <div className='relative z-40  pb-20 '>
              <div className='border-[10px] border-white rounded-xl ml-10 w-fit h-fit relative -mt-28 overflow-hidden'>
                <img src='/image/poster1.png' alt='event' className='w-full h-full rounded-xl' />
              </div>
              <div className='p-4'>
                <h1 className='text-2xl font-bold'>Summary</h1>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae elementum. Scelerisque purus semper eget duis. Sed cras ornare arcu dui vivamus. Ut tellus elementum sagittis vitae. Ridiculus mus mauris vitae ultricies leo integer malesuada nunc vel. Sed enim ut sem viverra aliquet. Malesuada fames ac turpis egestas maecenas pharetra. Nec nam aliquam sem et tortor. Ipsum dolor sit amet consectetur. Varius morbi enim nunc faucibus a pellentesque sit. Tristique senectus et netus et malesuada. Quam viverra orci sagittis eu volutpat odio. Fusce ut placerat orci nulla pellentesque dignissim enim. Ut tellus elementum sagittis vitae et leo duis. Malesuada nunc vel risus commodo viverra maecenas accumsan lacus.
                  Odio facilisis mauris sit amet. Tortor id aliquet lectus proin. Nisl pretium fusce id velit ut tortor pretium. Lobortis elementum nibh tellus molestie nunc non blandit massa enim. Amet luctus venenatis lectus magna fringilla urna.
                </p>
              </div>
              <div className='p-4'>
                <h1 className='text-2xl font-bold'>Gallery</h1>
                <div className='bg-slate-200 rounded-xl shadow-lg flex flex-wrap gap-4 mx-auto max-w-[500px]'>
                  <img src='/image/poster1.png' alt='event' className='w-32 h-32 m-2' />
                  <img src='/image/poster1.png' alt='event' className='w-32 h-32 m-2' />
                  <img src='/image/poster1.png' alt='event' className='w-32 h-32 m-2' />
                  <img src='/image/poster1.png' alt='event' className='w-32 h-32 m-2' />
                </div>
              </div>

            </div>
          </div>
        </Modal>
      </section>
    </div>
  );
};

export default EventPage;
