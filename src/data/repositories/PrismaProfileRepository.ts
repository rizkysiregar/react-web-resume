import { prisma } from '@/lib/prisma';
import type { ProfileRepository } from '@/domain/repositories';
import type { Profile, SocialLink } from '@/domain/entities';

export class PrismaProfileRepository implements ProfileRepository {
  async getProfile(): Promise<Profile | null> {
    const record = await prisma.profile.findFirst();

    if (!record) {
      return null;
    }

    return {
      id: record.id,
      name: record.name,
      photoUrl: record.photoUrl,
      motto: record.motto,
      description: record.description,
      socialLinks: record.socialLinks as unknown as SocialLink[],
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
    };
  }
}
