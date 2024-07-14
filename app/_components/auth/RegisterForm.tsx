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
import { FC, ReactNode} from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from './schemas';
import { toast } from 'react-toastify';

const RegisterForm: FC = () => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: zodResolver(registerSchema),
    });

    const registerUserMut = useMutation({
        mutationKey: ['registerUser'],
        mutationFn: async (data: any) => {
            await axios.post('/api/register', data);
        },
        onSuccess: () => {
            toast.success('Register Done');
            router.push('/login');
        },
        onError: () => {
            toast.error('Register Failed');
        },
    });

    const onSubmit = (data: any) => {
        registerUserMut.mutate(data);
        reset();
    };
    return (
        <div className='flex h-screen flex-col items-center justify-center'>
            <Card className='w-full max-w-md'>
                <CardHeader className='text-center text-2xl'>
                    Register
                </CardHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <CardBody className='space-y-4'>
                        <div className='space-y-2'>
                            <div>Name</div>
                            <Input
                                id='name'
                                type='text'
                                placeholder='Your name'
                                required
                                {...register('name')}
                            />
                            {errors.name && (
                                <p className='font-bold text-red-600'>
                                    {
                                        errors.name
                                            .message as unknown as ReactNode
                                    }
                                </p>
                            )}
                        </div>

                        <div className='space-y-2'>
                            <div>Email</div>
                            <Input
                                id='email'
                                type='email'
                                placeholder='Your email'
                                required
                                {...register('email')}
                            />
                            {errors.email && (
                                <p className='font-bold text-red-600'>
                                    {
                                        errors.email
                                            .message as unknown as ReactNode
                                    }
                                </p>
                            )}
                        </div>

                        <div className='space-y-2'>
                            <div>Password</div>
                            <Input
                                id='password'
                                {...register('password')}
                                type='password'
                                required
                            />

                            {errors.password && (
                                <p className='font-bold text-red-600'>
                                    {
                                        errors.password
                                            .message as unknown as ReactNode
                                    }
                                </p>
                            )}
                        </div>
                    </CardBody>
                    <CardFooter className='flex flex-col space-y-2'>
                        <Button color="primary" className='w-full'>Register</Button>
                    </CardFooter>
                </form>
            </Card>
            <div className='mt-4'>
                <span className='text-sm'>Don't have an account? </span>
                <Link
                    href='/register'
                    className='text-sm text-blue-500'
                    prefetch={false}
                >
                    Sign up
                </Link>
            </div>
        </div>
    );
};

export default RegisterForm;
