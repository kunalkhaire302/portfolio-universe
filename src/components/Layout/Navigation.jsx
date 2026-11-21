import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaRocket, FaChevronRight, FaEnvelope } from 'react-icons/fa';

const navLinks = [
    { name: 'Home', to: 'home' },
    { name: 'About', to: 'about' },
    { name: 'Projects', to: 'projects' },
    { name: 'Skills', to: 'skills' },
    { name: 'Experience', to: 'experience' },
    { name: 'Achievements', to: 'certifications' },
    { name: 'Contact', to: 'contact' },
    { name: 'Resume', isDownload: true, href: '/Kunal_Khaire_Resume.pdf', downloadName: 'Kunal_Khaire_Resume.pdf' },
];

const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const mobileMenuRef = useRef(null);
    const mobileToggleRef = useRef(null);

    const handleDownload = async (e, href, downloadName) => {
        e.preventDefault();
        setIsOpen(false);
        try {
            const response = await fetch(process.env.PUBLIC_URL + href);
            const blob = await response.blob();

            if (window.showSaveFilePicker) {
                const handle = await window.showSaveFilePicker({
                    suggestedName: downloadName,
                    types: [{
                        description: 'PDF Document',
                        accept: { 'application/pdf': ['.pdf'] },
                    }],
                });
                const writable = await handle.createWritable();
                await writable.write(blob);
                await writable.close();
                return;
            }

            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = downloadName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            if (error.name !== 'AbortError') {
                console.error('Download failed, falling back to new tab', error);
                window.open(process.env.PUBLIC_URL + href, '_blank');
            }
        }
    };

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

    useEffect(() => {
        const closeDesktopMenu = () => {
            if (window.innerWidth >= 1280) setIsOpen(false);
        };

        window.addEventListener('resize', closeDesktopMenu);
        return () => window.removeEventListener('resize', closeDesktopMenu);
    }, []);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 80; // Account for fixed header
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition
            });
            setIsOpen(false);
        }
    };

    // Body scroll lock when mobile menu is open
    useEffect(() => {
        if (!isOpen) return undefined;

        const previousOverflow = document.body.style.overflow;
        const menuToggle = mobileToggleRef.current;
        document.body.style.overflow = 'hidden';

        const focusableElements = mobileMenuRef.current?.querySelectorAll('a[href], button:not([disabled])') || [];
        focusableElements[0]?.focus();

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                setIsOpen(false);
                return;
            }

            if (event.key !== 'Tab' || focusableElements.length === 0) return;

            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (event.shiftKey && document.activeElement === firstElement) {
                event.preventDefault();
                lastElement.focus();
            } else if (!event.shiftKey && document.activeElement === lastElement) {
                event.preventDefault();
                firstElement.focus();
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = previousOverflow;
            menuToggle?.focus();
        };
    }, [isOpen]);

    return (
        <>
            <div className="navigation-shell fixed top-0 left-0 w-full flex justify-center z-[100] p-4 md:p-6 pointer-events-none">
                <motion.nav
                    aria-label="Primary navigation"
                    aria-hidden={isOpen ? 'true' : undefined}
                    inert={isOpen}
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
                    className={`pointer-events-auto flex items-center justify-between py-3 px-5 md:px-7 rounded-full border transition-[background-color,border-color] duration-200 w-full max-w-6xl ${
                        scrolled 
                        ? 'border-border-subtle bg-espresso-secondary/80 backdrop-blur-3xl shadow-[0_8px_40px_rgb(var(--color-bg-primary)/0.9),0_0_60px_rgb(var(--color-accent)/0.05)]'
                        : 'border-border-subtle/60 bg-espresso-secondary/30 backdrop-blur-2xl'
                    }`}
                >
                    {/* Logo */}
                    <button
                        type="button"
                        aria-label="Go to home"
                        className="flex-shrink-0 group flex items-center gap-2 md:gap-3 cursor-pointer transition-transform duration-150 ease-[var(--ease-out)] active:scale-[0.97] motion-reduce:transform-none"
                        onClick={() => scrollToSection('home')}
                    >
                        <div className="relative w-9 h-9 md:w-10 md:h-10 flex items-center justify-center bg-tangerine/10 rounded-full border border-tangerine/20 group-hover:border-tangerine/50 transition-colors duration-200">
                            <FaRocket className="text-tangerine group-hover:-rotate-12 transition-transform text-sm md:text-base" />
                            <div className="absolute inset-0 bg-tangerine rounded-full blur-lg opacity-0 group-hover:opacity-20 transition-opacity" />
                        </div>
                        <span className="text-ivory font-black tracking-tighter text-base md:text-lg">
                            kunal<span className="text-tangerine">universe</span>
                        </span>
                    </button>

                    {/* Desktop Menu */}
                    <div className="hidden xl:flex items-center justify-center flex-1 px-2 gap-0">
                        {navLinks.map((link) => (
                            link.isDownload ? (
                                <a
                                    key={link.name}
                                    href={process.env.PUBLIC_URL + link.href}
                                    onClick={(e) => handleDownload(e, link.href, link.downloadName)}
                                    download={link.downloadName}
                                    className="relative px-1.5 lg:px-2 xl:px-3 py-2 text-[9px] xl:text-[10px] font-black uppercase tracking-[0.05em] xl:tracking-[0.1em] transition-[color,transform] duration-150 ease-[var(--ease-out)] rounded-full whitespace-nowrap text-taupe hover:text-ivory active:scale-[0.97] motion-reduce:transform-none"
                                >
                                    <span className="relative z-10">{link.name}</span>
                                </a>
                            ) : (
                                <button
                                    key={link.name}
                                    onClick={() => scrollToSection(link.to)}
                                    className={`relative px-1.5 lg:px-2 xl:px-3 py-2 text-[9px] xl:text-[10px] font-black uppercase tracking-[0.05em] xl:tracking-[0.1em] transition-[color,transform] duration-150 ease-[var(--ease-out)] rounded-full whitespace-nowrap active:scale-[0.97] motion-reduce:transform-none ${
                                        activeSection === link.to 
                                        ? 'text-tangerine text-glow'
                                        : 'text-taupe hover:text-ivory'
                                    }`}
                                >
                                    <span className="relative z-10">
                                        {link.name}
                                        {activeSection === link.to && (
                                            <motion.div
                                                layoutId="nav-pill"
                                                className="absolute -bottom-2 left-0 w-full h-[2px] bg-tangerine rounded-full shadow-[0_0_10px_rgb(var(--color-accent)/0.8)]"
                                                transition={{ type: "spring", bounce: 0.2, duration: 0.25 }}
                                            />
                                        )}
                                    </span>
                                </button>
                            )
                        ))}
                    </div>

                    {/* Right Actions */}
                    <div className="flex flex-shrink-0 items-center">
                        <button
                            onClick={() => scrollToSection('contact')}
                            className="group hidden items-center gap-3 rounded-full border border-border-interactive px-5 py-2.5 text-[10px] font-black tracking-[0.08em] text-ivory shadow-[0_0_18px_rgb(var(--color-accent)/0.14)] transition-[color,background-color,border-color,transform] duration-150 ease-[var(--ease-out)] hover:border-tangerine hover:bg-espresso-hover active:scale-[0.97] motion-reduce:transform-none xl:flex"
                        >
                            <FaEnvelope className="text-tangerine transition-colors group-hover:text-tangerine-hover" />
                            Let's connect
                            <FaChevronRight className="text-[9px]" />
                        </button>

                        {/* Mobile Toggle */}
                        <button
                            ref={mobileToggleRef}
                            onClick={() => setIsOpen(!isOpen)}
                            aria-expanded={isOpen}
                            aria-controls="mobile-navigation"
                            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
                            className="xl:hidden p-2.5 text-lg text-tangerine bg-espresso-elevated rounded-full border border-border-interactive hover:bg-espresso-hover transition-[color,background-color,transform] duration-150 ease-[var(--ease-out)] active:scale-[0.97] motion-reduce:transform-none z-[110]"
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
                        ref={mobileMenuRef}
                        role="dialog"
                        aria-modal="true"
                        aria-label="Mobile navigation"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                        className="fixed inset-0 z-[120] flex flex-col items-center overflow-y-auto bg-espresso/95 px-4 pb-[calc(2rem_+_env(safe-area-inset-bottom))] pt-[calc(5.5rem_+_env(safe-area-inset-top))] backdrop-blur-2xl xl:hidden"
                    >
                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            aria-label="Close navigation menu"
                            className="pressable absolute right-4 top-[calc(1rem+env(safe-area-inset-top,0px))] z-20 rounded-full border border-border-interactive bg-espresso-elevated p-2.5 text-lg text-tangerine transition-[color,background-color,transform] duration-150 ease-[var(--ease-out)] hover:bg-espresso-hover motion-reduce:transform-none"
                        >
                            <FaTimes />
                        </button>

                        {/* Background Stars Decoration */}
                        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
                            {[...Array(20)].map((_, i) => (
                                <div 
                                    key={i}
                                    className="absolute bg-tangerine rounded-full"
                                    style={{
                                        width: Math.random() * 2 + 'px',
                                        height: Math.random() * 2 + 'px',
                                        top: Math.random() * 100 + '%',
                                        left: Math.random() * 100 + '%',
                                        boxShadow: '0 0 10px rgb(var(--color-accent) / 0.5)'
                                    }}
                                />
                            ))}
                        </div>

                        <nav id="mobile-navigation" aria-label="Mobile navigation links" className="relative z-10 my-auto flex w-full flex-col items-center px-4 sm:px-10">
                            {navLinks.map((link) => (
                                link.isDownload ? (
                                    <a
                                        key={link.name}
                                        href={process.env.PUBLIC_URL + link.href}
                                        onClick={(e) => handleDownload(e, link.href, link.downloadName)}
                                        download={link.downloadName}
                                        className="group flex min-h-11 w-full max-w-xs items-center justify-between border-b border-border-subtle py-2.5 transition-transform duration-150 ease-[var(--ease-out)] active:scale-[0.97] motion-reduce:transform-none sm:py-4"
                                    >
                                        <span className="text-xl font-black uppercase tracking-tighter transition-colors duration-150 text-muted group-hover:text-ivory sm:text-2xl">
                                            {link.name}
                                        </span>
                                        <FaChevronRight className="transition-[color,transform] duration-150 text-muted group-hover:text-ivory" />
                                    </a>
                                ) : (
                                    <button
                                        key={link.name}
                                        onClick={() => scrollToSection(link.to)}
                                        className="group flex min-h-11 w-full max-w-xs items-center justify-between border-b border-border-subtle py-2.5 transition-transform duration-150 ease-[var(--ease-out)] active:scale-[0.97] motion-reduce:transform-none sm:py-4"
                                    >
                                        <span className={`text-xl font-black uppercase tracking-tighter transition-colors duration-150 sm:text-2xl ${
                                            activeSection === link.to ? 'text-tangerine' : 'text-muted group-hover:text-ivory'
                                        }`}>
                                            {link.name}
                                        </span>
                                        <FaChevronRight className={`transition-[color,transform] duration-150 ${
                                            activeSection === link.to ? 'text-tangerine translate-x-2' : 'text-muted group-hover:text-ivory'
                                        }`} />
                                    </button>
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
