import './globals.css';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Providers } from '@/components/Providers';

export const metadata: Metadata = {
  title: 'ModernShop',
  description: 'Modern e-commerce store built with Next.js'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar />
          <main className="container-page py-8">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
