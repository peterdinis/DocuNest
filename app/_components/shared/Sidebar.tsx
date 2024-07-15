'use client';

import { FC, useState } from 'react';
import classNames from 'classnames';
import { XCircle, Menu, LogOut, Upload, Files } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { signOut, useSession } from 'next-auth/react';
import { Button, Tooltip } from '@nextui-org/react';

const Sidebar: FC = () => {
    const [collapsed, setSidebarCollapsed] = useState(false);
    const router = useRouter();
    const { data: session } = useSession();

    const loggedUser = session?.user;

    const logoutUser = () => {
        signOut();
        toast.success('Successfull logout');
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
                {collapsed === false ? (
                    <>
                        <div>
                            <div className='mt-8'>
                                <div className='mt-8'>
                                    <Button
                                        variant={'ghost'}
                                        value='sm'
                                        onClick={logoutUser}
                                    >
                                        <LogOut onClick={logoutUser} />
                                        Logout
                                    </Button>
                                </div>{' '}
                            </div>

                            <div className='mt-8'>
                                <Button variant={'ghost'} value='sm'>
                                    <Upload />
                                    <Link href='/upload'>Upload new file</Link>
                                </Button>
                            </div>

                            <div className='mt-8'>
                                <Button variant={'ghost'} value='sm'>
                                    <Files />
                                    <Link href='/files'>My all files</Link>
                                </Button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div>
                        <div className='mt-8'>
                            <div className='mt-8'>
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
                            <div className='mt-8'>
                                <Tooltip
                                    showArrow={true}
                                    content='Upload new file'
                                >
                                    <Button variant={'ghost'} size={'sm'}>
                                        <Link href='/upload'>
                                            <Upload />
                                        </Link>
                                    </Button>
                                </Tooltip>
                            </div>
                            <div className='mt-8'>
                                <Tooltip showArrow={true} content='All Files'>
                                    <Button variant={'ghost'} size={'sm'}>
                                        <Link href='/files'>
                                            <Files />
                                        </Link>
                                    </Button>
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Sidebar;
