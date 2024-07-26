'use client';

import { FC } from 'react';

const NotAllowedWrapper: FC = () => {
    return (
        <div className='flex min-h-screen flex-col items-center justify-center'>
            <div className='mt-20'>
                <p className='text-4xl font-bold'>
                    You must be logged in first
                </p>
            </div>
            <button className='mt-8 rounded bg-blue-500 px-4 py-2 text-white'>
                <a className='text-xl' href='/login'>
                    Login
                </a>
            </button>
        </div>
    );
};

export default NotAllowedWrapper;
