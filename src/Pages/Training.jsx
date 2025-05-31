import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import CourseCard from '../Components/CourseCard'
import logo from '../assets/logo-removebg.png'
import example1 from '../assets/example1.jpg';
import example2 from '../assets/example2.jpg';
import example3 from '../assets/example3.jpg';
import example4 from '../assets/example4.jpg';
import TrainingModal from '../Components/TrainingModal';
import '../styles/Training.css'

const Training = () => {
    const [showModal, setShowModal] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [selectedTraining, setSelectedTraining] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsLoggedIn(!!user);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (!isLoggedIn) {
            const timer = setTimeout(() => setShowModal(true), 5000);
            return () => clearTimeout(timer);
        } else {
            setShowModal(false);
        }
    }, [isLoggedIn]);

    const handleOpenModal = (training) => {
        setSelectedTraining(training);
        setOpenModal(true);
    }

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedTraining(null);
    }

    const courses = [
        {
            title: "Literacia Financeira Básica",
            description: "Aprenda os fundamentos para gerir suas finanças pessoais de forma eficiente.",
            image: example1,
            data: "01-06 até 03-06 de 2025",
            instructor: "Ana Costa",
            platform: "Microsoft Teams",
            price: 10,
            link: "https://teams.microsoft.com/l/message/17:user/17224000000000000"
        },
        {
            title: "Gestão de Orçamento Familiar",
            description: "Aprenda a criar e manter um orçamento familiar eficiente.",
            image: example2,
            data: "15-06 até 17-06 de 2025",
            instructor: "João Silva",
            platform: "Microsoft Teams",
            price: 15,
            link: "https://teams.microsoft.com/l/message/17:user/17224000000000000"
        },
        {
            title: "Investimentos para Iniciantes",
            description: "Conheça as bases dos investimentos e como começar a investir.",
            image: example3,
            data: "01-07 até 03-07 de 2025",
            instructor: "Maria Santos",
            platform: "Microsoft Teams",
            price: 20,
            link: "https://teams.microsoft.com/l/message/17:user/17224000000000000"
        },
        {
            title: "Planejamento Financeiro",
            description: "Aprenda a planejar suas finanças para o futuro.",
            image: example4,
            data: "15-07 até 17-07 de 2025",
            instructor: "Pedro Oliveira",
            platform: "Microsoft Teams",
            price: 25,
            link: "https://teams.microsoft.com/l/message/17:user/17224000000000000"
        }
    ]

    return (
        <>
            <Header />
            <div className="training-container">
                <section className="training-hero">
                    <h1>Formações e Workshops</h1>
                    <p className="subtitle">Venha conhecer as nossas formações e workshops</p>
                </section>
                <div className="training-content">
                    {courses.map((course, index) => (
                        <CourseCard
                            key={index}
                            title={course.title}
                            description={course.description}
                            image={course.image}
                            onMoreDetails={() =>
                                handleOpenModal({
                                    title: course.title,
                                    description: course.description,
                                    image: course.image,
                                    data: course.data,
                                    instructor: course.instructor,
                                    platform: course.platform,
                                    price: course.price,
                                    link: course.link
                                })
                            }
                            isLoggedIn={isLoggedIn}
                        />
                    ))}
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
                        <h2 style={{ color: 'black' }}>Faça login ou registre-se</h2>
                        <p style={{ color: 'black' }}>Para navegar totalmente nesta página, faça login ou crie uma conta.</p>
                        <button className="login-button" style={{ padding: '1rem' }} onClick={() => navigate('/login')}>Login</button>
                        <button className="login-button" style={{ padding: '1rem' }} onClick={() => navigate('/register')}>Registar</button>
                    </div>
                </div>
            )}
            {openModal && (
                <TrainingModal
                    open={openModal}
                    onClose={handleCloseModal}
                    training={selectedTraining}
                />
            )}
            <Footer />
        </>
    )
}

export default Training;