import React, { createRef, useState } from 'react'
import Logo from '../Atoms/Logo'
import { NavLink, Link } from 'react-router-dom'
import { Button, Modal } from 'react-bootstrap'
import Register from '../Pages/Register'
import Login from '../Pages/Login'
import * as firebase from 'firebase/app'
import { connect } from 'react-redux'
import { removeLoggedUser, getCourses } from '../../Redux/actionCreator';
import { useEffect } from 'react'
import store from '../../Redux/store'
import Avatar from '../Atoms/Avatar'


store.dispatch( getCourses() )

const Header = ({loggedUser, removeloggeduser}) => {


    const [showRegister, setShowRegister] = useState(false)
    const [showLogin, setShowLogin] = useState(false)
    const [modal, setModal] = useState()
    
    const [regOk, showregisteredOk] = useState(false)
    const [currentUser, setCurrentUser] = useState(false)
    const menu = createRef()

   
    

    const handleOpenReg = () =>{
        setShowRegister(true) 
        setModal("reg")
    }
    const handleCloseReg = () =>{
        setShowRegister(false)
        showregisteredOk(false)
    }
    const handleOpenLogin = ()=>{setShowLogin(true)}
    const handleCloseLogin = ()=>{setShowLogin(false)}
    
    const toggle = ()=>{menu.current.classList.toggle("show")}

    const logOut = async () =>{
        firebase.auth().signOut()
        removeloggeduser()
        setCurrentUser(false)
        localStorage.clear()
    }

   useEffect(()=>{
       if(loggedUser){
           handleCloseLogin();
            
       }
   },[loggedUser])
    
    

    return (
        <>
        <header className="main-header ">
            <nav className="main-header__menu ed-grid gap-2 s-cross-center">
                <Logo />
                <div className="main-menu" ref={menu}>
                    <ul className="main-menu-content menu-ed-grid ed-grid lg-cross-center">
                        <div className="menu-items">
                            <ul>
                                <li className="list-item normal">
                                    <NavLink to="/" exact >Inicio</NavLink>
                                </li>
                                <li className="list-item normal">
                                    <NavLink to="/cursos">Cursos</NavLink>
                                </li>
                                <li className="list-item normal">
                                    <NavLink to="/conocenos">Conocenos</NavLink>
                                </li>
                            </ul>
                        </div>
                        <div className="menu-login lg-main-end">
                            <ul className="lg-cross-center">
                                {
                                    loggedUser ?
                                    <div className="menu-ed-grid ed-grid lg-cross-center logged-menu">
                                        <div className="user-info"> 
                                            <Link to="/dashboard">
                                            <span className="t5 s-mr-1">{loggedUser.name}</span>  
                                            <Avatar />
                                            </Link>
                                        </div>
                                        <Button onClick={()=>logOut()} className="small ghost logout-button">Salir</Button>
                                    </div>
                                    :
                                    

                                    <>
                                    <li className="s-mb-2">
                                        <div className="lg-mr-2 normal div-link" onClick={() => handleOpenLogin()} >Ingresar</div>
                                    </li>
                                    <li>
                                        <Button 
                                            variant="success" 
                                            size="sm" 
                                            className="s-px-1 s-py-1"
                                            onClick={() => {handleOpenReg() 
                                            handleCloseLogin()}}>
                                            Registrar
                                        </Button>
                                    </li> 
                                    </>
                                }
                                
                                
                            </ul>
                        </div>
                    </ul>
                </div>
                <div className="toggle-container">
                {/* FUNCIONALIDAD EN PRUEBAS
                
                {  
                loggedUser?
                <span className="logged-toggle to-l" onClick={()=>toggle()}>
                    
                        {['left'].map(placement => (
                            <OverlayTrigger
                            key={placement}
                            placement={placement}
                            overlay={
                                <Tooltip id={`tooltip-${placement}`}
                                className="logged-tooltip">
                                {loggedUser.name}
                                </Tooltip>
                            }
                            >
                            <img src={loggedUser.img} alt="avatar" />
                            </OverlayTrigger>
                        ))}
                </span>
                :null
                } */}
                <span className="menu-toggle to-l" onClick={()=>toggle()}></span>
                </div>
            </nav>
        </header>
        
        <Modal 
            show={showLogin} 
            onHide={handleCloseLogin}
            dialogClassName="modal-90w">
            <Modal.Header closeButton>
                Iniciar Sesión
            </Modal.Header>
            <Modal.Body >
                <Login/> 
                <div className="s-mt-3 s-mr-2 small s-main-end s-cross-end div-link primary" 
                onClick={()=>{handleOpenReg()
                            handleCloseLogin()}}>
                    Aun sin cuenta, registrate
                </div> 
            </Modal.Body>
        </Modal>

        <Modal 
            show={showRegister} 
            onHide={handleCloseReg}
            dialogClassName="modal-90w">
            <Modal.Header  closeButton>
                Formulario de Registro
            </Modal.Header >
            <Modal.Body > 
                <Register/> 
            </Modal.Body>
        </Modal>
        </>
    )
}



const mapStateToProps = state => ({
    loggedUser: state.userReducer.userLogged
})

const mapDispatchToProps = dispatch =>({
    
    removeloggeduser(){
        dispatch( removeLoggedUser() )
    }


})


export default connect(mapStateToProps, mapDispatchToProps )(  Header)
