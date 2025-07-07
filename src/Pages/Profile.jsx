import React, { useState, useEffect, useRef } from 'react';
import '../styles/Profile.css';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { auth } from '../firebase';
import { updateProfile, updateEmail, updatePassword } from 'firebase/auth';
import { db } from '../firebase';
import { collection, getDocs, query, where, updateDoc } from 'firebase/firestore';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { storage } from '../firebase';
import { ref, uploadString, getDownloadURL, deleteObject } from 'firebase/storage';

const Profile = () => {
    const user = auth.currentUser;
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [photoURL, setPhotoURL] = useState('');
    const [newPhoto, setNewPhoto] = useState(null);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const fileInputRef = useRef();
    const [currentPassword, setCurrentPassword] = useState('');
    const [currentPasswordForPassword, setCurrentPasswordForPassword] = useState('');

    useEffect(() => {
        if (user) {
            setDisplayName(user.displayName || '');
            setEmail(user.email || '');
            setPhotoURL(user.photoURL || '');
        }
    }, [user]);

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewPhoto(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        try {
            let finalPhotoURL = photoURL;
            // Se houver nova foto, faz upload para o Storage
            if (newPhoto) {
                // Apagar foto antiga se for do Storage
                if (photoURL && photoURL.includes('firebasestorage.googleapis.com')) {
                    try {
                        const oldRef = ref(storage, photoURL);
                        await deleteObject(oldRef);
                    } catch (err) {
                        // Se não conseguir apagar, ignora (pode ser foto default ou já apagada)
                    }
                }
                // Upload da nova foto
                const storageRef = ref(storage, `profile_photos/${user.uid}_${Date.now()}`);
                await uploadString(storageRef, newPhoto, 'data_url');
                finalPhotoURL = await getDownloadURL(storageRef);
            }
            // Atualizar nome e foto
            await updateProfile(user, {
                displayName,
                photoURL: finalPhotoURL
            });
            setPhotoURL(finalPhotoURL);
            setNewPhoto(null);
            setMessage('Perfil atualizado com sucesso!');
        } catch (err) {
            setError('Erro ao atualizar perfil: ' + err.message);
        }
    };

    const handleEmailChange = async () => {
        setMessage('');
        setError('');
        if (!user) return;
        if (!currentPassword) {
            setError('Por favor, insira a sua password atual para alterar o email.');
            return;
        }
        const oldEmail = user.email;
        try {
            // Reautenticar utilizador
            const { EmailAuthProvider, reauthenticateWithCredential } = await import('firebase/auth');
            const credential = EmailAuthProvider.credential(oldEmail, currentPassword);
            await reauthenticateWithCredential(user, credential);
            // Prosseguir com alteração de email
            await updateEmail(user, email);
            // Atualizar todas as compras para o novo email
            const purchasesRef = collection(db, 'purchases');
            const q = query(purchasesRef, where('email', '==', oldEmail));
            const querySnapshot = await getDocs(q);
            const updatePromises = querySnapshot.docs.map(docSnap => updateDoc(docSnap.ref, { email }));
            await Promise.all(updatePromises);
            setMessage('Email atualizado! Verifique a sua caixa de entrada para confirmar. Todas as suas compras foram migradas para o novo email.');
            setCurrentPassword('');
        } catch (err) {
            setError('Erro ao atualizar email: ' + err.message);
        }
    };

    const handlePasswordChange = async () => {
        setMessage('');
        setError('');
        if (!user) return;
        if (!currentPasswordForPassword) {
            setError('Por favor, insira a sua password atual para alterar a password.');
            return;
        }
        if (!newPassword || !confirmPassword) {
            setError('Preencha ambos os campos de password.');
            return;
        }
        if (newPassword !== confirmPassword) {
            setError('As passwords não coincidem.');
            return;
        }
        try {
            // Reautenticar utilizador
            const { EmailAuthProvider, reauthenticateWithCredential } = await import('firebase/auth');
            const credential = EmailAuthProvider.credential(user.email, currentPasswordForPassword);
            await reauthenticateWithCredential(user, credential);
            // Prosseguir com alteração de password
            await updatePassword(user, newPassword);
            setMessage('Password alterada com sucesso!');
            setNewPassword('');
            setConfirmPassword('');
            setCurrentPasswordForPassword('');
        } catch (err) {
            setError('Erro ao alterar password: ' + err.message);
        }
    };

    return (
        <>
            <Header />
            <div className="profile-container">
                <div className="profile-bg-fixed"></div>
                <div className="profile-page">
                    <h2>Perfil do Aluno</h2>
                    <form className="profile-form" onSubmit={handleSave}>
                        <div className="profile-avatar-section">
                            <label htmlFor="photo-upload" className="profile-avatar-label">
                                {newPhoto ? (
                                    <img src={newPhoto} alt="avatar" className="profile-avatar-img" />
                                ) : photoURL ? (
                                    <img src={photoURL} alt="avatar" className="profile-avatar-img" />
                                ) : (
                                    <div className="profile-avatar-placeholder">
                                        <AccountCircleIcon style={{ fontSize: 60, color: '#8cb4bc' }} />
                                    </div>
                                )}
                                <input
                                    id="photo-upload"
                                    type="file"
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    onChange={handlePhotoChange}
                                    ref={fileInputRef}
                                />
                            </label>
                            <button type="button" className="profile-btn" onClick={() => fileInputRef.current.click()}>
                                Alterar Foto
                            </button>
                        </div>
                        <div className="profile-field">
                            <label>Nome</label>
                            <input
                                type="text"
                                value={displayName}
                                onChange={e => setDisplayName(e.target.value)}
                                className="profile-input"
                            />
                        </div>
                        <div className="profile-field">
                            <label>Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className="profile-input"
                            />
                            <input
                                type="password"
                                placeholder="Password atual"
                                value={currentPassword}
                                onChange={e => setCurrentPassword(e.target.value)}
                                className="profile-input"
                                style={{ marginTop: '1rem' }}
                            />
                            <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                                <button type="button" className="profile-btn" onClick={handleEmailChange}>
                                    Alterar Email
                                </button>
                            </div>
                        </div>
                        <div className="profile-password-section">
                            <div className="profile-field">
                                <input
                                    type="password"
                                    placeholder="Password atual"
                                    value={currentPasswordForPassword}
                                    onChange={e => setCurrentPasswordForPassword(e.target.value)}
                                    className="profile-input"
                                />
                                <input
                                    type="password"
                                    placeholder="Nova password"
                                    value={newPassword}
                                    onChange={e => setNewPassword(e.target.value)}
                                    className="profile-input"
                                    style={{ marginTop: '1rem' }}
                                />
                                <input
                                    type="password"
                                    placeholder="Confirmar nova password"
                                    value={confirmPassword}
                                    onChange={e => setConfirmPassword(e.target.value)}
                                    className="profile-input"
                                    style={{ marginTop: '1rem' }}
                                />
                                <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                                    <button className="profile-btn" type="button" onClick={handlePasswordChange} style={{ marginTop: '1.2rem' }}>
                                        Alterar Password
                                    </button>
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="profile-btn profile-save-btn">
                            Guardar Alterações
                        </button>
                    </form>
                    {message && <div className="profile-success">{message}</div>}
                    {error && <div className="profile-error">{error}</div>}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Profile; 