"use client";

import ServiceForm from "@/components/admin/service-form";
import { useParams } from "next/navigation";

export default function EditServicePage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  
  return <ServiceForm serviceId={id} />;
}
