import React from 'react';
import { motion } from 'framer-motion';

const SectionContainer = ({ id, children, className = "" }) => {
    return (
        <section id={id} className={`section-container ${className}`}>
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.08 }}
                transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
                className="section-container__inner"
            >
                {children}
            </motion.div>
        </section>
    );
};

export default SectionContainer;
