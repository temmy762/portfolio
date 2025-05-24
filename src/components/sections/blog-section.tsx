"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowRight, FiCalendar, FiTag } from "react-icons/fi";
import { SectionTitle } from "@/components/ui/section-title";
import { Button } from "@/components/ui/button";
import { blogPosts } from "@/lib/data/portfolio-data";
import { formatDate } from "@/lib/utils";
import { handleImageError, getBlogImageUrl } from "@/lib/utils/image-utils";

export function BlogSection() {
  // Get the latest 3 blog posts
  const latestPosts = [...blogPosts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Latest Articles"
          subtitle="Insights, tutorials, and thoughts on web development, mobile apps, and WordPress."
          centered={true}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {latestPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
            >              <div className="relative h-48 overflow-hidden">
                <Image
                  src={getBlogImageUrl(post.coverImage)}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  onError={(e) => handleImageError(e)}
                />
              </div>
              <div className="p-6">
                <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-3">
                  <FiCalendar className="mr-2" />
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  
                  <div className="ml-4 flex items-center">
                    <FiTag className="mr-2" />
                    <span>{post.tags[0]}</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <Link href={`/blog/${post.slug}`}>
                  <Button variant="link" className="p-0 h-auto font-medium">
                    Read More <FiArrowRight className="ml-2" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center mt-12"
        >
          <Link href="/blog">
            <Button size="lg">
              View All Articles
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
