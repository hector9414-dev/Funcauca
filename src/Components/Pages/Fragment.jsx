import React from 'react'
import Vimeo from '@u-wave/react-vimeo';
import Youtube from '@u-wave/react-youtube'
import { Accordion, Card } from 'react-bootstrap'
import { connect } from 'react-redux'
import { NavLink, Link, } from 'react-router-dom'
import Whitecheck from '../../img/white-check.png'
import * as firebase from 'firebase/app'


const Fragment = ({match, courses}) => {

    const {courseId, sectionId, classId } = match.params

    const matchedCourse = courses[`course${courseId}`]
    const { content } = matchedCourse
    const actualSection = content[`section${sectionId}`]
    const {classes: fragment} = actualSection
    const actualClass = fragment[`class${classId}`]


    const user =  JSON.parse(localStorage.getItem("user")) 
    firebase.database().ref(`/Users/${user.uid}/courses`).once("value")
    .then(snapshot => {
        if(!snapshot.val().includes(courseId)){
            window.location.assign("/cursos")
        }
    })


    

    return (
        <main className="page-body s-pt-4">
        <div className="ed-grid class-grid lg-grid-6 s-pt-2">
            <div className="lg-cols-4">
                <Vimeo
                video={actualClass.videoId}
                responsive
                />
                    <div className="video-info">
                    <p className="t2 s-pt-2 s-mb-0 class-name"> {actualClass.name} </p>
                    <Link to={`/curso/${courseId}`} >
                        <p > {matchedCourse.title} </p>
                    </Link>
                    </div>
                    
            </div>
            <aside className="lg-cols-2 class-container">
                <Accordion defaultActiveKey={classId} >
                    {
                        Object.keys(content).map( key => {
                            const section = content[key]
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
                                Object.keys(section.classes).map(key=>{
                                    const classes = section.classes[key]
                                    return(
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
                                })
                                }       
                                    <li> 
                                        < NavLink to={`/test/${matchedCourse.id}/${section.id}`} 
                                            className="class-link fragment" 
                                            activeClassName="active"
                                            >
                                            <img src={Whitecheck} alt="" width="15px" className="s-mr-1"/>
                                            <span>Examen</span>
                                        </NavLink>
                                    </li>
                                </ul>
                                </Card.Body>
                                
                            </Card>
                            )
                        })
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
