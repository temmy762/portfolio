import Link from "next/link";
import { FiGithub, FiLinkedin, FiBriefcase, FiMail } from "react-icons/fi";
import { SiUpwork, SiFiverr } from "react-icons/si";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 py-12 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About Column */}
          <div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
              Alex<span className="text-green-600 dark:text-green-500">Dev</span>
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Full Stack Developer specializing in building exceptional digital
              experiences for the web and mobile platforms.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/username"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-500 transition-colors"
                aria-label="GitHub"
              >
                <FiGithub size={20} />
              </a>
              <a
                href="https://linkedin.com/in/username"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-500 transition-colors"
                aria-label="LinkedIn"
              >
                <FiLinkedin size={20} />
              </a>
              <a
                href="https://www.fiverr.com/username"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-500 transition-colors"
                aria-label="Fiverr"
              >
                <SiFiverr size={20} />
              </a>
              <a
                href="https://www.upwork.com/freelancers/username"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-500 transition-colors"
                aria-label="Upwork"
              >
                <SiUpwork size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-500 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-500 transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-500 transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-500 transition-colors"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-500 transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-500 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Contact
            </h3>
            <div className="space-y-3">
              <p className="flex items-center text-gray-600 dark:text-gray-400">
                <FiMail className="mr-2" />
                <a
                  href="mailto:alex@example.com"
                  className="hover:text-green-600 dark:hover:text-green-500 transition-colors"
                >
                  alex@example.com
                </a>
              </p>
              <p className="flex items-center text-gray-600 dark:text-gray-400">
                <FiBriefcase className="mr-2" />
                <span>San Francisco, CA (Remote)</span>
              </p>
              <p className="text-green-600 dark:text-green-500 font-medium">
                Available for freelance projects
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} AlexDev. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link
                href="/privacy-policy"
                className="text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-500 text-sm transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms-of-service"
                className="text-gray-600 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-500 text-sm transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
