import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight, FaDownload, FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';

const technologies = ['React', 'Next.js', 'Node.js', 'Python', 'PostgreSQL', 'AI / ML'];
const easeOut = [0.23, 1, 0.32, 1];

const group = {
    hidden: {},
    visible: { transition: { delayChildren: 0.06, staggerChildren: 0.08 } },
};

const lead = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
};

const support = {
    hidden: { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.48, ease: easeOut } },
};

const HeroContent = ({ personalInfo }) => {
    const [firstName, lastName] = personalInfo.name.split(' ');
    const socialLinks = [
        { icon: FaGithub, href: personalInfo.github, label: 'GitHub' },
        { icon: FaLinkedin, href: personalInfo.linkedin, label: 'LinkedIn' },
        { icon: FaEnvelope, href: `mailto:${personalInfo.email}`, label: 'Email' },
    ];

    return (
        <motion.div
            variants={group}
            initial="hidden"
            animate="visible"
            className="hero-content relative z-20 flex min-w-0 flex-col items-center justify-center text-center"
        >
            <motion.div variants={support} className="hero-eyebrow">
                <span className="hero-eyebrow__dot" />
                Digital architect / Full-stack systems
            </motion.div>

            <motion.h1 variants={lead} className="hero-name">
                <span>{firstName}</span>
                <span>{lastName}</span>
            </motion.h1>

            <motion.div variants={support} className="hero-intro">
                <h2>{personalInfo.title}</h2>
                <p>{personalInfo.summary}</p>
            </motion.div>

            <motion.ul variants={support} className="hero-tech" aria-label="Core technologies">
                {technologies.map((technology) => <li key={technology}>{technology}</li>)}
            </motion.ul>

            <motion.div variants={support} className="hero-actions">
                <a href="#projects" className="button button--primary">
                    Explore my work <FaArrowRight aria-hidden="true" />
                </a>
                <a href="#contact" className="button button--secondary">
                    Get in touch <FaEnvelope aria-hidden="true" />
                </a>
                <a href={`${process.env.PUBLIC_URL}/Kunal_Khaire_Resume.pdf`} download="Kunal_Khaire_Resume.pdf" className="button button--quiet">
                    Résumé <FaDownload aria-hidden="true" />
                </a>
            </motion.div>

            <motion.div variants={support} className="hero-socials">
                <span>Connect</span>
                {socialLinks.map(({ icon: Icon, href, label }) => (
                    <a
                        key={label}
                        href={href}
                        target={label === 'Email' ? undefined : '_blank'}
                        rel={label === 'Email' ? undefined : 'noopener noreferrer'}
                        aria-label={label}
                    >
                        <Icon aria-hidden="true" />
                    </a>
                ))}
            </motion.div>
        </motion.div>
    );
};

export default HeroContent;
