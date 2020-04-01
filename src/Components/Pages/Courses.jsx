import React from 'react'
import CourseCard from '../Organism/CourseCard'
import Banner from '../Organism/Banner'
import { connect } from 'react-redux'
import * as firebase from 'firebase/app'
import CourseImg from '../../img/courses.jpg'



const Courses = ({dashboard, home, courses, loggedUser}) => {

    if(dashboard){
        return (
            <main className="ed-grid s-grid-1  lg-grid-3">
                {   
                    loggedUser.courses && loggedUser.courses[0]!==""?
                                loggedUser.courses.map( key =>{
                                    return(
                                        <CourseCard
                                        key={courses[`course${key}`].id}
                                        id={courses[`course${key}`].id}
                                        img={courses[`course${key}`].img}
                                        title={courses[`course${key}`].title}
                                        summary={`${courses[`course${key}`].summary}` }
                                    />
                                        )
                                    }
                                 )
                    :
                    <p>Oops, aun no tienes cursos</p>
                }
           </main>
    )
    }

    if(home){

        return (
            <>
                <div className="ed-grid s-grid-1 m-grid-3 lg-grid-4">
                {
                    Object.keys(courses).map(key => {
                        return(
                            <CourseCard
                            key={courses[key].id}
                            id={courses[key].id}
                            img={courses[key].img}
                            title={courses[key].title}
                            summary={`${courses[key].summary}` }
                        />
                        )
                    })
                }
                </div>
            </>
        )

    }

    return (
        <>
            <Banner img={CourseImg}
                title={"Nuestros Cursos"}
                color={"black"}
                opacity={".4"}
                height={"15rem"}
                />
            <div className="ed-grid s-grid-1 m-grid-3 lg-grid-4">
            {
                Object.keys(courses).map(key => {
                    return(
                        <CourseCard
                        key={courses[key].id}
                        id={courses[key].id}
                        img={courses[key].img}
                        title={courses[key].title}
                        summary={`${courses[key].summary}` }
                    />
                    )
                })
                }
            </div>
            </>
    )

    
}

const mapStateToProps = state => ({
    loggedUser: state.userReducer.userLogged,
    courses: state.coursesReducer.coursesList
})

export default connect(mapStateToProps, {} )(Courses)


