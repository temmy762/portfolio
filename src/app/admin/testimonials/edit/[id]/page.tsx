"use client";

import TestimonialForm from "@/components/admin/testimonial-form";
import { useParams } from "next/navigation";

export default function EditTestimonialPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  
  return <TestimonialForm testimonialId={id} />;
}
