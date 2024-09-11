'use client';

import { ThemeProvider } from 'next-themes';
import { FC, ReactNode, Suspense } from 'react';
import { ToastContainer } from 'react-toastify';
import SessionCheckHelper from '../auth/SessionCheckHelper';
import Loading from './Loading';
import NextUiProvider from './providers/NextUiProvider';
import QueryProvider from './providers/QueryProvider';
import SessionAppProvider from './providers/SessionProvider';
import ScrollToTop from './ScrollToTop';
import Transition from './Transition';
import Navigation from './Navigation';

interface IProviderProps {
    children?: ReactNode;
}

const Providers: FC<IProviderProps> = ({ children }) => {
    return (
        <NextUiProvider>
            <Suspense fallback={<Loading />}>
                <ThemeProvider>
                    <QueryProvider>
                        <SessionAppProvider>
                            <SessionCheckHelper>
                                <Transition>
                                    <Navigation />
                                    {children}
                                    <ToastContainer
                                        closeOnClick
                                        pauseOnHover
                                        draggable
                                    />
                                    <ScrollToTop />
                                </Transition>
                            </SessionCheckHelper>
                        </SessionAppProvider>
                    </QueryProvider>
                </ThemeProvider>
            </Suspense>
        </NextUiProvider>
    );
};

export default Providers;
