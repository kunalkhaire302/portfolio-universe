import React from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaGraduationCap, FaLightbulb, FaRocket } from 'react-icons/fa';

const capabilities = [
    { icon: FaCode, number: '01', title: 'Develop', detail: 'Ideas to products' },
    { icon: FaGraduationCap, number: '02', title: 'Learn', detail: 'Continuously' },
    { icon: FaLightbulb, number: '03', title: 'Solve', detail: 'Real problems' },
    { icon: FaRocket, number: '04', title: 'Grow', detail: 'Create impact' },
];

const HeroCapabilityStrip = () => (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.7 }} className="relative z-20 hidden grid-cols-4 border-t border-white/10 bg-gradient-to-r from-transparent via-slate-950/20 to-transparent lg:grid">
        {capabilities.map(({ icon: Icon, number, title, detail }) => (
            <div key={title} className="group relative flex items-center justify-center gap-3 border-r border-white/[0.08] px-4 py-3 last:border-r-0">
                <span className="absolute left-3 top-2 text-[8px] font-bold tracking-widest text-slate-600">{number}</span>
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-cyan-300/25 bg-cyan-300/[0.04] text-base text-cyan-300 transition-all duration-300 group-hover:border-cyan-200 group-hover:bg-cyan-300/12 group-hover:shadow-[0_0_22px_rgba(34,211,238,0.18)]"><Icon /></span>
                <span><strong className="block text-[10px] uppercase tracking-[0.17em] text-white">{title}</strong><small className="mt-0.5 block text-[10px] tracking-wide text-slate-500">{detail}</small></span>
            </div>
        ))}
    </motion.div>
);

export default HeroCapabilityStrip;
