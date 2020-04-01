import React, { useEffect } from 'react'
import * as firebase from 'firebase/app'
import { useState } from 'react'
import { connect } from 'react-redux'
import Logo from '../../img/logo-no-text-.png'
import { Spinner, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'


const Results = ({match}) => {
    const {courseId, sectionId} = match.params
    const loggedUser = JSON.parse( localStorage.getItem("user"))
    const [results, setResults] = useState()
    const [course, setCourse] = useState()
    const userExamRef = firebase.database().ref(`/Users/${loggedUser.uid}/exams/course${courseId}/section${sectionId}`)
    const courseRef = firebase.database().ref(`/Courses/course${courseId}`)
        

    useState(()=>{
        userExamRef.once("value")
        .then(snapshot=>{
            setResults(snapshot.val())
        })

        courseRef.once("value")
        .then(snapshot=>{
            setCourse(snapshot.val())
        })
        
    },[])
    

    return (
            <main className="s-90 m-75 s-to-center lg-40 tx-container">
            {
                results && course ?
                
                    <>
                        <h2 className="center">Resultados del examen</h2>
                        <img src={Logo} alt="logo" className="main-logo tx-logo s-to-center"/>
                        <div className="ed-grid">   
                            <div className="ed-grid s-grid-2">
                                <p className="tx-item">Curso:</p>
                                <p className="tx-item"> {course.title} </p>
                            </div>
                            <div className="ed-grid s-grid-2">
                                <p className="tx-item">Seccion:</p>
                                <p className="tx-item"> {course.content[`section${sectionId}`].title} </p>
                            </div>
                            <div className="ed-grid s-grid-2">
                                <p className="tx-item">Total preguntas:</p>
                                <p className="tx-item"> {
                                    Object.keys(results.answers).length
                                } </p>
                            </div>
                            <div className="ed-grid s-grid-2">
                                <p className="tx-item">Preguntas correctas:</p>
                                <p className="tx-item"> {results.correct} </p>
                            </div>
                            <div className="ed-grid s-grid-2">
                                <p className="tx-item">Calificación:</p>
                                <p className="tx-item"> {results.grade}% </p>
                            </div>
                            <div className="ed-grid s-grid-2">
                                <p className="tx-item">Intentos restantes:</p>
                                <p className="tx-item"> {results.userTry} </p>
                            </div>
                            <div className="ed-grid s-grid-2 s-80 s-to-center">
                                <Link to="/dashboard">
                                <Button>Continuar</Button>
                                </Link>
                                {
                                    parseInt(results.userTry) ?
                                        <Link to={`/test/${courseId}/${sectionId}`}>
                                            <Button>Reintentar</Button>
                                        </Link>
                                        :
                                        null
                                }
                                
                            </div>
                        </div>
                        </>
                :
                <div className="center s-pt-4">
                    <Spinner animation="grow" variant="success" />
                    <p>Cargando..</p>
                </div>
            }
            
        </main>
    )
}

const mapStateToProps = state => ({
    loggedUser: state.userReducer.userLogged,
})

export default connect(mapStateToProps, {} )(Results)
