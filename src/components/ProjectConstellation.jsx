import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';

const positions = [
    { x: 50, y: 18 },
    { x: 77, y: 35 },
    { x: 68, y: 70 },
    { x: 35, y: 78 },
    { x: 19, y: 48 },
    { x: 42, y: 48 },
];

const connections = [
    [0, 1], [0, 5], [1, 2], [1, 5], [2, 3],
    [2, 5], [3, 4], [3, 5], [4, 5], [0, 4],
];

const projectUrl = (project) => project.live || project.github;

const ProjectConstellation = ({ projects }) => {
    const visibleProjects = useMemo(() => [
        ...projects.filter((project) => project.featured),
        ...projects.filter((project) => !project.featured),
    ].filter(projectUrl).slice(0, positions.length), [projects]);
    const [activeId, setActiveId] = useState(visibleProjects[0]?.id);
    const activeIndex = Math.max(visibleProjects.findIndex((project) => project.id === activeId), 0);
    const activeProject = visibleProjects[activeIndex];

    if (!activeProject) return null;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.23, 1, 0.32, 1] }}
            className="constellation-panel"
        >
            <div className="constellation-panel__header">
                <span><i /> Project network</span>
                <span>{String(visibleProjects.length).padStart(2, '0')} live nodes</span>
            </div>

            <div className="constellation-map" data-active={activeProject.id}>
                <svg aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none" className="constellation-lines">
                    {connections.map(([from, to]) => {
                        if (!visibleProjects[from] || !visibleProjects[to]) return null;
                        const highlighted = from === activeIndex || to === activeIndex;
                        return (
                            <line
                                key={`${from}-${to}`}
                                x1={positions[from].x}
                                y1={positions[from].y}
                                x2={positions[to].x}
                                y2={positions[to].y}
                                className={highlighted ? 'is-active' : ''}
                            />
                        );
                    })}
                </svg>

                {visibleProjects.map((project, index) => {
                    const active = project.id === activeProject.id;
                    return (
                        <a
                            key={project.id}
                            href={projectUrl(project)}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Open ${project.title}`}
                            aria-current={active ? 'true' : undefined}
                            onMouseEnter={() => setActiveId(project.id)}
                            onFocus={() => setActiveId(project.id)}
                            className={`constellation-node ${active ? 'is-active' : ''}`}
                            style={{ left: `${positions[index].x}%`, top: `${positions[index].y}%`, '--node-delay': `${index * -0.8}s` }}
                        >
                            <span className="constellation-node__core" />
                            <span className="constellation-node__label">{project.title}</span>
                        </a>
                    );
                })}

                <div aria-hidden="true" className="constellation-particles">
                    {[18, 31, 47, 63, 82].map((left, index) => (
                        <i key={left} style={{ left: `${left}%`, top: `${22 + (index % 3) * 23}%`, animationDelay: `${index * -1.1}s` }} />
                    ))}
                </div>
            </div>

            <div className="constellation-preview" aria-live="polite">
                <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                        key={activeProject.id}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
                    >
                        <div className="constellation-preview__meta">
                            <span>{activeProject.featured ? 'Featured build' : 'Selected build'}</span>
                            <span>{String(activeIndex + 1).padStart(2, '0')}</span>
                        </div>
                        <h2>{activeProject.title}</h2>
                        <p>{activeProject.description}</p>
                        <div className="constellation-preview__footer">
                            <ul aria-label={`${activeProject.title} technologies`}>
                                {activeProject.technologies.slice(0, 3).map((technology) => <li key={technology}>{technology}</li>)}
                            </ul>
                            <a href={projectUrl(activeProject)} target="_blank" rel="noopener noreferrer">
                                View project <FaArrowUpRightFromSquare aria-hidden="true" />
                            </a>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default ProjectConstellation;
