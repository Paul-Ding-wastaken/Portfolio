import '../CSS-folder/Marquee-Strip.css';

const ITEMS = [
    'OPEN TO SUMMER 2026 INTERNSHIPS',
    'BACKEND DEVELOPMENT',
    'JAVA',
    'PYTHON',
    'REACT',
    'MCMASTER UNIVERSITY',
];

function MarqueeStrip() {
    const track = [...ITEMS, ...ITEMS];

    return (
        <div className="marquee" aria-hidden="true">
            <div className="marquee-track">
                {track.map((item, i) => (
                    <span className="marquee-item" key={i}>
                        {item}
                        <span className="marquee-dot">&#9679;</span>
                    </span>
                ))}
            </div>
        </div>
    );
}

export default MarqueeStrip;
