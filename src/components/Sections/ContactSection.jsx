import React from 'react';
import SectionContainer from '../Layout/SectionContainer';
import portfolioData from '../../data/portfolioData';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaLinkedin, FaGithub } from 'react-icons/fa';

const ContactSection = () => {
    const { personalInfo } = portfolioData;

    return (
        <SectionContainer id="contact" className="pb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center text-star-white">
                Contact <span className="text-neon-teal">Station</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto items-start">
                <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-white mb-6">Let's build something <span className="text-neon-teal">extraordinary</span> together.</h3>
                    <p className="text-slate-400 mb-8 leading-relaxed">
                        I'm currently looking for new opportunities. Whether you have a question or just want to say hi, my inbox is always open!
                    </p>

                    <div className="flex gap-4 mt-8">
                        <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="p-4 bg-space-light/10 rounded-xl hover:bg-neon-teal hover:text-space-dark hover:scale-110 transition-all duration-300">
                            <FaLinkedin className="text-2xl" />
                        </a>
                        <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="p-4 bg-space-light/10 rounded-xl hover:bg-neon-teal hover:text-space-dark hover:scale-110 transition-all duration-300">
                            <FaGithub className="text-2xl" />
                        </a>
                    </div>
                </div>

                <div className="glass-card p-8 space-y-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-neon-teal opacity-5 blur-3xl -translate-y-1/2 translate-x-1/2" />
                    
                    <div className="flex items-center gap-4 text-slate-300 group">
                        <div className="p-3 rounded-lg bg-space-light/10 group-hover:bg-neon-teal/20 transition-colors">
                            <FaPhone className="text-neon-teal text-xl" />
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 uppercase tracking-wider">Call Me</p>
                            <a href={`tel:${personalInfo.phone}`} className="hover:text-neon-teal transition-colors font-medium">{personalInfo.phone}</a>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-slate-300 group">
                        <div className="p-3 rounded-lg bg-space-light/10 group-hover:bg-neon-teal/20 transition-colors">
                            <FaEnvelope className="text-neon-teal text-xl" />
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 uppercase tracking-wider">Email Me</p>
                            <a href={`mailto:${personalInfo.email}`} className="hover:text-neon-teal transition-colors font-medium">{personalInfo.email}</a>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-slate-300 group">
                        <div className="p-3 rounded-lg bg-space-light/10 group-hover:bg-neon-teal/20 transition-colors">
                            <FaMapMarkerAlt className="text-neon-teal text-xl" />
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 uppercase tracking-wider">Location</p>
                            <span className="font-medium">{personalInfo.location}</span>
                        </div>
                    </div>

                    <a 
                        href={`mailto:${personalInfo.email}`}
                        className="btn-primary w-full text-center mt-4 flex items-center justify-center gap-2"
                    >
                        Send a Message
                        <FaEnvelope className="text-sm" />
                    </a>
                </div>
            </div>
        </SectionContainer>
    );
};

export default ContactSection;
