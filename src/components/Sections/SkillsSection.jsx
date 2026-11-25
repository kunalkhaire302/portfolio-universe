import React, { useState } from 'react';
import {
    FaBrain, FaCode, FaCss3Alt, FaDatabase, FaGitAlt,
    FaGithub, FaHtml5, FaJs, FaNode, FaPython, FaReact,
} from 'react-icons/fa';
import {
    SiDotnet, SiFastapi, SiNextdotjs, SiPostgresql, SiTensorflow,
    SiExpress, SiFirebase, SiMongodb, SiPostman, SiPrisma, SiRedis,
    SiRender, SiSocketdotio, SiTailwindcss, SiTypescript, SiVercel,
} from 'react-icons/si';
import SectionContainer from '../Layout/SectionContainer';
import portfolioData from '../../data/portfolioData';

const icons = {
    FaBrain, FaCode, FaCss3Alt, FaDatabase, FaGitAlt,
    FaGithub, FaHtml5, FaJs, FaNode, FaPython, FaReact,
    SiDotnet, SiFastapi, SiNextdotjs, SiPostgresql, SiTensorflow,
    SiExpress, SiFirebase, SiMongodb, SiPostman, SiPrisma, SiRedis,
    SiRender, SiSocketdotio, SiTailwindcss, SiTypescript, SiVercel,
};

const SkillIcon = ({ name }) => {
    const Icon = icons[name] || FaCode;
    return <Icon aria-hidden="true" />;
};

const SkillsSection = () => {
    const categories = Object.keys(portfolioData.skills);
    const [activeCategory, setActiveCategory] = useState(categories[0]);
    const activeSkills = portfolioData.skills[activeCategory];

    return (
        <SectionContainer id="skills" className="section--skills">
            <div className="section-heading section-heading--split">
                <div>
                    <h2>A connected <span>technology stack.</span></h2>
                </div>
                <p>Tools are grouped by the role they play in shipping a product—from interface and API design to data, intelligence, and delivery.</p>
            </div>

            <div className="skills-layout">
                <div className="skill-tabs" aria-label="Technology categories">
                    {categories.map((category, index) => (
                        <button
                            key={category}
                            type="button"
                            aria-pressed={category === activeCategory}
                            aria-controls="skill-panel"
                            onClick={() => setActiveCategory(category)}
                        >
                            <span>0{index + 1}</span>
                            {category}
                        </button>
                    ))}
                </div>

                <div
                    id="skill-panel"
                    role="region"
                    aria-label={`${activeCategory} technologies`}
                    aria-live="polite"
                    className="skill-network"
                >
                    <div className="skill-network__core">
                        <span>Active system</span>
                        <strong>{activeCategory}</strong>
                    </div>
                    <div className="skill-network__grid">
                        {activeSkills.map((skill, index) => (
                            <article key={skill.name} className="skill-node" style={{ '--skill-index': index }}>
                                <span className="skill-node__icon"><SkillIcon name={skill.icon} /></span>
                                <h3>{skill.name}</h3>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </SectionContainer>
    );
};

export default SkillsSection;
