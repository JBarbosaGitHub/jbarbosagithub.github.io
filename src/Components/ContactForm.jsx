import { motion } from 'framer-motion';
import '../styles/ContactForm.css';

const ContactForm = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 260,
                damping: 20
            }
        }
    };

    return (
        <div className="contact-container">
            <motion.div 
                className="contact-content contact-info-map"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div className="contact-info-box" variants={itemVariants}>
                    <motion.h2 className="contact-title" variants={itemVariants}>Sobre nós</motion.h2>
                    <motion.div className="contact-info-item" variants={itemVariants}>
                        <span className="contact-label">Localização</span>
                        <div className="contact-detail">
                            Rua Dom Nuno Rodrigues, 27<br />
                            2240-351 Ferreira do Zêzere
                        </div>
                    </motion.div>
                    <motion.div className="contact-info-item" variants={itemVariants}>
                        <span className="contact-label">Contacto</span>
                        <div className="contact-detail">+351 923 313 183</div>
                    </motion.div>
                    <motion.div className="contact-info-item" variants={itemVariants}>
                        <span className="contact-label">Email</span>
                        <div className="contact-detail">geral@contacontando.pt</div>
                    </motion.div>
                    <motion.div className="contact-info-item" variants={itemVariants}>
                        <span className="contact-label">Horário de Funcionamento</span>
                        <div className="contact-detail">
                            Segunda a Sexta: 8:30 - 18:00<br />
                            Sábado e Domingo: Fechado
                        </div>
                    </motion.div>
                </motion.div>
                <motion.div className="contact-map-box" variants={itemVariants}>
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
                </motion.div>
            </motion.div>
        </div>
    );
};

export default ContactForm; 