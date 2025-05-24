import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { marked } from "marked";
import { FiArrowLeft, FiCalendar, FiUser, FiShare2 } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { blogPosts } from "@/lib/data/portfolio-data";
import { formatDate } from "@/lib/utils";
import { getBlogImageUrl, handleImageError, getAvatarPlaceholder } from "@/lib/utils/image-utils";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = blogPosts.find(p => p.slug === params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} - Alex Johnson Blog`,
    description: post.excerpt,
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find(p => p.slug === params.slug);
  
  if (!post) {
    notFound();
  }
  // Convert markdown content to HTML, with safety check
  const contentHtml = post.content ? marked(post.content) : '<p>No content available.</p>';
  
  // Get related posts (same tags, excluding current post)
  const relatedPosts = blogPosts
    .filter(p => 
      p.slug !== post.slug && 
      p.tags.some(tag => post.tags.includes(tag))
    )
    .slice(0, 3);

  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <Link href="/blog">
          <Button variant="ghost" className="mb-8">
            <FiArrowLeft className="mr-2" /> Back to Blog
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">            <div className="mb-8 relative h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-lg">
              <Image
                src={getBlogImageUrl(post.coverImage)}
                alt={post.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
                onError={(e) => handleImageError(e)}
              />
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center text-gray-500 dark:text-gray-400 mb-6 gap-4">
              <div className="flex items-center">
                <FiCalendar className="mr-2" />
                <time dateTime={post.date}>{formatDate(post.date)}</time>
              </div>
              <div className="flex items-center">
                <FiUser className="mr-2" />
                <span>{post.author}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag) => (
                <Link 
                  key={tag} 
                  href={`/blog?tag=${tag}`}
                  className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-3 py-1 rounded-full text-sm hover:bg-green-200 dark:hover:bg-green-800/30 transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>

            <div 
              className="prose prose-lg max-w-none text-gray-600 dark:text-gray-300 mb-12 prose-a:text-green-600 dark:prose-a:text-green-500 prose-headings:text-gray-900 dark:prose-headings:text-white"
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />

            {/* Share Buttons */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mb-12">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <FiShare2 className="mr-2" /> Share this article
              </h3>
              <div className="flex space-x-4">
                {[
                  { name: 'Twitter', url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(`https://yoursite.com/blog/${post.slug}`)}&text=${encodeURIComponent(post.title)}` },
                  { name: 'Facebook', url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://yoursite.com/blog/${post.slug}`)}` },
                  { name: 'LinkedIn', url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://yoursite.com/blog/${post.slug}`)}` },
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    {social.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mb-8 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                About the Author
              </h3>
                <div className="flex items-center mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden mr-4 bg-green-100 dark:bg-green-900/30">
                  {/* Use avatar placeholder */}
                  <Image
                    src={getAvatarPlaceholder(post.author)}
                    alt={`${post.author}'s profile picture`}
                    width={64}
                    height={64}
                    className="object-cover w-full h-full"
                    onError={(e) => handleImageError(e)}
                  />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {post.author}
                  </h4>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    Full Stack Developer
                  </p>
                </div>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-6">
                Alex is a passionate developer specializing in modern web technologies, 
                with a focus on creating intuitive and performant applications.
              </p>
              
              <Link href="/about">
                <Button variant="outline" className="w-full">
                  More About Me
                </Button>
              </Link>
            </div>

            {/* Recent Posts */}
            {relatedPosts.length > 0 && (
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  Related Articles
                </h3>
                
                <div className="space-y-4">
                  {relatedPosts.map((relatedPost) => (
                    <Link
                      key={relatedPost.id}
                      href={`/blog/${relatedPost.slug}`}
                      className="block"
                    >
                      <div className="flex items-start space-x-3">                        <div className="relative w-16 h-16 rounded overflow-hidden flex-shrink-0">
                          <Image
                            src={getBlogImageUrl(relatedPost.coverImage)}
                            alt={relatedPost.title}
                            fill
                            className="object-cover"
                            sizes="64px"
                            onError={(e) => handleImageError(e)}
                          />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white text-sm hover:text-green-600 dark:hover:text-green-500 transition-colors line-clamp-2">
                            {relatedPost.title}
                          </h4>
                          <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
                            {formatDate(relatedPost.date)}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
