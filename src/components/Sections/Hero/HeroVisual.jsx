import React, { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { FaMousePointer } from 'react-icons/fa';

const SolarSystem = lazy(() => import('../../SolarSystem/SolarSystem'));

const HeroVisual = () => (
    <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.1, ease: 'easeOut' }} className="hero-visual relative order-2 min-h-[360px] overflow-hidden lg:order-1 lg:min-h-0">
        <div className="absolute inset-[10%] rounded-full bg-cyan-400/10 blur-[110px]" />
        <div className="absolute inset-x-[5%] top-5 z-10 flex items-center justify-between text-[8px] font-bold uppercase tracking-[0.3em] text-cyan-100/50">
            <span className="flex items-center gap-3"><i className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_12px_#67e8f9]" /> Sol system / Live</span>
            <span className="flex items-center gap-2"><FaMousePointer /> Drag to orbit</span>
        </div>
        <div className="absolute inset-y-[-4%] left-[-7%] right-[-3%]">
            <Suspense fallback={<div className="h-full w-full animate-pulse rounded-full bg-cyan-300/[0.03]" />}><SolarSystem /></Suspense>
        </div>
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-[6%] bottom-[8%] h-px bg-gradient-to-r from-transparent via-cyan-200/55 to-transparent shadow-[0_0_26px_4px_rgba(56,189,248,0.25)]" />
        <div className="pointer-events-none absolute bottom-[10%] left-[7%] z-10 border-l border-cyan-300/30 pl-3 text-[8px] uppercase tracking-[0.25em] text-slate-500"><strong className="block text-base font-black tracking-normal text-white">08</strong>Planets</div>
        <div className="pointer-events-none absolute bottom-[10%] right-[7%] z-10 text-right text-[8px] uppercase tracking-[0.25em] text-slate-500"><strong className="block text-base font-black tracking-normal text-cyan-300">∞</strong>Exploration</div>
    </motion.div>
);

export default HeroVisual;
