import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import CourseCard from '../Components/CourseCard'
import TrainingModal from '../Components/TrainingModal';
import '../styles/Training.css'
import { Modal, Box, Typography, Button } from '@mui/material';

const ADMIN_EMAILS = ["123@gmail.com"];

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
        link: ""
    });
    const [showAddForm, setShowAddForm] = useState(false);
    const [removeCourseId, setRemoveCourseId] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsLoggedIn(!!user);
            setUser(user);
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
        setSelectedTraining(training);
        setOpenModal(true);
    }

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedTraining(null);
    }

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
            imageUrl: "",
            data: "",
            instructor: "",
            platform: "",
            price: "",
            link: ""
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

    return (
        <>
            <Header />
            <div className="training-container">
                <section className="training-hero">
                    <h1>Formações e Workshops</h1>
                    <p className="subtitle">Venha conhecer as nossas formações e workshops</p>
                </section>
                {user && ADMIN_EMAILS.includes(user.email) && (
                    <div style={{ margin: '1rem 0', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: '2rem' }}>
                        {/* Add Button and Modal */}
                        <div>
                            <Button
                                onClick={() => setShowAddForm(true)}
                                sx={{
                                    transition: 'transform 0.3s ease',
                                    textAlign: 'center',
                                    padding: '1rem',
                                    color: 'green',
                                    fontSize: '1.1rem',
                                    fontWeight: 700,
                                    '&:hover': {
                                        transform: 'translateY(-3px)',
                                        backgroundColor: 'transparent',
                                        opacity: '1',
                                    },
                                    '&:active': {
                                        backgroundColor: 'transparent',
                                        opacity: '1',
                                        transform: 'scale(1.1)',
                                    },
                                }}
                            >
                                Adicionar Formação
                            </Button>
                            <Modal
                                open={showAddForm}
                                onClose={() => setShowAddForm(false)}
                                aria-labelledby="add-course-modal"
                                aria-describedby="add-course-modal-description"
                            >
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        bgcolor: 'background.paper',
                                        boxShadow: 24,
                                        p: 6,
                                        borderRadius: 2,
                                        minWidth: 500,
                                        maxWidth: 400,
                                        width: '90%',
                                    }}
                                >
                                    <Typography id="add-course-modal" variant="h4" component="h2" sx={{ mb: 2, color: 'black' }}>
                                        Adicionar Formação
                                    </Typography>
                                    <form
                                        onSubmit={handleAddCourse}
                                        style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
                                    >
                                        <input
                                            style={{
                                                padding: '0.3rem',
                                                fontWeight: 500,
                                                fontSize: '1rem'
                                            }}
                                            placeholder="Título"
                                            value={newCourse.title}
                                            onChange={e => setNewCourse(c => ({ ...c, title: e.target.value }))}
                                            required
                                        />
                                        <textarea
                                            style={{
                                                padding: '0.3rem',
                                                fontWeight: 500,
                                                fontSize: '1rem'
                                            }}
                                            placeholder="Descrição"
                                            value={newCourse.description}
                                            onChange={e => setNewCourse(c => ({ ...c, description: e.target.value }))}
                                            required
                                        />
                                        <input
                                            style={{
                                                padding: '0.3rem',
                                                fontWeight: 500,
                                                fontSize: '1rem'
                                            }}
                                            placeholder="URL da Imagem"
                                            value={newCourse.imageUrl}
                                            onChange={e => setNewCourse(c => ({ ...c, imageUrl: e.target.value }))}
                                            required
                                        />
                                        <input
                                            style={{
                                                padding: '0.3rem',
                                                fontWeight: 500,
                                                fontSize: '1rem'
                                            }}
                                            placeholder="Data"
                                            value={newCourse.data}
                                            onChange={e => setNewCourse(c => ({ ...c, data: e.target.value }))}
                                            required
                                        />
                                        <input
                                            style={{
                                                padding: '0.3rem',
                                                fontWeight: 500,
                                                fontSize: '1rem'
                                            }}
                                            placeholder="Instrutor"
                                            value={newCourse.instructor}
                                            onChange={e => setNewCourse(c => ({ ...c, instructor: e.target.value }))}
                                            required
                                        />
                                        <input
                                            style={{
                                                padding: '0.3rem',
                                                fontWeight: 500,
                                                fontSize: '1rem'
                                            }}
                                            placeholder="Plataforma"
                                            value={newCourse.platform}
                                            onChange={e => setNewCourse(c => ({ ...c, platform: e.target.value }))}
                                            required
                                        />
                                        <input
                                            style={{
                                                padding: '0.3rem',
                                                fontWeight: 500,
                                                fontSize: '1rem'
                                            }}
                                            placeholder="Preço"
                                            value={newCourse.price}
                                            onChange={e => setNewCourse(c => ({ ...c, price: e.target.value }))}
                                            required
                                        />
                                        <input
                                            style={{
                                                padding: '0.3rem',
                                                fontWeight: 500,
                                                fontSize: '1rem'
                                            }}
                                            placeholder="Link"
                                            value={newCourse.link}
                                            onChange={e => setNewCourse(c => ({ ...c, link: e.target.value }))}
                                            required
                                        />
                                        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', justifyContent: 'space-between' }}>
                                            <Button
                                                type="submit"
                                                sx={{
                                                    transition: 'transform 0.3s ease',
                                                    textAlign: 'center',
                                                    color: 'green',
                                                    fontSize: '1rem',
                                                    fontWeight: 600,
                                                    '&:hover': {
                                                        transform: 'translateY(-3px)',
                                                        backgroundColor: 'transparent',
                                                        opacity: '1',
                                                    },
                                                    '&:active': {
                                                        backgroundColor: 'transparent',
                                                        opacity: '1',
                                                        transform: 'scale(1.1)',
                                                    },
                                                }}>
                                                Adicionar Formação
                                            </Button>
                                            <Button type="button" onClick={() => setShowAddForm(false)} sx={{
                                                transition: 'transform 0.3s ease',
                                                textAlign: 'center',
                                                color: 'red',
                                                fontSize: '1rem',
                                                fontWeight: 600,
                                                '&:hover': {
                                                    transform: 'translateY(-3px)',
                                                    backgroundColor: 'transparent',
                                                    opacity: '1',
                                                },
                                                '&:active': {
                                                    backgroundColor: 'transparent',
                                                    opacity: '1',
                                                    transform: 'scale(1.1)',
                                                },
                                            }}>
                                                Cancelar
                                            </Button>
                                        </div>
                                    </form>
                                </Box>
                            </Modal>
                        </div>
                        {/* Remove Dropdown and Button */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <select
                                value={removeCourseId}
                                onChange={e => setRemoveCourseId(e.target.value)}
                                style={{ padding: '0.5rem', borderRadius: '12px', fontWeight: 700, fontSize: '1rem' }}
                            >
                                <option value="">Seleciona uma formação para remover</option>
                                {courses.map(course => (
                                    <option key={course.id} value={course.id}>{course.title}</option>
                                ))}
                            </select>
                            <Button
                                onClick={handleRemoveCourse}
                                sx={{
                                    cursor: removeCourseId ? 'pointer' : 'not-allowed',
                                    transition: 'transform 0.3s ease',
                                    opacity: removeCourseId ? 1 : 0.5,
                                    textAlign: 'center',
                                    padding: '1rem',
                                    color: 'red',
                                    fontSize: '1.1rem',
                                    fontWeight: 700,
                                    '&:hover': {
                                        transform: 'translateY(-3px)',
                                        backgroundColor: 'transparent',
                                        opacity: '1',
                                    },
                                    '&:active': {
                                        backgroundColor: 'transparent',
                                        opacity: '1',
                                        transform: 'scale(1.1)',
                                    },
                                }}
                            >
                                Remover Formação
                            </Button>
                        </div>
                    </div>
                )}
                <div className="training-content">
                    {courses.map((course, index) => (
                        <CourseCard
                            key={course.id || index}
                            title={course.title}
                            description={course.description}
                            image={course.imageUrl}
                            onMoreDetails={() => handleOpenModal(course)
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
                        <h2 style={{ color: 'black' }}>Faça o login ou crie uma conta</h2>
                        <p style={{ color: 'black' }}>Para navegar totalmente nesta página, faça o login ou crie uma conta.</p>
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
    );
};

export default Training;