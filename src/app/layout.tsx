import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { cn } from '@/components/ui/Button';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Permuland',
  description: 'Manage your perfume collection',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "min-h-screen bg-gray-50/50 dark:bg-zinc-950 text-gray-900 dark:text-gray-100 antialiased pt-20 pb-10")}>
        <Navbar />
        <main className="max-w-md mx-auto px-5 w-full">
          {children}
        </main>
      </body>
    </html>
  );
}
