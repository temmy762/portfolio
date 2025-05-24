import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  try {
    // Get the pathname of the request
    const path = request.nextUrl.pathname;

    // Check if we're on a development environment
    const isDevelopment = process.env.NODE_ENV === 'development';
    
    // Define public paths that don't require authentication
    const isPublicPath = path === '/admin/login';
    const isAdminPath = path.startsWith('/admin');
    
    // Skip middleware completely for non-admin paths
    if (!isAdminPath) {
      return NextResponse.next();
    }

    // Get the token from the cookies
    const authToken = request.cookies.get('admin_auth_token')?.value;
    
    // In development, allow bypassing auth with a special query param for debugging
    const bypassAuth = isDevelopment && request.nextUrl.searchParams.get('bypass') === 'true';
    
    // Redirect to login if trying to access a protected route without a token
    if (!isPublicPath && !authToken && !bypassAuth) {
      // Clear any problematic cookies that might be causing loops
      const response = NextResponse.redirect(new URL('/admin/login', request.url));
      response.cookies.delete('admin_auth_token');
      return response;
    }

    // Redirect to dashboard if trying to access login page with a token
    if (isPublicPath && authToken) {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }
  } catch (error) {
    console.error('Middleware error:', error);
    // In case of any errors, just continue
  }

  // Continue with the request
  return NextResponse.next();
}

// Specify the paths this middleware should run on
export const config = {
  matcher: [
    '/admin',
    '/admin/login',
    '/admin/dashboard/:path*',
    '/admin/projects/:path*',
    '/admin/services/:path*',
    '/admin/testimonials/:path*',
    '/admin/blog/:path*',
  ],
};