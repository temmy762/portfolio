"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FiStar } from "react-icons/fi";
import { Testimonial } from "@/types";
import { getAvatarPlaceholder, handleImageError } from "@/lib/utils/image-utils";

interface TestimonialCardProps {
  testimonial: Testimonial;
  index: number;
}

export function TestimonialCard({ testimonial, index }: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg p-6 transition-shadow"
    >
      <div className="flex items-center justify-between mb-4">        <div className="flex items-center">
          <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
            <Image
              src={testimonial.avatarUrl || getAvatarPlaceholder(testimonial.name)}
              alt={`Profile picture of ${testimonial.name}`}
              fill
              className="object-cover rounded-full"
              sizes="48px"
              onError={(e) => handleImageError(e)}
              priority
            />
          </div>
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white">
              {testimonial.name}
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {testimonial.role}, {testimonial.company}
            </p>
          </div>
        </div>

        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <FiStar
              key={i}
              className={`w-4 h-4 ${
                i < testimonial.rating
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-300 dark:text-gray-600"
              }`}
            />
          ))}
        </div>
      </div>      <div className="relative">
        <div className="absolute top-0 left-0 text-5xl leading-none text-green-200 dark:text-green-900 opacity-50">
          &ldquo;
        </div>
        <p className="text-gray-600 dark:text-gray-300 pt-4 px-2 italic">
          {testimonial.content}
        </p>
        <div className="absolute bottom-0 right-0 text-5xl leading-none text-green-200 dark:text-green-900 opacity-50">
          &rdquo;
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-500 dark:text-gray-400 text-right">
        {new Date(testimonial.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
        })}
      </div>
    </motion.div>
  );
}
