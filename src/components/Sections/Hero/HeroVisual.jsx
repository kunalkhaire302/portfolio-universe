import React from 'react';
import ProjectConstellation from '../../ProjectConstellation';

const HeroVisual = ({ projects }) => (
    <div className="hero-visual relative order-2 min-h-[520px] lg:min-h-0">
        <div aria-hidden="true" className="absolute inset-[12%] rounded-full bg-cyan-400/[0.08] blur-[100px]" />
        <ProjectConstellation projects={projects} />
    </div>
);

export default HeroVisual;
