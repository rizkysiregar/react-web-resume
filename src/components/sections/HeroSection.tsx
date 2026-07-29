import Image from 'next/image';

interface HeroSectionProps {
  name: string;
  photoUrl: string;
  motto?: string | null;
  description: string;
  className?: string;
}

export function HeroSection({ name, photoUrl, motto, description, className }: HeroSectionProps) {
  return (
    <section id="profile" aria-labelledby="profile-heading" className={`py-16 px-4 ${className ?? ''}`}>
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8">
        <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden flex-shrink-0">
          <Image
            src={photoUrl}
            alt={`${name}'s photo`}
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h1 id="profile-heading" className="text-4xl md:text-5xl font-bold text-foreground mb-2">{name}</h1>
          {motto && (
            <p data-testid="motto" className="text-xl text-foreground/80 mb-4 italic">
              {motto}
            </p>
          )}
          <p className="text-lg text-foreground/70 leading-relaxed">{description}</p>
        </div>
      </div>
    </section>
  );
}
