import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import NextUiProvider from './_components/shared/providers/NextUiProvider';
import Navigation from './_components/shared/Navigation';
import ScrollToTop from './_components/shared/ScrollToTop';
import ThemeProvider from './_components/shared/providers/ThemeProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-quill/dist/quill.snow.css';
import QueryProvider from './_components/shared/providers/QueryProvider';
import SessionAppProvider from './_components/shared/providers/SessionProvider';
import { Suspense } from 'react';
import Loading from './_components/shared/Loading';
import SessionCheckHelper from './_components/auth/SessionCheckHelper';
import '@uploadthing/react/styles.css';
import Transition from './_components/shared/Transition';

const inter = Roboto({
    weight: '500',
    subsets: ['latin']
});

export const metadata: Metadata = {
    title: 'DocuNest',
    description: 'Application for taking notes with AI power',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <body className={inter.className}>
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
            </body>
        </html>
    );
}
