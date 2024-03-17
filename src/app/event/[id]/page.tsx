import React from 'react';
import cards from '../../lib/Data';

// interface EventDetails {
//     id: string;
//     title: string;
//     date: string;
//     location: string;
//     description: string;
// }

const EventPage: React.FC<{ params: { id: string } }> = ({ params }) => {
    const { id } = params;
    // Filter the cards array to find the event with the matching id
    const event = cards.find(card => card.id === String(id));

    if (!event) {
        return <div>Event not found ${id}</div>;
    }

    return (
        <div className='h-screen flex items-center justify-center mx-auto bg-primary'>
            <div className='rounded-lg bg-secondary p-10 text-white'>
            <h1>{event.title}</h1>
            <p>Date: {event.short_description}</p>
            <p>Location: {event.id}</p>
            <p>Description: {event.description}</p>
            </div>
        </div>
    );
};
export default EventPage;
