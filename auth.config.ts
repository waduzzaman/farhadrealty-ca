import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  secret: process.env.AUTH_SECRET || 'a-very-secure-random-string-for-preview-only',
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isPublicPath = nextUrl.pathname === '/' || nextUrl.pathname === '/login' || nextUrl.pathname === '/signup';
      
      if (!isLoggedIn && !isPublicPath) {
        return Response.redirect(new URL('/', nextUrl));
      }
      
      if (isLoggedIn && (nextUrl.pathname === '/login' || nextUrl.pathname === '/signup')) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
