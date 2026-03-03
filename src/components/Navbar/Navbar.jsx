'use client';

import { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, Phone, Menu, X } from 'lucide-react';
import styles from './Navbar.module.css';

const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Education', href: '#education' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('');

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            const sections = document.querySelectorAll('section[id]');
            const scrollY = window.scrollY + 150;

            sections.forEach((section) => {
                const top = section.offsetTop;
                const height = section.offsetHeight;
                const id = section.getAttribute('id');
                if (scrollY >= top && scrollY < top + height) {
                    setActiveSection(id);
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const closeMenu = () => {
        setMenuOpen(false);
        document.body.style.overflow = '';
    };

    const toggleMenu = () => {
        setMenuOpen((prev) => {
            document.body.style.overflow = !prev ? 'hidden' : '';
            return !prev;
        });
    };

    return (
        <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
            <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <a href="#" className={styles.logo}>
                    NP<span>.</span>
                </a>

                <div className={`${styles.navLinks} ${menuOpen ? styles.open : ''}`}>
                    {navItems.map((item) => (
                        <a
                            key={item.href}
                            href={item.href}
                            className={activeSection === item.href.slice(1) ? styles.active : ''}
                            onClick={closeMenu}
                        >
                            {item.label}
                        </a>
                    ))}
                    <a href="#contact" className={styles.cta} onClick={closeMenu}>
                        Contact
                    </a>
                </div>

                <button className={`${styles.hamburger} ${menuOpen ? styles.hamburgerActive : ''}`} onClick={toggleMenu} aria-label="Toggle menu">
                    {menuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>
        </nav>
    );
}
