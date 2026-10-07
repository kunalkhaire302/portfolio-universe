import React from 'react';
import SectionContainer from '../Layout/SectionContainer';
import portfolioData from '../../data/portfolioData';
import { motion } from 'framer-motion';

const ExperienceSection = () => {
    const { experience } = portfolioData;

    return (
        <SectionContainer id="experience">
            <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center text-star-white">
                Experience <span className="text-planet-orange">Asteroid Belt</span>
            </h2>

            <div className="relative max-w-3xl mx-auto">
                {/* Central Line */}
                <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-1 bg-space-light/10 transform -translate-x-1/2 hidden md:block" />

                {experience.map((exp, index) => (
                    <motion.div
                        key={exp.id}
                        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                        className={`relative mb-12 flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''
                            }`}
                    >
                        {/* Spacer */}
                        <div className="flex-1 w-full" />

                        {/* Center Node */}
                        <div className="relative z-10 hidden md:flex items-center mx-4">
                            <div className="w-6 h-6 rounded-full bg-planet-orange border-4 border-space-dark relative z-10" />
                            <div className="absolute inset-0 bg-planet-orange rounded-full blur-[8px] opacity-30 animate-pulse" />
                        </div>

                        {/* Content Card */}
                        <motion.div 
                            whileHover={{ scale: 1.02 }}
                            className="flex-1 w-full glass-card p-6 relative hover:border-planet-orange/50 transition-all duration-300 group"
                        >
                            {/* Triangle Arrow */}
                            <div className={`absolute top-6 w-0 h-0 border-[10px] border-transparent ${
                                index % 2 === 0 
                                ? 'right-[-20px] border-l-space-blue/30' 
                                : 'left-[-20px] border-r-space-blue/30'
                            }`} />
                            
                            <span className="text-xs font-mono text-planet-orange mb-2 block">{exp.duration}</span>
                            <h3 className="text-xl font-bold text-white group-hover:text-planet-orange transition-colors">{exp.position}</h3>
                            <h4 className="text-lg text-slate-400 mb-4">{exp.company} • {exp.type}</h4>
                            <ul className="list-disc list-inside text-sm text-slate-300 space-y-2">
                                {exp.achievements.map((item, i) => (
                                    <li key={i} className="leading-relaxed">{item}</li>
                                ))}
                            </ul>
                        </motion.div>
                    </motion.div>
                ))}
            </div>
        </SectionContainer>
    );
};

export default ExperienceSection;
