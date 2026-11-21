import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';

const CustomCursor = () => {
    const [isHovering, setIsHovering] = useState(false);
    const pointerX = useMotionValue(-100);
    const pointerY = useMotionValue(-100);
    const reducedMotion = useReducedMotion();
    const spring = { stiffness: 150, damping: 15, mass: 0.5 };
    const x = useSpring(pointerX, spring);
    const y = useSpring(pointerY, spring);

    useEffect(() => {
        if (reducedMotion) return undefined;

        const mouseMove = (e) => {
            pointerX.set(e.clientX);
            pointerY.set(e.clientY);
        };

        const handleMouseOver = (e) => {
            setIsHovering(Boolean(e.target.closest?.('a, button, [role="button"]')));
        };

        window.addEventListener("mousemove", mouseMove);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", mouseMove);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, [pointerX, pointerY, reducedMotion]);

    if (reducedMotion) return null;

    return (
        <motion.div
            className="custom-cursor fixed left-0 top-0 z-50 h-0 w-0 pointer-events-none"
            style={{ x, y }}
        >
            <div className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2">
                <motion.div
                    className="h-16 w-16 rounded-full border-2"
                    animate={{
                        scale: isHovering ? 1 : 0.5,
                        backgroundColor: isHovering ? "rgb(var(--color-accent) / 0.2)" : "rgb(var(--color-accent) / 0.1)",
                        borderColor: isHovering ? "rgb(var(--color-accent) / 0.8)" : "rgb(var(--color-accent) / 0.5)"
                    }}
                    transition={spring}
                    style={{ mixBlendMode: "screen" }}
                />
            </div>
            <div className="absolute left-0 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-tangerine" />
        </motion.div>
    );
};

export default CustomCursor;
