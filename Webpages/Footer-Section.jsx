import '../CSS-folder/Footer-Section.css';

function FooterSection() {
    const year = new Date().getFullYear();

    return (
        <footer id="contact" className="section footer">
            <div className="container footer-inner">
                <h2 className="section-title">Let's Build Something</h2>
                <p className="section-subtitle">
                    I'm currently looking for a software internship. Feel free to reach out.
                </p>
                <div className="footer-actions">
                    <a className="button button-primary" href="mailto:paul2003mail@gmail.com">Email Me</a>
                    <a className="button button-secondary" href="https://github.com/Paul-Ding-wastaken" target="_blank" rel="noopener noreferrer">
                        GitHub
                    </a>
                </div>
                <p className="footer-copyright">&copy; {year} Paul Ding</p>
            </div>
        </footer>
    );
}

export default FooterSection;
