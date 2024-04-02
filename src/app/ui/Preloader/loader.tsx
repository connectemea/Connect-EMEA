import React from 'react';

const Preloader: React.FC = () => {
    return (
        <div className="flex items-center justify-center mx-auto ">
            <img src='/Logos/loading.gif' alt='loading' />
        </div>
    );
};

export default Preloader; 

