"use client";

import BlogForm from "@/components/admin/blog-form";

export default function EditBlogPostPage({ params }: { params: { id: string } }) {
  return <BlogForm postId={params.id} />;
}
