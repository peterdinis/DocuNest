'use client';

import { FC } from 'react';
import Header from '../shared/Header';
import { Card, CardBody, CardHeader, Checkbox } from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import useUserDetail from '@/app/_hooks/useUserDetail';
import { format } from 'date-fns';
import Loading from '../shared/Loading';
import { Check } from 'lucide-react';

const SettingsContent: FC = () => {
    const { data: session } = useSession();

    const { data, isLoading, isError } = useUserDetail({
        id: session?.user.id,
    });

    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        return (
            <p className='text-xl font-bold text-red-800'>
                Something went wrong
            </p>
        );
    }

    return (
        <div className='flex h-screen w-full flex-col'>
            <Header text='Settings' />
            <main className='w-full flex-1 overflow-auto p-6 sm:p-8 lg:p-10'>
                <section>
                    <Card className='rounded-lg bg-white p-6 shadow dark:bg-zinc-800'>
                        <CardHeader className='mb-6 text-xl font-semibold'>
                            General
                        </CardHeader>
                        <CardBody className='grid gap-8'>
                            <div className='grid gap-4'>
                                <label
                                    htmlFor='theme'
                                    className='block text-sm font-bold text-gray-700 dark:text-white'
                                >
                                    Used AI Functions
                                </label>
                                15 / 100
                            </div>
                            <div className='grid gap-4'>
                                <label
                                    htmlFor='font-size'
                                    className='block text-sm font-bold text-gray-700 dark:text-white'
                                >
                                    Profile Informations
                                </label>
                                Email: {session?.user?.email}
                            </div>

                            <div className='grid gap-4'>
                                Name: {session?.user?.name}
                            </div>

                            <div className='grid gap-4'>
                                <label
                                    htmlFor='font-size'
                                    className='block text-sm font-bold text-gray-700 dark:text-white'
                                >
                                    Has Subscription
                                </label>
                                <Checkbox defaultSelected icon={<Check/>} />
                            </div>

                            <div className='grid gap-4'>
                                <label
                                    htmlFor='font-size'
                                    className='block text-sm font-bold text-gray-700 dark:text-white'
                                >
                                    Created Account
                                </label>
                                {format(data.createdAt, 'yyyy-MM-dd')}
                            </div>

                            <div className='grid gap-4'>
                                <label
                                    htmlFor='font-size'
                                    className='block text-sm font-bold text-gray-700 dark:text-white'
                                >
                                    Created documents
                                </label>
                                {data.documents.length}
                            </div>

                            <div className='grid gap-4'>
                                <label
                                    htmlFor='font-size'
                                    className='block text-sm font-bold text-gray-700 dark:text-white'
                                >
                                    Created folders
                                </label>
                                {data.folders.length}
                            </div>
                        </CardBody>
                    </Card>
                </section>
            </main>
        </div>
    );
};

export default SettingsContent;
