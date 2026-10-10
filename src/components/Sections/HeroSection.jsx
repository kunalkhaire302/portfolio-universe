import React from 'react';
import { motion } from 'framer-motion';
import portfolioData from '../../data/portfolioData';
import HeroCapabilityStrip from './Hero/HeroCapabilityStrip';
import HeroContent from './Hero/HeroContent';
import HeroVisual from './Hero/HeroVisual';

const HeroSection = () => (
    <section id="home" className="hero-section relative z-10 min-h-screen w-full overflow-hidden bg-space-dark px-5 pb-5 pt-28 sm:px-8 lg:h-screen lg:min-h-[600px] lg:px-12 lg:pb-4 lg:pt-24 xl:px-16">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_28%_48%,rgba(6,182,212,0.12),transparent_32%),radial-gradient(circle_at_76%_35%,rgba(37,99,235,0.07),transparent_26%)]" />
        <div aria-hidden="true" className="absolute inset-0 opacity-[0.03] [background-image:linear-gradient(rgba(255,255,255,.3)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.3)_1px,transparent_1px)] [background-size:52px_52px] [mask-image:linear-gradient(to_bottom,black,transparent_88%)]" />

        <aside className="absolute left-5 top-28 z-20 hidden h-[58%] flex-col justify-between border-l border-cyan-200/35 pl-4 text-[8px] font-bold uppercase tracking-[0.38em] text-slate-300 xl:flex">
            <div className="space-y-2"><p>Explore</p><p>Create</p><p>Build</p><p>Learn</p><p>Grow</p></div>
            <div className="space-y-2"><p>Ideas</p><p>Into</p><p>Impact</p></div>
        </aside>

        <div className="relative mx-auto grid min-h-[calc(100vh-8.25rem)] max-w-[1540px] gap-3 lg:h-[calc(100svh-7rem)] lg:min-h-[488px] lg:grid-rows-[minmax(0,1fr)_auto]">
            <div className="grid min-h-0 grid-cols-1 items-stretch gap-4 lg:grid-cols-[57%_43%]">
                <HeroVisual />
                <HeroContent personalInfo={portfolioData.personalInfo} />
            </div>
            <HeroCapabilityStrip />
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 0.8 }} className="absolute bottom-7 right-4 z-20 hidden flex-col items-center gap-2 lg:flex xl:right-7">
            <span className="text-[8px] font-bold uppercase tracking-[0.4em] text-slate-500 [writing-mode:vertical-rl]">Scroll</span>
            <div className="h-10 w-px overflow-hidden bg-gradient-to-b from-cyan-300 to-transparent"><motion.div animate={{ y: [-42, 42] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }} className="h-3 w-full bg-white" /></div>
        </motion.div>
    </section>
);

export default HeroSection;
