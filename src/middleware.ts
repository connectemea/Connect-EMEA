import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/app/server/config/firebase';

// let isLoggedIn: boolean = false;
export async function middleware(request: NextRequest) {
    // const user = await auth.currentUser;
    // let logedInUser = null;
    // auth.onAuthStateChanged((user) => {
    //     if (user) {
    //         console.log('User is signed in', user);
    //         isLoggedIn = true;
    //     } else {
    //         console.log('User is not signed in555');
    //     }
    // });

    // if (!isLoggedIn && request.nextUrl.pathname === '/adminpanel') {
    //     console.log('User is not signed in 23feasfasfsa');
    //     return NextResponse.redirect(new URL('/admin/auth/signin', request.url));
    // } else {
    //     return NextResponse.next();
    // }
        return NextResponse.next();
}


