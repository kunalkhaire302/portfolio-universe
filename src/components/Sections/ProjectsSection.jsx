import React from 'react';
import { motion } from 'framer-motion';
import {
    FaChartBar, FaCog, FaGraduationCap, FaHome, FaLeaf, FaLock,
    FaRocket, FaShoppingCart, FaUserShield,
} from 'react-icons/fa';
import { FaArrowUpRightFromSquare, FaGithub } from 'react-icons/fa6';
import SectionContainer from '../Layout/SectionContainer';
import portfolioData from '../../data/portfolioData';

const iconMap = {
    FaRocket, FaShoppingCart, FaLock, FaUserShield, FaCog,
    FaChartBar, FaHome, FaLeaf, FaGraduationCap,
};

const ProjectActions = ({ project }) => (
    <div className="project-actions">
        {project.live && (
            <a href={project.live} target="_blank" rel="noopener noreferrer">
                Live demo <FaArrowUpRightFromSquare aria-hidden="true" />
            </a>
        )}
        {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-actions__secondary">
                Source <FaGithub aria-hidden="true" />
            </a>
        )}
    </div>
);

const FeaturedProject = ({ project, index }) => {
    const Icon = iconMap[project.icon] || FaRocket;

    return (
        <article id={`project-${project.id}`} className="featured-project" style={{ '--stack-index': index }}>
            <div className="featured-project__content">
                <div className="featured-project__meta">
                    <span>Featured build / 0{index + 1}</span>
                    <span>{project.technologies.length} technologies</span>
                </div>
                <div>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                </div>
                <ul className="feature-list" aria-label={`${project.title} capabilities`}>
                    {project.features.slice(0, 4).map((feature) => <li key={feature}>{feature}</li>)}
                </ul>
                <ul className="technology-list" aria-label={`${project.title} technologies`}>
                    {project.technologies.map((technology) => <li key={technology}>{technology}</li>)}
                </ul>
                <ProjectActions project={project} />
            </div>

            <div className="featured-project__visual" aria-hidden="true">
                <div className="project-blueprint">
                    <span className="project-blueprint__label">System blueprint</span>
                    <Icon />
                    <i className="project-blueprint__line project-blueprint__line--one" />
                    <i className="project-blueprint__line project-blueprint__line--two" />
                    <i className="project-blueprint__node project-blueprint__node--one" />
                    <i className="project-blueprint__node project-blueprint__node--two" />
                    <i className="project-blueprint__node project-blueprint__node--three" />
                    <span className="project-blueprint__status">Operational</span>
                </div>
            </div>
        </article>
    );
};

const ProjectCard = ({ project, index }) => {
    const Icon = iconMap[project.icon] || FaRocket;

    return (
        <motion.article
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
            className="project-card"
            id={`project-${project.id}`}
        >
            <div className="project-card__topline">
                <span><Icon aria-hidden="true" /></span>
                <span>{String(index + 1).padStart(2, '0')}</span>
            </div>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <ul className="technology-list" aria-label={`${project.title} technologies`}>
                {project.technologies.map((technology) => <li key={technology}>{technology}</li>)}
            </ul>
            <ProjectActions project={project} />
        </motion.article>
    );
};

const ProjectsSection = () => {
    const featuredProjects = portfolioData.projects.filter((project) => project.featured);
    const otherProjects = portfolioData.projects.filter((project) => !project.featured);

    return (
        <SectionContainer id="projects" className="section--projects">
            <div className="section-heading section-heading--split">
                <div>
                    <h2>Products built for <span>real use.</span></h2>
                </div>
                <p>Full-stack platforms, intelligent workflows, and data products built with practical constraints in mind.</p>
            </div>

            <div className="featured-projects">
                {featuredProjects.map((project, index) => <FeaturedProject key={project.id} project={project} index={index} />)}
            </div>

            <div className="project-archive-heading">
                <h3>Project archive</h3>
                <span>{otherProjects.length} additional builds</span>
            </div>
            <div className="project-grid">
                {otherProjects.map((project, index) => <ProjectCard key={project.id} project={project} index={index} />)}
            </div>
        </SectionContainer>
    );
};

export default ProjectsSection;
