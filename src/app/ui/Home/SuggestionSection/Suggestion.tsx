import React from 'react';
import Link from 'next/link';

const Suggestion: React.FC = () => {
    const handleSuggestion = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const email = formData.get('email') as string;
        const message = formData.get('message') as string;

        console.log('Email:', email);
        console.log('Message:', message);

        alert('Thank you for your feedback');
        // Reset the form
        e.currentTarget.reset();
    };

    return (
        <div className="min-h-[450px] bg-white/10 backdrop-blur  text-center px-2 flex  w-full rounded-xl shadow border border-gray-50  flex-col md:flex-row">
            <div className='flex items-end justify-center basis-1/2  rounded-lg '>
                <img src="/Images/suggestion.png" alt="macbook" className="w-full" />
            </div>
            <div className='flex flex-col  gap-8 basis-1/2 border w-full justify-center bg-cream my-3 md:my-10 p-10 md:mx-6 rounded-lg '>
                <h1 className="text-4xl bg-gradient-to-b text-transparent bg-clip-text from-violet to-dark-violet font-extrabold">Any Suggestion or Feedback</h1>
                <form className='flex flex-col gap-4' onSubmit={handleSuggestion}>
                    {/* <label htmlFor="email" className="text-lg font-semibold">Email:</label> */}
                    <input type="email" id="email" name="email" className="border rounded  border border-violet outline-none rounded-lg shadow p-3 bg-cream-light font-medium transition-all duration-300 ease-in-out hover:outline hover:outline-offset-2 hover:outline-violet hover:border-transparent " placeholder='Email' required />

                    {/* <label htmlFor="message" className="text-lg font-semibold">Message:</label> */}
                    <textarea id="message" name="message" rows={4} className="border rounded  max-h-[300px] outline-none border border-violet rounded-lg shadow p-3 bg-cream-light font-medium transition-all duration-300 ease-in-out hover:outline hover:outline-offset-2 hover:outline-violet hover:border-transparent " placeholder='Text Here' required></textarea>

                    <button type="submit" className="bg-primary-light text-white font-semibold px-4 py-3 rounded-md ">Submit</button>
                </form>
            </div>

        </div>
    );
};

export default Suggestion;
