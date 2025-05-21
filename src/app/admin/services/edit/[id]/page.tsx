"use client";

import ServiceForm from "@/components/admin/service-form";

export default function EditServicePage({ params }: { params: { id: string } }) {
  return <ServiceForm serviceId={params.id} />;
}
