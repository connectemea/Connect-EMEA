import React from 'react';
import Link from 'next/link';

const Team: React.FC = () => {
    return (
        <div className="min-h-[450px] bg-white/10 backdrop-blur my-2 text-center p-10 flex gap-10 w-full rounded-xl shadow border border-gray-50 flex-col md:flex-row">
            <div className='flex items-center justify-center basis-1/2 border rounded-lg bg-black/10 backdrop-blur border-gray-50'>
                <h1 className="text-6xl bg-gradient-to-b text-transparent bg-clip-text from-violet to-[#ffffff]/70 my-10 font-extrabold">Team</h1>

            </div>
            <div className='flex flex-col items-start justify-between gap-4 basis-1/2'>
                <h1 className="text-6xl bg-gradient-to-b text-transparent bg-clip-text from-violet to-[#ffffff]/70  font-extrabold">Team</h1>
                <p className='text-white items-start flex justify-start text-left'>
                    A technology company that builds economic infrastructure for the internet.economic infrastructure for the internet.economic infrastructure for the internet.
                    A technology company that builds economic infrastructure for the internet.economic infrastructure for the internet.economic infrastructure for the internet.
                    A technology company that builds economic infrastructure for the internet.economic infrastructure for the internet.economic infrastructure....
                </p>
                <Link href="/team" className="text-white">
                    <button className="bg-white/10 backdrop-blur text-white rounded-full px-6 py-2 mt-4 relative z-30 cursor-pointer min-w-[80px]">
                        Show More
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Team;