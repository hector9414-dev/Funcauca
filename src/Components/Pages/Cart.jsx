import React from 'react'
import CartCard from '../Organism/CartCard'
import {connect} from 'react-redux'
import { Button, Modal } from 'react-bootstrap'
import { flushCart } from '../../Redux/actionCreator'
import md5 from 'md5'
import { useState } from 'react'
import { createRef } from 'react'
import { useEffect } from 'react'
import PayULogo from '../../img/PayU_180x100_Paga.png'
import SupportedCo from '../../img/PayU_CO.png'
import * as firebase from 'firebase/app'
import Register from '../Pages/Register'
import Login from '../Pages/Login'



const Cart = ({courses, cart, flushcart, loggedUser}) => {

    let sum = 0
    let stringSum
    const [signature, setSignature] = useState()
    const [reference, setReference] = useState()

    const [showRegister, setShowRegister] = useState(false)
    const [showLogin, setShowLogin] = useState(false)

    const handleOpenReg = () =>{
        setShowRegister(true) 
    }
    const handleCloseReg = () =>{
        setShowRegister(false)
    }
    const handleOpenLogin = ()=>{setShowLogin(true)}
    const handleCloseLogin = ()=>{setShowLogin(false)}

    const cartId = []
    const formRef = createRef()

    const apikeytest = "4Vj8eK4rloUd272L48hsrarnUA"
    const merchantidtest = "508029"
    // const apikey = "iDkJHSBs9Jc5AKrIaL65DBmsr4"
    // const merchantid = "838626"

    const submit = e =>{
        if(firebase.auth().currentUser){
            formRef.current.submit()
        }
        else{
            setShowLogin(true)
        }
    }
   
    const courseSum = price =>{
        let intPrice = parseInt(price)
        sum = intPrice+sum
        stringSum = sum
    }
    
    const getReference = () =>{
        const today = new Date()
        if(loggedUser){
            Object.values(cart).map( id => cartId.push(id))
            const cartToString = cartId.toString()
            let refString = `${loggedUser.uid}-${today.getTime()}-${cartToString}`
                refString = refString.replace(",","")
                const hash = `${apikeytest}~${merchantidtest}~${refString}~${sum}~COP`
                const sign = md5(hash)
                setSignature(sign)
                setReference(refString)
                
        }
        

    }
    
    useEffect(()=>{
        getReference()
    },[loggedUser,cart])

    return (
        <main className="ed-container s-pt-4 s-main-center">
            <h2 className="s-mb-4">Carrito de compras</h2>
            {
                cart.length > 0?
                <div className="ed-grid lg-grid-5 ">
                <div className="cart-items-container lg-cols-3">
                {   
                
                            cart.map( id => {
                                const actualCourse = courses[`course${id}`]
                                courseSum(actualCourse.price)
                                    return(
                                        <CartCard 
                                            key={actualCourse.id}
                                            img={actualCourse.img}
                                            title={actualCourse.title}
                                            price={actualCourse.price}
                                            teacher={actualCourse.teacher}
                                            id={actualCourse.id}
                                        />
                                    )
                                }
                            )
                
                        
                }
                
                <section className="cart-footer flex">
                    <div>
                        <Button variant="link" onClick={()=>flushcart()}>Vaciar carrito</Button>
                    </div>
                    <p className="s-to-right s-mb-0 t3"><span className="s-mr-1">Total</span> {`${stringSum/1000}.000 COP`} </p>
                </section>
                </div>
                <div className="lg-cols-2">
                {/* <form method="post" action="https://checkout.payulatam.com/ppp-web-gateway-payu/">
                    <input name="merchantId"    type="hidden"  value={merchantidtest}   />      
                    <input name="accountId"  hidden readOnly value="846073" />
                    <input name="description" hidden  value="FUNCA"  />
                    <input name="referenceCode" type="text"  value={reference} />
                    <input name="amount" hidden readOnly  value={sum}   />
                    <input name="tax"  hidden readOnly  value="0"  />
                    <input name="taxReturnBase" hidden readOnly value="0" />
                    <input name="currency" hidden readOnly value="COP" />
                    <input name="signature"     type="text"  value={signature}  />
                    <input name="test"    hidden   readOnly  value="1" />
                    <input name="buyerEmail"  hidden value="test@test.com" />
                    <input name="responseUrl"  hidden readOnly value="https://funcaucaedu-eb0cf.firebaseapp.com/cart" />
                    <input name="confirmationUrl" hidden readOnly value="https://us-central1-funcaucaedu-eb0cf.cloudfunctions.net/setPaymentInfo" />
                    <input name="Submit"     type="submit"  value="Enviar" />
                </form> */}
                


                <form method="post" action="https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/" ref={formRef}>
                <input name="merchantId"    type="hidden"  value={merchantidtest}   />
                <input name="accountId"     type="hidden"  value="512321" />
                <input name="description"   type="hidden"  value="Test PAYU"  />
                <input name="referenceCode" type="hidden"  value={reference} />
                <input name="amount"        type="hidden"  value={sum}   />
                <input name="tax"           type="hidden"  value="3193"  />
                <input name="taxReturnBase" type="hidden"  value="16806" />
                <input name="currency"      type="hidden"  value="COP" />
                <input name="signature"     type="hidden"  value={signature}  />
                <input name="test"          type="hidden"  value="1" />
                {
                    loggedUser ?
                    <input name="extra1" type="hidden"  value={loggedUser.uid} />
                    :
                    null
                }
                <input name="extra2"    type="hidden"  value={JSON.stringify(cart)} />
                <input name="buyerEmail"    type="hidden"  value="prueba@test.com" />
                <input name="responseUrl"    type="hidden"  value="http://app.funcaucaedu.com/checkout" />
                <input name="confirmationUrl"    type="hidden"  value="https://us-central1-funcaucaedu-eb0cf.cloudfunctions.net/setPaymentInfo" />
                </form>
                <div className="m-mt-4 m-75 s-65 s-to-center">
                <img src={PayULogo} alt="PayU" className="m-mb-3"/>
                <Button type="button" block onClick={()=> submit()} className="s-mb-2 s-py-1 big ">Pagar</Button>
                <p className="smaller s-mb-0">Medios de pago aceptados:</p>
                <img src={SupportedCo} alt="PayU" className="m-mb-3"/>
                </div>
                
                </div>
            </div>
            :
            <div className="ed-container">
                <h2 className="lg-cols-5">Tu carrito esta vacio...</h2>
                {
                    window.location.assign("/cursos")
                    
                }
            </div>
            }

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
        
        </main>
    )
}

const mapStateToProps = state => ({
    courses: state.coursesReducer.coursesList,
    cart: state.cartReducer.cart,
    loggedUser: state.userReducer.userLogged
})


const mapDispatchToProps = dispatch =>({
    
    flushcart(){
        dispatch( flushCart() )
    }


})


export default connect(mapStateToProps, mapDispatchToProps )(Cart)
