import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Login.css';
import logo from '../assets/logo-removebg.png';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';

const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        if (!email) {
            setError('Insira o seu email.');
            return;
        }
        try {
            await sendPasswordResetEmail(auth, email);
            setSuccess('Email de recuperação enviado! Verifique a sua caixa de entrada.');
        } catch (err) {
            setError('Erro ao enviar email de recuperação: ' + err.message);
        }
    };

    return (
        <div className="login-container">
            <img
                src={logo}
                alt="Site Logo"
                className="login-logo"
                onClick={() => navigate('/')}
            />
            <div className="login-box">
                <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#65774a' }}>Recuperar Password</h2>
                {error && <div className="error-message" style={{ textAlign: 'center', marginBottom: '1rem' }}>{error}</div>}
                {success && <div className="success-message" style={{ textAlign: 'center', marginBottom: '1rem' }}>{success}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                        <label htmlFor="email" style={{ fontWeight: 600, color: '#333', marginBottom: '0.5rem', display: 'block' }}>Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{ padding: '0.8rem', borderRadius: '6px', border: '1px solid #ccc', width: '100%' }}
                        />
                    </div>
                    <button type="submit" className="login-button" style={{ width: '100%', padding: '0.9rem', fontWeight: 600, background: '#65774a', color: 'white', borderRadius: '6px', fontSize: '1.1rem', marginBottom: '1rem' }}>Enviar Email de Recuperação</button>
                </form>
                <p className="register-link" style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                    Lembrou-se da password? <Link style={{color: '#f4cc6b', fontWeight: 600}} to="/login">Login aqui</Link>
                </p>
            </div>
        </div>
    );
};

export default ResetPassword; 