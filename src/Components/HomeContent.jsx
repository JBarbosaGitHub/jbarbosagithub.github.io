import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { motion } from 'framer-motion';
import '../styles/HomeContent.css';
import logoImg from '../assets/logo-removebg.png';
import Footer from './Footer';
import AvatarMenu from './AvatarMenu';

const HomeContent = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    const heroMessages = [
        'Educar para a literacia financeira é semear um futuro de escolhas conscientes e liberdade.',
        'A pedagogia financeira transforma sonhos em planos e incertezas em oportunidades.',
        'Ensinar a gerir dinheiro é dar às crianças asas para voar com segurança.',
        'Com educação financeira, cada aluno constrói hoje o alicerce de um amanhã próspero.',
        'A literacia financeira na escola é a chave para um mundo mais justo e equilibrado.',
        'Educar é mostrar que o dinheiro é uma ferramenta, não um fim, para um futuro brilhante.',
        'Uma criança que aprende a poupar hoje será um adulto que realiza amanhã.',
        'A pedagogia aliada à literacia financeira cria cidadãos confiantes e responsáveis.',
        'Ensinar finanças é ensinar a transformar esforço em conquistas duradouras.',
        'A educação financeira na infância é o primeiro passo para uma vida sem limites.',
        'Com literacia financeira, cada aluno ganha o poder de moldar o seu destino.',
        'A escola que ensina finanças forma adultos que constroem futuros sem medo.',
        'Educar para o dinheiro é educar para a independência e a dignidade.',
        'A literacia financeira é a ponte que leva os jovens a um futuro de possibilidades.',
        'Ensinar a gerir recursos é ensinar a valorizar o presente e a sonhar com o futuro.',
        'A pedagogia financeira desperta mentes para a importância de escolhas inteligentes.',
        'Uma educação financeira sólida é o melhor presente para o futuro de qualquer criança.',
        'Com literacia financeira, os alunos aprendem que o futuro se constrói com pequenos passos.',
        'Ensinar finanças é mostrar que o sucesso começa com disciplina e conhecimento.',
        'A escola é o lugar onde a literacia financeira planta sementes de prosperidade.',
        'Educar para o dinheiro é capacitar para a vida, com coragem e responsabilidade.',
        'A literacia financeira transforma a sala de aula num laboratório de futuros brilhantes.',
        'Ensinar a poupar é ensinar a acreditar que o amanhã pode ser melhor.',
        'Com educação financeira, cada jovem descobre o poder de controlar o seu caminho.',
        'A pedagogia financeira é a base para uma sociedade mais consciente e sustentável.',
        'Uma criança educada financeiramente é um adulto preparado para vencer desafios.',
        'A literacia financeira na escola é o primeiro passo para uma vida de conquistas.',
        'Ensinar a gerir dinheiro é ensinar a transformar sonhos em realidade.',
        'A educação financeira abre portas para um futuro de escolhas livres e informadas.',
        'Com pedagogia e literacia financeira, formamos gerações que constroem o mundo que queremos.'
    ];

    const [heroMessage, setHeroMessage] = useState('');
    const [lastIndex, setLastIndex] = useState(-1);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsLoggedIn(!!user);
            setUser(user);
        });
        const pickRandom = (excludeIdx = -1) => {
            let idx;
            do {
                idx = Math.floor(Math.random() * heroMessages.length);
            } while (heroMessages.length > 1 && idx === excludeIdx);
            return idx;
        };
        const idx = pickRandom();
        setHeroMessage(heroMessages[idx]);
        setLastIndex(idx);
        const interval = setInterval(() => {
            const newIdx = pickRandom(lastIndex);
            setHeroMessage(heroMessages[newIdx]);
            setLastIndex(newIdx);
        }, 8000);
        return () => clearInterval(interval);
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
            titleClass: 'nav-title-1',
        },
        {
            title: 'Formações/Workshops',
            path: '/formacoes',
            titleClass: 'nav-title-2',
        },
        {
            title: 'Onde Estamos',
            path: '/ondeestamos',
            titleClass: 'nav-title-3',
        },
        {
            title: 'Contacte-nos',
            path: '/contacte-nos',
            titleClass: 'nav-title-2',
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
        <>
            {/* Login/AvatarMenu no topo direito */}
            <div className="home-login-top-right">
                <div
                    className={'nav-title-1 home-login-card'}
                    onClick={isLoggedIn ? handleLogout : () => navigate('/login')}
                    style={{ cursor: 'pointer' }}
                >
                    <span className={'nav-title-1'} style={{ pointerEvents: 'none' }}>{isLoggedIn ? 'Logout' : 'Login'}</span>
                </div>
                {isLoggedIn && <AvatarMenu user={user} />}
            </div>
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
                            src={logoImg}
                            alt="ContaContando Logo"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                            whileHover={{ scale: 1.05 }}
                        />
                    </motion.div>
                    {/* Frase inspiradora em barra/card */}
                    <div className="home-inspiration-bar">
                        {heroMessage}
                    </div>
                    <motion.div className="navigation-items" variants={containerVariants} style={{ gap: '3.5rem', flexWrap: 'wrap' }}>
                        {navigationItems.map((item, idx) => (
                            <motion.div
                                key={item.title}
                                variants={itemVariants}
                                whileHover={{ scale: 1.05, boxShadow: '0 8px 32px rgba(234,200,98,0.18)' }}
                                whileTap={{ scale: 0.97 }}
                            >
                                <div
                                    onClick={() => handleNavigation(item.path)}
                                    className={item.titleClass + ' home-access-card'}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <span className={item.titleClass} style={{ pointerEvents: 'none' }}>{item.title}</span>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
            <Footer />
        </>
    );
};

export default HomeContent;