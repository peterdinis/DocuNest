import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
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

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'DocuNest',
    description: 'Document application with AI power',
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
                                        <Navigation />
                                        {children}
                                        <ToastContainer />
                                        <ScrollToTop />
                                </SessionAppProvider>
                            </QueryProvider>
                        </ThemeProvider>
                    </Suspense>
                </NextUiProvider>
            </body>
        </html>
    );
}
