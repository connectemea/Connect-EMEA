import React from 'react';


export default function Page({ params }: { params: { id: number } }) {
    return (<div className='min-h-screen bg-primary text-white text-center py-20'>
        <h1>[id] Page</h1>
        <p>ID: {params.id}</p>
    </div>
    );
}
