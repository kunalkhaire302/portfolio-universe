import React from 'react';
import { FaArrowRight, FaEnvelope, FaGithub, FaLinkedin, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import SectionContainer from '../Layout/SectionContainer';
import portfolioData from '../../data/portfolioData';

const ContactSection = () => {
    const { personalInfo } = portfolioData;

    return (
        <SectionContainer id="contact" className="section--contact">
            <div aria-hidden="true" className="contact-aura" />
            <div className="contact-layout">
                <div className="contact-copy">
                    <h2>Let&apos;s build something <span>meaningful.</span></h2>
                    <p>I&apos;m open to thoughtful conversations about software engineering, intelligent applications, product ideas, and collaborative technical work.</p>
                    <a href={`mailto:${personalInfo.email}`} className="button button--primary contact-cta">
                        Start a conversation <FaArrowRight aria-hidden="true" />
                    </a>
                </div>

                <div className="contact-panel">
                    <div className="contact-panel__header">
                        <span>Direct channels</span>
                        <i><span /> Available by email</i>
                    </div>
                    <ul>
                        <li>
                            <FaEnvelope aria-hidden="true" />
                            <span>Email</span>
                            <a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a>
                        </li>
                        <li>
                            <FaPhone aria-hidden="true" />
                            <span>Phone</span>
                            <a href={`tel:${personalInfo.phone}`}>{personalInfo.phone}</a>
                        </li>
                        <li>
                            <FaMapMarkerAlt aria-hidden="true" />
                            <span>Location</span>
                            <strong>{personalInfo.location}</strong>
                        </li>
                    </ul>
                    <div className="contact-socials">
                        <a href={personalInfo.github} target="_blank" rel="noopener noreferrer"><FaGithub aria-hidden="true" /> GitHub</a>
                        <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer"><FaLinkedin aria-hidden="true" /> LinkedIn</a>
                    </div>
                </div>
            </div>
        </SectionContainer>
    );
};

export default ContactSection;
