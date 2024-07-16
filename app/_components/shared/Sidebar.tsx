'use client';

import { FC, useState } from 'react';
import classNames from 'classnames';
import {
    XCircle,
    Menu,
    LogOut,
    Upload,
    Files,
    Folder,
    FolderCheck,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { signOut } from 'next-auth/react';
import { Button, Tooltip } from '@nextui-org/react';
import { motion } from 'framer-motion';
import CreateFolderModal from '../folders/CreateFolderModal';

const Sidebar: FC = () => {
    const [collapsed, setSidebarCollapsed] = useState(false);
    const router = useRouter();

    const logoutUser = () => {
        signOut();
        toast.success('Successful logout');
        router.push('/login');
    };

    return (
        <div
            className={classNames({
                'grid min-h-screen': true,
                'grid-cols-sidebar': !collapsed,
                'grid-cols-sidebar-collapsed': collapsed,
                'transition-[grid-template-columns] duration-300 ease-in-out':
                    true,
            })}
        >
            <div className='bg-white text-black'>
                <button onClick={() => setSidebarCollapsed((prev) => !prev)}>
                    {collapsed === true ? (
                        <Menu className='h-7 w-7' />
                    ) : (
                        <XCircle className='h-7 w-7' />
                    )}
                </button>
                <motion.div
                    initial={{ width: collapsed ? 100 : 240 }}
                    animate={{ width: collapsed ? 100 : 240 }}
                    transition={{ duration: 0.3 }}
                    className='overflow-hidden'
                >
                    {collapsed === false ? (
                        <>
                            <div>
                                <span className='prose-span: prose ml-5 mt-4 p-2 text-xl font-bold'>
                                    Docu Nest
                                </span>
                                <div className='mt-8'>
                                    <div className='ml-4 mt-8'>
                                        <Button
                                            variant={'ghost'}
                                            value='sm'
                                            onClick={logoutUser}
                                        >
                                            <LogOut onClick={logoutUser} />
                                            Logout
                                        </Button>
                                    </div>
                                </div>
                                <div className='ml-4 mt-8'>
                                    <Button variant={'ghost'} value='sm'>
                                        <Upload />
                                        <Link href='/documents/new'>
                                            Create new document
                                        </Link>
                                    </Button>
                                </div>
                                <div className='ml-4 mt-8'>
                                    <Button variant={'ghost'} value='sm'>
                                        <Folder />
                                        <CreateFolderModal
                                            btnName={'Create new folder'}
                                        />
                                    </Button>
                                </div>
                                <div className='ml-4 mt-8'>
                                    <Button variant={'ghost'} value='sm'>
                                        <FolderCheck />
                                        <Link href='/folders/all'>
                                            All my folders
                                        </Link>
                                    </Button>
                                </div>
                                <div className='ml-4 mt-8'>
                                    <Button variant={'ghost'} value='sm'>
                                        <Files />
                                        <Link href='/dashboard'>
                                            All my documents
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div>
                            <div className='mt-8'>
                                <div className='ml-4 mt-8'>
                                    <Tooltip showArrow={true} content='Logout'>
                                        <Button
                                            onClick={logoutUser}
                                            variant={'ghost'}
                                            size={'sm'}
                                        >
                                            <LogOut />
                                        </Button>
                                    </Tooltip>
                                </div>
                                <div className='ml-4 mt-8'>
                                    <Tooltip
                                        showArrow={true}
                                        content='Create new folder'
                                    >
                                        <Button variant={'ghost'} size={'sm'}>
                                            <Folder />
                                            <CreateFolderModal btnName='' />
                                        </Button>
                                    </Tooltip>
                                </div>
                                <div className='ml-4 mt-8'>
                                    <Tooltip
                                        showArrow={true}
                                        content='Create new document'
                                    >
                                        <Button variant={'ghost'} size={'sm'}>
                                            <Link href='/documents/new'>
                                                <Upload />
                                            </Link>
                                        </Button>
                                    </Tooltip>
                                </div>
                                <div className='ml-4 mt-8'>
                                    <Tooltip
                                        showArrow={true}
                                        content='All my folders'
                                    >
                                        <Button variant={'ghost'} size={'sm'}>
                                            <Link href='/folders/all'>
                                                <FolderCheck />
                                            </Link>
                                        </Button>
                                    </Tooltip>
                                </div>
                                <div className='ml-4 mt-8'>
                                    <Tooltip
                                        showArrow={true}
                                        content='All my documents'
                                    >
                                        <Button variant={'ghost'} size={'sm'}>
                                            <Link href='/dashboard'>
                                                <Files />
                                            </Link>
                                        </Button>
                                    </Tooltip>
                                </div>
                            </div>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default Sidebar;
