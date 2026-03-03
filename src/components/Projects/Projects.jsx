'use client';

import { useEffect, useRef } from 'react';
import { Brain, ScanLine, Github } from 'lucide-react';
import styles from './Projects.module.css';

const projects = [
    {
        icon: <Brain size={24} />,
        title: 'AI-Driven Civic Issue Management Platform',
        description:
            'A full-stack civic issue reporting system with AI-powered classification and prioritization. Features real-time status tracking, voice-based reporting, and analytical dashboards.',
        features: [
            'AI models for automated complaint categorization and prioritization',
            'Voice-based & image upload reporting with real-time tracking',
            'Admin dashboards for issue trends, resolution time, and workload analytics',
            'Automated data pipelines with REST API integration',
        ],
        tags: ['Python', 'Flask', 'REST APIs', 'AI/ML', 'MongoDB'],
        github: 'https://github.com/Nitin-Penupala',
    },
    {
        icon: <ScanLine size={24} />,
        title: 'Sentiel — RFID Attendance Monitoring System',
        description:
            'A Python-based desktop application for real-time event attendance tracking using RFID scanners and unique IDs. Features live attendance dashboards and automated data export.',
        features: [
            'Real-time attendance tracking using RFID and unique IDs',
            'CustomTkinter UI with intuitive member registration flow',
            'SQLite database for relational participant and event data',
            'Automated CSV/Excel export for analytics and reporting',
        ],
        tags: ['Python', 'SQLite', 'CustomTkinter', 'RFID', 'CSV/Excel'],
        github: 'https://github.com/Nitin-Penupala',
    },
];

export default function Projects() {
    const sectionRef = useRef(null);

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

    return (
        <section className={styles.projects} id="projects" ref={sectionRef}>
            <div className="container">
                <div className="section-header reveal">
                    <span className="section-label">Projects</span>
                    <h2 className="section-title">What I&apos;ve Built</h2>
                    <p className="section-subtitle">Featured projects showcasing full-stack, AI, and data skills</p>
                </div>
                <div className={styles.grid}>
                    {projects.map((project, i) => (
                        <div key={i} className={`${styles.card} reveal ${i > 0 ? 'reveal-delay-2' : ''}`}>
                            <div className={styles.top}>
                                <div className={styles.icon}>{project.icon}</div>
                                <div className={styles.links}>
                                    <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                                        <Github size={20} />
                                    </a>
                                </div>
                            </div>
                            <h3 className={styles.title}>{project.title}</h3>
                            <p className={styles.description}>{project.description}</p>
                            <ul className={styles.features}>
                                {project.features.map((f, j) => (
                                    <li key={j}>{f}</li>
                                ))}
                            </ul>
                            <div className={styles.tags}>
                                {project.tags.map((tag) => (
                                    <span key={tag} className={styles.tag}>{tag}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
