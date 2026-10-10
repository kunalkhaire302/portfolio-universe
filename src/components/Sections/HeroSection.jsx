import React, { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaRocket, FaCode, FaGraduationCap, FaLightbulb } from 'react-icons/fa';
import portfolioData from '../../data/portfolioData';

const SolarSystem = lazy(() => import('../SolarSystem/SolarSystem'));

const HeroSection = () => {
    const { personalInfo } = portfolioData;
    const [firstName, lastName] = personalInfo.name.split(' ');
    const capabilities = [
        { icon: FaCode, title: 'Develop', detail: 'Ideas to products' },
        { icon: FaGraduationCap, title: 'Learn', detail: 'Continuously' },
        { icon: FaLightbulb, title: 'Solve', detail: 'Real problems' },
        { icon: FaRocket, title: 'Grow', detail: 'Create impact' },
    ];

    return (
        <section id="home" className="relative z-10 min-h-screen w-full overflow-hidden px-5 pb-8 pt-28 sm:px-8 lg:px-12 lg:pb-5 lg:pt-24 xl:px-16">
            <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_31%_44%,rgba(26,120,184,0.13),transparent_32%),linear-gradient(90deg,transparent_48%,rgba(2,8,20,0.38)_63%,rgba(2,8,20,0.88)_100%)]" />

            <aside className="absolute left-7 top-32 z-20 hidden h-[58%] flex-col justify-between border-l border-cyan-200/35 pl-5 text-[9px] font-bold uppercase tracking-[0.38em] text-slate-300 xl:flex">
                <div className="space-y-2"><p>Explore</p><p>Create</p><p>Build</p><p>Learn</p><p>Grow</p></div>
                <div className="space-y-2"><p>Ideas</p><p>Into</p><p>Impact</p></div>
            </aside>

            <div className="relative mx-auto grid min-h-[calc(100vh-8rem)] max-w-[1540px] grid-cols-1 items-center gap-4 lg:grid-cols-[55%_45%]">
                <motion.div
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                    className="relative order-2 h-[44vh] min-h-[340px] w-full lg:order-1 lg:h-[72vh] lg:min-h-[560px]"
                >
                    <div className="absolute inset-[8%] rounded-full bg-cyan-400/10 blur-[110px]" />
                    <Suspense fallback={null}><SolarSystem /></Suspense>
                    <div className="pointer-events-none absolute bottom-[5%] left-[4%] h-px w-[82%] bg-gradient-to-r from-transparent via-cyan-200/50 to-transparent shadow-[0_0_28px_5px_rgba(56,189,248,0.28)]" />
                </motion.div>

                <div className="relative z-10 order-1 flex w-full flex-col items-center text-center lg:order-2 lg:items-start lg:pl-2 lg:text-left xl:pl-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="mb-4 flex items-center gap-4"
                    >
                        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.55em] text-cyan-300 text-glow sm:text-xs">Digital Architect</span>
                        <span className="hidden h-px w-16 bg-slate-400/60 sm:block" />
                    </motion.div>

                    <motion.h1
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="mb-5 text-6xl font-black leading-[0.82] tracking-[-0.075em] sm:text-7xl lg:text-[clamp(5.5rem,7.5vw,9.25rem)]"
                    >
                        <span className="bg-gradient-to-b from-white to-slate-300 bg-clip-text text-transparent drop-shadow-sm">{firstName}</span><br />
                        <span className="bg-gradient-to-r from-cyan-300 via-cyan-400 to-blue-600 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(34,211,238,0.24)]">{lastName}</span>
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="mb-5 flex items-center justify-center gap-4 lg:justify-start"
                    >
                        <div className="h-px w-10 bg-gradient-to-r from-white to-white/10" />
                        <h2 className="text-base font-medium tracking-wide text-slate-300 sm:text-xl">{personalInfo.title}</h2>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.65 }}
                        className="mb-7 max-w-xl text-sm leading-6 tracking-[0.08em] text-slate-400 sm:text-[15px]"
                    >
                        Building digital products, solving real-world problems, and turning ideas into impactful experiences through code, creativity, and continuous learning.
                    </motion.p>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className="relative z-30 flex flex-wrap justify-center gap-3 lg:justify-start"
                    >
                        <button
                            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                            className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-cyan-300 to-cyan-400 px-7 py-4 text-xs font-black uppercase tracking-[0.14em] text-slate-950 shadow-[0_0_28px_rgba(34,211,238,0.24)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(34,211,238,0.48)] sm:px-9"
                        >
                            <span className="relative z-10 flex items-center gap-3"><FaRocket className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /> Explore my work</span>
                        </button>
                        <button
                            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                            className="group rounded-xl border border-slate-500/50 px-7 py-4 text-xs font-black uppercase tracking-[0.14em] text-white transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/70 hover:bg-cyan-300/10 sm:px-9"
                        >
                            <span className="flex items-center gap-3 transition-colors group-hover:text-cyan-200"><FaEnvelope /> Get in touch</span>
                        </button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1.2 }}
                        className="mt-7 flex gap-3"
                    >
                        {[
                            { icon: <FaGithub />, link: personalInfo.github, color: 'hover:text-white', label: 'GitHub' },
                            { icon: <FaLinkedin />, link: personalInfo.linkedin, color: 'hover:text-[#0077b5]', label: 'LinkedIn' },
                            { icon: <FaEnvelope />, link: `mailto:${personalInfo.email}`, color: 'hover:text-neon-teal', label: 'Email' },
                        ].map((item) => (
                            <a key={item.label} href={item.link} target="_blank" rel="noopener noreferrer" aria-label={item.label} className={`grid h-11 w-11 place-items-center rounded-xl border border-white/15 text-lg text-slate-400 ${item.color} transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/50 hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]`}>
                                {item.icon}
                            </a>
                        ))}
                    </motion.div>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.8 }}
                className="relative z-20 mx-auto mt-2 hidden max-w-6xl grid-cols-4 border-t border-white/10 pt-5 lg:grid"
            >
                {capabilities.map(({ icon: Icon, title, detail }) => (
                    <div key={title} className="flex items-center justify-center gap-4 border-r border-white/15 px-5 last:border-r-0">
                        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-cyan-300/40 bg-cyan-300/5 text-xl text-cyan-300 shadow-[0_0_24px_rgba(34,211,238,0.12)]"><Icon /></span>
                        <span><strong className="block text-xs uppercase tracking-[0.16em] text-white">{title}</strong><small className="mt-1 block tracking-wide text-slate-400">{detail}</small></span>
                    </div>
                ))}
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-9 right-5 z-20 hidden flex-col items-center gap-3 lg:flex xl:right-9"
            >
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-500 [writing-mode:vertical-rl]">Scroll</span>
                <div className="h-[54px] w-px overflow-hidden bg-gradient-to-b from-cyan-300 to-transparent">
                    <motion.div animate={{ y: [-60, 60] }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }} className="h-[20px] w-full bg-white" />
                </div>
            </motion.div>
        </section>
    );
};

export default HeroSection;
