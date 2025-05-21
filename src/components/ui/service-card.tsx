"use client";

import { motion } from "framer-motion";
import { Service } from "@/types";
import { ServiceIcon } from "@/components/ui/service-icon";

interface ServiceCardProps {
  service: Service;
  index: number;
}

export function ServiceCard({ service, index }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl p-8 transition-all duration-300 border border-gray-100 dark:border-gray-700 h-full"
    >
      <div className="flex flex-col h-full">
        <div className="text-green-600 dark:text-green-500 mb-5">
          <ServiceIcon 
            icon={service.icon} 
            size={32} 
            ariaLabel={`${service.title} service icon`}
          />
        </div>

        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
          {service.title}
        </h3>

        <p className="text-gray-600 dark:text-gray-300 mb-6 flex-grow">
          {service.description}
        </p>

        <ul className="space-y-2">
          {service.features.map((feature, idx) => (
            <li
              key={idx}
              className="text-gray-700 dark:text-gray-300 flex items-center"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-green-600 dark:bg-green-500 mr-2"></span>
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
