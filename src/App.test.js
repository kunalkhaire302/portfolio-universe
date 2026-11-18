import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('./components/UI/CustomCursor', () => function CustomCursor() { return null; });
jest.mock('./components/UI/ScrollProgress', () => function ScrollProgress() { return null; });
jest.mock('./components/ParticleBackground', () => function ParticleBackground() { return null; });
jest.mock('./components/Layout/Navigation', () => function Navigation() { return <nav aria-label="Primary" />; });
jest.mock('./components/Layout/Footer', () => function Footer() { return <footer />; });
jest.mock('./components/Sections/HeroSection', () => function HeroSection() {
  return <section><h1>Portfolio home</h1></section>;
});
jest.mock('./components/Sections/AboutSection', () => function AboutSection() { return <section />; });
jest.mock('./components/Sections/SkillsSection', () => function SkillsSection() { return <section />; });
jest.mock('./components/Sections/ProjectsSection', () => function ProjectsSection() { return <section />; });
jest.mock('./components/Sections/ExperienceSection', () => function ExperienceSection() { return <section />; });
jest.mock('./components/Sections/CertificationSection', () => function CertificationSection() { return <section />; });
jest.mock('./components/Sections/ContactSection', () => function ContactSection() { return <section />; });

test('renders the portfolio immediately', () => {
  render(<App />);

  expect(screen.getByRole('heading', { name: /portfolio home/i })).toBeInTheDocument();
  expect(screen.queryByText(/system initialization/i)).not.toBeInTheDocument();
});
