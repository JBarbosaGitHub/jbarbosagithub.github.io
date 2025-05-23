import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase';
import '../styles/HomeContent.css';
import logo from '../assets/logo-removebg.png';

const HomeContent = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsLoggedIn(!!user);
        });
        return () => unsubscribe();
    }, []);

    const handleNavigation = (path) => {
        navigate(path);
    };

    const handleLogout = async () => {
        await signOut(auth);
        navigate('/');
    };

    const navigationItems = [
        {
            title: 'Quem Somos',
            path: '/quemsomos',
            titleClass: 'nav-title-1'
        },
        {
            title: 'Formações/Workshops',
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
                {(isLoggedIn ? (
                    <div
                        className="navigation-item nav-title-1 home-login-item"
                        style={{ cursor: 'pointer', fontWeight: 700, fontSize: '1.8rem', textAlign: 'center' }}
                        onClick={handleLogout}
                    >
                        Logout
                    </div>
                ) : (
                    <div
                        className="navigation-item nav-title-1 home-login-item"
                        style={{ cursor: 'pointer', fontWeight: 700, fontSize: '1.8rem', textAlign: 'center' }}
                        onClick={() => navigate('/login')}
                    >
                        Login
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomeContent;