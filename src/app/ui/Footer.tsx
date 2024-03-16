import React from 'react';

const Footer: React.FC = () => {
    return (
        <div className='bg-custom-bg text-white'>
            <div  className='bg-footer-bg flex flex-col w-full rounded-t-lg'>

            <section className='text-center p-4'>
                <h1>
                    Footer
                </h1>
            </section>
            <section className='flex justify-between p-4'>
                <div>
                    <h1>
                        Connect
                    </h1>
                    <h1>
                        Connect
                    </h1>
                    <h1>
                        Connect
                    </h1>
                </div>
                <div>
                    <h1>
                        About
                    </h1>
                </div>
            </section>
            </div>

        </div>
    );
};

export default Footer;