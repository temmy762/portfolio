"use client";

import BlogForm from "@/components/admin/blog-form";
import { useParams } from "next/navigation";

export default function EditBlogPostPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  
  return <BlogForm postId={id} />;
}
