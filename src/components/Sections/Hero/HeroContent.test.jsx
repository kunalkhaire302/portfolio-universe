import { render, screen } from '@testing-library/react';
import HeroContent from './HeroContent';

const personalInfo = {
    name: 'Kunal Khaire',
    title: 'Full-Stack Developer & AI Application Builder',
    summary: 'I build intelligent web applications.',
    github: 'https://github.com/kunalkhaire302',
    linkedin: 'https://linkedin.com/in/kunal-khaire',
    email: 'kunalkhaire302@gmail.com',
};

test('preserves the hero actions and social destinations', () => {
    render(<HeroContent personalInfo={personalInfo} reducedMotion />);

    expect(screen.getByRole('heading', { level: 1, name: 'Kunal Khaire' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /explore my work/i })).toHaveAttribute('href', '#projects');
    expect(screen.getByRole('link', { name: /download résumé/i })).toHaveAttribute('href', '/Kunal_Khaire_Resume.pdf');
    expect(screen.getByRole('link', { name: /get in touch/i })).toHaveAttribute('href', '#contact');
    expect(screen.getByRole('link', { name: 'GitHub' })).toHaveAttribute('href', personalInfo.github);
    expect(screen.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute('href', personalInfo.linkedin);
    expect(screen.getByRole('link', { name: 'Email' })).toHaveAttribute('href', `mailto:${personalInfo.email}`);
});
