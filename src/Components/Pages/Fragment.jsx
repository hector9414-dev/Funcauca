import React from 'react'
import Vimeo from '@u-wave/react-vimeo';
import { Accordion, Card } from 'react-bootstrap'


const Fragment = () => {
    return (
        <div className="page-body s-pt-4">
        <div className="ed-grid class-grid lg-grid-6 s-pt-2">
            <div className="lg-cols-4">
                <Vimeo
                video="86417015"
                responsive
                />
            <div className="video-info">
                <p className="t2 s-pt-2 s-mb-1">1.1 - Introduccion</p>
                <p className="t4">AIEPI para la comunidad</p>
            </div>
            </div>
            <div className="lg-cols-2 class-container">
                <Accordion defaultActiveKey="0" >
                <Card className="class-card">
                    <Accordion.Toggle as={Card.Header} 
                    eventKey="0"
                    className="t3"
                    >
                    Modulo 1
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                    <Card.Body>
                        <ul class="class-list">
                            <li> 1.1 Introduccion</li>
                            <li> 1.2 Que es AIEPI ?</li>
                            <li> 1.3 Beneficios</li>
                            <li> 1.4 Etapas</li>
                            <li> 1.5 Examén</li>
                        </ul>
                    </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card className="class-card">
                    <Accordion.Toggle as={Card.Header} eventKey="1" className="t3">
                    Modulo 2
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="1">
                    <Card.Body>
                        <ul class="class-list">
                            <li> 1.1 Introduccion</li>
                            <li> 1.2 Que es AIEPI ?</li>
                            <li> 1.3 Beneficios</li>
                            <li> 1.4 Etapas</li>
                            <li> 1.5 Examén</li>
                        </ul>
                    </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card className="class-card">
                    <Accordion.Toggle as={Card.Header} eventKey="2" className="t3">
                    Modulo 3
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="2">
                    <Card.Body>
                        <ul class="class-list">
                            <li> 1.1 Introduccion</li>
                            <li> 1.2 Que es AIEPI ?</li>
                            <li> 1.3 Beneficios</li>
                            <li> 1.4 Etapas</li>
                            <li> 1.5 Examén</li>
                        </ul>
                    </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card className="class-card">
                    <Accordion.Toggle as={Card.Header} eventKey="3" className="t3">
                    Modulo 4
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="3">
                    <Card.Body>
                        <ul class="class-list">
                            <li> 1.1 Introduccion</li>
                            <li> 1.2 Que es AIEPI ?</li>
                            <li> 1.3 Beneficios</li>
                            <li> 1.4 Etapas</li>
                            <li> 1.5 Examén</li>
                        </ul>
                    </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card className="class-card">
                    <Accordion.Toggle as={Card.Header} eventKey="4" className="t3">
                    Modulo 5
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="4">
                    <Card.Body>
                        <ul class="class-list">
                            <li> 1.1 Introduccion</li>
                            <li> 1.2 Que es AIEPI ?</li>
                            <li> 1.3 Beneficios</li>
                            <li> 1.4 Etapas</li>
                            <li> 1.5 Examén</li>
                        </ul>
                    </Card.Body>
                    </Accordion.Collapse>
                </Card>
                </Accordion>
            </div>
        </div>
        </div>
    )
}

export default Fragment
