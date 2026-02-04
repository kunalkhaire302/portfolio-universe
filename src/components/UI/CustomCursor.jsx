import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const mouseMove = (e) => {
            setMousePosition({
                x: e.clientX,
                y: e.clientY
            });
        };

        const handleMouseOver = (e) => {
            if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('a') || e.target.closest('button')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener("mousemove", mouseMove);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", mouseMove);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, []);

    const variants = {
        default: {
            x: mousePosition.x - 16,
            y: mousePosition.y - 16,
            height: 32,
            width: 32,
            backgroundColor: "rgba(100, 255, 218, 0.1)",
            border: "2px solid rgba(100, 255, 218, 0.5)",
            mixBlendMode: "screen"
        },
        hover: {
            x: mousePosition.x - 32,
            y: mousePosition.y - 32,
            height: 64,
            width: 64,
            backgroundColor: "rgba(100, 255, 218, 0.2)",
            border: "2px solid rgba(100, 255, 218, 0.8)",
            mixBlendMode: "screen"
        }
    };

    return (
        <>
            {/* Main Cursor Ring */}
            <motion.div
                className="fixed top-0 left-0 rounded-full z-50 pointer-events-none hidden md:block"
                variants={variants}
                animate={isHovering ? "hover" : "default"}
                transition={{
                    type: "spring",
                    stiffness: 150,
                    damping: 15,
                    mass: 0.5
                }}
            />
            {/* Center Dot */}
            <div
                className="fixed top-0 left-0 w-2 h-2 bg-neon-teal rounded-full pointer-events-none z-50 hidden md:block"
                style={{
                    transform: `translate(${mousePosition.x - 4}px, ${mousePosition.y - 4}px)`
                }}
            />
        </>
    );
};

export default CustomCursor;
