import React from 'react';
import '../styles/global.css';
import '../styles/rodape.css';
import { Container, Row, Col, Dropdown } from "react-bootstrap";
import logo from '../img/logo2.jpeg';

function rodape() {
    return (
        <div id="page-home">
            <div className="sec01 py-5">
                <Container>
                    <Row className=" d-flex align-items-center justify-content-between">
                        <Col lg={3}>
                            <a href="sobre-nos">
                                <p className="text mb-2">Sobre a Safe City</p>
                            </a>
                            <a href="sobre-nos">
                                <p className="text mb-2">Siga-nos nas redes</p>
                            </a>
                        </Col>
                        <Col lg={3}> 
                            <a href="/"><img className="logo img-fluid" src={logo} alt="logo" /></a>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>

    );
}

export default rodape;

