import '../CSS-folder/About-Section.css';
import me from '../Assets/me.jpg';
import { useReveal } from './hooks';

function AboutSection() {
    const ref = useReveal();

    return (
        <section id="about" className="section about">
            <span className="about-ghost" aria-hidden="true">01</span>
            <div className="container about-inner reveal" ref={ref}>
                <div className="about-media">
                    <img className="about-photo" src={me} alt="Paul Ding" />
                </div>
                <div className="about-text">
                    <p className="eyebrow">01 &mdash; About</p>
                    <h2 className="section-title about-title">Who I Am</h2>
                    <p>
                        I'm a first-year Computer Science student at McMaster University. I never back down
                        from a challenge and always try to exceed my own expectations. My strength is
                        backend development with Java and Python, and for the web I primarily build with React.
                    </p>
                    <p>
                        Beyond code, I play chess, League of Legends, Valorant, and 2XKO. If you'd like to
                        get in touch, reach me at{' '}
                        <a href="mailto:paul2003mail@gmail.com">paul2003mail@gmail.com</a>.
                    </p>
                </div>
            </div>
        </section>
    );
}

export default AboutSection;
