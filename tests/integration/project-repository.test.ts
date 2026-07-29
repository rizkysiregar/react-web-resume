// @vitest-environment node
import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import { PrismaClient } from '@prisma/client';
import { PrismaProjectRepository } from '@/data/repositories/PrismaProjectRepository';

const hasDatabase = !!process.env.DATABASE_URL;

describe.skipIf(!hasDatabase)('PrismaProjectRepository', () => {
  const prisma = new PrismaClient();
  const repository = new PrismaProjectRepository();

  beforeAll(async () => {
    await prisma.project.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  beforeEach(async () => {
    await prisma.project.deleteMany();
  });

  it('returns empty array when no projects exist', async () => {
    const result = await repository.getAllProjects();
    expect(result).toEqual([]);
  });

  it('returns all projects', async () => {
    await prisma.project.create({
      data: {
        title: 'Project A',
        description: 'Description A',
        techStack: ['React'],
        displayOrder: 1,
      },
    });
    await prisma.project.create({
      data: {
        title: 'Project B',
        description: 'Description B',
        techStack: ['Node.js'],
        displayOrder: 2,
      },
    });

    const result = await repository.getAllProjects();
    expect(result).toHaveLength(2);
  });

  it('returns projects ordered by displayOrder ascending', async () => {
    await prisma.project.create({
      data: { title: 'Second', description: 'D', techStack: ['TS'], displayOrder: 2 },
    });
    await prisma.project.create({
      data: { title: 'First', description: 'D', techStack: ['TS'], displayOrder: 1 },
    });
    await prisma.project.create({
      data: { title: 'Third', description: 'D', techStack: ['TS'], displayOrder: 3 },
    });

    const result = await repository.getAllProjects();
    expect(result[0].title).toBe('First');
    expect(result[1].title).toBe('Second');
    expect(result[2].title).toBe('Third');
  });

  it('maps all fields correctly', async () => {
    await prisma.project.create({
      data: {
        title: 'Full Project',
        description: 'A complete project',
        thumbnailUrl: 'https://example.com/thumb.jpg',
        techStack: ['React', 'TypeScript'],
        demoUrl: 'https://demo.example.com',
        repositoryUrl: 'https://github.com/user/repo',
        displayOrder: 1,
        isFeatured: true,
      },
    });

    const result = await repository.getAllProjects();
    const project = result[0];

    expect(project.id).toBeDefined();
    expect(project.title).toBe('Full Project');
    expect(project.description).toBe('A complete project');
    expect(project.thumbnailUrl).toBe('https://example.com/thumb.jpg');
    expect(project.techStack).toEqual(['React', 'TypeScript']);
    expect(project.demoUrl).toBe('https://demo.example.com');
    expect(project.repositoryUrl).toBe('https://github.com/user/repo');
    expect(project.displayOrder).toBe(1);
    expect(project.isFeatured).toBe(true);
    expect(project.createdAt).toBeInstanceOf(Date);
    expect(project.updatedAt).toBeInstanceOf(Date);
  });
});
