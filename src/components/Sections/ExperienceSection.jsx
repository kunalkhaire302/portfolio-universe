import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRightLong } from 'react-icons/fa6';
import SectionContainer from '../Layout/SectionContainer';
import portfolioData from '../../data/portfolioData';

const ExperienceSection = () => (
    <SectionContainer id="experience" className="section--experience">
        <div className="section-heading section-heading--split">
            <div>
                <h2>Experience</h2>
            </div>
            <p>Professional roles and technical experiences that shaped how I approach products, teams, and engineering problems.</p>
        </div>

        <div className="experience-timeline">
            <motion.div
                aria-hidden="true"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                className="experience-timeline__line"
            />

            {portfolioData.experience.map((item, index) => (
                <motion.article
                    key={item.id}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
                    className="experience-entry"
                >
                    <span className="experience-entry__marker">{String(index + 1).padStart(2, '0')}</span>
                    <div className="experience-entry__meta">
                        <time>{item.duration}</time>
                        <span>{item.type}</span>
                    </div>
                    <div className="experience-entry__content">
                        <p>{item.company}</p>
                        <h3>{item.position}</h3>
                        <ul>
                            {item.achievements.map((achievement) => (
                                <li key={achievement}><FaArrowRightLong aria-hidden="true" /> {achievement}</li>
                            ))}
                        </ul>
                    </div>
                </motion.article>
            ))}
        </div>
    </SectionContainer>
);

export default ExperienceSection;
