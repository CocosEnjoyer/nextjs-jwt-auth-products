import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function proxy(request: NextRequest) {
  const { cookies } = request;
  const accessToken = cookies.get('accessToken')?.value;
  const refreshToken = cookies.get('refreshToken')?.value;

  if (accessToken) {
    return NextResponse.next();
  }

  if (!accessToken && refreshToken) {
    try {
      const response = await fetch('https://dummyjson.com/auth/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          refreshToken: refreshToken,
          expiresInMins: 60,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API error: ', response.status, errorText);
        return NextResponse.next();
      }

      const data = await response.json();

      if (data.accessToken) {
        const nextResponse = NextResponse.next();

        nextResponse.cookies.set('accessToken', data.accessToken, {
          httpOnly: true,
          path: '/',
          sameSite: 'lax',
        });

        const newRefreshToken = data.refreshToken;

        if (newRefreshToken) {
          nextResponse.cookies.set('refreshToken', newRefreshToken, {
            httpOnly: true,
            path: '/',
            sameSite: 'lax',
            maxAge: 30 * 24 * 60 * 60,
          });
        }

        return nextResponse;
      }
    } catch (error) {
      console.error('Refresh token error:', error);
      return NextResponse.next();
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|login).*)'],
};
