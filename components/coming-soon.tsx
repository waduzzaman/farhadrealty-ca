import Image from 'next/image';
import Link from 'next/link';
import { Building2, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

export function ComingSoon() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-black text-white">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://picsum.photos/seed/luxury-estate/1920/1080"
          alt="Luxury Estate"
          fill
          className="object-cover opacity-40"
          priority
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
      </div>

      {/* Header */}
      <header className="relative z-10 p-6 md:p-10 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Building2 className="h-8 w-8 text-white" />
          <span className="text-2xl font-bold tracking-tight">FarhadRealty</span>
        </div>
        <Link href="/login" className="text-sm font-medium text-white/70 hover:text-white transition-colors">
          Admin Login
        </Link>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 text-center">
        <div className="max-w-3xl space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="inline-block rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-4 py-1.5 text-sm font-medium tracking-wide text-white/90 uppercase mb-4">
            Coming Soon
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif tracking-tight leading-tight">
            Redefining Luxury <br className="hidden md:block" /> Real Estate.
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto font-light leading-relaxed">
            Something extraordinary is in the works. We are building an exclusive platform for the world&apos;s most exceptional properties.
          </p>
          
          <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="relative w-full max-w-md">
              <input 
                type="email" 
                placeholder="Enter your email for updates" 
                className="w-full h-14 pl-6 pr-32 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
              />
              <button className="absolute right-1.5 top-1.5 bottom-1.5 px-6 rounded-full bg-white text-black font-medium hover:bg-white/90 transition-colors">
                Notify Me
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 p-6 md:p-10 flex flex-col md:flex-row justify-between items-center gap-4 text-white/50 text-sm">
        <p>&copy; {new Date().getFullYear()} FarhadRealty. All rights reserved.</p>
        <div className="flex gap-6">
          <Link href="#" className="hover:text-white transition-colors"><Facebook className="h-5 w-5" /></Link>
          <Link href="#" className="hover:text-white transition-colors"><Twitter className="h-5 w-5" /></Link>
          <Link href="#" className="hover:text-white transition-colors"><Instagram className="h-5 w-5" /></Link>
          <Link href="#" className="hover:text-white transition-colors"><Linkedin className="h-5 w-5" /></Link>
        </div>
      </footer>
    </div>
  );
}
