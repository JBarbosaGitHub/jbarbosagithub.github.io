import React, { useState, useEffect, useRef } from 'react';
import '../styles/Profile.css';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { auth } from '../firebase';
import { updateProfile, updateEmail, updatePassword } from 'firebase/auth';
import { db } from '../firebase';
import { collection, getDocs, query, where, updateDoc, doc, getDoc } from 'firebase/firestore';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { storage } from '../firebase';
import { ref, uploadString, getDownloadURL, deleteObject } from 'firebase/storage';

// Função utilitária para formatar data ISO para DD/MM/AAAA
function formatarDataParaDDMMAAAA(dataISO) {
    if (!dataISO) return '';
    const [ano, mes, dia] = dataISO.split('-');
    return `${dia}/${mes}/${ano}`;
}

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
    const [nome, setNome] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [idade, setIdade] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [originalEmail, setOriginalEmail] = useState('');

    useEffect(() => {
        if (user) {
            setDisplayName(user.displayName || '');
            setEmail(user.email || '');
            setOriginalEmail(user.email || '');
            setPhotoURL(user.photoURL || '');
            // Buscar dados extra do Firestore
            const fetchUserData = async () => {
                const userDoc = await getDoc(doc(db, 'users', user.uid));
                if (userDoc.exists()) {
                    const data = userDoc.data();
                    setNome(data.nome || '');
                    setDataNascimento(data.dataNascimento || '');
                    setIdade(data.idade || '');
                }
            };
            fetchUserData();
        }
    }, [user]);

    const calcularIdade = (dataNascimento) => {
        const hoje = new Date();
        const nascimento = new Date(dataNascimento);
        let idade = hoje.getFullYear() - nascimento.getFullYear();
        const m = hoje.getMonth() - nascimento.getMonth();
        if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) {
            idade--;
        }
        return idade;
    };

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
                displayName: nome,
                photoURL: finalPhotoURL
            });
            setPhotoURL(finalPhotoURL);
            setNewPhoto(null);
            // Atualizar dados extra no Firestore (NÃO atualizar email aqui)
            if (user) {
                const novaIdade = calcularIdade(dataNascimento);
                await updateDoc(doc(db, 'users', user.uid), {
                    nome,
                    dataNascimento,
                    idade: novaIdade
                });
                setIdade(novaIdade);
            }
            // Repor o email para o valor real do utilizador
            setEmail(originalEmail);
            setMessage('Perfil atualizado com sucesso!');
            setIsEditing(false);
        } catch (err) {
            setError('Erro ao atualizar perfil: ' + err.message);
        }
    };

    const handleEmailChange = async () => {
        setMessage('');
        setError('');
        if (!user) return;
        if (!user.emailVerified) {
            setError('Por favor, verifique o seu email atual antes de tentar alterar para um novo email. Consulte a sua caixa de entrada e clique no link de confirmação.');
            return;
        }
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
            // Enviar email de verificação para o novo email
            const { sendEmailVerification } = await import('firebase/auth');
            await sendEmailVerification(user);
            // Atualizar email no documento do utilizador na coleção 'users'
            await updateDoc(doc(db, 'users', user.uid), { email });
            // Atualizar todas as compras para o novo email
            const purchasesRef = collection(db, 'purchases');
            const q = query(purchasesRef, where('email', '==', oldEmail));
            const querySnapshot = await getDocs(q);
            const updatePromises = querySnapshot.docs.map(docSnap => updateDoc(docSnap.ref, { email }));
            await Promise.all(updatePromises);
            // Limpar campo de password e atualizar campo de email para o novo
            setCurrentPassword('');
            setEmail(email); // Garante que o campo mostra o novo email
            setOriginalEmail(email); // Atualiza o originalEmail para o novo email
            setMessage('Email atualizado! Foi enviado um email de verificação para o novo endereço. Por favor, verifica a tua caixa de entrada e clica no link de confirmação. Todas as tuas compras e perfil foram migrados para o novo email.');
        } catch (err) {
            if (err.code === 'auth/operation-not-allowed' || (err.message && err.message.includes('Please verify the new email'))) {
                setError('Por favor, verifique o novo email na sua caixa de entrada e clique no link de confirmação antes de tentar alterar novamente.');
            } else {
                setError('Erro ao atualizar email: ' + err.message);
            }
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
                                value={nome}
                                onChange={e => setNome(e.target.value)}
                                className="profile-input"
                                disabled={!isEditing}
                            />
                        </div>
                        <div className="profile-field">
                            <label>Data de Nascimento</label>
                            {!isEditing ? (
                                <input
                                    type="text"
                                    value={formatarDataParaDDMMAAAA(dataNascimento)}
                                    className="profile-input"
                                    disabled
                                />
                            ) : (
                                <input
                                    type="date"
                                    value={dataNascimento}
                                    onChange={e => setDataNascimento(e.target.value)}
                                    className="profile-input"
                                    disabled={!isEditing}
                                />
                            )}
                        </div>
                        <div className="profile-field">
                            <label>Idade</label>
                            <input
                                type="text"
                                value={idade}
                                className="profile-input"
                                disabled
                            />
                        </div>
                        <div className="profile-field">
                            <label>Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className="profile-input"
                                disabled={!isEditing}
                            />
                            {/* Só mostra o campo de password se o email foi alterado em modo de edição */}
                            {isEditing && email !== originalEmail && (
                                <input
                                    type="password"
                                    placeholder="Password atual"
                                    value={currentPassword}
                                    onChange={e => setCurrentPassword(e.target.value)}
                                    className="profile-input"
                                    style={{ marginTop: '1rem' }}
                                />
                            )}
                            {/* Só mostra o botão se o email foi alterado e a password está preenchida */}
                            {isEditing && email !== originalEmail && currentPassword && (
                                <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                                    <button type="button" className="profile-btn" onClick={handleEmailChange}>
                                        Alterar Email
                                    </button>
                                </div>
                            )}
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
                        {!isEditing ? (
                            <button type="button" className="profile-btn profile-save-btn" onClick={() => setIsEditing(true)}>
                                Editar
                            </button>
                        ) : (
                            <>
                                <button type="submit" className="profile-btn profile-save-btn">Guardar</button>
                                <button type="button" className="profile-btn profile-cancel-btn" onClick={() => {
                                    setIsEditing(false);
                                    setNome(user.displayName || '');
                                    setEmail(originalEmail);
                                    setCurrentPassword('');
                                    setDataNascimento(dataNascimento);
                                    setOriginalEmail(user.email || '');
                                }}>Cancelar</button>
                            </>
                        )}
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