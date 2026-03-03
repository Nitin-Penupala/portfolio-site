'use client';

import { useEffect, useRef } from 'react';
import { Calendar, Award } from 'lucide-react';
import styles from './Education.module.css';

const courses = [
    'Data Structures', 'Algorithms', 'Operating Systems', 'DBMS',
    'Artificial Intelligence', 'Software Engineering', 'API Design', 'UI/UX',
];

export default function Education() {
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
        <section className={styles.education} id="education" ref={sectionRef}>
            <div className="container">
                <div className="section-header reveal">
                    <span className="section-label">Education</span>
                    <h2 className="section-title">My Academic Journey</h2>
                </div>
                <div className={`${styles.card} reveal`}>
                    <div className={styles.icon}>🎓</div>
                    <div className={styles.degree}>B.Tech in Computer Science Engineering</div>
                    <div className={styles.school}>GITAM (Deemed-to-be) University, Andhra Pradesh</div>
                    <div className={styles.meta}>
                        <div className={styles.metaItem}>
                            <Calendar size={14} color="var(--accent-primary)" />
                            2022 – 2026
                        </div>
                        <div className={styles.metaItem}>
                            <Award size={14} color="var(--accent-primary)" />
                            CGPA: 7.5
                        </div>
                    </div>
                    <div className={styles.coursesSection}>
                        <div className={styles.coursesLabel}>Core Coursework</div>
                        <div className={styles.courseTags}>
                            {courses.map((course) => (
                                <span key={course} className={styles.courseTag}>{course}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
