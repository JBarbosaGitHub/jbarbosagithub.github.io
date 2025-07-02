import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import CourseCard from '../Components/CourseCard'
import TrainingModal from '../Components/TrainingModal';
import PageTransition from '../Components/PageTransition';
import '../styles/Training.css'
import { Modal, Box, Typography, Button } from '@mui/material';
import SpecialistLessonCard from '../Components/SpecialistLessonCard';
import { DatePicker, TimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { pt } from 'date-fns/locale';

const ADMIN_EMAILS = ["joao@contacontando.pt"];

const Training = () => {
    const [showModal, setShowModal] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [selectedTraining, setSelectedTraining] = useState(null);
    const [courses, setCourses] = useState([]);
    const [user, setUser] = useState(null);
    const [newCourse, setNewCourse] = useState({
        title: "",
        description: "",
        imageUrl: "",
        data: "",
        instructor: "",
        platform: "",
        price: "",
        link: "",
        meetingId: "",
        meetingPass: ""
    });
    const [showAddForm, setShowAddForm] = useState(false);
    const [removeCourseId, setRemoveCourseId] = useState("");
    const [showSpecialistModal, setShowSpecialistModal] = useState(false);
    const [specialistName, setSpecialistName] = useState('');
    const [specialistDate, setSpecialistDate] = useState(null);
    const [specialistTime, setSpecialistTime] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const isFormValid = specialistName && specialistDate && specialistTime;
    const navigate = useNavigate();

    // Link fixo do Teams (placeholder)
    const TEAMS_LINK = 'https://teams.microsoft.com/l/meetup-join/placeholder';

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsLoggedIn(!!user);
            setUser(user);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const fetchCourses = async () => {
            const coursesCollection = collection(db, 'courses');
            const querySnapshot = await getDocs(coursesCollection);
            const courses = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setCourses(courses);
        };
        fetchCourses();
    }, []);

    const handleOpenModal = (training) => {
        if (isLoggedIn) {
            setSelectedTraining(training);
            setOpenModal(true);
        } else {
            setShowModal(true);
        }
    }

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedTraining(null);
    }

    const handleCloseWelcomeModal = () => {
        setShowModal(false);
    };

    const handleAddCourse = async (e) => {
        e.preventDefault();
        await addDoc(collection(db, 'courses'), {
            ...newCourse,
            price: Number(newCourse.price),
            createdAt: new Date()
        });
        setShowAddForm(false);
        setNewCourse({
            title: "",
            description: "",
            subDescription: "",
            imageUrl: "",
            public: "",
            date: "",
            dateDisplay: "",
            instructor: "",
            platform: "",
            price: "",
            link: "",
            meetingId: "",
            meetingPass: ""
        });
        // Refresh courses
        const querySnapshot = await getDocs(collection(db, 'courses'));
        const courses = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setCourses(courses);
    };

    const handleRemoveCourse = async () => {
        if (!removeCourseId) return;
        await deleteDoc(doc(db, 'courses', removeCourseId));
        setRemoveCourseId("");
        // Refresh courses
        const querySnapshot = await getDocs(collection(db, 'courses'));
        const courses = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setCourses(courses);
    };

    // Função para criar checkout SumUp para aula de especialista
    const handleSpecialistBooking = async (e) => {
        e.preventDefault();
        if (!user || !user.email) {
            alert('Tem de estar autenticado para marcar uma aula.');
            return;
        }
        setIsSubmitting(true);
        try {
            // Montar referência única
            const ref = `specialist|${specialistName}|${user.email}|${specialistDate?.toISOString().split('T')[0]}|${specialistTime?.toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' })}|${Date.now()}`;
            const response = await fetch('http://localhost:3000/api/create-payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    courseId: ref, // Usar ref como courseId para distinguir no backend
                    amount: 29.90,
                    currency: 'EUR',
                    description: 'Aula com Especialista',
                    successUrl: window.location.origin + '/#/success',
                    cancelUrl: window.location.origin + '/#/cancel',
                    buyerEmail: user.email,
                    specialistName,
                    specialistDate: specialistDate?.toISOString(),
                    specialistTime: specialistTime?.toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' })
                })
            });
            const data = await response.json();
            if (data.id && data.hosted_checkout_url) {
                window.location.href = data.hosted_checkout_url;
            } else {
                alert('Erro ao criar checkout SumUp.');
            }
        } catch (err) {
            alert('Erro ao processar marcação.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Header />
            <PageTransition>
                <div className="training-container">
                    <motion.section
                        className="training-hero"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <motion.h1
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                        >
                            Formações e Workshops
                        </motion.h1>
                        <motion.p
                            className="subtitle"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                        >
                            Venha conhecer as nossas formações e workshops
                        </motion.p>
                    </motion.section>
                    <div className="training-content">
                        <SpecialistLessonCard onBook={() => setShowSpecialistModal(true)} />
                        {courses.map((course, index) => (
                            <CourseCard
                                key={course.id || index}
                                title={course.title}
                                description={course.description}
                                image={course.imageUrl}
                                onMoreDetails={() => handleOpenModal(course)}
                                isLoggedIn={isLoggedIn}
                            />
                        ))}
                    </div>
                </div>
            </PageTransition>
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
                        boxShadow: '0 4px 24px rgba(0,0,0,0.15)',
                        position: 'relative',
                    }}>
                        <button
                            onClick={handleCloseWelcomeModal}
                            style={{
                                position: 'absolute',
                                top: '10px',
                                right: '10px',
                                background: 'none',
                                border: 'none',
                                fontSize: '1.5rem',
                                cursor: 'pointer',
                                color: '#333',
                            }}
                        >
                            &times;
                        </button>
                        <h2 style={{ color: 'black' }}>Faça o login ou crie uma conta</h2>
                        <p style={{ color: 'black' }}>Para ver o conteúdo das formações, faça o login ou crie uma conta.</p>
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
            {showSpecialistModal && (
                <Modal
                    open={showSpecialistModal}
                    onClose={() => setShowSpecialistModal(false)}
                    aria-labelledby="specialist-modal"
                    aria-describedby="specialist-modal-description"
                >
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            bgcolor: 'background.paper',
                            boxShadow: 24,
                            p: 4,
                            borderRadius: 2,
                            minWidth: 300,
                            maxWidth: 500,
                            maxHeight: '90vh',
                            overflowY: 'auto',
                            textAlign: 'center'
                        }}
                    >
                        <Typography id="specialist-modal" variant="h5" sx={{ mb: 2, color: 'black' }}>
                            Marcação de Aula com Especialista
                        </Typography>
                        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={pt}>
                            <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }} onSubmit={handleSpecialistBooking}>
                                <input
                                    type="text"
                                    placeholder="Nome"
                                    value={specialistName}
                                    onChange={e => setSpecialistName(e.target.value)}
                                    style={{ padding: '0.7rem', borderRadius: 8, border: '1px solid #ccc', width: '100%' }}
                                    required
                                />
                                <DatePicker
                                    label="Data"
                                    value={specialistDate}
                                    onChange={setSpecialistDate}
                                    slotProps={{ textField: { fullWidth: true, required: true } }}
                                />
                                <TimePicker
                                    label="Hora"
                                    value={specialistTime}
                                    onChange={setSpecialistTime}
                                    slotProps={{ textField: { fullWidth: true, required: true } }}
                                />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    disabled={!isFormValid || isSubmitting}
                                    sx={{ mt: 2, backgroundColor: '#eac862', color: '#444', fontWeight: 700 }}
                                >
                                    {isSubmitting ? 'A processar...' : 'Marcar e Pagar'}
                                </Button>
                            </form>
                        </LocalizationProvider>
                    </Box>
                </Modal>
            )}
            <Footer />
        </>
    );
};

export default Training;