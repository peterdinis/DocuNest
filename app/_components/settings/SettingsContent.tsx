'use client';

import { FC } from 'react';
import Header from '../shared/Header';
import { Card, CardBody, CardHeader } from '@nextui-org/react';
import { useSession } from 'next-auth/react';

const SettingsContent: FC = () => {
    const { data: session } = useSession();
    return (
        <div className='flex h-screen w-full flex-col'>
            <Header text='Settings' />
            <main className='w-full flex-1 overflow-auto p-6 sm:p-8 lg:p-10'>
                <section>
                    <Card className='rounded-lg bg-white p-6 shadow'>
                        <CardHeader className='mb-6 text-lg font-semibold'>
                            General
                        </CardHeader>
                        <CardBody className='grid gap-8'>
                            <div className='grid gap-4'>
                                <label
                                    htmlFor='theme'
                                    className='block text-sm font-medium text-gray-700'
                                >
                                    Used AI Functions
                                </label>
                                15 / 100
                            </div>
                            <div className='grid gap-4'>
                                <label
                                    htmlFor='font-size'
                                    className='block text-sm font-medium text-gray-700'
                                >
                                    Profile Informations
                                </label>
                                Email: {session?.user?.email}
                            </div>

                            <div className='grid gap-4'>
                                Name: {session?.user?.name}
                            </div>
                        </CardBody>
                    </Card>
                </section>
            </main>
        </div>
    );
};

export default SettingsContent;
