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
                <div className="relative h-64 md:h-96 w-full flex items-center justify-center">
                    <div className="relative w-64 h-64 md:w-80 md:h-80 group">
                        <div className="absolute inset-0 bg-blue-500 rounded-full blur-[50px] opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
                        <img 
                            src={planetImg} 
                            alt="Planet" 
                            className="w-full h-full object-cover rounded-full shadow-[0_0_50px_rgba(0,112,255,0.4)] animate-spin-slow"
                        />
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
