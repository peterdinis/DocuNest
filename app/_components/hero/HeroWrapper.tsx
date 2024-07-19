'use client';

import { FC, useEffect } from 'react';
import { Button } from '@nextui-org/react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const HeroWrapper: FC = () => {
    const router = useRouter();
    const { data: session } = useSession();

    useEffect(() => {
        if (session) {
            router.push('/dashboard');
        }
    }, [session, router]);

    return (
        <>
            <div className='bg-gray-100'>
                <div className='container mx-auto flex flex-col items-center py-12 sm:py-24'>
                    <div className='mb-5 w-11/12 flex-col items-center justify-center sm:mb-10 sm:w-2/3 lg:flex'>
                        <h1 className='prose-h1: prose text-center text-2xl font-black leading-7 text-gray-800 sm:text-3xl md:text-4xl md:leading-10 lg:text-5xl xl:text-6xl'>
                            Docu
                            <span className='text-indigo-700'>Nest</span>
                        </h1>
                        <p className='prose-p: prose mt-5 text-center text-sm font-bold text-gray-600 sm:mt-10 sm:text-lg lg:w-10/12'>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Temporibus corrupti esse officia in nemo
                            voluptates distinctio iure blanditiis aspernatur
                            minus perferendis quasi delectus, dolor quo repellat
                            omnis? Laudantium, reiciendis labore!
                        </p>
                    </div>
                    <div className='flex items-center justify-center'>
                        <Button size='lg' variant='solid' color='primary'>
                            <Link href='/login'>Get Started</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HeroWrapper;
