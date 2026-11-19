import { fireEvent, render, screen } from '@testing-library/react';
import ProjectConstellation from './ProjectConstellation';

const projects = [
    {
        id: 1,
        title: 'First Project',
        description: 'First project description',
        technologies: ['React', 'Node.js'],
        live: 'https://example.com/first',
        featured: true,
    },
    {
        id: 2,
        title: 'Second Project',
        description: 'Second project description',
        technologies: ['Python'],
        github: 'https://example.com/second',
    },
];

test('updates the project preview when a constellation node receives focus', async () => {
    render(<ProjectConstellation projects={projects} />);

    expect(screen.getByRole('heading', { name: 'First Project' })).toBeInTheDocument();

    const secondNode = screen.getByRole('link', { name: 'Open Second Project' });
    fireEvent.focus(secondNode);

    expect(await screen.findByRole('heading', { name: 'Second Project' })).toBeInTheDocument();
    expect(secondNode).toHaveAttribute('href', 'https://example.com/second');
});
