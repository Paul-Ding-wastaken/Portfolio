import { useState } from 'react';
import '../CSS-folder/Nav-Bar.css';

const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' },
];

function NavBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const closeMenu = () => setIsMenuOpen(false);

    return (
        <nav className="nav-bar">
            <div className="nav-bar-inner container">
                <a href="#top" className="nav-brand" onClick={closeMenu}>Paul Ding</a>

                <button
                    className="nav-toggle"
                    onClick={() => setIsMenuOpen((prev) => !prev)}
                    aria-label="Toggle navigation menu"
                    aria-expanded={isMenuOpen}
                >
                    <span />
                    <span />
                    <span />
                </button>

                <div className={`nav-links ${isMenuOpen ? 'nav-links-open' : ''}`}>
                    {navLinks.map((link) => (
                        <a key={link.href} href={link.href} onClick={closeMenu}>
                            {link.label}
                        </a>
                    ))}
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
