import { NextResponse, type NextRequest } from 'next/server';
import { isValidElement } from 'react';

// NOTE - Más detalles sobre middleware Next.js 13 en el README.md

export async function middleware(req: NextRequest) {
  const previousPage = req.nextUrl.pathname;

  if (previousPage.startsWith('/checkout')) {

    const token = req.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.redirect(
        new URL(`/auth/login?p=${previousPage}`, req.url)
      );
    }

    try {
      await isValidElement(token);
      return NextResponse.next();

    } catch (error) {

      return NextResponse.redirect(
        new URL(`/auth/login?p=${previousPage}`, req.url)
      );
    }
  }

  // return NextResponse.next();
}

export const config = {
  matcher: ['/checkout/:path*'],
};
