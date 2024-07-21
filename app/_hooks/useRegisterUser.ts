'use client';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const useRegisterUser = () => {
    const router = useRouter();

    return useMutation({
        mutationKey: ['registerUser'],
        mutationFn: async (data: any) => {
            await axios.post('/api/register', data);
        },
        onSuccess: () => {
            toast.success('Registration successful');
            router.push('/login');
        },
        onError: () => {
            toast.error('Registration failed');
        },
    });
};

export default useRegisterUser;
