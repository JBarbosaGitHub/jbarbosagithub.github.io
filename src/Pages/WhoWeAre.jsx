import { motion } from 'framer-motion';
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import PageTransition from '../Components/PageTransition'
import '../styles/WhoWeAre.css'

const WhoWeAre = () => {
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

    const listItemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                type: "spring",
                stiffness: 260,
                damping: 20
            }
        }
    };

    return (
        <>
            <Header />
            <PageTransition>
            <div className="who-we-are-container">
                    <motion.section 
                        className="who-we-are-hero"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <motion.h1
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                        >
                            Quem Somos
                        </motion.h1>
                        <motion.p 
                            className="subtitle"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                        >
                            Conectando pessoas através de histórias
                        </motion.p>
                    </motion.section>

                    <motion.div 
                        className="who-we-are-content"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.div className="who-we-are-section" variants={itemVariants}>
                            <motion.h2 variants={itemVariants}>Sobre a nossa Academia</motion.h2>
                            <motion.div className="who-we-are-info-row" variants={itemVariants}>
                                <motion.p variants={itemVariants}>
                                A Academia ContaContando é um projeto educativo inovador com sede em Ferreira do Zêzere, Portugal, focado em promover a literacia financeira e matemática para crianças. Fundada por Miguel Dias e Sónia Sanches, a iniciativa nasce da visão de que ensinar competências financeiras desde tenra idade é essencial para preparar as crianças para os desafios económicos do futuro.
                                </motion.p>
                                <motion.p variants={itemVariants}>
                                    A Academia ContaContando pretende transformar a educação local, oferecendo uma abordagem lúdica, interativa e adaptada às necessidades de cada faixa etária. Acreditamos que a educação financeira não é apenas uma ferramenta, mas um pilar fundamental para o desenvolvimento de cidadãos conscientes e autónomos.
                                </motion.p>
                            </motion.div>
                        </motion.div>

                        <motion.div className="who-we-are-section" variants={itemVariants}>
                            <motion.h2 variants={itemVariants}>Missão e Visão</motion.h2>
                            <motion.div className="who-we-are-info-row" variants={itemVariants}>
                                <motion.p variants={itemVariants}>
                                    A nossa missão é tornar a aprendizagem de conceitos financeiros e matemáticos numa experiência divertida e envolvente, utilizando métodos pedagógicos inovadores como jogos, desafios práticos, simulações e tecnologia. A nossa visão é criar uma comunidade onde crianças e famílias estejam capacitadas para gerir as suas finanças com confiança, promovendo uma cultura de responsabilidade financeira e sustentabilidade. Queremos inspirar as crianças a explorar o mundo dos números e das finanças, abrindo portas para um futuro de sucesso e contributo positivo para a sociedade.
                                </motion.p>
                            </motion.div>
                        </motion.div>

                        <motion.div className="who-we-are-section" variants={itemVariants}>
                            <motion.h2 variants={itemVariants}>Público-Alvo e Faixas Etárias</motion.h2>
                            <motion.div className="who-we-are-info-row" variants={itemVariants}>
                                <motion.p variants={itemVariants}>
                                A ContaContando destina-se a crianças dos 5 aos 18 anos, com atividades cuidadosamente estruturadas para diferentes níveis de desenvolvimento. O programa é dividido por ciclos etários, garantindo que os conteúdos são relevantes e acessíveis:
                                </motion.p>
                                <motion.ul variants={containerVariants}>
                                    <motion.li variants={listItemVariants}>
                                <p><strong>5-7 anos (Pré-escolar e 1º ano):</strong> Workshop interativo onde as crianças aprendem sobre o valor do dinheiro através de atividades lúdicas.</p>
                                    </motion.li>
                                    <motion.li variants={listItemVariants}>
                                <p><strong>7-9 anos (2º e 3º anos do 1º ciclo):</strong> Experiência prática de compras simuladas com foco em cálculos básicos.</p>
                                    </motion.li>
                                    <motion.li variants={listItemVariants}>
                                <p><strong>9-11 anos (4º e 5º anos):</strong> Introdução ao empreendedorismo através de projetos práticos.</p>
                                    </motion.li>
                                    <motion.li variants={listItemVariants}>
                                <p><strong>11-13 anos (6º e 7º anos):</strong> Workshop focado na gestão financeira básica.</p>
                                    </motion.li>
                                    <motion.li variants={listItemVariants}>
                                <p><strong>13-15 anos (8º e 9º anos):</strong> Introdução aos conceitos básicos de investimento.</p>
                                    </motion.li>
                                    <motion.li variants={listItemVariants}>
                                <p><strong>15-18 anos (Ensino Secundário):</strong> Exploração das tecnologias financeiras modernas.</p>
                                    </motion.li>
                                </motion.ul>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
            </PageTransition>
            <Footer />
        </>
    )
}

export default WhoWeAre;