"use client";
import Image from "next/image";
import React, { useState } from "react";
import {
    motion,
    useTransform,
    AnimatePresence,
    useMotionValue,
    useSpring,
} from "framer-motion";

export const AnimatedTooltip = ({
    items,
}: {
    items: {
        id: number;
        name: string;
        image: string;
        profession: string;
        role: string;
        social: { linkedin: string; github: string; instagram: string };
        department: string;
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
    const handleMouseMove = (event: any) => {
        const halfWidth = event.target.offsetWidth / 2;
        x.set(event.nativeEvent.offsetX - halfWidth); // set the x value, which is then used in transform and rotate
    };
    const handleSocial = (url: string) => () => {
        window.open(url, '_blank');
    }

    return (
        <div className="flex flex-wrap items-center justify-center">
            {items.map((item, idx) => (
                <div
                    className="-mr-4  relative group"
                    key={item.id}
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
                                className="absolute -top-24 -left-1/2 translate-x-1/2 flex text-xs  flex-col items-center justify-center rounded-md bg-black z-50 shadow-xl px-4 py-2 w-fit"
                            >
                                <div className="absolute inset-x-10 z-30 w-[20%] -bottom-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent h-px " />
                                <div className="absolute left-10 w-[40%] z-30 -bottom-px bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px " />
                                <div className="font-bold text-white relative z-30 text-base">
                                    {item.name}
                                </div>
                                {/* <p>{item.profession}</p> */}
                                <div className="text-white text-xs">{item.role}</div>
                                <div className='flex gap-2 relative z-30 text-base'>
                                    <img src='/icons/instagram.png' alt='instagram' className='cursor-pointer transition-all ease-in-out duration-500 hover:-translate-y-1 p-2' onClick={() => window.open(item.social.instagram, '_blank')} />
                                    <img src='/icons/github.png' alt='github' className='cursor-pointer transition-all ease-in-out duration-500 hover:-translate-y-1 p-2' onClick={() => window.open(item.social.github, '_blank')} />
                                    <img src='/icons/linkedin.png' alt='linkedin' className='cursor-pointer transition-all ease-in-out duration-500 hover:-translate-y-1 p-2' onClick={() => window.open(item.social.linkedin, '_blank')} />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <Image
                        onMouseMove={handleMouseMove}
                        height={100}
                        width={100}
                        src={`/Images/${item.image}`}
                        alt={item.name}
                        onClick={handleSocial(item.social.linkedin)}
                        className="object-cover !m-0 !p-0 object-top rounded-full h-20 md:h-24 w-20 md:w-24 border-4 group-hover:scale-105 group-hover:z-30 border-white  relative transition duration-500"
                    />
                </div>
            ))}
        </div>
    );
};
