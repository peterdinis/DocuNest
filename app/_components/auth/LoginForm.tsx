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
import { FieldValues, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from './schemas';
import { toast } from 'react-toastify';
import { Eye, EyeOff } from 'lucide-react';

const LoginForm: FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(loginSchema),
    });
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const loginUser = async (data: FieldValues) => {
        setLoading(true);

        try {
            const result = await signIn('credentials', {
                ...data,
                redirect: false,
            });

            if (result?.error) {
                toast.error('Login error: ' + result.error);
            } else {
                toast.success('Login successful!');
                router.push('/dashboard');
            }
        } catch (error) {
            toast.error('An unexpected error occurred.');
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
                            {errors.email && (
                                <p className='font-bold text-red-600'>
                                    {errors.email.message as ReactNode}
                                </p>
                            )}
                        </div>
                        <div className='space-y-2'>
                            <div>Password</div>
                            <Input
                                placeholder='Enter your password'
                                {...register('password')}
                                disabled={loading}
                                endContent={
                                    <button
                                        type='button'
                                        onClick={toggleVisibility}
                                    >
                                        {isVisible ? (
                                            <EyeOff className='pointer-events-none text-2xl text-default-400' />
                                        ) : (
                                            <Eye className='pointer-events-none text-2xl text-default-400' />
                                        )}
                                    </button>
                                }
                                type={isVisible ? 'text' : 'password'}
                            />
                            {errors.password && (
                                <p className='font-bold text-red-600'>
                                    {errors.password.message as ReactNode}
                                </p>
                            )}
                        </div>
                    </CardBody>
                    <CardFooter className='flex flex-col space-y-2'>
                        <Button
                            type='submit'
                            color='primary'
                            className='w-full'
                            disabled={loading}
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
            <div className='mt-4'>
                <span className='text-sm'>Don't have an account? </span>
                <Link
                    href='/register'
                    className='ml-4 text-sm text-blue-500'
                    prefetch={false}
                >
                    Register
                </Link>
            </div>
        </div>
    );
};

export default LoginForm;
