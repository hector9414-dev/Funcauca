import React from 'react'
import Banner from '../Organism/Banner'
import Courses from './Courses'
import { BrowserRouter as Redirect } from 'react-router-dom';
import { connect } from 'react-redux';


const Home = ({user}) => {

    const log = false

    if(log) {return <Redirect to="/cursos" path="/cursos"/>}

    
        return (
            <>
            <Banner className="s-mb-4" home />
            <div className="l-block bigger strong s-main-center s-pt-3">Nuestros Cursos</div>
            <Courses />
            </>
        )

    
}

const mapStateToProps = state => ({
    user : state.user
})

export default connect(mapStateToProps, {})( Home)
