"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import { FiFileText, FiCode, FiUsers, FiAward } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { SectionTitle } from "@/components/ui/section-title";
import { aboutMe } from "@/lib/data/portfolio-data";
import Image from "next/image";
import { getAvatarPlaceholder, handleImageError } from "@/lib/utils/image-utils";

export function AboutSection() {
  const { ref: statsRef, inView: statsInView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="About Me"
          subtitle="Learn more about my background, skills, and expertise."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
          {/* Image Column */}          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative h-[500px] rounded-lg overflow-hidden"
          >
            {aboutMe.profileImage ? (
              <Image
                src={aboutMe.profileImage}
                alt={`${aboutMe.name} profile picture`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                onError={(e) => handleImageError(e)}
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-green-400 dark:from-green-900 dark:to-green-700 flex items-center justify-center">
                <Image
                  src={getAvatarPlaceholder(aboutMe.name, '#22c55e', '#ffffff')}
                  alt={`${aboutMe.name} profile picture`}
                  width={200}
                  height={200}
                  className="rounded-full"
                />
              </div>
            )}
          </motion.div>

          {/* Content Column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-center"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {aboutMe.name}
            </h3>
            <p className="text-green-600 dark:text-green-500 font-medium mb-6">
              {aboutMe.title}
            </p>
            
            <div className="space-y-4 text-gray-600 dark:text-gray-300 mb-8">
              <p>{aboutMe.intro}</p>
              <p>
                {aboutMe.longBio.split('\n\n')[0]}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                  Location:
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  {aboutMe.location}
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                  Email:
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  {aboutMe.email}
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                  Availability:
                </h4>
                <p className="text-green-600 dark:text-green-500 font-medium">
                  {aboutMe.availability}
                </p>
              </div>
            </div>

            <div className="flex space-x-4">
              <Button href="/about">More About Me</Button>
              <Button href="/contact" variant="outline">
                Contact Me
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20"
        >
          {[
            {
              icon: <FiCode />,
              value: 85,
              label: "Projects Completed",
            },
            {
              icon: <FiUsers />,
              value: 50,
              label: "Satisfied Clients",
            },
            {
              icon: <FiAward />,
              value: 5,
              label: "Years of Experience",
            },
            {
              icon: <FiFileText />,
              value: 20,
              label: "Blog Articles",
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md border border-gray-100 dark:border-gray-700 text-center"
            >
              <div className="text-green-600 dark:text-green-500 flex justify-center mb-4">
                <div className="text-2xl">{stat.icon}</div>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {statsInView ? (
                  <CountUp end={stat.value} duration={2.5} />
                ) : (
                  "0"
                )}
                <span className="text-green-600 dark:text-green-500">+</span>
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
