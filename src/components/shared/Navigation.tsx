'use client';

import { useState } from 'react';

interface NavigationSection {
  id: string;
  label: string;
}

interface NavigationProps {
  sections: NavigationSection[];
  className?: string;
}

export function Navigation({ sections, className }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      className={`sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-foreground/10 ${className ?? ''}`}
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <a href="#profile" className="text-lg font-bold text-foreground">
          Portfolio
        </a>

        <div data-testid="desktop-nav" className="hidden md:flex gap-6">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="text-foreground/70 hover:text-foreground transition-colors text-sm"
            >
              {section.label}
            </a>
          ))}
        </div>

        <button
          type="button"
          className="md:hidden p-2 text-foreground"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t border-foreground/10 px-4 py-2">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="block py-2 text-foreground/70 hover:text-foreground transition-colors text-sm"
              onClick={() => setIsMenuOpen(false)}
            >
              {section.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
