import React from 'react'
import CartCard from '../Organism/CartCard'
import {connect} from 'react-redux'
import { Button } from 'react-bootstrap'
import { flushCart } from '../../Redux/actionCreator'
import md5 from 'md5'
import { useState } from 'react'
import { createRef } from 'react'
import { useEffect } from 'react'

const Cart = ({courses, cart, flushcart, loggedUser}) => {

    let sum = 0
    let stringSum
    const [signature, setSignature] = useState()
    const [reference, setReference] = useState()
    const cartId = []
    const formRef = createRef()

    const apikeytest = "4Vj8eK4rloUd272L48hsrarnUA"
    const merchantidtest = "508029"
    // const apikey = "iDkJHSBs9Jc5AKrIaL65DBmsr4"
    // const merchantid = "838626"

    const submit = e =>{
        formRef.current.submit()
    }
   
    const courseSum = price =>{
        let intPrice = parseInt(price)
        sum = intPrice+sum
        stringSum = sum
    }
    
    const getReference = () =>{
        if(loggedUser){
            Object.values(cart).map( id => cartId.push(id))
            const cartToString = cartId.toString()
            let refString = `${loggedUser.uid}${cartToString}`
                refString = refString.replace(",","")
                setReference(refString)
        }
    }
    
    const toMd5 = e =>{
        const hash = `${apikeytest}~${merchantidtest}~${reference}~${sum}~COP`
        const sign = md5(hash)
        setSignature(sign)
    }


    useEffect(()=>{
        getReference()
        toMd5()
    },[cart, loggedUser, reference])

    return (
        <div className="ed-container s-pt-4 s-main-center">
            <h2 className="s-mb-4">Carrito de compras</h2>
            {
                cart.length > 0?
                <div className="ed-grid lg-grid-5 ">
                <div className="cart-items-container lg-cols-3">
                {
                    courses.map(element => {
                        return Object.values(element).map( course =>
                            cart.map( item => {
                                if(item===course.id){
                                    courseSum(course.price)
                                    return(
                                        <CartCard 
                                            key={course.id}
                                            img={course.img}
                                            title={course.title}
                                            price={course.price}
                                            teacher={course.teacher}
                                            id={course.id}
                                        />
                                    )
                                }
                            }))
                    })
                        
                }
                
                <section className="cart-footer flex">
                    <div>
                        <Button variant="link" onClick={()=>flushcart()}>Vaciar carrito</Button>
                    </div>
                    <p className="s-to-right s-mb-0 t3"> {`Total  ${stringSum} COP`} </p>
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
                <input name="responseUrl"    type="hidden"  value="https://app.funcaucaedu.com/checkout" />
                {/* <input name="confirmationUrl"    type="hidden"  value="http://localhost:3000/checkout" /> */}
                <input name="confirmationUrl"    type="hidden"  value="https://us-central1-funcaucaedu-eb0cf.cloudfunctions.net/setPaymentInfo" />
                <input name="Submit"        type="button"  value="Pagar"onClick={()=> submit()}  />
                </form>
                </div>
            </div>
            :
            <div className="ed-container">
                <h2 className="lg-cols-5">Tu carrito esta vacio...</h2>
            </div>
            }
        </div>
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
