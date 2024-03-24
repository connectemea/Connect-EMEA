import React from 'react';
import { MacbookScrollDemo } from '../ui/Home/Macbook';


const About: React.FC = () => {
    return (
        <div className='bg-primary min-h-screen py-20 text-white text-center mx-auto flex items-center flex-col'>
            <h1>Hello, World!</h1>
            <h1>About Page</h1>
            <p>Welcome to the About page of our application!</p>
            <div className='overflow-hidden '>
        <MacbookScrollDemo />
      </div>
        <img src="/Visual.png" alt="macbook" className="" />
        </div>
    );
};

export default About;