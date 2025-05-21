"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaEdit, FaTrash, FaEye, FaSearch, FaTags } from "react-icons/fa";
import { BlogPost } from "@/types";
import { collection, getDocs, deleteDoc, doc, getFirestore } from "firebase/firestore";
import { app } from "@/lib/firebase";

export default function AdminBlog() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [tagFilter, setTagFilter] = useState<string>("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<string | null>(null);
  const [allTags, setAllTags] = useState<string[]>([]);

  useEffect(() => {
    async function fetchBlogPosts() {
      try {
        const db = getFirestore(app);
        const blogCollection = collection(db, "blogPosts");
        const snapshot = await getDocs(blogCollection);
        
        if (snapshot.empty) {
          // Fallback to mock data if no blog posts exist in Firestore
          import("@/lib/data/portfolio-data").then(({ blogPosts }) => {
            setBlogPosts(blogPosts);
            
            // Extract unique tags
            const tags = Array.from(
              new Set(blogPosts.flatMap((post) => post.tags))
            );
            setAllTags(tags);
            
            setLoading(false);
          });
        } else {
          const fetchedPosts = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as BlogPost[];
          
          setBlogPosts(fetchedPosts);
          
          // Extract unique tags
          const tags = Array.from(
            new Set(fetchedPosts.flatMap((post) => post.tags))
          );
          setAllTags(tags);
          
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching blog posts:", error);
        
        // Fallback to mock data
        import("@/lib/data/portfolio-data").then(({ blogPosts }) => {
          setBlogPosts(blogPosts);
          
          // Extract unique tags
          const tags = Array.from(
            new Set(blogPosts.flatMap((post) => post.tags))
          );
          setAllTags(tags);
          
          setLoading(false);
        });
      }
    }

    fetchBlogPosts();
  }, []);

  const handleDeleteClick = (postId: string) => {
    setPostToDelete(postId);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!postToDelete) return;

    try {
      const db = getFirestore(app);
      await deleteDoc(doc(db, "blogPosts", postToDelete));
      
      // Update local state
      setBlogPosts(blogPosts.filter((post) => post.id !== postToDelete));
      
      // Close modal
      setIsDeleteModalOpen(false);
      setPostToDelete(null);
    } catch (error) {
      console.error("Error deleting blog post:", error);
      
      // For demo purposes, still update UI even if Firestore delete fails
      setBlogPosts(blogPosts.filter((post) => post.id !== postToDelete));
      setIsDeleteModalOpen(false);
      setPostToDelete(null);
    }
  };

  // Filter blog posts based on search term and tag
  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTag = tagFilter === "" || post.tags.includes(tagFilter);
    
    return matchesSearch && matchesTag;
  });

  // Sort by date (newest first)
  const sortedPosts = [...filteredPosts].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Loading skeleton
  if (loading) {
    return (
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Blog Posts</h1>
          <div className="h-10 w-36 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Blog Posts</h1>
        <Link
          href="/admin/blog/new"
          className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 transition-colors"
        >
          <FaPlus className="mr-2" />
          Add New Post
        </Link>
      </div>

      <div className="mb-6 flex flex-col md:flex-row gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        {/* Search bar */}
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-green-500 focus:border-green-500"
            placeholder="Search blog posts..."
          />
        </div>

        {/* Tag filter */}
        <div className="relative w-full md:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaTags className="h-5 w-5 text-gray-400" />
          </div>
          <select
            value={tagFilter}
            onChange={(e) => setTagFilter(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-green-500 focus:border-green-500"
          >
            <option value="">All Tags</option>
            {allTags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>
      </div>

      {sortedPosts.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            No blog posts found. {searchTerm || tagFilter ? "Try adjusting your filters." : "Add your first blog post!"}
          </p>
          {(searchTerm || tagFilter) && (
            <button
              onClick={() => {
                setSearchTerm("");
                setTagFilter("");
              }}
              className="mt-4 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Clear Filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence>
            {sortedPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col"
              >
                <div className="relative h-48 bg-gray-200 dark:bg-gray-700">
                  {post.coverImage ? (                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
                      No image available
                    </div>
                  )}
                </div>
                
                <div className="p-4 flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white line-clamp-2">
                      {post.title}
                    </h2>
                    <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap ml-2">
                      {new Date(post.date).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded"
                      >
                        {tag}
                      </span>
                    ))}
                    {post.tags.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded">
                        +{post.tags.length - 3}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
                  <div className="flex space-x-2">
                    <Link
                      href={`/admin/blog/edit/${post.id}`}
                      className="p-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      <FaEdit size={18} />
                    </Link>
                    <button
                      onClick={() => handleDeleteClick(post.id)}
                      className="p-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                    >
                      <FaTrash size={18} />
                    </button>
                  </div>
                  
                  <Link
                    href={`/blog/${post.slug}`}
                    target="_blank"
                    className="inline-flex items-center text-sm text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
                  >
                    <FaEye className="mr-1" />
                    Preview
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Delete confirmation modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Confirm Delete
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Are you sure you want to delete this blog post? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
