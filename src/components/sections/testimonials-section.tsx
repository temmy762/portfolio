"use client";

import { motion } from "framer-motion";
import { SectionTitle } from "@/components/ui/section-title";
import { TestimonialCard } from "@/components/ui/testimonial-card";
import { testimonials } from "@/lib/data/portfolio-data";

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Client Testimonials"
          subtitle="Feedback from clients who have experienced working with me on various projects."
          centered={true}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard 
              key={testimonial.id} 
              testimonial={testimonial} 
              index={index}
            />
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-600 dark:text-gray-300 italic max-w-2xl mx-auto">
            &ldquo;I strive to deliver exceptional quality and value in every project.
            Client satisfaction is at the heart of my work ethic.&rdquo;
          </p>
        </motion.div>
      </div>
    </section>
  );
}
