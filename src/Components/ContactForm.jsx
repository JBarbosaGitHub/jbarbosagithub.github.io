import '../styles/ContactForm.css';

const ContactForm = () => {
    return (
        <div className="contact-container">
            <div className="contact-content contact-info-map">
                <div className="contact-info-box">
                    <h2 className="contact-title">Sobre nós</h2>
                    <div className="contact-info-item">
                        <span className="contact-label">Localização</span>
                        <div className="contact-detail">
                            Rua Dom Nuno Rodrigues, 27<br />
                            2240-351 Ferreira do Zêzere
                        </div>
                    </div>
                    <div className="contact-info-item">
                        <span className="contact-label">Contacto</span>
                        <div className="contact-detail">+351 923 313 183</div>
                    </div>
                    <div className="contact-info-item">
                        <span className="contact-label">Email</span>
                        <div className="contact-detail">academiacontacontando@gmail.com</div>
                    </div>
                    <div className="contact-info-item">
                        <span className="contact-label">Horário de Funcionamento</span>
                        <div className="contact-detail">
                            Segunda a Sexta: 8:30 - 18:00<br />
                            Sábado e Domingo: Fechado
                        </div>
                    </div>
                </div>
                <div className="contact-map-box">
                    <iframe
                        title="mapa"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d406.56932838715113!2d-8.290977176999785!3d39.69464658415932!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd229d5cc65e12c1%3A0x8a24f1e136142300!2sR.%20Dom%20Nuno%20Rodrigues%2C%20Ferreira%20do%20Z%C3%AAzere!5e0!3m2!1spt-PT!2spt!4v1749341243733!5m2!1spt-PT!2spt"
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