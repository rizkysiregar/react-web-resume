import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import type { Project } from '@/domain/entities';
import { ProjectsSection } from './ProjectsSection';

describe('ProjectsSection', () => {
  const mockProjects: Project[] = [
    {
      id: '1',
      title: 'Project Alpha',
      description: 'A web application',
      thumbnailUrl: 'https://example.com/alpha.jpg',
      techStack: ['React', 'TypeScript'],
      demoUrl: 'https://alpha.example.com',
      repositoryUrl: 'https://github.com/user/alpha',
      displayOrder: 1,
      isFeatured: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      title: 'Project Beta',
      description: 'An open-source library',
      thumbnailUrl: null,
      techStack: ['Node.js', 'TypeScript'],
      demoUrl: null,
      repositoryUrl: 'https://github.com/user/beta',
      displayOrder: 2,
      isFeatured: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '3',
      title: 'Project Gamma',
      description: 'A mobile app',
      thumbnailUrl: 'https://example.com/gamma.jpg',
      techStack: ['React Native'],
      demoUrl: 'https://gamma.example.com',
      repositoryUrl: null,
      displayOrder: 3,
      isFeatured: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  it('renders the section heading', () => {
    render(<ProjectsSection projects={mockProjects} />);
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Projects');
  });

  it('renders all project cards', () => {
    render(<ProjectsSection projects={mockProjects} />);
    expect(screen.getByText('Project Alpha')).toBeInTheDocument();
    expect(screen.getByText('Project Beta')).toBeInTheDocument();
    expect(screen.getByText('Project Gamma')).toBeInTheDocument();
  });

  it('renders empty state when no projects are provided', () => {
    render(<ProjectsSection projects={[]} />);
    expect(screen.getByText(/no projects available/i)).toBeInTheDocument();
  });

  it('renders section with correct id', () => {
    const { container } = render(<ProjectsSection projects={mockProjects} />);
    const section = container.querySelector('#projects');
    expect(section).toBeInTheDocument();
  });
});
