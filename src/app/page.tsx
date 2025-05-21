import { Metadata } from "next";
import { HeroSection } from "@/components/sections/hero-section";
import { ServicesSection } from "@/components/sections/services-section";
import { ProjectsShowcase } from "@/components/sections/projects-showcase";
import { AboutSection } from "@/components/sections/about-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { BlogSection } from "@/components/sections/blog-section";
import { GitHubSection } from "@/components/sections/github-section";
import { FreelancePlatformsSection } from "@/components/sections/freelance-platforms-section";
import { ContactSection } from "@/components/sections/contact-section";

export const metadata: Metadata = {
  title: 'Alex Johnson - Full Stack Developer Portfolio',
  description: 'Professional portfolio of Alex Johnson, specializing in Full Stack Development, Mobile Apps, and WordPress solutions.',
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <ProjectsShowcase />
      <AboutSection />
      <SkillsSection />
      <TestimonialsSection />
      <GitHubSection />
      <FreelancePlatformsSection />
      <BlogSection />
      <ContactSection />
    </>
  );
}
