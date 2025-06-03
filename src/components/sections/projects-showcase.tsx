"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { SectionTitle } from "@/components/ui/section-title";
import { ProjectCard } from "@/components/ui/project-card";
import { Button } from "@/components/ui/button";
import { LazyLoad } from "@/components/ui/lazy-load";
import { ProjectCardSkeleton } from "@/components/ui/skeleton";
import { projects } from "@/lib/data/portfolio-data";

export function ProjectsShowcase() {
  // Get just the featured projects or first 3 projects
  const featuredProjects = projects.filter(project => project.featured).length > 0 
    ? projects.filter(project => project.featured) 
    : projects.slice(0, 3);

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Featured Projects"
          subtitle="Showcasing my latest work and technical expertise"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {featuredProjects.map((project, index) => (
            <LazyLoad 
              key={project.id} 
              fallback={<ProjectCardSkeleton />}
              threshold={0.1}
              rootMargin="150px"
            >
              <ProjectCard project={project} index={index} />
            </LazyLoad>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center mt-12"
        >
          <Link href="/projects">
            <Button size="lg" className="group">
              View All Projects
              <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
