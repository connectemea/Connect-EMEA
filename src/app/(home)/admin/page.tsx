import React from 'react';
import Login from '@/app/config/auth';

const AdminPanel: React.FC = () => {
    return (
        <div className="h-screen w-full flex flex-col items-center justify-center bg-primary text-white dark:bg-white dark:text-black">
            <h1 className="text-4xl font-bold mb-8">Admin Panel</h1>
            <div className="bg-primary p-6 rounded-lg w-full  dark:bg-white dark:text-black">
            <img src="/img/Visual.png" alt="macbook" className=" fixed z-0 opacity-50 top-10  w-[100%] left-0 right-0 h-[100%]" />
            <div className='z-20 '>

                <Login />
            </div>
            </div>
        </div>
    );
}

export default AdminPanel;
