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
import { addLoggedUser } from '../Redux/actionCreator'
import Dashboard from './Pages/Dashboard'



const AppRouter = ({addUser}) => {

    useEffect(()=>{

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
                        const {img, name, email} = data
    
                        const loggedUser ={
                            name,
                            email,
                            uid,
                            img
                            
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
                    <Route path="/fragment" component = { Fragment } />
                    <Route path="/dashboard" component = { Dashboard } />
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




