import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaBrain, FaCode, FaDatabase, FaServer } from 'react-icons/fa';

const easeOut = [0.23, 1, 0.32, 1];
const nodes = [
    {
        id: 'frontend',
        label: 'Frontend',
        stack: 'React / Next.js',
        detail: 'Accessible interfaces, interaction systems, and responsive product experiences.',
        icon: FaCode,
        position: 'north-west',
        path: 'M50 50 L22 24',
    },
    {
        id: 'backend',
        label: 'Backend',
        stack: 'Node.js / APIs',
        detail: 'Scalable services, secure application logic, and reliable API contracts.',
        icon: FaServer,
        position: 'north-east',
        path: 'M50 50 L78 24',
    },
    {
        id: 'ai',
        label: 'AI / ML',
        stack: 'Python / Models',
        detail: 'Applied intelligence, prediction workflows, and data-informed automation.',
        icon: FaBrain,
        position: 'south-west',
        path: 'M50 50 L22 76',
    },
    {
        id: 'data',
        label: 'Cloud & Database',
        stack: 'PostgreSQL / Cloud',
        detail: 'Durable data models, deployment systems, and production infrastructure.',
        icon: FaDatabase,
        position: 'south-east',
        path: 'M50 50 L78 76',
    },
];

const HeroArchitecture = ({ reducedMotion, scrollStyle }) => {
    const [activeId, setActiveId] = useState(nodes[0].id);
    const activeNode = nodes.find((node) => node.id === activeId) || nodes[0];

    return (
        <motion.aside className="hero-architecture" aria-labelledby="architecture-title" style={scrollStyle}>
            <header className="architecture-header">
                <div>
                    <span>System map / 04 layers</span>
                    <h2 id="architecture-title">The Digital Architecture</h2>
                </div>
                <i aria-hidden="true" />
            </header>

            <div className="architecture-map" onMouseLeave={() => setActiveId(nodes[0].id)}>
                <svg aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none" className="architecture-lines">
                    {nodes.map((node, index) => (
                        <motion.path
                            key={node.id}
                            d={node.path}
                            className={node.id === activeId ? 'is-active' : undefined}
                            initial={reducedMotion ? false : { pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ delay: 0.5 + index * 0.1, duration: 0.65, ease: easeOut }}
                        />
                    ))}
                </svg>

                <motion.div
                    aria-hidden="true"
                    className="architecture-core"
                    initial={reducedMotion ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.48, duration: 0.55, ease: easeOut }}
                >
                    <span>Build</span>
                    <i />
                </motion.div>

                {nodes.map(({ id, label, stack, icon: Icon, position }, index) => {
                    const active = id === activeId;
                    return (
                        <motion.button
                            key={id}
                            type="button"
                            className={`architecture-node architecture-node--${position} ${active ? 'is-active' : ''}`}
                            aria-pressed={active}
                            aria-describedby="architecture-detail"
                            aria-label={`Explore ${label} architecture layer`}
                            onMouseEnter={() => setActiveId(id)}
                            onFocus={() => setActiveId(id)}
                            onClick={() => setActiveId(id)}
                            initial={reducedMotion ? false : { opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.56 + [0, 0.16, 0.27, 0.36][index], duration: 0.5, ease: easeOut }}
                        >
                            <span className="architecture-node__icon"><Icon aria-hidden="true" /></span>
                            <span>
                                <strong>{label}</strong>
                                <small>{stack}</small>
                            </span>
                        </motion.button>
                    );
                })}
            </div>

            <div id="architecture-detail" className="architecture-detail" aria-live="polite">
                <span>{activeNode.label}</span>
                <p>{activeNode.detail}</p>
            </div>
        </motion.aside>
    );
};

export default HeroArchitecture;
