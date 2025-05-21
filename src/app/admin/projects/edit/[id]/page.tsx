"use client";

import ProjectForm from "@/components/admin/project-form";

export default function EditProjectPage({ params }: { params: { id: string } }) {
  return <ProjectForm projectId={params.id} />;
}
