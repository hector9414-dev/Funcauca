import React from 'react'
import { connect } from 'react-redux'
import Banner from '../Organism/Banner'
import { Card, Button, ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Check from '../../img/check.png'

const Course = ({match, courses}) => {
    
    let matchedCourse = {}
    const actualCourse = (courses.map(e => { return (Object.values(e).filter( course => course.id === match.params.id )) }))
    actualCourse.map(course =>(Object.values(course).map(e => matchedCourse = e)))   
    
    return (
        <div>
            <Banner course title={matchedCourse.title}
                description={matchedCourse.description}
                color={"#212221"}
            />
             <div className="ed-grid course-content lg-grid-10 gap-2" >
                    <div className="lg-cols-7 s-mt-4 lg-mt-0 ">
                        <p className="t2 s-mb-4 s-pl-0 left">Contenido del curso</p>
                        {
                            matchedCourse.content?
                            matchedCourse.content.map( seccion => {
                                
                                return(
                                    <ListGroup key={seccion.id} className="s-mb-1">
                                        <ListGroup.Item className="strong">{seccion.title}</ListGroup.Item>
                                            {
                                            seccion.classes.map( classes => 
                                                        <ListGroup.Item key={classes.id} className="s-pl-4">
                                                            <img src={Check} alt="" width="15px" className="s-mr-1"/>
                                                            <span>{classes.name}</span> 
                                                        </ListGroup.Item>
                                                        )
                                                    }
                                       
                                    </ListGroup>
                                

                                )
                                
                                
                                })
                            :
                            <p>cargando</p>
    

                        }
                    </div>
                    <div className="content-panel course lg-cols-3" >
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
    courses: state.coursesReducer.coursesList
})


export default connect(mapStateToProps, {} )(Course)
