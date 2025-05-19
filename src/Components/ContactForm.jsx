import './ContactForm.css';

const ContactForm = () => {
    return (
        <div className="contact-container">
            <div className="contact-content contact-info-map">
                <div className="contact-info-box">
                    <h2 className="contact-title">Informações de Contacto</h2>
                    <div className="contact-info-item">
                        <span className="contact-label">Localização</span>
                        <div className="contact-detail">
                            Rua Dr. Roberto Frias<br />
                            4200-465 Porto
                        </div>
                    </div>
                    <div className="contact-info-item">
                        <span className="contact-label">Telefone</span>
                        <div className="contact-detail">+351 912 345 678</div>
                    </div>
                    <div className="contact-info-item">
                        <span className="contact-label">Email</span>
                        <div className="contact-detail">contacontando@example.com</div>
                    </div>
                    <div className="contact-info-item">
                        <span className="contact-label">Horário de Funcionamento</span>
                        <div className="contact-detail">
                            Segunda a Sexta: 9:00 - 18:00<br />
                            Sábado e Domingo: Fechado
                        </div>
                    </div>
                </div>
                <div className="contact-map-box">
                    <iframe
                        title="mapa"
                        src="https://www.google.com/maps?q=Rua+Dr.+Roberto+Frias,+Porto&output=embed"
                        width="100%"
                        height="350"
                        style={{ border: 0, borderRadius: '8px' }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

export default ContactForm; 