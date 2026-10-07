import React, { useState } from 'react';
import SectionContainer from '../Layout/SectionContainer';
import portfolioData from '../../data/portfolioData';
import { motion, AnimatePresence } from 'framer-motion';
import { FaAward } from 'react-icons/fa';

const CertificationSection = () => {
    const { certifications } = portfolioData;
    const [selectedImage, setSelectedImage] = useState(null);

    return (
        <SectionContainer id="certifications">
            <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center text-star-white">
                Certification <span className="text-cert-gold">Star</span>
            </h2>

            <div className="flex flex-col items-center gap-8">
                {certifications.map((cert, index) => (
                    <motion.div
                        key={cert.id}
                        initial={{ opacity: 0, y: 50, scale: 0.95, rotate: 0 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 100, damping: 20, delay: index * 0.1 }}
                        className={`glass-card p-8 w-full relative overflow-hidden group hover:border-cert-gold transition-colors duration-300 ${cert.image ? 'max-w-4xl' : 'max-w-2xl'}`}
                    >
                        {/* Shooting Star Decoration */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-cert-gold/20 to-transparent -mr-16 -mt-16 rounded-full blur-2xl group-hover:from-cert-gold/40 transition-all duration-500" />

                        <div className={`flex flex-col ${cert.image ? 'md:flex-row' : ''} items-start gap-6`}>
                            {cert.image && (
                                <div 
                                    className="w-full md:w-2/5 shrink-0 rounded-xl overflow-hidden border border-white/10 relative group-hover:border-cert-gold/30 transition-all duration-300 bg-black/20 p-2 cursor-pointer"
                                    onClick={() => setSelectedImage(cert.image)}
                                >
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-cert-gold/5 transition-colors z-10 pointer-events-none rounded-xl" />
                                    <img src={cert.image} alt={cert.title} className="w-full h-auto object-contain rounded-lg relative z-0" />
                                </div>
                            )}
                            
                            <div className="flex-1 flex flex-col justify-center w-full">
                                <div className="flex items-start gap-4">
                                    {!cert.image && (
                                        <div className="p-4 bg-cert-gold/10 rounded-full text-cert-gold text-3xl shrink-0">
                                            <FaAward />
                                        </div>
                                    )}
                                    <div className="w-full">
                                        <h3 className="text-2xl font-bold text-white mb-2">{cert.title}</h3>
                                        <div className="flex items-center gap-2 text-planet-orange mb-4 font-mono text-sm flex-wrap">
                                            <span className="font-semibold text-cert-gold">{cert.issuer}</span>
                                            <span className="text-white/50">•</span>
                                            <span>{cert.date}</span>
                                        </div>
                                        <p className="text-slate-300 leading-relaxed mb-6">
                                            {cert.description}
                                        </p>
                                        
                                        {(cert.image || cert.link) && (
                                            <div className="pt-6 border-t border-white/10 w-full flex gap-4 flex-wrap">
                                                {cert.image && (
                                                    <a 
                                                        href={cert.image} 
                                                        target="_blank" 
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center justify-center px-6 py-2.5 bg-cert-gold/10 hover:bg-cert-gold/20 text-cert-gold border border-cert-gold/30 rounded-lg font-bold tracking-wide text-sm transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,215,0,0.2)] hover:-translate-y-1"
                                                    >
                                                        View Certificate
                                                    </a>
                                                )}
                                                {cert.link && (
                                                    <a 
                                                        href={cert.link} 
                                                        target="_blank" 
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center justify-center px-6 py-2.5 bg-neon-teal/10 hover:bg-neon-teal/20 text-neon-teal border border-neon-teal/30 rounded-lg font-bold tracking-wide text-sm transition-all duration-300 hover:shadow-[0_0_20px_rgba(100,255,218,0.2)] hover:-translate-y-1"
                                                    >
                                                        Verify Certificate
                                                    </a>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Certificate Image Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center justify-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button 
                                onClick={() => setSelectedImage(null)}
                                className="absolute -top-12 right-0 md:-right-8 md:-top-12 text-white/50 hover:text-white text-4xl transition-colors"
                            >
                                &times;
                            </button>
                            <img 
                                src={selectedImage} 
                                alt="Certificate Full View" 
                                className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-[0_0_50px_rgba(255,215,0,0.15)] border border-white/10"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </SectionContainer>
    );
};

export default CertificationSection;
