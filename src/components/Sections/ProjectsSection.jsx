import React from 'react';
import SectionContainer from '../Layout/SectionContainer';
import portfolioData from '../../data/portfolioData';
import { motion } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';

const ProjectsSection = () => {
    const { projects: manualProjects } = portfolioData;
    const [allProjects, setAllProjects] = React.useState(manualProjects);
    const [loading, setLoading] = React.useState(true);

    const colorVariants = {
        'electric-blue': 'border-electric-blue text-electric-blue',
        'neon-teal': 'border-neon-teal text-neon-teal',
        'project-purple': 'border-project-purple text-project-purple',
        'default': 'border-slate-500 text-slate-400'
    };

    const bgVariants = {
        'electric-blue': 'hover:shadow-[0_0_30px_rgba(0,212,255,0.3)]',
        'neon-teal': 'hover:shadow-[0_0_30px_rgba(100,255,218,0.3)]',
        'project-purple': 'hover:shadow-[0_0_30px_rgba(123,44,191,0.3)]',
        'default': 'hover:shadow-[0_0_30px_rgba(148,163,184,0.3)]'
    };

    React.useEffect(() => {
        const fetchGithubRepos = async () => {
            try {
                const response = await fetch('https://api.github.com/users/kunalkhaire302/repos?sort=updated&per_page=100');
                if (!response.ok) throw new Error('Failed to fetch');

                const data = await response.json();

                // 1. Filter and Slice (Limit to top 6 to avoid API rate limits)
                let visibleRepos = data
                    .filter(repo => !repo.fork)
                    .filter(repo => !manualProjects.some(mp => mp.github.toLowerCase() === repo.html_url.toLowerCase()))
                    .slice(0, 6);

                // 2. Fetch READMEs and Languages in parallel
                const projectsWithDetails = await Promise.all(visibleRepos.map(async (repo) => {
                    let description = repo.description; // Default to existing description
                    let languages = [repo.language].filter(Boolean); // Default to primary language

                    try {
                        // Fetch README
                        const readmeResponse = await fetch(`https://api.github.com/repos/kunalkhaire302/${repo.name}/readme`, {
                            headers: { 'Accept': 'application/vnd.github.raw' }
                        });

                        if (readmeResponse.ok) {
                            const rawMarkdown = await readmeResponse.text();
                            // Simple Markdown cleanup to get just text
                            const cleanText = rawMarkdown
                                .replace(/^#+\s+(.*)/gm, '') // Remove headers
                                .replace(/!\[.*?\]\(.*?\)/g, '') // Remove images
                                .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1') // Keep link text, remove url
                                .replace(/```[\s\S]*?```/g, '') // Remove code blocks
                                .replace(/[`*_~]/g, '') // Remove formatting chars
                                .replace(/\n+/g, ' ') // Merge lines
                                .trim();

                            // Take first 150 chars or first sentence
                            if (cleanText.length > 10) {
                                description = cleanText.substring(0, 200) + '...';
                            }
                        }

                        // Fetch Languages
                        const languagesResponse = await fetch(repo.languages_url);
                        if (languagesResponse.ok) {
                            const languagesData = await languagesResponse.json();
                            languages = Object.keys(languagesData).slice(0, 4); // Top 4 languages
                        }

                    } catch (err) {
                        console.warn(`Could not fetch details for ${repo.name}`);
                    }

                    return {
                        id: `gh-${repo.id}`,
                        title: repo.name.replace(/-/g, ' ').replace(/_/g, ' '),
                        description: description || "No description available.",
                        technologies: languages,
                        github: repo.html_url,
                        features: [],
                        color: 'default'
                    };
                }));

                setAllProjects([...manualProjects, ...projectsWithReadme]);
            } catch (error) {
                console.error("Error fetching GitHub projects:", error);
                setAllProjects(manualProjects);
            } finally {
                setLoading(false);
            }
        };

        fetchGithubRepos();
    }, [manualProjects]);

    return (
        <SectionContainer id="projects">
            <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center text-star-white">
                Project <span className="text-electric-blue">Nebula</span>
            </h2>

            {loading && (
                <div className="text-center mb-8">
                    <p className="text-neon-teal animate-pulse">Scanning Deep Space for Projects... 🛸</p>
                </div>
            )}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {allProjects.map((project, index) => (
                    <motion.div
                        key={project.id}
                        initial={{ y: 50, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 }} // Faster stagger for many items
                        className={`glass-card p-6 flex flex-col h-full transition-all duration-300 ${bgVariants[project.color || 'default'] || ''}`}
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-full bg-opacity-10 bg-white ${colorVariants[project.color || 'default'] || ''}`}>
                                <span className="text-2xl">🚀</span>
                            </div>
                            <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-2xl text-slate-400 hover:text-white transition-colors">
                                <FaGithub />
                            </a>
                        </div>

                        <h3 className="text-xl font-bold text-star-white mb-2 capitalize">{project.title}</h3>
                        <p className="text-slate-400 text-sm mb-4 flex-grow line-clamp-3">{project.description}</p>

                        {project.features.length > 0 && (
                            <div className="mb-4">
                                <ul className="list-disc list-inside text-sm text-slate-500">
                                    {project.features.map((feature, i) => (
                                        <li key={i}>{feature}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <div className="flex flex-wrap gap-2 mt-auto">
                            {project.technologies.map((tech) => (
                                <span key={tech} className="text-xs font-mono px-2 py-1 rounded bg-space-light/10 text-neon-teal">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </SectionContainer>
    );
};

export default ProjectsSection;
