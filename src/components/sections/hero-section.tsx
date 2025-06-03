"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FiArrowDown, FiGithub, FiLinkedin } from "react-icons/fi";
import { SiUpwork, SiFiverr } from "react-icons/si";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { getProjectPlaceholder } from "@/lib/utils/image-utils";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 pb-24 overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      {/* Optimized animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-32 -left-32 w-64 h-64 sm:w-96 sm:h-96 rounded-full bg-green-100 dark:bg-green-900/20 blur-3xl opacity-50"
          animate={{
            x: [0, 30, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute -right-32 bottom-0 w-64 h-64 sm:w-96 sm:h-96 rounded-full bg-green-100 dark:bg-green-900/20 blur-3xl opacity-50"
          animate={{
            x: [0, -30, 0],
            y: [0, -40, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Text Content */}
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center mb-4 sm:mb-6"
            >
              <div className="h-[1px] w-12 sm:w-16 bg-green-500 mr-4"></div>
              <span className="text-sm sm:text-base text-green-600 dark:text-green-500 font-medium">
                Welcome to my portfolio
              </span>
            </motion.div>            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-4 sm:mb-6"
            >
              I&apos;m Daniel Bankole Oriyomi
              <span className="block">
                <span className="text-green-600 dark:text-green-500">
                  WordPress Expert
                </span>{" "}
                & Full Stack Developer
              </span>
            </motion.h1>            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 max-w-lg"
            >
              Passionate WordPress expert and full-stack developer who transforms 
              complex ideas into powerful digital solutions. With years of experience 
              and 100+ successful projects worldwide, I bring technical expertise and 
              creative problem-solving to every challenge.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button href="/contact" size="lg" className="w-full sm:w-auto">
                Hire Me
              </Button>
              <Button href="/projects" variant="outline" size="lg" className="w-full sm:w-auto">
                View My Work
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-center justify-center sm:justify-start space-x-4 mt-6 sm:mt-8"
            >
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
            </motion.div>
          </div>          {/* Hero Video/Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg shadow-xl overflow-hidden"
          >            <OptimizedImage
              src={getProjectPlaceholder('web')}
              alt="Portfolio showcase"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              component="hero"
            />
          </motion.div>
        </div>

        {/* Scroll down indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute left-1/2 -translate-x-1/2 bottom-8"
        >
          <motion.div
            animate={{
              y: [0, 12, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop",
            }}
            className="cursor-pointer flex flex-col items-center"
            onClick={() =>
              window.scrollTo({
                top: window.innerHeight,
                behavior: "smooth",
              })
            }
          >
            <span className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              Scroll Down
            </span>
            <FiArrowDown className="text-green-600 dark:text-green-500" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
