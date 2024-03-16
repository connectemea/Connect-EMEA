import React from 'react';


export default function Page({ params }: { params: { id: number } }) {
    return (<div className='h-screen bg-custom-bg text-white'>
        <h1>[id] Page</h1>
        <p>ID: {params.id}</p>
    </div>
    );
}
