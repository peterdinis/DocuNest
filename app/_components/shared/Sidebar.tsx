'use client';

import { FC, useState } from 'react';
import { FileText, Menu, X, Home, Info, Briefcase, Mail } from 'lucide-react';
import { Tooltip } from '@nextui-org/tooltip';

const Sidebar: FC = () => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className='flex h-screen'>
            <aside
                className={`flex flex-col items-center border-r border-gray-200 bg-white transition-all duration-300 ${
                    isOpen ? 'w-64' : 'w-20'
                }`}
            >
                <div className='flex h-[4.5rem] w-full items-center justify-between border-b border-gray-200 p-2'>
                    <div className='flex w-full items-center justify-center'>
                        {isOpen ? (
                            <span className='ml-2 font-bold'>DocuNest</span>
                        ) : (
                            <FileText />
                        )}
                    </div>
                    <button
                        onClick={toggleSidebar}
                        className='p-2 focus:outline-none'
                    >
                        {isOpen ? (
                            <X className='h-6 w-6' />
                        ) : (
                            <Menu className='h-6 w-6' />
                        )}
                    </button>
                </div>
                <nav className='flex flex-1 flex-col gap-y-4 pt-10'>
                    <Tooltip content='Home' placement='right'>
                        <a
                            href='#home'
                            className={`group relative rounded-xl bg-gray-100 p-2 text-blue-600 hover:bg-gray-50 ${!isOpen && 'text-center'}`}
                        >
                            {isOpen ? (
                                <span>
                                    <Home className='h-6 w-6' />
                                    Home
                                </span>
                            ) : (
                                <Home className='h-6 w-6' />
                            )}
                        </a>
                    </Tooltip>
                    <Tooltip content='About' placement='right'>
                        <a
                            href='#about'
                            className={`group relative rounded-xl p-2 text-gray-400 hover:bg-gray-50 ${!isOpen && 'text-center'}`}
                        >
                            {isOpen ? (
                                <span>
                                    <Info className='h-6 w-6' />
                                    Info
                                </span>
                            ) : (
                                <Info className='h-6 w-6' />
                            )}
                        </a>
                    </Tooltip>
                    <Tooltip content='Services' placement='right'>
                        <a
                            href='#services'
                            className={`group relative rounded-xl p-2 text-gray-400 hover:bg-gray-50 ${!isOpen && 'text-center'}`}
                        >
                            {isOpen ? (
                                <span>
                                    <Briefcase className='h-6 w-6' />
                                    Services
                                </span>
                            ) : (
                                <Briefcase className='h-6 w-6' />
                            )}
                        </a>
                    </Tooltip>
                    <Tooltip content='Contact' placement='right'>
                        <a
                            href='#contact'
                            className={`group relative rounded-xl p-2 text-gray-400 hover:bg-gray-50 ${!isOpen && 'text-center'}`}
                        >
                            {isOpen ? (
                                <span>
                                    <Mail className='h-6 w-6' />
                                    Contact
                                </span>
                            ) : (
                                <Mail className='h-6 w-6' />
                            )}
                        </a>
                    </Tooltip>
                </nav>
            </aside>
        </div>
    );
};

export default Sidebar;
