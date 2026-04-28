import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaRocket } from 'react-icons/fa';
import portfolioData from '../../data/portfolioData';

const HeroSection = () => {
    const { personalInfo } = portfolioData;

    return (
        <section id="home" className="min-h-screen w-full flex flex-col md:flex-row justify-center items-center relative z-10 overflow-hidden px-4 md:px-20 gap-8 md:gap-16">

            {/* Left Side: Solar System */}
            <div className="relative w-full md:w-1/2 flex justify-center items-center">
                <div className="relative w-[300px] h-[300px] md:w-[600px] md:h-[600px] flex items-center justify-center scale-[0.6] md:scale-100 transition-transform duration-500">
                    {/* Decorative Radial Glow */}
                    <div className="absolute inset-0 bg-blue-600/10 rounded-full blur-[120px]" />
                    
                    {/* Sun / Central Star */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 1.5, type: "spring" }}
                        className="absolute w-24 h-24 md:w-36 md:h-36 rounded-full bg-gradient-to-br from-yellow-300 via-orange-500 to-red-500 shadow-[0_0_120px_rgba(245,158,11,0.5)] z-20 flex items-center justify-center overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-yellow-200 opacity-20 animate-pulse rounded-full" />
                        <div className="absolute -inset-4 bg-orange-600 opacity-30 blur-xl animate-pulse" />
                    </motion.div>

                    {/* Planets with improved Orbits */}
                    {[
                        { dist: 200, size: 8, dur: 10, color: 'bg-gray-400', shadow: 'shadow-[0_0_8px_#9ca3af]' },
                        { dist: 280, size: 12, dur: 18, color: 'bg-yellow-200', shadow: 'shadow-[0_0_12px_#fde047]' },
                        { dist: 380, size: 20, dur: 25, color: 'bg-blue-500', shadow: 'shadow-[0_0_15px_#3b82f6]' },
                        { dist: 480, size: 10, dur: 35, color: 'bg-red-500', shadow: 'shadow-[0_0_10px_#ef4444]' },
                        { dist: 600, size: 30, dur: 50, color: 'bg-orange-300', shadow: 'shadow-[0_0_20px_#fdba74]' },
                    ].map((planet, i) => (
                        <motion.div
                            key={i}
                            animate={{ rotate: 360 }}
                            transition={{ duration: planet.dur, repeat: Infinity, ease: "linear" }}
                            className="absolute rounded-full border border-white/10"
                            style={{ width: `${planet.dist}px`, height: `${planet.dist}px` }}
                        >
                            <div className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full ${planet.color} ${planet.shadow}`} style={{ width: `${planet.size}px`, height: `${planet.size}px` }} />
                        </motion.div>
                    ))}
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
                    <span className="text-neon-teal font-mono text-sm tracking-[0.3em] uppercase">Developer Universe</span>
                </motion.div>

                <motion.h1
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 text-white tracking-tighter leading-none"
                >
                    {personalInfo.name.split(' ')[0]}<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-teal to-blue-500">{personalInfo.name.split(' ')[1]}</span>
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="flex items-center gap-4 mb-10"
                >
                    <div className="h-px w-12 bg-neon-teal/50" />
                    <h2 className="text-xl md:text-2xl text-slate-400 font-medium tracking-tight">
                        {personalInfo.title}
                    </h2>
                </motion.div>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="flex flex-wrap gap-6 relative z-30 justify-center md:justify-start"
                >
                    <button 
                        onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
                        className="group relative px-8 py-4 bg-neon-teal text-slate-900 rounded-xl font-black uppercase tracking-widest text-xs overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(100,255,218,0.5)] hover:-translate-y-1"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            Explore Work <FaRocket className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </span>
                    </button>
                    
                    <button 
                        onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                        className="px-8 py-4 border border-white/10 hover:border-white/30 text-white rounded-xl font-black uppercase tracking-widest text-xs transition-all duration-300 hover:bg-white/5"
                    >
                        Let's Talk
                    </button>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.2 }}
                    className="flex gap-8 mt-12"
                >
                    {[
                        { icon: <FaGithub />, link: personalInfo.github, color: 'hover:text-white' },
                        { icon: <FaLinkedin />, link: personalInfo.linkedin, color: 'hover:text-[#0077b5]' },
                        { icon: <FaEnvelope />, link: `mailto:${personalInfo.email}`, color: 'hover:text-planet-orange' }
                    ].map((item, i) => (
                        <a 
                            key={i}
                            href={item.link} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className={`text-2xl text-slate-500 ${item.color} transition-all duration-300 hover:scale-125`}
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
                <span className="text-xs uppercase tracking-[0.3em] text-slate-500 font-medium">Scroll</span>
                <div className="w-[30px] h-[50px] border-2 border-slate-700 rounded-full flex justify-center p-2">
                    <motion.div
                        animate={{ y: [0, 15, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-1.5 h-1.5 bg-neon-teal rounded-full"
                    />
                </div>
            </motion.div>


        </section>
    );
};

export default HeroSection;
