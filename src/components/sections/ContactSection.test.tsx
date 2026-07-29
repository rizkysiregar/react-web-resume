import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ContactSection } from './ContactSection';

describe('ContactSection', () => {
  const mockSocialLinks = [
    { label: 'GitHub', url: 'https://github.com/johndoe' },
    { label: 'LinkedIn', url: 'https://linkedin.com/in/johndoe' },
    { label: 'Twitter', url: 'https://twitter.com/johndoe' },
  ];

  it('renders the section heading', () => {
    render(<ContactSection socialLinks={mockSocialLinks} />);
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Contact');
  });

  it('renders all social links', () => {
    render(<ContactSection socialLinks={mockSocialLinks} />);
    expect(screen.getByRole('link', { name: /github/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /linkedin/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /twitter/i })).toBeInTheDocument();
  });

  it('renders links with correct href', () => {
    render(<ContactSection socialLinks={mockSocialLinks} />);
    const githubLink = screen.getByRole('link', { name: /github/i });
    expect(githubLink).toHaveAttribute('href', 'https://github.com/johndoe');
  });

  it('renders links with target _blank and rel noopener noreferrer', () => {
    render(<ContactSection socialLinks={mockSocialLinks} />);
    const githubLink = screen.getByRole('link', { name: /github/i });
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders section with correct id', () => {
    const { container } = render(<ContactSection socialLinks={mockSocialLinks} />);
    const section = container.querySelector('#contact');
    expect(section).toBeInTheDocument();
  });

  it('renders empty state when no social links provided', () => {
    render(<ContactSection socialLinks={[]} />);
    expect(screen.getByText(/no contact information available/i)).toBeInTheDocument();
  });
});
