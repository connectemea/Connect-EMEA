import React from 'react';
import { Divider } from "antd";
import '@/app/styles/style.css'

const About: React.FC = () => {
    return (
        <div className='bg-primary min-h-screen py-20 text-white text-center overflow-hidden dark:bg-white dark:text-black'>
            {/* background image */}
            {/* <img src="/img/Visual.png" alt="macbook" className=" fixed z-10 opacity-50 top-10  w-[100%] left-0 right-0 h-[100%]" /> */}

            <main className='mx-auto flex items-center flex-col custom-container z-20 text-white text-center  dark:text-black'>

                <h1 className='text-3xl md:text-5xl font-bold'>
                    About Us
                </h1>
                <h2 className='text-3xl md:text-5xl bg-gradient-to-b text-transparent bg-clip-text from-violet to-[#ffffff]/70 my-10 font-extrabold text-center'>
                    Get your skill going & growing <br className='hidden md:block'/> with Connect.
                </h2>
                <section className='flex flex-row items-center justify-center mx-auto my-16 gap-2'>
                    <div className='basis-1/2 -ml-36 flex items-center justify-center w-full h-full TheFLex1'>
                        <img src="/img/about-1.png" alt="logo" className="w-full h-full max-w-[450px]" />
                    </div>
                    <div className='basis-1/2 TheFLex1'>
                        <div>
                            <Divider className=''>
                                <h1 className='text-3xl md:text-5xl font-bold text-secondary'>
                                    Mission
                                </h1>
                            </Divider>
                        </div>
                        <div>
                            <p className='text-left font-medium text-sm md:text-lg'>
                                Connect tries to nourish the latent talents and creative abilities of students by providing a platform to learn emerging skill sets and equip them to be the faces of the future. The initiative imbibes leadership quality, eloquence and entrepreneurship skills, encouraging peer-to-peer learning and provides internship programs. By organizing talks, fests, job fairs, hackathons, workshops and webinars, Connect aims at creating a focused platform to hasten the learning process, thereby creating an incentive for student engagement in the exploration of the world that's rapidly evolving.
                            </p>
                        </div>
                        <div>
                            <Divider>
                                <h1 className='text-5xl font-bold text-secondary'>
                                    ”
                                </h1>
                            </Divider>
                        </div>
                    </div>

                </section>
                <section className='flex flex-row w-full items-center justify-center mx-auto my-16 gap-2'>
                    <div className='basis-1/2 TheFLex1'>
                        <div>
                            <Divider>
                                <h1 className='text-3xl md:text-5xl font-bold text-secondary'>
                                    vision
                                </h1>
                            </Divider>

                        </div>
                        <div>
                            <p className='text-left font-medium text-sm md:text-lg'>
                                We paint a larger picture of the student community to create a network with clusters of their area of interests and thus creating a potent workforce capable of unlocking the vast reservoir of untapped potential. By improving specific learning outcomes, it essentially places people first by empowering them with technical and creative skills to make sustainable choices and multi-dimensional solutions that the complex new world needs.
                            </p>
                        </div>
                        <div>
                            <Divider>
                                <h1 className='text-[40px] font-bold text-secondary'>
                                    ”
                                </h1>
                            </Divider>
                        </div>
                    </div>
                    <div className='basis-1/2 -mr-36 flex items-center justify-center w-full h-full TheFLex1'>
                        <img src="/img/about-vission.png" alt="logo" className="w-full h-full max-w-[450px]" />
                    </div>
                </section>
                <section className='flex flex-col  w-full items-center justify-around my-16 bg-white/10 border border-gray-600/50 rounded-2xl min-h-[800px] relative p-4 md:p-16'>
                    <div>
                        <h1 className='text-3xl md:text-5xl bg-gradient-to-b text-transparent bg-clip-text from-violet to-[#ffffff]/70 my-4 md:my-10 font-extrabold'>
                            Communities for joy
                        </h1>
                    </div>
                    <div className='flex gap-6 md:gap-16 flex-col md:flex-row my-8 md:my-0'>
                        <div className='bg-white/20  flex flex-col items-center justify-around rounded-[40px] max-w-[360px] p-10 gap-4'>
                            <img src='/Logos/Tinkerhub.png' alt="logo" className="w-auto h-16 md:h-24" />
                            <h1 className='text-xl md:text-3xl font-bold'>
                                TinkerHub EMEA
                            </h1>
                            <p className='text-left text-sm md:text-md'>
                                TinkerHub EMEA is a Campus Community Initiative of TinkerHub Foundation, a non profit organization registered in 2016. TinkerHub aims to reduce the gap between technology and its effective employment in lives of tech enthusiasts.
                            </p>
                        </div>
                        <div className='bg-white/20  flex flex-col items-center justify-around rounded-[40px] max-w-[360px] p-10 gap-4'>
                            <img src='/Logos/SheHikeLogo.png' alt="logo" className="w-auto h-16 md:h-24" />
                            <h1 className='text-xl md:text-3xl font-bold'>
                                SheHike
                            </h1>
                            <p className='text-left  text-sm md:text-md'>
                                ‘SheHike’ is a women's wing under CONNECT EMEA which is open to all the girl students in the college.The purpose of this initiative is to empower women with relevant knowledge and skills, thereby encouraging peer-to-peer learning among them.
                            </p>
                        </div>
                    </div>
                    <img src='/Images/emeacollege.png' alt="logo" className="absolute bottom-0 w-full" />
                </section>
            </main>

        </div>
    );
};

export default About;