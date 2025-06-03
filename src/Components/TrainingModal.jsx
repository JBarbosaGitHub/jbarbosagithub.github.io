import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
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

    const stripePromise = loadStripe('pk_test_51RTnkPGhaBptfacfMqv4niRWglthVZCNklXm4TSrCRxq5FAPdXYgXleUAu5KMglv24ff6znSfLIgiGlIBIPlq9nN00Q81fHW52')

    const handleBuy = async () => {
        const stripe = await stripePromise;

        const response = await fetch('/api/create-checkout-session.js', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                courseId: training.id, // Only send the ID!
                successUrl: window.location.origin + '/#/success',
                cancelUrl: window.location.origin + '/#/cancel',
            }),
        });

        const data = await response.json();
        console.log('Stripe session response:', data);

        const result = await stripe.redirectToCheckout({ sessionId: data.id });

        if (result.error) {
            alert(result.error.message);
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
                            <img src={training.imageUrl} alt={training.title} style={{ width: '100%', height: 'auto', marginBottom: '1rem' }} />
                            <Typography variant="h6" component="h2" sx={{ fontWeight: 700, fontSize: '1.4rem', marginBottom: '1rem', color: 'black' }}>
                                {training.title}
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1rem', marginBottom: '1rem' }}>
                                {training.description}
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1rem', marginBottom: '1rem' }}>
                                Data:{training.data}
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1rem', marginBottom: '1rem' }}>
                                Professor: {training.instructor}
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1rem', marginBottom: '1rem' }}>
                                Plataforma: {training.platform}
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1rem', marginBottom: '1rem' }}>
                                Preço: {training.price}€
                            </Typography>
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
    }

    export default TrainingModal;