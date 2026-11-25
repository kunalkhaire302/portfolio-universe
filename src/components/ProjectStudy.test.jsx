import { render, screen } from '@testing-library/react';
import projects from '../data/projects.json';
import ProjectStudy, { resolveProject } from './ProjectStudy';

test('each card has a unique route and pinned documentation', () => {
  expect(new Set(projects.map(p => p.slug)).size).toBe(projects.length);
  for (const p of projects) {
    expect(resolveProject('/projects/' + p.slug + '/')).toBe(p);
    expect(p.sources.commit).toMatch(/^[a-f0-9]{40}$/);
    expect(p.sources.paths).toContain('README.md');
  }
});

test('an unknown or extra path segment renders recovery navigation', () => {
  expect(resolveProject('/projects/placementx/extra')).toBeFalsy();
  render(<ProjectStudy project={resolveProject('/projects/unknown')} />);
  expect(screen.getByRole('heading', {level: 1})).toHaveTextContent('Page not found');
  expect(screen.getByRole('link', {name: /back to projects/i})).toHaveAttribute('href', '/#projects');
});

test('a short study omits empty sections and unavailable demo links', () => {
  render(<ProjectStudy project={resolveProject('/projects/smart-guard')} />);
  expect(screen.queryByText('Engineering decisions')).toBeNull();
  expect(screen.queryByRole('link', {name: /live demo/i})).toBeNull();
  expect(document.title).toMatch(/Smart Guard/);
});
