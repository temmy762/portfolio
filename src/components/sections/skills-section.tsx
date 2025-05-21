"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { SectionTitle } from "@/components/ui/section-title";
import { skills } from "@/lib/data/portfolio-data";
import { cn } from "@/lib/utils";

// Technology/Framework icons
import { 
  FiCode, 
  FiDatabase, 
  FiSmartphone, 
  FiTool,
} from "react-icons/fi";

import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiHtml5,
  SiTailwindcss,
  SiRedux,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiFirebase,
  SiGraphql,
  SiFlutter,
  SiWordpress,
  SiPhp,
  SiGit,
  SiDocker,
  SiAmazon,
} from "react-icons/si";

export function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<string>("frontend");
  
  const categories = [
    { id: "frontend", name: "Frontend", icon: <FiCode /> },
    { id: "backend", name: "Backend", icon: <FiDatabase /> },
    { id: "mobile", name: "Mobile", icon: <FiSmartphone /> },
    { id: "other", name: "Other", icon: <FiTool /> },
  ];

  // Filter skills by active category
  const filteredSkills = skills.filter(skill => skill.category === activeCategory);

  // Get appropriate icon for a skill
  const getSkillIcon = (iconName: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      react: <SiReact />,
      nextjs: <SiNextdotjs />,
      typescript: <SiTypescript />,
      javascript: <SiJavascript />,
      html: <SiHtml5 />,
      tailwind: <SiTailwindcss />,
      redux: <SiRedux />,
      nodejs: <SiNodedotjs />,
      express: <SiExpress />,
      mongodb: <SiMongodb />,
      postgresql: <SiPostgresql />,
      firebase: <SiFirebase />,
      graphql: <SiGraphql />,
      reactnative: <SiReact />, // Using SiReact as replacement for React Native
      flutter: <SiFlutter />,
      wordpress: <SiWordpress />,
      php: <SiPhp />,
      git: <SiGit />,
      docker: <SiDocker />,
      aws: <SiAmazon />,
    };

    return iconMap[iconName] || <FiCode />;
  };

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Skills & Technologies"
          subtitle="My technical skills and the technologies I work with to bring projects to life."
          centered={true}
        />

        {/* Category Tabs */}
        <div className="flex justify-center mt-12 mb-16">
          <div className="inline-flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  "flex items-center px-4 py-2 rounded-md transition-colors",
                  activeCategory === category.id
                    ? "bg-green-600 text-white"
                    : "text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-500"
                )}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col items-center"
            >
              <div className="text-3xl text-green-600 dark:text-green-500 mb-4">
                {getSkillIcon(skill.icon || "")}
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                {skill.name}
              </h3>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-1">
                <div 
                  className="bg-green-600 dark:bg-green-500 h-2.5 rounded-full" 
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
              <p className="text-sm text-right w-full text-gray-500 dark:text-gray-400">
                {skill.level}%
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
