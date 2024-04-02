import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/app/config/firebase';
import { message } from 'antd';

export async function middleware(request: NextRequest) {
    const user = auth.currentUser;

    // Check if the user is not logged in and trying to access admin routes
    if (!user && request.nextUrl.pathname.startsWith('/adminpanel')) {
        // return NextResponse.redirect(new URL('/admin', request.url));
        message.error('You are not authorized to access this page');
    }

    return NextResponse.next();
}

// return new Promise((resolve, reject) => {
//     const unsubscribe = auth.onAuthStateChanged((user) => {
//         // Check if the user is not logged in and trying to access admin routes
//         if (!user && request.nextUrl.pathname.startsWith('/adminpanel')) {
//             // return NextResponse.redirect(new URL('/admin', request.url));
//         } else {
//             resolve(NextResponse.next());
//         }

//         // Make sure to unsubscribe to avoid memory leaks
//         unsubscribe();
//     });
// });
