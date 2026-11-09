import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProjectBySlug, getRelatedProjects, projects } from "@/data/projects";
import { siteConfig } from "@/data/site";
import { CaseStudyPage } from "@/components/project/CaseStudyPage";

// ─── Static params for SSG ────────────────────────────────────────────
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

// ─── Dynamic metadata per project ────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const project = getProjectBySlug(params.slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} — Case Study`,
    description: project.problem.slice(0, 160),
    openGraph: {
      title: `${project.title} | ${siteConfig.name}`,
      description: project.problem.slice(0, 160),
      images: project.thumbnail ? [{ url: project.thumbnail }] : [],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.problem.slice(0, 160),
    },
  };
}

// ─── Page Component ────────────────────────────────────────────────────
export default function ProjectPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  const related = getRelatedProjects(project.slug, project.category, 3);

  return <CaseStudyPage project={project} relatedProjects={related} />;
}
