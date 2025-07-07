import React, { useState, useEffect } from 'react';
import '../styles/Agenda.css';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { auth, db } from '../firebase';
import { doc, setDoc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';

const getDateKey = (date) => {
    // Força sempre a data local, ignorando UTC
    return date.getFullYear() + '-' +
        String(date.getMonth() + 1).padStart(2, '0') + '-' +
        String(date.getDate()).padStart(2, '0');
};

const Agenda = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [events, setEvents] = useState({}); // eventos pessoais
    const [autoEvents, setAutoEvents] = useState({}); // eventos automáticos
    const [newEvent, setNewEvent] = useState('');
    const [user, setUser] = useState(() => auth.currentUser);
    const [loading, setLoading] = useState(true);

    // Atualizar user se autenticação mudar
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((u) => setUser(u));
        return () => unsubscribe();
    }, []);

    // Carregar eventos pessoais do Firestore/localStorage
    useEffect(() => {
        const fetchEvents = async () => {
            setLoading(true);
            if (user) {
                const docRef = doc(db, 'agenda_events', user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setEvents(docSnap.data().events || {});
                } else {
                    setEvents({});
                }
            } else {
                // Não autenticado: localStorage
                const saved = localStorage.getItem('agendaEvents');
                setEvents(saved ? JSON.parse(saved) : {});
            }
            setLoading(false);
        };
        fetchEvents();
    }, [user]);

    // Guardar eventos pessoais no Firestore/localStorage
    useEffect(() => {
        if (loading) return;
        if (user) {
            const docRef = doc(db, 'agenda_events', user.uid);
            setDoc(docRef, { events }, { merge: true });
        } else {
            localStorage.setItem('agendaEvents', JSON.stringify(events));
        }
    }, [events, user, loading]);

    // Buscar eventos automáticos: aulas privadas e formações compradas
    useEffect(() => {
        const fetchAutoEvents = async () => {
            if (!user) {
                setAutoEvents({});
                return;
            }
            const auto = {};
            // Aulas privadas
            const q1 = query(collection(db, 'specialist_bookings'), where('email', '==', user.email));
            const snap1 = await getDocs(q1);
            snap1.forEach(docSnap => {
                const d = docSnap.data();
                if (d.date && d.time) {
                    let dateObj;
                    if (typeof d.date === 'string') {
                        if (d.date.endsWith('Z')) {
                            // UTC: converte para local
                            const utcDate = new Date(d.date);
                            dateObj = new Date(utcDate.getUTCFullYear(), utcDate.getUTCMonth(), utcDate.getUTCDate());
                        } else {
                            // Local: extrai manualmente
                            const parts = d.date.split('T')[0].split('-');
                            dateObj = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
                        }
                    } else {
                        dateObj = new Date(d.date);
                    }
                    const dateKey = getDateKey(dateObj);
                    const desc = `Aula privada às ${d.time}`;
                    auto[dateKey] = auto[dateKey] ? [...auto[dateKey], desc] : [desc];
                }
            });
            // Formações compradas
            const q2 = query(collection(db, 'purchases'), where('email', '==', user.email));
            const snap2 = await getDocs(q2);
            for (const docSnap of snap2.docs) {
                const d = docSnap.data();
                if (d.courseId) {
                    // Buscar dados da formação
                    try {
                        const courseRef = doc(db, 'courses', d.courseId);
                        const courseSnap = await getDoc(courseRef);
                        if (courseSnap.exists()) {
                            const course = courseSnap.data();
                            // Usar 'data' ou 'date' como data da formação
                            let dateValue = course.data || course.date;
                            if (dateValue) {
                                // Corrigir para extrair a data manualmente se for string
                                let dateKey;
                                if (typeof dateValue === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(dateValue)) {
                                    const parts = dateValue.split('T')[0].split('-');
                                    const dateObj = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
                                    dateKey = getDateKey(dateObj);
                                } else {
                                    const dateObj = dateValue.toDate ? dateValue.toDate() : new Date(dateValue);
                                    dateKey = getDateKey(dateObj);
                                }
                                const desc = `Formação: ${course.title || d.courseId}`;
                                auto[dateKey] = auto[dateKey] ? [...auto[dateKey], desc] : [desc];
                            }
                        }
                    } catch (e) {
                        console.log('Erro ao buscar curso', d.courseId, e);
                    }
                }
            }
            setAutoEvents(auto);
        };
        fetchAutoEvents();
    }, [user]);

    const dateKey = getDateKey(selectedDate);
    const dayEvents = (events[dateKey] || []);
    const dayAutoEvents = (autoEvents[dateKey] || []);

    const addEvent = () => {
        if (!newEvent.trim()) return;
        setEvents((prev) => ({
            ...prev,
            [dateKey]: [...(prev[dateKey] || []), newEvent.trim()]
        }));
        setNewEvent('');
    };

    const removeEvent = (idx) => {
        setEvents((prev) => ({
            ...prev,
            [dateKey]: prev[dateKey].filter((_, i) => i !== idx)
        }));
    };

    return (
        <>
            <Header />
            <div className="agenda-container">
                <div className="agenda-page">
                    <h2>Agenda Pessoal</h2>
                    <div className="agenda-calendar-section">
                        <Calendar
                            onChange={setSelectedDate}
                            value={selectedDate}
                            locale="pt-PT"
                            tileClassName={({ date, view }) => {
                                const key = getDateKey(date);
                                return ((events[key] && events[key].length > 0) || (autoEvents[key] && autoEvents[key].length > 0)) ? 'agenda-has-event' : null;
                            }}
                        />
                        <div className="agenda-events-section">
                            <h3 className="agenda-events-title">
                                Eventos em {selectedDate.toLocaleDateString('pt-PT')}
                            </h3>
                            <ul className="agenda-events-list">
                                {dayAutoEvents.map((ev, idx) => {
                                    // Detetar tipo de evento automático
                                    let icon = '🎓';
                                    let title = ev;
                                    let time = '';
                                    let link = '';
                                    let tooltip = '';
                                    let extraClass = '';
                                    if (ev.startsWith('Aula privada')) {
                                        icon = '👨‍🏫';
                                        const match = ev.match(/às (\d{1,2}:\d{2})/);
                                        if (match) time = match[1];
                                        extraClass = 'aula';
                                    } else if (ev.startsWith('Formação:')) {
                                        icon = '🎓';
                                        extraClass = 'formacao';
                                    }
                                    // Opcional: tooltip com detalhes
                                    return (
                                        <li key={"auto-"+idx} className={`agenda-event-item agenda-auto-event ${extraClass}`} title={tooltip}>
                                            <span className="event-icon">{icon}</span>
                                            <span className="event-title">{title}</span>
                                            {time && <span className="event-time">{time}</span>}
                                            {link && <a href={link} className="event-link" target="_blank" rel="noopener noreferrer">🔗</a>}
                                        </li>
                                    );
                                })}
                                {dayEvents.length === 0 && dayAutoEvents.length === 0 && <li className="agenda-no-events">Nenhum evento para este dia.</li>}
                                {dayEvents.map((ev, idx) => (
                                    <li key={idx} className="agenda-event-item agenda-personal-event">
                                        <span className="event-icon">📝</span>
                                        <span className="event-title">{ev}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Agenda;