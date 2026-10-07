import React from 'react';
import SectionContainer from '../Layout/SectionContainer';
import portfolioData from '../../data/portfolioData';
import EarthScene from '../Earth/EarthScene';

const AboutSection = () => {
    const { objective, education } = portfolioData;

    return (
        <SectionContainer id="about">
            {/* The Earth Scene serves as the massive interactive backdrop/focal point */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-auto">
                <div className="absolute inset-0 md:translate-x-1/4 scale-125 md:scale-150 transform-gpu opacity-90 transition-transform duration-1000 ease-out">
                    <EarthScene />
                </div>
                {/* Gradient mask to blend the edges into the dark background of the page */}
                <div className="absolute inset-0 bg-gradient-to-r from-space-dark via-space-dark/80 to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-b from-space-dark via-transparent to-space-dark pointer-events-none" />
            </div>

            {/* Content Container */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid md:grid-cols-12 gap-8 items-center pt-8">
                
                {/* Left Side Content */}
                <div className="md:col-span-5 lg:col-span-4 space-y-4 md:space-y-6">
                    <div>
                        <h3 className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-tight mb-1">
                            About <span className="text-planet-orange">Me</span>
                        </h3>
                        <p className="text-lg text-slate-400 font-light">
                            Full Stack Developer <br/>
                            <span className="text-white/50 text-sm">Creative Technologist</span>
                        </p>
                    </div>

                    <div className="glass-card p-4 md:p-6 border border-white/5 bg-space-blue/30 backdrop-blur-md">
                        <p className="text-sm md:text-base leading-relaxed text-slate-300 font-light">
                            {objective}
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-neon-teal flex items-center gap-2">
                            <span className="w-8 h-[1px] bg-neon-teal inline-block"></span>
                            Education
                        </h3>
                        <div className="space-y-4 pl-8 border-l border-white/10 ml-[10px]">
                            {education.map((edu, index) => (
                                <div key={index} className="relative">
                                    <div className="absolute w-2 h-2 bg-planet-orange rounded-full -left-[37px] top-1.5 ring-4 ring-space-dark"></div>
                                    <h4 className="text-base font-bold text-white">{edu.degree}</h4>
                                    <p className="text-slate-400 text-xs mt-1">{edu.institution}, {edu.location}</p>
                                    <p className="text-[10px] text-planet-orange font-mono mt-1 tracking-wider">{edu.duration}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Side is intentionally left empty to let the Earth shine */}
                <div className="hidden md:block md:col-span-7 lg:col-span-8 pointer-events-none">
                </div>

            </div>
        </SectionContainer>
    );
};

export default AboutSection;
