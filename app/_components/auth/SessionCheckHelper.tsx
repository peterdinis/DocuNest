"use client";

import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { FC, ReactNode, useEffect } from "react";
import Loading from "../shared/Loading";

interface ISessionCheckHelperProps {
    children?: ReactNode;
}

const SessionCheckHelper: FC<ISessionCheckHelperProps> = ({ children }: ISessionCheckHelperProps) => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (status === 'loading') return;
        if (!session && pathname !== '/') {
            router.push('/login');
        }
    }, [session, status, router, pathname]);

    if (status === 'loading') {
        return <Loading />;
    }

    if (session || pathname === '/') {
        return <>{children}</>;
    }

    return children
}

export default SessionCheckHelper;