import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import Home from './Pages/Home'
import Courses from './Pages/Courses'
import AboutUs from './Pages/AboutUs'
import Course from './Pages/Course'
import Fragment from './Pages/Fragment'
import Header from './Organism/Header'
import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import { useEffect } from 'react';
import { addLoggedUser, getCourses } from '../Redux/actionCreator'
import Dashboard from './Pages/Dashboard'
import Private from './Routes/Private'
import Profile from './Pages/Profile'
import store from '../Redux/store'



const AppRouter = ({addUser}) => {

    useEffect(()=>{

        const checkCoursesDataBase = async () =>{
            const response = await firebase.database().ref("/Courses").once("value")
            const coursesResponse = response.val()
            if(JSON.stringify(coursesResponse) !== localStorage.getItem("courses")){
                localStorage.removeItem("courses")
                store.dispatch( getCourses() )
            }
        }
        
        checkCoursesDataBase()

        if(localStorage.getItem("user")){
            addUser(JSON.parse(localStorage.getItem("user")))
        }
        else{

            firebase.auth().onAuthStateChanged(async response =>{
                if(response){
                    if(firebase.auth().currentUser.displayName){
                        const uid = firebase.auth().currentUser.uid
                        const token = await firebase.auth().currentUser.getIdToken()
                        localStorage.setItem("token", JSON.stringify(token))
                        const snapshot = await firebase.database().ref(`/Users/${uid}`).once("value")
                        const data = snapshot.val()
                        const {birthDate, city, country, courses, gender, idNumber, lastName, name} = data

                        
    
                        const loggedUser ={
                            birthDate,
                            city,
                            country,
                            courses,
                            gender,
                            idNumber,
                            lastName,
                            name,
                            uid,
                            userToken: localStorage.setItem("token", JSON.stringify(token))
                            
                        }
                            localStorage.setItem("user", JSON.stringify(loggedUser))
                            addUser(loggedUser)
                        
                    }
                }
            })
        }
      }, [firebase.auth().currentUser])
    


    return(

        <Router>
            <Header />
                <Switch>
                    <Route path="/" exact component = { Home }/>
                    <Route path="/cursos" component = { Courses }/>
                    <Route path="/conocenos" component = { AboutUs }/>
                    <Route path="/curso/:id" component = { Course }/>
                    <Private path="/class/:courseId/:classId/:videoId" component  = { Fragment } />
                    <Private path="/dashboard" component = { Dashboard } />
                    <Route path="/editar-perfil" component = { Profile } />
                    <Route component={()=><p>Error 404</p>} />
                </Switch>
        </Router>
    )
    }


const mapDispatchToProps = dispatch =>({
    
    addUser(user){
        dispatch( addLoggedUser(user) )
    }


})

const mapStateToProps = state => ({})


export default connect(mapStateToProps, mapDispatchToProps )(AppRouter)




