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

            <div className="flex flex-col items-center max-w-2xl mx-auto">
                <div className="space-y-8 text-center">
                    <h3 className="text-2xl font-bold text-white mb-6">Values communication. Let's Connect.</h3>
                    <p className="text-slate-400 mb-8">
                        I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
                    </p>

                    <div className="space-y-4 inline-block text-left">
                        <div className="flex items-center gap-4 text-slate-300">
                            <FaPhone className="text-neon-teal text-xl" />
                            <a href={`tel:${personalInfo.phone}`} className="hover:text-white transition-colors">{personalInfo.phone}</a>
                        </div>
                        <div className="flex items-center gap-4 text-slate-300">
                            <FaEnvelope className="text-neon-teal text-xl" />
                            <a href={`mailto:${personalInfo.email}`} className="hover:text-white transition-colors">{personalInfo.email}</a>
                        </div>
                        <div className="flex items-center gap-4 text-slate-300">
                            <FaMapMarkerAlt className="text-neon-teal text-xl" />
                            <span>{personalInfo.location}</span>
                        </div>
                    </div>

                    <div className="flex gap-4 mt-8 justify-center">
                        <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 bg-space-light/10 rounded-full hover:bg-neon-teal hover:text-space-dark transition-all duration-300">
                            <FaLinkedin className="text-xl" />
                        </a>
                        <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="p-3 bg-space-light/10 rounded-full hover:bg-neon-teal hover:text-space-dark transition-all duration-300">
                            <FaGithub className="text-xl" />
                        </a>
                    </div>
                </div>
            </div>
        </SectionContainer>
    );
};

export default ContactSection;
