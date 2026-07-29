// @vitest-environment node
import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import { PrismaClient } from '@prisma/client';
import { PrismaProfileRepository } from '@/data/repositories/PrismaProfileRepository';

const hasDatabase = !!process.env.DATABASE_URL;

describe.skipIf(!hasDatabase)('PrismaProfileRepository', () => {
  const prisma = new PrismaClient();
  const repository = new PrismaProfileRepository();

  beforeAll(async () => {
    await prisma.profile.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  beforeEach(async () => {
    await prisma.profile.deleteMany();
  });

  it('returns null when no profile exists', async () => {
    const result = await repository.getProfile();
    expect(result).toBeNull();
  });

  it('returns a profile when one exists', async () => {
    await prisma.profile.create({
      data: {
        name: 'John Doe',
        photoUrl: 'https://example.com/photo.jpg',
        motto: 'Building things',
        description: 'A developer',
        socialLinks: [{ label: 'GitHub', url: 'https://github.com/johndoe' }],
      },
    });

    const result = await repository.getProfile();

    expect(result).not.toBeNull();
    expect(result!.name).toBe('John Doe');
    expect(result!.photoUrl).toBe('https://example.com/photo.jpg');
    expect(result!.motto).toBe('Building things');
    expect(result!.description).toBe('A developer');
    expect(result!.socialLinks).toHaveLength(1);
    expect(result!.socialLinks[0].label).toBe('GitHub');
  });

  it('maps all fields correctly', async () => {
    await prisma.profile.create({
      data: {
        name: 'Jane Smith',
        photoUrl: 'https://example.com/jane.jpg',
        motto: null,
        description: 'Full-stack developer',
        socialLinks: [
          { label: 'GitHub', url: 'https://github.com/jane' },
          { label: 'LinkedIn', url: 'https://linkedin.com/in/jane' },
        ],
      },
    });

    const result = await repository.getProfile();

    expect(result!.id).toBeDefined();
    expect(result!.motto).toBeNull();
    expect(result!.socialLinks).toHaveLength(2);
    expect(result!.createdAt).toBeInstanceOf(Date);
    expect(result!.updatedAt).toBeInstanceOf(Date);
  });
});
