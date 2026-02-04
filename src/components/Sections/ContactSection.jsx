import React, { useState } from 'react';
import SectionContainer from '../Layout/SectionContainer';
import portfolioData from '../../data/portfolioData';
// import { motion } from 'framer-motion';
import { FaPaperPlane, FaPhone, FaEnvelope, FaMapMarkerAlt, FaLinkedin, FaGithub } from 'react-icons/fa';
import emailjs from 'emailjs-com';

const ContactSection = () => {
    const { personalInfo } = portfolioData;
    const [formState, setFormState] = useState({ name: '', email: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const templateParams = {
            from_name: formState.name,
            from_email: formState.email,
            message: formState.message,
            to_email: 'Kunalkhaire302@gmail.com', // Explicitly setting this as requested, though usually it's set in the EmailJS template
        };

        emailjs.send(
            process.env.REACT_APP_EMAILJS_SERVICE_ID,
            process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
            templateParams,
            process.env.REACT_APP_EMAILJS_PUBLIC_KEY
        )
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
                setIsSubmitting(false);
                setSubmitStatus('success');
                setFormState({ name: '', email: '', message: '' });
                setTimeout(() => setSubmitStatus(null), 5000);
            })
            .catch((err) => {
                console.log('FAILED...', err);
                setIsSubmitting(false);
                setSubmitStatus('error');
                setTimeout(() => setSubmitStatus(null), 5000);
            });
    };

    return (
        <SectionContainer id="contact" className="pb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center text-star-white">
                Contact <span className="text-neon-teal">Station</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                {/* Contact Info */}
                <div className="space-y-8">
                    <h3 className="text-2xl font-bold text-white mb-6">Values communication. Let's Connect.</h3>
                    <p className="text-slate-400 mb-8">
                        I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
                    </p>

                    <div className="space-y-4">
                        <div className="flex items-center gap-4 text-slate-300">
                            <FaPhone className="text-neon-teal text-xl" />
                            <a href={`tel:${personalInfo.phone}`} className="hover:text-white transition-colors">{personalInfo.phone}</a>
                        </div>
                        <div className="flex items-center gap-4 text-slate-300">
                            <FaEnvelope className="text-neon-teal text-xl" />
                            <a href={`mailto:${personalInfo.email}`} className="hover:text-white transition-colors">{personalInfo.email}</a>
                        </div>
                        <div className="flex items-center gap-4 text-slate-300">
                            <FaMapMarkerAlt className="text-neon-teal text-xl" />
                            <span>{personalInfo.location}</span>
                        </div>
                    </div>

                    <div className="flex gap-4 mt-8">
                        <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 bg-space-light/10 rounded-full hover:bg-neon-teal hover:text-space-dark transition-all duration-300">
                            <FaLinkedin className="text-xl" />
                        </a>
                        <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="p-3 bg-space-light/10 rounded-full hover:bg-neon-teal hover:text-space-dark transition-all duration-300">
                            <FaGithub className="text-xl" />
                        </a>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="glass-card p-8 space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-slate-400 mb-2">Name</label>
                        <input
                            type="text"
                            id="name"
                            required
                            value={formState.name}
                            onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                            className="w-full bg-space-dark/50 border border-slate-700 rounded p-3 text-white focus:outline-none focus:border-neon-teal transition-colors"
                            placeholder="Commander Shepard"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-400 mb-2">Email</label>
                        <input
                            type="email"
                            id="email"
                            required
                            value={formState.email}
                            onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                            className="w-full bg-space-dark/50 border border-slate-700 rounded p-3 text-white focus:outline-none focus:border-neon-teal transition-colors"
                            placeholder="shepard@alliance.com"
                        />
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-slate-400 mb-2">Message</label>
                        <textarea
                            id="message"
                            required
                            rows="4"
                            value={formState.message}
                            onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                            className="w-full bg-space-dark/50 border border-slate-700 rounded p-3 text-white focus:outline-none focus:border-neon-teal transition-colors"
                            placeholder="Transmitting message..."
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full btn-primary flex items-center justify-center gap-2 group"
                    >
                        {isSubmitting ? 'Transmitting...' : (
                            <>
                                Send Transmission <FaPaperPlane className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </>
                        )}
                    </button>

                    {submitStatus === 'success' && (
                        <p className="text-green-400 text-center text-sm animate-pulse">Transmission Received Successfully!</p>
                    )}
                </form>
            </div>
        </SectionContainer>
    );
};

export default ContactSection;
