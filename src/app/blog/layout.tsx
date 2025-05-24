import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Blog - Alex Johnson Portfolio',
  description: 'Articles, tutorials, and insights on web development, mobile app development, and WordPress by Alex Johnson.',
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="min-h-screen bg-white dark:bg-gray-900">
      {children}
    </section>
  );
}
