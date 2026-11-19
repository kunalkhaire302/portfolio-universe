import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight, FaDownload, FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';

const technologies = ['React', 'Next.js', 'Node.js', 'Python', 'PostgreSQL', 'AI / ML'];
const easeOut = [0.23, 1, 0.32, 1];
const entrance = (delay, distance = 8, duration = 0.42) => ({
    initial: { opacity: 0, y: distance },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration, ease: easeOut },
});

const HeroContent = ({ personalInfo, reducedMotion, scrollStyles = {} }) => {
    const [firstName, lastName] = personalInfo.name.split(' ');
    const socialLinks = [
        { icon: FaGithub, href: personalInfo.github, label: 'GitHub' },
        { icon: FaLinkedin, href: personalInfo.linkedin, label: 'LinkedIn' },
        { icon: FaEnvelope, href: `mailto:${personalInfo.email}`, label: 'Email' },
    ];
    const animation = (delay, distance, duration) => reducedMotion ? { initial: false } : entrance(delay, distance, duration);
    const badgeDelays = [0, 0.08, 0.14, 0.19, 0.23, 0.26];

    return (
        <div className="hero-content">
            <motion.div {...animation(0.05, 0, 0.4)} className="hero-eyebrow">
                <span className="hero-eyebrow__dot" />
                Full-stack engineering / AI applications
            </motion.div>

            <h1 className="hero-name" aria-label={personalInfo.name}>
                <motion.span className="hero-name__line" style={scrollStyles.firstName}>
                    <motion.span aria-hidden="true" {...animation(0.15, 18, 0.55)}>{firstName}</motion.span>
                </motion.span>
                <motion.span className="hero-name__line" style={scrollStyles.lastName}>
                    <motion.span aria-hidden="true" {...animation(0.3, 22, 0.55)}>{lastName}</motion.span>
                </motion.span>
            </h1>

            <motion.div className="hero-intro" style={scrollStyles.support}>
                <motion.h2 {...animation(0.55, 10, 0.4)}>{personalInfo.title}</motion.h2>
                <motion.p {...animation(0.7, 8, 0.4)}>{personalInfo.summary}</motion.p>
            </motion.div>

            <motion.ul className="hero-tech" aria-label="Core technologies" style={scrollStyles.badges}>
                {technologies.map((technology, index) => (
                    <motion.li key={technology} {...animation(0.85 + badgeDelays[index], 7, 0.32)}>{technology}</motion.li>
                ))}
            </motion.ul>

            <motion.div style={scrollStyles.actions}>
                <motion.div {...animation(1, 6, 0.4)} className="hero-actions">
                    <a href="#projects" className="button button--primary">
                        Explore my work <FaArrowRight aria-hidden="true" />
                    </a>
                    <a href={`${process.env.PUBLIC_URL}/Kunal_Khaire_Resume.pdf`} download="Kunal_Khaire_Resume.pdf" className="button button--secondary">
                        Download résumé <FaDownload aria-hidden="true" />
                    </a>
                    <a href="#contact" className="button button--quiet">
                        Get in touch <FaEnvelope aria-hidden="true" />
                    </a>
                </motion.div>
            </motion.div>

            <motion.div style={scrollStyles.socials}>
                <motion.div {...animation(1.15, 4, 0.35)} className="hero-socials">
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
        </div>
    );
};

export default HeroContent;
