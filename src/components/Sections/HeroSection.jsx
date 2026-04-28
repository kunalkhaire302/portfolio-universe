import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaRocket } from 'react-icons/fa';
import portfolioData from '../../data/portfolioData';

const HeroSection = () => {
    const { personalInfo } = portfolioData;

    return (
        <section id="home" className="min-h-screen w-full flex flex-col md:flex-row justify-center items-center relative z-10 overflow-hidden px-4 md:px-20 gap-8 md:gap-16">
            
            {/* Left Side: 3D Solar System */}
            <div className="relative w-full md:w-1/2 flex justify-center items-center py-10">
                <div className="relative w-[320px] h-[320px] md:w-[650px] md:h-[650px] flex items-center justify-center perspective-[1000px]">
                    
                    {/* Decorative Background Glow */}
                    <div className="absolute inset-0 bg-blue-500/5 rounded-full blur-[150px] animate-pulse" />
                    
                    {/* The 3D tilted container */}
                    <div className="absolute inset-0 flex items-center justify-center transform-style-3d rotate-x-[65deg] rotate-z-[-10deg]">
                        
                        {/* Sun / Central Star (Not tilted with orbits to stay spherical) */}
                        <div className="absolute transform-style-3d rotate-x-[-65deg] rotate-z-[10deg] z-20">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 1.5, type: "spring" }}
                                className="relative w-20 h-20 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-yellow-200 via-orange-500 to-red-600 shadow-[0_0_80px_rgba(245,158,11,0.6),inset_-10px_-10px_30px_rgba(0,0,0,0.5)] flex items-center justify-center overflow-hidden"
                            >
                                {/* Sun's Surface Detail */}
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
                                <motion.div 
                                    animate={{ opacity: [0.4, 0.7, 0.4] }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                    className="absolute inset-0 bg-yellow-400 mix-blend-overlay blur-sm"
                                />
                                {/* Corona layers */}
                                <div className="absolute -inset-4 bg-orange-500/20 blur-2xl animate-pulse" />
                                <div className="absolute -inset-8 bg-red-500/10 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                            </motion.div>
                        </div>

                        {/* Planets with Orbits */}
                        {[
                            { name: 'Mercury', dist: 180, size: 6, dur: 8, color: 'from-gray-400 to-gray-600', shadow: 'shadow-gray-400/50' },
                            { name: 'Venus', dist: 250, size: 10, dur: 15, color: 'from-orange-200 to-yellow-600', shadow: 'shadow-yellow-200/50' },
                            { name: 'Earth', dist: 340, size: 14, dur: 22, color: 'from-blue-400 via-emerald-400 to-blue-800', shadow: 'shadow-blue-400/50', ring: false, atmosphere: true },
                            { name: 'Mars', dist: 420, size: 10, dur: 32, color: 'from-red-400 to-red-900', shadow: 'shadow-red-500/50' },
                            { name: 'Jupiter', dist: 530, size: 28, dur: 50, color: 'from-orange-100 via-orange-300 to-orange-800', shadow: 'shadow-orange-300/50', stripes: true },
                            { name: 'Saturn', dist: 650, size: 24, dur: 70, color: 'from-yellow-100 via-yellow-400 to-yellow-800', shadow: 'shadow-yellow-400/50', ring: true },
                        ].map((planet, i) => (
                            <motion.div
                                key={planet.name}
                                animate={{ rotate: 360 }}
                                transition={{ duration: planet.dur, repeat: Infinity, ease: "linear" }}
                                className="absolute rounded-full border border-white/5 flex items-center justify-center"
                                style={{ width: `${planet.dist}px`, height: `${planet.dist}px` }}
                            >
                                {/* The Orbit Path line */}
                                <div className="absolute inset-0 rounded-full border border-white/5 pointer-events-none" />
                                
                                {/* The Planet Body */}
                                <div 
                                    className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 transform-style-3d rotate-x-[-65deg] rotate-z-[10deg]"
                                >
                                    <div className="relative">
                                        {/* Atmosphere / Glow */}
                                        <div className={`absolute inset-[-4px] rounded-full blur-md opacity-40 ${planet.shadow}`} />
                                        
                                        {/* Main Sphere */}
                                        <div 
                                            className={`relative rounded-full bg-gradient-to-br ${planet.color} shadow-[inset_-4px_-4px_10px_rgba(0,0,0,0.8),inset_2px_2px_4px_rgba(255,255,255,0.4)]`}
                                            style={{ width: `${planet.size}px`, height: `${planet.size}px` }}
                                        >
                                            {/* Earth Atmosphere specialized */}
                                            {planet.atmosphere && (
                                                <div className="absolute inset-0 rounded-full bg-blue-300/20 blur-[1px] animate-pulse" />
                                            )}

                                            {/* Jupiter Stripes specialized */}
                                            {planet.stripes && (
                                                <div className="absolute inset-0 rounded-full overflow-hidden opacity-30">
                                                    <div className="w-full h-[2px] bg-white/20 my-1" />
                                                    <div className="w-full h-[2px] bg-black/20 my-1" />
                                                    <div className="w-full h-[2px] bg-white/20 my-1" />
                                                </div>
                                            )}
                                        </div>

                                        {/* Saturn's Rings specialized */}
                                        {planet.ring && (
                                            <div 
                                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-[6px] border-yellow-200/20 rotate-x-[80deg]"
                                                style={{ width: `${planet.size * 2.5}px`, height: `${planet.size * 2.5}px` }}
                                            >
                                                <div className="absolute inset-[-2px] border border-white/10 rounded-full" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Side: Text Content */}
            <div className="relative z-10 w-full md:w-1/2 flex flex-col justify-center items-center md:items-start text-center md:text-left">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-4"
                >
                    <span className="text-neon-teal font-mono text-xs md:text-sm tracking-[0.4em] uppercase">Digital Architect</span>
                </motion.div>

                <motion.h1
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-5xl md:text-7xl lg:text-9xl font-black mb-6 text-white tracking-tighter leading-none"
                >
                    {personalInfo.name.split(' ')[0]}<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-teal to-blue-500 drop-shadow-[0_0_20px_rgba(100,255,218,0.2)]">
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
                        className="group relative px-8 md:px-10 py-4 bg-neon-teal text-slate-900 rounded-xl font-black uppercase tracking-widest text-xs overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(100,255,218,0.6)] hover:-translate-y-1"
                    >
                        <span className="relative z-10 flex items-center gap-3">
                            Launch Mission <FaRocket className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </span>
                    </button>
                    
                    <button 
                        onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                        className="px-8 md:px-10 py-4 border border-white/10 hover:border-neon-teal/50 text-white rounded-xl font-black uppercase tracking-widest text-xs transition-all duration-300 hover:bg-neon-teal/5 group"
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
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-2"
            >
                <span className="text-[10px] uppercase tracking-[0.5em] text-slate-500 font-bold">Deep Space</span>
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
