import React, { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaRocket } from 'react-icons/fa';
import portfolioData from '../../data/portfolioData';

const SolarSystem = lazy(() => import('../SolarSystem/SolarSystem'));

const HeroSection = () => {
    const { personalInfo } = portfolioData;

    return (
        <section id="home" className="min-h-screen w-full flex flex-col md:flex-row justify-center items-center relative z-10 overflow-hidden px-4 md:px-20 gap-8 md:gap-16">
            
            {/* Left Side: 3D Solar System */}
            <div className="relative w-full md:w-1/2 flex justify-center items-center py-10">
                <div className="relative w-[320px] h-[320px] md:w-[650px] md:h-[650px]">
                    {/* Decorative Background Glow behind the canvas */}
                    <div className="absolute inset-0 bg-blue-500/5 rounded-full blur-[150px] animate-pulse pointer-events-none" />
                    
                    {/* 3D Solar System Canvas */}
                    <Suspense fallback={null}>
                        <SolarSystem />
                    </Suspense>
                </div>
            </div>

            {/* Right Side: Text Content */}
            <div className="relative z-10 w-full md:w-1/2 flex flex-col justify-center items-center md:items-start text-center md:text-left">
                {/* Tagline */}


                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="mb-4"
                >
                    <span className="text-neon-teal font-mono text-sm md:text-base tracking-[0.3em] md:tracking-[0.5em] uppercase text-glow font-semibold">Digital Architect</span>
                </motion.div>

                <motion.h1
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-6xl md:text-8xl lg:text-9xl font-black mb-6 tracking-tighter leading-none"
                >
                    <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-300 drop-shadow-sm">
                        {personalInfo.name.split(' ')[0]}
                    </span><br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-teal to-blue-500 drop-shadow-[0_0_30px_rgba(100,255,218,0.3)]">
                        {personalInfo.name.split(' ')[1]}
                    </span>
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="flex items-center gap-4 mb-10"
                >
                    <div className="h-px w-16 bg-gradient-to-r from-neon-teal to-transparent" />
                    <h2 className="text-lg md:text-2xl text-slate-400 font-medium tracking-wide">
                        {personalInfo.title}
                    </h2>
                </motion.div>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="flex flex-wrap gap-4 md:gap-6 relative z-30 justify-center md:justify-start"
                >
                    <button 
                        onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
                        className="group relative px-8 md:px-10 py-4 bg-gradient-to-r from-neon-teal to-teal-400 text-slate-900 rounded-xl font-black uppercase tracking-widest text-xs overflow-hidden transition-all duration-300 shadow-[0_0_20px_rgba(100,255,218,0.3)] hover:shadow-[0_0_40px_rgba(100,255,218,0.7)] hover:-translate-y-1"
                    >
                        <span className="relative z-10 flex items-center gap-3">
                            Launch Mission <FaRocket className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </span>
                    </button>
                    
                    <button 
                        onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                        className="px-8 md:px-10 py-4 border-2 border-white/10 hover:border-neon-teal/60 text-white rounded-xl font-black uppercase tracking-widest text-xs transition-all duration-300 hover:bg-neon-teal/10 hover:shadow-[0_0_30px_rgba(100,255,218,0.15)] hover:-translate-y-1 group"
                    >
                        <span className="group-hover:text-neon-teal transition-colors">Initiate Contact</span>
                    </button>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.2 }}
                    className="flex gap-8 mt-12"
                >
                    {[
                        { icon: <FaGithub />, link: personalInfo.github, color: 'hover:text-white', label: 'GitHub' },
                        { icon: <FaLinkedin />, link: personalInfo.linkedin, color: 'hover:text-[#0077b5]', label: 'LinkedIn' },
                        { icon: <FaEnvelope />, link: `mailto:${personalInfo.email}`, color: 'hover:text-neon-teal', label: 'Email' }
                    ].map((item, i) => (
                        <a 
                            key={i}
                            href={item.link} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            aria-label={item.label}
                            className={`text-2xl text-slate-500 ${item.color} transition-all duration-300 hover:scale-125 hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]`}
                        >
                            {item.icon}
                        </a>
                    ))}
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-10 right-8 md:right-12 z-20 hidden md:flex flex-col items-center gap-4"
            >
                <span className="text-[10px] uppercase tracking-[0.4em] text-slate-500 font-bold [writing-mode:vertical-rl]">Scroll</span>
                <div className="w-[2px] h-[60px] bg-gradient-to-b from-neon-teal to-transparent overflow-hidden">
                    <motion.div
                        animate={{ y: [-60, 60] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="w-full h-[20px] bg-white"
                    />
                </div>
            </motion.div>

        </section>
    );
};


export default HeroSection;
