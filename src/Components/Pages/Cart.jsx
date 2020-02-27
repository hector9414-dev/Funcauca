import React from 'react'
import CartCard from '../Organism/CartCard'
import {connect} from 'react-redux'
import { Button } from 'react-bootstrap'
import { flushCart } from '../../Redux/actionCreator'

const Cart = ({courses, cart, flushcart}) => {

    let sum = 0
    let stringSum

    

    const courseSum = price =>{
        let intPrice
        if(price.includes(".")){
            intPrice = parseInt(price)*1000
        }
        sum = intPrice+sum
        stringSum = `${sum/1000}.000`
    }

    
    return (
        <div className="ed-container s-pt-4 s-main-center">
            <h2 className="s-mb-4">Carrito de compras</h2>
            <div className="ed-grid lg-grid-5 ">
            {
                cart.length > 0?
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
            :
            <h2 className="lg-cols-5">Tu carrito esta vacio</h2>
            
            }
            </div>
            
            
        </div>
    )
}

const mapStateToProps = state => ({
    courses: state.coursesReducer.coursesList,
    cart: state.cartReducer.cart
})


const mapDispatchToProps = dispatch =>({
    
    flushcart(){
        dispatch( flushCart() )
    }


})


export default connect(mapStateToProps, mapDispatchToProps )(Cart)
