'use client';

import { FC, ReactNode } from 'react';

interface IServiceCardProps {
    icon: ReactNode;
    iconHeaderText: string;
    iconHeaderDesc: string;
}

const ServiceCard: FC<IServiceCardProps> = ({
    icon,
    iconHeaderDesc,
    iconHeaderText,
}: IServiceCardProps) => {
    return (
        <div className='group relative rounded-3xl border border-gray-100 bg-white p-8 shadow-2xl shadow-gray-600/10 transition duration-300 hover:border-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:shadow-none dark:hover:border-gray-700 dark:hover:bg-gray-800 sm:flex sm:gap-8 lg:border-transparent lg:shadow-transparent lg:hover:shadow-gray-600/10 dark:lg:bg-transparent'>
            <div className='relative'>
                <span className='h-10 w-10 text-gray-800 dark:text-white'>
                    {icon}
                </span>
                <h3 className='mb-4 mt-8 text-2xl font-semibold text-gray-800 transition dark:text-white'>
                    {iconHeaderText}
                </h3>
                <p className='text-gray-600 dark:text-gray-300'>
                    {iconHeaderDesc}
                </p>
            </div>
        </div>
    );
};

export default ServiceCard;
