import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HeroSection } from './HeroSection';

describe('HeroSection', () => {
  const defaultProps = {
    name: 'John Doe',
    photoUrl: 'https://example.com/photo.jpg',
    description: 'A passionate developer building amazing things.',
  };

  it('renders the profile name', () => {
    render(<HeroSection {...defaultProps} />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('John Doe');
  });

  it('renders the profile description', () => {
    render(<HeroSection {...defaultProps} />);
    expect(screen.getByText('A passionate developer building amazing things.')).toBeInTheDocument();
  });

  it('renders the profile photo with correct alt text', () => {
    render(<HeroSection {...defaultProps} />);
    const image = screen.getByAltText("John Doe's photo");
    expect(image).toBeInTheDocument();
  });

  it('renders the motto when provided', () => {
    render(<HeroSection {...defaultProps} motto="Building things that matter" />);
    expect(screen.getByText('Building things that matter')).toBeInTheDocument();
  });

  it('does not render motto when not provided', () => {
    render(<HeroSection {...defaultProps} />);
    expect(screen.queryByText('Building things that matter')).not.toBeInTheDocument();
  });

  it('does not render motto when null', () => {
    render(<HeroSection {...defaultProps} motto={null} />);
    const mottoElement = screen.queryByTestId('motto');
    expect(mottoElement).not.toBeInTheDocument();
  });
});
