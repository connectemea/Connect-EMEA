"use client";
import Image from "next/image";
import React, { useState } from "react";
import { FaTimes } from 'react-icons/fa';
import { Button, Modal } from 'antd';
import {
    motion,
    useTransform,
    AnimatePresence,
    useMotionValue,
    useSpring,
} from "framer-motion";
import { FaInstagram } from "react-icons/fa";
import { FiGithub } from "react-icons/fi";
import { SlSocialLinkedin } from "react-icons/sl";

export const AnimatedTooltip = ({
    items,
}: {
    items: {
        key: string;
        tags: any;
        id: any;
        name: string;
        imageUrl: string;
        profession: string;
        role: string;
        social: { linkedin: string; github: string; instagram: string };
        department: string;
        acive: boolean;
        joined_year: any;
    }[];
}) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const springConfig = { stiffness: 100, damping: 5 };
    const x = useMotionValue(0); // going to set this value on mouse move
    // rotate the tooltip
    const rotate = useSpring(
        useTransform(x, [-100, 100], [-45, 45]),
        springConfig
    );
    // translate the tooltip
    const translateX = useSpring(
        useTransform(x, [-100, 100], [-50, 50]),
        springConfig
    );

    const [openModalIndex, setOpenModalIndex] = useState<number | null>(null);

    const handleMouseMove = (event: any) => {
        const halfWidth = event.target.offsetWidth / 2;
        x.set(event.nativeEvent.offsetX - halfWidth); // set the x value, which is then used in transform and rotate
    };

    const showModal = (idx: number) => {
        setOpenModalIndex(idx);
    };

    const handleOk = () => {
        setOpenModalIndex(null);
    };

    const handleCancel = () => {
        setOpenModalIndex(null);
    };
    const handleSocial = (url: string) => () => {
        window.open(url, '_blank');
    }

    return (
        <>
            {items.map((item, idx) => (
                <div
                    className="-mr-4  relative group"
                    key={item.name}
                    onMouseEnter={() => setHoveredIndex(item.id)}
                    onMouseLeave={() => setHoveredIndex(null)}
                >
                    <AnimatePresence mode="wait">
                        {hoveredIndex === item.id && (
                            <motion.div
                                initial={{ opacity: 0, y: 20, scale: 0.6 }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                    scale: 1,
                                    transition: {
                                        type: "spring",
                                        stiffness: 260,
                                        damping: 10,
                                    },
                                }}
                                exit={{ opacity: 0, y: 20, scale: 0.6 }}
                                style={{
                                    translateX: translateX,
                                    rotate: rotate,
                                    whiteSpace: "nowrap",
                                }}
                                className="absolute -top-16 -left-1/2 translate-x-1/2 flex text-xs  flex-col items-center justify-center rounded-md bg-black z-50 shadow-xl px-4 py-2"
                            >
                                <div className="absolute inset-x-10 z-30 w-[20%] -bottom-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent h-px " />
                                <div className="absolute left-10 w-[40%] z-30 -bottom-px bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px " />
                                <div className="font-bold text-white relative z-30 text-base">
                                    {item.name}
                                </div>
                                <div className="text-white text-xs">{item.role}</div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <Image
                        onMouseMove={handleMouseMove}
                        onClick={() => showModal(idx)}
                        height={100}
                        width={100}
                        src={`${item.imageUrl}`}
                        alt={item.name}
                        className="object-cover !m-0 !p-0 object-top rounded-full h-20 w-20 border-4 group-hover:scale-105 group-hover:z-30 border-white  relative transition duration-500"
                    />
                    <Modal open={openModalIndex === idx} className='ant-modal-content' footer={null} closable={false} width="400px">
                        <FaTimes className='absolute -top-6 -right-6 z-40 text-white text-xl cursor-pointer  ' onClick={handleCancel} />
                        <div className='bg-white rounded-2xl overflow-hidden'>
                            <div className="flex flex-col w-full h-[180px]">
                                <div className="bg-secondary basis-5/12 relative">
                                    <div className="absolute right-4 bottom-4">
                                        <div className="bg-white text-secondary w-fit h-fit shadow-xl rounded-full px-2 py-[2px] text-xs">
                                            {item.joined_year} Joined
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white basis-7/12 flex gap-2 items-center p-4 pt-0">
                                    <div className="border-[5px] border-white relative -mt-16 overflow-hidden rounded-full">
                                        <img src={`${item.imageUrl}`} alt={item.name} className="w-24 h-24 rounded-full object-cover" />
                                    </div>
                                    <div className="ml-2">
                                        <p className="capitalize text-lg font-semibold">{item.name}</p>
                                        <p className="text-black text-sm font-medium">{item.role}</p>
                                        <div className='flex gap-4 mt-2'>
                                            <FaInstagram className='text-secondary text-lg cursor-pointer transition-all ease-in-out duration-500 hover:-translate-y-1 ' onClick={handleSocial(item.social.instagram)} />
                                            <FiGithub className='text-secondary text-lg cursor-pointer transition-all ease-in-out duration-500 hover:-translate-y-1 ' onClick={handleSocial(item.social.github)} />
                                            <SlSocialLinkedin className='text-secondary text-lg cursor-pointer transition-all ease-in-out duration-500 hover:-translate-y-1 ' onClick={handleSocial(item.social.linkedin)} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </Modal>
                </div>
            ))}
        </>
    );
};


