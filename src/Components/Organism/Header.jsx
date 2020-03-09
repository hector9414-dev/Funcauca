import React, { createRef, useState } from 'react'
import Logo from '../Atoms/Logo'
import { NavLink, Link } from 'react-router-dom'
import { Button, Modal } from 'react-bootstrap'
import Register from '../Pages/Register'
import Login from '../Pages/Login'
import * as firebase from 'firebase/app'
import { connect } from 'react-redux'
import { removeLoggedUser, getCourses, addCourseToCart, getLocalCart } from '../../Redux/actionCreator';
import { useEffect } from 'react'
import store from '../../Redux/store'
import Avatar from '../Atoms/Avatar'
import Cart from '../../img/cart.png'


store.dispatch( getLocalCart() )
store.dispatch( getCourses() )

const Header = ({loggedUser, removeloggeduser, cart, addcoursetocart}) => {

    

    const [showRegister, setShowRegister] = useState(false)
    const [showLogin, setShowLogin] = useState(false)
    const [currentUser, setCurrentUser] = useState(false)
    const menu = createRef()

    const handleOpenReg = () =>{
        setShowRegister(true) 
    }
    const handleCloseReg = () =>{
        setShowRegister(false)
    }
    const handleOpenLogin = ()=>{setShowLogin(true)}
    const handleCloseLogin = ()=>{setShowLogin(false)}
    
    const toggle = ()=>{menu.current.classList.toggle("show")}

    const logOut = async () =>{
        firebase.auth().signOut()
        removeloggeduser()
        setCurrentUser(false)
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        
    }

   useEffect(()=>{
       if(loggedUser){
           handleCloseLogin();
       }
   },[loggedUser])
    
    

    return (
        <>
        <header className="main-header">
            <div className="ed-grid s-grid-2 header-container">
                <nav className="main-header__menu ed-grid gap-2 s-cross-center">
                    <Logo />
                    <div className="main-menu" ref={menu}>
                        <ul className="main-menu-content menu-ed-grid ed-grid lg-cross-center">
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
                                    <li className="list-item normal logout main">
                                        <Button onClick={()=>logOut()} variant="link" size="sm">Salir</Button>
                                    </li>
                                </ul>
                        </ul>
                    </div>
                </nav>
                <nav className="ed-grid menu-login">
                    <div className="menu-login container">
                            {
                                cart > 0 ?
                                    <div className="cart-container">
                                        <Link to="/cart" >
                                            <img src={Cart} alt="cart"/>
                                            <div className="cart-counter">
                                                <span className="t6"> {cart} </span>
                                            </div>
                                        </Link>
                                    </div>
                                    
                                :
                                null
                            }
                                {
                                loggedUser ?
                                <>
                                    <div className="user-info s-mr-3"> 
                                        <Link to="/dashboard">
                                        <span className="t5 s-mr-1 user-name">{loggedUser.name}</span>  
                                        <Avatar />
                                        </Link>
                                    </div>
                                    <Button onClick={()=>logOut()} variant="outline-primary" size="sm" className="logout login">Salir</Button>
                                    </>
                                :
                                <>
                                    <div className="m-mr-2 s-mr-2 normal div-link" onClick={() => handleOpenLogin()} >Ingresar</div>
                                    <Button 
                                        variant="success" 
                                        size="sm" 
                                        className="m-px-1 m-py-1 s-mr-2 green-button"
                                        onClick={() => {handleOpenReg() 
                                        handleCloseLogin()}}>
                                        Registrar
                                    </Button>
                                </>
                            }
                        <div className="toggle-container">
                            <span className="menu-toggle to-l" onClick={()=>toggle()}></span>
                        </div>
                    </div>
                </nav>
            </div>
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
                <div className="s-mt-3 s-mr-2 small s-main-end s-cross-end div-link primary" 
                onClick={()=>{handleCloseReg()
                                handleOpenLogin()}}>
                    Ya tienes cuenta ? accede.
                </div>
            </Modal.Body>
        </Modal>
        </>
    )
}



const mapStateToProps = state => ({
    loggedUser: state.userReducer.userLogged,
    cart: state.cartReducer.cart.length
})

const mapDispatchToProps = dispatch =>({
    
    removeloggeduser(courseId){
        dispatch( removeLoggedUser() )
    },

    addcoursetocart(courseId){
        dispatch( addCourseToCart(courseId) )
    }


})


export default connect(mapStateToProps, mapDispatchToProps )(  Header)

