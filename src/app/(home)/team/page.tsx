'use client';
import React from 'react';
import { useState, useEffect } from 'react';
import TeamData from '../../lib/Team.js';
import { useAutoAnimate } from '@formkit/auto-animate/react'
import '../../ui/styles/style.css';
import { AnimatedTooltip } from "../../../components/ui/animated-tooltip";
import { FaInstagram } from "react-icons/fa";
import { FiGithub } from "react-icons/fi";
import { SlSocialLinkedin } from "react-icons/sl";
import { Select, Space } from 'antd';
import { db, auth, storage } from "@/app/server/config/firebase";
import {
    getDocs,
    getDoc,
    addDoc,
    deleteDoc,
    updateDoc,
    where,
    doc,
    collection,
    setDoc,
    FieldValue,
    arrayUnion,
    query,

} from "firebase/firestore";


const Page: React.FC = () => {
    const [parent, enableAnimations] = useAutoAnimate(/* optional config */)
    const [selectedYear, setSelectedYear] = useState('2020-21');
    const [coremembers, setCoremembers] = useState<any[]>([]);
    const [interns, setInterns] = useState<any[]>([]);
    const internsCollection = collection(db, "Interns");
    const [options, setOptions] = useState<any[]>([]);



    const getCoreInterns = async (TeamId: string) => {
        try {
            const internsRef = collection(db, 'Interns');
            // const queryIntern = query(internsRef, where('teams', 'array-contains', TeamId));
            const queryIntern = query(internsRef,
                where('teamIds', 'array-contains', TeamId));
            const querySnapshot = await getDocs(queryIntern);
            const internsData = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                name: doc.data().name,
                image: doc.data().imageUrl,
                profession: doc.data().profession,
                role: doc.data().role,
                social: doc.data().social,
                department: doc.data().department,
                tags: doc.data().tags,
            }));
            setCoremembers(internsData);
            console.log('coreteam', internsData);
        } catch (error) {
            console.error('Error getting documents: ', error);
        }
    };

    const getInterns = async () => {
        try {
            const data = await getDocs(internsCollection);
            const internsData = data.docs.map((doc) => ({
                key: doc.id,
                name: doc.data().name,
                imageUrl: doc.data().imageUrl,
                profession: doc.data().profession,
                role: doc.data().role,
                social: doc.data().social,
                department: doc.data().department,
                tags: doc.data().tags,
            }));
            setInterns(internsData);
            console.log("Interns data:", internsData);
        } catch (err) {
            console.error(err);
        }
    };

    const getCoreTeamOptions = async () => {
        const coreTeamRef = collection(db, 'CoreTeam');
        try {
            const data = await getDocs(coreTeamRef);
            const internsData = data.docs.map((doc) => ({
                value: doc.id,
                label: doc.id,
                Color: doc.data().Color,
            }));
            console.log("CoreTeam Options:", internsData);
            setOptions(internsData);
        } catch (err) {
            console.error(err);
        }
    };


    useEffect(() => {
        getCoreInterns(selectedYear);
        getInterns();
        getCoreTeamOptions();
    }, []);


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
    let selectedOptions: any = options.filter(option => option.value === `${selectedYear}`);
    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
        setSelectedYear(value);
        getCoreInterns(value);
        selectedOptions = options.filter(option => option.value === selectedYear);
        console.log('selectedOptions', selectedOptions);
    };
    return (
        <div className='bg-primary min-h-screen text-white text-center pt-10 pb-24'>
            <main className='custom-container flex flex-col gap-4 mx-auto '>
                <h1 className='text-4xl font-extrabold mt-16'>Our Team</h1>
                <section className='p-6 mx-auto'>
                    <h1 className='text-2xl font-medium'>Connect EMEA</h1>
                    <h2 className='text-4xl bg-gradient-to-b text-transparent bg-clip-text from-violet to-[#ffffff]/70  font-extrabold uppercase  mb-6'>Founders</h2>
                    <div className='grid grid-cols-2  md:grid-cols-4 gap-x-10 gap-y-10 items-center justify-center my-16'>
                        {TeamData.founders.map((founder) => (
                            <div key={founder.id} className='bg-[#1B1B1B] min-h-[240px]  rounded-lg  max-w-[300px] min-w-[200px] mx-auto shadow '>
                                <div className='relative'>
                                    <img src='/Images/bg-traingle.png' alt='overlay' className='absolute top-0 left-0 w-full h-full object-cover rounded-md z-10' />
                                    <div className='mt-2 mx-auto p-4 z-20 h-[250px]'>
                                        <img src={`Images/founders/${founder.image}`} alt={founder.name} className='w-full h-full  object-cover rounded-md' />
                                    </div>
                                </div>
                                <div className='text-center flex items-center justify-center flex-col my-2 mx-auto'>
                                    <p className='font-bold '>{founder.role}</p>
                                    <p>{founder.profession}</p>
                                    <div className='flex gap-4 mt-1'>
                                        <FaInstagram className='text-secondary text-xl cursor-pointer transition-all ease-in-out duration-500 hover:-translate-y-1 ' onClick={handleSocial(founder.social.instagram)} />
                                        <FiGithub className='text-secondary text-xl cursor-pointer transition-all ease-in-out duration-500 hover:-translate-y-1 ' onClick={handleSocial(founder.social.github)} />
                                        <SlSocialLinkedin className='text-secondary text-xl cursor-pointer transition-all ease-in-out duration-500 hover:-translate-y-1 ' onClick={handleSocial(founder.social.linkedin)} />
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
                            <Select
                                defaultValue="2020-21"
                                style={{ width: 120 }}
                                onChange={handleChange}
                                options={options}
                            />

                            {/* <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} className='text-white  shadow-md w-fit h-fit rounded-full p-2 px-4 cursor-pointer border border-black/20 '>
                                <option value=""></option>
                                <option value="">2023</option>
                                <option value="2022">2022</option>
                                <option value="2021">2021</option>
                            </select> */}
                        </div>

                    </div>

                    <div key={selectedYear} className='flex gap-4 flex-wrap items-center justify-center' ref={parent}>
                        {coremembers.map((member: any) => (
                            <div key={member.id} className='min-h-[260px]  rounded-md  max-w-[260px] min-w-[260px] text-black rounded-xl overflow-hidden flex flex-col relative'>
                                <div className={`bg-[${selectedOptions?.[0]?.Color}] h-[120px]`} style={{ backgroundColor: selectedOptions[0]?.Color }}>
                                </div>
                                <div className='bg-white flex items-center justify-center h-[10px]'>
                                    <div className={`-translate-y-4 h-[120px] w-[120px]  rounded-full bg-white border-4 border-[${selectedOptions[0]?.Color}]`} style={{ borderColor: selectedOptions[0]?.Color }}>
                                        <img src={`${member.image}`} alt={member.name} className='w-full h-full object-cover rounded-full' />
                                    </div>
                                </div>
                                {/* department badge */}
                                <div className={`absolute top-2 right-2 px-2 py-1 rounded-full bg-white text-[${selectedOptions[0]?.Color}] text-sm font-semibold select-none shadow`} style={{ color: selectedOptions[0]?.Color }}>
                                    <p>{member.department}</p>
                                </div>
                                <div className='h-[200px] bg-white flex items-center justify-center flex-col'>
                                    <p>{member.role}</p>
                                    <p className='text-gray-500'>{member.profession}</p>
                                    <div className='flex gap-4'>
                                        <FaInstagram className=' text-secondary text-xl cursor-pointer  transition-all ease-in-out duration-500 hover:-translate-y-1 ' onClick={() => window.open(member.social.instagram, '_blank')} />
                                        <FiGithub className=' text-secondary text-xl cursor-pointer transition-all ease-in-out duration-500 hover:-translate-y-1 ' onClick={() => window.open(member.social.github, '_blank')} />
                                        <SlSocialLinkedin className=' text-secondary text-xl cursor-pointer transition-all ease-in-out duration-500 hover:-translate-y-1 ' onClick={() => window.open(member.social.linkedin, '_blank')} />
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>
                </section>


                <section className='p-6 m-4'>
                    <h1 className='text-2xl font-medium'>Connect EMEA</h1>
                    <h2 className='text-4xl bg-gradient-to-b text-transparent bg-clip-text from-violet to-[#ffffff]/70 font-extrabold uppercase mb-6'>Interns</h2>
                    <div className='flex flex-wrap gap-2 mt-20'>
                        <div className="flex flex-row items-center justify-center mb-10 w-full">
                            <AnimatedTooltip items={interns} />
                        </div>
                    </div>
                </section>

            </main>

        </div>
    );
};

export default Page;