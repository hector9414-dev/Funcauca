import React, { createRef } from 'react'
import { Form, Button, Toast, Spinner } from 'react-bootstrap'
import * as firebase from "firebase/app"
import avatar from "../../img/avatar.png"
import "firebase/auth";
import "firebase/database";
import { useState } from 'react';



const Register = () => {

    const userEmail = createRef()
    const userPassword = createRef()
    const userName = createRef()
    const [regToast, showregToast] = useState(false)    
    const [toastMessage, setToastMessage] = useState(false)    
    const [toastTitle, setToastTitle] = useState(false)    
    const [asyncResponse, setasyncResponse] = useState()    
    

    const handleRegister = async (e,name, email, password) =>{
        e.preventDefault()
        const userReg = {
            name,
            email,
            rol: "user",
            img: avatar
        }
        setasyncResponse(true)
        if(!name){
            setToastTitle("Oops, algo sucedió")
            setToastMessage("Tu nombre es requerido")
            showregToast(true)
            return
        }

        const response = await firebase.auth().createUserWithEmailAndPassword(email, password).catch(error => {
            setasyncResponse(false)
            setToastTitle("Oops, ha ocurrido un error")
            switch(error.code){
                case "auth/email-already-in-use":
                    setToastMessage("El correo electrónico proporcionado ya está en uso por un usuario existente")
                    break;
                default:
                    setToastMessage(error.message)
            }
          })
       
          if(response){
                firebase.database().ref(`/Users/${response.user.uid}`).set(userReg)
                setToastTitle("Registrado Exitosamente")
                setToastMessage("Hemos enviado un correo electronico, con un link para verificar tu cuenta")
                const user = response.user
                // const config = {
                //     url: "http://localhost:3000",
                // }
                await user.updateProfile({
                    displayName : name
                })
                // await user.sendEmailVerification(config) funciona ok, comentado mientras desarrollo
                await user.getIdToken()
                await firebase.auth().signOut()
                setasyncResponse(false)
          }

          showregToast(true)

    }



   

    return (
        <Form className="s-mb-1">
        <Form.Group controlId="formBasicUserInfo">
            <Form.Label className="t4">Nombre</Form.Label>
            <Form.Control required type="text" placeholder="Ingresa tu nombre" ref={userName} />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
            <Form.Label className="t4">Correo Electronico</Form.Label>
            <Form.Control required type="email" placeholder="Ingresa tu correo" ref={userEmail} />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
            <Form.Label className="t4">Contraseña</Form.Label>
            <Form.Control required type="password" placeholder="Ingresa una contraseña" ref={userPassword}/>
        </Form.Group>
        <div>
        
        {
            asyncResponse ? 
            <Spinner animation="grow" variant="success" />
            :
            <Button variant="primary" type="submit" 
            onClick={ e => {handleRegister(e, userName.current.value, userEmail.current.value, userPassword.current.value) 
            }}>
            Registrar
            </Button>
            
        }
        
        <Toast show={regToast} onClose={()=> showregToast(false)} className="error" delay={4000} autohide>
            <Toast.Header>
                <strong className="mr-auto">{toastTitle}</strong>
            </Toast.Header>
            <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
        </div>
        </Form>
    )
}

export default Register
