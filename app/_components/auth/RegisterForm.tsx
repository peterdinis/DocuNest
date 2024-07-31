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
import { FC, useState } from 'react';
import { useForm, FieldValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from './schemas';
import { Eye, EyeOff } from 'lucide-react';
import useRegisterUser from '@/app/_hooks/users/useRegisterUser';

const RegisterForm: FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: zodResolver(registerSchema),
    });

    const { mutate: registerUserMut, isPending } = useRegisterUser();

    const toggleVisibility = () => setIsVisible(!isVisible);

    const onSubmit = (data: FieldValues) => {
        registerUserMut(data);
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
                                    Name is Required
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
                                    Email is Required
                                </p>
                            )}
                        </div>

                        <div className='space-y-2'>
                            <div>Password</div>
                            <Input
                                id='password'
                                placeholder='Enter your password'
                                {...register('password')}
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
                                    Password is required
                                </p>
                            )}
                        </div>
                    </CardBody>
                    <CardFooter className='flex flex-col space-y-2'>
                        <Button
                            type='submit'
                            color='primary'
                            className='w-full'
                            disabled={isPending}
                        >
                            {isPending ? 'Registering...' : 'Register'}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
            <div className='mt-4'>
                <span className='text-sm'>Already have an account?</span>
                <Link
                    href='/login'
                    className='ml-4 text-sm text-blue-500'
                    prefetch={false}
                >
                    Login
                </Link>
            </div>
        </div>
    );
};

export default RegisterForm;
