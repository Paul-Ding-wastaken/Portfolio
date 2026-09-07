import '../CSS-folder/Landing-Page.css';
import CustomCursor from './Custom-Cursor';
import HeroSection from './Hero-Section';
import MarqueeStrip from './Marquee-Strip';
import AboutSection from './About-Section';
import SkillsSection from './Skills-Section';
import ProjectsSection from './Projects-Section';

function LandingPage() {
    return (
        <>
            <CustomCursor />
            <main>
                <HeroSection />
                <MarqueeStrip />
                <AboutSection />
                <SkillsSection />
                <ProjectsSection />
            </main>
        </>
    );
}

export default LandingPage;
