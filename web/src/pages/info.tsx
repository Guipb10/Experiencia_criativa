import React from 'react';
import '../styles/global.css';
import '../styles/info.css';
import { Container, Row, Col } from "react-bootstrap";
import iconFacebook from '../img/icon-facebook.png';
import iconInstagram from '../img/icon-instagram.png';
import iconLinkedin from '../img/icon-linkedin.png';
import imagemInfo from '../img/img-info.png';
import Rodape from './rodape';

function Info() {
    return (
        <div id="page-infos">
            <div className="sec01">
                <Container>
                    <Row className="mb-5 pb-5">
                        <Col lg={6}>
                            <img className="image d-none d-lg-block" alt="logo" src={imagemInfo}/>
                            <h3 className="titulo">Fale com a gente</h3>
                            <p className="number">(41) 99999-9999</p>
                            <h5 className="names">
                                Felipe Nogarolli
                            </h5>
                            <h5 className="names">
                                Guilherme Borges
                            </h5>
                            <h5 className="names">
                                Heloise Bonato
                            </h5>
                            <h5 className="names">
                                Vinicius Joay
                            </h5>
                        </Col>
                        <Col lg={6} className="pt-5">
                            <h3 className="sobre-nos pt-5">Sobre nós</h3>
                            <p className="descricao">
                            Nosso projeto nasce com o objetivo de alertar os cidadãos brasileiros sobre os locais mais perigosos de suas respectivas cidades, 
                            todos nós algum dia já sofremos situações de violência, seja no trânsito ou nas ruas, por um exemplo, não é difícil encontrar pessoas 
                            que sofreram assaltos mas optaram por não recorrer a polícia, seja pela burocracia ou pela falta de esperança de recorrer o bem roubado, 
                            e muitas dessas vezes a vítima segue calada e muitas outras pessoas sofrem assaltos no mesmo local pois os órgãos públicos não tomam conhecimento 
                            dessa local de risco, nós oferecemos uma alternativa menos burocrática para as pessoas que gostariam de reportar estas situações. 
                            </p>
                            <div className="redes d-flex justify-content-end align-items-center px-5">
                                <img className="icon mr-4" src={iconLinkedin} />
                                <img className="icon mr-4" src={iconFacebook} />
                                <img className="icon mr-4" src={iconInstagram} />
                            </div>
                        </Col>
                    </Row>
                </Container>
                <Rodape/>
            </div>
        </div>
    );
}

export default Info;
