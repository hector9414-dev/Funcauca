import React from 'react'
import { Form, Button } from 'react-bootstrap'


const Login = () => {
    return (
        <Form className="s-mb-0"> 
        <Form.Group controlId="formBasicEmail">
            <Form.Label>Correo Electronico</Form.Label>
            <Form.Control type="email" placeholder="Ingresa tu correo" />
        </Form.Group>
        <Form.Group controlId="formBasicPassword" >
            <Form.Label>Contraseña</Form.Label>
            <Form.Control type="password" placeholder="Ingresa tu contraseña" className="s-mb-3 s-pr-0" />
        </Form.Group>
        <div className="menu-ed-grid ed-grid">
            <Button variant="primary" type="submit">
                Ingresar
            </Button>
            <div className="s-mr-2 small s-main-end s-cross-end" >Aun si cuenta, registrate</div>
        </div>
        </Form>
    )
}

export default Login
