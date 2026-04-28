import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaRocket } from 'react-icons/fa';

const LoadingScreen = ({ onLoadingComplete }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setTimeout(() => {
                        onLoadingComplete();
                    }, 500);
                    return 100;
                }
                return prev + 1;
            });
        }, 20); // 2 seconds total loading time

        return () => clearInterval(timer);
    }, [onLoadingComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#030712] overflow-hidden"
            exit={{ opacity: 0, scale: 1.1, transition: { duration: 0.8, ease: "circOut" } }}
        >
            {/* Hyperdrive Stars */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(50)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={{ 
                            opacity: [0, 1, 0],
                            scaleX: progress > 70 ? [1, 20] : 1,
                            x: progress > 70 ? [0, 1000] : 0
                        }}
                        transition={{ 
                            duration: progress > 70 ? 0.2 : Math.random() * 3 + 2,
                            repeat: Infinity,
                            delay: Math.random() * 5
                        }}
                        className="absolute rounded-full bg-white"
                        style={{
                            width: '2px',
                            height: '2px',
                            top: Math.random() * 100 + '%',
                            left: Math.random() * 100 + '%',
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10 flex flex-col items-center">
                {/* Rocket / Logo */}
                <motion.div
                    animate={{
                        y: [-5, 5, -5],
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="mb-12 relative"
                >
                    <div className="text-7xl text-neon-teal filter drop-shadow-[0_0_20px_rgba(100,255,218,0.5)]">
                        <FaRocket className={progress > 80 ? "rotate-45 transition-transform duration-500" : ""} />
                    </div>
                    {progress > 50 && (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-1 h-20 bg-gradient-to-t from-transparent via-neon-teal/50 to-transparent blur-sm"
                        />
                    )}
                </motion.div>

                {/* Text */}
                <div className="text-center mb-8">
                    <h2 className="text-xs font-black uppercase tracking-[0.5em] text-slate-500 mb-2">
                        System Initialization
                    </h2>
                    <div className="flex items-center justify-center gap-2">
                        <span className="text-2xl font-bold text-white tracking-tight">
                            {progress < 30 ? "Booting..." : progress < 70 ? "Loading Universe..." : "Jump in 3.. 2.. 1.."}
                        </span>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="relative w-72 h-[2px] bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-neon-teal shadow-[0_0_15px_#64ffda]"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ ease: "easeOut" }}
                    />
                </div>

                <div className="mt-4 font-mono text-[10px] text-neon-teal/60 tracking-widest uppercase">
                    Sector {Math.floor(progress * 1.2)} / 100
                </div>
            </div>
        </motion.div>
    );
};

export default LoadingScreen;
