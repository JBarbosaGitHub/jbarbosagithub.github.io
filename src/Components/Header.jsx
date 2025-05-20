import { useState } from 'react';
import './Header.css';
import { Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import logo from '../assets/logo-removebg.png';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const navItems = [
        { title: 'Quem Somos', path: '/quemsomos' },
        { title: 'O que fazemos', path: '/oquefazemos' },
        { title: 'Onde Estamos', path: '/ondeestamos' }
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
                                <Button
                                    variant="text"
                                    className="nav-button"
                                    key={index}
                                    onClick={() => {
                                        setIsMenuOpen(false);
                                        navigate(item.path);
                                    }}
                                    sx={{
                                        backgroundColor: '#576d43',
                                        color: '#edcc6e',
                                        border: 'none',
                                        padding: '10px 20px',
                                        fontsize: '1.2rem',
                                        borderRadius: '30px',
                                        cursor: 'pointer',
                                        transition: 'transform 0.3s ease',
                                        backgroungColor: '0.3s ease',
                                        marginLeft: '15px',
                                    }}
                                >
                                    {item.title}
                                </Button>
                            ))}
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;