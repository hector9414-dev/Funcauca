import React from 'react'
import Vimeo from '@u-wave/react-vimeo';
import { Accordion, Card } from 'react-bootstrap'
import { connect } from 'react-redux'
import { NavLink, Link, } from 'react-router-dom'
import Whitecheck from '../../img/white-check.png'
import * as firebase from 'firebase/app'


const Fragment = ({match, courses}) => {


    let actualSection = {}
    let matchedCourse = {}
    let actualClass = {}
    const {courseId, classId, videoId } = match.params
    const user =  JSON.parse(localStorage.getItem("user")) 
    firebase.database().ref(`/Users/${user.uid}/courses`).once("value")
    .then(snapshot => {
        if(!snapshot.val().includes(courseId)){
            window.location.assign("/cursos")
        }
    })
    const actualCourse = (courses.map(e => { return (Object.values(e).filter( course => course.id === courseId )) }))

    actualCourse.map(course =>(Object.values(course).map(e => matchedCourse = e)))   
    const { content }= matchedCourse

    if(content){
        content.filter(content => content.id === classId).map( section => actualSection = section )
    }

    if(actualSection.classes){
        actualSection.classes.filter( classes => classes.id === videoId).map(classes => actualClass = classes)
    }
    

    



    

    return (
        <main className="page-body s-pt-4">
        <div className="ed-grid class-grid lg-grid-6 s-pt-2">
            <div className="lg-cols-4">
                <Vimeo
                video={videoId}
                responsive
                />
                {
                    actualSection ?
                        <div className="video-info">
                        <p className="t2 s-pt-2 s-mb-0 class-name"> {actualClass.name} </p>
                        <Link to={`/curso/${courseId}`} >
                            <p > {matchedCourse.title} </p>
                        </Link>
                        </div>
                    
                    :
                    <p>Cargando</p>
                }
            </div>
            <aside className="lg-cols-2 class-container">
                <Accordion defaultActiveKey={classId} >
                    {
                        content ?
                            content.map( section => {
                                return(
                                <Card className="class-card" key={section.id} >
                                    <Accordion.Toggle as={Card.Header} 
                                    eventKey={section.id}
                                    className="t3"
                                    >
                                    {section.title}
                                    </Accordion.Toggle>
                                    <Card.Body>
                                        <ul className="class-list fragment">
                                            {
                                                section.classes.map( classes => 
                                                            <li key={classes.id}> 
                                                                < NavLink to={`/class/${matchedCourse.id}/${section.id}/${classes.id}`} 
                                                                className="class-link fragment" 
                                                                activeClassName="active"
                                                                >
                                                                    <img src={Whitecheck} alt="" width="15px" className="s-mr-1"/>
                                                                    <span>{classes.name}</span>
                                                                </NavLink>
                                                            </li>
                                                    
                                                    
                                                    )
                                            }
                                        </ul>
                                    </Card.Body>
                                </Card>
                                )
                            })
                            
                        :
                        <p>Cargando</p>
                    }
                </Accordion>
            </aside>
        </div>
        </main>
    )
}

const mapStateToProps = state => ({
    courses: state.coursesReducer.coursesList
})


export default connect(mapStateToProps, {} )(Fragment)
