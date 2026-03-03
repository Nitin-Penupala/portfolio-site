'use client';

import { useEffect, useRef, useState } from 'react';
import { Mail, Linkedin, Github, Send } from 'lucide-react';
import styles from './Contact.module.css';

const contactMethods = [
    { icon: <Mail size={20} />, label: 'Email', value: 'penupalanitin07@gmail.com', href: 'mailto:penupalanitin07@gmail.com' },

    { icon: <Linkedin size={20} />, label: 'LinkedIn', value: 'nitin-penupala', href: 'https://linkedin.com/in/nitin-penupala' },
    { icon: <Github size={20} />, label: 'GitHub', value: 'Nitin-Penupala', href: 'https://github.com/Nitin-Penupala' },
];

export default function Contact() {
    const sectionRef = useRef(null);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        );
        sectionRef.current?.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            e.target.reset();
        }, 3000);
    };

    return (
        <section className={styles.contact} id="contact" ref={sectionRef}>
            <div className="container">
                <div className="section-header reveal">
                    <span className="section-label">Contact</span>
                    <h2 className="section-title">Let&apos;s Connect</h2>
                    <p className="section-subtitle">Have a project in mind or just want to chat? Drop me a message!</p>
                </div>
                <div className={styles.grid}>
                    <div className={`${styles.info} reveal`}>
                        <h3>Reach out <span className="gradient-text">anytime</span></h3>
                        <p>
                            I&apos;m always open to discussing new projects, creative ideas, or opportunities to collaborate.
                            Whether you have a question or just want to say hi, feel free to reach out!
                        </p>
                        <div className={styles.methods}>
                            {contactMethods.map((method) => (
                                <a key={method.label} href={method.href} className={styles.method} target={method.href.startsWith('http') ? '_blank' : undefined} rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}>
                                    <div className={styles.methodIcon}>{method.icon}</div>
                                    <div>
                                        <div className={styles.methodLabel}>{method.label}</div>
                                        <div className={styles.methodValue}>{method.value}</div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                    <div className={`${styles.formCard} reveal reveal-delay-2`}>
                        <form onSubmit={handleSubmit}>
                            <div className={styles.formGroup}>
                                <label htmlFor="name">Your Name</label>
                                <input type="text" id="name" name="name" placeholder="John Doe" required />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="email">Your Email</label>
                                <input type="email" id="email" name="email" placeholder="john@example.com" required />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="subject">Subject</label>
                                <input type="text" id="subject" name="subject" placeholder="Project Collaboration" />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="message">Message</label>
                                <textarea id="message" name="message" placeholder="Tell me about your project..." required />
                            </div>
                            <button type="submit" className={`btn btn-primary ${styles.submitBtn} ${submitted ? styles.sent : ''}`}>
                                {submitted ? (
                                    <><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg> Message Sent!</>
                                ) : (
                                    <><Send size={18} /> Send Message</>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
