import React, { useEffect } from 'react'
import * as firebase from 'firebase/app'
import { Form, Button } from 'react-bootstrap'
import { useState } from 'react'


const Test = ({match}) => {

    const {courseId, classId} = match.params
    const examRef = firebase.database().ref(`/Exams/${courseId}`)
    const [exam, setExam] = useState()

    const handleSubmit = e =>{
        e.preventDefault()
        const answers = []
        Object.values(e.target).map(element => {
            if(element.checked){
                answers[element.name] = element.value
            }
        })

        checkAnswer(answers)
    }

    const checkAnswer = answers =>{
        const answerSet = []
        let index = 0
        exam.questions.map( question => {
            answerSet[index] = question.answer
            index =+ 1
        })
        
        let correctAnswers = 0

        


    }

    useEffect(()=>{
        examRef.once("value")
        .then( snapshot =>{
            if(snapshot.val().id === classId){
                setExam(snapshot.val())
            }
        })
    }, [])

    return (
            <div>
                <form id="testForm" onSubmit={e=>handleSubmit(e)}>
                    { 
                        exam ?
                        <>
                            {
                            exam.questions.map(element => 
                                {return(
                                    <>
                                    <p key={element.id} className="s-mb-1"> {element.title} </p>
                                        {
                                            element.choices.map( choice => 
                                                {return(
                                                    <Form.Check 
                                                    key={choice.id}
                                                    type="radio"
                                                    name={element.questionSet}
                                                    id={`radio${choice.id}`}
                                                    value={choice.id}
                                                    label={choice.statement}
                                                    />
                                                    )
                                                })
                                            }
                                    </>
                                     )
                                }
                            )
                            }
                            <Button type="submit" >Enviar</Button>
                        </>
                        :
                        null
                    }
                </form>
            <p></p>
            </div>
    )
}

export default Test
