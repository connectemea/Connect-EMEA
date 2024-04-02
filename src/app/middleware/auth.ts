import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/app/config/firebase';

export async function middleware(request: NextRequest) {
    const user = auth.currentUser;

    // Check if the user is not logged in and trying to access admin routes
    if (!user && request.nextUrl.pathname.startsWith('/adminpanel')) {
        // return NextResponse.redirect(new URL('/admin', request.url));
        setTimeout(() => {
            return NextResponse.next();
        }, 1000);
    }

    return NextResponse.next();
}
