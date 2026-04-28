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
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className={`fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-50 transition-all duration-500 rounded-2xl ${scrolled 
                ? 'bg-[#0a192f]/70 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] py-3 px-6' 
                : 'bg-transparent py-5 px-6'
            }`}
        >
            <div className="flex justify-between items-center">
                {/* Logo */}
                <div
                    className="group text-2xl font-black flex items-center gap-2 cursor-pointer text-white"
                    onClick={() => scrollToSection('home')}
                >
                    <div className="relative">
                        <FaRocket className="text-neon-teal group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-300" />
                        <div className="absolute inset-0 bg-neon-teal blur-md opacity-20 group-hover:opacity-50" />
                    </div>
                    <span className="tracking-tighter">KUNAL<span className="text-neon-teal">.</span>DEV</span>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <button
                            key={link.name}
                            onClick={() => scrollToSection(link.to)}
                            className={`text-[13px] font-bold uppercase tracking-widest transition-all duration-300 relative py-2 ${activeSection === link.to ? 'text-neon-teal' : 'text-slate-400 hover:text-white'
                                }`}
                        >
                            {link.name}
                            {activeSection === link.to && (
                                <motion.span
                                    layoutId="nav-dot"
                                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-neon-teal shadow-[0_0_8px_#64ffda]"
                                />
                            )}
                        </button>
                    ))}

                    <a
                        href="/resume.pdf"
                        download="Kunal_Khaire_Resume.pdf"
                        className="bg-neon-teal/10 hover:bg-neon-teal text-neon-teal hover:text-slate-900 border border-neon-teal/50 px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all duration-300 ml-4"
                    >
                        Resume
                    </a>
                </div>

                {/* Mobile Menu Toggle */}
                <div className="md:hidden">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="p-2 text-2xl text-neon-teal bg-white/5 rounded-lg border border-white/10"
                    >
                        {isOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 top-0 left-0 w-full h-screen bg-space-dark flex flex-col justify-center items-center gap-8 z-50 md:hidden"
                    >
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-8 right-8 text-3xl text-neon-teal"
                        >
                            <FaTimes />
                        </button>

                        {navLinks.map((link) => (
                            <button
                                key={link.name}
                                onClick={() => scrollToSection(link.to)}
                                className={`text-2xl font-medium tracking-wide ${activeSection === link.to ? 'text-neon-teal' : 'text-star-white'
                                    }`}
                            >
                                {link.name}
                            </button>
                        ))}

                        <a
                            href="/resume.pdf"
                            download="Kunal_Khaire_Resume.pdf"
                            className="btn-primary mt-4"
                        >
                            Resume
                        </a>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navigation;
