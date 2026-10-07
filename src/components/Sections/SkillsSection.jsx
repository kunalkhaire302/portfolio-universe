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
            <h2 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-center text-star-white">
                Skill <span className="text-project-purple">Galaxy</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {Object.entries(skills).map(([category, items], index) => (
                    <motion.div
                        key={category}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="glass-card p-4 md:p-5 relative group border border-white/10 hover:border-neon-teal/50 hover:shadow-[0_0_30px_rgba(100,255,218,0.15)] hover:-translate-y-1 transition-all duration-300"
                    >
                        <h3 className="text-lg md:text-xl font-bold text-neon-teal mb-3 md:mb-4 border-b border-white/10 pb-2">{category}</h3>
                        <div className="flex flex-wrap gap-3 md:gap-4">
                            {items.map((skill) => (
                                <div key={skill.name} className="relative flex flex-col items-center gap-1.5 group cursor-pointer">
                                    <motion.div 
                                        whileHover={{ y: -3, scale: 1.1 }}
                                        className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xl md:text-2xl group-hover:bg-gradient-to-br group-hover:from-neon-teal group-hover:to-teal-400 group-hover:text-slate-900 group-hover:border-transparent group-hover:shadow-[0_0_30px_rgba(100,255,218,0.6)] transition-all duration-300"
                                    >
                                        <IconComponent name={skill.icon} />
                                    </motion.div>
                                    <span className="text-[10px] md:text-xs text-slate-400 group-hover:text-star-white font-medium text-center">{skill.name}</span>
                                    
                                    {/* Skill Level Tooltip */}
                                    <div className="absolute -top-10 scale-0 group-hover:scale-100 transition-transform duration-200 bg-space-dark border border-neon-teal text-neon-teal text-[10px] px-2 py-1 rounded-md whitespace-nowrap z-50">
                                        {skill.level}
                                    </div>
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
