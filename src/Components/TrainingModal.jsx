import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { getFirestore, collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const db = getFirestore();
const auth = getAuth();

const TrainingModal = ({ open, onClose, training }) => {
    const [hasPurchased, setHasPurchased] = useState(false);
    const user = auth.currentUser;

    useEffect(() => {
        const checkPurchases = async () => {
            if(!user) return;
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

    const handleBuy = async () => {
        if (!user || !user.email) {
            alert('You must be logged in to purchase.');
            return;
        }

        // Lógica para formações gratuitas
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
                alert('Inscrição na formação gratuita realizada com sucesso!');
                onClose(); // Fechar o modal
                // Redirecionar para a página de formações após a "compra" gratuita
                window.location.href = `http://www.contacontando.pt/#/formacoes`;
            } catch (error) {
                console.error('Error registering for free course:', error);
                alert('Não foi possível inscrever-se na formação gratuita. Por favor, tente novamente.');
            }
            return; // Interromper o fluxo para SumUp
        }

        const courseData = {
            courseId: training.id,
            amount: training.price,
            currency: 'EUR',
            description: training.title,
            successUrl: `http://www.contacontando.pt/#/formacoes`,
            cancelUrl: `http://www.contacontando.pt/#/formacoes`,
            buyerEmail: user.email, // Use the logged-in user's email
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
                // Redirect to SumUp hosted checkout
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
                        {training.age && (
                            <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1rem', marginBottom: '1rem' }}>
                                <strong>Idade:</strong> {training.age}
                            </Typography>
                        )}
                        {training.duration && (
                            <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1rem', marginBottom: '1rem' }}>
                                <strong>Duração:</strong> {training.duration}
                            </Typography>
                        )}
                        {training.instructor && (
                            <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1rem', marginBottom: '1rem' }}>
                                <strong>Formador:</strong> {training.instructor}
                            </Typography>
                        )}
                        {training.platform && (
                            <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1rem', marginBottom: '1rem' }}>
                                <strong>Plataforma:</strong> {training.platform}
                            </Typography>
                        )}
                        {training.price && !hasPurchased && (
                            <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1rem', marginBottom: '1rem' }}>
                                <strong>Preço:</strong> {training.price}€
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
                         >
                                Acessar Formação
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
                            Comprar
                        </Button>
                        )}
                    </>
                )}
            </Box>
        </Modal>
    )
};

export default TrainingModal;