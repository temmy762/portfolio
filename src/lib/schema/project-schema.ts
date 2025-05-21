// Generate structured data for projects
import { Project } from "@/types";

/**
 * Generate structured data for a project (for Rich Results)
 * @param project Project data
 * @param baseUrl Base URL of the website
 * @returns JSON-LD structured data
 */
export function generateProjectSchema(project: Project, baseUrl = "https://alex-johnson-portfolio.com") {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.title,
    description: project.description,
    applicationCategory: getCategoryType(project.category),
    operatingSystem: "Any",
    datePublished: project.date,
    image: project.imageUrl.startsWith("http") 
      ? project.imageUrl 
      : `${baseUrl}${project.imageUrl}`,
    url: `${baseUrl}/projects/${project.id}`,
    author: {
      "@type": "Person",
      name: "Alex Johnson"
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock"
    },
    ...(project.githubUrl && {
      codeRepository: project.githubUrl
    }),
    ...(project.demoUrl && {
      installUrl: project.demoUrl
    }),
    softwareRequirements: project.techStack.join(", ")
  };
}

/**
 * Map project category to schema.org application category
 */
function getCategoryType(category: string): string {
  const categoryMap: Record<string, string> = {
    "Full Stack": "WebApplication",
    "Mobile App": "MobileApplication",
    "WordPress": "WebApplication",
    "Frontend": "WebApplication",
    "Backend": "WebApplication"
  };
  
  return categoryMap[category] || "WebApplication";
}
