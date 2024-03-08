import React from 'react';
import Link from 'next/link';

const NavBar = () => {
    return (
        <nav className="bg-gray-800 ">
            <ul className="flex justify-between  bg-black w-full p-8">
                <li className='p-2'>
                    <Link href="/" passHref>
                        <p className="text-white hover:text-gray-300">Home</p>
                    </Link>
                </li>
                <li className='p-2'>
                    <Link href="/about" passHref>
                        <p className="text-white hover:text-gray-300">About</p>
                    </Link>
                </li>
                <li className='p-2'>
                    <Link href="/contact" passHref>
                        <p className="text-white hover:text-gray-300">Contact</p>
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;
