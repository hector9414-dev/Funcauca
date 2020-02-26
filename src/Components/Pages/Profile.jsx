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
        let imagesRef = firebase.storage().ref().child(`/Images/${loggedUser.uid}`)
        e.preventDefault()
        const newImg = e.target.fileInput.files[0]
        const userInfo={
            name: e.target.userName.value,
            lastName: e.target.userLastName.value,
            city: e.target.userCity.value,
            country: e.target.userCountry.value,
            gender: e.target.userGender.value,
            birthDate: startDate,
            idNumber: e.target.userId.value,
            
        }

        imagesRef.put(newImg)
        firebase.database().ref(`/Users/${loggedUser.uid}`).update(userInfo)
        .then(() => {
            setSucces(true)
            setTimeout(()=>{
                setSucces(false)
            },3000)
        
        })
        .catch(error=> {
            setfail(error)
            setTimeout(()=>{
                setfail(false)
            },4000)
        })

        const response = await firebase.storage().refFromURL(`gs://funcaucaedu-eb0cf.appspot.com/Images/${loggedUser}`)
        console.log(response)
        
    }

    return (
        <div className="m-95 lg-50 m-to-center">
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
                    <Form.Group controlId="userName">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control type="text" className="input"/>
                    </Form.Group>
                </div>
                <div className="form-item">
                    <Form.Group controlId="userLastName">
                        <Form.Label>Apellido</Form.Label>
                        <Form.Control type="text" className="input"  />
                    </Form.Group>
                </div>
                <div className="form-item">
                    <Form.Group controlId="userCity">
                        <Form.Label>Ciudad</Form.Label>
                        <Form.Control type="text" className="input" />
                    </Form.Group>
                </div>
                <div className="form-item">
                     <Form.Group controlId="userCountry">
                        <Form.Label>Pais</Form.Label>
                        <Form.Control type="text" className="input" />
                    </Form.Group>
                </div>
            </div>
            <div className="ed-grid m-grid-3 s-mb-4">
                    <div className="form-item">
                        <Form.Group controlId="userGender">
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
                        <Form.Group controlId="userId">
                            <Form.Label>Fecha de nacimiento</Form.Label>
                            <DatePicker
                            selected={startDate}
                            onChange={date => setStartDate(date)}
                            peekNextMonth
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            fixedHeight
                            />
                        </Form.Group>
                        
                    </div>
                    <div className="form-item">
                        <Form.Group controlId="userId">
                            <Form.Label>Numero de identificacion</Form.Label>
                            <Form.Control type="text" className="input"/>
                        </Form.Group>
                    </div>
                </div>
            <div className="ed-container s-main-end">
                <Button variant="primary" type="submit">Guardar Cambios</Button>
            </div>
            
        </Form>
        </div>
    )
}

const mapStateToProps = state => ({
    loggedUser: state.userReducer.userLogged
})

export default connect(mapStateToProps, {} )( Profile )
