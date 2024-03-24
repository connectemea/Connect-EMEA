"use client";
import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import events  from '../lib/Event'; 

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
    <div className='bg-primary min-h-screen text-white text-center pt-10 pb-24'>
      <h1>Event Page</h1>
      <section className='p-6 border border-gray-700 rounded-lg bg-primary-light m-4 flex flex-wrap gap-4 items-center justify-center' ref={parent}>
        {events.map((event) => (
          <div key={event.id} className='bg-white rounded-lg flex flex-col gap-2 items-center justify-center h-fit max-w-[300px] min-w-[260px] p-4' onClick={() => showModal()}>
            <div className='bg-dark-violet rounded-lg min-h-[200px] min-w-[100%]'>
            </div>
            <div className=''>
              {event.name}
            </div>
          </div>
        ))}

        <Modal title="Basic Modal" visible={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <p>Event Name: </p>
          <Button type="primary" onClick={handleOk}>
            OK
          </Button>
        </Modal>
      </section>
    </div>
  );
};

export default EventPage;
