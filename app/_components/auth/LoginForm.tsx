'use client';

import {
    Card,
    CardHeader,
    CardFooter,
    Button,
    Input,
    CardBody,
} from '@nextui-org/react';
import Link from 'next/link';
import { FC, ReactNode, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from './schemas';
import { toast } from 'react-toastify';

const LoginForm: FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(loginSchema),
    });
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const loginUser = async (data: any) => {
        setLoading(true);

        try {
            const result = await signIn('credentials', {
                ...data,
                redirect: false,
            });

            if (result?.error) {
                toast.error('Login error');
            } else {
                toast.success('Login DONE');
                router.push('/dashboard');
            }
        } catch (error) {
            toast.error('Login error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='flex h-screen flex-col items-center justify-center'>
            <Card className='w-full max-w-md'>
                <CardHeader className='text-center text-2xl'>Login</CardHeader>
                <form onSubmit={handleSubmit(loginUser)}>
                    <CardBody className='space-y-4'>
                        <div className='space-y-2'>
                            <div>Email</div>
                            <Input
                                id='email'
                                type='email'
                                placeholder='m@example.com'
                                required
                                disabled={loading}
                                {...register('email')}
                            />
                        </div>
                        <div className='space-y-2'>
                            <div>Password</div>
                            <Input
                                disabled={loading}
                                {...register('password')}
                                id='password'
                                type='password'
                                required
                            />
                        </div>
                    </CardBody>
                    <CardFooter className='flex flex-col space-y-2'>
                        <Button color="primary" className='w-full'>Login</Button>
                    </CardFooter>
                </form>
            </Card>
            <div className='mt-4'>
                <span className='text-sm'>Don't have an account? </span>
                <Link
                    href='/register'
                    className='text-sm text-blue-500 ml-4'
                    prefetch={false}
                >
                    Register
                </Link>
            </div>
        </div>
    );
};

export default LoginForm;
