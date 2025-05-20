import { useNavigate } from 'react-router-dom';
import './HomeContent.css';
import logo from '../assets/logo-removebg.png';

const HomeContent = () => {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    const navigationItems = [
        {
            title: 'Quem Somos',
            path: '/quemsomos',
            titleClass: 'nav-title-1'
        },
        {
            title: 'O que fazemos',
            path: '/oquefazemos',
            titleClass: 'nav-title-2'
        },
        {
            title: 'Onde Estamos',
            path: '/ondeestamos',
            titleClass: 'nav-title-3'
        }
    ];
    return (
        <div className="home-container">
            <div className="home-content">
                {/* Logo Section */}
                <div className="logo-section">
                    <img
                        src={logo}
                        alt="ContaContando Logo"
                    />
                </div>

                {/* Navigation Items */}
                <div className="navigation-items">
                    {navigationItems.map((item) => (
                        <div
                            key={item.title}
                            className="navigation-item"
                            onClick={() => handleNavigation(item.path)}
                        >
                            <h2 className={item.titleClass}>{item.title}</h2>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomeContent;