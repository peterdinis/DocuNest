import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NextUiProvider from "./_components/shared/NextUiProvider";
import Navbar from "./_components/shared/Navbar";
import ScrollToTop from "./_components/shared/ScrollToTop";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DocuNest",
  description: "Document application with AI power",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextUiProvider>
          <Navbar />
          {children}
          <ScrollToTop />
        </NextUiProvider>
      </body>
    </html>
  );
}
