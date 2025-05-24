"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AdminDevelopmentLogin() {
  const router = useRouter();
  
  // Helper for setting a cookie with proper format
  const setCookie = (name: string, value: string, days: number) => {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/;SameSite=Lax`;
  };
  
  // Function to enable developer login
  const enableDevLogin = () => {
    // Clear any existing tokens first
    localStorage.removeItem("admin_auth_token");
    document.cookie = 'admin_auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    
    // Set new tokens
    localStorage.setItem("admin_auth_token", "true");
    setCookie("admin_auth_token", "true", 7); // 7 days expiration
    
    // Redirect to admin dashboard
    router.push("/admin/dashboard?bypass=true");
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Developer Login
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            This page is only available in development mode.
          </p>
        </div>
        
        <div className="space-y-6">
          <button
            onClick={enableDevLogin}
            className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md transition-colors"
          >
            Enable Development Login
          </button>
          
          <div className="text-center">
            <Link 
              href="/"
              className="text-green-600 hover:text-green-700 dark:text-green-500 dark:hover:text-green-400"
            >
              Back to Home
            </Link>
          </div>
        </div>
        
        <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
          <p>This special login page bypasses authentication for development purposes.</p>
          <p className="mt-2">It adds the necessary cookies and local storage items to simulate a logged-in user.</p>
        </div>
      </div>
    </div>
  );
}
