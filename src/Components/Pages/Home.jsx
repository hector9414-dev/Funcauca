import React from 'react'
import Banner from '../Organism/Banner'
import Courses from './Courses'
import { connect } from 'react-redux';


const Home = ({loggedUser}) => {
        return (
            <main>
            <Banner className="s-mb-4" home />
            <div className="l-block bigger strong s-main-center s-pt-3">Nuestros Cursos</div>
            <Courses home/>
            </main>
        )
}

const mapStateToProps = state => ({
    loggedUser: state.userLogged
})

export default connect(mapStateToProps, {})( Home)



