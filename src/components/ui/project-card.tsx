"use client";

import { OptimizedImage } from "@/components/ui/optimized-image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiExternalLink, FiGithub } from "react-icons/fi";
import { Project } from "@/types";
import { Button } from "@/components/ui/button";
import { getProjectPlaceholder, isValidImageUrl } from "@/lib/utils/image-utils";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
    >      <div className="relative h-56 overflow-hidden">
        <OptimizedImage
          src={
            isValidImageUrl(project.imageUrl) 
              ? project.imageUrl 
              : getProjectPlaceholder((project.category?.toLowerCase() as 'web' | 'mobile' | 'design' | 'backend' | 'other') || 'other')
          }
          alt={`Screenshot of ${project.title} project`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={index < 3} // Prioritize loading the first 3 projects
          component="project-card"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <div className="flex space-x-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-green-400 transition-colors"
                aria-label="View Github Repository"
              >
                <FiGithub size={20} />
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-green-400 transition-colors"
                aria-label="View Live Demo"
              >
                <FiExternalLink size={20} />
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {project.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
        {project.techStack.map((tech: string, i: number) => (
            <span
              key={i}
              className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex justify-between items-center">
          <Link href={`/projects/${project.id}`}>
            <Button variant="default" size="sm">
              View Project
            </Button>
          </Link>
          <div className="flex space-x-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-500"
                aria-label="Github Repository"
              >
                <FiGithub size={20} />
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-500"
                aria-label="Live Demo"
              >
                <FiExternalLink size={20} />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}