import React from 'react'
import { Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { removeCourseFromCart } from '../../Redux/actionCreator'

const CartCard = ({img,title,price,teacher,id, removecoursefromcart}) => {
    return (
        <div className="ed-grid lg-grid-4 lg-cols-3 cart-card">
            <img src={img} alt={title} />
            <div className="lg-cols-2">
                <p className="t3 s-mb-0"> {title} </p>
                <p className="small s-mb-2"> {`Profesor ${teacher}`} </p>
                <Button variant={"link"} size="sm" className="s-px-0 s-py-0" onClick={()=>removecoursefromcart(id)} >Eliminar</Button>
            </div>
            <p className="t3"> {`${price} COP`} </p>
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

