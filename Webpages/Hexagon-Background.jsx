import { useEffect, useRef, useState } from 'react';
import '../CSS-folder/Hexagon-Background.css';

const HEX_SIZE = 90;
const MAX_HOVER_DISTANCE = 180;
const RIPPLE_LIFETIME = 2200;

function Hexagon({ x, y, size, mouse, clicks }) {
    const h = size * 1.1547;
    const points = `0,${-h / 2} ${size / 2},${-h / 4} ${size / 2},${h / 4} 0,${h / 2} ${-size / 2},${h / 4} ${-size / 2},${-h / 4}`;

    const distance = Math.hypot(mouse.x - x, mouse.y - y);
    const hoverStrength = distance < MAX_HOVER_DISTANCE ? 1 - distance / MAX_HOVER_DISTANCE : 0;

    let rippleStrength = 0;
    for (const ripple of clicks) {
        const age = Date.now() - ripple.time;
        const radius = age * 0.5;
        const band = 70;
        const dist = Math.hypot(x - ripple.x, y - ripple.y);
        if (Math.abs(dist - radius) < band) {
            const fade = 1 - age / RIPPLE_LIFETIME;
            rippleStrength = Math.max(rippleStrength, (1 - Math.abs(dist - radius) / band) * fade);
        }
    }

    const strength = Math.min(1, hoverStrength * 0.6 + rippleStrength);

    return (
        <polygon
            points={points}
            transform={`translate(${x}, ${y - strength * 8})`}
            style={{
                fill: 'var(--accent)',
                fillOpacity: strength * 0.5,
                stroke: 'rgba(255, 255, 255, 0.06)',
                strokeWidth: 1,
                transition: 'transform 0.4s ease',
            }}
        />
    );
}

function HexagonBackground() {
    const containerRef = useRef(null);
    const [size, setSize] = useState({ width: 0, height: 0 });
    const [mouse, setMouse] = useState({ x: -1000, y: -1000 });
    const [clicks, setClicks] = useState([]);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        const updateSize = () => setSize({ width: el.clientWidth, height: el.clientHeight });
        updateSize();
        const observer = new ResizeObserver(updateSize);
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    // keep re-rendering while ripples are animating so their radius grows; stops on its own once they fade out
    useEffect(() => {
        if (clicks.length === 0) return;
        const frame = requestAnimationFrame(() => {
            setClicks((prev) => prev.filter((c) => Date.now() - c.time < RIPPLE_LIFETIME));
        });
        return () => cancelAnimationFrame(frame);
    }, [clicks]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleMouseLeave = () => setMouse({ x: -1000, y: -1000 });

    const handleClick = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setClicks((prev) => [...prev, { x: e.clientX - rect.left, y: e.clientY - rect.top, time: Date.now() }]);
    };

    const h = HEX_SIZE * 1.1547;
    const cols = Math.ceil(size.width / HEX_SIZE) + 2;
    const rows = Math.ceil(size.height / (h * 0.75)) + 2;

    const hexagons = [];
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const x = col * HEX_SIZE + (row % 2 ? HEX_SIZE / 2 : 0);
            const y = row * (h * 0.75);
            hexagons.push(
                <Hexagon key={`${row}-${col}`} x={x} y={y} size={HEX_SIZE} mouse={mouse} clicks={clicks} />
            );
        }
    }

    return (
        <div
            ref={containerRef}
            className="hexagon-background"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
        >
            <svg width={size.width} height={size.height}>
                {hexagons}
            </svg>
        </div>
    );
}

export default HexagonBackground;
