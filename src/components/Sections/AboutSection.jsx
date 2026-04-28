import React from 'react';
import SectionContainer from '../Layout/SectionContainer';
import portfolioData from '../../data/portfolioData';
import planetImg from '../../assets/images/planet.png';

const AboutSection = () => {
    const { objective, education } = portfolioData;

    return (
        <SectionContainer id="about" className="min-h-screen">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Planet Image */}
                <div className="relative h-72 md:h-[450px] w-full flex items-center justify-center">
                    <div className="relative w-64 h-64 md:w-[400px] md:h-[400px] group">
                        {/* Multiple glow layers for depth */}
                        <div className="absolute inset-0 bg-blue-600 rounded-full blur-[80px] opacity-20 group-hover:opacity-30 transition-opacity duration-700" />
                        <div className="absolute inset-[-20px] bg-blue-400 rounded-full blur-[40px] opacity-10" />
                        
                        {/* The Image */}
                        <div className="relative w-full h-full rounded-full overflow-hidden shadow-[0_0_80px_rgba(30,144,255,0.3)] animate-spin-slow">
                            <img 
                                src={planetImg} 
                                alt="Earth" 
                                className="w-full h-full object-cover scale-110" 
                            />
                        </div>

                        {/* Glossy Overlay for 3D effect */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none" />
                    </div>
                </div>

                {/* Content */}
                <div>
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 text-star-white">About <span className="text-planet-orange">Me</span></h2>
                    <div className="glass-card p-6 md:p-8 mb-8">
                        <p className="text-lg leading-relaxed text-slate-300">
                            {objective}
                        </p>
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-xl font-bold text-neon-teal">Education</h3>
                        {education.map((edu, index) => (
                            <div key={index} className="border-l-2 border-planet-orange pl-4 ml-2">
                                <h4 className="text-lg font-bold text-white">{edu.degree}</h4>
                                <p className="text-slate-400">{edu.institution}, {edu.location}</p>
                                <p className="text-sm text-planet-orange">{edu.duration}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </SectionContainer>
    );
};

export default AboutSection;
