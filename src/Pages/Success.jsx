import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Success_Cancel.css';

const Success = () => {
    const navigate = useNavigate();
    const [seconds, setSeconds] = useState(5);

    useEffect(() => {   
        const interval = setInterval(() => {
            setSeconds((prev) => prev - 1);
        }, 1000);

        const timeout = setTimeout(() => {
            navigate('/formacoes');
        }, 5000);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, [navigate]);

    return (
        <div className="container">
            <h1 style={{textAlign: 'center', marginTop: '100px', color: 'black'}}>Compra realizada com sucesso</h1>
            <p style={{textAlign: 'center', color: 'black'}}>
                Você será redirecionado em {seconds} segundo{seconds !== 1 ? 's' : ''}...
            </p>
        </div>
    )
}

export default Success;