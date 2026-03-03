'use client';

import { useEffect, useRef } from 'react';
import styles from './Experience.module.css';

const experiences = [
    {
        role: 'Application Development Intern',
        company: 'VenX IT Solutions',
        date: 'June 2025',
        points: [
            'Developed scalable frontend components and interactive dashboards for real-time data visualization',
            'Implemented API-driven modules with dynamic rendering and real-time updates',
            'Collected, processed, and analyzed application data to improve feature performance and usability',
            'Collaborated with cross-functional teams to deliver end-to-end features',
        ],
    },
    {
        role: 'Web Development Intern',
        company: 'ApexPlanet',
        date: 'May – June 2025',
        points: [
            'Built a full-stack content platform following software engineering best practices',
            'Designed modular, reusable components with clean separation of concerns',
            'Implemented role-based access control and optimized application performance',
            'Integrated REST APIs for smooth frontend–backend communication',
        ],
    },
    {
        role: 'Head of Content',
        company: 'F1 SIG VZG, GITAM',
        date: '2023 – Present',
        points: [
            'Led content strategy and digital workflows, contributing to a 40% increase in engagement',
            'Applied structured planning, automation, and design consistency across platforms',
            'Analyzed engagement metrics and content performance data for data-backed marketing decisions',
        ],
    },
];

export default function Experience() {
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
        <section className={styles.experience} id="experience" ref={sectionRef}>
            <div className="container">
                <div className="section-header reveal">
                    <span className="section-label">Experience</span>
                    <h2 className="section-title">Where I&apos;ve Worked</h2>
                    <p className="section-subtitle">My professional journey in tech so far</p>
                </div>
                <div className={styles.timeline}>
                    {experiences.map((exp, i) => (
                        <div key={i} className={`${styles.item} reveal`}>
                            <div className={styles.dot} />
                            <div className={styles.card}>
                                <div className={styles.header}>
                                    <div>
                                        <div className={styles.role}>{exp.role}</div>
                                        <div className={styles.company}>{exp.company}</div>
                                    </div>
                                    <span className={styles.date}>{exp.date}</span>
                                </div>
                                <ul className={styles.points}>
                                    {exp.points.map((p, j) => (
                                        <li key={j}>{p}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
