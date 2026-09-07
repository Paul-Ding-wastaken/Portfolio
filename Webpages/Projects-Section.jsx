import '../CSS-folder/Projects-Section.css';
import video1 from '../Assets/1-3D-game-preview.mp4';
import unityLogo from '../Assets/UnityLogo.png';
import cSharpLogo from '../Assets/cSharpLogo.png';
import musicGameImage from '../Assets/music-game-image.png';
import website1Image from '../Assets/website1-image.png';
import CSSLogo from '../Assets/CSSLogo.png';
import viteLogo from '../Assets/viteLogo.png';
import JSLogo from '../Assets/JSLogo.png';
import reactLogo from '../Assets/reactLogo.png';
import helpMyImage from '../Assets/helpMyImage.png';
import TSLogo from '../Assets/TSLogo.png';
import expoLogo from '../Assets/expoLogo.png';
import { useReveal } from './hooks';

const projects = [
    {
        title: '1-3D Shooter',
        description: 'A first-person 3D shooter prototype built in Unity, focused on core shooting mechanics and level design.',
        github: 'https://github.com/Paul-Ding-wastaken/Shooter-Game-1-3D',
        tech: [{ name: 'Unity', logo: unityLogo }, { name: 'C#', logo: cSharpLogo }],
        media: { type: 'video', src: video1 },
        featured: true,
    },
    {
        title: 'Rhythm Game',
        description: 'A simple rhythm game built in Unity, with note timing and scoring mechanics.',
        github: 'https://github.com/Paul-Ding-wastaken/Music-rhythm-game',
        tech: [{ name: 'Unity', logo: unityLogo }, { name: 'C#', logo: cSharpLogo }],
        media: { type: 'image', src: musicGameImage },
    },
    {
        title: 'API + Google Auth Website',
        description: 'A website integrating Google authentication with a custom API, built with React and Vite.',
        github: 'https://github.com/Paul-Ding-wastaken/Proj-5',
        tech: [{ name: 'CSS', logo: CSSLogo }, { name: 'JavaScript', logo: JSLogo }, { name: 'React', logo: reactLogo }, { name: 'Vite', logo: viteLogo }],
        media: { type: 'image', src: website1Image },
    },
    {
        title: 'HelpMy App',
        description: 'A cross-platform mobile app built with React Native and Expo.',
        github: 'https://github.com/Paul-Ding-wastaken/Native-React',
        tech: [{ name: 'Expo', logo: expoLogo }, { name: 'TypeScript', logo: TSLogo }],
        media: { type: 'image', src: helpMyImage },
    },
];

function ProjectCard({ project, index }) {
    return (
        <a
            className={`project-card${project.featured ? ' project-card-featured' : ''}`}
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
        >
            <div className="project-media">
                {project.media.type === 'video' ? (
                    <video src={project.media.src} autoPlay muted loop playsInline />
                ) : (
                    <img src={project.media.src} alt={`${project.title} screenshot`} />
                )}
            </div>
            <div className="project-body">
                <span className="project-index">{String(index + 1).padStart(2, '0')}</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-tech">
                    {project.tech.map((tech) => (
                        <img key={tech.name} src={tech.logo} alt={`${tech.name} logo`} title={tech.name} />
                    ))}
                </div>
                <span className="project-link">View on GitHub &rarr;</span>
            </div>
        </a>
    );
}

function ProjectsSection() {
    const ref = useReveal();

    return (
        <section id="projects" className="section projects">
            <div className="container">
                <p className="eyebrow">03 &mdash; Projects</p>
                <h2 className="section-title">Projects</h2>
                <p className="section-subtitle">A few things I've built while learning and experimenting.</p>
                <div className="projects-grid reveal" ref={ref}>
                    {projects.map((project, index) => (
                        <ProjectCard key={project.title} project={project} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default ProjectsSection;
