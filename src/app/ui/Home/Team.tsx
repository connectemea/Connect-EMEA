import React from 'react';
import Link from 'next/link';
import { IoIosArrowForward } from "react-icons/io";

const Team: React.FC = () => {
    return (
        <div className="min-h-[450px] bg-white/5 backdrop-blur my-2 text-center p-10 flex gap-10 w-full rounded-xl shadow border border-gray-700/50 flex-col md:flex-row">
            <h1 className="text-4xl block md:hidden bg-gradient-to-b text-transparent bg-clip-text from-violet to-[#ffffff]/70  font-extrabold">Our Team</h1>
            <div className='flex items-center justify-center basis-1/2 border rounded-2xl bg-black/5 backdrop-blur border-gray-700/50 flex-col p-4'>
            
                {/* <h1 className="text-6xl bg-gradient-to-b text-transparent bg-clip-text from-violet to-[#ffffff]/70 my-10 font-extrabold">Team</h1> */}
                <img src='/Images/Developer.png' alt='Developer' className=' w-full md:w-1/2' />

            </div>
            <div className='flex flex-col items-start justify-between gap-4 basis-1/2'>
                <h1 className="text-4xl hidden md:block md:text-6xl bg-gradient-to-b text-transparent bg-clip-text from-violet to-[#ffffff]/70  font-extrabold">Our Team</h1>
                <p className='text-white items-start flex justify-start text-left' style={{ overflowWrap: 'anywhere'}}>
                    A technology company that builds economic infrastructure for the internet.economic infrastructure for the internet.economic infrastructure for the internet.
                    A technology company that builds economic infrastructure for the internet.economic infrastructure for the internet.economic infrastructure for the internet.
                    A technology company that builds economic infrastructure for the internet.economic infrastructure for the internet.economic infrastructure....
                </p>
                <Link href="/team" className="text-white">
                    <button className="bg-black/5 shadow backdrop-blur text-white rounded-full px-6 py-2 mt-4 relative z-30 cursor-pointer min-w-[80px] border border-gray-700/50 flex items-center justify-center gap-4 hover:gap-10 transition-all ease-in-out">
                        Show More <IoIosArrowForward className='text-white'/>
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Team;