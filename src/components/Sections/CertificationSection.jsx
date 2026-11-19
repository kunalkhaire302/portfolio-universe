import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaArrowUpRightFromSquare, FaXmark } from 'react-icons/fa6';
import SectionContainer from '../Layout/SectionContainer';
import portfolioData from '../../data/portfolioData';

const CertificationSection = () => {
    const [selectedCertificate, setSelectedCertificate] = useState(null);
    const closeButtonRef = useRef(null);
    const openerRef = useRef(null);

    useEffect(() => {
        if (!selectedCertificate) return undefined;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        closeButtonRef.current?.focus();

        const closeOnEscape = (event) => {
            if (event.key === 'Escape') setSelectedCertificate(null);
            if (event.key === 'Tab') {
                event.preventDefault();
                closeButtonRef.current?.focus();
            }
        };

        document.addEventListener('keydown', closeOnEscape);
        return () => {
            document.removeEventListener('keydown', closeOnEscape);
            document.body.style.overflow = previousOverflow;
            openerRef.current?.focus();
        };
    }, [selectedCertificate]);

    return (
        <SectionContainer id="certifications" className="section--certifications">
            <div className="section-heading section-heading--split">
                <div>
                    <span className="section-eyebrow">05 / Achievements</span>
                    <h2>Learning made <span>visible.</span></h2>
                </div>
                <p>Selected certifications and practical simulations that extend my engineering, cloud, and applied-AI foundation.</p>
            </div>

            <div className="certification-grid">
                {portfolioData.certifications.map((certificate, index) => (
                    <motion.article
                        key={certificate.id}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                        className="certification-card"
                    >
                        <button
                            type="button"
                            aria-label={`Preview ${certificate.title}`}
                            onClick={(event) => {
                                openerRef.current = event.currentTarget;
                                setSelectedCertificate(certificate);
                            }}
                            className="certification-card__image"
                        >
                            <img src={certificate.image} alt="" loading="lazy" />
                            <span>Preview credential</span>
                        </button>
                        <div className="certification-card__body">
                            <div className="certification-card__meta">
                                <span>{String(index + 1).padStart(2, '0')}</span>
                                <time>{certificate.date}</time>
                            </div>
                            <p>{certificate.issuer}</p>
                            <h3>{certificate.title}</h3>
                            <div className="certification-card__actions">
                                <button
                                    type="button"
                                    onClick={(event) => {
                                        openerRef.current = event.currentTarget;
                                        setSelectedCertificate(certificate);
                                    }}
                                >
                                    View image
                                </button>
                                {certificate.link && (
                                    <a href={certificate.link} target="_blank" rel="noopener noreferrer">
                                        Verify <FaArrowUpRightFromSquare aria-hidden="true" />
                                    </a>
                                )}
                            </div>
                        </div>
                    </motion.article>
                ))}
            </div>

            <AnimatePresence>
                {selectedCertificate && (
                    <motion.div
                        role="dialog"
                        aria-modal="true"
                        aria-label={`${selectedCertificate.title} preview`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="certificate-dialog"
                        onClick={() => setSelectedCertificate(null)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.96 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.96 }}
                            transition={{ duration: 0.24, ease: [0.23, 1, 0.32, 1] }}
                            className="certificate-dialog__content"
                            onClick={(event) => event.stopPropagation()}
                        >
                            <button ref={closeButtonRef} type="button" onClick={() => setSelectedCertificate(null)} aria-label="Close certificate preview">
                                <FaXmark aria-hidden="true" />
                            </button>
                            <img src={selectedCertificate.image} alt={`${selectedCertificate.title} certificate`} />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </SectionContainer>
    );
};

export default CertificationSection;
