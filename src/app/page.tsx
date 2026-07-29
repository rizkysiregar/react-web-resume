import type { Metadata } from 'next';
import { HeroSection } from '@/components/sections';
import { PrismaProfileRepository } from '@/data/repositories/PrismaProfileRepository';

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
  const profile = await profileRepository.getProfile();

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
      <section id="projects" className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <p className="text-foreground/60">Projects section placeholder</p>
        </div>
      </section>
      <section id="contact" className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-foreground/60">Contact section placeholder</p>
        </div>
      </section>
    </main>
  );
}
