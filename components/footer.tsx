import Link from 'next/link';
import { Building2, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
import { auth } from '@/auth';

export async function Footer() {
  const session = await auth();
  const isAdmin = !!session?.user;

  return (
    <footer className="bg-muted py-12 border-t">
      <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <Link href="/" className="flex items-center gap-2">
            <Building2 className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold tracking-tight">FarhadRealy</span>
          </Link>
          <p className="text-sm text-muted-foreground">
            Your trusted partner in finding the perfect home. We provide premium real estate services with a focus on client satisfaction.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-muted-foreground hover:text-primary"><Facebook className="h-5 w-5" /></Link>
            <Link href="#" className="text-muted-foreground hover:text-primary"><Twitter className="h-5 w-5" /></Link>
            <Link href="#" className="text-muted-foreground hover:text-primary"><Instagram className="h-5 w-5" /></Link>
            <Link href="#" className="text-muted-foreground hover:text-primary"><Linkedin className="h-5 w-5" /></Link>
          </div>
        </div>
        
        <div>
          <h3 className="font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/" className="hover:text-primary">Home</Link></li>
            <li><Link href="/properties" className="hover:text-primary">Properties</Link></li>
            <li><Link href="/blog" className="hover:text-primary">Blog</Link></li>
            <li><Link href="/contact" className="hover:text-primary">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Properties</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/properties?type=Buy" className="hover:text-primary">Buy a Home</Link></li>
            <li><Link href="/properties?type=Rent" className="hover:text-primary">Rent a Home</Link></li>
            <li><Link href="/properties?type=Sale" className="hover:text-primary">Sell Your Home</Link></li>
            <li><Link href="/properties" className="hover:text-primary">Featured Listings</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Contact Info</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>123 Real Estate Blvd</li>
            <li>Beverly Hills, CA 90210</li>
            <li>Phone: (555) 123-4567</li>
            <li>Email: info@FarhadRealy.com</li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 md:px-6 mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground gap-4">
        <p>&copy; {new Date().getFullYear()} FarhadRealy. All rights reserved.</p>
        {!isAdmin && <Link href="/login" className="hover:text-primary"></Link>}
      </div>
    </footer>
  );
}
