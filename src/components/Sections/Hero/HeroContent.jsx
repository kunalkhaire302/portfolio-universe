import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight, FaEnvelope, FaGithub, FaLinkedin, FaRocket } from 'react-icons/fa';

const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

const HeroContent = ({ personalInfo }) => {
    const [firstName, lastName] = personalInfo.name.split(' ');
    const socialLinks = [
        { icon: FaGithub, href: personalInfo.github, label: 'GitHub' },
        { icon: FaLinkedin, href: personalInfo.linkedin, label: 'LinkedIn' },
        { icon: FaEnvelope, href: `mailto:${personalInfo.email}`, label: 'Email' },
    ];

    return (
        <div className="hero-content relative z-20 flex min-w-0 flex-col items-center justify-center text-center lg:items-start lg:pl-4 lg:text-left xl:pl-10">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="hero-content__eyebrow mb-3 flex items-center gap-4">
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.55em] text-cyan-300 text-glow sm:text-xs">Digital Architect</span>
                <span className="hidden h-px w-14 bg-gradient-to-r from-cyan-200/80 to-transparent sm:block" />
            </motion.div>

            <motion.h1 initial={{ x: 38, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="hero-content__name mb-4 text-6xl font-black leading-[0.8] tracking-[-0.075em] sm:text-7xl lg:text-[clamp(5rem,7vw,8.6rem)]">
                <span className="bg-gradient-to-b from-white via-slate-100 to-slate-400 bg-clip-text text-transparent drop-shadow-sm">{firstName}</span><br />
                <span className="bg-gradient-to-r from-cyan-200 via-cyan-400 to-blue-600 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(34,211,238,0.24)]">{lastName}</span>
            </motion.h1>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.45 }} className="hero-content__title mb-4 flex items-center justify-center gap-4 lg:justify-start">
                <span className="h-px w-9 bg-white/70" />
                <h2 className="text-base font-semibold tracking-wide text-slate-200 sm:text-xl">{personalInfo.title}</h2>
            </motion.div>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.6 }} className="hero-content__copy mb-5 max-w-xl text-sm leading-6 tracking-[0.055em] text-slate-400 sm:text-[15px]">
                Building digital products, solving real-world problems, and turning ideas into impactful experiences through code, creativity, and continuous learning.
            </motion.p>

            <motion.div initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7, delay: 0.75 }} className="relative z-30 flex flex-wrap justify-center gap-3 lg:justify-start">
                <button onClick={() => scrollTo('projects')} className="group flex items-center gap-3 rounded-xl bg-gradient-to-r from-cyan-300 to-cyan-400 px-7 py-3.5 text-[11px] font-black uppercase tracking-[0.14em] text-slate-950 shadow-[0_0_28px_rgba(34,211,238,0.22)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_38px_rgba(34,211,238,0.48)] sm:px-8">
                    <FaRocket className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /> Explore my work <FaArrowRight />
                </button>
                <button onClick={() => scrollTo('contact')} className="group flex items-center gap-3 rounded-xl border border-slate-500/60 bg-slate-950/20 px-7 py-3.5 text-[11px] font-black uppercase tracking-[0.14em] text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/70 hover:bg-cyan-300/10 sm:px-8">
                    <FaEnvelope /> Get in touch <FaArrowRight className="transition-transform group-hover:translate-x-1" />
                </button>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 1 }} className="hero-content__socials mt-4 flex items-center gap-3">
                <span className="mr-1 hidden text-[9px] font-bold uppercase tracking-[0.25em] text-slate-500 sm:block">Connect</span>
                {socialLinks.map(({ icon: Icon, href, label }) => (
                    <a key={label} href={href} target={label === 'Email' ? undefined : '_blank'} rel={label === 'Email' ? undefined : 'noopener noreferrer'} aria-label={label} className="grid h-10 w-10 place-items-center rounded-xl border border-white/15 bg-white/[0.025] text-base text-slate-400 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/60 hover:bg-cyan-300/10 hover:text-cyan-200">
                        <Icon />
                    </a>
                ))}
            </motion.div>
        </div>
    );
};

export default HeroContent;
