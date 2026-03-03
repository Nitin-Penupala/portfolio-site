'use client';

import { useEffect, useRef } from 'react';
import { Code2, BarChart3, Palette, Brain } from 'lucide-react';
import styles from './About.module.css';

const highlights = [
    { icon: <Code2 size={16} />, label: 'Full-Stack Development' },
    { icon: <BarChart3 size={16} />, label: 'Data Analytics' },
    { icon: <Palette size={16} />, label: 'UI/UX Design' },
    { icon: <Brain size={16} />, label: 'AI & Automation' },
];

const stats = [
    { number: '2+', label: 'Internships' },
    { number: '4+', label: 'Projects' },
    { number: '3+', label: 'Years Coding' },
];

export default function About() {
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

        const els = sectionRef.current?.querySelectorAll('.reveal');
        els?.forEach((el) => observer.observe(el));

        const statEls = sectionRef.current?.querySelectorAll(`.${styles.statNumber}`);
        const counterObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const el = entry.target;
                        const text = el.dataset.value;
                        const match = text.match(/(\d+)/);
                        if (match) {
                            const target = parseInt(match[0]);
                            const suffix = text.replace(match[0], '');
                            let current = 0;
                            const increment = Math.ceil(target / 30);
                            const interval = setInterval(() => {
                                current += increment;
                                if (current >= target) {
                                    current = target;
                                    clearInterval(interval);
                                }
                                el.textContent = current + suffix;
                            }, 33);
                        }
                        counterObserver.unobserve(el);
                    }
                });
            },
            { threshold: 0.5 }
        );

        statEls?.forEach((el) => counterObserver.observe(el));

        return () => {
            observer.disconnect();
            counterObserver.disconnect();
        };
    }, []);

    return (
        <section className={styles.about} id="about" ref={sectionRef}>
            <div className="container">
                <div className="section-header reveal">
                    <span className="section-label">About Me</span>
                    <h2 className="section-title">Who I Am</h2>
                </div>
                <div className={styles.grid}>
                    <div className={`${styles.imageWrapper} reveal`}>
                        <div className={styles.imageCard}>
                            <div className={styles.avatar}>
                                <img src="/PP_grey.png" alt="Nitin Penupala" className={styles.photo} />
                            </div>
                        </div>
                        <div className={styles.stats}>
                            {stats.map((stat) => (
                                <div key={stat.label} className={styles.statCard}>
                                    <div className={styles.statNumber}>{stat.number}</div>
                                    <div className={styles.statLabel}>{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={`${styles.text} reveal reveal-delay-2`}>
                        <h3>Building <span className="gradient-text">digital experiences</span> that matter</h3>
                        <p>
                            I&apos;m a detail-oriented software engineer with strong foundations in Python, JavaScript, and full-stack
                            web development. My experience spans building scalable frontend components, designing efficient backend
                            architectures, and working with data analytics workflows.
                        </p>
                        <p>
                            From developing interactive dashboards at VenX IT Solutions to crafting full-stack content platforms
                            at ApexPlanet, I bring a blend of technical depth and creative problem-solving to every project.
                        </p>
                        <div className={styles.highlights}>
                            {highlights.map((h) => (
                                <div key={h.label} className={styles.highlightItem}>
                                    <span className={styles.highlightIcon}>{h.icon}</span>
                                    {h.label}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
