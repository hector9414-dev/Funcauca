import React, { useEffect } from 'react'
import * as firebase from 'firebase/app'
import { Form, Button, Spinner, Modal } from 'react-bootstrap'
import { useState } from 'react'
import { createRef } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'


const Test = ({match}) => {
    const loggedUser = JSON.parse( localStorage.getItem("user"))
    const {courseId, sectionId} = match.params
    const [exam, setExam] = useState()
    const [showModal, setShowModal] = useState()
    const [userTry, setTry] = useState()
    const examForm = createRef()
    const examRef = firebase.database().ref(`/Courses/course${courseId}/content/section${sectionId}/exam`)
    const userRef = firebase.database().ref(`/Users/${loggedUser.uid}/exams`)
    const userExamRef = firebase.database().ref(`/Users/${loggedUser.uid}/exams/course${courseId}/section${sectionId}`)
    let userChoices = {}
    const [choices, setChoices] = useState()
    let answers = {}

    const handleForm = e=>{
        e.preventDefault()
        setShowModal(true)
    }

    const getAnswers = () =>{
        const formInputs = examForm.current.elements
        Object.keys(formInputs).map(key=>{
            if(formInputs[key].checked){
                const id = formInputs[key].id
                const statement = formInputs[key].value
                userChoices[formInputs[key].name] = {
                    id,
                    statement
                }
            }
            setChoices(userChoices)
        })
    }

  

    const handleExam = () =>{
        let correct = 0
        let state
        Object.keys(answers).map(key=>{
            Object.keys(choices).map(keys=>{
                if(key === keys){
                    if(answers[key].id === choices[keys].id){
                        correct = correct + 1
                    }
                }
            })
        })

        const totalQuestions = Object.keys(answers).length
        const grade = (correct/totalQuestions)*100

        if(grade >= 75){
            state = "Aprobado"
        }
        else{
            state = "Reprobado"
        }


        const results={
            choices,
            answers,
            grade,
            state,
            correct,
        }
        userRef.child(`/course${courseId}/section${sectionId}`).update(results)
        window.location.assign(`/results/${courseId}/${sectionId}`)


    }

    const getExam = () =>{

            examRef.once("value")
            .then(snapshot =>{
                if(snapshot.val()){
                    setExam(snapshot.val())
                }
                else{
                    window.location.assign(`/curso/${courseId}`)
                }
            })
    }


    useEffect(()=>{
        userExamRef.once("value")
        .then(snapshot =>{
            if(!snapshot.val()){
                userExamRef.update({userTry:"1"})
            }
            if(snapshot.val()){
                if(snapshot.val().userTry==="1"){
                    userExamRef.update({userTry:"0"})
                }
                if(snapshot.val().userTry==="0"){
                    window.location.assign(`/results/${courseId}/${sectionId}`)
                    }
            }
        })
        getExam()
    },[])

    return (
        <main className="m-50 s-to-center">
            <Form ref={examForm} onSubmit={e=>handleForm(e)}>
            {
                exam?
                Object.keys(exam).map(key=>{
                    const question = exam[key]
                    const {choices,answer} = question
                    const { id, statement} = answer
                    answers[key] = {id, statement}
                    if(question.id && question.title && choices){
                        return(
                            <div key={question.id}>
                                <h4> {question.title} </h4>
                                {
                                    Object.keys(choices).map(keys=>{
                                        const choice = choices[keys]
                                        return(
                                            <Form.Check 
                                            custom
                                            type={"radio"}
                                            id={choice.id}
                                            value={choice.statement}
                                            key={choice.id}
                                            label={choice.statement}
                                            name={key}
                                            onClick={()=>getAnswers()}
                                            required
                                        />
                                        )
                                    })
                                }
                            </div>
                        )
                    }
                    else{
                        window.location.assign(`/curso/${courseId}`)
                    }

                })
                
                :
                <div className="center s-pt-4">
                    <Spinner animation="grow" variant="success" />
                    <p>Cargando..</p>
                </div>
                
            }
            {
                exam?
                <Button type="submit">Enviar</Button>
                :
                null
            }
            
            </Form>
            <Modal
            show={showModal}
            onHide={()=>{
                setShowModal(false)

            }}
            size="md"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                    Completar Examen
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                    Estas seguro que deseas completar el examen ?
                    </p>
                    <div className="ed-grid s-grid-2">
                    <Button type="button" onClick={()=>handleExam()}>
                        Completar
                    </Button>
                    <Button type="button" onClick={()=>setShowModal(false)}>
                        Volver
                    </Button>
                    </div>
                </Modal.Body>
            </Modal>
        </main>

    )
}

const mapStateToProps = state => ({
    loggedUser: state.userReducer.userLogged,
})

export default connect(mapStateToProps, {} )(Test)

