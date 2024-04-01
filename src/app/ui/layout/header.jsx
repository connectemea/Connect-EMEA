'use client';
import React, { useRef, useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Link as ScrollLink } from 'react-scroll';
import { useRouter } from 'next/navigation';
import '../styles/style.css';
import { Avatar, Flex, Segmented } from 'antd';
import { UserOutlined } from '@ant-design/icons';
const links = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Team', href: '/team' },
    { name: 'Event', href: '/event' },
];

function Header() {
    const router = useRouter();
    const pathname = usePathname();
    const navRef = useRef();
    const ShowNavbar = () => {
        navRef.current.classList.toggle('responsive_nav');
    }
    const handleLogo = () => {
        // if commant this not need to redirect to home page 
        // only need to scroll to top of current page
        if (pathname !== '/') {
            router.push('/');
        }
    }
    return (
        <header className='flex items-center justify-between h-[80px] p-4 bg-primary nav-border z-50'>
            <div className='custom-container flex justify-between items-center'>
                <div className='cursor-pointer'>
                    <ScrollLink to='top' smooth={true} duration={500} offset={-70} onClick={handleLogo}>
                        <img src="/logo.png" alt="logo" />
                    </ScrollLink>
                </div>
                
                <nav ref={navRef} >
                    {links.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={ShowNavbar}
                            className={`p-2 rounded-lg ${pathname === link.href ? 'active-nav active-nav-line' : 'unactive-nav'
                                }`}
                        >
                            <p
                                className={`flex text-color h-8 justify-center items-center gap-2 rounded-md p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600`}
                            >
                                {link.name}
                            </p>
                        </Link>
                    ))}
                    <button onClick={ShowNavbar} className='nav-btn nav-close-btn'>
                        <FaTimes />
                    </button>
                </nav>

                <button onClick={ShowNavbar} className='nav-btn text-2xl'>
                    <FaBars className='text-2xl w-24'/>
                </button>
                <div className='flex items-center justify-end '>
                    <Link href='/adminpanel'>
                        <div className='text-white boxShadow flex-end'>
                            Admin
                            {/* responsive-hide */}
                            {/* <div className="box"></div> */}
                        </div>
                    </Link>
                </div>
            </div>
            <div>
            </div>
        </header>
    );

}

export default Header;