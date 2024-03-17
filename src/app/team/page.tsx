import React from 'react';
import { MacbookScrollDemo } from '../ui/Home/Macbook';

const Page: React.FC = () => {
    return (
        <div className='bg-primary min-h-screen'>
            <h1>Team Page</h1>
            <p>Welcome to the Team page of our application!</p>
            <div className='overflow-hidden '>
                <MacbookScrollDemo />
            </div>
            <div className='min-h-[800px]'>
                s
            </div>

        </div>
    );
};

export default Page;