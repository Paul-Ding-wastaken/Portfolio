import { useEffect, useRef, useState } from 'react';
import '../CSS-folder/Custom-Cursor.css';

function CustomCursor() {
    const dotRef = useRef(null);
    const ringRef = useRef(null);
    const [enabled, setEnabled] = useState(false);

    useEffect(() => {
        setEnabled(window.matchMedia('(hover: hover) and (pointer: fine)').matches);
    }, []);

    useEffect(() => {
        if (!enabled) return;

        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let ringX = mouseX;
        let ringY = mouseY;
        let frame;

        const handleMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            if (dotRef.current) {
                dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
            }
        };

        const animateRing = () => {
            ringX += (mouseX - ringX) * 0.18;
            ringY += (mouseY - ringY) * 0.18;
            if (ringRef.current) {
                ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
            }
            frame = requestAnimationFrame(animateRing);
        };

        const handleOver = (e) => {
            if (e.target.closest('a, button')) {
                ringRef.current?.classList.add('cursor-ring-hover');
            }
        };
        const handleOut = (e) => {
            if (e.target.closest('a, button')) {
                ringRef.current?.classList.remove('cursor-ring-hover');
            }
        };

        window.addEventListener('mousemove', handleMove);
        document.addEventListener('mouseover', handleOver);
        document.addEventListener('mouseout', handleOut);
        frame = requestAnimationFrame(animateRing);

        return () => {
            window.removeEventListener('mousemove', handleMove);
            document.removeEventListener('mouseover', handleOver);
            document.removeEventListener('mouseout', handleOut);
            cancelAnimationFrame(frame);
        };
    }, [enabled]);

    if (!enabled) return null;

    return (
        <>
            <div ref={dotRef} className="cursor-dot" />
            <div ref={ringRef} className="cursor-ring" />
        </>
    );
}

export default CustomCursor;
