import React from 'react'
import {Form, Button, Alert} from 'react-bootstrap'
import { useState } from 'react'
import DatePicker from "react-datepicker";
import { connect } from 'react-redux'
import * as firebase from "firebase/app"
import "firebase/auth";
import "firebase/database";
import "firebase/storage"
import Camera from '../../img/camera.png'
import Avatar from '../Atoms/Avatar';



const Profile = ({loggedUser}) => {

   
    
    const [startDate, setStartDate] = useState(new Date());
    const [succes, setSucces] = useState(false);
    const [fail, setfail] = useState(false);

    
    const getForm = async e =>{

        e.preventDefault()
        const newImg = e.target.fileInput.files[0]
        let imagesRef = firebase.storage().ref().child(`/Images/${loggedUser.uid}`)
        
        const date = new Date()
        let month = date.getMonth()+1
        if(month<10){
            month = `0${month}`
        }
        const today = `${month}/${date.getDate()}/${date.getFullYear()}`
        const info = []
        const data = []

        Object.values(e.target).map(element => {
            if(element.value &&  (element.value !== "- Seleccione una opción -" && element.value !==today && element.id!=="fileInput")){
                info.push(element)
            }
        })

        info.map( inputs=> data[inputs.id] = inputs.value )

        const userInfo = {...data}

        if(newImg){
            imagesRef.put(newImg)
        }

        firebase.database().ref(`/Users/${loggedUser.uid}`).update(userInfo)
        .then(() => {
            setSucces(true)
            setTimeout(()=>{
                setSucces(false)
            },3000)
            window.location.reload()
        
        })
        .catch(error=> {
            setfail(error)
            setTimeout(()=>{
                setfail(false)
            },4000)
        })
    }

    return (
        <main className="m-95 lg-50 m-to-center">
                <Alert variant={"success"} className="alert s-main-center" show={succes} >
                    Datos actualizados correctamente
                </Alert>
                <Alert variant={"success"} className="alert s-main-center" show={fail} >
                    {fail}
                </Alert>
            <div className="ed-container s-main-center s-pt-4 s-mb-4">
                <span className="t1">Editar Perfil</span>
            </div>
            <Form onSubmit={e=> getForm(e)}>
                        
                
                    {
                        loggedUser?
                        <div className="avatar-container">
                        <div className="img-circle">
                            <Avatar />
                        </div>
                        <div className="camera">
                            <img src={Camera} alt="camera" />
                        </div>
                        <Form.Group controlId="fileInput" className="file-input">
                            <Form.Control type="file" className="input" title="Actualizar foto de perfil"/>
                        </Form.Group>
                        </div>
                        :
                        <p>cargando</p>
                    }
                    
                
                <div className="ed-grid m-grid-2">
                    <div className="form-item">
                        <Form.Group controlId="name">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control type="text" className="input"/>
                        </Form.Group>
                    </div>
                    <div className="form-item">
                        <Form.Group controlId="lastName">
                            <Form.Label>Apellido</Form.Label>
                            <Form.Control type="text" className="input"  />
                        </Form.Group>
                    </div>
                    <div className="form-item">
                        <Form.Group controlId="city">
                            <Form.Label>Ciudad</Form.Label>
                            <Form.Control type="text" className="input" />
                        </Form.Group>
                    </div>
                    <div className="form-item">
                        <Form.Group controlId="country">
                            <Form.Label>Pais</Form.Label>
                            <Form.Control type="text" className="input" />
                        </Form.Group>
                    </div>
                </div>
                <div className="ed-grid m-grid-3 s-mb-4">
                        <div className="form-item">
                            <Form.Group controlId="gender">
                                <Form.Label>Género</Form.Label>
                                <Form.Control as="select" size="sm" className="input options">
                                    <option>- Seleccione una opción -</option>
                                    <option>Femenino</option>
                                    <option>Masculino</option>
                                    <option>Otro</option>
                                </Form.Control>
                            </Form.Group>
                        </div>
                        <div className="form-item">
                            <Form.Group>
                                <Form.Label>Fecha de nacimiento</Form.Label>
                                <DatePicker
                                selected={startDate}
                                onChange={date => setStartDate(date)}
                                peekNextMonth
                                showMonthDropdown
                                showYearDropdown
                                dropdownMode="select"
                                fixedHeight
                                id="birthDate"
                                />
                            </Form.Group>
                            
                        </div>
                        <div className="form-item">
                            <Form.Group controlId="idNumber">
                                <Form.Label>Numero de identificacion</Form.Label>
                                <Form.Control type="text" className="input"/>
                            </Form.Group>
                        </div>
                    </div>
                <div className="ed-container s-main-end">
                    <Button variant="primary" type="submit">Guardar Cambios</Button>
                </div>
                
            </Form>
        </main>
    )
}

const mapStateToProps = state => ({
    loggedUser: state.userReducer.userLogged
})

export default connect(mapStateToProps, {} )( Profile )
