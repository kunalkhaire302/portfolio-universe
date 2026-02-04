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
            className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${scrolled ? 'bg-space-dark/90 backdrop-blur-md shadow-lg py-4' : 'bg-transparent py-6'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                {/* Logo */}
                <div
                    className="text-2xl font-bold flex items-center gap-2 cursor-pointer text-star-white hover:text-neon-teal transition-colors"
                    onClick={() => scrollToSection('home')}
                >
                    <FaRocket className="text-neon-teal" />
                    <span>Kunal<span className="text-neon-teal">.dev</span></span>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <button
                            key={link.name}
                            onClick={() => scrollToSection(link.to)}
                            className={`text-sm font-medium tracking-wide transition-all duration-300 relative group ${activeSection === link.to ? 'text-neon-teal' : 'text-slate-300 hover:text-neon-teal'
                                }`}
                        >
                            <span className="mr-1 text-neon-teal opacity-0 group-hover:opacity-100 transition-opacity">
                                &lt;
                            </span>
                            {link.name}
                            <span className="ml-1 text-neon-teal opacity-0 group-hover:opacity-100 transition-opacity">
                                /&gt;
                            </span>
                            {activeSection === link.to && (
                                <motion.span
                                    layoutId="underline"
                                    className="absolute left-0 bottom-[-5px] w-full h-[2px] bg-neon-teal"
                                />
                            )}
                        </button>
                    ))}

                    <a
                        href="/resume.pdf"
                        download="Kunal_Khaire_Resume.pdf"
                        className="btn-primary py-2 px-4 text-sm"
                    >
                        Resume
                    </a>
                </div>

                {/* Mobile Menu Toggle */}
                <div className="md:hidden">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-2xl text-neon-teal focus:outline-none"
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
