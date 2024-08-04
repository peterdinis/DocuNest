'use client';

import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { FC, ReactNode, useEffect } from 'react';
import Loading from '../shared/Loading';

interface ISessionCheckHelperProps {
    children?: ReactNode;
}

const SessionCheckHelper: FC<ISessionCheckHelperProps> = ({
    children,
}: ISessionCheckHelperProps) => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (status === 'loading') return;

        // If session is not available and user is trying to access a protected route, redirect to login
        if (!session && pathname !== '/' && pathname !== '/register') {
            router.push('/login');
        }
    }, [session, status, router, pathname]);

    if (status === 'loading') {
        return <Loading />;
    }

    // Render children if session exists or if accessing public routes
    if (session || pathname === '/' || pathname === '/register') {
        return <>{children}</>;
    }

    // Optionally, you might return null if none of the above conditions are met
    return children
};

export default SessionCheckHelper;