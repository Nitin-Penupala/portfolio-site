'use client';

import { useEffect, useRef, useState } from 'react';
import { Mail, Linkedin, Github, Send, Loader2, CheckCircle, AlertCircle, X } from 'lucide-react';
import styles from './Contact.module.css';

const contactMethods = [
    { icon: <Mail size={20} />, label: 'Email', value: 'penupalanitin07@gmail.com', href: 'mailto:penupalanitin07@gmail.com' },
    { icon: <Linkedin size={20} />, label: 'LinkedIn', value: 'nitin-penupala', href: 'https://linkedin.com/in/nitin-penupala' },
    { icon: <Github size={20} />, label: 'GitHub', value: 'Nitin-Penupala', href: 'https://github.com/Nitin-Penupala' },
];

const MAX_MESSAGE_LENGTH = 1000;

function validateField(name, value) {
    switch (name) {
        case 'name':
            if (!value.trim()) return 'Name is required';
            if (value.trim().length < 2) return 'Name must be at least 2 characters';
            return '';
        case 'email':
            if (!value.trim()) return 'Email is required';
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email address';
            return '';
        case 'message':
            if (!value.trim()) return 'Message is required';
            if (value.trim().length < 10) return 'Message must be at least 10 characters';
            if (value.length > MAX_MESSAGE_LENGTH) return `Message must be under ${MAX_MESSAGE_LENGTH} characters`;
            return '';
        default:
            return '';
    }
}

export default function Contact() {
    const sectionRef = useRef(null);
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [status, setStatus] = useState('idle');
    const [toast, setToast] = useState(null);

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

    useEffect(() => {
        if (toast) {
            const timer = setTimeout(() => setToast(null), 5000);
            return () => clearTimeout(timer);
        }
    }, [toast]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (touched[name]) {
            setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
        }
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        setTouched((prev) => ({ ...prev, [name]: true }));
        setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {};
        ['name', 'email', 'message'].forEach((field) => {
            const error = validateField(field, formData[field]);
            if (error) newErrors[field] = error;
        });
        setErrors(newErrors);
        setTouched({ name: true, email: true, message: true });

        if (Object.keys(newErrors).length > 0) return;

        setStatus('loading');

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
                    name: formData.name.trim(),
                    email: formData.email.trim(),
                    subject: formData.subject.trim() || 'Portfolio Contact Form',
                    message: formData.message.trim(),
                    from_name: 'Portfolio Contact Form',
                }),
            });

            const data = await response.json();

            if (data.success) {
                setStatus('success');
                setToast({ type: 'success', message: 'Message sent successfully! I\'ll get back to you soon.' });
                setFormData({ name: '', email: '', subject: '', message: '' });
                setTouched({});
                setErrors({});
                setTimeout(() => setStatus('idle'), 3000);
            } else {
                throw new Error(data.message || 'Something went wrong');
            }
        } catch (error) {
            setStatus('error');
            setToast({ type: 'error', message: error.message || 'Failed to send message. Please try again or email me directly.' });
            setTimeout(() => setStatus('idle'), 3000);
        }
    };

    return (
        <section className={styles.contact} id="contact" ref={sectionRef}>
            {toast && (
                <div className={`${styles.toast} ${styles[toast.type]}`}>
                    <div className={styles.toastContent}>
                        {toast.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
                        <span>{toast.message}</span>
                    </div>
                    <button className={styles.toastClose} onClick={() => setToast(null)} aria-label="Dismiss notification">
                        <X size={14} />
                    </button>
                </div>
            )}
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
                        <form onSubmit={handleSubmit} noValidate>
                            <div className={`${styles.formGroup} ${errors.name && touched.name ? styles.hasError : ''}`}>
                                <label htmlFor="name">Your Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="John Doe"
                                    value={formData.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    disabled={status === 'loading'}
                                />
                                {errors.name && touched.name && <span className={styles.fieldError}>{errors.name}</span>}
                            </div>
                            <div className={`${styles.formGroup} ${errors.email && touched.email ? styles.hasError : ''}`}>
                                <label htmlFor="email">Your Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="john@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    disabled={status === 'loading'}
                                />
                                {errors.email && touched.email && <span className={styles.fieldError}>{errors.email}</span>}
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="subject">Subject</label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    placeholder="Project Collaboration"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    disabled={status === 'loading'}
                                />
                            </div>
                            <div className={`${styles.formGroup} ${errors.message && touched.message ? styles.hasError : ''}`}>
                                <label htmlFor="message">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    placeholder="Tell me about your project..."
                                    value={formData.message}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    disabled={status === 'loading'}
                                    maxLength={MAX_MESSAGE_LENGTH}
                                />
                                <div className={styles.textareaFooter}>
                                    {errors.message && touched.message && <span className={styles.fieldError}>{errors.message}</span>}
                                    <span className={styles.charCount}>
                                        {formData.message.length}/{MAX_MESSAGE_LENGTH}
                                    </span>
                                </div>
                            </div>
                            <button
                                type="submit"
                                className={`btn btn-primary ${styles.submitBtn} ${status === 'success' ? styles.sent : ''}`}
                                disabled={status === 'loading'}
                            >
                                {status === 'loading' ? (
                                    <><Loader2 size={18} className={styles.spinner} /> Sending...</>
                                ) : status === 'success' ? (
                                    <><CheckCircle size={18} /> Message Sent!</>
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
