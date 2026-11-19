import React, { useEffect, useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { FaArrowDown } from 'react-icons/fa';
import portfolioData from '../../data/portfolioData';
import HeroArchitecture from './Hero/HeroArchitecture';
import HeroCapabilityStrip from './Hero/HeroCapabilityStrip';
import HeroContent from './Hero/HeroContent';

const HeroSection = () => {
    const heroRef = useRef(null);
    const pointerGlowRef = useRef(null);
    const pointerFrameRef = useRef(null);
    const pointerBoundsRef = useRef(null);
    const reducedMotion = useReducedMotion();
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
    const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.25 });

    const firstNameY = useTransform(progress, [0, 1], [0, -76]);
    const lastNameY = useTransform(progress, [0, 1], [0, -56]);
    const nameScale = useTransform(progress, [0, 1], [1, 0.91]);
    const nameOpacity = useTransform(progress, [0, 0.72, 1], [1, 0.7, 0.28]);
    const supportY = useTransform(progress, [0, 1], [0, -46]);
    const supportOpacity = useTransform(progress, [0, 0.65, 1], [1, 0.82, 0.24]);
    const badgeY = useTransform(progress, [0, 1], [0, -30]);
    const badgeOpacity = useTransform(progress, [0, 0.72, 1], [1, 0.78, 0.18]);
    const actionY = useTransform(progress, [0, 1], [0, -24]);
    const actionOpacity = useTransform(progress, [0, 0.7, 1], [1, 0.72, 0]);
    const socialOpacity = useTransform(progress, [0, 0.62, 0.9], [1, 0.7, 0]);
    const architectureY = useTransform(progress, [0, 0.55, 1], [0, -16, -72]);
    const architectureScale = useTransform(progress, [0, 0.42, 0.72, 1], [1, 1.055, 0.99, 0.94]);
    const architectureOpacity = useTransform(progress, [0, 0.7, 1], [1, 0.84, 0.12]);
    const cyanY = useTransform(progress, [0, 1], [0, -70]);
    const blueY = useTransform(progress, [0, 1], [0, -34]);
    const ambientOpacity = useTransform(progress, [0, 0.72, 1], [1, 0.74, 0]);
    const gridY = useTransform(progress, [0, 1], [0, -24]);
    const invitationOpacity = useTransform(progress, [0, 0.08, 0.22], [1, 0.58, 0]);
    const progressScale = useTransform(progress, [0, 1], [0, 1]);
    const dividerScale = useTransform(progress, [0.72, 0.9], [0, 1]);
    const dividerOpacity = useTransform(progress, [0.72, 0.86, 1], [0, 0.55, 0]);

    useEffect(() => () => {
        if (pointerFrameRef.current) cancelAnimationFrame(pointerFrameRef.current);
    }, []);

    const handlePointerEnter = (event) => {
        if (event.pointerType === 'mouse') pointerBoundsRef.current = event.currentTarget.getBoundingClientRect();
    };

    const handlePointerMove = (event) => {
        if (event.pointerType !== 'mouse' || !pointerGlowRef.current) return;
        const bounds = pointerBoundsRef.current || event.currentTarget.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - 0.5;
        const y = (event.clientY - bounds.top) / bounds.height - 0.5;

        if (pointerFrameRef.current) cancelAnimationFrame(pointerFrameRef.current);
        pointerFrameRef.current = requestAnimationFrame(() => {
            pointerGlowRef.current?.style.setProperty('transform', `translate3d(calc(-50% + ${x * 42}px), calc(-50% + ${y * 30}px), 0)`);
            pointerFrameRef.current = null;
        });
    };

    const handlePointerLeave = () => {
        pointerBoundsRef.current = null;
        pointerGlowRef.current?.style.setProperty('transform', 'translate3d(-50%, -50%, 0)');
    };

    const scrollStyles = reducedMotion ? {} : {
        firstName: { y: firstNameY, scale: nameScale, opacity: nameOpacity },
        lastName: { y: lastNameY, scale: nameScale, opacity: nameOpacity },
        support: { y: supportY, opacity: supportOpacity },
        badges: { y: badgeY, opacity: badgeOpacity },
        actions: { y: actionY, opacity: actionOpacity },
        socials: { y: actionY, opacity: socialOpacity },
        architecture: { y: architectureY, scale: architectureScale, opacity: architectureOpacity },
        capabilities: { y: actionY, opacity: actionOpacity },
    };

    return (
        <section
            ref={heroRef}
            id="home"
            className="hero-section"
            onPointerEnter={handlePointerEnter}
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
        >
            <motion.div aria-hidden="true" className="hero-ambient hero-ambient--cyan" style={reducedMotion ? undefined : { y: cyanY, opacity: ambientOpacity }}>
                <div ref={pointerGlowRef} className="hero-pointer-glow" />
            </motion.div>
            <motion.div aria-hidden="true" className="hero-ambient hero-ambient--blue" style={reducedMotion ? undefined : { y: blueY, opacity: ambientOpacity }} />
            <motion.div aria-hidden="true" className="hero-grid" style={reducedMotion ? undefined : { y: gridY, opacity: ambientOpacity }} />
            <div aria-hidden="true" className="hero-vignette" />

            <div className="hero-shell">
                <div className="hero-layout">
                    <HeroContent personalInfo={portfolioData.personalInfo} reducedMotion={reducedMotion} scrollStyles={scrollStyles} />
                    <HeroArchitecture reducedMotion={reducedMotion} scrollStyle={scrollStyles.architecture} />
                </div>
                <HeroCapabilityStrip reducedMotion={reducedMotion} scrollStyle={scrollStyles.capabilities} />
            </div>

            <motion.div aria-hidden="true" className="hero-progress" style={reducedMotion ? undefined : { opacity: invitationOpacity }}>
                <span><motion.i style={reducedMotion ? undefined : { scaleY: progressScale }} /></span>
            </motion.div>

            <motion.a
                href="#about"
                className="hero-scroll-invitation"
                style={reducedMotion ? undefined : { opacity: invitationOpacity }}
            >
                <span>Scroll to explore</span>
                <FaArrowDown aria-hidden="true" />
            </motion.a>

            <motion.div aria-hidden="true" className="hero-exit-divider" style={reducedMotion ? undefined : { scaleX: dividerScale, opacity: dividerOpacity }} />
        </section>
    );
};

export default HeroSection;
