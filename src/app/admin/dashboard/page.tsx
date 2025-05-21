"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaProjectDiagram, FaBlog, FaUsers, FaCode, FaEdit } from 'react-icons/fa';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { app } from '@/lib/firebase';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    projects: 0,
    blogPosts: 0,
    testimonials: 0,
    services: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const db = getFirestore(app);
        
        // Fetch actual counts from Firestore
        const projectsSnapshot = await getDocs(collection(db, 'projects'));
        const blogPostsSnapshot = await getDocs(collection(db, 'blogPosts'));
        const testimonialsSnapshot = await getDocs(collection(db, 'testimonials'));
        const servicesSnapshot = await getDocs(collection(db, 'services'));
        
        setStats({
          projects: projectsSnapshot.size,
          blogPosts: blogPostsSnapshot.size,
          testimonials: testimonialsSnapshot.size,
          services: servicesSnapshot.size,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
        // Fallback to demo data if error occurs
        setStats({
          projects: 10,
          blogPosts: 5,
          testimonials: 8,
          services: 4,
        });
      } finally {
        setLoading(false);
      }
    }
    
    fetchStats();
  }, []);

  const dashboardItems = [
    {
      name: 'Projects',
      count: stats.projects,
      icon: <FaProjectDiagram className="w-8 h-8" />,
      color: 'bg-blue-500',
      link: '/admin/projects',
    },
    {
      name: 'Blog Posts',
      count: stats.blogPosts,
      icon: <FaBlog className="w-8 h-8" />,
      color: 'bg-purple-500',
      link: '/admin/blog',
    },
    {
      name: 'Testimonials',
      count: stats.testimonials,
      icon: <FaUsers className="w-8 h-8" />,
      color: 'bg-yellow-500',
      link: '/admin/testimonials',
    },
    {
      name: 'Services',
      count: stats.services,
      icon: <FaCode className="w-8 h-8" />,
      color: 'bg-green-500',
      link: '/admin/services',
    },
  ];

  return (
    <div className="container mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Dashboard Overview</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Manage your portfolio content from one place
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"
            ></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dashboardItems.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Link href={item.link}>
                <div className="block h-full p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Total {item.name}
                      </p>
                      <p className="text-3xl font-bold text-gray-800 dark:text-white mt-1">
                        {item.count}
                      </p>
                    </div>
                    <div className={`p-3 rounded-full ${item.color} text-white`}>
                      {item.icon}
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm text-green-600 dark:text-green-400">
                    <FaEdit className="mr-1" />
                    <span>Manage {item.name}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
          Recent Updates
        </h2>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-6">
            <p className="text-gray-600 dark:text-gray-400">
              This section will show recent changes to your portfolio content.
            </p>
            <div className="mt-4">
              <a 
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 transition-colors"
              >
                View Live Site
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
