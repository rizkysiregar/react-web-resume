export interface Project {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string | null;
  techStack: string[];
  demoUrl: string | null;
  repositoryUrl: string | null;
  displayOrder: number;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}
