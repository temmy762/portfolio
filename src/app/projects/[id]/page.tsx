import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowLeft, FiGithub, FiExternalLink, FiCalendar } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { projects } from "@/lib/data/portfolio-data";
import { formatDate } from "@/lib/utils";
import { generateMetadata as generateBaseMetadata } from "@/lib/metadata";
import { generateProjectSchema } from "@/lib/schema/project-schema";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const project = projects.find(p => p.id === params.id);
  
  if (!project) {
    return generateBaseMetadata({
      title: 'Project Not Found',
      noIndex: true,
    });
  }

  const keywords = [...project.tags, ...project.techStack, project.category].join(', ');
  
  return generateBaseMetadata({
    title: project.title,
    description: project.description,
    keywords,
    ogImage: project.imageUrl,
    canonical: `/projects/${params.id}`,
  });
}

export default function ProjectPage({ params }: { params: { id: string } }) {
  const project = projects.find(p => p.id === params.id);
  
  if (!project) {
    notFound();
  }

  // Get related projects (same category, excluding current project)
  const relatedProjects = projects
    .filter(p => p.category === project.category && p.id !== project.id)
    .slice(0, 3);

  return (
    <div className="py-20">
      {/* Project schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateProjectSchema(project)),
        }}
      />
      <div className="container mx-auto px-4">
        <Link href="/projects">
          <Button variant="ghost" className="mb-8">
            <FiArrowLeft className="mr-2" /> Back to Projects
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {project.title}
            </h1>
            
            <div className="flex items-center text-gray-500 dark:text-gray-400 mb-6">
              <FiCalendar className="mr-2" />
              <span>{formatDate(project.date)}</span>
            </div>

            <div className="mb-8 relative h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-lg">
              <Image
                src={project.imageUrl || "/images/placeholder-project.jpg"}
                alt={project.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
              />
            </div>

            <div className="prose prose-lg max-w-none text-gray-600 dark:text-gray-300 mb-8">
              <p>{project.description}</p>
              {project.content && <div>{project.content}</div>}
            </div>

            {/* Tech Stack */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Technologies Used
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-md"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Project Links */}
            <div className="flex space-x-4 mb-12">
              {project.demoUrl && (
                <Button href={project.demoUrl} isExternal={true}>
                  <FiExternalLink className="mr-2" /> Live Demo
                </Button>
              )}
              {project.githubUrl && (
                <Button href={project.githubUrl} variant="outline" isExternal={true}>
                  <FiGithub className="mr-2" /> View Code
                </Button>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mb-8 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Project Information
              </h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                    Category
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    {project.category}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                    Completed
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    {formatDate(project.date)}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                    Tags
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-2 py-1 rounded text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                  Need a similar project?
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  I&apos;m available for freelance projects. Let&apos;s work together!
                </p>
                <Button href="/contact" className="w-full">
                  Contact Me
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
              Related Projects
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProjects.map((relatedProject) => (
                <div
                  key={relatedProject.id}
                  className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <Link href={`/projects/${relatedProject.id}`}>
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={relatedProject.imageUrl || "/images/placeholder-project.jpg"}
                        alt={relatedProject.title}
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  </Link>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {relatedProject.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                      {relatedProject.description}
                    </p>
                    <Link href={`/projects/${relatedProject.id}`}>
                      <Button variant="link" className="p-0 h-auto font-medium">
                        View Project
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
