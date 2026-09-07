import { useEffect, useState } from 'react';
import '../CSS-folder/Hero-Section.css';
import HexagonBackground from './Hexagon-Background';
import { useMagnetic } from './hooks';

const GREETINGS = ['Hey there!', 'Welcome!', 'Greetings!', 'Salutations!', "G'day!", 'Hiya!'];

function useTypewriter(words, { typingSpeed = 90, deletingSpeed = 40, pauseTime = 1400 } = {}) {
    const [text, setText] = useState('');
    const [wordIndex, setWordIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentWord = words[wordIndex % words.length];
        let timeout;

        if (!isDeleting && text === currentWord) {
            timeout = setTimeout(() => setIsDeleting(true), pauseTime);
        } else if (isDeleting && text === '') {
            setIsDeleting(false);
            setWordIndex((prev) => prev + 1);
        } else {
            const nextText = isDeleting
                ? currentWord.slice(0, text.length - 1)
                : currentWord.slice(0, text.length + 1);
            timeout = setTimeout(() => setText(nextText), isDeleting ? deletingSpeed : typingSpeed);
        }

        return () => clearTimeout(timeout);
    }, [text, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseTime]);

    return text;
}

function HeroSection() {
    const greeting = useTypewriter(GREETINGS);
    const primaryRef = useMagnetic(0.25);
    const secondaryRef = useMagnetic(0.25);

    return (
        <header id="top" className="hero">
            <HexagonBackground />
            <div className="container hero-inner">
                <p className="hero-eyebrow">Open to Summer 2026 internships</p>
                <h1 className="hero-title">
                    <span className="hero-typed">{greeting}</span>
                    <span className="hero-caret">|</span>
                    <br />
                    I'm Paul Ding.
                </h1>
                <p className="hero-subtitle">
                    Software developer and Computer Science student at McMaster University,
                    focused on backend development and building things with React.
                </p>
                <div className="hero-actions">
                    <a ref={primaryRef} href="#projects" className="button button-primary">View My Work</a>
                    <a ref={secondaryRef} href="mailto:paul2003mail@gmail.com" className="button button-secondary">Get In Touch</a>
                </div>
            </div>
            <div className="hero-scroll-cue">
                <span className="hero-scroll-line" />
                <span>Scroll</span>
            </div>
        </header>
    );
}

export default HeroSection;
