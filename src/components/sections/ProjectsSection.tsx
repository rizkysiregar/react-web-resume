import { ProjectCard } from '@/components/shared';
import type { Project } from '@/domain/entities';

interface ProjectsSectionProps {
  projects: Project[];
  className?: string;
}

export function ProjectsSection({ projects, className }: ProjectsSectionProps) {
  return (
    <section id="projects" aria-labelledby="projects-heading" className={`py-16 px-4 ${className ?? ''}`}>
      <div className="max-w-6xl mx-auto">
        <h2 id="projects-heading" className="text-3xl font-bold text-foreground mb-8">Projects</h2>

        {projects.length === 0 ? (
          <p className="text-foreground/60 text-center py-8">No projects available yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                title={project.title}
                description={project.description}
                thumbnailUrl={project.thumbnailUrl}
                techStack={project.techStack}
                demoUrl={project.demoUrl}
                repositoryUrl={project.repositoryUrl}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
