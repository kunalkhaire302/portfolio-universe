import React from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaGraduationCap, FaLightbulb, FaRocket } from 'react-icons/fa';

const capabilities = [
    { icon: FaCode, title: 'Develop', detail: 'Ideas to products' },
    { icon: FaGraduationCap, title: 'Learn', detail: 'Continuously' },
    { icon: FaLightbulb, title: 'Solve', detail: 'Real problems' },
    { icon: FaRocket, title: 'Grow', detail: 'Create impact' },
];

const HeroCapabilityStrip = () => (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.7 }} className="relative z-20 hidden grid-cols-4 overflow-hidden rounded-2xl border border-white/[0.08] bg-slate-950/25 backdrop-blur-md lg:grid">
        {capabilities.map(({ icon: Icon, title, detail }) => (
            <div key={title} className="group flex items-center justify-center gap-3 border-r border-white/[0.08] px-4 py-3 last:border-r-0">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-cyan-300/35 bg-cyan-300/[0.06] text-base text-cyan-300 transition-all duration-300 group-hover:border-cyan-200 group-hover:bg-cyan-300/15 group-hover:shadow-[0_0_22px_rgba(34,211,238,0.2)]"><Icon /></span>
                <span><strong className="block text-[10px] uppercase tracking-[0.17em] text-white">{title}</strong><small className="mt-0.5 block text-[10px] tracking-wide text-slate-500">{detail}</small></span>
            </div>
        ))}
    </motion.div>
);

export default HeroCapabilityStrip;
