import React, { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { FaMousePointer } from 'react-icons/fa';

const SolarSystem = lazy(() => import('../../SolarSystem/SolarSystem'));

const HeroVisual = () => (
    <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.1, ease: 'easeOut' }} className="hero-visual relative order-2 min-h-[360px] overflow-hidden lg:order-1 lg:min-h-0">
        <div className="absolute inset-[8%] rounded-full bg-cyan-400/10 blur-[100px]" />
        <div className="absolute inset-x-[7%] top-5 z-10 flex items-center justify-between text-[8px] font-bold uppercase tracking-[0.3em] text-cyan-100/45">
            <span>System 01 / Sol</span>
            <span className="flex items-center gap-2"><FaMousePointer /> Drag to explore</span>
        </div>
        <div aria-hidden="true" className="pointer-events-none absolute inset-[4%] rounded-[2rem] border border-cyan-200/[0.08] bg-[radial-gradient(circle_at_46%_52%,rgba(8,145,178,0.08),transparent_48%)]" />
        <Suspense fallback={<div className="h-full w-full animate-pulse rounded-full bg-cyan-300/[0.03]" />}><SolarSystem /></Suspense>
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-[8%] bottom-[8%] h-px bg-gradient-to-r from-transparent via-cyan-200/55 to-transparent shadow-[0_0_26px_4px_rgba(56,189,248,0.25)]" />
        <div aria-hidden="true" className="pointer-events-none absolute bottom-[8%] left-[12%] h-3 w-3 border-b border-l border-cyan-200/35" />
        <div aria-hidden="true" className="pointer-events-none absolute bottom-[8%] right-[12%] h-3 w-3 border-b border-r border-cyan-200/35" />
    </motion.div>
);

export default HeroVisual;
