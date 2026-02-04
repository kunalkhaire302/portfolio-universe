import React from 'react';
import SectionContainer from '../Layout/SectionContainer';
import portfolioData from '../../data/portfolioData';
import { motion } from 'framer-motion';
import { FaAward } from 'react-icons/fa';

const CertificationSection = () => {
    const { certifications } = portfolioData;

    return (
        <SectionContainer id="certifications">
            <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center text-star-white">
                Certification <span className="text-cert-gold">Star</span>
            </h2>

            <div className="flex flex-col items-center">
                {certifications.map((cert, index) => (
                    <motion.div
                        key={cert.id}
                        initial={{ scale: 0, rotate: -180 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                        className="glass-card p-8 max-w-2xl w-full relative overflow-hidden group hover:border-cert-gold transition-colors duration-300"
                    >
                        {/* Shooting Star Decoration */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-cert-gold/20 to-transparent -mr-16 -mt-16 rounded-full blur-2xl group-hover:from-cert-gold/40 transition-all duration-500" />

                        <div className="flex items-start gap-6">
                            <div className="p-4 bg-cert-gold/10 rounded-full text-cert-gold text-3xl">
                                <FaAward />
                            </div>

                            <div>
                                <h3 className="text-2xl font-bold text-white mb-2">{cert.title}</h3>
                                <div className="flex items-center gap-2 text-planet-orange mb-4 font-mono text-sm">
                                    <span>{cert.issuer}</span>
                                    <span>•</span>
                                    <span>{cert.date}</span>
                                </div>
                                <p className="text-slate-300">
                                    {cert.description}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </SectionContainer>
    );
};

export default CertificationSection;
