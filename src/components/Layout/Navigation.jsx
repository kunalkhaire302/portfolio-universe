import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaRocket, FaChevronRight } from 'react-icons/fa';

const navLinks = [
    { name: 'Home', to: 'home' },
    { name: 'About', to: 'about' },
    { name: 'Skills', to: 'skills' },
    { name: 'Projects', to: 'projects' },
    { name: 'Experience', to: 'experience' },
    { name: 'Certifications', to: 'certifications' },
    { name: 'Contact', to: 'contact' },
    { name: 'Resume', isDownload: true, href: '/resume.pdf', downloadName: 'Kunal_Khaire_Resume.pdf' },
];

const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    // Precision Scroll Spy logic
    const handleScroll = useCallback(() => {
        setScrolled(window.scrollY > 20);

        const sections = navLinks.map(link => document.getElementById(link.to));
        const viewportHeight = window.innerHeight;
        const triggerPoint = viewportHeight * 0.3; // Detect section when it's 30% from the top

        let currentSection = 'home';
        
        for (const section of sections) {
            if (!section) continue;
            const rect = section.getBoundingClientRect();
            // If the top of the section is above the trigger point
            if (rect.top <= triggerPoint) {
                currentSection = section.id;
            }
        }

        // Special case for bottom of the page
        if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 50) {
            const lastSection = [...navLinks].reverse().find(link => !link.isDownload);
            if (lastSection) currentSection = lastSection.to;
        }

        setActiveSection(currentSection);
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        // Initial call to set active section on load
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 80; // Account for fixed header
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            setIsOpen(false);
        }
    };

    // Body scroll lock when mobile menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    return (
        <>
            <div className="fixed top-0 left-0 w-full flex justify-center z-[100] p-4 md:p-6 pointer-events-none">
                <motion.nav
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, type: "spring", stiffness: 100 }}
                    className={`pointer-events-auto flex items-center justify-between py-2 px-3 md:px-6 rounded-full border transition-all duration-500 w-full max-w-5xl ${
                        scrolled 
                        ? 'bg-space-dark/60 backdrop-blur-2xl border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.8)]' 
                        : 'bg-white/5 backdrop-blur-md border-white/5'
                    }`}
                >
                    {/* Logo */}
                    <div
                        className="flex-shrink-0 group flex items-center gap-2 md:gap-3 cursor-pointer"
                        onClick={() => scrollToSection('home')}
                    >
                        <div className="relative w-9 h-9 md:w-10 md:h-10 flex items-center justify-center bg-neon-teal/10 rounded-full border border-neon-teal/20 group-hover:border-neon-teal/50 transition-all duration-300">
                            <FaRocket className="text-neon-teal group-hover:-rotate-12 transition-transform text-sm md:text-base" />
                            <div className="absolute inset-0 bg-neon-teal rounded-full blur-lg opacity-0 group-hover:opacity-20 transition-opacity" />
                        </div>
                        <span className="text-white font-black tracking-tighter text-base md:text-lg">
                            KUNAL<span className="text-neon-teal">.</span>DEV
                        </span>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center justify-center flex-1 px-0 xl:px-2 gap-0">
                        {navLinks.map((link) => (
                            link.isDownload ? (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    download={link.downloadName}
                                    className="relative px-1.5 lg:px-2 xl:px-4 py-2 text-[9px] xl:text-[11px] font-black uppercase tracking-[0.08em] xl:tracking-[0.15em] transition-all duration-300 rounded-full whitespace-nowrap text-slate-400 hover:text-white"
                                >
                                    <span className="relative z-10">{link.name}</span>
                                </a>
                            ) : (
                                <button
                                    key={link.name}
                                    onClick={() => scrollToSection(link.to)}
                                    className={`relative px-1.5 lg:px-2 xl:px-4 py-2 text-[9px] xl:text-[11px] font-black uppercase tracking-[0.08em] xl:tracking-[0.15em] transition-all duration-300 rounded-full whitespace-nowrap ${
                                        activeSection === link.to 
                                        ? 'text-slate-900' 
                                        : 'text-slate-400 hover:text-white'
                                    }`}
                                >
                                    <span className="relative z-10">{link.name}</span>
                                    {activeSection === link.to && (
                                        <motion.div
                                            layoutId="nav-pill"
                                            className="absolute inset-0 bg-neon-teal rounded-full shadow-[0_0_20px_rgba(100,255,218,0.4)]"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                </button>
                            )
                        ))}
                    </div>

                    {/* Right Actions */}
                    <div className="flex-shrink-0 flex items-center">

                        {/* Mobile Toggle */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="lg:hidden p-2.5 text-lg text-neon-teal bg-white/5 rounded-full border border-white/10 hover:bg-white/10 transition-colors z-[110]"
                        >
                            {isOpen ? <FaTimes /> : <FaBars />}
                        </button>
                    </div>
                </motion.nav>
            </div>

            {/* Premium Full-Screen Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[90] bg-[#030712]/95 backdrop-blur-2xl flex flex-col items-center justify-center lg:hidden"
                    >
                        {/* Background Stars Decoration */}
                        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
                            {[...Array(20)].map((_, i) => (
                                <div 
                                    key={i}
                                    className="absolute bg-white rounded-full"
                                    style={{
                                        width: Math.random() * 2 + 'px',
                                        height: Math.random() * 2 + 'px',
                                        top: Math.random() * 100 + '%',
                                        left: Math.random() * 100 + '%',
                                        boxShadow: '0 0 10px white'
                                    }}
                                />
                            ))}
                        </div>

                        <nav className="relative z-10 flex flex-col items-center gap-4 w-full px-10">
                            {navLinks.map((link, i) => (
                                link.isDownload ? (
                                    <motion.a
                                        key={link.name}
                                        initial={{ x: -50, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: i * 0.1, duration: 0.5 }}
                                        href={link.href}
                                        download={link.downloadName}
                                        className="group w-full max-w-xs flex items-center justify-between py-4 border-b border-white/5"
                                    >
                                        <span className="text-2xl font-black uppercase tracking-tighter transition-all text-slate-500 group-hover:text-white">
                                            {link.name}
                                        </span>
                                        <FaChevronRight className="transition-transform text-slate-800 group-hover:text-white" />
                                    </motion.a>
                                ) : (
                                    <motion.button
                                        key={link.name}
                                        initial={{ x: -50, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: i * 0.1, duration: 0.5 }}
                                        onClick={() => scrollToSection(link.to)}
                                        className="group w-full max-w-xs flex items-center justify-between py-4 border-b border-white/5"
                                    >
                                        <span className={`text-2xl font-black uppercase tracking-tighter transition-all ${
                                            activeSection === link.to ? 'text-neon-teal text-3xl' : 'text-slate-500 group-hover:text-white'
                                        }`}>
                                            {link.name}
                                        </span>
                                        <FaChevronRight className={`transition-transform ${
                                            activeSection === link.to ? 'text-neon-teal translate-x-2' : 'text-slate-800 group-hover:text-white'
                                        }`} />
                                    </motion.button>
                                )
                            ))}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navigation;
