"use client";

import { PropsWithChildren, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/auth-context';
import { FaHome, FaBlog, FaProjectDiagram, FaUsers, FaCode, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';

export default function AdminLayout({ children }: PropsWithChildren) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();
  const { user, loading, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Check if mobile view and close sidebar by default
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      if (isMobile) setIsSidebarOpen(false);
      else setIsSidebarOpen(true);
    };
    // Initial check
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Don't render the layout for the login page
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  // Show a loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }  // Special handling for authentication
  const isAuthenticated = () => {
    // Check Firebase user
    if (user) return true;
      // If no Firebase user, check for development token
    if (typeof window !== 'undefined') {
      const hasLocalToken = localStorage.getItem('admin_auth_token') === 'true';
      const hasCookieToken = document.cookie.includes('admin_auth_token=true');
      
      return (hasLocalToken || hasCookieToken);
    }
    
    return false;
  };

  // Redirect to login if not authenticated
  if (!isAuthenticated() && !loading && pathname !== '/admin/login') {
    router.push('/admin/login');
    return null;
  }

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const handleSignOut = async () => {
    try {
      // Clear development token if it exists
      localStorage.removeItem('admin_auth_token');
      document.cookie = 'admin_auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      
      // Also sign out from Firebase if user exists
      if (user) {
        await signOut();
      }
      
      router.push('/admin/login');
    } catch (error) {
      console.error('Failed to sign out:', error);
    }
  };

  const navItems = [
    { path: '/admin/dashboard', icon: <FaHome />, label: 'Dashboard' },
    { path: '/admin/projects', icon: <FaProjectDiagram />, label: 'Projects' },
    { path: '/admin/blog', icon: <FaBlog />, label: 'Blog Posts' },
    { path: '/admin/services', icon: <FaCode />, label: 'Services' },
    { path: '/admin/testimonials', icon: <FaUsers />, label: 'Testimonials' },
  ];

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <aside 
        className={`${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed inset-y-0 z-50 flex flex-col flex-shrink-0 w-64 transition-all duration-300 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 md:static md:translate-x-0`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700">
          <Link href="/admin/dashboard">
            <div className="flex items-center">
              <span className="text-xl font-semibold text-gray-800 dark:text-white">Admin Panel</span>
            </div>
          </Link>
          <button 
            className="md:hidden text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
            onClick={toggleSidebar}
          >
            <FaTimes size={20} />
          </button>
        </div>

        <div className="flex flex-col flex-1 overflow-y-auto">
          <nav className="flex-1 px-2 py-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`${
                  pathname === item.path
                    ? 'bg-green-500 text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-green-100 dark:hover:bg-green-800/30'
                } group flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={handleSignOut}
              className="flex items-center w-full px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
            >
              <FaSignOutAlt className="mr-3" />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-x-hidden">
        {/* Top header */}
        <header className="sticky top-0 z-10 flex items-center h-16 px-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <button 
            className="md:hidden text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 mr-3"
            onClick={toggleSidebar}
          >
            <FaBars size={20} />
          </button>
          
          <h1 className="text-lg font-semibold text-gray-800 dark:text-white">
            {navItems.find((item) => item.path === pathname)?.label || 'Admin'}
          </h1>
          
          <div className="flex items-center ml-auto">
            {user && (
              <div className="text-sm text-gray-700 dark:text-gray-300">
                {user.email}
              </div>
            )}
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
