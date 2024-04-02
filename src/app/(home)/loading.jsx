import React from 'react';
import Preloader from '@/app/ui/Preloader/loader';

const Loading = () => {
    return (
        <div className="loading h-screen flex items-center justify-center ">
            <Preloader />
            {/* Add any additional loading animations or messages here */}
        </div>
    );
};

export default Loading;