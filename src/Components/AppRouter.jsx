import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Home from './Pages/Home'
import Courses from './Pages/Courses'
import AboutUs from './Pages/AboutUs'
import Course from './Pages/Course'
import Header from './Organism/Header'

const AppRouter = () => (
        <Router>
            <Header />
            
            <Switch>
                <Route path="/" exact component = { Home }/>
                <Route path="/cursos" component = { Courses }/>
                <Route path="/conocenos" component = { AboutUs }/>
                <Route path="/curso/:id" component = { Course }/>
                
            </Switch>
            
        </Router>
    )


export default AppRouter
