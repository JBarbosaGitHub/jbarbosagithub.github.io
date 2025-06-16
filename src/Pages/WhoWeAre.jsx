import Header from '../Components/Header'
import Footer from '../Components/Footer'
import '../styles/WhoWeAre.css'

const WhoWeAre = () => {

    return (
        <>
            <Header />
            <div className="who-we-are-container">
                <section className="who-we-are-hero">
                    <h1>Quem Somos</h1>
                    <p className="subtitle">Conectando pessoas através de histórias</p>
                </section>
                <div className="who-we-are-content">
                    <div className="who-we-are-section">
                        <h2>Sobre a nossa Academia</h2>
                        <div className="who-we-are-info-row">
                            <p>
                                A Academia ContaContando é um projeto educativo inovador com sede em Ferreira do Zêzere, Portugal, focado em promover a literacia financeira e matemática para crianças. Fundada por Miguel Dias e Sónia Sanches, a iniciativa nasce da visão de que ensinar competências financeiras desde tenra idade é essencial para preparar as crianças para os desafios económicos do futuro.
                            </p>
                            <p>
                                A Academia ContaContando pretende transformar a educação local, oferecendo uma abordagem lúdica, interativa e adaptada às necessidades de cada faixa etária. Acreditamos que a educação financeira não é apenas uma ferramenta, mas um pilar fundamental para o desenvolvimento de cidadãos conscientes e autónomos.                            </p>
                        </div>
                    </div>

                    <div className="who-we-are-section">
                        <h2>Missão e Visão</h2>
                        <div className="who-we-are-info-row">
                            <p>
                            A nossa missão é tornar a aprendizagem de conceitos financeiros e matemáticos numa experiência divertida e envolvente, utilizando métodos pedagógicos inovadores como jogos, desafios práticos, simulações e tecnologia. A nossa visão é criar uma comunidade onde crianças e famílias estejam capacitadas para gerir as suas finanças com confiança, promovendo uma cultura de responsabilidade financeira e sustentabilidade. Queremos inspirar as crianças a explorar o mundo dos números e das finanças, abrindo portas para um futuro de sucesso e contributo positivo para a sociedade.                            </p>
                        </div>
                    </div>

                    <div className="who-we-are-section">
                        <h2>Público-Alvo e Faixas Etárias</h2>
                        <div className="who-we-are-info-row">
                            <p>
                                A ContaContando destina-se a crianças dos 5 aos 18 anos, com atividades cuidadosamente estruturadas para diferentes níveis de desenvolvimento. O programa é dividido por ciclos etários, garantindo que os conteúdos são relevantes e acessíveis:
                            </p>
                            <ul>
                                <p><strong>5-7 anos (Pré-escolar e 1º ano):</strong> Workshop interativo onde as crianças aprendem sobre o valor do dinheiro através de atividades lúdicas.</p>
                                <p><strong>7-9 anos (2º e 3º anos do 1º ciclo):</strong> Experiência prática de compras simuladas com foco em cálculos básicos.</p>
                                <p><strong>9-11 anos (4º e 5º anos):</strong> Introdução ao empreendedorismo através de projetos práticos.</p>
                                <p><strong>11-13 anos (6º e 7º anos):</strong> Workshop focado na gestão financeira básica.</p>
                                <p><strong>13-15 anos (8º e 9º anos):</strong> Introdução aos conceitos básicos de investimento.</p>
                                <p><strong>15-18 anos (Ensino Secundário):</strong> Exploração das tecnologias financeiras modernas.</p>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default WhoWeAre;