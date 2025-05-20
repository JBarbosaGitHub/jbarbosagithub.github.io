import Header from '../Components/Header'
import Footer from '../Components/Footer'
import './WhatWeDo.css'

const WhatWeDo = () => {

    return (
        <>
            <Header />
            <div className="what-we-do-container">
                <section className="what-we-do-hero">
                    <h1>O que fazemos</h1>
                    <p className="subtitle">Conectando pessoas através de histórias</p>
                </section>

                <div className="what-we-do-content">
                    <div className="what-we-do-section">
                        <h2>Nossa História</h2>
                        <div className="what-we-do-info-row">
                            <p>
                                O ContaContando nasceu da paixão por contar histórias e conectar pessoas. Somos uma empresa dedicada a criar experiências únicas através da narração de histórias que inspiram, educam e entretêm.
                            </p>
                            <p>
                                Fundada em 2020, nossa equipe reúne profissionais de educação, artes e literatura para transformar vidas por meio da arte de contar histórias.
                            </p>
                        </div>
                    </div>

                    <div className="what-we-do-section">
                        <h2>Nossa Missão</h2>
                        <div className="what-we-do-info-row">
                            <p>
                                Buscamos transformar a maneira como as histórias são contadas e compartilhadas, criando um impacto positivo na vida das pessoas e contribuindo para uma sociedade mais conectada e empática.
                            </p>
                            <p>
                                Acreditamos que cada história tem o poder de transformar vidas e fortalecer laços.
                            </p>
                        </div>
                    </div>

                    <div className="what-we-do-section">
                        <h2>O Que Fazemos</h2>
                        <div className="what-we-do-info-row">
                            <p>
                                Desenvolvemos projetos personalizados de contação de histórias para escolas, empresas e eventos especiais.
                            </p>
                            <p>
                                Nossas histórias são cuidadosamente selecionadas e adaptadas para cada público, garantindo uma experiência memorável e significativa.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default WhatWeDo;