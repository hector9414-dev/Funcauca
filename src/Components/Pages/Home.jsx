import React from 'react'
import Banner from '../Organism/Banner'
import Courses from './Courses'

const Home = () => {

    return (
        <>
        <Banner className="s-mb-4" home />
        <div className="l-block bigger strong s-main-center s-pt-3">Nuestros Cursos</div>
        <Courses />
        </>
    )
}

export default Home
