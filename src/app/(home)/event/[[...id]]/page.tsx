"use client";
import React, { useEffect, useState } from 'react';
import { Button, Modal , Image , Skeleton } from 'antd';
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
  query,
  where
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
  const [pending, setPending] = useState(true);
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
      const data = await getDocs(query(eventsCollection, where('Status', '==', 'Publish')));
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
      setPending(false);
      console.log("Events data:", eventsData);
    } catch (err) {
      console.error(err);
      setPending(false);
    }
  };

  function FormatDate(timestamp: any): string {
    const date = new Date(timestamp);
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    return `${month} ${date.getDate()}, ${year}`;
  }


  return (
    <div className='bg-primary min-h-screen text-white  pt-10 pb-24 custom-container'>
      <h1 className='text-5xl font-bold text-center my-10'>Event Page</h1>
      <section className='p-6 border border-gray-700 rounded-lg bg-primary-light m-4 flex flex-wrap gap-10 items-center justify-center w-full' ref={parent}>
        {pending ? (
          <div className='text-white text-center w-full'>
          Loading ....  <Skeleton active />
          </div>
        ) : (
          events.map((event: any) => (
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
          ))
        )}


        {/* modal to show individual event */}
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
                  {/* <Image
                    width={200}
                    height={200}
                    src="error"
                    fallback="data:image/png;base64,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"
                  /> */}
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
