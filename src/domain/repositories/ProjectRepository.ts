import type { Project } from '@/domain/entities';

export interface ProjectRepository {
  getAllProjects(): Promise<Project[]>;
}
