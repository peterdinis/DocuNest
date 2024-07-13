import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import NextUiProvider from './_components/shared/providers/NextUiProvider';
import Navbar from './_components/shared/Navbar';
import ScrollToTop from './_components/shared/ScrollToTop';
import ThemeProvider from './_components/shared/providers/ThemeProvider';

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
                    <ThemeProvider>
                        <Navbar />
                        {children}
                        <ScrollToTop />
                    </ThemeProvider>
                </NextUiProvider>
            </body>
        </html>
    );
}
