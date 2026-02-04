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
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-space-dark overflow-hidden"
            exit={{ opacity: 0, transition: { duration: 1 } }}
        >
            {/* Background Stars for Loading Screen */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full bg-star-white"
                        style={{
                            width: Math.random() * 3 + 'px',
                            height: Math.random() * 3 + 'px',
                            top: Math.random() * 100 + '%',
                            left: Math.random() * 100 + '%',
                            opacity: Math.random(),
                            animation: `twinkle ${Math.random() * 2 + 1}s infinite`
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10 flex flex-col items-center">
                {/* Rocket Animation */}
                <motion.div
                    animate={{
                        y: [-10, 10, -10],
                        rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="mb-8 text-6xl text-planet-orange drop-shadow-[0_0_15px_rgba(255,107,53,0.5)]"
                >
                    <FaRocket />
                </motion.div>

                {/* Text */}
                <h2 className="text-xl md:text-2xl font-bold text-star-white mb-6 tracking-wider">
                    <span className="text-neon-teal">Entering</span> Kunal's Developer Universe...
                </h2>

                {/* Progress Bar Container */}
                <div className="w-64 h-2 bg-space-blue rounded-full overflow-hidden border border-space-blue/50">
                    <motion.div
                        className="h-full bg-gradient-to-r from-neon-teal to-electric-blue"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ ease: "linear" }}
                    />
                </div>

                <p className="mt-2 text-sm text-slate-400 font-mono">
                    {progress}% Loaded
                </p>
            </div>
        </motion.div>
    );
};

export default LoadingScreen;
