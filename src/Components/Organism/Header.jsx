import React, { createRef, useState } from 'react'
import Logo from '../Atoms/Logo'
import { NavLink } from 'react-router-dom'
import { Button, Modal } from 'react-bootstrap'
import Register from '../Pages/Register'
import Login from '../Pages/Login'
import * as firebase from 'firebase/app'
import { connect } from 'react-redux'
import { removeLoggedUser } from '../../Redux/actionCreator';





const Header = ({loggedUser, removeloggeduser}) => {


    const [showRegister, setShowRegister] = useState(false)
    const [showLogin, setShowLogin] = useState(false)
    const [modal, setModal] = useState()
    const [registeredOk, showregisteredOk] = useState(false)
    const [currentUser, setCurrentUser] = useState(false)
    const menu = createRef()

    

    
    const handleOpenReg = () =>{setShowRegister(true) 
                                setModal("reg")}
    const handleCloseReg = () =>{setShowRegister(false)
                                showregisteredOk(false)}
    const handleOpenLogin = ()=>{setShowLogin(true)}
    const handleCloseLogin = ()=>{setShowLogin(false)}
    
    const toggle = ()=>{menu.current.classList.toggle("show")}

    firebase.auth().onAuthStateChanged( user => {
        if( loggedUser ){
            if(user){
                setCurrentUser(firebase.auth().currentUser.displayName)
            }
            handleCloseLogin()
        }
    })

    const logOut = async () =>{
        await firebase.auth().signOut()
        removeloggeduser()
        setCurrentUser(false)
        localStorage.removeItem("tokenIdLogged")
        localStorage.removeItem("userName")
    }

    
   
    
    
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
                                    currentUser ?
                                    <div className="menu-ed-grid ed-grid lg-cross-center t4">
                                        <div>{`Bienvenido ${currentUser}`}</div>
                                        <Button onClick={()=>logOut()} className="small ghost">Salir</Button>
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
                <div className="menu-toggle s-main-end to-l" onClick={()=>toggle()}></div>
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
    loggedUser: state.user
})

const mapDispatchToProps = dispatch =>({
    
    removeloggeduser(){
        dispatch( removeLoggedUser() )
    }


})


export default connect(mapStateToProps, mapDispatchToProps )(Header)
