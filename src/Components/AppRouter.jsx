import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './Pages/Home'
import Courses from './Pages/Courses'
import AboutUs from './Pages/AboutUs'
import Course from './Pages/Course'
import Fragment from './Pages/Fragment'
import Header from './Organism/Header'
import firebaseConfig from '../Firebase/config'
import * as firebase from 'firebase/app'

const AppRouter = () => {

    firebase.initializeApp(firebaseConfig)


    return(

        <Router>
            <Header />
                <Switch>
                    <Route path="/" exact component = { Home }/>
                    <Route path="/cursos" component = { Courses }/>
                    <Route path="/conocenos" component = { AboutUs }/>
                    <Route path="/curso/:id" component = { Course }/>
                    <Route path="/fragment" component = { Fragment } />
                    <Route component={()=><p>Error 404</p>} />
                </Switch>
        </Router>
    )
    }


export default AppRouter
