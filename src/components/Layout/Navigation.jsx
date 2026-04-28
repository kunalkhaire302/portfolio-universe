import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaRocket } from 'react-icons/fa';

const navLinks = [
    { name: 'Home', to: 'home' },
    { name: 'About', to: 'about' },
    { name: 'Skills', to: 'skills' },
    { name: 'Projects', to: 'projects' },
    { name: 'Experience', to: 'experience' },
    { name: 'Certifications', to: 'certifications' },
    { name: 'Contact', to: 'contact' },
];

const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    // Handle scroll effect for navbar background
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            // Determine active section based on scroll position
            const sections = navLinks.map(link => document.getElementById(link.to));
            const scrollPosition = window.scrollY + 100; // Offset

            for (const section of sections) {
                if (section &&
                    section.offsetTop <= scrollPosition &&
                    (section.offsetTop + section.offsetHeight) > scrollPosition) {
                    setActiveSection(section.id);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsOpen(false);
        }
    };

    return (
    return (
        <div className="fixed top-6 left-0 w-full flex justify-center z-50 px-4">
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
                className={`flex items-center justify-between gap-8 py-2 px-3 md:px-6 rounded-2xl border transition-all duration-500 ${
                    scrolled 
                    ? 'bg-[#0a192f]/80 backdrop-blur-2xl border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.8)] w-full max-w-5xl' 
                    : 'bg-white/5 backdrop-blur-md border-white/5 w-full max-w-6xl'
                }`}
            >
                {/* Logo */}
                <div
                    className="group flex items-center gap-2 cursor-pointer py-2"
                    onClick={() => scrollToSection('home')}
                >
                    <div className="relative w-10 h-10 flex items-center justify-center bg-neon-teal/10 rounded-xl border border-neon-teal/20 group-hover:border-neon-teal/50 transition-colors">
                        <FaRocket className="text-neon-teal group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-300" />
                        <div className="absolute inset-0 bg-neon-teal blur-md opacity-0 group-hover:opacity-20 transition-opacity" />
                    </div>
                    <span className="text-white font-black tracking-tighter text-xl hidden sm:block">
                        KUNAL<span className="text-neon-teal">.</span>DEV
                    </span>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center bg-white/5 rounded-xl border border-white/5 p-1">
                    {navLinks.slice(0, 4).map((link) => (
                        <button
                            key={link.name}
                            onClick={() => scrollToSection(link.to)}
                            className={`px-4 py-2 text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300 rounded-lg ${
                                activeSection === link.to 
                                ? 'bg-neon-teal text-slate-900 shadow-[0_0_20px_rgba(100,255,218,0.3)]' 
                                : 'text-slate-400 hover:text-white hover:bg-white/5'
                            }`}
                        >
                            {link.name}
                        </button>
                    ))}
                    
                    {/* More Links Dropdown or just the rest */}
                    <div className="h-4 w-px bg-white/10 mx-2" />
                    
                    {navLinks.slice(4).map((link) => (
                        <button
                            key={link.name}
                            onClick={() => scrollToSection(link.to)}
                            className={`px-4 py-2 text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300 rounded-lg ${
                                activeSection === link.to 
                                ? 'text-neon-teal' 
                                : 'text-slate-500 hover:text-white'
                            }`}
                        >
                            {link.name}
                        </button>
                    ))}
                </div>

                {/* Right Side Actions */}
                <div className="flex items-center gap-4">
                    <a
                        href="/resume.pdf"
                        download="Kunal_Khaire_Resume.pdf"
                        className="hidden lg:flex items-center gap-2 bg-white text-slate-900 px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-neon-teal transition-all duration-300"
                    >
                        Resume
                    </a>

                    {/* Mobile Menu Toggle */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-3 text-xl text-neon-teal bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors"
                        >
                            {isOpen ? <FaTimes /> : <FaBars />}
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="fixed inset-4 top-24 bottom-4 bg-[#0a192f]/95 backdrop-blur-3xl rounded-3xl border border-white/10 z-[60] flex flex-col p-8 md:hidden shadow-2xl"
                    >
                        <div className="flex flex-col gap-4 overflow-y-auto">
                            {navLinks.map((link) => (
                                <button
                                    key={link.name}
                                    onClick={() => scrollToSection(link.to)}
                                    className={`text-left py-4 px-6 rounded-2xl text-xl font-bold border transition-all ${
                                        activeSection === link.to 
                                        ? 'bg-neon-teal/10 border-neon-teal/30 text-neon-teal' 
                                        : 'bg-white/5 border-transparent text-slate-400'
                                    }`}
                                >
                                    {link.name}
                                </button>
                            ))}
                        </div>
                        
                        <div className="mt-auto pt-8">
                            <a
                                href="/resume.pdf"
                                download="Kunal_Khaire_Resume.pdf"
                                className="w-full flex justify-center items-center py-5 bg-neon-teal text-slate-900 rounded-2xl font-black uppercase tracking-widest"
                            >
                                Download Resume
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Navigation;
