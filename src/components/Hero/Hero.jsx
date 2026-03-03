'use client';

import { useState, useEffect } from 'react';
import { FolderOpen, Send, Github, Linkedin, Mail, Phone } from 'lucide-react';
import DottedGlowBackground from '../ui/DottedGlowBackground';
import styles from './Hero.module.css';

const roles = [
    'Software Engineer',
    'Full-Stack Developer',
    'Data Analyst',
    'Frontend Developer',
    'UI/UX Enthusiast',
];

export default function Hero() {
    const [text, setText] = useState('');
    const [roleIndex, setRoleIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentRole = roles[roleIndex];
        let timeout;

        if (!isDeleting) {
            if (charIndex < currentRole.length) {
                timeout = setTimeout(() => {
                    setText(currentRole.substring(0, charIndex + 1));
                    setCharIndex((c) => c + 1);
                }, 80);
            } else {
                timeout = setTimeout(() => setIsDeleting(true), 2000);
            }
        } else {
            if (charIndex > 0) {
                timeout = setTimeout(() => {
                    setText(currentRole.substring(0, charIndex - 1));
                    setCharIndex((c) => c - 1);
                }, 40);
            } else {
                setIsDeleting(false);
                setRoleIndex((i) => (i + 1) % roles.length);
                timeout = setTimeout(() => { }, 500);
            }
        }

        return () => clearTimeout(timeout);
    }, [charIndex, isDeleting, roleIndex]);

    return (
        <section className={styles.hero} id="hero">
            <DottedGlowBackground
                gap={44}
                radius={0.7}
                color="rgba(255,255,255,0.12)"
                glowColor="rgba(255,255,255,0.4)"
                glowRadius={12}
                glowChance={0.02}
                speedMin={3000}
                speedMax={6000}
            />
            <div className="container">
                <div className={styles.content}>
                    <p className={styles.greeting}>👋 Hi there, I&apos;m</p>
                    <h1 className={styles.name}>
                        <span className="gradient-text">Nitin Penupala</span>
                    </h1>
                    <p className={styles.role}>
                        I&apos;m a <span className={styles.typed}>{text}</span>
                    </p>
                    <p className={styles.description}>
                        Software engineering–focused developer with a passion for building scalable web applications,
                        crafting clean UI/UX experiences, and transforming raw data into actionable insights.
                        Currently pursuing B.Tech in Computer Science at GITAM University.
                    </p>
                    <div className={styles.buttons}>
                        <a href="#projects" className="btn btn-primary">
                            <FolderOpen size={18} /> View My Work
                        </a>
                        <a href="#contact" className="btn btn-outline">
                            <Send size={18} /> Get In Touch
                        </a>
                    </div>
                    <div className={styles.socials}>
                        <a href="https://github.com/Nitin-Penupala" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github size={20} /></a>
                        <a href="https://linkedin.com/in/nitin-penupala" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin size={20} /></a>
                        <a href="mailto:penupalanitin07@gmail.com" aria-label="Email"><Mail size={20} /></a>
                        <a href="tel:+918074856499" aria-label="Phone"><Phone size={20} /></a>
                    </div>
                </div>
            </div>
            <div className={styles.scrollIndicator}>
                <span>Scroll</span>
                <div className={styles.scrollLine} />
            </div>
        </section>
    );
}
