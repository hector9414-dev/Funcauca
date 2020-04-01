import React from 'react'
import { connect } from 'react-redux'
import Banner from '../Organism/Banner'
import { Card, Button, ListGroup, Spinner } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Check from '../../img/check.png'
import Locked from '../../img/locked.png'
import { useState } from 'react'
import { useEffect } from 'react'
import { addCourseToCart } from '../../Redux/actionCreator'

const Course = ({match, coursesList, loggedUser, addcoursetocart, cart}) => {

    const [courseLocked, setCourseLocked] = useState(true)    

    const matchedCourse = coursesList[`course${match.params.id}`]

    

    const {content} = matchedCourse


    

    let locked 

    if(loggedUser){
        if(loggedUser.courses){
            if(loggedUser.courses.includes(matchedCourse.id)){
                locked = false
            }
            else{
                locked = true
            }
        }
        else{
            locked = true
        }
    }
    else{
        locked = true
    }
    
    useEffect(() => {
        setCourseLocked(locked)
    }, [locked])

    return (
        <main>
            <Banner course title={matchedCourse.title}
                description={matchedCourse.description}
                color={"#212221"}
            />
             <div className="ed-grid course-content lg-grid-10 gap-2 " >
             <div className="content-panel course small-card lg-cols-3" >
                    <Card className="card course s-mb-2 ">
                        
                        <Card.Img variant="top" src={matchedCourse.img} />
                        <Card.Body>
                        <Card.Title className="t3 s-mt-1 center">{matchedCourse.title}</Card.Title>
                        <Card.Text className="small s-mb-1 lg-mb-2 center">
                        {
                            matchedCourse?

                            matchedCourse.summary
                            :
                            <Spinner animation="grow" variant="success" />

                        }
                        </Card.Text>
                        <Card.Text className="s-mb-1 lg-mb-2 center t3">
                        {
                            matchedCourse?
                            <span>{matchedCourse.price/1000}.000 COP</span>
                            :
                            <Spinner animation="grow" variant="success" />

                        }
                        </Card.Text>
                        {
                            loggedUser && loggedUser.courses?
                                loggedUser.courses.includes(matchedCourse.id)?
                                <Button block disabled={true} variant={'primary'} >Ya tienes este curso</Button>
                                :
                                <Button
                                onClick={()=>addcoursetocart(matchedCourse.id)}
                                disabled={cart.includes(matchedCourse.id)}
                                block
                                variant={'success'}
                                >
                                {
                                    cart.includes(matchedCourse.id)?
                                    <span className="ed-container s-main-center">En el carrito</span> 
                                    :
                                    <span className="ed-container s-main-center">Agregar al carrito</span> 
                                }
                                
                                </Button>
                            :
                                <Button
                                onClick={()=>addcoursetocart(matchedCourse.id)}
                                disabled={cart.includes(matchedCourse.id)}
                                block
                                variant={'success'}
                                >
                                {
                                    cart.includes(matchedCourse.id)?
                                    <span className="ed-container s-main-center">En el carrito</span> 
                                    :
                                    <span className="ed-container s-main-center">Agregar al carrito</span>
                                } 
                                </Button>   
                                
                        }

                        
                        </Card.Body>
                    </Card>
                    </div>
                    <div className="content-container lg-cols-6 s-pl-2 s-mt-2 m-mt-4 lg-mt-0 "> 
                        <p className="t2 s-center left m-mb-4 s-pl-0 ">Contenido del curso</p>
                        {
                            content?
                            
                            Object.keys(content).map( actualSectionkey => {
                                const actualSection= content[actualSectionkey]
                                const {classes} = actualSection
                                return(
                                    <ListGroup  className="s-mb-2" key={actualSection.id}>
                                        <ListGroup.Item className="classes-group" disabled={courseLocked}>
                                            <span className="strong section-title" > {actualSection.title}</span> 
                                            {
                                            Object.keys(classes).map( actualClasskey => { 
                                                const actualClass = classes[actualClasskey]
                                                return(
                                                        <div className="class-title" key={actualClass.id}>
                                                            <Link to={`/class/${matchedCourse.id}/${actualSection.id}/${actualClass.id}`}
                                                            className="class-link"
                                                            >
                                                                {
                                                                    courseLocked ?
                                                                    <img src={Locked} alt="" width="15px" className="s-mr-1"/>
                                                                    :
                                                                    <img src={Check} alt="" width="15px" className="s-mr-1"/>
                                                                }
                                                                <span>{actualClass.name}</span> 
                                                            </Link>
                                                        </div>
                                                            
                                                        )
                                                    })
                                                }
                                                <div className="class-title">
                                                <Link to={`/test/${matchedCourse.id}/${actualSection.id}`}
                                                            className="class-link">
                                                {
                                                    courseLocked ?
                                                    <img src={Locked} alt="" width="15px" className="s-mr-1"/>
                                                    :
                                                    <img src={Check} alt="" width="15px" className="s-mr-1"/>
                                                }
                                                <span className="class-link">Examen</span> 
                                                </Link>
                                                </div>
                                       </ListGroup.Item>
                                    </ListGroup>
                                

                                )
                                
                                
                            })
                            :
                            <Spinner animation="grow" variant="success" />
    

                        }
                    </div>
                    <div className="content-panel course lg-cols-3 lg-x-8" >
                    <Card className="card course s-mb-2 ">
                        
                        <Card.Img variant="top" src={matchedCourse.img} />
                        <Card.Body>
                        <Card.Title className="t3 s-mt-1 center">{matchedCourse.title}</Card.Title>
                        <Card.Text className="small s-mb-1 lg-mb-2 center">
                        {
                            matchedCourse?

                            matchedCourse.summary
                            :
                            <Spinner animation="grow" variant="success" />

                        }
                        </Card.Text>
                        <Card.Text className="s-mb-1 lg-mb-2 center t3">
                        {
                            matchedCourse?
                            <span>{matchedCourse.price/1000}.000 COP</span>
                            :
                            <Spinner animation="grow" variant="success" />

                        }
                        </Card.Text>
                        {
                            loggedUser && loggedUser.courses?
                                loggedUser.courses.includes(matchedCourse.id)?
                                <Button block disabled={true} variant={'primary'} >Ya tienes este curso</Button>
                                :
                                <Button
                                onClick={()=>addcoursetocart(matchedCourse.id)}
                                disabled={cart.includes(matchedCourse.id)}
                                block
                                variant={'success'}
                                >
                                {
                                    cart.includes(matchedCourse.id)?
                                    <span className="ed-container s-main-center">En el carrito</span> 
                                    :
                                    <span className="ed-container s-main-center">Agregar al carrito</span> 
                                }
                                
                                </Button>
                            :
                                <Button
                                onClick={()=>addcoursetocart(matchedCourse.id)}
                                disabled={cart.includes(matchedCourse.id)}
                                block
                                variant={'success'}
                                >
                                {
                                    cart.includes(matchedCourse.id)?
                                    <span className="ed-container s-main-center">En el carrito</span> 
                                    :
                                    <span className="ed-container s-main-center">Agregar al carrito</span>
                                } 
                                </Button>   
                                
                        }

                        
                        </Card.Body>
                    </Card>
                    </div>
                </div>
        </main>
    )
}


const mapStateToProps = state => ({
    coursesList: state.coursesReducer.coursesList,
    loggedUser: state.userReducer.userLogged,
    cart: state.cartReducer.cart
})

const mapDispatchToProps = dispatch =>({
    
    addcoursetocart(courseId){
        dispatch( addCourseToCart(courseId) )
    }


})

export default connect(mapStateToProps, mapDispatchToProps )(Course)
