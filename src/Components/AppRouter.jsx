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
import { addLoggedUser, getCourses, flushCart, getLocalCart } from '../Redux/actionCreator'
import Dashboard from './Pages/Dashboard'
import Private from './Routes/Private'
import Profile from './Pages/Profile'
import store from '../Redux/store'
import Cart from './Pages/Cart'
import Payment from './Pages/Payment'
import { useEffect } from 'react'
import Test from './Pages/Test'
import AdminLogin from './Pages/AdminLogin'
import AdminDashboard from './Pages/AdminDashboard'
import Results from './Pages/Results'




const AppRouter = ({addUser, loggedUser, flushcart}) => {

    window.addEventListener("storage",async e=>{
        const {key} = e

        try {
            switch(key){
                case "user":
                    const user = JSON.parse(localStorage.getItem("user"))
                    const {uid} = user
                    const userRef = firebase.database().ref(`/Users/${uid}`)
                    const dataResponse = await userRef.once("value")
                    const userInfo = dataResponse.val()
                    localStorage.setItem("user", JSON.stringify(userInfo))
                    addUser(userInfo)
                    break
                case "courses":
                    window.location.reload()
                    window.location.assign("/")
                    break
                case "token":
                    firebase.auth().signOut()
                    localStorage.removeItem("user")
                    localStorage.removeItem("token")
                    window.location.reload()
                    window.location.assign("/")
                    break
                default : 
                    window.location.reload()
                    break
            }
        } catch (error) {
            window.location.reload()
            window.location.assign("/")
            
        }

        
    })
    
        const coursesRef =firebase.database().ref("/Courses")
        coursesRef.once("child_added")
        .then( response =>{
            localStorage.removeItem("courses")
            store.dispatch( getCourses() )
        })

        coursesRef.once("child_changed")
        .then( response =>{
            localStorage.removeItem("courses")
            store.dispatch( getCourses() )
            window.location.reload()

        })


        coursesRef.once("child_removed")
        .then( response =>{
            localStorage.removeItem("courses")
            store.dispatch( getCourses() )
            window.location.reload()

        })

        if(loggedUser){
            const user = JSON.parse(localStorage.getItem("user"))
            const userRef = firebase.database().ref(`/Users/${user.uid}`)
            const coursesUserRef = firebase.database().ref(`/Users/${user.uid}/courses`)

            userRef.once("child_changed")
            .then(snapshot => {
                if(snapshot.key!=="exams"){
                    userRef.once("value")
                .then(snapshot => {
                    const userInfo = {...snapshot.val()}
                    localStorage.setItem("user", JSON.stringify(userInfo))
                    addUser(userInfo)
                    window.location.reload()
                })
                }
            })

            coursesUserRef.once("child_changed")
            .then(snapshot => flushcart())
            
        }
        
        

        
        useEffect(()=>{


            if(localStorage.getItem("user")){
                addUser(JSON.parse(localStorage.getItem("user")))
                
            }
            else{
                firebase.auth().onAuthStateChanged(async user =>{
                    if(user && user.emailVerified){
                        const {uid} = user
                        const userRef = firebase.database().ref(`/Users/${uid}`)
                        const dataResponse = await userRef.once("value")
                        const userInfo = dataResponse.val()
                        localStorage.setItem("user", JSON.stringify(userInfo))
                        addUser(userInfo)
                    }
                    else{
                        firebase.auth().signOut()
                        localStorage.removeItem("user")
                    }
                })
            }

           

        },[])


    return(

        <Router>
            <Header />
                <Switch>
                    <Route path="/" exact component = { Home }/>
                    <Route path="/cursos" component = { Courses }/>
                    <Route path="/conocenos" component = { AboutUs }/>
                    <Route path="/curso/:id" component = { Course }/>
                    <Private path="/class/:courseId/:sectionId/:classId" component  = { Fragment } />
                    <Private path="/dashboard" component = { Dashboard } />
                    <Private path="/editar-perfil" component = { Profile } />
                    <Route path="/cart" component = { Cart }/>
                    <Private path="/checkout" component = { Payment }/>
                    <Route path="/test/:courseId/:sectionId" component = { Test }/>
                    <Route path="/results/:courseId/:sectionId" component = { Results }/>
                    <Route path="/adminLogin" component = { AdminLogin }/>
                    <Route path="/adminDashboard" component = { AdminDashboard }/>
                    <Route component={()=><p>Error 404</p>} />
                </Switch>
        </Router>
    )
    }
    


const mapDispatchToProps = dispatch =>({
    
    addUser(user){
        dispatch( addLoggedUser(user) )
    },
    flushcart(){
        dispatch( flushCart() )
    }
})

const mapStateToProps = state => ({

    loggedUser : state.userReducer.userLogged

})


export default connect(mapStateToProps, mapDispatchToProps )(AppRouter)




