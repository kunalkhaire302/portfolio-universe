import React from 'react';
import { motion } from 'framer-motion';
import portfolioData from '../../data/portfolioData';
import HeroCapabilityStrip from './Hero/HeroCapabilityStrip';
import HeroContent from './Hero/HeroContent';
import HeroVisual from './Hero/HeroVisual';

const HeroSection = () => (
    <section id="home" className="hero-section relative z-10 min-h-[100svh] w-full overflow-hidden px-5 pb-6 pt-28 sm:px-8 lg:px-12 lg:pb-4 lg:pt-24 xl:px-16">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_28%_48%,rgba(6,182,212,0.12),transparent_32%),radial-gradient(circle_at_76%_35%,rgba(37,99,235,0.07),transparent_26%)]" />
        <div aria-hidden="true" className="absolute inset-0 opacity-[0.03] [background-image:linear-gradient(rgba(255,255,255,.3)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.3)_1px,transparent_1px)] [background-size:52px_52px] [mask-image:linear-gradient(to_bottom,black,transparent_88%)]" />

        <div className="relative mx-auto grid min-h-[calc(100svh-8.25rem)] max-w-[1540px] gap-6 lg:grid-rows-[minmax(0,1fr)_auto]">
            <div className="grid min-h-0 grid-cols-1 items-stretch gap-8 lg:grid-cols-[46%_54%] lg:gap-6">
                <HeroContent personalInfo={portfolioData.personalInfo} />
                <HeroVisual projects={portfolioData.projects} />
            </div>
            <HeroCapabilityStrip />
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.4 }} className="absolute bottom-7 right-4 z-20 hidden flex-col items-center gap-2 lg:flex xl:right-7">
            <span className="text-[8px] font-bold uppercase tracking-[0.4em] text-slate-500 [writing-mode:vertical-rl]">Scroll</span>
            <div className="h-10 w-px overflow-hidden bg-gradient-to-b from-cyan-300 to-transparent"><motion.div animate={{ y: [-42, 42] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }} className="h-3 w-full bg-white" /></div>
        </motion.div>
    </section>
);

export default HeroSection;
