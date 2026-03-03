import { Github, Linkedin, Mail } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className={styles.content}>
                    <p className={styles.text}>
                        Designed & Built by <span>Nitin Penupala</span> © 2025
                    </p>
                    <div className={styles.socials}>
                        <a href="https://github.com/Nitin-Penupala" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                            <Github size={16} />
                        </a>
                        <a href="https://linkedin.com/in/nitin-penupala" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                            <Linkedin size={16} />
                        </a>
                        <a href="mailto:penupalanitin07@gmail.com" aria-label="Email">
                            <Mail size={16} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
