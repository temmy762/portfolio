"use client";

import TestimonialForm from "@/components/admin/testimonial-form";

export default function EditTestimonialPage({ params }: { params: { id: string } }) {
  return <TestimonialForm testimonialId={params.id} />;
}
