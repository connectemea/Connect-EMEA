import React from 'react';
import Link from 'next/link';
import { FaInstagram , FaLinkedin , FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
const Footer: React.FC = () => {
    return (
        <div className='bg-primary text-white z-20 dark:bg-white dark:text-black'>
            <div className='bg-primary-light flex flex-col w-full rounded-t-[50px] dark:bg-slate-200 dark:text-black'>

                <section className='text-center p-4'>
                    <h1 className='font-bold text-2xl md:text-5xl my-2'>
                        <span className='text-primary-orange '>Join us</span>  to start your journey.
                    </h1>
                </section>
                <section className='flex justify-between p-4'>
                    <ul className='p-4 '>
                        <li className='text-xl md:text-3xl font-bold mb-4'>ConnectEMEA</li>
                        <li className='text-lg cursor-pointer transition-all ease-in-out duration-300 hover:underline hover:translate-x-2'><Link href="about" >About</Link></li>
                        <li className='text-lg cursor-pointer transition-all ease-in-out duration-300 hover:underline hover:translate-x-2'><Link href="team" >Team</Link></li>
                        <li className='text-lg cursor-pointer transition-all ease-in-out duration-300 hover:underline hover:translate-x-2'><Link href="event" >Events</Link></li>
                        <li className='text-lg cursor-pointer transition-all ease-in-out duration-300 hover:underline hover:translate-x-2'><Link href="join" >Join</Link></li>

                    </ul>
                    <div className='p-4 flex flex-col justify-end md:justify-start gap-2'>
                        <div className=''>
                            <img src="/logo.png" alt="logo w-20 h-20" />
                        </div>
                        <div className='md:flex-1 flex items-center  justify-end md:justify-center md:h-full gap-2 text-black'>
                            <span className='text-white  dark:text-black text-xl cursor-pointer'>
                                <FaInstagram />
                            </span>
                            <span className='text-white  dark:text-black text-xl cursor-pointer'>
                                <FaLinkedin />
                            </span>
                            <span className='text-white  dark:text-black text-xl cursor-pointer'>
                                <FaGithub />
                            </span>
                            <span className='text-white  dark:text-black text-xl cursor-pointer'>
                                <MdEmail />
                            </span>
                        </div>

                    </div>
                </section>
            </div>

        </div>
    );
};

export default Footer;