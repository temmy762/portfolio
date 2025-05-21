"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiStar, FiGitBranch, FiExternalLink, FiGithub } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { SectionTitle } from "@/components/ui/section-title";
import { GithubRepo } from "@/types";
import { GitHubService } from "@/lib/services/github-service";

export function GitHubSection() {
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Create GitHub service - replace with your GitHub username
        // You can add a token as the second parameter for authenticated requests
        const githubService = new GitHubService('username');
        
        // Try to fetch real repositories
        const repositories = await githubService.getRepositories(6);
        
        if (repositories && repositories.length > 0) {
          setRepos(repositories);
        } else {
          // Fallback to mock data if API fails or returns empty
          const mockRepos: GithubRepo[] = [
            {
              id: "1",
              name: "react-portfolio",
              description: "Modern portfolio website built with React and Next.js",
              html_url: "https://github.com/username/react-portfolio",
              homepage: "https://portfolio-demo.com",
              stargazers_count: 48,
              language: "TypeScript",
              fork: false
            },
            {
              id: "2",
              name: "e-commerce-platform",
              description: "Full-featured e-commerce platform with React and Node.js",
              html_url: "https://github.com/username/e-commerce-platform",
              homepage: "https://ecommerce-demo.com",
              stargazers_count: 124,
              language: "JavaScript",
              fork: false
            },
            {
              id: "3",
              name: "wordpress-starter",
              description: "WordPress starter template with custom theme development",
              html_url: "https://github.com/username/wordpress-starter",
              homepage: "",
              stargazers_count: 37,
              language: "PHP",
              fork: false
            },
            {
              id: "4",
              name: "task-management-app",
              description: "Task management application with React and Firebase",
              html_url: "https://github.com/username/task-management-app",
              homepage: "https://task-app-demo.com",
              stargazers_count: 62,
              language: "JavaScript",
              fork: false
            }
          ];
          
          setRepos(mockRepos);
        }
        setIsLoading(false);
      } catch (err) {
        console.error("GitHub API error:", err);
        setError("Failed to fetch GitHub repositories. Please try again later.");
        setIsLoading(false);
      }
    };
    
    fetchRepos();
  }, []);

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="GitHub Projects"
          subtitle="Explore my open-source projects and contributions on GitHub."
          centered={true}
        />

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-16 h-16 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-600 dark:text-red-500 mt-8">{error}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {repos.map((repo, index) => (
              <motion.div
                key={repo.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-100 dark:border-gray-700"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                    <FiGithub className="mr-2" />
                    {repo.name}
                  </h3>
                  <div className="flex items-center space-x-3 text-gray-500 dark:text-gray-400">
                    <span className="flex items-center">
                      <FiStar className="mr-1" />
                      {repo.stargazers_count}
                    </span>
                    {!repo.fork && (
                      <span className="flex items-center">
                        <FiGitBranch className="mr-1" />
                        {Math.floor(Math.random() * 20) + 5}
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                  {repo.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="inline-block px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 rounded-full text-gray-700 dark:text-gray-300">
                    {repo.language}
                  </span>

                  <div className="flex space-x-3">
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-500 transition-colors"
                      aria-label="GitHub Repository"
                    >
                      <FiGithub size={20} />
                    </a>
                    {repo.homepage && (
                      <a
                        href={repo.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-500 transition-colors"
                        aria-label="Live Demo"
                      >
                        <FiExternalLink size={20} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <div className="flex justify-center mt-12">
          <Button
            href="https://github.com/username"
            isExternal={true}
            size="lg"
            className="flex items-center"
          >
            <FiGithub className="mr-2" /> View GitHub Profile
          </Button>
        </div>
      </div>
    </section>
  );
}