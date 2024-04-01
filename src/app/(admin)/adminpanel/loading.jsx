import React from 'react';
import Preloader from '../../ui/Preloader';

const Loading = () => {
    return (
        <div className="loading h-screen flex items-center justify-center bg-primary rounded-xl">
            <Preloader />
            {/* Add any additional loading animations or messages here */}
        </div>
    );
};

export default Loading;