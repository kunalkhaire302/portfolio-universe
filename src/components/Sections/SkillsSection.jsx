import React from 'react';
import SectionContainer from '../Layout/SectionContainer';
import portfolioData from '../../data/portfolioData';
import { motion } from 'framer-motion';
import * as FaIcons from 'react-icons/fa';
import * as SiIcons from 'react-icons/si';

const IconComponent = ({ name }) => {
    // Simple icon mapper
    const Icon = FaIcons[name] || SiIcons[name] || FaIcons.FaCode;
    return <Icon />;
};

const SkillsSection = () => {
    const { skills } = portfolioData;

    return (
        <SectionContainer id="skills">
            <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center text-star-white">
                Skill <span className="text-project-purple">Galaxy</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Object.entries(skills).map(([category, items], index) => (
                    <motion.div
                        key={category}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="glass-card p-6"
                    >
                        <h3 className="text-xl font-bold text-neon-teal mb-6 border-b border-white/10 pb-2">{category}</h3>
                        <div className="flex flex-wrap gap-4">
                            {items.map((skill) => (
                                <div key={skill.name} className="flex flex-col items-center gap-2 group cursor-pointer">
                                    <div className="w-12 h-12 rounded-full bg-space-light/10 flex items-center justify-center text-2xl group-hover:bg-neon-teal group-hover:text-space-dark transition-all duration-300">
                                        <IconComponent name={skill.icon} />
                                    </div>
                                    <span className="text-sm text-slate-400 group-hover:text-star-white">{skill.name}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </SectionContainer>
    );
};

export default SkillsSection;
