'use client';

import { FC } from 'react';

const NotAllowedWrapper: FC = () => {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen">
            <div className="mt-20">
                <p className="font-bold text-4xl">
                    You must be logged in first
                </p>
            </div>
            <button className="mt-8 bg-blue-500 text-white py-2 px-4 rounded">
                <a className="text-xl" href='/login'>
                    Login
                </a>
            </button>
        </div>
    );
};

export default NotAllowedWrapper;