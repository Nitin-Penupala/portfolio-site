'use client';

import { useEffect, useRef } from 'react';
import { Terminal, Layout, Server, Database, BarChart3, Wrench } from 'lucide-react';
import styles from './Skills.module.css';

const categories = [
    {
        icon: <Terminal size={20} />,
        title: 'Programming Languages',
        skills: ['Python', 'JavaScript', 'Java', 'C++', 'SQL'],
    },
    {
        icon: <Layout size={20} />,
        title: 'Frontend',
        skills: ['React.js', 'HTML5', 'CSS3', 'Tailwind', 'Bootstrap', 'UI/UX'],
    },
    {
        icon: <Server size={20} />,
        title: 'Backend & Frameworks',
        skills: ['Node.js', 'Express', 'Flask', 'REST APIs', 'WebSockets'],
    },
    {
        icon: <Database size={20} />,
        title: 'Databases & Cloud',
        skills: ['MongoDB', 'MySQL', 'SQLite', 'AWS', 'Docker'],
    },
    {
        icon: <BarChart3 size={20} />,
        title: 'Data & AI',
        skills: ['Pandas', 'NumPy', 'Matplotlib', 'Power BI', 'OpenAI APIs'],
    },
    {
        icon: <Wrench size={20} />,
        title: 'Tools & Platforms',
        skills: ['Git', 'GitHub Actions', 'Figma', 'n8n', 'Excel'],
    },
];

export default function Skills() {
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
        <section className={styles.skills} id="skills" ref={sectionRef}>
            <div className="container">
                <div className="section-header reveal">
                    <span className="section-label">Skills</span>
                    <h2 className="section-title">My Tech Stack</h2>
                    <p className="section-subtitle">Technologies and tools I work with</p>
                </div>
                <div className={styles.grid}>
                    {categories.map((cat, i) => (
                        <div key={cat.title} className={`${styles.category} reveal ${i > 0 ? `reveal-delay-${Math.min(i, 4)}` : ''}`}>
                            <div className={styles.categoryHeader}>
                                <div className={styles.categoryIcon}>{cat.icon}</div>
                                <span className={styles.categoryTitle}>{cat.title}</span>
                            </div>
                            <div className={styles.items}>
                                {cat.skills.map((skill) => (
                                    <div key={skill} className={styles.item}>
                                        <span className={styles.dot} />
                                        {skill}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
