import Image from 'next/image';

interface ProjectCardProps {
  title: string;
  description: string;
  thumbnailUrl?: string | null;
  techStack: string[];
  demoUrl?: string | null;
  repositoryUrl?: string | null;
  className?: string;
}

function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export function ProjectCard({
  title,
  description,
  thumbnailUrl,
  techStack,
  demoUrl,
  repositoryUrl,
  className,
}: ProjectCardProps) {
  const truncatedDescription = truncateText(description, 150);

  return (
    <article
      className={`rounded-lg overflow-hidden bg-foreground/5 border border-foreground/10 hover:border-foreground/20 transition-colors ${className ?? ''}`}
    >
      <div className="relative aspect-video w-full">
        {thumbnailUrl ? (
          <Image
            src={thumbnailUrl}
            alt={`${title} thumbnail`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div
            data-testid="placeholder-image"
            className="w-full h-full bg-foreground/10 flex items-center justify-center"
          >
            <span className="text-foreground/40 text-sm">No image</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
        <p data-testid="project-description" className="text-foreground/70 text-sm mb-3 leading-relaxed">
          {truncatedDescription}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 text-xs rounded-full bg-foreground/10 text-foreground/80"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex gap-3">
          {demoUrl && (
            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-foreground/80 hover:text-foreground underline transition-colors"
              aria-label={`View ${title} demo`}
            >
              Demo
            </a>
          )}
          {repositoryUrl && (
            <a
              href={repositoryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-foreground/80 hover:text-foreground underline transition-colors"
              aria-label={`View ${title} repository`}
            >
              Repository
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
