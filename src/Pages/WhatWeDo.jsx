import Header from '../Components/Header'
import Footer from '../Components/Footer'
import '../styles/WhatWeDo.css'
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const WhatWeDo = () => {
    const [showModal, setShowModal] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsLoggedIn(!!user);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (!isLoggedIn) {
            const timer = setTimeout(() => setShowModal(true), 3000);
            return () => clearTimeout(timer);
        } else {
            setShowModal(false);
        }
    }, [isLoggedIn]);

    return (
        <>
            <Header />
            <div className="what-we-do-container">
                <section className="what-we-do-hero">
                    <h1>O que fazemos</h1>
                    <p className="subtitle">Conectando pessoas através de histórias</p>
                </section>

                <div className="what-we-do-content">
                    <div className="what-we-do-section">
                        <h2>Nossa História</h2>
                        <div className="what-we-do-info-row">
                            <p>
                                O ContaContando nasceu da paixão por contar histórias e conectar pessoas. Somos uma empresa dedicada a criar experiências únicas através da narração de histórias que inspiram, educam e entretêm.
                            </p>
                            <p>
                                Fundada em 2020, nossa equipe reúne profissionais de educação, artes e literatura para transformar vidas por meio da arte de contar histórias.
                            </p>
                        </div>
                    </div>

                    <div className="what-we-do-section">
                        <h2>Nossa Missão</h2>
                        <div className="what-we-do-info-row">
                            <p>
                                Buscamos transformar a maneira como as histórias são contadas e compartilhadas, criando um impacto positivo na vida das pessoas e contribuindo para uma sociedade mais conectada e empática.
                            </p>
                            <p>
                                Acreditamos que cada história tem o poder de transformar vidas e fortalecer laços.
                            </p>
                        </div>
                    </div>

                    <div className="what-we-do-section">
                        <h2>O Que Fazemos</h2>
                        <div className="what-we-do-info-row">
                            <p>
                                Desenvolvemos projetos personalizados de contação de histórias para escolas, empresas e eventos especiais.
                            </p>
                            <p>
                                Nossas histórias são cuidadosamente selecionadas e adaptadas para cada público, garantindo uma experiência memorável e significativa.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {showModal && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    background: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 9999
                }}>
                    <div style={{
                        background: '#fff',
                        padding: '2rem',
                        borderRadius: '12px',
                        textAlign: 'center',
                        maxWidth: '90vw',
                        boxShadow: '0 4px 24px rgba(0,0,0,0.15)'
                    }}>
                        <h2 style={{color: 'black'}}>Faça login ou registre-se</h2>
                        <p style={{color: 'black'}}>Para navegar totalmente nesta página, faça login ou crie uma conta.</p>
                        <button className="login-button" style={{padding: '1rem'}} onClick={() => navigate('/login')}>Login</button>
                        <button className="login-button" style={{padding: '1rem'}} onClick={() => navigate('/register')}>Registrar</button>
                    </div>
                </div>
            )}
            <Footer />
        </>
    )
}

export default WhatWeDo;