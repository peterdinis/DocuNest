"use client"

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FC, ReactNode, useEffect } from "react";
import Loading from "../shared/Loading";

interface ISessionCheckHelperProps {
    children?: ReactNode;
}

const SessionCheckHelper: FC<ISessionCheckHelperProps> = ({children}: ISessionCheckHelperProps) => {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === 'loading') return;
        if (!session) {
            router.push('/login');
        }
    }, [session, status, router]);

    if (status === 'loading') {
        return <Loading />;
    }
    
    if (session) {
        return <>{children}</>;
    }

    return children;
}

export default SessionCheckHelper;