import { useState, useEffect } from 'react';
import '../styles/Header.css';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import logo from '../assets/logo-removebg.png';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import AvatarMenu from './AvatarMenu';

const Header = ({ showWave }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const navItems = [
        { title: 'Quem Somos', path: '/quemsomos', titleClass: 'nav-title-1' },
        { title: 'Formações/Workshops', path: '/formacoes', titleClass: 'nav-title-2' },
        { title: 'Onde Estamos', path: '/ondeestamos', titleClass: 'nav-title-3' },
        { title: 'Contacte-nos', path: '/contacte-nos', titleClass: 'nav-title-4' }
    ];

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsLoggedIn(!!user);
            setUser(user);
        });
        return () => unsubscribe();
    }, []);

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
                <div className="top-right" style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
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
                            {!isLoggedIn ? (
                                <div
                                    className="navigation-item nav-title-1"
                                    style={{ cursor: 'pointer', fontWeight: 700, fontSize: '1.2rem', marginLeft: '15px' }}
                                    onClick={() => navigate('/login')}
                                >
                                    Login
                                </div>
                            ) : (
                                <AvatarMenu user={user} />
                            )}
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;