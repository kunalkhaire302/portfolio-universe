import React from 'react';
import SectionContainer from '../Layout/SectionContainer';
import portfolioData from '../../data/portfolioData';
import { motion } from 'framer-motion';
import { 
    FaGithub, 
    FaExternalLinkAlt, 
    FaRocket, 
    FaChartLine, 
    FaShoppingCart, 
    FaLock, 
    FaUserShield, 
    FaCog, 
    FaChartBar, 
    FaHome,
    FaWallet,
    FaLeaf,
    FaUniversity 
} from 'react-icons/fa';

const ProjectsSection = () => {
    const { projects } = portfolioData;

    const iconMap = {
        'FaRocket': <FaRocket />,
        'FaChartLine': <FaChartLine />,
        'FaShoppingCart': <FaShoppingCart />,
        'FaLock': <FaLock />,
        'FaUserShield': <FaUserShield />,
        'FaCog': <FaCog />,
        'FaChartBar': <FaChartBar />,
        'FaHome': <FaHome />,
        'FaWallet': <FaWallet />,
        'FaLeaf': <FaLeaf />,
        'FaUniversity': <FaUniversity />,
    };

    const colorVariants = {
        'electric-blue': 'border-electric-blue text-electric-blue',
        'neon-teal': 'border-neon-teal text-neon-teal',
        'project-purple': 'border-project-purple text-project-purple',
    };

    const bgVariants = {
        'electric-blue': 'hover:shadow-[0_0_30px_rgba(0,212,255,0.3)]',
        'neon-teal': 'hover:shadow-[0_0_30px_rgba(100,255,218,0.3)]',
        'project-purple': 'hover:shadow-[0_0_30px_rgba(123,44,191,0.3)]',
    };

    return (
        <SectionContainer id="projects">
            <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center text-star-white">
                Project <span className="text-electric-blue">Nebula</span>
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => (
                    <motion.div
                        key={project.id}
                        initial={{ y: 50, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className={`glass-card p-6 flex flex-col h-full transition-all duration-300 ${bgVariants[project.color] || ''}`}
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-full bg-opacity-10 bg-white ${colorVariants[project.color] || ''}`}>
                                <span className="text-2xl">
                                    {iconMap[project.icon] || <FaRocket />}
                                </span>
                            </div>
                            <div className="flex gap-4">
                                {project.github && (
                                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-2xl text-slate-400 hover:text-white transition-colors" title="GitHub Repository">
                                        <FaGithub />
                                    </a>
                                )}
                                {project.live && (
                                    <a href={project.live} target="_blank" rel="noopener noreferrer" className="text-2xl text-slate-400 hover:text-white transition-colors" title="Live Demo">
                                        <FaExternalLinkAlt />
                                    </a>
                                )}
                            </div>
                        </div>

                        <h3 className="text-xl font-bold text-star-white mb-2 capitalize">{project.title}</h3>
                        <p className="text-slate-400 text-sm mb-4 flex-grow line-clamp-3">{project.description}</p>

                        {project.features.length > 0 && (
                            <div className="mb-4">
                                <ul className="list-disc list-inside text-sm text-slate-500">
                                    {project.features.map((feature, i) => (
                                        <li key={i}>{feature}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <div className="flex flex-wrap gap-2 mt-auto">
                            {project.technologies.map((tech) => (
                                <span key={tech} className="text-xs font-mono px-2 py-1 rounded bg-space-light/10 text-neon-teal">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </SectionContainer>
    );
};

export default ProjectsSection;
