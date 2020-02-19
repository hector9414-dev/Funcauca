import React, { createRef, useState } from 'react'
import Logo from '../Atoms/Logo'
import { NavLink } from 'react-router-dom'
import { Button, Modal } from 'react-bootstrap'
import Banner from './Banner'
import Register from '../Pages/Register'
import Login from '../Pages/Login'


const Header = () => {

    const [showRegister, setShowRegister] = useState(false)
    const [showLogin, setShowLogin] = useState(false)
    const menu = createRef()
    
    const handleOpenReg = () =>{setShowRegister(true) }
    const handleCloseReg = () =>{setShowRegister(false)}
    const handleOpenLogin = ()=>{setShowLogin(true)}
    const handleCloseLogin = ()=>{setShowLogin(false)}

    const toggle = ()=>{menu.current.classList.toggle("show")}
    
    return (
        <header className="main-header ">
            <nav className="main-header__menu ed-grid gap-2 s-cross-center">
                <Logo />
                <div className="main-menu" ref={menu}>
                    <ul className="main-menu-content menu-ed-grid ed-grid lg-cross-center">
                        <div className="menu-items">
                            <ul>
                                <li className="list-item normal"><NavLink to="/" exact >Inicio</NavLink></li>
                                <li className="list-item normal"><NavLink to="/cursos">Cursos</NavLink></li>
                                <li className="list-item normal"><NavLink to="/conocenos">Conocenos</NavLink></li>
                            </ul>
                        </div>
                        <div className="menu-login lg-main-end">
                            <ul className="lg-cross-center">
                                <li className="s-mb-2"><div className="lg-mr-2 normal" onClick={() => handleOpenLogin()} >Ingresar</div></li>
                                <Modal 
                                    show={showLogin} 
                                    onHide={handleCloseLogin}
                                    dialogClassName="modal-90w">
                                    <Modal.Header closeButton>
                                        Ingresa
                                    </Modal.Header>
                                    <Modal.Body closeButton> <Login /> </Modal.Body>
                                </Modal>
                                <li>
                                    <Button 
                                    variant="success" 
                                    size="sm" 
                                    className="s-px-1 s-py-1"
                                    onClick={() => handleOpenReg()}
                                    >
                                    Registrar
                                    </Button>
                                </li>                                
                                
                                <Modal 
                                    show={showRegister} 
                                    onHide={handleCloseReg}
                                    dialogClassName="modal-90w">
                                    <Modal.Header closeButton >
                                        Formulario de Registro
                                    </Modal.Header >
                                    <Modal.Body closeButton> <Register/> </Modal.Body>
                                    
                                </Modal>
                            </ul>
                        </div>
                    </ul>
                </div>
                <div className="menu-toggle s-main-end to-l" onClick={()=>toggle()}></div>
                
                
            </nav>
        </header>
    )
}

export default Header
