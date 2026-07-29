import type { Metadata } from 'next';
import { HeroSection, ProjectsSection, ContactSection } from '@/components/sections';
import { PrismaProfileRepository, PrismaProjectRepository } from '@/data/repositories';

export async function generateMetadata(): Promise<Metadata> {
  const profileRepository = new PrismaProfileRepository();
  const profile = await profileRepository.getProfile();

  if (!profile) {
    return {};
  }

  return {
    title: profile.name,
    description: profile.motto ?? profile.description.slice(0, 160),
    openGraph: {
      title: profile.name,
      description: profile.motto ?? profile.description.slice(0, 160),
      images: [{ url: profile.photoUrl }],
    },
    twitter: {
      title: profile.name,
      description: profile.motto ?? profile.description.slice(0, 160),
      images: [profile.photoUrl],
    },
  };
}

export default async function Home() {
  const profileRepository = new PrismaProfileRepository();
  const projectRepository = new PrismaProjectRepository();
  const profile = await profileRepository.getProfile();
  const projects = await projectRepository.getAllProjects();

  return (
    <main className="flex-1">
      {profile ? (
        <HeroSection
          name={profile.name}
          photoUrl={profile.photoUrl}
          motto={profile.motto}
          description={profile.description}
        />
      ) : (
        <section id="profile" className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-foreground/60">Profile data not available</p>
          </div>
        </section>
      )}
      <ProjectsSection projects={projects} />
      <ContactSection socialLinks={profile?.socialLinks ?? []} />
    </main>
  );
}
