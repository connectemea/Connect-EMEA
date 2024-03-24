'use client';
import React from 'react';
import { useState } from 'react';
import TeamData from '../lib/Team.js';
import { useAutoAnimate } from '@formkit/auto-animate/react'
import '../ui/style.css';
import { AnimatedTooltip } from "../../components/ui/animated-tooltip";

const Page: React.FC = () => {
    const [parent, enableAnimations] = useAutoAnimate(/* optional config */)
    const [selectedYear, setSelectedYear] = useState('2024');

    const handleSocial = (url: string) => () => {
        window.open(url, '_blank');
    }
    const [showPopup, setShowPopup] = useState<string | null>(null);
    const handleTooltip = (id: string) => {
        setShowPopup(id);
    };
    const handleMouseLeave = () => {
        setShowPopup(null);
    };

    return (
        <div className='bg-primary min-h-screen text-white text-center pt-10 pb-24'>
            <main className='custom-container flex flex-col gap-4 mx-auto '>
                <h1 className='text-4xl font-extrabold mt-16'>Our Team</h1>
                <section className='p-6 mx-auto'>
                    <h1 className='text-2xl font-medium'>Connect EMEA</h1>
                    <h2 className='text-4xl bg-gradient-to-b text-transparent bg-clip-text from-violet to-[#ffffff]/70  font-extrabold uppercase  mb-6'>Founders</h2>
                    <div className='grid grid-cols-1  md:grid-cols-2 gap-x-20 gap-y-10 items-center justify-center my-16'>
                        {TeamData.founders.map((founder) => (
                            <div key={founder.id} className='bg-[#1B1B1B] min-h-[300px]  rounded-lg p-4 max-w-[300px] min-w-[300px] mx-auto shadow'>
                                <img src={`Images/${founder.image}`} alt={founder.name} className='w-full h-full max-h-[320px] object-cover rounded-md' />
                                <div className='text-center flex items-center justify-center flex-col gap-2 my-6'>
                                    <p className='font-bold '>{founder.role}</p>
                                    <p>{founder.profession}</p>
                                    {/* need to change img ot icons  */}
                                    <div className='flex gap-4'>
                                        <img src='/icons/instagram.png' alt='instagram' className='cursor-pointer transition-all ease-in-out duration-500 hover:-translate-y-1 p-2' onClick={handleSocial(founder.social.instagram)} />
                                        <img src='/icons/github.png' alt='github' className='cursor-pointer transition-all ease-in-out duration-500 hover:-translate-y-1 p-2' onClick={handleSocial(founder.social.github)} />
                                        <img src='/icons/linkedin.png' alt='linkedin' className='cursor-pointer transition-all ease-in-out duration-500 hover:-translate-y-1 p-2' onClick={handleSocial(founder.social.linkedin)} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </section>

                <section className='p-6 border border-gray-700 rounded-lg bg-primary-light m-4' ref={parent}>

                    <div className='flex gap-4 mx-auto mb-10'>
                        <div className='basis-11/12 pl-20'>
                            <h1 className='text-2xl font-medium'>Connect EMEA</h1>
                            <h2 className='text-4xl bg-gradient-to-b text-transparent bg-clip-text from-violet to-[#ffffff]/70  font-extrabold uppercase  mb-6'>Core Team</h2>
                        </div>
                        <div className='basis-1/12 flex items-center justify-end'>

                            <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} className='text-white bg-[#FFFFFF]/10 shadow-md w-fit h-fit rounded-full p-2 px-4 cursor-pointer border border-black/20'>
                                <option value="2024">2024</option>
                                <option value="2023">2023</option>
                                <option value="2022">2022</option>
                                <option value="2021">2021</option>
                            </select>
                        </div>

                    </div>

                    {TeamData.coreteam.map((team) => (
                        team.year === selectedYear && (
                            <div key={team.year} className='flex gap-4 flex-wrap items-center justify-center' ref={parent}>
                                {team.members.map((member) => (
                                    <div key={member.id} className='min-h-[260px]  rounded-md  max-w-[260px] min-w-[260px] text-black rounded-xl overflow-hidden flex flex-col relative'>
                                        <div className={`bg-[${team.color}] h-[120px]`} style={{ backgroundColor: team.color }}>
                                        </div>
                                        <div className='bg-white flex items-center justify-center h-[10px]'>
                                            <div className={`-translate-y-4 h-[120px] w-[120px]  rounded-full bg-white border-4 border-[${team.color}]`} style={{ borderColor: team.color }}>
                                                <img src={`/Images/${member.image}`} alt={member.name} className='w-full h-full object-cover rounded-full' />
                                            </div>
                                        </div>
                                        {/* department badge */}
                                        <div className={`absolute top-2 right-2 px-2 py-1 rounded-full bg-white text-[${team.color}] text-sm font-semibold select-none shadow`} style={{ color: team.color }}>
                                        <p>{member.department}</p>
                                            </div>
                                        <div className='h-[200px] bg-white flex items-center justify-center flex-col'>
                                            <p>{member.role}</p>
                                            <p className='text-gray-500'>{member.profession}</p>
                                            <div className='flex gap-4'>
                                                <img src='/icons/instagram.png' alt='instagram' className='cursor-pointer transition-all ease-in-out duration-500 hover:-translate-y-1 p-2' onClick={() => window.open(member.social.instagram, '_blank')} />
                                                <img src='/icons/github.png' alt='github' className='cursor-pointer transition-all ease-in-out duration-500 hover:-translate-y-1 p-2' onClick={() => window.open(member.social.github, '_blank')} />
                                                <img src='/icons/linkedin.png' alt='linkedin' className='cursor-pointer transition-all ease-in-out duration-500 hover:-translate-y-1 p-2' onClick={() => window.open(member.social.linkedin, '_blank')} />
                                            </div>
                                        </div>

                                    </div>
                                ))}
                            </div>
                        )
                    ))}
                </section>


                <section className='p-6 m-4'>
                    <h1 className='text-2xl font-medium'>Connect EMEA</h1>
                    <h2 className='text-4xl bg-gradient-to-b text-transparent bg-clip-text from-violet to-[#ffffff]/70 font-extrabold uppercase mb-6'>Interns</h2>
                    <div className='flex flex-wrap gap-2 mt-20'>
                        <div className="flex flex-row items-center justify-center mb-10 w-full">
                            <AnimatedTooltip items={TeamData.interns} />
                        </div>
                        {/* {TeamData.interns.map((intern) => (
                           
                            // <div
                            //     key={intern.id}
                            //     className='relative'
                            //     onMouseEnter={() => handleTooltip(intern.id)}
                            //     onMouseLeave={handleMouseLeave}
                            // >
                            //     <div className='intern-card rounded-full'>
                            //         <img src={`/Images/${intern.image}`} alt={intern.name} className='w-20 h-20 rounded-full border-4 border-white' />
                            //     </div>
                            //     {showPopup === intern.id && (
                            //         <div className='tooltip'>
                            //             <p>{intern.role}</p>
                            //             <div className='flex gap-4'>
                            //                 <img src='/icons/instagram.png' alt='instagram' className='cursor-pointer transition-all ease-in-out duration-500 hover:-translate-y-1 p-2' onClick={() => window.open(intern.social.instagram, '_blank')} />
                            //                 <img src='/icons/github.png' alt='github' className='cursor-pointer transition-all ease-in-out duration-500 hover:-translate-y-1 p-2' onClick={() => window.open(intern.social.github, '_blank')} />
                            //                 <img src='/icons/linkedin.png' alt='linkedin' className='cursor-pointer transition-all ease-in-out duration-500 hover:-translate-y-1 p-2' onClick={() => window.open(intern.social.linkedin, '_blank')} />
                            //             </div>
                            //         </div>
                            //     )}
                            // </div>
                        ))} */}
                    </div>
                </section>

            </main>

        </div>
    );
};

export default Page;