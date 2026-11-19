import React from 'react';
import { FaBrain, FaCodeBranch, FaLayerGroup } from 'react-icons/fa';
import SectionContainer from '../Layout/SectionContainer';
import portfolioData from '../../data/portfolioData';

const disciplines = [
    {
        icon: FaLayerGroup,
        title: 'Full-stack systems',
        copy: 'Responsive interfaces, secure application flows, backend services, and data-driven product experiences.',
    },
    {
        icon: FaBrain,
        title: 'Applied intelligence',
        copy: 'Machine-learning features and practical AI workflows designed around real user and operational needs.',
    },
    {
        icon: FaCodeBranch,
        title: 'Product engineering',
        copy: 'Clear architecture, maintainable code, and thoughtful iteration from an initial idea to a working application.',
    },
];

const AboutSection = () => {
    const { objective, education } = portfolioData;

    return (
        <SectionContainer id="about" className="section--about">
            <div className="section-heading section-heading--split">
                <div>
                    <span className="section-eyebrow">01 / About</span>
                    <h2>Engineering with <span>purpose.</span></h2>
                </div>
                <p>{objective}</p>
            </div>

            <div className="about-layout">
                <div className="about-disciplines">
                    {disciplines.map(({ icon: Icon, title, copy }, index) => (
                        <article key={title} className="about-discipline">
                            <span className="about-discipline__number">0{index + 1}</span>
                            <Icon aria-hidden="true" />
                            <div>
                                <h3>{title}</h3>
                                <p>{copy}</p>
                            </div>
                        </article>
                    ))}
                </div>

                <aside className="education-panel" aria-labelledby="education-heading">
                    <div className="education-panel__header">
                        <span>Academic trajectory</span>
                        <span>{education.length} milestones</span>
                    </div>
                    <h3 id="education-heading">Education</h3>
                    <ol>
                        {education.map((item) => (
                            <li key={item.degree}>
                                <span className="education-panel__marker" />
                                <time>{item.duration}</time>
                                <h4>{item.degree}</h4>
                                <p>{item.institution} · {item.location}</p>
                            </li>
                        ))}
                    </ol>
                </aside>
            </div>
        </SectionContainer>
    );
};

export default AboutSection;
