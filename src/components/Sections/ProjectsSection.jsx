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

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                {projects.map((project, index) => (
                    <motion.div
                        key={project.id}
                        initial={{ y: 50, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className={`group relative glass-morphism p-8 flex flex-col h-full rounded-2xl transition-all duration-500 hover:-translate-y-2 ${bgVariants[project.color] || ''}`}
                    >
                        {/* Decorative Gradient Blob */}
                        <div className={`absolute -top-10 -right-10 w-32 h-32 blur-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-full ${project.color === 'electric-blue' ? 'bg-blue-500' : project.color === 'neon-teal' ? 'bg-teal-500' : 'bg-purple-500'}`} />

                        <div className="flex justify-between items-start mb-8">
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl border border-white/10 bg-white/5 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 ${colorVariants[project.color] || ''}`}>
                                {iconMap[project.icon] || <FaRocket />}
                            </div>
                            <div className="flex gap-3">
                                {project.github && (
                                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-all" title="GitHub">
                                        <FaGithub className="text-xl" />
                                    </a>
                                )}
                                {project.live && (
                                    <a href={project.live} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-all" title="Live Demo">
                                        <FaExternalLinkAlt className="text-xl" />
                                    </a>
                                )}
                            </div>
                        </div>

                        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-neon-teal transition-colors">{project.title}</h3>
                        <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">{project.description}</p>

                        <div className="flex flex-wrap gap-2 mb-6">
                            {project.technologies.slice(0, 4).map((tech) => (
                                <span key={tech} className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md bg-white/5 border border-white/10 text-slate-300">
                                    {tech}
                                </span>
                            ))}
                        </div>

                        <a 
                            href={project.live || project.github} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-center text-sm font-bold uppercase tracking-widest text-white hover:bg-neon-teal hover:text-slate-900 hover:border-neon-teal transition-all duration-300"
                        >
                            Explore Project
                        </a>
                    </motion.div>
                ))}
            </div>
        </SectionContainer>
    );
};

export default ProjectsSection;
