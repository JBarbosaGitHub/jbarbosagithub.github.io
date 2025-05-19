import { useNavigate } from 'react-router-dom';
import './HomeContent.css';

const HomeContent = () => {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    const navigationCards = [
        {
            title: 'Sobre Nós',
            description: 'Conheça nossa história e missão',
            path: '/sobre',
            titleClass: 'card-title-1'
        },
        {
            title: 'Workshops',
            description: 'Descubra o que podemos fazer por você',
            path: '/workshops',
            titleClass: 'card-title-2'
        },
        {
            title: 'Contactos',
            description: 'Entre em contacto connosco',
            path: '/contactos',
            titleClass: 'card-title-3'
        }
    ];

    return (
        <div className="home-container">
            <div className="home-content">
                {/* Logo Section */}
                <div className="logo-section">
                    <img
                        src="src/assets/logo.png"
                        alt="ContaContando Logo"
                    />
                    <h5>Transformando histórias em experiências únicas</h5>
                </div>

                {/* Intro Section */}
                <div className="home-intro">
                    <p>
                    A Academia ContaContando, em Ferreira do Zêzere, promove literacia financeira e matemática para crianças de 5 a 12 anos, com métodos lúdicos e interativos.
                    </p>
                    <p>
                    Com um currículo abrangente, de conceitos básicos a investimentos e empreendedorismo, a academia oferece acompanhamento personalizado, incentivando pensamento crítico e autonomia.
                    </p>
                    <p>
                    Abertura em setembro de 2024. Junte-se a nós!
                    </p>
                </div>

                {/* Navigation Cards */}
                <div className="navigation-cards">
                    {navigationCards.map((card) => (
                        <div
                            key={card.title}
                            className="navigation-card"
                            onClick={() => handleNavigation(card.path)}
                        >
                            <h2 className={card.titleClass}>{card.title}</h2>
                            <p>{card.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomeContent;