import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
    return (
        <div className='bg-primary text-white'>
            <div className='bg-primary-light flex flex-col w-full rounded-t-[50px]'>

                <section className='text-center p-4'>
                    <h1 className='font-bold text-5xl my-2'>
                        <span className='text-primary-orange '>Join us</span>  to start your journey.
                    </h1>
                </section>
                <section className='flex justify-between p-4'>
                    <ul className='p-4 '>
                        <li className='text-3xl font-bold mb-4'>ConnectEMEA</li>
                        <li className='text-lg cursor-pointer transition-all ease-in-out duration-300 hover:underline hover:translate-x-2'><Link href="about" >About</Link></li>
                        <li className='text-lg cursor-pointer transition-all ease-in-out duration-300 hover:underline hover:translate-x-2'><Link href="team" >Team</Link></li>
                        <li className='text-lg cursor-pointer transition-all ease-in-out duration-300 hover:underline hover:translate-x-2'><Link href="event" >Events</Link></li>
                        <li className='text-lg cursor-pointer transition-all ease-in-out duration-300 hover:underline hover:translate-x-2'><Link href="join" >Join</Link></li>

                    </ul>
                    <div className='p-4 flex flex-col justify-start'>
                        <div>
                            <img src="/logo.png" alt="logo" />
                        </div>
                        <div className='flex-1 flex items-center justify-center h-full gap-2 text-black'>
                            <span className='bg-red-200 p-2 cursor-pointer'>
                                i
                            </span>
                            <span className='bg-green-200 p-2 cursor-pointer'>
                                c
                            </span>
                            <span className='bg-red-200 p-2 cursor-pointer'>
                                o
                            </span>
                            <span className='bg-green-200 p-2 cursor-pointer'>
                                n
                            </span>
                        </div>

                    </div>
                </section>
            </div>

        </div>
    );
};

export default Footer;