import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Navigation } from './Navigation';

describe('Navigation', () => {
  const mockSections = [
    { id: 'profile', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  it('renders navigation with correct aria-label', () => {
    render(<Navigation sections={mockSections} />);
    expect(screen.getByRole('navigation', { name: /main navigation/i })).toBeInTheDocument();
  });

  it('renders all section links', () => {
    render(<Navigation sections={mockSections} />);
    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute('href', '#profile');
    expect(screen.getByRole('link', { name: 'Projects' })).toHaveAttribute('href', '#projects');
    expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '#contact');
  });

  it('renders hamburger menu button on mobile', () => {
    render(<Navigation sections={mockSections} />);
    const menuButton = screen.getByRole('button', { name: /menu/i });
    expect(menuButton).toBeInTheDocument();
  });

  it('hamburger menu button is hidden on desktop', () => {
    render(<Navigation sections={mockSections} />);
    const menuButton = screen.getByRole('button', { name: /menu/i });
    expect(menuButton).toHaveClass('md:hidden');
  });

  it('desktop navigation links are hidden on mobile', () => {
    render(<Navigation sections={mockSections} />);
    const desktopNav = screen.getByTestId('desktop-nav');
    expect(desktopNav).toHaveClass('hidden', 'md:flex');
  });
});
