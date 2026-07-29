import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProjectCard } from './ProjectCard';

describe('ProjectCard', () => {
  const defaultProps = {
    title: 'Project Alpha',
    description: 'A revolutionary web application that does amazing things.',
    techStack: ['React', 'TypeScript', 'Next.js'],
  };

  it('renders the project title', () => {
    render(<ProjectCard {...defaultProps} />);
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Project Alpha');
  });

  it('renders the project description', () => {
    render(<ProjectCard {...defaultProps} />);
    expect(
      screen.getByText('A revolutionary web application that does amazing things.'),
    ).toBeInTheDocument();
  });

  it('renders all tech stack items', () => {
    render(<ProjectCard {...defaultProps} />);
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Next.js')).toBeInTheDocument();
  });

  it('renders thumbnail image when thumbnailUrl is provided', () => {
    render(<ProjectCard {...defaultProps} thumbnailUrl="https://example.com/thumb.jpg" />);
    const image = screen.getByAltText('Project Alpha thumbnail');
    expect(image).toBeInTheDocument();
  });

  it('renders placeholder when thumbnailUrl is not provided', () => {
    render(<ProjectCard {...defaultProps} />);
    const placeholder = screen.getByTestId('placeholder-image');
    expect(placeholder).toBeInTheDocument();
  });

  it('renders demo link when demoUrl is provided', () => {
    render(<ProjectCard {...defaultProps} demoUrl="https://demo.example.com" />);
    const demoLink = screen.getByRole('link', { name: /demo/i });
    expect(demoLink).toHaveAttribute('href', 'https://demo.example.com');
    expect(demoLink).toHaveAttribute('target', '_blank');
    expect(demoLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders repository link when repositoryUrl is provided', () => {
    render(<ProjectCard {...defaultProps} repositoryUrl="https://github.com/user/repo" />);
    const repoLink = screen.getByRole('link', { name: /repository/i });
    expect(repoLink).toHaveAttribute('href', 'https://github.com/user/repo');
    expect(repoLink).toHaveAttribute('target', '_blank');
    expect(repoLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('does not render demo link when demoUrl is null', () => {
    render(<ProjectCard {...defaultProps} />);
    expect(screen.queryByRole('link', { name: /demo/i })).not.toBeInTheDocument();
  });

  it('does not render repository link when repositoryUrl is null', () => {
    render(<ProjectCard {...defaultProps} />);
    expect(screen.queryByRole('link', { name: /repository/i })).not.toBeInTheDocument();
  });

  it('truncates long descriptions', () => {
    const longDescription = 'A'.repeat(200);
    render(<ProjectCard {...defaultProps} description={longDescription} />);
    const descriptionElement = screen.getByTestId('project-description');
    expect(descriptionElement.textContent!.length).toBeLessThanOrEqual(153);
  });
});
