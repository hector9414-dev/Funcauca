import React from 'react'
import { Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { removeCourseFromCart } from '../../Redux/actionCreator'

const CartCard = ({img,title,price,teacher,id, removecoursefromcart}) => {
    return (
        <div className="ed-grid m-grid-4 m-cols-3 cart-card">
            <img src={img} alt={title} className="s-mb-2"/>
            <div className="ed-grid s-grid-2 m-cols-3 ">
                <div>
                <p className="t3 s-mb-0"> {title} </p>
                <p className="small s-mb-2"> {`Profesor ${teacher}`} </p>
                </div>
                <p className="t3 s-to-right"> {`${price/1000}.000 COP`} </p>
                <Button variant={"link"} size="sm" className="s-px-0 s-py-0 s-to-left" onClick={()=>removecoursefromcart(id)} >Eliminar</Button>
            </div>
        </div>
    )
}

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch =>({
    
    removecoursefromcart(courseId){
        dispatch( removeCourseFromCart(courseId) )
    }


})

export default connect(mapStateToProps, mapDispatchToProps )(CartCard)

