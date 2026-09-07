import '../CSS-folder/Skills-Section.css';
import unityLogo from '../Assets/UnityLogo.png';
import cSharpLogo from '../Assets/cSharpLogo.png';
import CSSLogo from '../Assets/CSSLogo.png';
import JSLogo from '../Assets/JSLogo.png';
import TSLogo from '../Assets/TSLogo.png';
import reactLogo from '../Assets/reactLogo.png';
import viteLogo from '../Assets/viteLogo.png';
import expoLogo from '../Assets/expoLogo.png';
import { useReveal } from './hooks';

const skills = [
    { name: 'Java' },
    { name: 'Python' },
    { name: 'C#', logo: cSharpLogo },
    { name: 'JavaScript', logo: JSLogo },
    { name: 'TypeScript', logo: TSLogo },
    { name: 'React', logo: reactLogo },
    { name: 'CSS', logo: CSSLogo },
    { name: 'Vite', logo: viteLogo },
    { name: 'Unity', logo: unityLogo },
    { name: 'Expo', logo: expoLogo },
];

function SkillsSection() {
    const ref = useReveal();

    return (
        <section id="skills" className="section skills">
            <div className="container">
                <p className="eyebrow">02 &mdash; Skills</p>
                <h2 className="section-title">Skills &amp; Tools</h2>
                <p className="section-subtitle">
                    Languages and tools I've been working with in coursework and personal projects.
                </p>
                <div className="skills-grid" ref={ref}>
                    {skills.map((skill) => (
                        <div className="skill-item" key={skill.name}>
                            {skill.logo && <img src={skill.logo} alt={`${skill.name} logo`} />}
                            <span>{skill.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default SkillsSection;
