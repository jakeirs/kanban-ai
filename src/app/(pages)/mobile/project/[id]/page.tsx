import { Project } from "@/components/blocks/project";

interface ProjectPageProps {
  params: {
    id: string;
  };
}
export default function ProjectPage({ params }: ProjectPageProps) {
  return <Project id={params.id} />;
}
