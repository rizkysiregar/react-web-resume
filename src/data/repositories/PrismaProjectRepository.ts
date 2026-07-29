import { prisma } from '@/lib/prisma';
import type { ProjectRepository } from '@/domain/repositories';
import type { Project } from '@/domain/entities';

export class PrismaProjectRepository implements ProjectRepository {
  async getAllProjects(): Promise<Project[]> {
    const records = await prisma.project.findMany({
      orderBy: { displayOrder: 'asc' },
    });

    return records.map((record) => ({
      id: record.id,
      title: record.title,
      description: record.description,
      thumbnailUrl: record.thumbnailUrl,
      techStack: record.techStack,
      demoUrl: record.demoUrl,
      repositoryUrl: record.repositoryUrl,
      displayOrder: record.displayOrder,
      isFeatured: record.isFeatured,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
    }));
  }
}
