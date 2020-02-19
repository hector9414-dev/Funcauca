import React from 'react'
import { Form, Button } from 'react-bootstrap'

const Register = () => {
    return (
        <Form>
        <Form.Group controlId="formBasicEmail">
            <Form.Label>Correo Electronico</Form.Label>
            <Form.Control type="email" placeholder="Ingresa tu correo" />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control type="password" placeholder="Ingresa una contraseña" />
        </Form.Group>
        <Button variant="primary" type="submit">
            Registrar
        </Button>
        </Form>
    )
}

export default Register
