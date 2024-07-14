"use client"

import {
    Card,
    CardHeader,
    CardFooter,
    Button,
    Input,
    CardBody,
} from '@nextui-org/react';
import Link from 'next/link';
import { FC } from 'react';

const LoginForm: FC = () => {
    return (
        <div className='flex h-screen flex-col items-center justify-center'>
            <Card className='w-full max-w-md'>
                <CardHeader className='text-center text-2xl'>Login</CardHeader>
                <CardBody className='space-y-4'>
                    <div className='space-y-2'>
                        <div>Email</div>
                        <Input
                            id='email'
                            type='email'
                            placeholder='m@example.com'
                            required
                        />
                    </div>
                    <div className='space-y-2'>
                        <div>Password</div>
                        <Input id='password' type='password' required />
                    </div>
                </CardBody>
                <CardFooter className='flex flex-col space-y-2'>
                    <Button className='w-full'>Login</Button>
                    <Link
                        href='#'
                        className='text-center text-sm'
                        prefetch={false}
                    >
                        Forgot Password?
                    </Link>
                </CardFooter>
            </Card>
            <div className='mt-4'>
                <span className='text-sm'>Don't have an account? </span>
                <Link
                    href='#'
                    className='text-sm text-blue-500'
                    prefetch={false}
                >
                    Sign up
                </Link>
            </div>
        </div>
    );
};

export default LoginForm;
