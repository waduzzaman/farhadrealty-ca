import Link from 'next/link';
import { LayoutDashboard, Home, FileText, Settings } from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-muted/30 hidden md:block">
        <div className="p-6">
          <h2 className="text-lg font-bold mb-6">Admin Dashboard</h2>
          <nav className="space-y-2">
            <Link 
              href="/dashboard" 
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
            >
              <LayoutDashboard className="h-4 w-4" />
              Overview
            </Link>
            <Link 
              href="/dashboard/properties" 
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
            >
              <Home className="h-4 w-4" />
              Properties
            </Link>
            <Link 
              href="/dashboard/blog" 
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
            >
              <FileText className="h-4 w-4" />
              Blog Posts
            </Link>
            <Link 
              href="/dashboard/settings" 
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
            >
              <Settings className="h-4 w-4" />
              Settings
            </Link>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8">
        {children}
      </main>
    </div>
  );
}
