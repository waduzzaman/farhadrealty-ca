import type {Metadata} from 'next';
import './globals.css'; // Global styles
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { auth } from '@/auth';

export const metadata: Metadata = {
  title: 'FarhadRealy | Premium Real Estate Broker',
  description: 'Find your dream home with FarhadRealy. Premium real estate listings and services.',
};

export default async function RootLayout({children}: {children: React.ReactNode}) {
  const session = await auth();
  const isLoggedIn = !!session?.user;

  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col" suppressHydrationWarning>
        {isLoggedIn && <Navbar />}
        <main className="flex-1">
          {children}
        </main>
        {isLoggedIn && <Footer />}
      </body>
    </html>
  );
}
