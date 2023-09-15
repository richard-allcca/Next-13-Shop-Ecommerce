import { getToken } from 'next-auth/jwt';
import { NextResponse, type NextRequest } from 'next/server';
import { isValidElement } from 'react';

// NOTE - Más detalles sobre middleware Next.js 13 en el README.md

export async function middleware(req: NextRequest) {
  const previousPage = req.nextUrl.pathname;
  const requestedPage = req.nextUrl.pathname;

  const session: any = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const validRoles = ['admin', 'super-user', 'SEO'];

  // SECTION - Middleware Front

  if (previousPage.startsWith('/checkout')) {

    if (!session) {
      const url = req.nextUrl.clone();
      url.pathname = '/auth/login';
      url.search = `p=${requestedPage}`;

      return NextResponse.redirect(url);
    }
  }

  if (previousPage.startsWith('/admin')) {

    if (!session) {
      const requestedPage = req.nextUrl.pathname;
      const url = req.nextUrl.clone();
      url.pathname = '/auth/login';
      url.search = `p=${requestedPage}`;

      return NextResponse.redirect(url);
    }

    if (!validRoles.includes(session.user.role)) {
      const url = req.nextUrl.clone();
      url.pathname = '/';
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  }

  // SECTION - Middleware APIs

  if (requestedPage.includes('/api/admin')) {

    if (!session) {
      return new Response(JSON.stringify({ message: 'No autorizado' }), {
        status: 401,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    if (!validRoles.includes(session.user.role)) {
      return new Response(JSON.stringify({ message: 'No autorizado' }), {
        status: 401,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
  };

  return NextResponse.next();
}

export const config = {
  // matcher: ['/checkout/address','/checkout/summary'],
  // matcher: ['/checkout/:path*', '/admin'],
  matcher: [
    '/checkout/:path*', '/admin/:path*', '/api/admin/:path*'],
  // matcher: [
  //   '/checkout/:path*', '/admin/:path*', '/api/admin/:path*', '/orders/:path*', '/api/orders/:path*'],
};