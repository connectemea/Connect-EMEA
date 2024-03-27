"use client";
import React, { useState } from 'react';

interface FormData {
    // Define the properties of your form data here
    // For example:
    name: string;
    email: string;
    password: string;
}

const Page: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        // Initialize the form data here
        name: '',
        email: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log(formData);
    };

    return (
        <div className='min-h-screen bg-primary  py-20'>
            <div className=' max-w-md mx-auto p-10 rounded-md shadow-md bg-secondary'>

            <h1>Form Page</h1>
            <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
          <input type="text" id="name" className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
          <input type="email" id="email" className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message:</label>
          <textarea id="message" className="mt-1 p-2 border border-gray-300 rounded-md w-full h-32 resize-none"></textarea>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Submit</button>
      </form>
      </div>

        </div>
    );
};

export default Page;