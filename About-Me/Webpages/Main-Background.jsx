import React, { useEffect, useState } from "react";

// Single Hexagon Component
function Hexagon({ x, y, size, mouse, clicks }) {
    const h = size * 1.1547;
    const points = `
    0, ${-h / 2}
    ${size / 2}, ${-h / 4}
    ${size / 2}, ${h / 4}
    0, ${h / 2}
    ${-size / 2}, ${h / 4}
    ${-size / 2}, ${-h / 4}
  `;

    // --- Mouse hover offset (existing logic) ---
    const dxMouse = mouse.x - x;
    const dyMouse = mouse.y - y;
    const distance = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
    const maxDistance = 200;
    const maxOffset = 10;
    const mouseOffsetY =
        distance < maxDistance ? -maxOffset * (1 - distance / maxDistance) : 0;

    // --- Ripple effect ---
    let fill = "black";
    let rippleOffsetY = 0;
    let scale = 1;

    if (clicks.length > 0) {
        const ripple = clicks[clicks.length - 1]; // latest ripple
        const dx = x - ripple.x;
        const dy = y - ripple.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        const rippleRadius = (Date.now() - ripple.time)*1.5; // speed of ripple
        const bandWidth = 90; // thickness of wave band
        const delayBeforeFall = 1000; // ms wait before falling down

        if (dist < rippleRadius && dist > rippleRadius - bandWidth) {
            // just hit by wave
            fill = "blue";
            rippleOffsetY = -10; // jump up
            scale = 1.2;
            // store the moment this hexagon was activated
            Hexagon.lastHit = Hexagon.lastHit || {};
            Hexagon.lastHit[`${x},${y}`] = Date.now();
        } else if (dist < rippleRadius - bandWidth) {
            // already passed
            const lastHitTime = Hexagon.lastHit?.[`${x},${y}`];
            if (lastHitTime && Date.now() - lastHitTime < delayBeforeFall) {
                // still waiting → stay up
                fill = ripple.x < 500 ? "blue" : "green";
                rippleOffsetY = -10;
            } else {
                // time passed → fall back down
                fill = ripple.x < 500 ? "blue" : "green";
                rippleOffsetY = 0;
            }
        }
    }

    // Combine offsets
    const totalOffsetY = mouseOffsetY + rippleOffsetY;

    return (
        <polygon
            points={points}
            fill={fill}
            transform={`translate(${x}, ${y + totalOffsetY}) scale(${scale})`}
            style={{ transition: "transform 1s, fill 2s" }}
        />
    );
}



function MainBackground({ trigger }) {
    const [size, setSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    const [mouse, setMouse] = useState({ x: -1000, y: -1000 });
    const [clicks, setClicks] = useState([]);

    useEffect(() => {
        const handleResize = () =>
            setSize({ width: window.innerWidth, height: window.innerHeight });
        window.addEventListener("resize", handleResize);

        const handleMouseMove = (e) => setMouse({ x: e.clientX, y: e.clientY });
        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    const w = 150;
    const h = w * 1.1547;
    const cols = Math.ceil(size.width / w) + 2;
    const rows = Math.ceil(size.height / (h * 0.75)) + 2;

    const hexagons = [];
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const x = col * w + (row % 2 ? w / 2 : 0);
            const y = row * (h * 0.75);
            hexagons.push(
                <Hexagon
                    key={`${row}-${col}`}
                    x={x}
                    y={y}
                    size={w}
                    mouse={mouse}
                    clicks={clicks}
                />
            );
        }
    }

    // expose trigger to parent
    useEffect(() => {
        if (trigger) {
            trigger((x, y) => {
                setClicks((prev) => [...prev, { x, y, time: Date.now() }]);
            });
        }
    }, [trigger]);

    // force ripple animation to update
    useEffect(() => {
        const interval = setInterval(() => setClicks([...clicks]), 30);
        return () => clearInterval(interval);
    }, [clicks]);

    return (
        <svg width="100vw" height="99vh">
            {/* Gradient sphere behind hexagons */}
            <defs>
                <radialGradient id="redToBlack" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="rgba(255, 1, 1, 1)" />
                    <stop offset="100%" stopColor="rgba(0, 0, 0, 0.5)" />
                </radialGradient>
            </defs>
            <circle cx={mouse.x} cy={mouse.y} r={320} fill="url(#redToBlack)" />

            {/* Hexagons on top */}
            {hexagons}
        </svg>
    );
}

export default MainBackground;