import { PrismaClient } from '@prisma/client';
import profileData from '@/data/seed-data/profile.json';
import projectsData from '@/data/seed-data/projects.json';
import { ProfileSeedSchema, ProjectSeedSchema } from '@/types/schemas';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  const profileInput = ProfileSeedSchema.parse(profileData);

  await prisma.profile.deleteMany();
  await prisma.profile.create({
    data: {
      name: profileInput.name,
      photoUrl: profileInput.photoUrl,
      motto: profileInput.motto,
      description: profileInput.description,
      socialLinks: profileInput.socialLinks,
    },
  });
  console.log('Profile seeded.');

  const projectsInput = ProjectSeedSchema.parse(projectsData);

  await prisma.project.deleteMany();
  for (const project of projectsInput) {
    await prisma.project.create({
      data: {
        title: project.title,
        description: project.description,
        thumbnailUrl: project.thumbnailUrl,
        techStack: project.techStack,
        demoUrl: project.demoUrl,
        repositoryUrl: project.repositoryUrl,
        displayOrder: project.displayOrder,
        isFeatured: project.isFeatured,
      },
    });
  }
  console.log(`${projectsInput.length} projects seeded.`);

  console.log('Database seeded successfully.');
}

main()
  .catch((e) => {
    console.error('Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
