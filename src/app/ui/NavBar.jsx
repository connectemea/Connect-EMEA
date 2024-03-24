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
  const handleNav = () => {
    const NavCard = document.querySelector('.responsive');
    const harmburger = document.querySelector('.harmburger');

    // Toggle classes
    harmburger.classList.toggle('harmburger-active');
    NavCard.classList.toggle('NavCard');

    // Add event listener to toggle classes when clicking outside the card
    const handleClickOutside = (event) => {
        if (!NavCard.contains(event.target) && !harmburger.contains(event.target)) {
            harmburger.classList.remove('harmburger-active');
            NavCard.classList.remove('NavCard');
            document.removeEventListener('click', handleClickOutside);
        }
    };

    document.addEventListener('click', handleClickOutside);
};
const handleClick = () => {
  const NavCard = document.querySelector('.responsive');
  const harmburger = document.querySelector('.harmburger');
  harmburger.classList.remove('harmburger-active');
  NavCard.classList.remove('NavCard');
}


  return (
    <>
      <div className=" bg-primary nav-border ">
        <div className='custom-container flex justify-between items-center nav-bar '>
          {/* left section */}
        <div>
          <img src="/logo.png" alt="logo" />
        </div>
        {/* center section */}
        <div className='harmburger' onClick={handleNav}>
          <div className='line line-1' />
          <div className='line line-2' />
          <div className='line line-3' />
          </div>
        <div className="Nav-list responsive">
          {links.map((link) => (
            <Link key={link.name} href={link.href} onClick={handleClick} className={` p-2 rounded-lg ${
              pathname === link.href ? ' active-nav' : 'unactive-nav'
            }`}>
              <p
                className={`flex text-color h-8 justify-center items-center gap-2 rounded-md p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 `}
              >
                {link.name}
              </p>
            </Link>
          ))}
        </div>
        {/* right section */}
        <div className='flex gap-2 items-center justify-center responsive-hide'>
          <img src='/icons/bell.png' alt='notification' />
          <button className="p-2 bg-blue-600 text-white rounded-md">Sign In</button>
        </div>
      </div>
      </div>

    </>
  );
}
