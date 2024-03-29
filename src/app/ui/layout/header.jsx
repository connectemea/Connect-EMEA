'use client';
import React, { useRef } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Link as ScrollLink } from 'react-scroll';
import { useRouter } from 'next/navigation';
import '../styles/style.css';
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
                        <Link key={link.name} href={link.href} onClick={ShowNavbar} className={` p-2 rounded-lg ${pathname === link.href ? ' active-nav' : 'unactive-nav'
                            }`}>
                            <p
                                className={`flex text-color h-8 justify-center items-center gap-2 rounded-md p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 `}
                            >
                                {link.name}
                            </p>
                        </Link>
                    ))}
                    <button onClick={ShowNavbar} className='nav-btn nav-close-btn'>
                        <FaTimes />
                    </button>
                </nav>
                <button onClick={ShowNavbar} className='nav-btn'>
                    <FaBars />
                </button>
                <div className='flex gap-2 items-center justify-center responsive-hide'>
                    <img src='/icons/bell.png' alt='notification' />
                    <button className="p-2 bg-blue-600 text-white rounded-md">
                        <Link href='/adminpanel'>Admin</Link>
                    </button>
                </div>
            </div>
        </header>
    );

}

export default Header;