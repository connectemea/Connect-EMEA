"use client";
import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { FaTimes } from 'react-icons/fa';
import { MdKeyboardArrowRight } from "react-icons/md";
import { db, auth, storage } from "@/app/server/config/firebase";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import '../../../ui/styles/event.css';
import { usePathname } from 'next/navigation';

const EventPage: React.FC = () => {
  const [parent, enableAnimations] = useAutoAnimate(/* optional config */);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>([]);
  const [events, setEvents] = useState<any>([]);
  const eventsCollection = collection(db, "Events");
  const [eventsFetched, setEventsFetched] = useState(false);
  const pathname = usePathname();

  const showModal = (event: any) => {
    setIsModalOpen(true);
    setSelectedEvent(event);
    console.log(event);
    console.log("Selected event:", selectedEvent);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const id: string = pathname.split('/').pop() || '';

  useEffect(() => {
    if (!eventsFetched) {
      getEvents();
    }
    if (id) {
      const event = events.find((event: any) => event.key === id);
      if (event) {
        showModal(event);
      }
    }
  }, [id, events, eventsFetched]);


  const getEvents = async () => {
    try {
      const data = await getDocs(eventsCollection);
      console.log("Fetched data:", data);
      const eventsData = data.docs.map((doc) => ({
        key: doc.id,
        title: doc.data().title,
        Summary: doc.data().summary,
        Date: doc.data().Date,
        imageUrl: doc.data().imageUrl,
      }));
      setEvents(eventsData);
      setEventsFetched(true);
      console.log("Events data:", eventsData);
    } catch (err) {
      console.error(err);
    }
  };

  function FormatDate(timestamp: any): string {
    const date = new Date(timestamp);
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    return `${month} ${date.getDate()}, ${year}`;
  }
  

  return (
    <div className='bg-primary min-h-screen text-white  pt-10 pb-24'>
      <h1 className='text-5xl font-bold text-center my-10'>Event Page</h1>
      <section className='p-6 border border-gray-700 rounded-lg bg-primary-light m-4 flex flex-wrap gap-4 items-center justify-center' ref={parent}>
        {events.map((event: any) => (
          <div key={event.key} className='bg-white rounded-lg flex flex-col gap-2 items-center justify-center h-fit max-w-[260px] min-w-[240px] p-4' >
            <div className='bg-dark-violet rounded-lg min-h-[200px]  min-w-[100%] flex items-center justify-center'>
              <img src={event?.imageUrl} alt='event' className='w-full object-cover h-full max-h-[200px] rounded-xl' />
            </div>
            <div className='text-black flex items-start justify-start w-full'>
              <p className='font-bold'>
                {event.title}
              </p>
            </div>
            <div className='flex justify-end text-black w-full' >
              <button className='flex items-center font-medium justify-center' onClick={() => showModal(event)}>
                show more <MdKeyboardArrowRight className='text-xl' /></button>
            </div>
          </div>
        ))}
        {/* onOk={handleOk} onCancel={handleCancel} */}
        <Modal title="" width="900px" open={isModalOpen} className='ant-modal-content' footer={null} closable={false}>
            <FaTimes className='absolute -top-6 -right-6 z-40 text-white text-xl cursor-pointer' onClick={handleCancel} />
          <div className='bg-white rounded-2xl overflow-hidden'>
            <div className="relative h-48 rounded-t-xl overflow-hidden">
              <img src='/image/Rectangle 40.png' alt='event' className='absolute top-0 z-10' />
              <img src='/image/Group 25.png' alt='event' className='absolute top-0 z-20 h-fit w-full opacity-30' />
              <img src='/logo.png' alt='event' className='absolute top-6 right-6 z-30 ' />
            </div>
            <div className='relative z-40  pb-20 '>
              <div className='flex gap-4'>

                <div className='border-[10px] border-white rounded-xl ml-10 w-fit h-fit relative -mt-28 overflow-hidden'>
                  <img src={selectedEvent?.imageUrl} alt='event' className='w-full max-w-[280px] h-full max-h-[240px] rounded-xl min-w-[200px] min-h-[160px]' />
                </div>
                <div className='mt-4'>
                  <h1 className='text-xl font-bold uppercase'>
                    {selectedEvent && selectedEvent.title}
                  </h1>
                  {selectedEvent && (
                    <h2 className='text-lg'>
                      {FormatDate(selectedEvent.Date)}
                    </h2>
                  )}
                </div>
              </div>

              <div className='p-4 '>

                <h1 className='text-2xl font-bold'>Summary</h1>
                <p className='ml-4 indent-8 mt-2'>
                  {selectedEvent && selectedEvent.Summary}
                </p>
              </div>
              {/* <div className='p-4'>
                <h1 className='text-2xl font-bold'>Gallery</h1>
                <div className='bg-slate-200 rounded-xl shadow-lg flex flex-wrap gap-4 mx-auto max-w-[500px]'>
                  <img src='/image/poster1.png' alt='event' className='w-32 h-32 m-2' />
                  <img src='/image/poster1.png' alt='event' className='w-32 h-32 m-2' />
                  <img src='/image/poster1.png' alt='event' className='w-32 h-32 m-2' />
                  <img src='/image/poster1.png' alt='event' className='w-32 h-32 m-2' />
                </div>
              </div> */}

            </div>
          </div>
        </Modal>
      </section>
    </div>
  );
};

export default EventPage;
