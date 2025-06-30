import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { getFirestore, collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { differenceInMinutes, parseISO } from 'date-fns';

const db = getFirestore();
const auth = getAuth();

const TrainingModal = ({ open, onClose, training }) => {
    const [hasPurchased, setHasPurchased] = useState(false);
    const [canAccess, setCanAccess] = useState(false);
    const user = auth.currentUser;

    useEffect(() => {
        const checkPurchases = async () => {
            if (!user) return;
            const q = query(
                collection(db, 'purchases'),
                where('email', '==', user.email),
                where('courseId', '==', training.id)
            );
            const querySnapshot = await getDocs(q);
            setHasPurchased(!querySnapshot.empty);
        };
        checkPurchases();
    }, [user, training.id]);

    useEffect(() => {
        if (!training?.date) return;
        const trainingDate = parseISO(training.date);
        const now = new Date();
        const diff = differenceInMinutes(trainingDate, now);
        console.log('trainingDate:', trainingDate, 'now:', now, 'diff:', diff);
        setCanAccess(diff <= 30);
        const interval = setInterval(() => {
            const now = new Date();
            const diff = differenceInMinutes(trainingDate, now);
            console.log('interval trainingDate:', trainingDate, 'now:', now, 'diff:', diff);
            setCanAccess(diff <= 30);
        }, 30000);
        return () => clearInterval(interval);
    }, [training?.date]);

    const handleBuy = async () => {
        if (!user || !user.email) {
            alert('Tem de estar logado para realizar a compra.');
            return;
        }
        if (training.price === 0) {
            try {
                await addDoc(collection(db, 'purchases'), {
                    email: user.email,
                    courseId: training.id,
                    transactionId: `FREE-${training.id}-${user.uid}-${Date.now()}`,
                    amount: 0,
                    currency: 'FREE',
                    purchasedAt: new Date(),
                    status: 'FREE',
                });
                
                const emailHtml = `
                    <h1>Olá!</h1>
                    <p>A sua inscrição na formação gratuita "${training.title}" foi confirmada com sucesso.</p>
                    <p>Abaixo estão os detalhes para aceder à formação:</p>
                    <ul>
                        ${training.dateDisplay ? `<li><strong>Data:</strong> ${training.dateDisplay}</li>` : ''}
                        ${training.link ? `<li><strong>Link de Acesso:</strong> <a href="${training.link}">${training.link}</a></li>` : ''}
                        ${training.meetingId ? `<li><strong>ID da Reunião:</strong> ${training.meetingId}</li>` : ''}
                        ${training.meetingPass ? `<li><strong>Password:</strong> ${training.meetingPass}</li>` : ''}
                    </ul>
                    <p>Obrigado!</p>
                `;

                await addDoc(collection(db, 'mail'), {
                    to: user.email,
                    message: {
                        subject: `Detalhes de Acesso: ${training.title}`,
                        html: emailHtml,
                    },
                });

                alert('Inscrição na formação gratuita realizada com sucesso! O link de acesso foi enviado para o seu email.');
                setHasPurchased(true);
            } catch (error) {
                console.error('Error registering for free course:', error);
                alert('Não foi possível inscrever-se na formação gratuita. Por favor, tente novamente.');
            }
            return;
        }

        const courseData = {
            courseId: training.id,
            amount: training.price,
            currency: 'EUR',
            description: training.title,
            successUrl: `http://www.contacontando.pt/#/formacoes`,
            cancelUrl: `http://www.contacontando.pt/#/formacoes`,
            buyerEmail: user.email,
        };

        try {
            const response = await fetch('https://www.contacontando.pt/api/create-checkout-session.js', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(courseData),
            });

            const data = await response.json();
            console.log('Frontend received data:', data);
            
            if (data.id && data.hosted_checkout_url) {
                window.location.href = data.hosted_checkout_url;
            } else {
                throw new Error('Failed to create payment or retrieve hosted checkout URL');
            }
        } catch (error) {
            console.error('Payment error:', error);
            alert('Failed to process payment. Please try again.');
        }
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="training-modal"
            aria-describedby="training-modal-description"
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
                }}
            >
                {training && (
                    <>
                        <img 
                            src={training.imageUrl} 
                            alt={training.title} 
                            style={{
                                width: '100%', 
                                height: '300px',
                                objectFit: 'cover',
                                objectPosition: 'center',
                                marginBottom: '1rem' 
                            }}
                        />
                        {training.subDescription && (
                            <Typography variant="body1" color="text.secondary" sx={{ 
                                fontSize: '1rem', 
                                marginBottom: '1rem',
                                whiteSpace: 'pre-line',
                                lineHeight: '1.6'
                            }}>
                                {training.subDescription}
                            </Typography>
                        )}
                        {training.public && (
                            <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1rem', marginBottom: '0.5rem' }}>
                                <strong>Publico-Alvo:</strong> {training.public}
                            </Typography>
                        )}
                        {training.dateDisplay && (
                            <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1rem', marginBottom: '0.5rem' }}>
                                <strong>Data:</strong> {training.dateDisplay}
                            </Typography>
                        )}
                        {training.instructor && (
                            <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1rem', marginBottom: '0.5rem' }}>
                                <strong>Formador:</strong> {training.instructor}
                            </Typography>
                        )}
                        {training.platform && (
                            <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1rem', marginBottom: '0.5rem' }}>
                                <strong>Plataforma:</strong> {training.platform}
                            </Typography>
                        )}
                        {training.price > 0 && !hasPurchased && (
                            <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1rem', marginBottom: '0.5rem' }}>
                                <strong>Preço:</strong> {Number(training.price).toFixed(2)}€
                            </Typography>
                        )}
                        {hasPurchased && training.meetingId && (
                            <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1rem', marginBottom: '0.5rem' }}>
                                <strong>ID da Reunião:</strong> {training.meetingId}
                            </Typography>
                        )}
                        {hasPurchased && training.meetingPass && (
                            <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1rem', marginBottom: '1rem' }}>
                                <strong>Password:</strong> {training.meetingPass}
                            </Typography>
                        )}
                        {hasPurchased ? (
                             <Button
                             sx={{
                                 backgroundColor: '#65774a',
                                 color: 'white',
                                 '&:active': {
                                     backgroundColor: '#aebb68',
                                 },
                                 '&:hover': {
                                     transform: 'scale(1.03)',
                                     transition: 'transform 0.3s ease',
                                 },
                             }}
                             variant="contained"
                             color="primary"
                             onClick={() => window.open(training.link, '_blank')}
                                disabled={!canAccess}
                         >
                                Aceder à Formação
                            </Button>
                        ) : (
                        <Button
                            sx={{
                                backgroundColor: '#65774a',
                                color: 'white',
                                '&:active': {
                                    backgroundColor: '#aebb68',
                                },
                                '&:hover': {
                                    transform: 'scale(1.03)',
                                    transition: 'transform 0.3s ease',
                                },
                            }}
                            variant="contained"
                            color="primary"
                            onClick={handleBuy}
                        >
                                {training.price === 0 ? 'Registar' : 'Comprar'}
                        </Button>
                        )}
                    </>
                )}
            </Box>
        </Modal>
    )
};

export default TrainingModal;