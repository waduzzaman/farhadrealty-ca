import Link from 'next/link';
import { Building2, Menu } from 'lucide-react';
import { Button } from './ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { auth } from '@/auth';
import { logOut } from '@/app/auth.actions';

export async function Navbar() {
  const session = await auth();
  const isAdmin = !!session?.user;

  const routes = [
    { name: 'Home', path: '/' },
    { name: 'Properties', path: '/properties' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  if (isAdmin) {
    routes.push({ name: 'Dashboard', path: '/dashboard' });
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Building2 className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold tracking-tight">LuxeEstates</span>
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {routes.map((route) => (
            <Link
              key={route.path}
              href={route.path}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {route.name}
            </Link>
          ))}
          {isAdmin ? (
            <form action={logOut}>
              <Button variant="outline" size="sm" type="submit">Logout</Button>
            </form>
          ) : (
            <Button asChild>
              <Link href="/contact">Get in Touch</Link>
            </Button>
          )}
        </nav>

        {/* Mobile Nav */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <nav className="flex flex-col gap-4 mt-8">
              {routes.map((route) => (
                <Link
                  key={route.path}
                  href={route.path}
                  className="text-lg font-medium"
                >
                  {route.name}
                </Link>
              ))}
              {isAdmin ? (
                <form action={logOut} className="mt-4">
                  <Button variant="outline" className="w-full" type="submit">Logout</Button>
                </form>
              ) : (
                <Button className="mt-4" asChild>
                  <Link href="/contact">Get in Touch</Link>
                </Button>
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
