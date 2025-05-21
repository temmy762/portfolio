"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaEdit, FaTrash, FaSearch, FaStar } from "react-icons/fa";
import { Testimonial } from "@/types";
import { collection, getDocs, deleteDoc, doc, getFirestore } from "firebase/firestore";
import { app } from "@/lib/firebase";
import { getAvatarPlaceholder } from "@/lib/utils/image-utils";

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [testimonialToDelete, setTestimonialToDelete] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const db = getFirestore(app);
        const testimonialsCollection = collection(db, "testimonials");
        const snapshot = await getDocs(testimonialsCollection);
        
        if (snapshot.empty) {
          // Fallback to mock data if no testimonials exist in Firestore
          import("@/lib/data/portfolio-data").then(({ testimonials }) => {
            setTestimonials(testimonials);
            setLoading(false);
          });
        } else {
          const fetchedTestimonials = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Testimonial[];
          
          setTestimonials(fetchedTestimonials);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching testimonials:", error);
        
        // Fallback to mock data
        import("@/lib/data/portfolio-data").then(({ testimonials }) => {
          setTestimonials(testimonials);
          setLoading(false);
        });
      }
    }

    fetchTestimonials();
  }, []);

  const handleDeleteClick = (testimonialId: string) => {
    setTestimonialToDelete(testimonialId);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!testimonialToDelete) return;

    try {
      const db = getFirestore(app);
      await deleteDoc(doc(db, "testimonials", testimonialToDelete));
      
      // Update local state
      setTestimonials(testimonials.filter((testimonial) => testimonial.id !== testimonialToDelete));
      
      // Close modal
      setIsDeleteModalOpen(false);
      setTestimonialToDelete(null);
    } catch (error) {
      console.error("Error deleting testimonial:", error);
      
      // For demo purposes, still update UI even if Firestore delete fails
      setTestimonials(testimonials.filter((testimonial) => testimonial.id !== testimonialToDelete));
      setIsDeleteModalOpen(false);
      setTestimonialToDelete(null);
    }
  };

  // Filter testimonials based on search term
  const filteredTestimonials = testimonials.filter((testimonial) => 
    testimonial.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    testimonial.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    testimonial.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort by date (newest first)
  const sortedTestimonials = [...filteredTestimonials].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Function to render rating stars
  const renderRatingStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <FaStar
          key={i}
          className={`${
            i < rating
              ? "text-yellow-500"
              : "text-gray-300 dark:text-gray-600"
          }`}
        />
      ));
  };

  // Loading skeleton
  if (loading) {
    return (
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Testimonials</h1>
          <div className="h-10 w-36 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Testimonials</h1>
        <Link
          href="/admin/testimonials/new"
          className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 transition-colors"
        >
          <FaPlus className="mr-2" />
          Add New Testimonial
        </Link>
      </div>

      <div className="mb-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        {/* Search bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-green-500 focus:border-green-500"
            placeholder="Search testimonials..."
          />
        </div>
      </div>

      {sortedTestimonials.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            No testimonials found. {searchTerm ? "Try adjusting your search." : "Add your first testimonial!"}
          </p>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="mt-4 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Clear Search
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence>
            {sortedTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col"
              >
                <div className="p-6 flex-grow">
                  <div className="flex justify-between items-start mb-4">                  <div className="flex items-center">
                      <div className="flex-shrink-0">                        {testimonial.avatarUrl ? (
                          <div className="relative h-10 w-10 rounded-full overflow-hidden">                            <Image
                              src={testimonial.avatarUrl}
                              alt={testimonial.name}
                              className="h-10 w-10 rounded-full object-cover"
                              width={40}
                              height={40}
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                // Fallback to initials avatar
                                target.onerror = null;
                                target.src = getAvatarPlaceholder(testimonial.name);
                              }}
                            />
                          </div>                        ) : (
                          <div className="relative h-10 w-10 rounded-full overflow-hidden">                            <Image
                              src={getAvatarPlaceholder(testimonial.name)}
                              alt={testimonial.name}
                              className="h-10 w-10 rounded-full object-cover"
                              width={40}
                              height={40}
                            />
                          </div>
                        )}
                      </div>
                      <div className="ml-3">
                        <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                          {testimonial.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {testimonial.role} @ {testimonial.company}
                        </p>
                      </div>
                    </div>
                    <div className="flex text-sm">
                      {renderRatingStars(testimonial.rating)}
                    </div>
                  </div>
                    <blockquote className="mt-2 text-gray-700 dark:text-gray-300 italic">
                    &ldquo;{testimonial.content}&rdquo;
                  </blockquote>
                  
                  <div className="mt-4 text-sm text-gray-500 dark:text-gray-500">
                    {new Date(testimonial.date).toLocaleDateString()}
                  </div>
                </div>
                
                <div className="px-6 py-3 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex justify-end items-center">
                  <div className="flex space-x-2">
                    <Link
                      href={`/admin/testimonials/edit/${testimonial.id}`}
                      className="p-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      <FaEdit size={18} />
                    </Link>
                    <button
                      onClick={() => handleDeleteClick(testimonial.id)}
                      className="p-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                    >
                      <FaTrash size={18} />
                    </button>
                  </div>
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
              Are you sure you want to delete this testimonial? This action cannot be undone.
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
