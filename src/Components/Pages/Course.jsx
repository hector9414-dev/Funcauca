import React from 'react'
import { connect } from 'react-redux'
import Banner from '../Organism/Banner'
import { Card, Button, ListGroup, Spinner } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Check from '../../img/check.png'
import Locked from '../../img/locked.png'
import { useState } from 'react'
import { useEffect } from 'react'

const Course = ({match, coursesList, loggedUser}) => {

    const [courseLocked, setCourseLocked] = useState(true)    
    const actualCourse = (coursesList.map(e => { return (Object.values(e).filter( course => course.id === match.params.id )) }))
    
    let locked 
    let matchedCourse = {}
    
    actualCourse.map(course =>(Object.values(course).map(e => matchedCourse = e))) 

    Array.prototype.includes()

    if(loggedUser){
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
    

    
    useEffect(() => {
        setCourseLocked(locked)
    }, [locked])

    
    
        
    
    return (
        <div>
            <Banner course title={matchedCourse.title}
                description={matchedCourse.description}
                color={"#212221"}
            />
            {
                // console.log(courseTruelocked)
            }
             <div className="ed-grid course-content lg-grid-10 gap-2" >
                    <div className="lg-cols-6  s-mt-4 lg-mt-0 ">
                        <p className="t2 s-mb-4 s-pl-0 left">Contenido del curso</p>
                        {
                            matchedCourse.content?
                            matchedCourse.content.map( seccion => {
                                
                                return(
                                    <ListGroup  className="s-mb-2" key={seccion.id}>
                                        <ListGroup.Item className="classes-group" disabled={courseLocked}>
                                            <span className="strong section-title" > {seccion.title}</span> 
                                            {
                                            seccion.classes.map( classes => 
                                                    <div className="class-title" key={classes.id}>
                                                        <Link to={`/class/${matchedCourse.id}/${seccion.id}/${classes.id}`}
                                                        className="class-link"
                                                        >
                                                            {
                                                                courseLocked ?
                                                                <img src={Locked} alt="" width="15px" className="s-mr-1"/>
                                                                :
                                                                <img src={Check} alt="" width="15px" className="s-mr-1"/>
                                                            }
                                                            <span>{classes.name}</span> 
                                                        </Link>
                                                    </div>
                                                        )
                                                    }
                                       </ListGroup.Item>
                                    </ListGroup>
                                

                                )
                                
                                
                                })
                            :
                            <Spinner animation="grow" variant="success" />
    

                        }
                    </div>
                    <div className="content-panel course lg-x-8 lg-cols-3" >
                    <Card className="card course s-mb-2 ">
                        <Card.Img variant="top" src={matchedCourse.img} />
                        <Card.Body>
                        <Card.Title className="t3 s-mt-1 center">{matchedCourse.title}</Card.Title>
                        <Card.Text className="small s-mb-1 lg-mb-2 center">
                            {matchedCourse.summary}
                        </Card.Text>
                        <Card.Text className="s-mb-1 lg-mb-2 center t3">
                            {matchedCourse.price}
                        </Card.Text>
                        <Link to={`/curso/${matchedCourse.id}`}>
                        <Button variant="primary s-cross-center" className="small ghost cart-button">
                            <span className="strong">Agregar al carrito</span> 
                        </Button>
                        </Link>
                        </Card.Body>
                    </Card>
                    </div>
                </div>
        </div>
    )
}


const mapStateToProps = state => ({
    coursesList: state.coursesReducer.coursesList,
    loggedUser: state.userReducer.userLogged
})


export default connect(mapStateToProps, {} )(Course)
