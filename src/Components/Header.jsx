import { useState } from 'react';
import './Header.css';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import logo from '../assets/logo-removebg.png';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const navItems = [
        { title: 'Quem Somos', path: '/quemsomos', titleClass: 'nav-title-1' },
        { title: 'O que fazemos', path: '/oquefazemos', titleClass: 'nav-title-2' },
        { title: 'Onde Estamos', path: '/ondeestamos', titleClass: 'nav-title-3' }
    ];

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header>
            <div className="header-content">
                <div className="top-left">
                    <a href="/">
                        <img className="nav-logo" src={logo} alt="Logo" />
                    </a>
                </div>
                <div className="top-right">
                    <button className="menu-toggle" onClick={toggleMenu}>
                        {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
                    </button>
                    <nav className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
                        <div className="nav-list">
                            {navItems.map((item, index) => (
                                <div
                                    key={item.title}
                                    className={`navigation-item ${item.titleClass}`}
                                    onClick={() => {
                                        setIsMenuOpen(false);
                                        navigate(item.path);
                                    }}
                                    style={{ cursor: 'pointer', marginLeft: '15px', fontWeight: 700, fontSize: '1.2rem' }}
                                >
                                    {item.title}
                                </div>
                            ))}
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;