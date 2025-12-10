import React from 'react';
import './footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <p>&copy; {currentYear} Your Name. All rights reserved.</p>
                </div>
                <div className="footer-section">
                    <div className="social-links">
                        <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">GitHub</a>
                        <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                        <a href="mailto:your.email@example.com">Email</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;