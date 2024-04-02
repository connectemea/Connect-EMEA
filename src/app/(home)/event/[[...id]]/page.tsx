"use client";

// import { GetStaticProps, GetStaticPaths } from 'next';
import React, { useEffect, useState } from 'react';
import { Button, Modal, Image, Skeleton, Empty } from 'antd';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { FaTimes } from 'react-icons/fa';
import { MdKeyboardArrowRight } from "react-icons/md";
import { db, auth, storage } from "@/app/config/firebase";
import {
  getDocs,
  getDoc,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  query,
  where
} from "firebase/firestore";
import '@/app/styles/event.css';
import { usePathname } from 'next/navigation';

// export const getStaticProps: GetStaticProps = async ({ params }) => {
//   // params contains the eventId from the URL
//   const pathname = usePathname();
//   const eventId = params?.eventId;
//   const id: string = pathname.split('/').pop() || '';

//   // Fetch event data from Firestore using the eventId
//   const eventRef = doc(db, 'Events', id);
//   const eventDoc = await getDoc(eventRef);
  
//   if (!eventDoc.exists()) {
//     return {
//       notFound: true,
//     };
//   }

//   const event = eventDoc.data();

//   // Pass event data as props to the page component
//   return {
//     props: {
//       event,
//     },
//   };
// };

// export const getStaticPaths: GetStaticPaths = async () => {
//   // Fetch a list of all event IDs from your API
//   const eventsCollection = collection(db, 'Events');
//   const data = await getDocs(query(eventsCollection, where('Status', '==', 'Publish')));
//   const events = data.docs.map((doc) => doc.id);

//   // Generate paths for each event ID
//   const paths = events.map((eventId) => ({
//     params: { eventId },
//   }));

//   // Return the paths to Next.js
//   return {
//     paths,
//     fallback: false, // or true if you want to use fallback behavior
//   };
// };




const EventPage: React.FC = (params: any) => {
  const [parent, enableAnimations] = useAutoAnimate(/* optional config */);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>([]);
  const [events, setEvents] = useState<any>([]);
  const eventsCollection = collection(db, "Events");
  const [eventsFetched, setEventsFetched] = useState(false);
  const [pending, setPending] = useState(true);
  const pathname = usePathname();
  console.log("Pathname:", params);
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
    <div className='bg-primary min-h-screen text-white dark:bg-white dark:text-black  pt-10 pb-24 custom-container sm:px-4 dark:bg-white dark:text-black'>
      <h1 className='text-3xl md:text-5xl font-bold text-center my-10'>Events</h1>
      <section className='p-2 py-6 sm:p-6 mb-6 border border-gray-700 rounded-lg bg-primary-light  flex flex-wrap sm:gap-10 gap-4 items-center justify-center w-full' ref={parent}>
        {pending ? (
          <div className='text-white dark:bg-white dark:text-black text-center w-full dark:bg-white dark:text-black'>
            Loading ....  <Skeleton active /><Skeleton active />
          </div>
        ) : (
          events.length === 0 ? (
            <div className='flex items-center justify-center'>
              <Empty description="No Interns Found" />
            </div>
          ) :
            events.map((event: any) => (
              <div key={event.key} className='bg-white rounded-lg flex flex-col gap-1 sm:gap-2 items-center justify-center h-fit max-w-[150px] sm:max-w-[260px] min-w-[150px] sm:min-w-[240px] p-2 sm:p-4 ' >
                <div className='bg-dark-violet rounded-lg min-h-[130px] sm:min-h-[200px]  min-w-[100%] flex items-center justify-center'>
                  <img src={event?.imageUrl} alt='event' className='max-w-[130px] sm:w-full object-cover sm:h-full max-h-[130px] sm:max-h-[200px] rounded-xl sm:max-w-[250px] sm:max-h-[200px]' />
                </div>
                <div className='text-black flex items-start justify-start w-full'>
                  <p className='font-bold text-sm sm:text-md'>
                    {event.title}
                  </p>
                </div>
                <div className='flex justify-end text-black w-full' >
                  <button className='flex items-center font-medium justify-center text-sm sm:text-md' onClick={() => showModal(event)}>
                    show more <MdKeyboardArrowRight className='text-xl' /></button>
                </div>
              </div>
            ))
        )}


        {/* modal to show individual event */}
        <Modal title="" width="900px" open={isModalOpen} className='ant-modal-content ' footer={null} closable={false}>
          <FaTimes className='absolute -top-8 md:-top-6 right-0 md:-right-6 z-40 text-white dark:bg-white dark:text-black text-xl cursor-pointer dark:bg-white dark:text-black' onClick={handleCancel} />
          <div className='bg-white rounded-2xl overflow-hidden'>
            <div className="relative h-48 rounded-t-xl overflow-hidden">
              <img src='/img/Rectangle 40.png' alt='event' className='absolute top-0 z-10' />
              <img src='/img/buble.png' alt='event' className='absolute top-0 z-20 h-fit w-full opacity-30' />
              <img src='/Logos/logo.png' alt='event' className='absolute top-6 right-6 z-30 ' />
            </div>
            <div className='relative z-40  pb-20 '>
              <div className='flex gap-4'>

                <div className='border-[10px] border-white bg-white shadow-xl rounded-xl ml-10 w-fit h-fit relative -mt-28 overflow-hidden'>
                  <img src={selectedEvent?.imageUrl} alt='event' className='w-full max-w-[280px]  h-full max-h-[240px] rounded-xl min-w-[200px] min-h-[160px]' />
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
