import type { SocialLink } from '@/domain/entities';

interface ContactSectionProps {
  socialLinks: SocialLink[];
  className?: string;
}

export function ContactSection({ socialLinks, className }: ContactSectionProps) {
  return (
    <section id="contact" aria-labelledby="contact-heading" className={`py-16 px-4 ${className ?? ''}`}>
      <div className="max-w-4xl mx-auto text-center">
        <h2 id="contact-heading" className="text-3xl font-bold text-foreground mb-8">Contact</h2>

        {socialLinks.length === 0 ? (
          <p className="text-foreground/60">No contact information available.</p>
        ) : (
          <ul className="flex flex-wrap justify-center gap-4" role="list">
            {socialLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-foreground/5 border border-foreground/10 hover:border-foreground/20 hover:bg-foreground/10 transition-colors text-foreground/80 hover:text-foreground"
                  aria-label={`Visit ${link.label} profile`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
