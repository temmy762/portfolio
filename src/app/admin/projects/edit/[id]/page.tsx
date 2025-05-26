"use client";

import ProjectForm from "@/components/admin/project-form";
import { useParams } from "next/navigation";

export default function EditProjectPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  
  return <ProjectForm projectId={id} />;
}
