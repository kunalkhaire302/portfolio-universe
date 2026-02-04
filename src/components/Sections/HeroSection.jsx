import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import portfolioData from '../../data/portfolioData';

const HeroSection = () => {
    const { personalInfo } = portfolioData;

    return (
        <section id="home" className="min-h-screen w-full flex flex-col md:flex-row justify-center items-center relative z-10 overflow-hidden px-4 md:px-20 gap-8 md:gap-16">

            {/* Left Side: Solar System */}
            <div className="relative w-full md:w-1/2 flex justify-center items-center">
                <div className="relative w-[300px] h-[300px] md:w-[600px] md:h-[600px] flex items-center justify-center scale-[0.6] md:scale-100 transition-transform duration-500">
                    {/* Sun / Central Star */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 1.5, type: "spring" }}
                        className="absolute w-24 h-24 md:w-36 md:h-36 rounded-full bg-gradient-to-br from-yellow-300 via-orange-500 to-red-500 shadow-[0_0_100px_#f59e0b] z-20 flex items-center justify-center overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-yellow-200 opacity-20 animate-pulse rounded-full" />
                        <div className="absolute -inset-4 bg-orange-500 opacity-30 blur-xl animate-pulse" />
                    </motion.div>

                    {/* Orbit 1: Mercury */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                        className="absolute w-[140px] h-[140px] md:w-[200px] md:h-[200px] rounded-full border border-white/5"
                    >
                        <div className="absolute top-[14%] right-[14%] w-2 h-2 md:w-3 md:h-3 bg-gray-400 rounded-full shadow-[0_0_5px_#9ca3af]" />
                    </motion.div>

                    {/* Orbit 2: Venus */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        className="absolute w-[180px] h-[180px] md:w-[280px] md:h-[280px] rounded-full border border-white/5"
                    >
                        <div className="absolute bottom-[10%] left-[10%] w-3 h-3 md:w-5 md:h-5 bg-yellow-200 rounded-full shadow-[0_0_8px_#fde047]" />
                    </motion.div>

                    {/* Orbit 3: Earth */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                        className="absolute w-[240px] h-[240px] md:w-[380px] md:h-[380px] rounded-full border border-white/5"
                    >
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 md:-translate-y-3 w-4 h-4 md:w-6 md:h-6 rounded-full bg-blue-500 overflow-hidden shadow-[0_0_10px_rgba(59,130,246,0.8)]">
                            <div className="absolute bg-green-500 w-1.5 h-2 top-1 left-1.5 rounded-full opacity-80" />
                            <div className="absolute bg-green-500 w-2 h-1.5 bottom-1 right-1 rounded-full opacity-80" />
                        </div>
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 md:-translate-y-3 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center"
                        >
                            <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-slate-200 rounded-full absolute top-0" />
                        </motion.div>
                    </motion.div>

                    {/* Orbit 4: Mars */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute w-[300px] h-[300px] md:w-[480px] md:h-[480px] rounded-full border border-white/5 border-dashed"
                    >
                        <div className="absolute top-1/2 right-0 translate-x-1.5 md:translate-x-2 w-3 h-3 md:w-4 md:h-4 bg-red-500 rounded-full shadow-[0_0_8px_#ef4444]" />
                    </motion.div>

                    {/* Orbit 5: Jupiter */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                        className="absolute w-[380px] h-[380px] md:w-[600px] md:h-[600px] rounded-full border border-white/5"
                    >
                        <div className="absolute bottom-1/4 left-0 w-8 h-8 md:w-12 md:h-12 bg-orange-300 rounded-full shadow-[0_0_15px_#fdba74] overflow-hidden">
                            {/* Jupiter Stripes */}
                            <div className="w-full h-1.5 md:h-2 bg-orange-400 mt-1 md:mt-2 opacity-50" />
                            <div className="w-full h-1.5 md:h-2 bg-orange-500 mt-1 md:mt-2 opacity-50" />
                            <div className="absolute bottom-2 right-1.5 w-2 h-1.5 bg-red-700/50 rounded-full blur-[1px]" />
                        </div>
                    </motion.div>

                    {/* Orbit 6: Saturn */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
                        className="absolute w-[460px] h-[460px] md:w-[720px] md:h-[720px] rounded-full border border-white/5"
                    >
                        <div className="absolute top-1/3 right-0 w-6 h-6 md:w-10 md:h-10 bg-[#EAD6B8] rounded-full shadow-[0_0_10px_#EAD6B8] flex items-center justify-center">
                            <div className="w-10 h-10 md:w-16 md:h-16 border-2 md:border-4 border-slate-600/30 rounded-full absolute scale-y-50 rotate-45" />
                            <div className="w-8 h-8 md:w-14 md:h-14 border-2 md:border-4 border-[#C5A880]/50 rounded-full absolute scale-y-50 rotate-45" />
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Right Side: Text Content */}
            <div className="relative z-10 w-full md:w-1/2 flex flex-col justify-center items-center md:items-start text-center md:text-left">
                <motion.h1
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 text-star-white tracking-tight relative z-30"
                >
                    {personalInfo.name}
                </motion.h1>

                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2, delay: 1 }}
                    className="overflow-hidden whitespace-nowrap border-r-2 border-neon-teal pr-1 w-max max-w-full relative z-30 mb-8"
                >
                    <h2 className="text-2xl md:text-3xl lg:text-4xl text-neon-teal font-light">
                        {personalInfo.title}
                    </h2>
                </motion.div>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1.4 }}
                    className="flex gap-6 relative z-30"
                >
                    <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="text-3xl text-slate-400 hover:text-white transition-all duration-300 hover:scale-125 transform"><FaGithub /></a>
                    <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="text-3xl text-slate-400 hover:text-[#0077b5] transition-all duration-300 hover:scale-125 transform"><FaLinkedin /></a>
                    <a href={`mailto:${personalInfo.email}`} className="text-3xl text-slate-400 hover:text-planet-orange transition-all duration-300 hover:scale-125 transform"><FaEnvelope /></a>
                </motion.div>
            </div>


        </section>
    );
};

export default HeroSection;
