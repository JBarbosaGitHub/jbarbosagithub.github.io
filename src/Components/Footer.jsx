import '../styles/Footer.css';

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <footer>
            <div className="footer-content">
                <div className="bottom-left">
                    <span className="social-label">Redes Sociais</span>
                    <div className="icon-list">
                        <a className="insta-icon" href="https://www.instagram.com/acontacontando/" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-instagram"></i>
                        </a>
                        <a className="facebook-icon" href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-facebook"></i>
                        </a>
                    </div>
                </div>
                <div className="bottom-center">
                    <button
                        className="scroll-to-top-button"
                        onClick={scrollToTop}
                        style={{ fontWeight: 700, fontSize: '1.2rem' }}
                    >
                        Voltar ao topo
                    </button>
                </div>
                <div className="bottom-right">
                    <ul>
                        <li>@ 2025 - Direitos reservados a Contar Contando</li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;