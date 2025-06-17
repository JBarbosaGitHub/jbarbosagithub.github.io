import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import PageTransition from '../Components/PageTransition';
import '../styles/ContactUs.css';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        email: '',
        subject: '',
        description: '',
    });
    const [status, setStatus] = useState({ type: '', message: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ type: 'loading', message: 'A enviar mensagem...' });

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    to: 'joao@contacontando.pt'
                }),
            });

            if (response.ok) {
                setStatus({ type: 'success', message: 'Mensagem enviada com sucesso!' });
                setFormData({ email: '', subject: '', description: '' });
            } else {
                throw new Error('Erro ao enviar mensagem');
            }
        } catch (error) {
            setStatus({ type: 'error', message: 'Erro ao enviar mensagem. Por favor, tente novamente.' });
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
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
            <Header />
            <PageTransition>
                <div className="contact-container">
                    <motion.div 
                        className="contact-content"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.h1 variants={itemVariants}>Contacte-nos</motion.h1>
                        <motion.p className="contact-intro" variants={itemVariants}>
                            Tem alguma dúvida ou sugestão? Estamos aqui para ajudar! Preencha o formulário abaixo e entraremos em contacto consigo o mais brevemente possível.
                        </motion.p>

                        <motion.form 
                            onSubmit={handleSubmit} 
                            className="contact-form"
                            variants={itemVariants}
                        >
                            <motion.div className="form-group" variants={itemVariants}>
                                <label htmlFor="email">Email para resposta</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="Seu email"
                                />
                            </motion.div>

                            <motion.div className="form-group" variants={itemVariants}>
                                <label htmlFor="subject">Assunto</label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    placeholder="Assunto da mensagem"
                                />
                            </motion.div>

                            <motion.div className="form-group" variants={itemVariants}>
                                <label htmlFor="description">Descrição</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                    placeholder="Escreva sua mensagem aqui..."
                                    rows="6"
                                />
                            </motion.div>

                            {status.message && (
                                <motion.div 
                                    className={`status-message ${status.type}`}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                >
                                    {status.message}
                                </motion.div>
                            )}

                            <motion.button 
                                type="submit" 
                                className="submit-button"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Enviar Mensagem
                            </motion.button>
                        </motion.form>
                    </motion.div>
                </div>
            </PageTransition>
            <Footer />
        </>
    );
};

export default ContactUs; 