"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaSave, FaTimes, FaPlus, FaTrash } from 'react-icons/fa';
import { Service } from '@/types';
import { doc, getDoc, setDoc, collection, addDoc, getFirestore } from 'firebase/firestore';
import { app } from '@/lib/firebase';

type ServiceFormProps = {
  serviceId?: string; // If provided, we're editing an existing service
};

export default function ServiceForm({ serviceId }: ServiceFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [featureInput, setFeatureInput] = useState('');
  
  const [formData, setFormData] = useState<Service>({
    id: '',
    title: '',
    description: '',
    icon: '💼',
    features: []
  });

  const iconOptions = [
    '💼', '🔧', '💻', '📱', '🎨', '🚀', '📊', '🌐', '⚙️', 
    '📝', '🔍', '🛠️', '📲', '🖥️', '📈', '🔗', '📡', '🏆',
    '🔒', '🔄', '📦', '🚚', '💡', '🎯', '📋', '🎬', '🔌'
  ];

  // Fetch service data if editing
  useEffect(() => {
    async function fetchService() {
      if (!serviceId) return;
      
      try {
        const db = getFirestore(app);
        const docRef = doc(db, 'services', serviceId);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const serviceData = docSnap.data() as Omit<Service, 'id'>;
          setFormData({
            id: serviceId,
            ...serviceData
          });
        } else {
          // Fallback to mock data if needed
          import('@/lib/data/portfolio-data').then(({ services }) => {
            const service = services.find(s => s.id === serviceId);
            if (service) {
              setFormData(service);
            } else {
              setError('Service not found');
              router.push('/admin/services');
            }
          });
        }
      } catch (error) {
        console.error('Error fetching service:', error);
        setError('Failed to load service data');
      }
    }
    
    fetchService();
  }, [serviceId, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleIconSelect = (icon: string) => {
    setFormData({
      ...formData,
      icon
    });
  };

  const handleAddFeature = () => {
    if (featureInput.trim()) {
      setFormData({
        ...formData,
        features: [...formData.features, featureInput.trim()]
      });
      setFeatureInput('');
    }
  };

  const handleFeatureKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddFeature();
    }
  };

  const handleRemoveFeature = (indexToRemove: number) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, index) => index !== indexToRemove)
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    
    try {
      const db = getFirestore(app);
      
      // Make sure we have required fields
      if (!formData.title || !formData.description || formData.features.length === 0) {
        throw new Error('Please fill in all required fields and add at least one feature');
      }
      
      // Create or update the service
      if (serviceId) {
        // Update existing service
        await setDoc(doc(db, 'services', serviceId), {
          ...formData,
          id: undefined // Remove id from the document data
        }, { merge: true });
      } else {
        // Create new service
        const docRef = await addDoc(collection(db, 'services'), {
          ...formData,
          id: undefined // Remove id from the document data
        });
        
        // Update the id field with the document ID
        await setDoc(doc(db, 'services', docRef.id), { id: docRef.id }, { merge: true });
      }
      
      // Redirect back to services list
      router.push('/admin/services');
    } catch (error) {
      console.error('Error saving service:', error);
      setError(error instanceof Error ? error.message : 'Failed to save service');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          {serviceId ? 'Edit Service' : 'Add New Service'}
        </h1>
        <button
          onClick={() => router.back()}
          className="inline-flex items-center px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          <FaTimes className="mr-2" />
          Cancel
        </button>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-md"
        >
          {error}
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left column */}
          <div className="space-y-6">
            {/* Service title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-green-500 focus:border-green-500"
              />
            </div>

            {/* Service description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={5}
                className="block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            {/* Icon selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Icon <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-7 gap-2 mb-2">
                {iconOptions.map((icon) => (
                  <button
                    key={icon}
                    type="button"
                    onClick={() => handleIconSelect(icon)}
                    className={`
                      flex items-center justify-center h-10 w-10 text-xl rounded-md
                      ${formData.icon === icon 
                        ? 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-400 border-2 border-green-500 dark:border-green-600' 
                        : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600'}
                    `}
                  >
                    {icon}
                  </button>
                ))}
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Selected Icon:
                </label>
                <div className="flex items-center">
                  <div className="flex items-center justify-center h-12 w-12 text-2xl bg-gray-100 dark:bg-gray-700 rounded-md">
                    {formData.icon}
                  </div>
                  <span className="ml-3 text-gray-600 dark:text-gray-400">
                    This icon will be displayed with your service
                  </span>
                </div>
              </div>
            </div>

            {/* Features */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Features <span className="text-red-500">*</span>
              </label>
              <div className="mb-2">
                <div className="flex">
                  <input
                    type="text"
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    onKeyDown={handleFeatureKeyDown}
                    className="block w-full border border-gray-300 dark:border-gray-600 rounded-l-md shadow-sm py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-green-500 focus:border-green-500"
                    placeholder="Add a feature..."
                  />
                  <button
                    type="button"
                    onClick={handleAddFeature}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-r-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    <FaPlus className="mr-2" />
                    Add
                  </button>
                </div>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Press Enter to add quickly
                </p>
              </div>
              
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Features List:
                </h3>
                {formData.features.length === 0 ? (
                  <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                    No features added yet. Add at least one feature.
                  </p>
                ) : (
                  <ul className="space-y-2">
                    {formData.features.map((feature, index) => (
                      <li 
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-md"
                      >
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {feature}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveFeature(index)}
                          className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                        >
                          <FaTrash size={14} />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Form actions */}
        <div className="mt-8 flex justify-end">
          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 mr-3"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Saving...
              </>
            ) : (
              <>
                <FaSave className="mr-2 -ml-1" />
                Save Service
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
