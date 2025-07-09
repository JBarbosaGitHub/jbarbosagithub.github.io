import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Login.css';
import logo from '../assets/logo-removebg.png';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { db } from '../firebase';
import { addDoc, collection, setDoc, doc } from 'firebase/firestore';
import validator from 'validator';


const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [name, setName] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const navigate = useNavigate();

    const validateEmail = (email) => {
        return validator.isEmail(email);
    };

    const validatePassword = (password) => {
        return validator.isStrongPassword(password);
    };

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!name.trim()) {
            setError('Insira o seu nome.');
            return;
        }
        if (!dataNascimento) {
            setError('Insira a sua data de nascimento.');
            return;
        }
        if (!validateEmail(email)) {
            setError('Insira um email válido.');
            return;
        }
        if (!validatePassword(password)) {
            setError('A senha deve conter pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caractere especial.');
            return;
        }
        if (password !== confirmPassword) {
            setError('As senhas não coincidem.');
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            setSuccess('Registo realizado com sucesso! A redirecionar para o login...');

            // Guardar dados extra no Firestore
            const idade = calcularIdade(dataNascimento);
            await setDoc(doc(db, 'users', userCredential.user.uid), {
                nome: name,
                dataNascimento,
                idade,
                email
            });

            // Send welcome email
            try {
                await addDoc(collection(db, 'mail'), {
                    to: email,
                    message: {
                        subject: 'Bem-vindo à ContaContando!',
                        html: '<p>Olá!</p><p>Bem-vindo à ContaContando! Estamos muito felizes por tê-lo(a) a bordo. Explore os nossos conteúdos e aproveite ao máximo a sua experiência.</p><p>Com os melhores cumprimentos,<br>A Equipa ContaContando</p>',
                    },
                });
            } catch (emailError) {
                console.error('Error queuing welcome email (outer catch):', emailError);
                setError('Não foi possível enviar o email de boas-vindas. Por favor, tente novamente mais tarde ou contacte o suporte.');
            }
            
            setTimeout(() => navigate('/login'), 1500);
        } catch (err) {
            if (err.code === 'auth/email-already-in-use') {
                setError('Este email já está registado.');
            } else {
                setError(err.message);
            }
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
                <h2>Registar</h2>
                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">{success}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Nome:</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="dataNascimento">Data de Nascimento:</label>
                        <input
                            type="date"
                            id="dataNascimento"
                            value={dataNascimento}
                            onChange={(e) => setDataNascimento(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Senha:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirmar senha:</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="login-button">Registar</button>
                </form>
                <p className="register-link">
                    Já tem uma conta? <Link style={{color: '#f4cc6b'}} to="/login">Login aqui</Link>
                </p>
            </div>
        </div>
    );
};

export default Register; 