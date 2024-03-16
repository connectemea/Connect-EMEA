"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Team', href: '/team' },
  { name: 'Event', href: '/event' },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      <div className=" bg-custom-bg nav-border ">
        <div className='custom-container flex justify-between items-center nav-bar'>
          {/* left section */}
        <div>
          <img src="/logo.png" alt="logo" />
        </div>
        {/* center section */}
        <div className="flex justify-between items-center gap-4">
          {links.map((link) => (
            <Link key={link.name} href={link.href}>
              <p
                className={`flex text-white h-8 justify-center items-center gap-2 rounded-md p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 ${
                  pathname === link.href ? 'bg-black/50 text-blue-600' : ''
                }`}
              >
                {link.name}
              </p>
            </Link>
          ))}
        </div>
        {/* right section */}
        <div className='flex gap-2 items-center justify-center'>
          <img src='/icons/bell.png' alt='notification' />
          <button className="p-2 bg-blue-600 text-white rounded-md">Sign In</button>
        </div>
      </div>
      </div>

    </>
  );
}
