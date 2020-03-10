import React, { createRef } from 'react'
import { Form, Button, Toast, Spinner } from 'react-bootstrap'
import * as firebase from "firebase/app"
import "firebase/auth";
import "firebase/database";
import { useState } from 'react';


const AdminLogin = () => {
    localStorage.clear()
    const email = createRef()
    const password = createRef()
    const [toast, showToast] = useState(false)    
    const [toastMessage, setToastMessage] = useState(false)    
    const [toastTitle, setToastTitle] = useState(false) 
    const [asyncResponse, setasyncResponse] = useState() 

    const login = async e =>{
        
        e.preventDefault()
        setasyncResponse(true)
         firebase.auth().signInWithEmailAndPassword(email.current.value, password.current.value).catch(error => {
            firebase.auth().signOut()
            setasyncResponse(false)
            setToastTitle("Oops, error")
            setToastMessage(error.message)
            showToast(true)
          })
          .then( user =>{
           const {uid,email,displayName} = user.user
           

           const userInfo={
               displayName,
               email,
               uid
           }

           localStorage.setItem("admin",userInfo)

           firebase.database().ref(`/Users/${uid}/rol`).once("value")
           .then( rol =>{
               if(rol.val()==="admin"){
                   setasyncResponse(false)
                   window.location.assign("/adminDashboard")
               }
               else{
                   firebase.auth().signOut()
                   localStorage.clear()
                   window.location.assign("/")
                   
               }
           })
           
          })
    }

    

    return (
        <main className="m-30 s-to-center s-pt-4">
        <h1 className="center">Modulo Administrativo</h1>
        <Form className="s-mb-1">
        <Form.Group controlId="formBasicEmail">
            <Form.Label className="t4">Correo Electronico</Form.Label>
            <Form.Control required type="email" placeholder="Ingresa tu correo" autoComplete="email" ref={email} />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
            <Form.Label className="t4">Contraseña</Form.Label>
            <Form.Control required type="password" placeholder="Ingresa una contraseña" autoComplete="current-password" ref={password}/>
        </Form.Group>
        <div>
        {
            asyncResponse ? 
            <Spinner animation="grow" variant="success" />
            :
            
            <Button variant="primary" type="submit" onClick={ e => {login(e)} }>
                Ingresar
            </Button>

        }
        <Toast show={toast} onClose={()=> showToast(false)} className="error" delay={4000} autohide>
            <Toast.Header>
                <strong className="mr-auto">{toastTitle}</strong>
            </Toast.Header>
            <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
        </div>
        </Form>
        
        </main>

    )
}

export default AdminLogin
