import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { motion } from 'framer-motion';
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
            path: '/formacoes',
            titleClass: 'nav-title-2'
        },
        {
            title: 'Onde Estamos',
            path: '/ondeestamos',
            titleClass: 'nav-title-3'
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 260,
                damping: 20
            }
        }
    };

    return (
        <div className="home-container">
            <motion.div
                className="home-content"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Logo Section */}
                <motion.div className="logo-section" variants={itemVariants}>
                    <motion.img
                        src={logo}
                        alt="ContaContando Logo"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        whileHover={{ scale: 1.05 }}
                    />
                </motion.div>

                {/* Navigation Items */}
                <motion.div className="navigation-items" variants={containerVariants}>
                    {navigationItems.map((item, idx) => (
                        <motion.div
                            key={item.title}
                            className="navigation-item"
                            onClick={() => handleNavigation(item.path)}
                            variants={itemVariants}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.97 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                        >
                            <h2 className={item.titleClass}>{item.title}</h2>
                        </motion.div>
                    ))}
                </motion.div>
                {isLoggedIn ? (
                    <motion.div
                        className="navigation-item nav-title-1 home-login-item"
                        style={{ cursor: 'pointer', fontWeight: 700, fontSize: '1.8rem', textAlign: 'center' }}
                        onClick={handleLogout}
                        variants={itemVariants}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                    >
                        Logout
                    </motion.div>
                ) : (
                    <motion.div
                        className="navigation-item nav-title-1 home-login-item"
                        style={{ cursor: 'pointer', fontWeight: 700, fontSize: '1.8rem', textAlign: 'center' }}
                        onClick={() => navigate('/login')}
                        variants={itemVariants}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                    >
                        Login
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
};

export default HomeContent;